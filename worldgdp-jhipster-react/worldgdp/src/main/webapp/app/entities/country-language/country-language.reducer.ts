import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICountryLanguage, defaultValue } from 'app/shared/model/country-language.model';

export const ACTION_TYPES = {
  FETCH_COUNTRYLANGUAGE_LIST: 'countryLanguage/FETCH_COUNTRYLANGUAGE_LIST',
  FETCH_COUNTRYLANGUAGE: 'countryLanguage/FETCH_COUNTRYLANGUAGE',
  CREATE_COUNTRYLANGUAGE: 'countryLanguage/CREATE_COUNTRYLANGUAGE',
  UPDATE_COUNTRYLANGUAGE: 'countryLanguage/UPDATE_COUNTRYLANGUAGE',
  DELETE_COUNTRYLANGUAGE: 'countryLanguage/DELETE_COUNTRYLANGUAGE',
  RESET: 'countryLanguage/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICountryLanguage>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type CountryLanguageState = Readonly<typeof initialState>;

// Reducer

export default (state: CountryLanguageState = initialState, action): CountryLanguageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COUNTRYLANGUAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COUNTRYLANGUAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COUNTRYLANGUAGE):
    case REQUEST(ACTION_TYPES.UPDATE_COUNTRYLANGUAGE):
    case REQUEST(ACTION_TYPES.DELETE_COUNTRYLANGUAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COUNTRYLANGUAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COUNTRYLANGUAGE):
    case FAILURE(ACTION_TYPES.CREATE_COUNTRYLANGUAGE):
    case FAILURE(ACTION_TYPES.UPDATE_COUNTRYLANGUAGE):
    case FAILURE(ACTION_TYPES.DELETE_COUNTRYLANGUAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COUNTRYLANGUAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_COUNTRYLANGUAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COUNTRYLANGUAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_COUNTRYLANGUAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COUNTRYLANGUAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/country-languages';

// Actions

export const getEntities: ICrudGetAllAction<ICountryLanguage> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COUNTRYLANGUAGE_LIST,
    payload: axios.get<ICountryLanguage>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ICountryLanguage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COUNTRYLANGUAGE,
    payload: axios.get<ICountryLanguage>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICountryLanguage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COUNTRYLANGUAGE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICountryLanguage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COUNTRYLANGUAGE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICountryLanguage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COUNTRYLANGUAGE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
