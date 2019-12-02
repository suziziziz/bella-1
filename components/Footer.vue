<template>
  <footer>
    <div class="container-fluid reset-col">
      <div class="row footer-items reset-row">
        <div class="col-md-4 menu reset-col">
          <ul>
            <!-- <li v-for="section in sections" :key="section.id">
              <router-link :to="{ path: section.path }" tag="a">
                {{ section.name }}
              </router-link>
            </li> -->

            <li>
              <router-link :to="{ path: '/' }" tag="a">
                {{ $t('footer.home') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/quem-somos' }" tag="a">
                {{ $t('footer.whoWeAre') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/modelos/feminino' }" tag="a">
                {{ $t('footer.women') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/modelos/masculino' }" tag="a">
                {{ $t('footer.men') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/contato' }" tag="a">
                {{ $t('footer.contact') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/quero-ser-modelo' }" tag="a">
                {{ $t('footer.wantToBe') }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/blog' }" tag="a">
                {{ $t('footer.blog') }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="col-md-4 logo reset-col text-center">
          <img src="/logo_footer.png" alt="Bella #Models" height="95px" >
          <p>#abellaeparatodxs - COPYRIGHT © {{ year }}</p>
        </div>

        <div class="col-md-4 social reset-col">
          <p class="follow">
            {{ $t('footer.followUs') }}
          </p>
          <span class="icons">
            <a
              href="https://www.facebook.com/bellamodelsbr/"
              target="_blank"
            >
              <i class="fab fa-facebook-f" />
            </a>
            <a
              href="https://www.instagram.com/bellamodelsbr/"
              target="_blank"
            >
              <i class="fab fa-instagram" />
            </a>
            <a href="https://twitter.com/bellamodelsrj" target="_blank">
              <i class="fab fa-twitter" />
            </a>
          </span>
          <p class="pwrd">
            Powered by
            <a href="https://managerfashion.com" target="_blank">ManagerFashion</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          id: '1',
          name: 'Home',
          path: '/'
        },
        {
          id: '2',
          name: 'Quem somos',
          path: '/quem-somos'
        },
        {
          id: '3',
          name: 'Feminino',
          path: '/modelos/feminino'
        },
        {
          id: '4',
          name: 'Masculino',
          path: '/modelos/masculino'
        },
        {
          id: '5',
          name: 'Contato',
          path: '/contato'
        },
        {
          id: '6',
          name: 'Quero ser modelo',
          path: '/quero-ser-modelo'
        },
        {
          id: '7',
          name: 'Blog',
          path: '/blog'
        }
      ],
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped></style>
