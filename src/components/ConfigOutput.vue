<template>
  <section class="card output-card">
    <div class="output-header">
      <div class="card-label" style="margin-bottom: 0">Output — {{ store.currentModel.name }}</div>
      <div class="out-actions">
        <button class="small-btn" @click="downloadConfig()">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Save .txt
        </button>
        <button class="small-btn copy-btn" :class="{ copied }" @click="copyTab()">
          <svg
            v-if="!copied"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg
            v-else
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <div class="tab-row">
      <button
        v-for="(_, tab, i) in store.configTabs"
        :key="tab"
        class="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="code-wrap">
      <pre class="code-block"><span
        v-for="(line, i) in store.configTabs[activeTab]"
        :key="i"
        class="code-line"
        :class="lineClass(line)"
      >{{ line }}</span></pre>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const store = useConfigStore()
const activeTab = ref('')
const copied = ref(false)

watch(
  () => store.configTabs,
  (tabs) => {
    activeTab.value = Object.keys(tabs)[0] || ''
  },
  { immediate: true, deep: true }
)

function lineClass(line) {
  if (line.startsWith('!') || line.startsWith('#')) return 'line-comment'
  if (/^(configure terminal|end|exit|write memory)/.test(line.trim())) return 'line-keyword'
  if (/^(interface|hostname|ip |\/ip |\/interface|\/system|\/user)/.test(line.trim()))
    return 'line-cmd'
  if (/^(line (vty|console))/.test(line.trim())) return 'line-cmd'
  if (/^\s+(switchport|spanning-tree|no |description|password|login)/.test(line)) return 'line-sub'
  return ''
}

function copyTab() {
  const lines = store.configTabs[activeTab.value] || []
  navigator.clipboard.writeText(lines.join('\n')).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}

function downloadConfig() {
  const all = Object.entries(store.configTabs)
    .map(([tab, lines]) => `; ===== ${tab} =====\n` + lines.join('\n'))
    .join('\n\n')
  const blob = new Blob([all], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${store.currentModel.id}-config.txt`
  a.click()
  URL.revokeObjectURL(url)
}
</script>
