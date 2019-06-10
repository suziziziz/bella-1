<template>
  <div id="gallerySlider" v-swiper:gallerySlider="swiperOption">
    <div class="swiper-wrapper">
      <div
        v-for="index in slidesNumber"
        :key="'slide-' + index"
        class="swiper-slide"
      >
        <!-- If the image orientation is landscape -->
        <div
          v-if="
            checkOrientation(
              slides[normalizeIndex(index)].width,
              slides[normalizeIndex(index)].height
            ) == 'landscape'
          "
          class="wrap-slide-landscape"
        >
          <div
            v-if="evalSlides(slides[normalizeIndex(index)].file)"
            class="slide text-center"
          >
            <img
              :src="slides[normalizeIndex(index)].file"
              :alt="talentname"
              :class="
                'img-slide ' +
                  checkOrientation(
                    slides[normalizeIndex(index)].width,
                    slides[normalizeIndex(index)].height
                  )
              "
              :aria-orientation="
                checkOrientation(
                  slides[normalizeIndex(index)].width,
                  slides[normalizeIndex(index)].height
                )
              "
            />
          </div>
        </div>

        <!-- If the image orientation is portrait -->
        <div v-else class="wrap-slide-portrait">
          <div
            v-if="evalSlides(slides[normalizeIndex(index)].file)"
            class="slide text-center"
          >
            <img
              :src="slides[normalizeIndex(index)].file"
              :alt="talentname"
              :class="
                'img-slide ' +
                  checkOrientation(
                    slides[normalizeIndex(index)].width,
                    slides[normalizeIndex(index)].height
                  )
              "
              :aria-orientation="
                checkOrientation(
                  slides[normalizeIndex(index)].width,
                  slides[normalizeIndex(index)].height
                )
              "
            />
          </div>

          <div
            v-if="slides[index] != undefined && evalSlides(slides[index].file)"
            class="slide text-center"
          >
            <img
              v-if="slides[index] != undefined"
              :src="slides[index].file"
              :alt="talentname"
              :class="
                'img-slide ' +
                  checkOrientation(slides[index].width, slides[index].height)
              "
              :aria-orientation="
                checkOrientation(slides[index].width, slides[index].height)
              "
            />
          </div>
        </div>
      </div>
    </div>

    <div slot="button-prev" class="swiper-button-prev"></div>
    <div slot="button-next" class="swiper-button-next"></div>
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
        slidesPerView: 1,
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
      },
      /**
       * Used to normalize the images array index
       */
      slidesArray: []
    }
  },

  computed: {
    slides() {
      return this.srcset
    },
    slidesNumber() {
      return parseInt(Object.keys(this.slides).length)
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
    // if (!this.$_.isEmpty(this.slides)) {
    //   this.validateSlide()
    // }
  },

  methods: {
    checkOrientation(_w, _h) {
      if (parseInt(_w) > parseInt(_h)) {
        return 'landscape'
      } else {
        return 'portrait'
      }
    },
    normalizeIndex(_index) {
      return parseInt(_index - 1)
    },
    evalSlides(_slide) {
      // eslint-disable-next-line no-var
      var validate = null

      if (this.$_.indexOf(this.slidesArray, _slide) >= 0) {
        // eslint-disable-next-line no-console
        console.log('already inserted')

        validate = false
      } else {
        // eslint-disable-next-line no-console
        console.log('new slide')
        this.slidesArray.push(_slide)

        validate = true
      }

      // eslint-disable-next-line no-console
      console.log('validate: ', validate)

      return validate
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

      .wrap-slide-landscape {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%;
        height: 100%;
        width: 100%;

        .slide {
          .img-slide {
            width: auto;
            height: 100%;
          }
        }
      }

      .wrap-slide-portrait {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 100%;
        height: 100%;
        width: 100%;

        .slide {
          .img-slide {
            width: auto;
            height: 100%;
          }
        }
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
