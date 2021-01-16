import { TrueFalse } from 'app/shared/model/enumerations/true-false.model';

export interface ICountryLanguage {
  id?: number;
  language?: string;
  isOfficial?: TrueFalse;
  percentage?: number;
  countryName?: string;
  countryId?: number;
}

export const defaultValue: Readonly<ICountryLanguage> = {};
