<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="countryLanguage">
                <h2 class="jh-entity-heading"><span v-text="$t('worldgdpApp.countryLanguage.detail.title')">CountryLanguage</span> {{countryLanguage.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('worldgdpApp.countryLanguage.language')">Language</span>
                    </dt>
                    <dd>
                        <span>{{countryLanguage.language}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('worldgdpApp.countryLanguage.isOfficial')">Is Official</span>
                    </dt>
                    <dd>
                        <span v-text="$t('worldgdpApp.TrueFalse.' + countryLanguage.isOfficial)">{{countryLanguage.isOfficial}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('worldgdpApp.countryLanguage.percentage')">Percentage</span>
                    </dt>
                    <dd>
                        <span>{{countryLanguage.percentage}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('worldgdpApp.countryLanguage.country')">Country</span>
                    </dt>
                    <dd>
                        <div v-if="countryLanguage.countryId">
                            <router-link :to="{name: 'CountryView', params: {countryId: countryLanguage.countryId}}">{{countryLanguage.countryName}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="countryLanguage.id" :to="{name: 'CountryLanguageEdit', params: {countryLanguageId: countryLanguage.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./country-language-details.component.ts">
</script>
