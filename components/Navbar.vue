<template>
  <header>
    <div class="container-fluid reset-col">
      <nav>
        <!-- Logo -->
        <div class="row logo reset-row">
          <div class="col-12 reset-col text-center">
            <img src="/logo.png" alt="Bella #Models" height="95px" />
          </div>
        </div>

        <!-- Sections -->
        <div class="row sections reset-row">
          <div class="col-12 reset-col">
            <ul>
              <li v-for="section in sections" :key="section.id">
                <router-link :to="{ path: section.path }" tag="a" exact>
                  {{ section.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Social -->
        <div class="row social reset-row">
          <div class="col-12 reset-col text-center">
            <ul>
              <li>
                <a href="#" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  computed: {
    sections() {
      return this.items
    }
  }
}
</script>

<style lang="scss" scoped></style>
