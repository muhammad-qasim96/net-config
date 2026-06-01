import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { DEVICES } from '@/data/devices'

export const useConfigStore = defineStore('config', () => {
  // ── Device selection ──────────────────────────────────
  const brand = ref('cisco')
  const modelId = ref('c2960')

  const models = computed(() => DEVICES[brand.value])
  const currentModel = computed(
    () => models.value.find((m) => m.id === modelId.value) || models.value[0]
  )
  const accessPorts = computed(() =>
    currentModel.value.ports.filter((p) => !currentModel.value.uplinks.includes(p))
  )

  // ── Network params ────────────────────────────────────
  const ip = ref('')
  const mask = ref('255.255.255.0')
  const gateway = ref('')
  const hostname = ref('')
  const dns = ref('')
  const password = ref('')

  // ── Port selection ────────────────────────────────────
  const selectedPorts = ref([])

  // ── Cisco options ─────────────────────────────────────
  const servicePort = ref('')
  const vlanId = ref('1')
  const portsProtected = ref(true)

  // ── MikroTik options ──────────────────────────────────
  const bridgeName = ref('bridge1')
  const mtservicePort = ref('')
  const useHorizon = ref(true)
  const useFastFwd = ref(true)

  // ── Watchers ──────────────────────────────────────────
  watch(brand, () => {
    modelId.value = DEVICES[brand.value][0].id
  })

  watch(
    currentModel,
    (model) => {
      selectedPorts.value = [...accessPorts.value]
      servicePort.value = ''
      mtservicePort.value = ''
    },
    { immediate: true }
  )

  // ── Port helpers ──────────────────────────────────────
  function togglePort(port) {
    if (currentModel.value.uplinks.includes(port)) return
    const idx = selectedPorts.value.indexOf(port)
    if (idx >= 0) selectedPorts.value.splice(idx, 1)
    else selectedPorts.value.push(port)
  }

  function selectAll() {
    selectedPorts.value = [...accessPorts.value]
  }

  function clearAll() {
    selectedPorts.value = []
  }

  function isSelected(port) {
    return selectedPorts.value.includes(port)
  }

  function isUplink(port) {
    return currentModel.value.uplinks.includes(port)
  }

  // ── Validation ────────────────────────────────────────
  const errors = ref([])

  function validate() {
    errors.value = []
    const ipRe = /^(\d{1,3}\.){3}\d{1,3}$/
    const validIP = (v) => ipRe.test(v) && v.split('.').every((n) => +n <= 255)

    if (!validIP(ip.value)) errors.value.push('Enter a valid IP address.')
    if (!validIP(mask.value)) errors.value.push('Enter a valid subnet mask.')
    if (!validIP(gateway.value)) errors.value.push('Enter a valid default gateway.')
    if (selectedPorts.value.length === 0) errors.value.push('Select at least one port.')

    return errors.value.length === 0
  }

  // ── Config generation ─────────────────────────────────
  const configTabs = ref({})
  const hasConfig = computed(() => Object.keys(configTabs.value).length > 0)

  function generate() {
    if (!validate()) return
    configTabs.value = brand.value === 'cisco' ? generateCisco() : generateMikroTik()
  }

  function maskToCIDR(m) {
    return m.split('.').reduce(
      (acc, o) =>
        acc +
        parseInt(o)
          .toString(2)
          .split('')
          .filter((b) => b === '1').length,
      0
    )
  }

  function collapseRanges(ports) {
    const groups = {}
    ports.forEach((p) => {
      const m = p.match(/^(.+?)(\d+)$/)
      if (!m) return
      ;(groups[m[1]] = groups[m[1]] || []).push({ n: +m[2], full: p })
    })
    const out = []
    Object.entries(groups).forEach(([prefix, items]) => {
      items.sort((a, b) => a.n - b.n)
      let start = items[0],
        prev = items[0]
      for (let i = 1; i < items.length; i++) {
        if (items[i].n === prev.n + 1) {
          prev = items[i]
        } else {
          out.push(start === prev ? start.full : `${start.full} - ${prefix}${prev.n}`)
          start = prev = items[i]
        }
      }
      out.push(start === prev ? start.full : `${start.full} - ${prefix}${prev.n}`)
    })
    return out.length ? out : ports
  }

  function generateCisco() {
    const model = currentModel.value
    const mgmt = model.mgmtIface || 'Vlan1'
    const vlan = vlanId.value || '1'
    const service = servicePort.value
    const lines = []

    lines.push('! ===== Cisco Configuration =====')
    lines.push('configure terminal')
    if (hostname.value) lines.push(`hostname ${hostname.value}`)
    if (password.value) lines.push(`enable secret ${password.value}`)
    lines.push('!')

    if (selectedPorts.value.length > 0) {
      const ranges = collapseRanges(selectedPorts.value)
      lines.push(`! Access ports — protected, VLAN ${vlan}`)
      ranges.forEach((r) => {
        lines.push(`interface range ${r}`)
        lines.push(`  switchport mode access`)
        if (portsProtected.value) lines.push(`  switchport protected`)
        lines.push(`  no shutdown`)
        lines.push(`exit`)
      })
      lines.push('!')
    }

    if (service) {
      lines.push('! Service port — access mode, not protected')
      lines.push(`interface ${service}`)
      lines.push(`  switchport mode access`)
      lines.push(`  no switchport protected`)
      lines.push(`  no shutdown`)
      lines.push(`exit`)
      lines.push('!')
    }

    lines.push('! Management interface')
    lines.push(`interface ${mgmt}`)
    lines.push(`  ip address ${ip.value} ${mask.value}`)
    lines.push(`  no shutdown`)
    lines.push(`exit`)
    lines.push('!')
    lines.push(`ip default-gateway ${gateway.value}`)
    if (dns.value) lines.push(`ip name-server ${dns.value}`)
    lines.push('!')
    lines.push('! Console and VTY access')
    lines.push('line console 0')
    lines.push('  password cisco')
    lines.push('  login')
    lines.push('exit')
    lines.push('line vty 0 4')
    lines.push('  password cisco')
    lines.push('  login')
    lines.push('exit')
    lines.push('!')
    lines.push('end')
    lines.push('write memory')

    return {
      'Main config': lines,
      Verify: [
        '! ===== Verification =====',
        'show vlan brief',
        `show interface ${mgmt}`,
        'show interfaces status',
        `ping ${gateway.value}`
      ]
    }
  }

  function generateMikroTik() {
    const cidr = maskToCIDR(mask.value)
    const bridge = bridgeName.value || 'bridge1'
    const service = mtservicePort.value
    const lines = []

    lines.push('# ===== MikroTik RouterOS Configuration =====')
    if (hostname.value) lines.push(`/system identity set name=${hostname.value}`)
    if (password.value) lines.push(`/user set [find name=admin] password="${password.value}"`)

    lines.push('')
    lines.push('# Create bridge')
    lines.push(
      `/interface bridge add name=${bridge} fast-forward=${useFastFwd.value ? 'yes' : 'no'}`
    )

    lines.push('')
    lines.push('# Add access ports to bridge')
    selectedPorts.value
      .filter((p) => p !== service)
      .forEach((p) => {
        const horizon = useHorizon.value ? 'horizon=1' : 'horizon=none'
        lines.push(`/interface bridge port add bridge=${bridge} interface=${p} ${horizon}`)
      })

    if (service) {
      lines.push('# Service port — no horizon')
      lines.push(`/interface bridge port add bridge=${bridge} interface=${service} horizon=none`)
    }

    lines.push('')
    lines.push('# IP and routing')
    lines.push(`/ip address add address=${ip.value}/${cidr} interface=${bridge}`)
    lines.push(`/ip route add gateway=${gateway.value}`)
    if (dns.value) lines.push(`/ip dns set servers=${dns.value} allow-remote-requests=yes`)

    return {
      'Main config': lines,
      Verify: [
        '# ===== Verification =====',
        '/interface bridge print',
        '/interface bridge port print',
        '/ip address print',
        '/ip route print',
        `/tool ping ${gateway.value} count=3`
      ]
    }
  }

  return {
    brand,
    modelId,
    models,
    currentModel,
    accessPorts,
    ip,
    mask,
    gateway,
    hostname,
    dns,
    password,
    selectedPorts,
    portsProtected,
    servicePort,
    vlanId,
    bridgeName,
    mtservicePort,
    useHorizon,
    useFastFwd,
    errors,
    configTabs,
    hasConfig,
    togglePort,
    selectAll,
    clearAll,
    isSelected,
    isUplink,
    generate
  }
})
