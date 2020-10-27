import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Table, Label} from 'reactstrap';
import {AvFeedback, AvForm, AvGroup, AvInput, AvField} from 'availity-reactstrap-validation';
import {Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities, searchEntities} from './country.reducer';
import {ICountry} from 'app/shared/model/country.model';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';
import country from "app/entities/country/country";

export interface ICountryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Country = (props: ICountryProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const [countryName, setCountryName] = useState();

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const searchCountries = () => {
    props.searchEntities(countryName, paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  }

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const {countryList, match, loading, totalItems} = props;
  return (
    <div>
      <Row md="6" className="justify-content-center">
        <Col>
          <Label id="nameLabel" for="country-name">
            <Translate contentKey="worldgdpApp.country.name">Name</Translate>
          </Label>
        </Col>
        <Col md="4">
          <AvForm model={countryList}>
            <AvGroup>
              <AvField id="country-name" type="text" name="name" value={name}
                       onChange={({target: {value}}) => setCountryName(value)}
                       validate={{
                         required: {value: true, errorMessage: translate('entity.validation.required')},
                         maxLength: {value: 52, errorMessage: translate('entity.validation.maxlength', {max: 52})},
                       }}
              />
            </AvGroup>
          </AvForm>
        </Col>
        <Col>
          <Label id="continentLabel" for="country-continent">
            <Translate contentKey="worldgdpApp.country.continent">Continent</Translate>
          </Label>
        </Col>
        <Col md="2">
          <AvForm model={countryList}>
            <AvGroup>
              <AvInput id="country-continent" type="select" className="form-control" name="continent" value={'ASIA'}>
                <option value="ASIA">{translate('worldgdpApp.Continent.ASIA')}</option>
                <option value="EUROPE">{translate('worldgdpApp.Continent.EUROPE')}</option>
                <option value="NORTH_AMERICA">{translate('worldgdpApp.Continent.NORTH_AMERICA')}</option>
                <option value="AFRICA">{translate('worldgdpApp.Continent.AFRICA')}</option>
                <option value="OCEANIA">{translate('worldgdpApp.Continent.OCEANIA')}</option>
                <option value="ANTARCTICA">{translate('worldgdpApp.Continent.ANTARCTICA')}</option>
                <option value="SOUTH_AMERICA">{translate('worldgdpApp.Continent.SOUTH_AMERICA')}</option>
              </AvInput>
            </AvGroup>
          </AvForm>
        </Col>
        <Col md="1">
          <Button tag={Link} id="search" to="/countries" replace color="info" onClick={searchCountries}>
            <FontAwesomeIcon icon="arrow-left"/>
            &nbsp;
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.search">Search</Translate>
            </span>
          </Button>
        </Col>
      </Row>

      <h2 id="country-heading">
        <Translate contentKey="worldgdpApp.country.home.title">Countries</Translate>
      </h2>
      <div className="table-responsive">
        {countryList && countryList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('code')}>
                <Translate contentKey="worldgdpApp.country.code">Code</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('name')}>
                <Translate contentKey="worldgdpApp.country.name">Name</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('continent')}>
                <Translate contentKey="worldgdpApp.country.continent">Continent</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('region')}>
                <Translate contentKey="worldgdpApp.country.region">Region</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('surfaceArea')}>
                <Translate contentKey="worldgdpApp.country.surfaceArea">Surface Area</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('population')}>
                <Translate contentKey="worldgdpApp.country.population">Population</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('lifeExpectancy')}>
                <Translate contentKey="worldgdpApp.country.lifeExpectancy">Life Expectancy</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('localName')}>
                <Translate contentKey="worldgdpApp.country.localName">Local Name</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('governmentForm')}>
                <Translate contentKey="worldgdpApp.country.governmentForm">Government Form</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {countryList.map((countryEntity, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  <Button tag={Link} to={`${match.url}/${countryEntity.id}`} color="link" size="sm">
                    {countryEntity.id}
                  </Button>
                </td>
                <td>{countryEntity.code}</td>
                <td>{countryEntity.name}</td>
                <td>
                  <Translate contentKey={`worldgdpApp.Continent.${countryEntity.continent}`}/>
                </td>
                <td>{countryEntity.region}</td>
                <td>{countryEntity.surfaceArea}</td>
                <td>{countryEntity.population}</td>
                <td>{countryEntity.lifeExpectancy}</td>
                <td>{countryEntity.localName}</td>
                <td>{countryEntity.governmentForm}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="worldgdpApp.country.home.notFound">No Countries found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={countryList && countryList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled/>
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({countries}: IRootState) => ({
  countryList: countries.entities,
  loading: countries.loading,
  totalItems: countries.totalItems,
});

const mapDispatchToProps = {
  getEntities,
  searchEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Country);
