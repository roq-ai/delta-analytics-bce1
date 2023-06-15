import * as yup from 'yup';
import { themeGroupValidationSchema } from 'validationSchema/theme-groups';

export const themeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  csv_file_id: yup.string().nullable().required(),
  theme_group: yup.array().of(themeGroupValidationSchema),
});
