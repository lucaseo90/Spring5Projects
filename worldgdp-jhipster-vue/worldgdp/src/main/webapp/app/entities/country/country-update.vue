<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="worldgdpApp.country.home.createOrEditLabel" v-text="$t('worldgdpApp.country.home.createOrEditLabel')">Create or edit a Country</h2>
                <div>
                    <div class="form-group" v-if="country.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="country.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.code')" for="country-code">Code</label>
                        <input type="text" class="form-control" name="code" id="country-code"
                            :class="{'valid': !$v.country.code.$invalid, 'invalid': $v.country.code.$invalid }" v-model="$v.country.code.$model"  required/>
                        <div v-if="$v.country.code.$anyDirty && $v.country.code.$invalid">
                            <small class="form-text text-danger" v-if="!$v.country.code.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.country.code.maxLength" v-text="$t('entity.validation.maxlength', {max: 3})">
                                This field cannot be longer than 3 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.name')" for="country-name">Name</label>
                        <input type="text" class="form-control" name="name" id="country-name"
                            :class="{'valid': !$v.country.name.$invalid, 'invalid': $v.country.name.$invalid }" v-model="$v.country.name.$model"  required/>
                        <div v-if="$v.country.name.$anyDirty && $v.country.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.country.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.country.name.maxLength" v-text="$t('entity.validation.maxlength', {max: 52})">
                                This field cannot be longer than 52 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.continent')" for="country-continent">Continent</label>
                        <select class="form-control" name="continent" :class="{'valid': !$v.country.continent.$invalid, 'invalid': $v.country.continent.$invalid }" v-model="$v.country.continent.$model" id="country-continent"  required>
                            <option value="ASIA" v-bind:label="$t('worldgdpApp.Continent.ASIA')">ASIA</option>
                            <option value="EUROPE" v-bind:label="$t('worldgdpApp.Continent.EUROPE')">EUROPE</option>
                            <option value="NORTH_AMERICA" v-bind:label="$t('worldgdpApp.Continent.NORTH_AMERICA')">NORTH_AMERICA</option>
                            <option value="AFRICA" v-bind:label="$t('worldgdpApp.Continent.AFRICA')">AFRICA</option>
                            <option value="OCEANIA" v-bind:label="$t('worldgdpApp.Continent.OCEANIA')">OCEANIA</option>
                            <option value="ANTARCTICA" v-bind:label="$t('worldgdpApp.Continent.ANTARCTICA')">ANTARCTICA</option>
                            <option value="SOUTH_AMERICA" v-bind:label="$t('worldgdpApp.Continent.SOUTH_AMERICA')">SOUTH_AMERICA</option>
                        </select>
                        <div v-if="$v.country.continent.$anyDirty && $v.country.continent.$invalid">
                            <small class="form-text text-danger" v-if="!$v.country.continent.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.region')" for="country-region">Region</label>
                        <input type="text" class="form-control" name="region" id="country-region"
                            :class="{'valid': !$v.country.region.$invalid, 'invalid': $v.country.region.$invalid }" v-model="$v.country.region.$model"  required/>
                        <div v-if="$v.country.region.$anyDirty && $v.country.region.$invalid">
                            <small class="form-text text-danger" v-if="!$v.country.region.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.country.region.maxLength" v-text="$t('entity.validation.maxlength', {max: 26})">
                                This field cannot be longer than 26 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.surfaceArea')" for="country-surfaceArea">Surface Area</label>
                        <input type="number" class="form-control" name="surfaceArea" id="country-surfaceArea"
                            :class="{'valid': !$v.country.surfaceArea.$invalid, 'invalid': $v.country.surfaceArea.$invalid }" v-model.number="$v.country.surfaceArea.$model"  required/>
                        <div v-if="$v.country.surfaceArea.$anyDirty && $v.country.surfaceArea.$invalid">
                            <small class="form-text text-danger" v-if="!$v.country.surfaceArea.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.country.surfaceArea.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.population')" for="country-population">Population</label>
                        <input type="number" class="form-control" name="population" id="country-population"
                            :class="{'valid': !$v.country.population.$invalid, 'invalid': $v.country.population.$invalid }" v-model.number="$v.country.population.$model"  required/>
                        <div v-if="$v.country.population.$anyDirty && $v.country.population.$invalid">
                            <small class="form-text text-danger" v-if="!$v.country.population.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.country.population.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.lifeExpectancy')" for="country-lifeExpectancy">Life Expectancy</label>
                        <input type="number" class="form-control" name="lifeExpectancy" id="country-lifeExpectancy"
                            :class="{'valid': !$v.country.lifeExpectancy.$invalid, 'invalid': $v.country.lifeExpectancy.$invalid }" v-model.number="$v.country.lifeExpectancy.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.localName')" for="country-localName">Local Name</label>
                        <input type="text" class="form-control" name="localName" id="country-localName"
                            :class="{'valid': !$v.country.localName.$invalid, 'invalid': $v.country.localName.$invalid }" v-model="$v.country.localName.$model"  required/>
                        <div v-if="$v.country.localName.$anyDirty && $v.country.localName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.country.localName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.country.localName.maxLength" v-text="$t('entity.validation.maxlength', {max: 45})">
                                This field cannot be longer than 45 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.country.governmentForm')" for="country-governmentForm">Government Form</label>
                        <input type="text" class="form-control" name="governmentForm" id="country-governmentForm"
                            :class="{'valid': !$v.country.governmentForm.$invalid, 'invalid': $v.country.governmentForm.$invalid }" v-model="$v.country.governmentForm.$model"  required/>
                        <div v-if="$v.country.governmentForm.$anyDirty && $v.country.governmentForm.$invalid">
                            <small class="form-text text-danger" v-if="!$v.country.governmentForm.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.country.governmentForm.maxLength" v-text="$t('entity.validation.maxlength', {max: 45})">
                                This field cannot be longer than 45 characters.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.country.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./country-update.component.ts">
</script>
