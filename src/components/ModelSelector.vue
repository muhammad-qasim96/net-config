<template>
  <section class="card">
    <div class="card-label">2 — Model</div>
    <div class="model-grid">
      <button
        v-for="m in store.models"
        :key="m.id"
        class="model-btn"
        :class="{ active: store.modelId === m.id }"
        @click="store.modelId = m.id"
      >
        {{ m.name }}
      </button>
    </div>
    <p class="model-desc">{{ store.currentModel.desc }}</p>
  </section>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
const store = useConfigStore()
</script>
