export interface ICity {
  id?: number;
  name?: string;
  district?: string;
  population?: number;
  countryName?: string;
  countryId?: number;
}

export const defaultValue: Readonly<ICity> = {};
