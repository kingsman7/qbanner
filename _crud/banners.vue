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
          apiRoute: 'apiRoutes.qbanner.banners',
          permission: 'ibanners.banners',
          create: {
            title: this.$tr('qbanner.layout.newBannerItem'),
          },
          read: {
            columns: [],
            requestParams: {}
          },
          update: {
            title: this.$tr('qbanner.layout.updateSlide'),
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            title: {
              value: '',
              type: 'input',
              isTranslatable : true,
              props: {
                label: `${this.$tr('ui.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
            },
            uri: {
              value: '',
              type: 'input',
              isTranslatable : true,
              props: {
                label: 'URI',
              },
            },
            url: {
              value: '',
              type: 'input',
              isTranslatable : true,
              props: {
                label: 'URL',
              },
            },
            externalImageUrl: {
              value: '',
              type: 'input',
              isTranslatable : true,
              props: {
                label: `${this.$tr('ui.form.image')}`,
              },
            },
            customHtml: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props: {
                label: `${this.$tr('ui.form.description')}`,
              }
            },
          },
          formRight: {
            active: {
              value: 1,
              type: 'select',
              isTranslatable : true,
              props: {
                label: this.$tr('ui.form.status'),
                options: [
                  {label: this.$tr('ui.label.enabled'), value: 1},
                  {label: this.$tr('ui.label.disabled'), value: 0},
                ]
              }
            },
            targetField: {
              name : 'target',
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ui.form.option'),
                options: [
                  {label: 'Same tab', value: '_self'},
                  {label: 'New tab', value: '_blank'}
                ]
              }
            },
            typeField: {
              name : 'type',
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ui.form.type'),
                options: [
                  {label: 'Auto', value: 'auto'},
                  {label: '360', value: '360'},
                  {label: 'Video', value: 'video'},
                  {label: 'Image', value: 'image'}
                ]
              }
            },
            codeAds: {
              value: '',
              type: 'input',
              isFakeField: true,
              props: {
                label: `${this.$tr('qbanner.layout.label.codeAds')}`,
                type: 'textarea',
                rows: "3"
              },
            },
            mediasSingle: {
              value: {},
              type: 'media',
              props: {
                label: this.$tr('ui.form.image'),
                zone: 'bannerImage',
                entity: "Modules\\Ibanners\\Entities\\Banner",
                entityId: null
              }
            }
          },
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
