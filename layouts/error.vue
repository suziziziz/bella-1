<template>
  <div class="row justify-content-center">
    <div class="col-12 ">
      <h4 class="text-center">{{$t('error.not_found')}}</h4>
    </div>
    <div class="col-3" id="error"></div>
  </div>
</template>
<script>
import ErrorLoading from '~/assets/animations/error'
import lottie from 'lottie-web'
export default {
  mounted(){
    lottie.loadAnimation({
      container: document.getElementById('error'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: ErrorLoading
    })
  }
}
</script>