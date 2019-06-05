<template>
  <section id="about">
    <div class="row about-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h1 class="title-strong">Sobre</h1>
      </div>
    </div>

    <div class="row about reset-row">
      <div class="col-12 reset-col text-center">
        <p v-for="txt in aboutTxt" :key="txt.id" class="desc">{{ txt.txt }}</p>
      </div>
    </div>

    <div class="row team-intro reset-row">
      <div class="col-12 reset-col text-center">
        <h3 class="title-strong">Equipe</h3>
      </div>
    </div>

    <div class="row team reset-row text-center">
      <div
        v-for="person in team"
        :key="person.id"
        class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 person"
      >
        <p class="position">
          {{ person.position }}
        </p>
        <p class="name">
          {{ person.name }}
        </p>
        <div class="social">
          <a href="#" target="_blank">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" target="_blank">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      meta: {
        title: 'Sobre | Bella #Models',
        description: 'Bella #Models - Saiba mais sobre quem somos!',
        keywords:
          'bella, mgmt, management, model, models, modelos, talents, talentos, casting, book, photos, fotos',
        logo: 'http://managerfashion.com/assets/clients_logos/bella_models.png',
        url: 'http://localhost:3000' + this.$route.fullPath
      },
      aboutTxt: [
        {
          id: 0,
          txt: 'Olá, somos a Bella Models + Projects.'
        },
        {
          id: 1,
          txt: 'Nosso ponto de partida foi em 2006.'
        },
        {
          id: 2,
          txt:
            'De lá até aqui, nossa história é repleta de desafios e descobertas que nos ajudaram a construir uma sólida relação com as pessoas envolvidas nesse processo evolutivo e também com o mercado.'
        },
        {
          id: 3,
          txt:
            'Diversidade, uma palavra hoje tão em voga, desde a inauguração já faz parte do nosso DNA.'
        },
        {
          id: 4,
          txt:
            'Temos o orgulho de ser uma das primeiras agências a inserir o processo de inclusão em nosso  casting e torna-lo um dos mais diversos e plurais do Rio de Janeiro.'
        },
        {
          id: 5,
          txt: 'Sim, a Bella é para todos.'
        },
        {
          id: 6,
          txt:
            'Esse conceito básico, porém, fundamental, além de abrir as portas do mercado para diversos dos nossos agenciados, possibilitou que marcas, agências de publicidade, produtoras de cinema, e outros produtores de moda, comportamento e conteúdo escalasse um time alinhado com o propósito dos seus projetos.'
        },
        {
          id: 7,
          txt: 'Investir em pessoas é fundamental.'
        },
        {
          id: 8,
          txt:
            'Por isso, criamos um centro de treinamentos que chamamos de Bella LABB_'
        },
        {
          id: 9,
          txt:
            'No LABB_, nossos agenciados participam gratuitamente de cursos, palestras e workshops que os prepara e valoriza seu desempenho para o mercado profissional.'
        },
        {
          id: 10,
          txt: 'Olhos e mentes que percebem o futuro projetam oportunidades.'
        },
        {
          id: 11,
          txt:
            'Existe uma infinidade de motivos para você, sua marca ou projeto se envolver com a nossa história, mas o principal deles, são as pessoas envolvidas em nossos processos internos e eternos. Uma equipe com profissionais com experiência suficiente para construir carreiras e assessorar marcas, produtoras e diversos projetos que necessitam de um casting qualificado e de alta performance.'
        },
        {
          id: 12,
          txt:
            'Esse é um pequeno fragmento da nossa história, já que você veio até aqui, que tal nos ajudar a escrever os próximos capítulos?'
        }
      ],
      team: [
        {
          id: 0,
          name: 'Marcelo Andrade',
          position: 'Diretor',
          facebook: '',
          instagram: ''
        },
        {
          id: 1,
          name: 'Diego Correa',
          position: 'Diretor artístico / Mídias sociais',
          facebook: '',
          instagram: ''
        },
        {
          id: 2,
          name: 'Giovani Rafael',
          position: 'Booker',
          facebook: '',
          instagram: ''
        },
        {
          id: 3,
          name: 'Kelly Cristina',
          position: 'Produtora de casting',
          facebook: '',
          instagram: ''
        },
        {
          id: 4,
          name: 'Luciano Rocha',
          position: 'Coach em passarela',
          facebook: '',
          instagram: ''
        },
        {
          id: 5,
          name: 'Rodrigo Pagani',
          position: 'New Face',
          facebook: '',
          instagram: ''
        },
        {
          id: 6,
          name: 'Dami Ferreira Leão (Playmobrain)',
          position: 'Publicidade',
          facebook: '',
          instagram: ''
        },
        {
          id: 7,
          name: 'Juliana Moraes',
          position: 'DJL - Assessoria de Imprensa',
          facebook: '',
          instagram: ''
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
#about {
  .about-intro {
    margin-top: 40px;

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
        font-family: 'Helvetica';
        font-weight: bold;
        font-size: 16px;
        color: #3c3c3c;
        margin-bottom: 0;
      }
      p.name {
        font-family: 'Helvetica';
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
