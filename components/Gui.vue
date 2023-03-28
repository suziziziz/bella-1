<template>
  <div class="gui-component">
    <div class="wpp">
      <a href="https://api.whatsapp.com/send?phone=5521970317962" target="_blank"><img src="/wpp-button.svg" /></a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.gui-component {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 15;
  pointer-events: none;

  .wpp {
    position: absolute;
    right: 16px;
    bottom: 16px;

    &, * {
      pointer-events: auto;
    }
    a {
      img {
        transition: all .2s;
      }

      &:hover {
        img {
          filter: brightness(1.5);
          box-shadow: 0 0 0 2px #0ff;
        }
      }
    }
  }
}
</style>
