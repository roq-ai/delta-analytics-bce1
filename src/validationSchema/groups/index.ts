import * as yup from 'yup';
import { themeGroupValidationSchema } from 'validationSchema/theme-groups';

export const groupValidationSchema = yup.object().shape({
  name: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  theme_group: yup.array().of(themeGroupValidationSchema),
});
