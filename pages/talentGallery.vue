<template>
  <section id="talentGallery">
    <transition name="fade" mode="out-in" class="w-100">
      <div v-show="isLoading" id="loadGallery">
        <!-- Loading animation -->
      </div>
    </transition>

    <div class="container">
      <div class="row talent-gallery-intro reset-row">
        <div class="col-12 reset-col text-center">
          <h1 class="title-strong">
            {{ talentData.name }}
          </h1>

          <div v-if="talentData.instagram" class="instagram">
            <a
              :href="'https://www.instagram.com/' + talentData.instagram"
              target="_blank"
            >
              <i class="fab fa-instagram" />
            </a>

            <a
              :href="'https://www.instagram.com/' + talentData.instagram"
              target="_blank"
            >
              <span>
                <i
                  v-if="!instagramLoaded"
                  class="fas fa-spinner fa-spin"
                />
                <h3 v-else class="title-strong">
                  {{ instagramData.followers }}
                </h3>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="row switch-galleries reset-row">
        <div v-if="!$_.isEmpty(talentData.book)" class="col-md-4">
          <div class="def-btn">
            <button
              :class="activeGallery == 'book' ? 'active' : ''"
              @click="activeGallery = 'book'"
            >
              Book
            </button>
          </div>
        </div>

        <div v-if="!$_.isEmpty(talentData.snap)" class="col-md-4">
          <div class="def-btn">
            <button
              :class="activeGallery == 'snap' ? 'active' : ''"
              @click="activeGallery = 'snap'"
            >
              Polaroids
            </button>
          </div>
        </div>

        <div v-if="!$_.isEmpty(talentData.compo)" class="col-md-4">
          <div class="def-btn">
            <button
              :class="activeGallery == 'compo' ? 'active' : ''"
              @click="activeGallery = 'compo'"
            >
              Composite
            </button>
          </div>
        </div>
      </div>

      <div class="row slider reset-row">
        <div class="col-md-12">
          <gallery-slider
            v-if="!$_.isEmpty(talentData)"
            :srcset="galleryItems"
            :talentname="talentData.name"
          />
        </div>
      </div>

      <div class="row measures reset-row">
        <div class="col-md-12">
          <ul>
            <li v-if="talentData.height != ''">
              <span class="meas-type">{{ $t('talentGallery.height') }}</span>
              <span class="meas-val">{{ talentData.height }}</span>
            </li>
            <li v-if="talentData.hair != ''">
              <span class="meas-type">{{ $t('talentGallery.hair') }}</span>
              <span class="meas-val">{{
                $t('colors.' + talentData.hair)
              }}</span>
            </li>
            <li v-if="talentData.eyes != ''">
              <span class="meas-type">{{ $t('talentGallery.eyes') }}</span>
              <span class="meas-val">{{
                $t('colors.' + talentData.eyes)
              }}</span>
            </li>
            <li v-if="talentData.shirt != ''">
              <span class="meas-type">{{ $t('talentGallery.shirt') }}</span>
              <span class="meas-val">{{ talentData.shirt }}</span>
            </li>
            <li v-if="talentData.suit != ''">
              <span class="meas-type">{{ $t('talentGallery.suit') }}</span>
              <span class="meas-val">{{ talentData.suit }}</span>
            </li>
            <li v-if="talentData.jeans != ''">
              <span class="meas-type">{{ $t('talentGallery.jeans') }}</span>
              <span class="meas-val">{{ talentData.jeans }}</span>
            </li>
            <li v-if="talentData.bust != ''">
              <span class="meas-type">{{ $t('talentGallery.bust') }}</span>
              <span class="meas-val">{{ talentData.bust }}</span>
            </li>
            <li v-if="talentData.hips != ''">
              <span class="meas-type">{{ $t('talentGallery.hips') }}</span>
              <span class="meas-val">{{ talentData.hips }}</span>
            </li>
            <li v-if="talentData.waist != ''">
              <span class="meas-type">{{ $t('talentGallery.waist') }}</span>
              <span class="meas-val">{{ talentData.waist }}</span>
            </li>
            <li v-if="talentData.weight != ''">
              <span class="meas-type">{{ $t('talentGallery.weight') }}</span>
              <span class="meas-val">{{ talentData.weight }}</span>
            </li>
            <li v-if="talentData.shoes != ''">
              <span class="meas-type">{{ $t('talentGallery.shoes') }}</span>
              <span class="meas-val">{{ talentData.shoes }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * Used to animate Airbnb Lottie animations
 */
import lottie from 'lottie-web'
import { mapGetters } from 'vuex'
import TalentGallerySlider from '~/components/TalentGallerySlider'

export default {
  // middleware: ['signin'],

  components: {
    'gallery-slider': TalentGallerySlider
  },
  async asyncData({store, $axios,route,error}) {
    try {
      let talent = await $axios.$get('https://integration.managerfashion.net/api/talent/profile', {
        params: { id: route.params.id, language: 'en' },
      })
      if(!talent) throw e             
      return {
        talentData:talent
      }
      
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
   } 
  },
  data() {
    return {
      meta: {
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos, moda, fashion, comercial',
        logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
        url: 'http://localhost:3000' + this.$route.fullPath
      },
      talentData: [],
      instagramData: [],
      activeGallery: 'book',
      isLoading: true,
      instagramLoaded:false
    }
  },
  computed: {
    galleryItems() {
      let items

      switch (this.activeGallery) {
        case 'book':
          items = this.talentData.book
          break

        case 'snap':
          items = this.talentData.snap
          break

        case 'compo':
          items = this.talentData.compo
          break
      }

      return items
    },
    ...mapGetters({
      currentLocale: 'lang/currentLocale'
    })
  },

  mounted() {
    lottie.loadAnimation({
      container: document.getElementById('loadGallery'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/loader.json'
    })
    setTimeout(() => this.isLoading = false, 200)
    if(this.talentData.instagram){
      this.getInstagramInfo(this.talentData.instagram)
    }
  },

  methods: {    

    getInstagramInfo(_user) {
      this.$axios.$get('https://integration.managerfashion.net/api/agency/instagram')
        .then(response => {
          this.instagramData = response.data
          this.instagramLoaded = true
        })
        .catch(error => {
          this.instagramLoaded = true
        })
    }
  },

  head() {
    return {
      title: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella models + projects',
      meta: [
        { name: 'keywords', content: this.meta.keywords },
        {
          name: 'twitter:description',
          content: 'Bella models + projects - Galeria - ' + this.talentData.name
        },
        {
          name: 'twitter:app:name:iphone',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella models + projects'
        },
        { name: 'twitter:app:url:iphone', content: this.meta.url },

        {
          property: 'twitter:title',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella models + projects'
        },
        {
          property: 'og:title',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella models + projects'
        },
        { property: 'og:url', content: this.meta.url },
        {
          property: 'og:description',
          content: 'Bella models + projects - Galeria - ' + this.talentData.name
        },
        {
          property: 'og:site_name',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella models + projects'
        },
        {
          property: 'al:ios:app_name',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella models + projects'
        },
        {
          property: 'al:android:app_name',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella models + projects'
        },
        { property: 'al:ios:url', content: this.meta.url },
        { property: 'al:android:url', content: this.meta.url },
        { property: 'al:web:url', content: this.meta.url },

        {
          hid: 'description',
          name: 'description',
          content: 'Bella models + projects - Galeria - ' + this.talentData.name
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#talentGallery {
  position: relative;

  #loadGallery {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: white, $alpha: 0.9);
    z-index: 2;

    svg {
      width: 200px !important;
      height: auto !important;
    }
  }

  .container {
    padding: 0;

    .talent-gallery-intro {
      margin-top: 30px;
      margin-bottom: 30px;

      .col-12 {
        display: flex;
        flex-direction: column;

        .instagram {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          align-content: center;

          a {
            color: var(--dark);
            line-height: 1;

            &:hover {
              color: var(--strongGrey);
            }

            i {
              font-size: 26px;
            }

            span {
              i {
                font-size: 18px;
                vertical-align: text-bottom;
                margin-left: 5px;
              }
              h3 {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }

    .switch-galleries {
      margin-bottom: 30px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    .slider {
      margin-bottom: 25px;
    }

    .measures {
      margin-bottom: 45px;

      .col-md-12 {
        ul {
          padding: 0;
          margin: 0 100px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          align-content: center;

          li {
            font-family: var(--formFontFamily);
            font-size: var(--formFontSize);
            text-transform: uppercase !important;
            color: var(--strongGrey);
            display: inline-flex;
            padding: 5px 10px;

            &:first-of-type {
              padding-left: 0;
            }
            &:last-of-type {
              padding-right: 0;
            }

            .meas-type {
              font-weight: bold;
              margin-right: 5px;
            }
            .meas-val {
              font-weight: 300;
            }
          }
        }
      }
    }
  }
}
</style>
