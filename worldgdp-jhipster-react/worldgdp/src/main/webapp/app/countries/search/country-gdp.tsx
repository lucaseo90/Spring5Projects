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
import construct = Reflect.construct;
import CountryGdpChart from "./country-gdp-chart";

export interface ICountryGdpProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryGdp = (props: ICountryGdpProps) => {

  const preGDPUrl = 'http://api.worldbank.org/v2/countries/';
  const postGDPUrl = '/indicators/NY.GDP.MKTP.CD?format=json&per_page=' + 10;
  let year = [];
  let gdp = [];
  let chartData = [];

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const getCountryGdp = async (code : string) => {
    const gdpUrl = preGDPUrl + code + postGDPUrl;
    const response = await fetch(gdpUrl);
    const data = await response.json();
    const gdpDataArr = data[1];

    let obj = "[";
    if (gdpDataArr) {
      gdpDataArr.forEach((y: { date; value; }) => {
        year.push(y.date);
        gdp.push(y.value);
      });
      year = year.reverse();
      gdp = gdp.reverse();
      console.log(year);
      console.log(gdp);

      console.log(year.length);
      for (let i = 0; i < year.length; i++) {
        console.log(year[i]);
        console.log(gdp[i]);
        obj = obj.concat("{ \"x\":").concat(year[i]).concat(", \"y\": ").concat(gdp[i]).concat("}");
        if( i !== year.length - 1) {
          obj = obj.concat(",")
        }
      }
      obj = obj.concat("]");
      console.log("json string : " + obj);
    }
    chartData = JSON.parse(obj);
    console.log(chartData);
  }

  const { countryEntity } = props;
  return (
    <Row>
      <Col md="4">
        <h2 id="page-heading">
          <Translate contentKey="worldgdpApp.country.detail.title">Country</Translate> [<b>{countryEntity.name}</b>]
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
        <Button onClick={() => getCountryGdp(countryEntity.code)} replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">Test</span>
        </Button>
        <Button tag={Link} to="/countries" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
      </Col>
      <Col md="8">
        <CountryGdpChart/>
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
