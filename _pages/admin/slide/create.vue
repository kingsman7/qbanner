<template>
  <div
    id="pageId"
    class="q-layout-page layout-padding">
    <div class="q-mb-lg backend-page">
      <div class="row">
        <div class="col-12 flex justify-end q-my-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Banners" :to="{name: 'qbanner.admin.sliders'}"/>
            <q-breadcrumbs-el label="Banner" :to="{name: 'qbanner.admin.positions.show', params:{id:$route.params.sliderId}}"/>
            <q-breadcrumbs-el label="Item" />
          </q-breadcrumbs>
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <div class="box">
            <formSlide />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import formSlide from '@imagina/qbanner/_components/admin/slide/form'
  
  export default {
    components:{
      formSlide
    },
    data (){
      return {
      
      }
    },
    created() {
    
    },
    methods:{
      getSlide(){
      
      }
    }
  }
</script>

<style scoped>

</style>
