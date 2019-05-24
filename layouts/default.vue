<template>
  <div class="main-component">
    <main-nav :items="sections" />

    <div class="content">
      <nuxt />
    </div>

    <main-footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    'main-nav': Navbar,
    'main-footer': Footer
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
          name: 'Home',
          path: '/'
        },
        {
          id: '2',
          name: 'Quem somos',
          path: '/quem-somos'
        },
        {
          id: '3',
          name: 'Feminino',
          path: '/modelos/feminino'
        },
        {
          id: '4',
          name: 'Masculino',
          path: '/modelos/masculino'
        },
        {
          id: '5',
          name: 'Contato',
          path: '/contato'
        },
        {
          id: '6',
          name: 'Quero ser modelo',
          path: '/quero-ser-modelo'
        },
        {
          id: '7',
          name: 'Blog',
          path: '/blog'
        }
      ]
    }
  },

  created() {
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

  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight

      this.updateSize(this.window)
    },

    ...mapActions({
      updateSize: 'window/updateSize'
    })
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
  background: rgb(162, 128, 77);
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(162, 128, 77, 0.5);
}
</style>
