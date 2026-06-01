<template>
  <section class="card">
    <div class="card-label">1 — Brand</div>
    <div class="brand-row">
      <button
        v-for="b in brands"
        :key="b.id"
        class="brand-btn"
        :class="{ active: store.brand === b.id }"
        @click="store.brand = b.id"
      >
        <span class="brand-icon" v-html="b.icon"></span>
        <span>{{ b.name }}</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
const store = useConfigStore()

const brands = [
  {
    id: 'cisco',
    name: 'Cisco',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`
  },
  {
    id: 'mikrotik',
    name: 'MikroTik',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
  }
]
</script>
