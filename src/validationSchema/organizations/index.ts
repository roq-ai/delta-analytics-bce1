import * as yup from 'yup';
import { groupValidationSchema } from 'validationSchema/groups';

export const organizationValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  group: yup.array().of(groupValidationSchema),
});
