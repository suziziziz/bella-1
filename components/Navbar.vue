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
                <button
                  id="mobileMenuBtn"
                  @click="showMenu = !showMenu"
                ></button>
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
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
/**
 * Used to animate Airbnb Lottie animations
 */
import lottie from 'lottie-web'

import { mapGetters } from 'vuex'

export default {
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
      windowSizes: 'window/windowSizes'
    })
  },

  mounted() {
    this.mobileMenuAnimation()
  },

  methods: {
    mobileMenuAnimation() {
      const anim = lottie.loadAnimation({
        container: document.getElementById('mobileMenuBtn'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/animations/show-close.json'
      })

      anim.goToAndStop(0, true)
    }
  }
}
</script>

<style lang="scss" scoped></style>
