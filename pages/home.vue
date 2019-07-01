<template>
  <section id="home">
    <div class="row slider reset-row">
      <div class="col-12 reset-col">
        <home-slider :srcset="slides" />
      </div>
    </div>

    <div class="row instagram-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title">{{ $t('index.title') }}</h1>
        <i class="fab fa-instagram"></i>
      </div>
    </div>

    <div class="row instagram-items reset-row">
      <transition-group name="fade" mode="out-in" class="w-100">
        <div
          v-show="$_.isEmpty(instagramData)"
          id="instagramLoading"
          key="instagramLoading"
        />

        <div
          v-for="item in instagramData.all"
          v-show="!$_.isEmpty(instagramData)"
          :key="item.url"
          class="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 item"
        >
          <a :href="item.url" target="_blank">
            <figure>
              <img :src="item.src" :alt="item.desc" class="img-fluid" />

              <div class="item-hover">
                {{ item.desc }}
              </div>
            </figure>
          </a>
        </div>
      </transition-group>
    </div>

    <div class="row blog-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title">Blog</h1>
      </div>
    </div>

    <div class="row blog-items reset-row">
      <transition-group name="fade" mode="out-in" class="w-100">
        <div
          v-show="$_.isEmpty(blogPosts)"
          id="blogLoading"
          key="blogLoading"
        />

        <div
          v-for="n in 8"
          v-show="!$_.isEmpty(blogPosts)"
          :key="n"
          class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 item"
        >
          <div class="date">
            {{ currDate.getDate() }}/{{ currDate.getMonth() }}/{{
              currDate.getFullYear()
            }}
          </div>

          <div class="image">
            <a href="#" target="_blank">
              <figure>
                <img
                  v-if="!$_.isEmpty(blogPosts)"
                  src="/img/blog-placeholder.jpg"
                  :alt="blogPosts[n].title"
                  class="img-fluid w-100"
                />

                <div
                  v-if="!$_.isEmpty(blogPosts)"
                  :id="'post-' + n"
                  class="item-hover"
                  @mouseenter="animatePostRead('post-' + n, 'enter')"
                  @mouseleave="animatePostRead('post-' + n, 'exit')"
                >
                  <!-- {{ blogPosts[n].body }} -->
                </div>
              </figure>
            </a>
          </div>

          <div class="desc">
            <a v-if="!$_.isEmpty(blogPosts)" href="#">
              {{ blogPosts[n].title }}
            </a>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
/**
 * Used to animate Airbnb Lottie animations
 */
import lottie from 'lottie-web'

import axios from 'axios'
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
      instagramData: [],
      blogPosts: [],
      currDate: new Date()
    }
  },

  mounted() {
    lottie.loadAnimation({
      container: document.getElementById('instagramLoading'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/loader.json'
    })

    lottie.loadAnimation({
      container: document.getElementById('blogLoading'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/loader.json'
    })

    this.getInstagramInfo('bellamodelsagencia')
    this.getPosts()

    // eslint-disable-next-line no-console
    // console.log('lodash: ', this.$_)
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
    },

    getPosts() {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          // eslint-disable-next-line no-console
          // console.log('response: ', response)

          this.blogPosts = response.data
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('getPosts error: ', error)
        })
    },

    animatePostRead(_container, _action) {
      const anim = lottie.loadAnimation({
        container: document.getElementById(_container.toString()),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/animations/seeMore.json'
      })

      switch (_action) {
        case 'enter':
          /**
           * Transition time
           */
          setTimeout(() => {
            anim.play()
            // eslint-disable-next-line no-console
            // console.log('anim enter')
          }, 250)
          break

        case 'exit':
          anim.destroy()
          // eslint-disable-next-line no-console
          // console.log('anim exit')
          break
      }
    }
  }
}
</script>

<style lang="scss">
#home {
  .instagram-intro {
    margin-top: 50px;

    .col-12 {
      display: flex;
      flex-direction: column;

      i {
        font-size: 26px;
        color: var(--dark);
        margin: 20px 0px 10px 0;
      }
    }
  }

  .instagram-items {
    position: relative;
    min-height: 100px;
    margin: 0 100px 40px 100px;

    @media (max-width: 767px) {
      margin: 0 50px 40px 50px;
    }

    #instagramLoading {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      z-index: 1;
      background: rgba(255, 255, 255, 0.5);

      svg {
        width: 200px !important;
        height: auto !important;
      }
    }

    .item {
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
          }

          .item-hover {
            position: absolute;
            padding: 50px 10px 10px 10px;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 0;
            z-index: 999;
            background-color: rgba(255, 255, 255, 0.9);
            opacity: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            transition: all 0.25s ease;
            -webkit-transition-timing-function: linear;
            -moz-transition-timing-function: linear;
            -o-transition-timing-function: linear;
            transition-timing-function: linear;
            font-family: 'ClementePDag';
            font-weight: 300;
            color: var(--dark);
            font-size: 14px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            align-content: center;
          }
        }

        &:hover {
          figure {
            img {
              -webkit-box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);
              box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);
            }

            .item-hover {
              z-index: 999;
              opacity: 1;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .blog-intro {
    margin-bottom: 10px;

    .col-12 {
      display: flex;
      flex-direction: column;
    }
  }

  .blog-items {
    position: relative;
    min-height: 100px;
    margin: 0 150px 40px 150px;

    @media (max-width: 767px) {
      margin: 0 50px 40px 50px;
    }

    #blogLoading {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      z-index: 1;
      background: rgba(255, 255, 255, 0.5);

      svg {
        width: 200px !important;
        height: auto !important;
      }
    }

    .item {
      display: inline-flex;
      flex-direction: column;
      position: relative;
      padding: 10px;

      .date {
        font-family: 'Helvetica';
        font-weight: 300;
        font-size: 14px;
        color: var(--dark);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
        align-content: stretch;
      }

      .desc {
        a {
          font-family: 'Helvetica';
          font-weight: 300;
          font-size: 14px;
          color: var(--dark);

          &:hover {
            text-decoration: underline;
          }
        }
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: stretch;
      }

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
          }

          .item-hover {
            position: absolute;
            padding: 10px;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 0;
            z-index: 999;
            background-color: rgba(255, 255, 255, 0.9);
            opacity: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            transition: all 0.25s ease;
            -webkit-transition-timing-function: linear;
            -moz-transition-timing-function: linear;
            -o-transition-timing-function: linear;
            transition-timing-function: linear;
            font-family: 'ClementePDag';
            font-weight: 300;
            color: var(--dark);
            font-size: 14px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            align-content: center;
          }
        }

        &:hover {
          figure {
            img {
              -webkit-box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);
              box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);
            }

            .item-hover {
              z-index: 999;
              opacity: 1;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
