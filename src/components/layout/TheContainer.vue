<template>
  <the-sidebar>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </the-sidebar>
</template>
<script>
import { defineComponent } from "vue";
import TheSidebar from "@/components/layout/TheSidebar.vue";
export default defineComponent({
  components: {
    TheSidebar,
  },
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.n-menu-item-content {
    padding-left: 25px !important;
}
.shadow {
    box-shadow: 0 1px 2px rgba(0,0,0,0.01), 
                0 2px 4px rgba(0,0,0,0.01), 
                0 4px 8px rgba(0,0,0,0.01), 
                0 8px 16px rgba(0,0,0,0.01),
                0 16px 32px rgba(0,0,0,0.01), 
                0 32px 64px rgba(0,0,0,0.01);
}
.n-data-table-wrapper {
  box-shadow: 0 1px 2px rgba(0,0,0,0.01), 
                0 2px 4px rgba(0,0,0,0.01), 
                0 4px 8px rgba(0,0,0,0.01), 
                0 8px 16px rgba(0,0,0,0.01),
                0 16px 32px rgba(0,0,0,0.01), 
                0 32px 64px rgba(0,0,0,0.01);
}
</style>
