<template>
  <section class="card">
    <div class="card-label">3 — Network parameters</div>
    <div class="form-grid">
      <div class="field">
        <label>Device IP address</label>
        <input v-model="store.ip" type="text" placeholder="192.168.1.1" />
      </div>
      <div class="field">
        <label>Subnet mask</label>
        <input v-model="store.mask" type="text" placeholder="255.255.255.0" />
      </div>
      <div class="field">
        <label>Default gateway</label>
        <input v-model="store.gateway" type="text" placeholder="192.168.1.254" />
      </div>
      <div class="field">
        <label>DNS server <span class="optional">optional</span></label>
        <input v-model="store.dns" type="text" placeholder="8.8.8.8" />
      </div>
      <div class="field">
        <label>Hostname <span class="optional">optional</span></label>
        <input v-model="store.hostname" type="text" placeholder="SW-Core-01" />
      </div>
      <div class="field">
        <label>Admin password <span class="optional">optional</span></label>
        <input v-model="store.password" type="password" placeholder="••••••••" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
const store = useConfigStore()
</script>
