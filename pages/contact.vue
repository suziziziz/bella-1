<template>
  <section id="contact">
    <div class="row contact-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">{{ $t('contact.title') }}</h1>
      </div>
    </div>

    <div class="row contact">
      <div class="col-lg-4 infos justify-content-center">
        <div class="open-time text-center">
          <p class="c-title">{{ $t('contact.opening') }}</p>
          <p class="c-desc">
            {{ $t('contact.hours') }}<br />
            {{ $t('contact.weekendHours') }}
          </p>
        </div>

        <div class="address text-center">
          <p class="c-title">{{ $t('contact.address') }}</p>
          <p class="c-desc">
            {{ $t('contact.addressInfo') }}
          </p>
        </div>

        <div class="phone text-center">
          <p class="c-title">{{ $t('contact.phone') }}</p>
          <p class="c-desc">
            +55 (21) 3860-6633
          </p>
        </div>

        <div class="whatsapp text-center">
          <p class="c-title">Whatsapp</p>
          <p class="c-desc">
            +55 (21) 97031-7962
          </p>
        </div>

        <div class="email text-center">
          <p class="c-title">Email</p>
          <p class="c-desc">
            contato@bellamodels.com.br
          </p>
        </div>
      </div>

      <div class="col-lg-8 form">
        <h3 class="title-strong">{{ $t('contact.message') }}</h3>
        <contact-form :inputs="inputs" />
      </div>
    </div>

    <div class="row map">
      <div class="col-12 p-0">
        <g-map name="Bella #Models" />
      </div>
    </div>
  </section>
</template>

<script>
import ContactForm from '~/components/ContactForm'
import GMap from '~/components/GMap'

export default {
  components: {
    'contact-form': ContactForm,
    'g-map': GMap
  },

  data() {
    return {
      meta: {
        title: 'Contato | Bella #Models',
        description: 'Bella #Models - Entre em contato!',
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos, moda, fashion, comercial',
        logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
        url: 'http://localhost:3000' + this.$route.fullPath
      },
      inputs: [
        {
          id: 0,
          name: 'Name',
          type: 'text'
        },
        {
          id: 1,
          name: 'Email',
          type: 'email'
        },
        {
          id: 2,
          name: 'Subject',
          type: 'text'
        },
        {
          id: 3,
          name: 'Message',
          type: 'textarea',
          rows: '2'
        }
      ]
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
    margin-top: 30px;
    margin-bottom: 50px;

    .col-12 {
      display: flex;
      flex-direction: column;
    }
  }

  .contact {
    margin: 0 150px;
    padding: 40px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 1;
    background: white;

    @media (max-width: 667px) {
      margin: 0 75px;
      padding: 40px 5px;
    }

    .infos {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      align-content: stretch;

      .open-time,
      .address,
      .phone,
      .whatsapp {
        margin-bottom: 15px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      width: 100%;

      @media (max-width: 991px) {
        h3 {
          margin: 40px 0;
        }
      }
    }
  }

  .map {
    margin: -100px 50px 50px 50px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 0;
  }
}
</style>
