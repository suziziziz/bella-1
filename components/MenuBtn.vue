<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="auto"
    viewBox="0 0 250 250"
  >
    <g id="buttonPaths" data-name="Button Paths">
      <path
        id="path_1"
        data-name="Path 1"
        class="cls-1"
        d="M5,169v-8H245v8H5Z"
      />
      <path
        id="path_2"
        data-name="Path 2"
        class="cls-1"
        d="M5,129v-8H245v8H5Z"
      />
      <path
        id="path_3"
        data-name="Path 3"
        class="cls-1"
        d="M5,89V81H245v8H5Z"
      />
    </g>
  </svg>
</template>

<script>
export default {}
</script>

<style lang="scss">
svg {
  g {
    .cls-1 {
      stroke: var(--dark);
      fill: var(--dark);
      stroke-width: 3px;
      fill-rule: evenodd;
      transition: all 0.25s ease;
    }
  }
}
</style>
