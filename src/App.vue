<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.name,
  (name) => {
    document.body.classList.toggle('portal-scrollable', name === 'portal')
  },
  { immediate: true }
)
</script>

<template>
  <RouterView />
</template>
