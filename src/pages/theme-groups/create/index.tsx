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
import { createThemeGroup } from 'apiSdk/theme-groups';
import { Error } from 'components/error';
import { themeGroupValidationSchema } from 'validationSchema/theme-groups';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ThemeInterface } from 'interfaces/theme';
import { GroupInterface } from 'interfaces/group';
import { getThemes } from 'apiSdk/themes';
import { getGroups } from 'apiSdk/groups';
import { ThemeGroupInterface } from 'interfaces/theme-group';

function ThemeGroupCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ThemeGroupInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createThemeGroup(values);
      resetForm();
      router.push('/theme-groups');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ThemeGroupInterface>({
    initialValues: {
      theme_id: (router.query.theme_id as string) ?? null,
      group_id: (router.query.group_id as string) ?? null,
    },
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
            Create Theme Group
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'theme_group',
  operation: AccessOperationEnum.CREATE,
})(ThemeGroupCreatePage);
