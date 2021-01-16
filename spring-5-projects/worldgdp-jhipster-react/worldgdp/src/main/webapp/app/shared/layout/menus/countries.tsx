import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {DropdownItem} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Translate, translate} from 'react-jhipster';
import {NavLink as Link} from 'react-router-dom';
import {NavDropdown} from './menu-components';

export const CountriesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.countries.main')}
    id="countries-menu"
    style={{maxHeight: '80vh', overflow: 'auto'}}
  >
    <MenuItem icon="asterisk" to="/countries">
      <Translate contentKey="global.menu.countries.country-search"/>
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
