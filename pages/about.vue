<template>
  <section id="about">
    <div class="row about-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">
          {{ $t('about.title') }}
        </h1>
      </div>
    </div>

    <div class="row about reset-row justify-content-center">
      <div class="col-12 col-lg-6 reset-col">
        <p v-for="n in 13" :key="n" class="desc">
          {{ $t('about.desc_' + n.toString()) }}
        </p>
      </div>
    </div>

    <!-- <div class="row team-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h3 class="title-strong">
          {{ $t('about.team') }}
        </h3>
      </div>
    </div>

    <div class="row team reset-row text-center">
      <div
        v-for="n in 15"
        :key="n"
        class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 person"
      >
        <p class="position">
          {{ $t('about.teamInfo.' + n.toString() + '.position') }}
        </p>
        <p class="name">
          {{ $t('about.teamInfo.' + n.toString() + '.name') }}
        </p>
        <div class="social">
          <a
            :href="
              'https://www.facebook.com/bellamodelsbr/' +
                $t('about.teamInfo.' + n.toString() + '.facebook')
            "
            target="_blank"
          >
            <i class="fab fa-facebook-f" />
          </a>
          <a
            :href="
              'https://www.instagram.com/bellamodelsbr/' +
                $t('about.teamInfo.' + n.toString() + '.instagram')
            "
            target="_blank"
          >
            <i class="fab fa-instagram" />
          </a>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      meta: {
        title: 'Sobre | Bella models + projects',
        description: 'Bella models + projects - Saiba mais sobre quem somos!',
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos, moda, fashion, comercial',
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
#about {
  p.desc{
    font-family:var(--navActiveFontFamily);
    font-weight: 600;
  }
  .about-intro {
    margin-top: 30px;

    .col-12 {
      display: flex;
      flex-direction: column;
    }
  }

  .about {
    margin: 50px 100px;
  }

  .team-intro {
    margin-bottom: 25px;
  }

  .team {
    margin: 0 150px 50px 150px;

    @media (min-width: 992px) {
      .person:nth-child(1) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(2) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(3) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(4) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(5) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(6) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(7) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(8) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(9) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(10) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(11) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(12) {
        border-bottom: 2px solid #3c3c3c;
      }
    }

    @media (min-width: 577px) and (max-width: 991px) {
      .person:nth-child(3) {
        border-bottom: 2px solid #3c3c3c;
      }
      .person:nth-child(4) {
        border-bottom: 2px solid #3c3c3c;
      }
    }

    @media (max-width: 576px) {
      .person {
        border-bottom: 2px solid #3c3c3c;

        &:last-of-type {
          border: none;
        }
      }
    }

    .person {
      padding: 25px 15px;
      p.position {
        // font-family: 'Helvetica';
        font-weight: bold;
        font-size: 16px;
        color: #3c3c3c;
        margin-bottom: 0;
      }
      p.name {
        // font-family: 'Helvetica';
        font-weight: 300;
        font-size: 16px;
        color: #3c3c3c;
      }
      .social {
        a {
          font-size: 20px;
          color: #3c3c3c;
          padding: 0 5px;

          &:hover {
            color: var(--lessDark);
          }
        }
      }
    }
  }
}
</style>
