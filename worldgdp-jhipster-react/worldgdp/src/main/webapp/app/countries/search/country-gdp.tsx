import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryGdpProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryGdp = (props: ICountryGdpProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { countryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="worldgdpApp.country.detail.title">Country</Translate> [<b>{countryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="worldgdpApp.country.code">Code</Translate>
            </span>
          </dt>
          <dd>{countryEntity.code}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="worldgdpApp.country.name">Name</Translate>
            </span>
          </dt>
          <dd>{countryEntity.name}</dd>
          <dt>
            <span id="continent">
              <Translate contentKey="worldgdpApp.country.continent">Continent</Translate>
            </span>
          </dt>
          <dd>{countryEntity.continent}</dd>
          <dt>
            <span id="region">
              <Translate contentKey="worldgdpApp.country.region">Region</Translate>
            </span>
          </dt>
          <dd>{countryEntity.region}</dd>
          <dt>
            <span id="surfaceArea">
              <Translate contentKey="worldgdpApp.country.surfaceArea">Surface Area</Translate>
            </span>
          </dt>
          <dd>{countryEntity.surfaceArea}</dd>
          <dt>
            <span id="population">
              <Translate contentKey="worldgdpApp.country.population">Population</Translate>
            </span>
          </dt>
          <dd>{countryEntity.population}</dd>
          <dt>
            <span id="lifeExpectancy">
              <Translate contentKey="worldgdpApp.country.lifeExpectancy">Life Expectancy</Translate>
            </span>
          </dt>
          <dd>{countryEntity.lifeExpectancy}</dd>
          <dt>
            <span id="localName">
              <Translate contentKey="worldgdpApp.country.localName">Local Name</Translate>
            </span>
          </dt>
          <dd>{countryEntity.localName}</dd>
          <dt>
            <span id="governmentForm">
              <Translate contentKey="worldgdpApp.country.governmentForm">Government Form</Translate>
            </span>
          </dt>
          <dd>{countryEntity.governmentForm}</dd>
        </dl>
        <Button tag={Link} to="/countries" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ countries }: IRootState) => ({
  countryEntity: countries.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryGdp);
