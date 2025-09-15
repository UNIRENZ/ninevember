<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'



onMounted(() => {
  const router = useRouter()
    router.push('/intro')
  })

</script>

<template>
  <transition name="fade-slide" mode="out-in">
    <router-view />
  </transition>
</template>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>

