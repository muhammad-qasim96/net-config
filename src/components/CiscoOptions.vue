<template>
  <section class="card">
    <div class="card-label">4 — Cisco options</div>
    <div class="form-grid">
      <div class="field">
        <label>Service port <span class="optional">optional</span></label>
        <select v-model="store.servicePort">
          <option value="">— none —</option>
          <option v-for="p in store.currentModel.ports" :key="p" :value="p">{{ p }}</option>
        </select>
        <span class="field-hint">Access mode, not protected — for uplinks or servers</span>
      </div>
      <div class="field">
        <label>Access VLAN ID</label>
        <input v-model="store.vlanId" type="text" placeholder="1" />
        <span class="field-hint">Applied to all selected access ports</span>
      </div>
      <div class="toggle-row">
        <label class="toggle-label">
          <span class="toggle-wrap">
            <input type="checkbox" v-model="store.portsProtected" />
            <span class="toggle-track"></span>
          </span>
          Enable port protection
          <span class="field-hint" style="display: inline; margin-left: 6px">
            Prevents direct communication between access ports
          </span>
        </label>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
const store = useConfigStore()
</script>
