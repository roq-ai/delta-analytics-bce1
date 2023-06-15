import { ThemeGroupInterface } from 'interfaces/theme-group';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface GroupInterface {
  id?: string;
  name: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  theme_group?: ThemeGroupInterface[];
  organization?: OrganizationInterface;
  _count?: {
    theme_group?: number;
  };
}

export interface GroupGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
