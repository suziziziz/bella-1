<template>
  <div class="row talents-list justify-content-center reset-row">
    <div
      v-for="talent in talents"
      :key="talent.id"
      class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 text-center talent"
    >
      <router-link :to="{ path: '#' }" tag="a">
        <figure>
          <img :src="talent.cover" :alt="talent.name" class="img-fluid w-100" />

          <div class="item-hover">
            {{ talent.name }}
            <i class="fab fa-instagram"></i>
          </div>
        </figure>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },

  computed: {
    talents() {
      return this.list
    }
  }
}
</script>

<style lang="scss">
.talents-list {
  margin: 0 100px 40px 100px;

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
