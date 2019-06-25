<template>
  <section id="talents">
    <div class="row talents-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">{{ $route.params.gender }}</h1>
      </div>
    </div>

    <div class="row categories reset-row">
      <div class="col-12 reset-col text-center">
        <ul>
          <li
            :class="currCategory === 'fashion' ? 'active' : ''"
            @click="selectCategory('fashion')"
          >
            Fashion
          </li>
          <li
            :class="currCategory === 'comercial' ? 'active' : ''"
            @click="selectCategory('comercial')"
          >
            Comercial
          </li>
        </ul>
      </div>
    </div>

    <router-view :key="$route.fullPath" :list="talents" />
  </section>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  middleware: ['signin'],

  data() {
    return {
      talentList: [],
      currCategory: 'fashion',
      meta: {
        title:
          'Modelos | ' +
          this.$_.capitalize(this.$route.params.gender) +
          ' | Bella #Models',
        description: 'Bella #Models - Conheça nossos modelos',
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos, moda, fashion, comercial',
        logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
        url: 'http://localhost:3000' + this.$route.fullPath
      }
    }
  },

  computed: {
    talents() {
      /**
       * Categories
       *
       * 1    === Modelo
       * 2    === Ator
       * 3    === Celebridade
       * 651  === Fashion
       * 652  === Comercial
       *
       */

      const gender = this.$route.params.gender === 'feminino' ? 'woman' : 'man'
      const catId =
        this.currCategory === 'fashion'
          ? 651
          : this.currCategory === 'comercial'
          ? 652
          : 1

      return this.talentList.filter(talent => {
        return (
          talent.gender === gender &&
          this.checkCategories(talent.categories, catId) === true
        )
      })
    }
  },

  mounted() {
    this.getTalents()
  },

  methods: {
    ...mapGetters({
      authToken: 'authToken'
    }),

    getTalents(_user) {
      const token = this.authToken()

      axios
        .get('https://integration.managerfashion.net/api/talents', {
          params: { language: 'pt' },
          headers: { Authorization: 'bearer ' + token }
        })
        .then(response => {
          // eslint-disable-next-line no-console
          console.log('response: ', response.data.data)

          this.talentList = response.data.data
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('getTalents error: ', error)
        })
    },

    selectCategory(_cat) {
      this.currCategory = _cat
    },

    checkCategories(_obj, _cat) {
      const response = this.$_.findIndex(_obj, { id: _cat })

      // eslint-disable-next-line no-console
      // console.log('Response: ', response)

      if (response >= 0) {
        return true
      } else {
        return false
      }
    }
  },

  head() {
    return {
      title: this.meta.title,
      meta: [
        { name: 'keywords', content: this.meta.keywords },
        { name: 'twitter:description', content: this.meta.description },
        { name: 'twitter:app:name:iphone', content: this.meta.title },
        { name: 'twitter:app:url:iphone', content: this.meta.url },

        { property: 'twitter:title', content: this.meta.title },
        { property: 'og:title', content: this.meta.title },
        { property: 'og:url', content: this.meta.url },
        { property: 'og:description', content: this.meta.description },
        { property: 'og:site_name', content: this.meta.title },
        { property: 'al:ios:app_name', content: this.meta.title },
        { property: 'al:android:app_name', content: this.meta.title },
        { property: 'al:ios:url', content: this.meta.url },
        { property: 'al:android:url', content: this.meta.url },
        { property: 'al:web:url', content: this.meta.url },

        {
          hid: 'description',
          name: 'description',
          content: this.meta.description
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#talents {
  .talents-intro {
    margin-top: 30px;

    .col-12 {
      display: flex;
      flex-direction: column;
    }
  }

  .categories {
    .col-12 {
      ul {
        margin: 20px 0 15px 0;
        padding: 0;

        li {
          display: inline-flex;
          font-family: var(--navFontFamily);
          font-size: 16px;
          transition: var(--defaultTransition);
          cursor: pointer;
          padding: 0 10px;
          margin: 0 10px;

          &:hover {
            font-family: var(--titleStrongFontFamily);
            border-bottom: 3px solid;
          }
        }
        li.active {
          font-family: var(--titleStrongFontFamily);
          transition: var(--defaultTransition);
          border-bottom: 3px solid;
        }
      }
    }
  }
}
</style>
