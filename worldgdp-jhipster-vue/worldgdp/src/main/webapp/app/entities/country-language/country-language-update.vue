<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="worldgdpApp.countryLanguage.home.createOrEditLabel" v-text="$t('worldgdpApp.countryLanguage.home.createOrEditLabel')">Create or edit a CountryLanguage</h2>
                <div>
                    <div class="form-group" v-if="countryLanguage.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="countryLanguage.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.countryLanguage.language')" for="country-language-language">Language</label>
                        <input type="text" class="form-control" name="language" id="country-language-language"
                            :class="{'valid': !$v.countryLanguage.language.$invalid, 'invalid': $v.countryLanguage.language.$invalid }" v-model="$v.countryLanguage.language.$model"  required/>
                        <div v-if="$v.countryLanguage.language.$anyDirty && $v.countryLanguage.language.$invalid">
                            <small class="form-text text-danger" v-if="!$v.countryLanguage.language.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.countryLanguage.isOfficial')" for="country-language-isOfficial">Is Official</label>
                        <select class="form-control" name="isOfficial" :class="{'valid': !$v.countryLanguage.isOfficial.$invalid, 'invalid': $v.countryLanguage.isOfficial.$invalid }" v-model="$v.countryLanguage.isOfficial.$model" id="country-language-isOfficial"  required>
                            <option value="T" v-bind:label="$t('worldgdpApp.TrueFalse.T')">T</option>
                            <option value="F" v-bind:label="$t('worldgdpApp.TrueFalse.F')">F</option>
                        </select>
                        <div v-if="$v.countryLanguage.isOfficial.$anyDirty && $v.countryLanguage.isOfficial.$invalid">
                            <small class="form-text text-danger" v-if="!$v.countryLanguage.isOfficial.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.countryLanguage.percentage')" for="country-language-percentage">Percentage</label>
                        <input type="number" class="form-control" name="percentage" id="country-language-percentage"
                            :class="{'valid': !$v.countryLanguage.percentage.$invalid, 'invalid': $v.countryLanguage.percentage.$invalid }" v-model.number="$v.countryLanguage.percentage.$model"  required/>
                        <div v-if="$v.countryLanguage.percentage.$anyDirty && $v.countryLanguage.percentage.$invalid">
                            <small class="form-text text-danger" v-if="!$v.countryLanguage.percentage.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.countryLanguage.percentage.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.countryLanguage.country')" for="country-language-country">Country</label>
                        <select class="form-control" id="country-language-country" name="country" v-model="$v.countryLanguage.countryId.$model" required>
                            <option v-if="!countryLanguage.countryId" v-bind:value="null" selected></option>
                            <option v-bind:value="countryOption.id" v-for="countryOption in countries" :key="countryOption.id">{{countryOption.name}}</option>
                        </select>
                    </div>
                    <div v-if="$v.countryLanguage.countryId.$anyDirty && $v.countryLanguage.countryId.$invalid">
                        <small class="form-text text-danger" v-if="!$v.countryLanguage.countryId.required" v-text="$t('entity.validation.required')">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.countryLanguage.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./country-language-update.component.ts">
</script>
