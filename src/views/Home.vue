<template>
  <div class="home">
    <Filesupload/>
  </div>
</template>

<script>
// @ is an alias to /src
import Filesupload from '@/components/Filesupload.vue'

export default {
  name: 'home',
  components: {
    Filesupload
  }
}
</script>
