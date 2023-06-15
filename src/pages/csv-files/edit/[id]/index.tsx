import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCsvFileById, updateCsvFileById } from 'apiSdk/csv-files';
import { Error } from 'components/error';
import { csvFileValidationSchema } from 'validationSchema/csv-files';
import { CsvFileInterface } from 'interfaces/csv-file';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function CsvFileEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CsvFileInterface>(
    () => (id ? `/csv-files/${id}` : null),
    () => getCsvFileById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CsvFileInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCsvFileById(id, values);
      mutate(updated);
      resetForm();
      router.push('/csv-files');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CsvFileInterface>({
    initialValues: data,
    validationSchema: csvFileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Csv File
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="file_name" mb="4" isInvalid={!!formik.errors?.file_name}>
              <FormLabel>File Name</FormLabel>
              <Input type="text" name="file_name" value={formik.values?.file_name} onChange={formik.handleChange} />
              {formik.errors.file_name && <FormErrorMessage>{formik.errors?.file_name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="file_data" mb="4" isInvalid={!!formik.errors?.file_data}>
              <FormLabel>File Data</FormLabel>
              <Input type="text" name="file_data" value={formik.values?.file_data} onChange={formik.handleChange} />
              {formik.errors.file_data && <FormErrorMessage>{formik.errors?.file_data}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'csv_file',
  operation: AccessOperationEnum.UPDATE,
})(CsvFileEditPage);
