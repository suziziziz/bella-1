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
import Vue from 'vue'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import { mapGetters } from 'vuex';
Vue.use(VuePlyr)
export default {
  props: {
    srcset: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      loaded:false,
      options: {
        muted: true,
        controls: [],
        vimeo: { byline: false, portrait: false, title: false, speed: true, transparent: false, controls: false },
        youtube: { noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, controls: 0 },
        controlBar: false,
        // debug: true,
        touch: false,
        clickToPlay: false,
        tooltips: { controls: false, seek: false },
        // autopause: true,
        loop: { active: true },
        ads: { enabled: false, publisherId: '' }
      },
      swiperOption: {
        autoplay:{
          delay:6000
        },
        speed:1000,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      }
    }
  },
  computed: {
    player () {
      if (this.$refs.plyr) {
        return this.$refs.plyr[0].player
      } else {
        return null
      }
    },
    slides() {
      return this.srcset
    }
  },

  mounted() {
    if (this.player) {
      this.player.on('ready', () => {
        this.$refs.plyr[0].player.play()
        this.$nextTick(() => {
          this.loaded = true
        })
      })
    }
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
