<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div v-for="slide in slides" :key="slide.id" class="swiper-slide">
        <img :src="slide.src" :alt="slide.id" class="img-slide" />
      </div>
    </div>
    <div slot="pagination" class="swiper-pagination"></div>
  </div>
</template>

<script>
// Require styles
import 'swiper/dist/css/swiper.css'
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
}
.img-slide {
  width: 100%;
  max-height: 75vh;
  object-fit: cover;
  object-position: center;
}
</style>
