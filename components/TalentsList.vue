<template>
  <div class="row talents-list">
    <!-- Transition between loading and talents -->
    <transition-group name="talents" mode="out-in" class="transition-fix">
      <!-- Loading while fetching talents data -->
      <div
        v-if="thereIsNoTalents"
        id="loadingTalents"
        key="0"
        class="col-12 text-center"
      ></div>
      <!-- /Loading while fetching talents data -->
      <!-- Transition between talents -->
      <transition-group
        v-else
        key="1"
        name="talents"
        mode="out-in"
        class="transition-fix"
      >
        <div
          v-for="talent in talents"
          :key="talent.id"
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 text-center talent"
        >
          <router-link
            :to="{ path: '/modelo/' + talent.id + '/' + slugify(talent.name) }"
            tag="a"
          >
            <figure>
              <img
                :key="talent.id"
                v-lazy="talent.cover"
                :alt="talent.name"
                class="img-fluid w-100"
              />

              <div class="item-hover">
                {{ talent.name }}
                <i class="fab fa-instagram"></i>
              </div>
            </figure>
          </router-link>
        </div>
      </transition-group>
      <!-- /Transition between talents -->
    </transition-group>
    <!-- /Transition between loading and talents -->
  </div>
</template>

<script>
/**
 * Used to animate Airbnb Lottie animations
 */
import lottie from 'lottie-web'

export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      thereIsNoTalents: true
    }
  },

  computed: {
    talents() {
      return this.list
    }
  },

  watch: {
    talents: {
      handler: function(val, oldVal) {
        // eslint-disable-next-line no-console
        // console.log('talents lenght: ', this.$_.isEmpty(val))
        this.thereIsNoTalents = this.$_.isEmpty(val)
      },

      deep: true
    }
  },

  mounted() {
    lottie.loadAnimation({
      container: document.getElementById('loadingTalents'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/loader.json'
    })
  },

  methods: {
    slugify(string) {
      const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
      const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
      const p = new RegExp(a.split('').join('|'), 'g')
      return (
        string
          .toString()
          .toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with ‘and’
          // eslint-disable-next-line no-useless-escape
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          // eslint-disable-next-line no-useless-escape
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '')
      ) // Trim - from end of text
    }
  }
}
</script>

<style lang="scss">
.talents-list {
  margin: 0 100px 40px 100px;

  #loadingTalents {
    svg {
      width: 200px !important;
      height: auto !important;
    }
  }

  .talent {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    padding: 10px;

    a {
      figure {
        margin: 0;
        position: relative;

        img {
          transition: all 0.25s ease;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          filter: grayscale(1);
        }
        img[lazy='loaded'] {
          -webkit-animation-duration: 0.5s;
          animation-duration: 0.5s;
          -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
          -webkit-animation-name: fadeIn;
          animation-name: fadeIn;
        }
        .item-hover {
          position: absolute;
          padding: 20px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          z-index: 999;
          background-color: rgba(31, 26, 23, 0.5);
          opacity: 0;
          transition: all 0.25s ease;
          -webkit-transition-timing-function: linear;
          -moz-transition-timing-function: linear;
          -o-transition-timing-function: linear;
          transition-timing-function: linear;
          font-family: 'Lemon/Milk';
          font-weight: bold;
          color: white;
          font-size: 24px;
          text-transform: uppercase;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          align-content: center;

          i {
            font-weight: normal;
          }
        }
      }

      &:hover {
        figure {
          img {
            -webkit-box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);
            box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);
            filter: grayscale(0);
          }

          .item-hover {
            z-index: 999;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
