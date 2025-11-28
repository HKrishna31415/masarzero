
export interface LiveDataConfig {
  key1: string; label1: string; unit1: string; color1: string; domain1: [number, number];
  key2: string; label2: string; unit2: string; color2: string; domain2: [number, number];
}

export interface PumpData {
  rpm: { value: number; max: number; };
  pressure: { value: number; unit: string; };
}

export interface PartData {
  name: string;
  description: string;
  viewType: 'live-trends' | 'pump-status' | 'system-status';
  status: { metric: string; value: string; state?: 'ok' | 'warn' | 'idle' }[];
  liveDataConfig?: LiveDataConfig;
  pumpData?: PumpData;
}

export const partData: PartData[] = [
  // Vapor & Liquid Path
  {
    name: 'Vacuum Pump',
    description: 'The primary mover, this pump creates negative pressure to draw vapor from the source into the recovery system.',
    viewType: 'pump-status',
    pumpData: {
      rpm: { value: 1750, max: 2500 },
      pressure: { value: -5.2, unit: 'PSI' },
    },
    status: [
      { metric: 'Status', value: 'Active', state: 'ok' },
      { metric: 'Seal Integrity', value: 'OK', state: 'ok' },
      { metric: 'Vibration', value: '0.2g', state: 'ok' },
    ],
  },
  {
    name: 'Flame Arrester',
    description: 'A safety device that stops fuel combustion by extinguishing flames, preventing fire propagation into the system.',
    viewType: 'system-status',
    status: [
      { metric: 'Status', value: 'Operational', state: 'ok' },
      { metric: 'Cleanliness', value: '98%', state: 'ok' },
      { metric: 'Flow Restriction', value: 'None', state: 'ok' },
    ]
  },
  {
    name: 'Membrane and Molecular Sieve',
    description: 'A high-efficiency separation stage using membranes and molecular sieves to selectively strip hydrocarbons from the air stream.',
    viewType: 'system-status',
    status: [
      { metric: 'Status', value: 'Active', state: 'ok' },
      { metric: 'Saturation', value: '42%', state: 'ok' },
      { metric: 'Delta P', value: '0.8 PSI', state: 'ok' },
    ],
  },
  {
    name: 'Cooling Unit',
    description: 'A high-capacity heat exchanger that uses a refrigerant loop to condense recovered vapors back into liquid form.',
    viewType: 'live-trends',
    liveDataConfig: {
      key1: 'flow', label1: 'Vapor Flow', unit1: 'SCFM', color1: '#22d3ee', domain1: [200, 400],
      key2: 'temp', label2: 'Vapor Temp', unit2: '°C', color2: '#f87171', domain2: [40, 80],
    },
    status: [
      { metric: 'Refrigerant', value: 'Circulating', state: 'ok' },
      { metric: 'Motor Temp', value: '55°C', state: 'ok' },
      { metric: 'Coolant Delta-T', value: '30°C', state: 'ok' },
    ],
  },
  {
    name: 'Gasoline Tank',
    description: 'A robust, rectangular metal holding tank for the condensed, recovered liquid fuel.',
    viewType: 'system-status',
    status: [
      { metric: 'Status', value: 'Receiving', state: 'ok' },
      { metric: 'Liquid Level', value: '85%', state: 'ok' },
      { metric: 'Temperature', value: '15°C', state: 'ok' },
    ],
  },
  {
    name: 'Oil Pump',
    description: 'Circulates lubricant for mechanical components. In the final stage, it pumps the recovered liquid fuel to the outlet.',
    viewType: 'system-status',
    status: [
      { metric: 'Status', value: 'Active', state: 'ok' },
      { metric: 'Flow Pressure', value: '20 PSI', state: 'ok' },
      { metric: 'Reservoir', value: '95%', state: 'ok' },
    ],
  },
  // HVAC Path
  {
    name: 'Compressor',
    description: 'The heart of the HVAC system, this unit compresses refrigerant gas, preparing it for the cooling cycle.',
    viewType: 'pump-status',
    pumpData: {
      rpm: { value: 3200, max: 5000 },
      pressure: { value: 150, unit: 'PSI' },
    },
    status: [
      { metric: 'Status', value: 'Active', state: 'ok' },
      { metric: 'Discharge Temp', value: '85°C', state: 'ok' },
      { metric: 'Suction Temp', value: '5°C', state: 'ok' },
    ],
  },
  {
    name: 'Ventilation Fan',
    description: 'High-performance rear fan ensuring continuous airflow through the enclosure to prevent vapor accumulation and assist cooling.',
    viewType: 'pump-status',
    pumpData: {
      rpm: { value: 1200, max: 1800 },
      pressure: { value: 0.5, unit: 'inWg' } 
    },
    status: [
      { metric: 'Status', value: 'Running', state: 'ok' },
      { metric: 'Airflow', value: 'Normal', state: 'ok' },
      { metric: 'Vibration', value: 'Low', state: 'ok' },
    ]
  },
  {
    name: 'Expansion Valve',
    description: 'Regulates the flow of refrigerant into the Cooling Unit, causing a rapid pressure drop and cooling effect.',
    viewType: 'system-status',
    status: [
      { metric: 'Status', value: 'Modulating', state: 'ok' },
      { metric: 'Position', value: '65% Open', state: 'ok' },
      { metric: 'Temp Drop', value: '-20°C', state: 'ok' },
    ],
  },
  // Control System
  {
    name: 'PLC Control System',
    description: 'A Programmable Logic Controller (PLC) based control system for fully automated and optimized operation.',
    viewType: 'live-trends',
    liveDataConfig: {
      key1: 'cpu', label1: 'CPU', unit1: '%', color1: '#22d3ee', domain1: [0, 100],
      key2: 'mem', label2: 'Memory', unit2: '%', color2: '#818cf8', domain2: [0, 100],
    },
    status: [
      { metric: 'Controller', value: 'Online', state: 'ok' },
      { metric: 'Network', value: 'Stable', state: 'ok' },
      { metric: 'Uptime', value: '99.98%', state: 'ok' },
    ],
  },
];
