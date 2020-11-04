<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('worldgdpApp.countryLanguage.home.title')" id="country-language-heading">Country Languages</span>
            <router-link :to="{name: 'CountryLanguageCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-country-language">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('worldgdpApp.countryLanguage.home.createLabel')">
                    Create a new Country Language
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
        <div class="alert alert-warning" v-if="!isFetching && countryLanguages && countryLanguages.length === 0">
            <span v-text="$t('worldgdpApp.countryLanguage.home.notFound')">No countryLanguages found</span>
        </div>
        <div class="table-responsive" v-if="countryLanguages && countryLanguages.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('language')"><span v-text="$t('worldgdpApp.countryLanguage.language')">Language</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'language'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('isOfficial')"><span v-text="$t('worldgdpApp.countryLanguage.isOfficial')">Is Official</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'isOfficial'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('percentage')"><span v-text="$t('worldgdpApp.countryLanguage.percentage')">Percentage</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'percentage'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('countryName')"><span v-text="$t('worldgdpApp.countryLanguage.country')">Country</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'countryName'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="countryLanguage in countryLanguages"
                    :key="countryLanguage.id">
                    <td>
                        <router-link :to="{name: 'CountryLanguageView', params: {countryLanguageId: countryLanguage.id}}">{{countryLanguage.id}}</router-link>
                    </td>
                    <td>{{countryLanguage.language}}</td>
                    <td v-text="$t('worldgdpApp.TrueFalse.' + countryLanguage.isOfficial)">{{countryLanguage.isOfficial}}</td>
                    <td>{{countryLanguage.percentage}}</td>
                    <td>
                        <div v-if="countryLanguage.countryId">
                            <router-link :to="{name: 'CountryView', params: {countryId: countryLanguage.countryId}}">{{countryLanguage.countryName}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CountryLanguageView', params: {countryLanguageId: countryLanguage.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'CountryLanguageEdit', params: {countryLanguageId: countryLanguage.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(countryLanguage)"
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
            <span slot="modal-title"><span id="worldgdpApp.countryLanguage.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-countryLanguage-heading" v-text="$t('worldgdpApp.countryLanguage.delete.question', {'id': removeId})">Are you sure you want to delete this Country Language?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-countryLanguage" v-text="$t('entity.action.delete')" v-on:click="removeCountryLanguage()">Delete</button>
            </div>
        </b-modal>
        <div v-show="countryLanguages && countryLanguages.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./country-language.component.ts">
</script>
