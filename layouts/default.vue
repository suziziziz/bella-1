<template>
  <div class="main-component">
    <gui />
    <!-- Header -->
    <main-nav :items="sections" />

    <div class="content" v-if="load">
      <!-- Router-view -->
      <transition name="fade" mode="out-in" >
        <nuxt :key="$route.fullPath" />
      </transition>

      <!-- App install -->
      <div id="appInstall" notify="false">
        <div id="closeAppInstall" class="close-btn" @click="closeInstall()">
          <i class="fas fa-times" />
        </div>

        <p class="m-0">Adicione <b>Bella #Models</b> à sua tela inicial</p>

        <div class="download">
          <span id="downloadAnim" />
          <button id="btnInstall">
            Adicionar app
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <main-footer />
  </div>
</template>

<script>
/**
 * Used to animate Airbnb Lottie animations
 */
import lottie from 'lottie-web'

import { mapActions, mapGetters } from 'vuex'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import Gui from '~/components/Gui.vue'
import DownloadAnimation from '~/assets/animations/download'
function gtag(){dataLayer.push(arguments);}
export default {
  // middleware: ['signin'],

  components: {
    'main-nav': Navbar,
    'main-footer': Footer,
    'gui': Gui
  },

  data() {
    return {
      // Object to get the inner width and height of the screen
      window: {
        width: 0,
        height: 0
      },
      // Menu sections passed to Navbar component
      sections: [
        {
          id: '1',
          name: this.$t('navbar.home'),
          path: '/'
        },
        {
          id: '2',
          name: this.$t('navbar.whoWeAre'),
          path: '/quem-somos'
        },
        {
          id: '3',
          name: this.$t('navbar.women'),
          path: '/modelos/feminino'
        },
        {
          id: '4',
          name: this.$t('navbar.men'),
          path: '/modelos/masculino'
        },
        {
          id: '5',
          name: this.$t('navbar.contact'),
          path: '/contato'
        },
        {
          id: '6',
          name: this.$t('navbar.wantToBe'),
          path: '/quero-ser-modelo'
        },
        {
          id: '7',
          name: this.$t('navbar.blog'),
          path: '/blog'
        }
      ],
      load:false
    }
  },

  computed: {
    ...mapGetters({
      currentLocale: 'lang/currentLocale'
    })
  },
  created() {
    this.$store.dispatch('setToken').then((payload)=>{
      // console.log(payload)
      this.load = true
    })
    
    // This is due to the server-side rendering.
    // If you need to specify that you want to import a resource
    // only on the client-side, you need to use the process.client variable
    if (process.browser) {
      // Retrieve the inner width and height of the screen
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('resize', this.handleResize)

      setTimeout(() => {
        // Trigger function
        this.handleResize()
      }, 10)
    }
  },

  mounted() {
    this.animateDownload('downloadAnim')
    window.dataLayer = window.dataLayer || [];
    
    gtag('js', new Date());
    gtag('config', 'G-2WEYJL5ZWC');
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight

      this.updateSize(this.window)
    },

    ...mapActions({
      updateSize: 'window/updateSize',
      setLocale: 'lang/setLocale'
    }),

    closeInstall() {
      const el = document.getElementById('appInstall')
      el.style.display = 'none'
    },

    animateDownload(_container) {
      const animData = {
        container: document.getElementById(_container.toString()),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        autoloadSegments: false,
        animationPath: DownloadAnimation
      }
      const anim = lottie.loadAnimation(animData)

      anim.addEventListener('DOMLoaded', function() {
        anim.play()
      })
    }
  }
}
</script>

<style lang="scss">
html {
  overflow-x: hidden;
}
html,
body {
  height: 100%;
  width: 100%;
  background-color: white;
}
.main-component {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: auto;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 0px;
  border-radius: 0px;
  background: white;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 0px;
  border-radius: 5px;
  background: rgb(31, 26, 23);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(31, 26, 23, 0.5);
}
</style>
