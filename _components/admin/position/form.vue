<template>
  <div class="row">
    <div class="col-12" style="width: 100%">
      <q-form
        class="q-mt-lg"
        @submit="updateOrCreateSlider(form)"
        ref="formContent"
        @validation-error="$alert.error($tr('ui.message.formInvalid'))"
        autocomplete="off">
        <q-input
          :label="`${$tr('ui.form.name')} *`"
          type="text"
          outlined
          dense
          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
          v-model="form.name"/>
        <q-input
          :label="`${$tr('ui.form.slug')} *`"
          type="text"
          outlined
          dense
          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
          v-model="form.systemName"/>
        <q-select
          :label="$tr('ui.form.status')"
          v-model="form.active"
          emit-value
          map-options
          :options="[
            {label : $tr('ui.label.enabled'), value : true},
            {label : $tr('ui.label.disabled'), value : false},
          ]"
          outlined
          dense/>
        <q-checkbox v-model="form.showAsPopup" :label="$tr('qbanner.layout.label.showAsPopup')"
                    :true-value="true" :false-value="false" />
      </q-form>
      <div class="text-right">
        <q-btn
          @click="$refs.formContent.submit()"
          icon="fas fa-save"
          class="btn-small"
          color="green"
          :label="$tr('ui.label.save')"
          unelevated
          rounded
          :loading="loading"/>
      </div>
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  export default {
    name: 'positionsForm',
    props: {
      formData: {type: Object}
    },
    watch: {
      formData: {
        deep: true,
        handler: function () {
          this.setFormData()
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.setFormData()
      })
    },
    data() {
      return {
        loading: false,
        form: {options: {}}
      }
    },
    methods: {
      setFormData() {
        this.form = this.$clone(this.formData)
      },
      updateOrCreateSlider(data) {
        this.loading = true
        if (this.form.id) {
          this.$crud.update('apiRoutes.qbanner.positions', data.id, data).then(response => {
            this.$alert.info({message: this.$tr('ui.message.recordUpdated')})
            this.loading = false
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            this.loading = false
          })
        }
      },
      hasPermissionRecordMAster(record) {
        let options = record.options || false
        let response = {
          create: true,
          edit: true,
          index: true,
          destroy: true,
        }
        if (options && parseInt(options.masterRecord)) {
          response = {
            create: this.$auth.hasAccess('isite.master.records.create'),
            edit: this.$auth.hasAccess('isite.master.records.edit'),
            index: this.$auth.hasAccess('isite.master.records.index'),
            destroy: this.$auth.hasAccess('isite.master.records.destroy')
          }
        }
        return response
      }
    }
  }
</script>

<style scoped>

</style>
