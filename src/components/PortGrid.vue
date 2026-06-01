<template>
  <section class="card port-card">
    <div class="port-header">
      <div class="card-label" style="margin-bottom:0">Ports</div>
      <div class="port-actions">
        <button class="small-btn" @click="store.selectAll()">All</button>
        <button class="small-btn" @click="store.clearAll()">None</button>
      </div>
    </div>

    <div class="port-grid">
      <div
        v-for="port in store.currentModel.ports"
        :key="port"
        class="port-chip"
        :class="{
          selected: store.isSelected(port),
          uplink: store.isUplink(port)
        }"
        :title="port"
        @click="store.togglePort(port)"
      >
        <span class="port-name">{{ shortName(port) }}</span>
        <span v-if="store.isUplink(port)" class="uplink-badge">UL</span>
      </div>
    </div>

    <div class="port-legend">
      <span class="legend-item">
        <span class="dot access"></span> Access (protected)
      </span>
      <span class="legend-item">
        <span class="dot uplink"></span> Uplink / trunk
      </span>
      <span class="legend-item count">
        {{ store.selectedPorts.length }} / {{ store.accessPorts.length }} selected
      </span>
    </div>
  </section>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
const store = useConfigStore()

function shortName(port) {
  return port
    .replace('GigabitEthernet', 'Gi')
    .replace('FastEthernet', 'Fa')
    .replace('TenGigabitEthernet', 'Te')
    .replace('sfp-sfpplus', 'SFP+')
}
</script>
