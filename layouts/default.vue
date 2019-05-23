<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      // Object to get the inner width and height of the screen
      window: {
        width: 0,
        height: 0
      }
    }
  },

  computed: {},

  created() {
    // This is due to the server-side rendering. If you need to specify that you want to import a resource only on the client-side, you need to use the process.client variable
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

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
