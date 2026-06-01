export const DEVICES = {
  cisco: [
    {
      id: 'c2960',
      name: 'Catalyst 2960',
      desc: '24x FastEthernet + 2x SFP uplink',
      ports: [
        ...Array.from({ length: 24 }, (_, i) => `Fa0/${i + 1}`),
        'Gi0/1', 'Gi0/2'
      ],
      uplinks: ['Gi0/1', 'Gi0/2'],
      mgmtIface: 'Vlan1'
    },
    {
      id: 'c2960x',
      name: 'Catalyst 2960X',
      desc: '24x GigabitEthernet + 4x SFP uplink',
      ports: [
        ...Array.from({ length: 24 }, (_, i) => `Gi1/0/${i + 1}`),
        'Gi1/1/1', 'Gi1/1/2', 'Gi1/1/3', 'Gi1/1/4'
      ],
      uplinks: ['Gi1/1/1', 'Gi1/1/2', 'Gi1/1/3', 'Gi1/1/4'],
      mgmtIface: 'Vlan1'
    },
    {
      id: 'c3560',
      name: 'Catalyst 3560',
      desc: '24x GigabitEthernet + 4x SFP',
      ports: [
        ...Array.from({ length: 24 }, (_, i) => `Gi0/${i + 1}`),
        'Gi0/25', 'Gi0/26', 'Gi0/27', 'Gi0/28'
      ],
      uplinks: ['Gi0/25', 'Gi0/26', 'Gi0/27', 'Gi0/28'],
      mgmtIface: 'Vlan1'
    },
    {
      id: 'c3750',
      name: 'Catalyst 3750',
      desc: '48x GigabitEthernet + 4x SFP',
      ports: [
        ...Array.from({ length: 48 }, (_, i) => `Gi1/0/${i + 1}`),
        'Gi1/1/1', 'Gi1/1/2', 'Gi1/1/3', 'Gi1/1/4'
      ],
      uplinks: ['Gi1/1/1', 'Gi1/1/2', 'Gi1/1/3', 'Gi1/1/4'],
      mgmtIface: 'Vlan1'
    },
    {
      id: 'c4500',
      name: 'Catalyst 4500',
      desc: '48x GigabitEthernet + 4x 10G uplink',
      ports: [
        ...Array.from({ length: 48 }, (_, i) => `Gi1/${i + 1}`),
        'Te1/1', 'Te1/2', 'Te1/3', 'Te1/4'
      ],
      uplinks: ['Te1/1', 'Te1/2', 'Te1/3', 'Te1/4'],
      mgmtIface: 'Vlan1'
    },
    {
      id: 'isr',
      name: 'ISR Router',
      desc: '4x GigabitEthernet routed ports',
      ports: ['Gi0/0', 'Gi0/1', 'Gi0/2', 'Gi0/3'],
      uplinks: ['Gi0/0'],
      mgmtIface: 'Gi0/0'
    }
  ],
  mikrotik: [
    {
      id: 'rb260',
      name: 'RB260GS',
      desc: '5x GigabitEthernet',
      ports: ['ether1', 'ether2', 'ether3', 'ether4', 'ether5'],
      uplinks: ['ether1']
    },
    {
      id: 'rb750',
      name: 'hEX (RB750Gr3)',
      desc: '5x GigabitEthernet',
      ports: ['ether1', 'ether2', 'ether3', 'ether4', 'ether5'],
      uplinks: ['ether1']
    },
    {
      id: 'rb951',
      name: 'hAP (RB951Ui)',
      desc: '5x FastEthernet + wireless',
      ports: ['ether1', 'ether2', 'ether3', 'ether4', 'ether5'],
      uplinks: ['ether1']
    },
    {
      id: 'crs326',
      name: 'CRS326-24G',
      desc: '24x GigabitEthernet + 2x SFP+',
      ports: [
        ...Array.from({ length: 24 }, (_, i) => `ether${i + 1}`),
        'sfp-sfpplus1', 'sfp-sfpplus2'
      ],
      uplinks: ['sfp-sfpplus1', 'sfp-sfpplus2']
    },
    {
      id: 'crs328',
      name: 'CRS328-24P',
      desc: '24x PoE GigabitEthernet + 4x SFP+',
      ports: [
        ...Array.from({ length: 24 }, (_, i) => `ether${i + 1}`),
        'sfp-sfpplus1', 'sfp-sfpplus2', 'sfp-sfpplus3', 'sfp-sfpplus4'
      ],
      uplinks: ['sfp-sfpplus1', 'sfp-sfpplus2', 'sfp-sfpplus3', 'sfp-sfpplus4']
    },
    {
      id: 'rb4011',
      name: 'RB4011',
      desc: '10x GigabitEthernet + 1x SFP+',
      ports: [
        ...Array.from({ length: 10 }, (_, i) => `ether${i + 1}`),
        'sfp-sfpplus1'
      ],
      uplinks: ['ether1', 'sfp-sfpplus1']
    }
  ]
}
