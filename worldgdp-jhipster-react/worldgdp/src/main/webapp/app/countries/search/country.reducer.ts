import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, ICrudSearchAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICountry, defaultValue } from 'app/shared/model/country.model';

export const ACTION_TYPES = {
  FETCH_COUNTRY_LIST: 'countries/FETCH_COUNTRY_LIST',
  FETCH_COUNTRY: 'countries/FETCH_COUNTRY',
  RESET: 'countries/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICountry>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CountriesState = Readonly<typeof initialState>;

// Reducer

export default (state: CountriesState = initialState, action): CountriesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COUNTRY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COUNTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COUNTRY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COUNTRY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COUNTRY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_COUNTRY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/countries';

// Actions

export const searchEntities: ICrudSearchAction<ICountry> = (query, page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?name.contains=${query}&page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COUNTRY_LIST,
    payload: axios.get<ICountry>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICountry> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COUNTRY,
    payload: axios.get<ICountry>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
