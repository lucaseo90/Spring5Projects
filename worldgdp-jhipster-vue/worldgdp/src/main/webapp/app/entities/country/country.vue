<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('worldgdpApp.country.home.title')" id="country-heading">Countries</span>
            <router-link :to="{name: 'CountryCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-country">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('worldgdpApp.country.home.createLabel')">
                    Create a new Country
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && countries && countries.length === 0">
            <span v-text="$t('worldgdpApp.country.home.notFound')">No countries found</span>
        </div>
        <div class="table-responsive" v-if="countries && countries.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('code')"><span v-text="$t('worldgdpApp.country.code')">Code</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'code'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('worldgdpApp.country.name')">Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('continent')"><span v-text="$t('worldgdpApp.country.continent')">Continent</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'continent'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('region')"><span v-text="$t('worldgdpApp.country.region')">Region</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'region'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('surfaceArea')"><span v-text="$t('worldgdpApp.country.surfaceArea')">Surface Area</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'surfaceArea'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('population')"><span v-text="$t('worldgdpApp.country.population')">Population</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'population'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('lifeExpectancy')"><span v-text="$t('worldgdpApp.country.lifeExpectancy')">Life Expectancy</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'lifeExpectancy'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('localName')"><span v-text="$t('worldgdpApp.country.localName')">Local Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'localName'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('governmentForm')"><span v-text="$t('worldgdpApp.country.governmentForm')">Government Form</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'governmentForm'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="country in countries"
                    :key="country.id">
                    <td>
                        <router-link :to="{name: 'CountryView', params: {countryId: country.id}}">{{country.id}}</router-link>
                    </td>
                    <td>{{country.code}}</td>
                    <td>{{country.name}}</td>
                    <td v-text="$t('worldgdpApp.Continent.' + country.continent)">{{country.continent}}</td>
                    <td>{{country.region}}</td>
                    <td>{{country.surfaceArea}}</td>
                    <td>{{country.population}}</td>
                    <td>{{country.lifeExpectancy}}</td>
                    <td>{{country.localName}}</td>
                    <td>{{country.governmentForm}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CountryView', params: {countryId: country.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'CountryEdit', params: {countryId: country.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(country)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="worldgdpApp.country.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-country-heading" v-text="$t('worldgdpApp.country.delete.question', {'id': removeId})">Are you sure you want to delete this Country?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-country" v-text="$t('entity.action.delete')" v-on:click="removeCountry()">Delete</button>
            </div>
        </b-modal>
        <div v-show="countries && countries.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./country.component.ts">
</script>
