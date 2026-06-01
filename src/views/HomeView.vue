<template>
  <div class="page">
    <aside class="sidebar">
      <div class="logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="6" fill="#00E5A0"/>
          <path d="M7 14h14M14 7v14M7 9l3 3-3 3M21 9l-3 3 3 3" stroke="#0A0F1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="logo-text">NetConfig</span>
      </div>
      <nav class="nav">
        <a class="nav-item active" href="#">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          Generator
        </a>
        <a class="nav-item disabled" href="#">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Saved configs
        </a>
      </nav>
      <div class="sidebar-footer">
        <span class="version-badge">v1.0.0</span>
      </div>
    </aside>

    <main class="main">
      <header class="page-header">
        <h1 class="page-title">Config Generator</h1>
        <p class="page-sub">Select your device, enter network details, get paste-ready commands.</p>
      </header>

      <div class="content">
        <div class="left-col">
          <BrandSelector />
          <ModelSelector />
          <NetworkForm />
          <CiscoOptions v-if="store.brand === 'cisco'" />
          <MikrotikOptions v-else />
        </div>

        <div class="right-col">
          <PortGrid />
          <div v-if="store.errors.length" class="error-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>
              <div v-for="e in store.errors" :key="e">{{ e }}</div>
            </div>
          </div>
          <button class="generate-btn" @click="store.generate()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            Generate configuration
          </button>
          <ConfigOutput v-if="store.hasConfig" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
import BrandSelector from '@/components/BrandSelector.vue'
import ModelSelector from '@/components/ModelSelector.vue'
import NetworkForm from '@/components/NetworkForm.vue'
import PortGrid from '@/components/PortGrid.vue'
import CiscoOptions from '@/components/CiscoOptions.vue'
import MikrotikOptions from '@/components/MikrotikOptions.vue'
import ConfigOutput from '@/components/ConfigOutput.vue'

const store = useConfigStore()
</script>
