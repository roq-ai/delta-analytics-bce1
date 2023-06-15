import * as yup from 'yup';
import { themeValidationSchema } from 'validationSchema/themes';

export const csvFileValidationSchema = yup.object().shape({
  file_name: yup.string().required(),
  file_data: yup.string().required(),
  user_id: yup.string().nullable().required(),
  theme: yup.array().of(themeValidationSchema),
});
