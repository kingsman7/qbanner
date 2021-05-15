<template></template>
<script>
  export default {
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData() {
        return {
          crudId: this.crudId,
          entityName: config("main.qbanner.entityNames.position"),
          apiRoute: 'apiRoutes.qbanner.positions',
          permission: 'ibanners.positions',
          extraFormFields: 'ibanners.crud-fields.positions',
          create: {
            title: this.$tr('qbanner.layout.newBanner'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'rigth'},
              {name: 'systemName', label: this.$tr('ui.form.systemName'), field: 'systemName', align: 'rigth'},
              {name: 'active', label: this.$tr('ui.form.status'), field: 'active', align: 'left'},
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {}
          },
          update: {
            to: 'qbanner.admin.positions.show'
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            name: {
              value: '',
              type: 'input',
              props: {
                label: `${this.$tr('ui.form.name')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
            },
            systemName: {
              value: '',
              type: 'input',
              props: {
                label: `${this.$tr('ui.form.systemName')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            active: {
              value: '1',
              type: 'select',
              props: {
                label: this.$tr('ui.form.status'),
                options: [
                  {label: this.$tr('ui.label.enabled'), value: '1'},
                  {label: this.$tr('ui.label.disabled'), value: '0'},
                ]
              }
            },
            showAsPopup: {
              value: false,
              type: 'checkbox',
              props: {
                label: this.$tr('qbanner.layout.label.showAsPopup'),
                trueValue: true,
                falseValue: false
              }
            },
          },
          formRight: {},
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
