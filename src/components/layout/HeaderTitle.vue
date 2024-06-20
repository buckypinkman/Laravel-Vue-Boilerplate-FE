<template>
    <div :class="{ 'mb-3': prefix != ' List' }">
      <div style="font-weight: 500; color: #aaaaaa">{{ moduleName }} Management</div>
      <div style="font-size: 2em; font-weight: bold">{{ moduleName + prefix }}</div>
    </div>
</template>

<script>
import _ from '@/utils/general'
import { useRoute } from 'vue-router'
export default {
   props: ['moduleName'],
   setup() {
    const route = useRoute();
    return { route }
   },
   computed: {
    prefix() {
      if (this.route.params.id || this.route.params.email) return ' Edit'
      else if(this.route.fullPath.includes('create')) return ' Add'
      return ' List'
    }
   }
}
</script>