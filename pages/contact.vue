<template>
  <section id="contact">
    <div class="row contact-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">Contato</h1>
      </div>
    </div>

    <!--  -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      meta: {
        title: 'Contato | Bella #Models',
        description: 'Bella #Models - Entre em contato!',
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos',
        logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
        url: 'http://localhost:3000' + this.$route.fullPath
      }
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
  }
}
</script>

<style lang="scss">
#contact {
  .contact-intro {
    margin-top: 40px;

    .col-12 {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
