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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTheme } from 'apiSdk/themes';
import { Error } from 'components/error';
import { themeValidationSchema } from 'validationSchema/themes';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CsvFileInterface } from 'interfaces/csv-file';
import { getCsvFiles } from 'apiSdk/csv-files';
import { ThemeInterface } from 'interfaces/theme';

function ThemeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ThemeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTheme(values);
      resetForm();
      router.push('/themes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ThemeInterface>({
    initialValues: {
      name: '',
      csv_file_id: (router.query.csv_file_id as string) ?? null,
    },
    validationSchema: themeValidationSchema,
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
            Create Theme
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CsvFileInterface>
            formik={formik}
            name={'csv_file_id'}
            label={'Select Csv File'}
            placeholder={'Select Csv File'}
            fetcher={getCsvFiles}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.file_name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'theme',
  operation: AccessOperationEnum.CREATE,
})(ThemeCreatePage);
