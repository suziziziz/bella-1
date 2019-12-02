<template>
  <section id="getScouted">
    <div class="row get-scouted-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">
          {{ $t('getScouted.title') }}
        </h1>
      </div>
    </div>

    <div class="row get-scouted">
      <div class="col-12 text-center">
        <h3 class="title-strong text-capitalize">
          {{ $t('getScouted.firstSteps') }}
        </h3>
      </div>

      <div class="row form reset-row">
        <get-scouted-form
          :inputs="inputs"
          :selects="selects"
          :images="images"
        />
      </div>
    </div>
  </section>
</template>

<script>
import GetScoutedForm from '~/components/GetScoutedForm'

export default {
  components: {
    'get-scouted-form': GetScoutedForm
  },

  data() {
    return {
      meta: {
        title: 'Quero ser modelo | Bella models + projects',
        description:
          'Bella models + projects - Que bom que você veio até aqui. Que tal fazer parte do nosso time de agenciados? Basta preencher esse formulário e adicionar suas melhores fotos. Uma dica bacana: Evite maquiagem e faça seus cliques em fundo neutro. Ah! Capricha na pose, hein!?',
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos, moda, fashion, comercial',
        logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
        url: 'http://localhost:3000' + this.$route.fullPath
      },
      inputs: [
        {
          id: 0,
          name: 'Name',
          placeholder: 'Nome completo',
          type: 'text'
        },
        {
          id: 1,
          name: 'Gender',
          placeholder: 'Gênero',
          type: 'select',
          options: [
            {
              name: 'Feminino'
            },
            {
              name: 'Masculino'
            }
          ]
        },
        {
          id: 3,
          name: 'Birthday',
          placeholder: 'Data de nascimento',
          type: 'text'
        },
        {
          id: 4,
          name: 'Email',
          placeholder: 'Email',
          type: 'email'
        },
        {
          id: 5,
          name: 'Phone',
          placeholder: 'Telefone',
          type: 'text'
        },
        {
          id: 6,
          name: 'Address',
          placeholder: 'Endereço',
          type: 'text'
        }
      ],
      selects: [
        {
          id: 0,
          name: 'Height',
          placeholder: 'Altura',
          type: 'select',
          options: []
        },
        {
          id: 1,
          name: 'Weight',
          placeholder: 'Peso',
          type: 'select',
          options: []
        },
        {
          id: 2,
          name: 'Bust',
          placeholder: 'Tórax',
          type: 'select',
          options: []
        },
        {
          id: 3,
          name: 'Waist',
          placeholder: 'Cintura',
          type: 'select',
          options: []
        },
        {
          id: 4,
          name: 'Hips',
          placeholder: 'Quadril',
          type: 'select',
          options: []
        },
        {
          id: 5,
          name: 'Shoes',
          placeholder: 'Sapato',
          type: 'select',
          options: []
        },
        {
          id: 6,
          name: 'Eyes',
          placeholder: 'Olhos',
          type: 'select',
          options: []
        },
        {
          id: 7,
          name: 'Hair',
          placeholder: 'Cabelo',
          type: 'select',
          options: []
        }
      ],
      images: [
        {
          id: 0,
          name: 'Front'
        },
        {
          id: 1,
          name: 'SideShot'
        },
        {
          id: 2,
          name: 'FullBody'
        }
      ],
      optHair: [
        { text: 'Avelã', textEn: 'Hazel' },
        { text: 'Careca', textEn: 'Hairless' },
        { text: 'Castanho', textEn: 'Chestnut' },
        { text: 'Castanho Café', textEn: 'Brown Coffee' },
        { text: 'Castanho Claro', textEn: 'Light Brown' },
        { text: 'Castanho Escuro', textEn: 'Dark Brown' },
        { text: 'Chocolate', textEn: 'Brown' },
        { text: 'Cinza', textEn: 'Grey' },
        { text: 'Cinza Escuro', textEn: 'Grey Black' },
        { text: 'Escuro', textEn: 'Dark' },
        { text: 'Grisalho', textEn: 'Salt and Pepper' },
        { text: 'Loiro', textEn: 'Blonde' },
        { text: 'Loiro Acinzentado', textEn: 'Ash Blonde' },
        { text: 'Loiro Claro', textEn: 'Light Blonde' },
        { text: 'Loiro Escuro', textEn: 'Dark Blonde' },
        { text: 'Loiro Morango', textEn: 'Strawberry Blonde' },
        { text: 'Loiro Médio', textEn: 'Medium Blonde' },
        { text: 'Loiro Platinado', textEn: 'Platinum Blonde' },
        { text: 'Loiro medio acinzentado', textEn: 'Cendre' },
        { text: 'Preto', textEn: 'Black' },
        { text: 'Preto Oscuro', textEn: 'Dark Black' },
        { text: 'Ruivo Loiro', textEn: 'Red Blonde' },
        { text: 'Ruivo Natural', textEn: 'Auburn' },
        { text: 'Vermelho', textEn: 'Red' },
        { text: 'Vermelho Castanho', textEn: 'Red Brown' }
      ],
      optEyes: [
        { text: 'Avelã', textEn: 'Hazel' },
        { text: 'Azul', textEn: 'Blue' },
        { text: 'Azul Acinzentado', textEn: 'Blue Grey' },
        { text: 'Azul Claro', textEn: 'Light Blue' },
        { text: 'Azul Esverdeado', textEn: 'Blue Green' },
        { text: 'Castanho', textEn: 'Brown' },
        { text: 'Castanho Café', textEn: 'Brown Coffee' },
        { text: 'Castanho Claro', textEn: 'Light Brown' },
        { text: 'Castanho Escuro', textEn: 'Dark Brown' },
        { text: 'Castanho Esverdeado', textEn: 'Green Brown' },
        { text: 'Cinza', textEn: 'Grey' },
        { text: 'Mel', textEn: 'Honey' },
        { text: 'Preto', textEn: 'Black' },
        { text: 'Verde', textEn: 'Green' },
        { text: 'Verde Acinzentado', textEn: 'Green Grey' },
        { text: 'Verde Azeitona', textEn: 'Green Olive' },
        { text: 'Âmbar', textEn: 'Amber' }
      ]
    }
  },

  mounted() {
    this.getOptions()
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

  methods: {
    getOptions() {
      // switch (_type) {
      // case 'height':
      for (let index = 30; index <= 200; index++) {
        this.selects[0].options.push({ name: index + ' cm' })
      }

      // break

      // case 'weight':
      for (let index = 3; index <= 200; index++) {
        this.selects[1].options.push({ name: index + ' kg' })
      }

      // break

      // case 'bust':
      for (let index = 65; index <= 200; index++) {
        this.selects[2].options.push({ name: index + ' cm' })
      }

      // break

      // case 'waist':
      for (let index = 20; index <= 200; index++) {
        this.selects[3].options.push({ name: index + ' cm' })
      }

      // break

      // case 'hips':
      for (let index = 20; index <= 200; index++) {
        this.selects[4].options.push({ name: index + ' cm' })
      }

      // break

      // case 'shoes':
      for (let index = 1; index <= 60; index++) {
        this.selects[5].options.push({ name: index + ' BR' })
      }

      // break

      // case 'eyes':
      this.optEyes.forEach(element => {
        this.selects[6].options.push({ name: element.text })
      })

      // break

      // case 'hair':
      this.optHair.forEach(element => {
        this.selects[7].options.push({ name: element.text })
      })

      // break
      // }
    }
  }
}
</script>

<style lang="scss">
#getScouted {
  p.c-desc{
  //  font-family: var(--navActiveFontFamily);
    // font-weight: 600;
    
  }
  .get-scouted-intro {
    margin-top: 30px;
    margin-bottom: 50px;

    .col-12 {
      display: flex;
      flex-direction: column;
    }
  }

  .get-scouted {
    margin: 0 150px 50px 150px;
    padding: 40px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 1;
    background: white;

    @media (max-width: 767px) {
      margin: 0;
      padding: 40px 5px;
    }

    // .form {
    //   margin-top: 40px;
    // }
  }
}
</style>
