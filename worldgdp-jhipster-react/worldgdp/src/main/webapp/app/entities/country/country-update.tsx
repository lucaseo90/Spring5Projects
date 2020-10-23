import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICountryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryUpdate = (props: ICountryUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { countryEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/country' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...countryEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="worldgdpApp.country.home.createOrEditLabel">
            <Translate contentKey="worldgdpApp.country.home.createOrEditLabel">Create or edit a Country</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : countryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="country-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="country-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="country-code">
                  <Translate contentKey="worldgdpApp.country.code">Code</Translate>
                </Label>
                <AvField
                  id="country-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 3, errorMessage: translate('entity.validation.maxlength', { max: 3 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="country-name">
                  <Translate contentKey="worldgdpApp.country.name">Name</Translate>
                </Label>
                <AvField
                  id="country-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 52, errorMessage: translate('entity.validation.maxlength', { max: 52 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="continentLabel" for="country-continent">
                  <Translate contentKey="worldgdpApp.country.continent">Continent</Translate>
                </Label>
                <AvInput
                  id="country-continent"
                  type="select"
                  className="form-control"
                  name="continent"
                  value={(!isNew && countryEntity.continent) || 'ASIA'}
                >
                  <option value="ASIA">{translate('worldgdpApp.Continent.ASIA')}</option>
                  <option value="EUROPE">{translate('worldgdpApp.Continent.EUROPE')}</option>
                  <option value="NORTH_AMERICA">{translate('worldgdpApp.Continent.NORTH_AMERICA')}</option>
                  <option value="AFRICA">{translate('worldgdpApp.Continent.AFRICA')}</option>
                  <option value="OCEANIA">{translate('worldgdpApp.Continent.OCEANIA')}</option>
                  <option value="ANTARCTICA">{translate('worldgdpApp.Continent.ANTARCTICA')}</option>
                  <option value="SOUTH_AMERICA">{translate('worldgdpApp.Continent.SOUTH_AMERICA')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="regionLabel" for="country-region">
                  <Translate contentKey="worldgdpApp.country.region">Region</Translate>
                </Label>
                <AvField
                  id="country-region"
                  type="text"
                  name="region"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 26, errorMessage: translate('entity.validation.maxlength', { max: 26 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="surfaceAreaLabel" for="country-surfaceArea">
                  <Translate contentKey="worldgdpApp.country.surfaceArea">Surface Area</Translate>
                </Label>
                <AvField
                  id="country-surfaceArea"
                  type="string"
                  className="form-control"
                  name="surfaceArea"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="populationLabel" for="country-population">
                  <Translate contentKey="worldgdpApp.country.population">Population</Translate>
                </Label>
                <AvField
                  id="country-population"
                  type="string"
                  className="form-control"
                  name="population"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lifeExpectancyLabel" for="country-lifeExpectancy">
                  <Translate contentKey="worldgdpApp.country.lifeExpectancy">Life Expectancy</Translate>
                </Label>
                <AvField id="country-lifeExpectancy" type="string" className="form-control" name="lifeExpectancy" />
              </AvGroup>
              <AvGroup>
                <Label id="localNameLabel" for="country-localName">
                  <Translate contentKey="worldgdpApp.country.localName">Local Name</Translate>
                </Label>
                <AvField
                  id="country-localName"
                  type="text"
                  name="localName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="governmentFormLabel" for="country-governmentForm">
                  <Translate contentKey="worldgdpApp.country.governmentForm">Government Form</Translate>
                </Label>
                <AvField
                  id="country-governmentForm"
                  type="text"
                  name="governmentForm"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/country" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  countryEntity: storeState.country.entity,
  loading: storeState.country.loading,
  updating: storeState.country.updating,
  updateSuccess: storeState.country.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryUpdate);
