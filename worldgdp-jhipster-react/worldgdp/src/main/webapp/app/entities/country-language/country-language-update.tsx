import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { getEntity, updateEntity, createEntity, reset } from './country-language.reducer';
import { ICountryLanguage } from 'app/shared/model/country-language.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICountryLanguageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryLanguageUpdate = (props: ICountryLanguageUpdateProps) => {
  const [countryId, setCountryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { countryLanguageEntity, countries, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/country-language' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCountries();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...countryLanguageEntity,
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
          <h2 id="worldgdpApp.countryLanguage.home.createOrEditLabel">
            <Translate contentKey="worldgdpApp.countryLanguage.home.createOrEditLabel">Create or edit a CountryLanguage</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : countryLanguageEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="country-language-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="country-language-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="languageLabel" for="country-language-language">
                  <Translate contentKey="worldgdpApp.countryLanguage.language">Language</Translate>
                </Label>
                <AvField
                  id="country-language-language"
                  type="text"
                  name="language"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="isOfficialLabel" for="country-language-isOfficial">
                  <Translate contentKey="worldgdpApp.countryLanguage.isOfficial">Is Official</Translate>
                </Label>
                <AvInput
                  id="country-language-isOfficial"
                  type="select"
                  className="form-control"
                  name="isOfficial"
                  value={(!isNew && countryLanguageEntity.isOfficial) || 'T'}
                >
                  <option value="T">{translate('worldgdpApp.TrueFalse.T')}</option>
                  <option value="F">{translate('worldgdpApp.TrueFalse.F')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="percentageLabel" for="country-language-percentage">
                  <Translate contentKey="worldgdpApp.countryLanguage.percentage">Percentage</Translate>
                </Label>
                <AvField
                  id="country-language-percentage"
                  type="string"
                  className="form-control"
                  name="percentage"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="country-language-country">
                  <Translate contentKey="worldgdpApp.countryLanguage.country">Country</Translate>
                </Label>
                <AvInput id="country-language-country" type="select" className="form-control" name="countryId" required>
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/country-language" replace color="info">
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
  countries: storeState.country.entities,
  countryLanguageEntity: storeState.countryLanguage.entity,
  loading: storeState.countryLanguage.loading,
  updating: storeState.countryLanguage.updating,
  updateSuccess: storeState.countryLanguage.updateSuccess,
});

const mapDispatchToProps = {
  getCountries,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryLanguageUpdate);
