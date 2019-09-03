<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div v-for="slide in slides" :key="slide.id" class="swiper-slide">
        <picture v-if="slide.type=='image'">
          <source media="(max-width:400px)" :srcset="`https://bellamodels.managerfashion.net${slide.url.mobile}`">
          <img :src="`https://bellamodels.managerfashion.net${slide.url.desktop}`" :alt="slide.description ? slide.description:''" class="img-slide" />
        </picture>
        <transition name="fade" v-else>
          <vue-plyr  :options="options" ref="plyr" v-show="loaded">
            <div :data-plyr-provider="slide.video_provider"  :data-plyr-embed-id="slide.video_id"></div>
          </vue-plyr>
        </transition>
      </div>
    </div>
    <div slot="pagination" class="swiper-pagination" />
  </div>
</template>

<script>
// Require styles
import 'swiper/dist/css/swiper.css'
import { mapGetters } from 'vuex';
export default {
  props: {
    srcset: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      }
    }
  },

  computed: {
    slides() {
      return this.srcset
    }
  },

  mounted() {
    // eslint-disable-next-line no-console
    // console.log('This is current swiper instance object', this.mySwiper)
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  padding: 0 50px;
  height: 75vh;
}
.img-slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

</style>
