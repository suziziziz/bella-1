<template>
  <section id="talentGallery">
    <div class="row talent-gallery-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">{{ talentData.name }}</h1>

        <div v-if="talentData.instagram" class="instagram">
          <a href="http://" target="_blank">
            <i class="fab fa-instagram"></i>
          </a>

          <a href="http://" target="_blank">
            <span>
              <i
                v-if="$_.isEmpty(instagramData)"
                class="fas fa-spinner fa-spin"
              ></i>
              <h3 v-else class="title-strong">{{ instagramData.followers }}</h3>
            </span>
          </a>
        </div>
      </div>
    </div>

    <div class="row switch-galleries reset-row">
      <div class="col-md-4">
        <div class="def-btn">
          <button
            :class="activeGallery == 'book' ? 'active' : ''"
            @click="activeGallery = 'book'"
          >
            Book
          </button>
        </div>
      </div>

      <div class="col-md-4">
        <div class="def-btn">
          <button
            :class="activeGallery == 'snap' ? 'active' : ''"
            @click="activeGallery = 'snap'"
          >
            Polaroids
          </button>
        </div>
      </div>

      <div class="col-md-4">
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
  </section>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  middleware: ['signin'],

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
      activeGallery: 'book'
    }
  },

  mounted() {
    this.getTalentInfo()
  },

  methods: {
    ...mapGetters({
      authToken: 'authToken'
    }),

    getTalentInfo() {
      const token = this.authToken()

      axios
        .get('https://integration.managerfashion.net/api/talent/profile', {
          params: { id: this.$route.params.id, language: 'pt' },
          headers: { Authorization: 'bearer ' + token }
        })
        .then(response => {
          // eslint-disable-next-line no-console
          // console.log('response: ', response)

          this.talentData = response.data
          this.getInstagramInfo(this.talentData.instagram)
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('getTalentInfo error: ', error)
        })
    },

    getInstagramInfo(_user) {
      const token = this.authToken()

      axios
        .get('https://integration.managerfashion.net/api/agency/instagram', {
          params: { username: _user.toString() },
          headers: { Authorization: 'bearer ' + token }
        })
        .then(response => {
          // eslint-disable-next-line no-console
          // console.log('response: ', response)

          this.instagramData = response.data
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('getInstagramInfo error: ', error)
        })
    }
  },

  head() {
    return {
      title: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella #Models',
      meta: [
        { name: 'keywords', content: this.meta.keywords },
        {
          name: 'twitter:description',
          content: 'Bella #Models - Galeria - ' + this.talentData.name
        },
        {
          name: 'twitter:app:name:iphone',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella #Models'
        },
        { name: 'twitter:app:url:iphone', content: this.meta.url },

        {
          property: 'twitter:title',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella #Models'
        },
        {
          property: 'og:title',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella #Models'
        },
        { property: 'og:url', content: this.meta.url },
        {
          property: 'og:description',
          content: 'Bella #Models - Galeria - ' + this.talentData.name
        },
        {
          property: 'og:site_name',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella #Models'
        },
        {
          property: 'al:ios:app_name',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella #Models'
        },
        {
          property: 'al:android:app_name',
          content: 'Modelo | ' + this.talentData.name + ' | ' + 'Bella #Models'
        },
        { property: 'al:ios:url', content: this.meta.url },
        { property: 'al:android:url', content: this.meta.url },
        { property: 'al:web:url', content: this.meta.url },

        {
          hid: 'description',
          name: 'description',
          content: 'Bella #Models - Galeria - ' + this.talentData.name
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#talentGallery {
  .talent-gallery-intro {
    margin-top: 30px;
    margin-bottom: 50px;

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
    margin: 0 100px;

    .col-md-4 {
    }
  }
}
</style>
