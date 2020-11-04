<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="worldgdpApp.city.home.createOrEditLabel" v-text="$t('worldgdpApp.city.home.createOrEditLabel')">Create or edit a City</h2>
                <div>
                    <div class="form-group" v-if="city.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="city.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.city.name')" for="city-name">Name</label>
                        <input type="text" class="form-control" name="name" id="city-name"
                            :class="{'valid': !$v.city.name.$invalid, 'invalid': $v.city.name.$invalid }" v-model="$v.city.name.$model"  required/>
                        <div v-if="$v.city.name.$anyDirty && $v.city.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.city.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.city.name.maxLength" v-text="$t('entity.validation.maxlength', {max: 35})">
                                This field cannot be longer than 35 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.city.district')" for="city-district">District</label>
                        <input type="text" class="form-control" name="district" id="city-district"
                            :class="{'valid': !$v.city.district.$invalid, 'invalid': $v.city.district.$invalid }" v-model="$v.city.district.$model"  required/>
                        <div v-if="$v.city.district.$anyDirty && $v.city.district.$invalid">
                            <small class="form-text text-danger" v-if="!$v.city.district.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.city.district.maxLength" v-text="$t('entity.validation.maxlength', {max: 20})">
                                This field cannot be longer than 20 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.city.population')" for="city-population">Population</label>
                        <input type="number" class="form-control" name="population" id="city-population"
                            :class="{'valid': !$v.city.population.$invalid, 'invalid': $v.city.population.$invalid }" v-model.number="$v.city.population.$model"  required/>
                        <div v-if="$v.city.population.$anyDirty && $v.city.population.$invalid">
                            <small class="form-text text-danger" v-if="!$v.city.population.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.city.population.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('worldgdpApp.city.country')" for="city-country">Country</label>
                        <select class="form-control" id="city-country" name="country" v-model="$v.city.countryId.$model" required>
                            <option v-if="!city.countryId" v-bind:value="null" selected></option>
                            <option v-bind:value="countryOption.id" v-for="countryOption in countries" :key="countryOption.id">{{countryOption.name}}</option>
                        </select>
                    </div>
                    <div v-if="$v.city.countryId.$anyDirty && $v.city.countryId.$invalid">
                        <small class="form-text text-danger" v-if="!$v.city.countryId.required" v-text="$t('entity.validation.required')">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.city.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./city-update.component.ts">
</script>
