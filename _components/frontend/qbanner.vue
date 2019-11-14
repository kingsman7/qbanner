<template>
  <div>
    <carousel
      :per-page="1"
      :navigate-to="someLocalProperty"
      :navigationEnabled="true"
      :paginationEnabled="false">
      <slide
        v-for="(slide, index) in position.banners"
        :key="`banner-${index}`">
        <a :href="slide.url" :target="slide.target">
          <iframe
            v-if="~slide.imageUrl.indexOf('youtube.com')"
            width="100%"
            :height="height"
            :src="slide.imageUrl"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
          <video
            width="100%"
            :height="height"
            v-else-if="~slide.imageUrl.indexOf('.mp4')"
            class='img-responsive center-block'
            loop
            controls='false'>
            <source :src="slide.imageUrl" type='video/mp4'>
            asd
          </video>
          <q-img
            :src="slide.imageUrl"
            v-else :style="`height: ${height}px`" >
          </q-img>
        </a>
      </slide>
    </carousel>
  </div>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  
  export default {
    components:{
      Carousel,
      Slide,
    },
    props:{
      systemName:{
        type: String,
        default: null
      },
      height:{
        type: String,
        default: '500'
      }
    },
    data() {
      return {
        loading: false,
        position: {},
      }
    },
    created() {
      this.getBanner()
    },
    methods:{
      getBanner(){
        let params = {
          params: {
            filter:{
              field: 'system_name'
            }
          }
        }
        this.loading = true
        this.$crud.show('apiRoutes.qbanner.positions', this.systemName, params).then( response => {
          this.position = response.data
          this.loading = false
        }).catch( error => {
          this.$alert.error({ message: this.$tr('ui.message.errorRequest'), pos: 'bottom' })
          this.loading = false
        })
      },
    }
  }
</script>
