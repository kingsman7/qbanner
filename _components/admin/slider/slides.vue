<template>
  <div class="row relative-position">
    <div class="col-12">
      <div>
        <div class="flex justify-end">
          <q-btn
            v-if="slider.id"
            :to="{name: 'qbanner.admin.banner.create', params:{sliderId: slider.id}}"
            icon="fas fa-plus"
            color="positive"
            class="btn-small no-shadow"
            :label="$tr('qbanner.layout.newBanner')"/>
        </div>
        <draggable
          @change="updateOrder"
          v-model="slider.banners"
          group="slides">
            <renderMedia
              style="cursor: move"
              :slide="slide"
              :index="index"
              v-for="(slide,index) in slider.banners"
              :key="'slide'+index"/>
        </draggable>
      </div>
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import renderMedia from '@imagina/qbanner/_components/admin/slide/renderMedia'
  import draggable from 'vuedraggable'
  
  export default {
    components:{
      draggable,
      renderMedia
    },
    data () {
      return {
        loading: false
      }
    },
    props:{
      slider:{
        type: Object,
        default: () => ({
          id: 0,
        })
      },
    },
    watch:{
    
    },
    methods:{
      hasPermissionRecordMAster (record) {
        let options = record.options || false
        let response = {
          create: true,
          edit: true,
          index: true,
          destroy: true,
        }
        if (options && parseInt(options.masterRecord)) {
          response = {
            create: this.$auth.hasAccess('ibanners.master.records.create'),
            edit: this.$auth.hasAccess('ibanners.master.records.edit'),
            index: this.$auth.hasAccess('ibanners.master.records.index'),
            destroy: this.$auth.hasAccess('ibanners.master.records.destroy')
          }
        }
        return response
      },
      updateOrder(){
        let slides = this.slider.banners.map( slide => ({id: slide.id}))
        let data = {
          position:slides
        }
        this.loading = true
        this.$crud.create('apiRoutes.qbanner.orderBanners', data).then( response => {
          this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
          this.loading = false
        }).catch( error => {
          this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
          console.warn( error )
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
