<template>
  <div class="q-layout-page layout-padding">
    <!--Content-->
    <div id="formAdminbanners" class="row q-col-gutter-md relative-position">
      <!--Banner information-->
      <div class="col-12 col-md-5">
        <div class="box">
          <!--Information-->
          <q-list separator v-if="banner">
            <!--Id-->
            <q-item v-ripple>
              <q-item-section>Banner ID</q-item-section>
              <q-item-section side>{{banner.id}}</q-item-section>
            </q-item>
            <!--Name-->
            <q-item v-ripple>
              <q-item-section>{{$tr('ui.form.name')}}</q-item-section>
              <q-item-section side>{{banner.name}}</q-item-section>
            </q-item>
            <!--System name-->
            <q-item v-ripple>
              <q-item-section>{{$tr('ui.form.systemName')}}</q-item-section>
              <q-item-section side>{{banner.systemName}}</q-item-section>
            </q-item>
            <!--Status-->
            <q-item v-ripple>
              <q-item-section>{{$tr('ui.form.status')}}</q-item-section>
              <q-item-section side>
                {{$tr(`ui.label.${banner.active ? 'enabled': 'disabled'}`)}}
              </q-item-section>
            </q-item>
          </q-list>
          <!--Actions-->
          <div id="actions" class="q-mt-md text-right">
            <!--update banner-->
            <q-btn :label="$tr('ui.label.update')" color="green" rounded unelevated
                   @click="$refs.bannerCrud.update(banner.id)"/>
            <!--Banner crud-->
            <crud :crud-data="import('@imagina/qbanner/_crud/banners')" type="justUpdate"
                  ref="bannerCrud" @updated="getData(true)"/>
          </div>
        </div>
      </div>
      <!--Banner Items -->
      <div class="col-12 col-md-7">
        <div class="box">
          <draggable @change="updateOrder" v-model="banner.banners" group="slides">
            <q-card class="my-card q-mb-md" v-for="(item,index) in bannerItems" :key="'item'+index">
              <!--Item information-->
              <div class="row items-center q-pa-sm">
                <!--Title-->
                <div class="col-6">
                  <q-chip icon="fas fa-images" text-color="white" color="info">{{item.title}}</q-chip>
                </div>
                <!--Actions-->
                <div class="col-6 text-right">
                  <q-btn color="green" size="sm" round icon="fas fa-pen" unelevated class="q-mr-sm"
                         @click="$refs.cruditem.update(item.id)"/>
                  <q-btn @click="deleteItem(item, index)" color="negative" unelevated
                         size="sm" round icon="far fa-trash-alt"/>
                </div>
              </div>
              <q-separator/>
              <!--Render media-->
              <div class="full-width">
                <!--Iframe-->
                <iframe v-if="item.renderType == 'iframe'" :src="item.imageUrl || item.url"
                        allowfullscreen width="100%" height="300" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
                <!--Video-->
                <video v-else-if="item.renderType == 'video'" width="100%" height="300"
                       class='img-responsive center-block' loop>
                  <source :src="item.imageUrl || item.url" type='video/mp4'>
                </video>
                <!--Default-->
                <div v-else class="default-render-media"
                     :style="`background-image: url('${item.imageUrl || item.url}')`"></div>
              </div>
            </q-card>
          </draggable>
        </div>
      </div>
      <!--inner loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    components: {draggable},
    beforeDestroy() {
      this.$root.$off('page.data.refresh')
    },
    mounted() {
      this.init()
    },
    data() {
      return {
        loading: false,
        banner: {}
      }
    },
    computed: {
      bannerItems() {
        let items = this.$clone(this.banner.banners || [])

        //Extra validations
        items.forEach(item => {
          //Validate render type
          if (~item.imageUrl.indexOf('youtube.com') || ~item.url.indexOf('youtube.com'))
            item.renderType = 'iframe'
          else if (~item.imageUrl.indexOf('.mp4') || ~item.url.indexOf('.mp4'))
            item.renderType = 'video'
          else item.renderType = 'default'
        })

        return items
      }
    },
    methods: {
      init() {
        this.$root.$on('page.data.refresh', () => this.getData(true))//Listen refresh event
        this.getData(true)
      },
      //Get slider data
      getData(refresh = false) {
        let criteria = this.$route.params.id
        let params = {
          refresh: refresh,
          params: {include: 'banners'}
        }
        this.loading = true
        this.$crud.show('apiRoutes.qbanner.positions', criteria, params).then(response => {
          this.banner = response.data
          this.loading = false
        }).catch(error => {
          console.error(error)
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
      },
      //update order
      updateOrder() {
        let slides = this.slider.slides.map(slide => ({id: slide.id}))
        let data = {
          slider: slides
        }
        this.loading = true
        this.$crud.create('apiRoutes.qslider.orderSlides', data).then(response => {
          this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
          this.loading = false
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          console.warn(error)
          this.loading = false
        })
      },
      //Delete item
      deleteItem(item, pos) {
        this.$q.dialog({
          title: item.title,
          ok: this.$tr('ui.label.delete'),
          message: this.$tr('ui.message.deleteRecord'),
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$crud.delete('apiRoutes.qslider.slides', item.id).then(response => {
            this.$alert.info({message: this.$tr('ui.message.recordDeleted')})
            this.getData(true)
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoDeleted'), pos: 'bottom'})
          })
        }).onCancel(() => {
        })
      },
    }
  }
</script>

<style lang="stylus">
  #formAdminbanners
    .default-render-media
      background-size: cover;
      background-position: center;
      height: 300px;
      display: block;
      max-width: 100%;
</style>
