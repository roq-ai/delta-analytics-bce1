import { ThemeInterface } from 'interfaces/theme';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CsvFileInterface {
  id?: string;
  file_name: string;
  file_data: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  theme?: ThemeInterface[];
  user?: UserInterface;
  _count?: {
    theme?: number;
  };
}

export interface CsvFileGetQueryInterface extends GetQueryInterface {
  id?: string;
  file_name?: string;
  file_data?: string;
  user_id?: string;
}
