<template>
  <section id="home">
    <div class="row slider reset-row">
      <div class="col-12 reset-row">
        <home-slider :srcset="slides" />
      </div>
    </div>

    <div class="row instagram-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title">Instagram</h1>
        <i class="fab fa-instagram"></i>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import HomeSlider from '~/components/HomeSlider'

export default {
  components: {
    'home-slider': HomeSlider
  },

  middleware: ['signin'],

  data() {
    return {
      slides: [
        {
          id: '1',
          src: '/img/1.jpg'
        },
        {
          id: '2',
          src: '/img/2.jpg'
        }
      ],
      instagramData: []
      // meta: {
      //   title: 'Bella #Models',
      //   description:
      //     'Criada em 2006 e com duas sedes no Rio de Janeiro, a Bella Models é uma das mais fortes agências do Rio de Janeiro, prestando um serviço diferenciado no mercado fashion, comercial e plus size.',
      //   keywords:
      //     'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos',
      //   logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
      //   url: window.location.href
      // }
    }
  },

  mounted() {
    this.getInstagramInfo('bellamodelsagencia')

    // eslint-disable-next-line no-console
    // console.log('lodash: ', _.isEmpty(null))
  },

  methods: {
    ...mapGetters({
      authToken: 'authToken'
    }),

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
  }

  // head() {
  //   return {
  //     title: this.meta.title,
  //     meta: [
  //       { name: 'keywords', content: this.meta.keywords },
  //       { name: 'twitter:description', content: this.meta.description },
  //       { name: 'twitter:app:name:iphone', content: this.meta.title },
  //       { name: 'twitter:app:url:iphone', content: this.meta.url },

  //       { property: 'twitter:title', content: this.meta.title },
  //       { property: 'og:title', content: this.meta.title },
  //       { property: 'og:url', content: this.meta.url },
  //       { property: 'og:description', content: this.meta.description },
  //       { property: 'og:site_name', content: this.meta.title },
  //       { property: 'al:ios:app_name', content: this.meta.title },
  //       { property: 'al:android:app_name', content: this.meta.title },
  //       { property: 'al:ios:url', content: this.meta.url },
  //       { property: 'al:android:url', content: this.meta.url },
  //       { property: 'al:web:url', content: this.meta.url },

  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content: this.meta.description
  //       }
  //     ]
  //   }
  // }
}
</script>

<style lang="scss">
#home {
  .instagram-intro {
    margin-top: 50px;

    div {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: stretch;
      align-content: center;

      i {
        font-size: 26px;
        color: var(--dark);
        margin: 20px;
      }
    }
  }
}
</style>
