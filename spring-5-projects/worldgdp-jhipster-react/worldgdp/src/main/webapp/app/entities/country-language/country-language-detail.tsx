import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './country-language.reducer';
import { ICountryLanguage } from 'app/shared/model/country-language.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryLanguageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryLanguageDetail = (props: ICountryLanguageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { countryLanguageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="worldgdpApp.countryLanguage.detail.title">CountryLanguage</Translate> [<b>{countryLanguageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="language">
              <Translate contentKey="worldgdpApp.countryLanguage.language">Language</Translate>
            </span>
          </dt>
          <dd>{countryLanguageEntity.language}</dd>
          <dt>
            <span id="isOfficial">
              <Translate contentKey="worldgdpApp.countryLanguage.isOfficial">Is Official</Translate>
            </span>
          </dt>
          <dd>{countryLanguageEntity.isOfficial}</dd>
          <dt>
            <span id="percentage">
              <Translate contentKey="worldgdpApp.countryLanguage.percentage">Percentage</Translate>
            </span>
          </dt>
          <dd>{countryLanguageEntity.percentage}</dd>
          <dt>
            <Translate contentKey="worldgdpApp.countryLanguage.country">Country</Translate>
          </dt>
          <dd>{countryLanguageEntity.countryName ? countryLanguageEntity.countryName : ''}</dd>
        </dl>
        <Button tag={Link} to="/country-language" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/country-language/${countryLanguageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ countryLanguage }: IRootState) => ({
  countryLanguageEntity: countryLanguage.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryLanguageDetail);
