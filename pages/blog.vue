<template>
  <section id="blog">
    <div class="row blog-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">
          {{ $t('blog.title') }}
        </h1>
        <div class="blog-sub">
          {{ $t('blog.desc_1') }}<br >{{ $t('blog.desc_2') }}
        </div>
      </div>
    </div>

    <div class="row blog-items reset-row">
      <transition-group name="fade" mode="out-in" class="w-100">
        <div
          v-for="post in posts"
          v-show="!$_.isEmpty(blogPosts)"
          :key="post.id"
          class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 item"
        >
          <div class="date">
            {{ post.created_at | formatDate
            }}
          </div>

          <div class="image">
            <nuxt-link :to="`/blog/${post.slug}/${post.id}`">
              <figure>
                <img
                  v-if="!$_.isEmpty(blogPosts)"
                  v-lazy="getImage(post.thumbnail)"
                  :alt="post.description"
                  class="img-fluid w-100 lazy"
                />

                <div
                  v-if="!$_.isEmpty(blogPosts)"
                  :id="'post-' + post.id"
                  class="item-hover"
                  @mouseenter="animatePostRead('post-' + post.id, 'enter')"
                  @mouseleave="animatePostRead('post-' + post.id, 'exit')"
                >
                  <!-- {{ blogPosts[n].body }} -->
                </div>
              </figure>
            </nuxt-link>
          </div>

          <div class="desc">
            <a v-if="!$_.isEmpty(blogPosts)" href="#">
              {{ post.title }}
            </a>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="row blog-items reset-row justify-content-center" v-if="!enabledScroll && posts.length==0">
      <h4 class="text-center">{{$t('blog.not_found_news')}}</h4>
    </div>
    <div class="row blog-items reset-row">
      <div
          v-show="enabledScroll"
          id="blogLoading"
          key="blogLoading"
        />
    </div>
  </section>
</template>

<script>
/**
 * Used to animate Airbnb Lottie animations
 */
import lottie from 'lottie-web'
import axios from 'axios'
import Loader from '~/assets/animations/loader'
import seeMore from '~/assets/animations/seeMore'
import moment from 'moment'
import { mapGetters } from 'vuex';
var observer
export default {
  async asyncData({store,$axios,error}) {
   try {
     let posts
      if(!store.state.posts){
        let { data } = await $axios.$get(`/posts/blog/${store.state.lang.locale}?paginate=8&page=1`)
        posts = data
        store.commit('setPost', posts)
      }
      return {
        blogPosts:posts ? posts:store.state.posts
      }
     
   } catch (error) {
    error({ statusCode: 404, message: 'Post not found' })
   } 
  },
  data() {
    return {
      meta: {
        title: 'Blog | Bella #Models',
        description:
          'Bella #Models - Fique por dentro de tudo que acontece no mundo da moda!',
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos, moda, fashion, comercial',
        logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
        url: 'https://agenciabellamodels.com/' + this.$route.fullPath
      },
      blogPosts: [],
      currDate: new Date(),
      enabledScroll:false,
      loadPost:false,
      options: {},
      target:'',
      observer:''
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
  },

  mounted() {
    lottie.loadAnimation({
      container: document.getElementById('blogLoading'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: Loader
    })
    this.target = document.querySelector('#blogLoading')
    
    observer = new IntersectionObserver(this.infiniteScroll, {
      rootMargin: '0px 0px 0px 0px',
      threshold: .5,
    });
    observer.observe(this.target)
    setTimeout(()=>this.enabledScroll = true,2000)
  },
  filters:{
    formatDate(val){
      return moment(val).format('DD/MM/YYYY')
    }
  },
  computed: {
    ...mapGetters(['page','lang','posts'])
  },
  watch: {
    lang(){
      console.log('watch');
      
      this.enabledScroll = true,
      this.loadPost = false,
      this.$store.commit('resetBlog')
      observer.observe(this.target)
      this.$nextTick(()=>this.loadMore())
    }
  },
  methods: {
    infiniteScroll(entries, observer) {         
      if (entries[0].isIntersecting) {
        this.loadMore()        
      }
    },
    getImage(url){
      return  url.match(/http/g) && url.match(/http/g).length > 0 
      ? url
      :`https://bellamodels.managerfashion.net${url}`
      
    },
    async loadMore(){
      
      if(!this.loadPost){
        this.loadPost = true
        let page = this.page
        let {data:posts} = await this.$axios.$get(`/posts/blog/${this.lang}?paginate=8&page=${++page}`)
        if(posts.length>0){
          this.$store.commit('addPost', posts)
          this.loadPost = false
        }else{
          this.enabledScroll = false
          observer.unobserve(this.target)
        }
      }
    },

    animatePostRead(_container, _action) {
      const anim = lottie.loadAnimation({
        container: document.getElementById(_container.toString()),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData: seeMore
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
#blog {
  .blog-intro {
    margin-top: 30px;
    margin-bottom: 50px;

    .col-12 {
      display: flex;
      flex-direction: column;

      .blog-sub {
        font-family: var(--formFontFamily);
        font-size: var(--descFontSize);
        font-weight: 300;
        text-transform: uppercase;
        margin-top: 20px;
      }
    }
  }

  .blog-items {
    position: relative;
    min-height: 100px;
    margin: 0 50px 40px 50px;

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
