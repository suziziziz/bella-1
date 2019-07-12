import Vue from 'vue'
import Vuesax from 'vuesax'
// import { vsLoading } from 'vuesax'

import 'vuesax/dist/vuesax.css'

Vue.use(Vuesax)

export default () => {
  Vue.prototype.$fullScreenLoading = function() {
    this.$vs.loading({
      type: 'border',
      color: '#1F1A17',
      background: 'rgba(255, 255, 255, .8)',
      scale: '1',
      clickEffect: true
    })

    setTimeout(() => {
      this.$vs.loading.close()
    }, 1000)
  }
}
