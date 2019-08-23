/**
 * A string that represents a date/time format.
 */
declare type DateString = string;

declare type StatusString = 'pending' | 'processed' | 'hold';

declare type DefaultResponse = {
  data: any;
  status: string;
  links: string[];
};

declare type Invoice = {
  created: DateString;
  extension: string;
  file_name: string;
  id: number;
  maintenance: Maintenance;
  maintenance_id: string;
  modified: DateString;
  status: StatusString;
};

declare type Maintenance = {
  created: string;
  garage_id: number;
  id: number;
  modified: string;
  status: StatusString;
  vehicle: Vehicle;
  vehicle_id: number;
};

declare type Vehicle = {
  brand: string;
  color: string;
  construction_year: string;
  created: string;
  fuel_declare: string;
  id: number;
  license_plate: string;
  model: string;
  modified: string;
  power: string;
  declare: string;
  user: User;
  user_id: number;
  vin: string;
};

declare type User = {
  created: string;
  email: string;
  first_name: string;
  id: number;
  is_admin: boolean;
  last_name: string;
  modified: string;
  status: 'active' | 'inactive';
};
