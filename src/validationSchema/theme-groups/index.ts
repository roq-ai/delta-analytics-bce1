import * as yup from 'yup';

export const themeGroupValidationSchema = yup.object().shape({
  theme_id: yup.string().nullable().required(),
  group_id: yup.string().nullable().required(),
});
