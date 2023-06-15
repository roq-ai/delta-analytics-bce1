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
import { getThemeGroupById, updateThemeGroupById } from 'apiSdk/theme-groups';
import { Error } from 'components/error';
import { themeGroupValidationSchema } from 'validationSchema/theme-groups';
import { ThemeGroupInterface } from 'interfaces/theme-group';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ThemeInterface } from 'interfaces/theme';
import { GroupInterface } from 'interfaces/group';
import { getThemes } from 'apiSdk/themes';
import { getGroups } from 'apiSdk/groups';

function ThemeGroupEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ThemeGroupInterface>(
    () => (id ? `/theme-groups/${id}` : null),
    () => getThemeGroupById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ThemeGroupInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateThemeGroupById(id, values);
      mutate(updated);
      resetForm();
      router.push('/theme-groups');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ThemeGroupInterface>({
    initialValues: data,
    validationSchema: themeGroupValidationSchema,
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
            Edit Theme Group
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
            <AsyncSelect<ThemeInterface>
              formik={formik}
              name={'theme_id'}
              label={'Select Theme'}
              placeholder={'Select Theme'}
              fetcher={getThemes}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<GroupInterface>
              formik={formik}
              name={'group_id'}
              label={'Select Group'}
              placeholder={'Select Group'}
              fetcher={getGroups}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
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
  entity: 'theme_group',
  operation: AccessOperationEnum.UPDATE,
})(ThemeGroupEditPage);
