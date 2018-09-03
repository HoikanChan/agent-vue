<template>
  <div>
    <div class="content">
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'
export default {
  components: {
    'v-footer': Footer
  }
}
</script>
