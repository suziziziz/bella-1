<template>
  <header v-if="windowSizes.width >= 991">
    <div class="container-fluid reset-col">
      <nav>
        <!-- Logo -->
        <div class="row logo reset-row">
          <div class="col-12 reset-col text-center">
            <img src="/logo.png" alt="Bella #Models" height="95px" />
          </div>
        </div>

        <!-- Sections -->
        <div class="row sections reset-row">
          <div class="col-12 reset-col">
            <ul>
              <li v-for="section in sections" :key="section.id">
                <router-link :to="{ path: section.path }" tag="a" exact>
                  {{ section.name }}
                </router-link>
              </li>

              <!-- <li>
                <router-link :to="{ path: '/' }" tag="a" exact>{{
                  $t('navbar.home')
                }}</router-link>
              </li>
              <li>
                <router-link :to="{ path: '/quem-somos' }" tag="a" exact>{{
                  $t('navbar.whoWeAre')
                }}</router-link>
              </li>
              <li>
                <router-link
                  :to="{ path: '/modelos/feminino' }"
                  tag="a"
                  exact
                  >{{ $t('navbar.women') }}</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ path: '/modelos/masculino' }"
                  tag="a"
                  exact
                  >{{ $t('navbar.men') }}</router-link
                >
              </li>
              <li>
                <router-link :to="{ path: '/contato' }" tag="a" exact>{{
                  $t('navbar.contact')
                }}</router-link>
              </li>
              <li>
                <router-link
                  :to="{ path: '/quero-ser-modelo' }"
                  tag="a"
                  exact
                  >{{ $t('navbar.wantToBe') }}</router-link
                >
              </li>
              <li>
                <router-link :to="{ path: '/blog' }" tag="a" exact>{{
                  $t('navbar.blog')
                }}</router-link>
              </li> -->
            </ul>
          </div>
        </div>

        <!-- Social -->
        <div class="row social reset-row">
          <div class="col-12 reset-col text-center">
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/agenciabellamodels"
                  target="_blank"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bellamodelsagencia/"
                  target="_blank"
                >
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/bellamodelsrj" target="_blank">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="switch-lang">
          <span
            :class="currentLanguage === 'en' ? 'active' : ''"
            @click="translate('en')"
            >EN</span
          >
          |
          <span
            :class="currentLanguage === 'pt' ? 'active' : ''"
            @click="translate('pt')"
            >PT</span
          >
        </div>
      </nav>
    </div>
  </header>

  <header v-else class="header-mobile">
    <div class="container-fluid reset-col">
      <nav>
        <div class="menu-mobile">
          <div class="row intro reset-row">
            <div class="col-12">
              <div class="def-btn show-menu">
                <button id="mobileMenuBtn" @click="showMenu = !showMenu">
                  <i
                    :class="'fas ' + [showMenu ? 'fa-arrow-left' : 'fa-bars']"
                  ></i>
                </button>
              </div>

              <div class="logo text-center w-100">
                <img
                  src="/logo.png"
                  alt="Bella #Models"
                  height="50"
                  @click="$router.push({ path: '/' })"
                />
              </div>
            </div>
          </div>

          <transition name="fade" mode="out-in">
            <div v-show="showMenu" class="row sections mobile reset-row">
              <div class="row items reset-row w-100">
                <div class="col-12 reset-col">
                  <ul>
                    <li v-for="section in sections" :key="section.id">
                      <router-link :to="{ path: section.path }" tag="a" exact>
                        {{ section.name }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="row social reset-row w-100">
                <div class="col-12 reset-col text-center">
                  <ul>
                    <li>
                      <a
                        href="https://www.facebook.com/agenciabellamodels"
                        target="_blank"
                      >
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/bellamodelsagencia/"
                        target="_blank"
                      >
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/bellamodelsrj"
                        target="_blank"
                      >
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// import MenuBtn from './MenuBtn'

export default {
  // components: {
  //   'menu-btn': MenuBtn
  // },

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      showMenu: false
    }
  },

  computed: {
    sections() {
      return this.items
    },
    ...mapGetters({
      windowSizes: 'window/windowSizes',
      currentLanguage: 'language/currentLanguage'
    })
  },

  mounted() {
    if (this.currentLanguage === '') {
      this.setLanguage('pt')
    }
  },

  methods: {
    ...mapActions({
      setLanguage: 'language/setLanguage'
    }),
    translate(_locale) {
      this.$changeLang(_locale)
      this.setLanguage(_locale)
    }
  }
}
</script>

<style lang="scss" scoped></style>
