<template>
  <n-config-provider :theme="theme" :theme-overrides="overrideTheme">
    <n-message-provider>
      <n-dialog-provider>
        <router-view></router-view>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from 'vuex'
import { NMessageProvider, NConfigProvider, NDialogProvider } from "naive-ui";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    NMessageProvider,
    NConfigProvider,
    NDialogProvider
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const overrideTheme = {
      common: {
        primaryColor: '#0052CC',
        primaryColorHover: '#264a84',
        primaryColorPressed: "#"
      },
    }
    let theme = ref(store.state.theme.theme)
    watch(store.state.theme, (current) => {
      theme.value = current.theme
    })

    onMounted(() => {
      const token = localStorage.getItem('token')

      if(!token) router.push({ name: 'login' })
    })

    return {
      theme,
      overrideTheme
    };
  },
});
</script>
