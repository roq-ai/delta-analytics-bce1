import { ThemeGroupInterface } from 'interfaces/theme-group';
import { CsvFileInterface } from 'interfaces/csv-file';
import { GetQueryInterface } from 'interfaces';

export interface ThemeInterface {
  id?: string;
  name: string;
  csv_file_id: string;
  created_at?: any;
  updated_at?: any;
  theme_group?: ThemeGroupInterface[];
  csv_file?: CsvFileInterface;
  _count?: {
    theme_group?: number;
  };
}

export interface ThemeGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  csv_file_id?: string;
}
