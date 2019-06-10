<template>
  <div id="gallerySlider" v-swiper:gallerySlider="swiperOption">
    <div class="swiper-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="'slide-' + index"
        class="swiper-slide"
      >
        <img
          :src="slide.file"
          :alt="talentname"
          :class="'img-slide ' + checkOrientation(slide.width, slide.height)"
          :aria-orientation="checkOrientation(slide.width, slide.height)"
        />
      </div>
    </div>

    <div
      slot="button-prev"
      class="swiper-button-prev"
      @click="validateSlide()"
    ></div>
    <div
      slot="button-next"
      class="swiper-button-next"
      @click="validateSlide()"
    ></div>
  </div>
</template>

<script>
// Require styles
import 'swiper/dist/css/swiper.css'
import { mapGetters } from 'vuex'

export default {
  props: {
    srcset: {
      type: Array,
      required: true
    },
    talentname: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 2,
        spaceBetween: 0,
        centeredSlides: false,
        loop: false,
        speed: 500,
        breakpoints: {
          992: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true
          }
        }
      }
    }
  },

  computed: {
    slides() {
      return this.srcset
    },
    ...mapGetters({
      windowSizes: 'window/windowSizes'
    })
  },

  watch: {
    srcset: {
      handler: function(val, oldVal) {
        // console.log('value changed')
        this.gallerySlider.update()
      },

      deep: true
    }
  },

  mounted() {
    // eslint-disable-next-line no-console
    // console.log('This is current swiper instance object', this.gallerySlider)
    if (!this.$_.isEmpty(this.slides)) {
      this.validateSlide()
    }
  },

  methods: {
    checkOrientation(_w, _h) {
      if (parseInt(_w) > parseInt(_h)) {
        return 'landscape'
      } else {
        return 'portrait'
      }
    },
    validateSlide() {
      // eslint-disable-next-line no-console
      console.log('image: ', this.slides[this.gallerySlider.activeIndex])

      const currSlide = this.slides[this.gallerySlider.activeIndex]

      this.checkOrientation(currSlide.width, currSlide.height) === 'landscape'
        ? (this.swiperOption.slidesPerView = 1)
        : (this.swiperOption.slidesPerView = 2)
    }
  }
}
</script>

<style lang="scss">
#gallerySlider {
  .swiper-wrapper {
    .swiper-slide {
      height: 70vh;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      align-content: center;

      .img-slide {
        height: 100%;
        width: auto;
      }
    }
  }

  .swiper-button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'><path%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%231F1A17'%2F><%2Fsvg>");
  }
  .swiper-button-prev {
    background-image: url("data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'><path%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%231F1A17'%2F><%2Fsvg>");
  }
}
</style>
