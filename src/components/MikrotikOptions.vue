<template>
  <section class="card">
    <div class="card-label">4 — MikroTik options</div>
    <div class="form-grid">
      <div class="field">
        <label>Bridge name</label>
        <input v-model="store.bridgeName" type="text" placeholder="bridge1" class="mono" />
      </div>
      <div class="field">
        <label>Service port <span class="optional">optional</span></label>
        <select v-model="store.mtServicePort">
          <option value="">— none —</option>
          <option v-for="p in store.currentModel.ports" :key="p" :value="p">{{ p }}</option>
        </select>
        <span class="field-hint">Added to bridge without horizon</span>
      </div>
    </div>
    <div class="toggle-row">
      <label class="toggle-label">
        <span class="toggle-wrap">
          <input type="checkbox" v-model="store.useHorizon" />
          <span class="toggle-track"></span>
        </span>
        Enable horizon on access ports
        <span class="field-hint" style="display: inline; margin-left: 6px"
          >Prevents inter-port communication</span
        >
      </label>
    </div>
    <div class="toggle-row">
      <label class="toggle-label">
        <span class="toggle-wrap">
          <input type="checkbox" v-model="store.useFastFwd" />
          <span class="toggle-track"></span>
        </span>
        Enable fast-forward on bridge
      </label>
    </div>
  </section>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
const store = useConfigStore()
</script>
