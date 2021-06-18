<template>
  <section id="blog">    
    <div class="row blog-items reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">
          {{ post.title }}
        </h1>
        <div class="blog-sub">
          {{ post.description }}
        </div>
        <div class="blog-sub">
          {{ post.created_at | formatDate}}
        </div>
        <div v-html="post.content"></div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from 'moment'
export default {
  async created(){
    try {
      const { data:post } = await this.$axios.get(`/posts/blog/${this.$store.state.lang.locale}/${this.$route.params.post_id}`)
      this.post= post
      
    } catch (e) {
      error({ statusCode: 404, message: 'Post not found' })
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { name: 'keywords', content: this.meta.keywords },
        { name: 'twitter:description', content: this.meta.description },
        { name: 'twitter:app:name:iphone', content: this.meta.title },
        { name: 'twitter:app:url:iphone', content: this.meta.url },

        { property: 'twitter:title', content: this.post.title },
        { property: 'og:title', content: this.post.title },
        { property: 'og:url', content: this.meta.url },
        { property: 'og:description', content: this.post.description },
        { property: 'og:site_name', content: this.meta.title },
        { property: 'al:ios:app_name', content: this.meta.title },
        { property: 'al:android:app_name', content: this.meta.title },
        { property: 'al:ios:url', content: this.meta.url },
        { property: 'al:android:url', content: this.meta.url },
        { property: 'al:web:url', content: this.meta.url },

        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        }
      ]
    }
  },
  filters:{
    formatDate(val){
      return moment(val).format('DD/MM/YYYY')
    }
  },
  data() {
    return {
      post:'',
      meta: {
        title: 'Blog | Bella models + projects',
        description:
          'Bella models + projects - Fique por dentro de tudo que acontece no mundo da moda!',
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos, moda, fashion, comercial',
        logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
        url: 'https://agenciabellamodels.com/' + this.$route.fullPath
      },
    }
  },
}
</script>