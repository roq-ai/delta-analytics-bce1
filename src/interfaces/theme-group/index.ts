import { ThemeInterface } from 'interfaces/theme';
import { GroupInterface } from 'interfaces/group';
import { GetQueryInterface } from 'interfaces';

export interface ThemeGroupInterface {
  id?: string;
  theme_id: string;
  group_id: string;
  created_at?: any;
  updated_at?: any;

  theme?: ThemeInterface;
  group?: GroupInterface;
  _count?: {};
}

export interface ThemeGroupGetQueryInterface extends GetQueryInterface {
  id?: string;
  theme_id?: string;
  group_id?: string;
}
