<template>
    <div class="register">
        {{msg}}
        <v-footer></v-footer>
    </div>
</template>
<script>
import Footer from './public/Footer.vue';
export default {
    data(){
        return{
            msg:'团队'
        }
    },
  components:{

    'v-footer':Footer
  }
}
</script>

