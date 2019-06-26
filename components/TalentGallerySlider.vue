<template>
  <div id="gallerySlider" v-swiper:gallerySlider="swiperOption">
    <div v-if="windowSizes.width >= 992" class="swiper-wrapper">
      <div
        v-for="(slide, index) in evaluatedSlides"
        :key="'slide-' + index"
        class="swiper-slide"
      >
        <!-- If the image orientation is landscape -->
        <div v-if="slide.space == 2" class="wrap-slide-landscape">
          <div class="slide text-center">
            <img
              :src="slide.files"
              :alt="talentname"
              class="img-slide landscape"
              aria-orientation="landscape"
            />
          </div>
        </div>

        <!-- If the image orientation is portrait -->
        <div v-else class="wrap-slide-portrait">
          <div
            v-for="(item, i) in slide.files"
            :key="'sub-' + i"
            class="slide text-center"
          >
            <img
              :src="item"
              :alt="talentname"
              class="img-slide portrait"
              aria-orientation="portrait"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="swiper-wrapper">
      <div
        v-for="(slide, index) in slides"
        :key="'slide-' + index"
        class="swiper-slide"
      >
        <!-- If the image orientation is landscape -->
        <div class="wrap-slide-landscape">
          <div class="slide text-center">
            <img
              :src="slide.file"
              :alt="talentname"
              class="img-slide landscape"
              aria-orientation="landscape"
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
    evaluatedSlides() {
      /**
       * Initialized array to get the normalized slides
       */
      const evalSlides = []

      /**
       * Loop throught the slides
       */
      for (let index = 0; index < this.slidesNumber; index++) {
        /**
         * Current slide
         */
        const slide = this.srcset[index]

        const orientation = this.checkOrientation(slide.width, slide.height)

        /**
         * Object used to push into evalSlides array
         */
        let item = null

        // console.log('index: ', index)
        // console.log('slide: ', slide.file)

        if (orientation === 'landscape') {
          item = {
            space: 2,
            files: slide.file
          }

          // console.log('landscape: ', item)

          evalSlides.push(item)
        } else if (orientation === 'portrait') {
          /**
           * Next slide index
           */
          const nextIndex = index + 1
          let nextSlide = null

          // console.log('nextIndex: ', nextIndex)

          if (this.srcset[nextIndex] !== undefined) {
            for (let i = nextIndex; i < this.slidesNumber; i++) {
              nextSlide = this.srcset[i]
              const nextSlideOrientation = this.checkOrientation(
                nextSlide.width,
                nextSlide.height
              )

              if (nextSlideOrientation === 'portrait') {
                item = {
                  space: 1,
                  files: [slide.file, nextSlide.file]
                }

                // console.log('nextSlide: ', nextSlide.file)

                index++
                break
              } else {
                item = {
                  space: 2,
                  files: nextSlide.file
                }

                // console.log('landscape: ', item)

                evalSlides.push(item)
                index++
              }
            }
            // console.log('portrait: ', item)
          } else {
            item = {
              space: 1,
              files: [this.srcset[nextIndex - 1].file]
            }

            // console.log('portrait: ', item)
          }

          evalSlides.push(item)
        }
      }
      return evalSlides
    },
    slidesNumber() {
      return parseInt(Object.keys(this.srcset).length)
    },
    ...mapGetters({
      windowSizes: 'window/windowSizes'
    })
  },

  watch: {
    srcset: {
      handler: function(val, oldVal) {
        this.gallerySlider.update()
      },

      deep: true
    },
    windowSizes: {
      handler: function(val, oldVal) {
        this.gallerySlider.update()
      },

      deep: true
    }
  },

  mounted() {
    // eslint-disable-next-line no-console
    // console.log('This is current swiper instance object', this.gallerySlider)
  },

  methods: {
    checkOrientation(_w, _h) {
      if (parseInt(_w) > parseInt(_h)) {
        return 'landscape'
      } else {
        return 'portrait'
      }
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
