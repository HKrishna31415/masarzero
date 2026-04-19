// English dictionary for resource pages
// Keys map 1:1 to UI strings. Edit English here; other languages mirror the same keys.

export const en = {

  // ── Maintenance Guide ──────────────────────────────────────────────────────
  maintenance: {
    badge: 'Technical Documentation v2.4',
    title: 'Maintenance Manual',
    description: 'Comprehensive repair guides, wiring diagrams, and troubleshooting protocols for certified MasarZero technicians.',
    module: 'Module:',
    downloadSheet: 'Download sheet',
    sheets: {
      daily: 'Daily operator check sheet',
      weekly: 'Weekly inspection checklist',
      quarterly: 'Quarterly service worksheet',
    },
    intervals: { daily: 'Daily', weekly: 'Weekly', quarterly: 'Quarterly' },
    severity: { critical: 'Critical', high: 'High', planned: 'Planned' },
    // Shared component labels
    safetyWarning: 'SAFETY WARNING',
    technicalNote: 'Technical Note',
    // Section titles (from MAINTENANCE_SECTIONS — keyed by section.id)
    sections: {
      introduction: 'Introduction',
      plc: 'PLC Guide',
      hmi: 'HMI (Display)',
      hvac: 'HVAC System',
      electrical: 'Electrical Panel',
      membranes: 'Membranes',
      oil_pump: 'Oil Pump',
      air_pump: 'Ring Blower / Air Pump / Vacuum Pump',
      fan: 'Ex-Proof Fan',
      motor: 'Electric Motors',
      tank: 'Gasoline Tank',
      valve: 'Solenoid Valve',
      baseplate: 'Baseplate Wiring',
      cloud: 'Cloud Telemetry',
      pipeline: 'Pipeline',
      grounding: 'Grounding',
      cabinet: 'Exterior Cabinet',
      pressure_valve: 'Pressure Valve',
      operation: 'SOP',
    },
    // Relay reset animation
    relay: {
      status: 'Status:',
      tripped: 'Tripped (Indicator Red)',
      resetting: 'Resetting...',
      ready: 'Ready (Indicator Emerald)',
      pressButton: 'PRESS EMERALD BUTTON',
    },
    // Motor wiring diagram
    motor: {
      star: 'Star (Wye) Connection - High Voltage',
      delta: 'Delta Connection - Low Voltage',
    },
    // PLC wiring diagram
    plc: {
      externalWiring: 'External Wiring',
      motorsAndPumps: 'Motors & Pumps (KM)',
      sensorsAndActuators: 'Sensors & Actuators (KA)',
      mainPower: 'Main Power (380V)',
      internet: 'Internet (V-BOX)',
      compressor: 'Compressor',
      fans: 'Fans (1 & 2)',
      oilPump: 'Oil Pump',
      airPump: 'Air Pump',
      pressureSensors: 'Pressure Sensors (x4)',
      tempSensors: 'Temperature Sensors (x3)',
      solenoidValves: 'Solenoid Valves (x3)',
      levelSwitch: 'Level Switch',
      flowmeter: 'Flowmeter',
      plcBox: 'Explosion-Proof Control Box (PLC)',
      plcCore: 'PLC Core',
      cpuStatus: 'CPU Status',
      cpuRunning: 'RUNNING',
      comms: 'Comms',
    },
  },

  // ── VRU Testing / Validation Protocol ─────────────────────────────────────
  vruTesting: {
    badge: 'Quality Assurance',
    title: 'Validation Protocols',
    description: "We don't just build machines; we certify performance. Our 3-tiered testing regime ensures every VRU meets the specific demands of its deployment environment.",
    // Intro cards
    intro: {
      overview: { title: 'Overview first', desc: 'Choose the appropriate testing level, then move into hardware detail only when needed.' },
      workflow: { title: 'Mode-based workflow', desc: 'This page now reads more clearly as scope selection, diagnostics, and deliverables.' },
      outputs: { title: 'Actionable outputs', desc: 'Every test level should end with findings, recommendations, and retest or commissioning actions.' },
    },
    // Level selector
    levelScope: 'Level {n} Scope',
    selectHardware: 'Select Hardware',
    selectHardwareDesc: 'Click on a component above to initialize its specific diagnostic simulation.',
    diagnosticTerminal: 'Diagnostic Terminal:',
    // Levels
    levels: [
      {
        title: 'Standard Compliance',
        subtitle: 'Routine Verification',
        description: 'The foundational layer of our quality assurance. Every unit deployed undergoes this mandatory testing sequence to ensure it meets basic regulatory and operational standards.',
        features: ['Vapor Pressure (RVP) Check', 'Output Octane Rating Analysis', 'Basic Leak Detection Scan', '4-Hour Continuous Run Test'],
        hardware: [
          { category: 'Primary Equipment', equipment: 'Hybrid VRU (Ref + Carbon)', purpose: 'Standard recovery unit with >98% efficiency rating.' },
          { category: 'Vapor Manifolding', equipment: 'Double-walled FRP & P/V Valves', purpose: 'Ensures system integrity and pressure safety.' },
          { category: 'Leak Detection', equipment: 'Bubble Leak Test', purpose: 'Visual verification of joint tightness using surfactant solution.' },
          { category: 'Tank Monitoring', equipment: 'High-Precision ATG', purpose: 'Automated Tank Gauging for inventory tracking.' },
          { category: 'Control System', equipment: 'Standard PLC Interface', purpose: 'Basic automated control and emergency logic.' },
          { category: 'Quality Verification', equipment: 'Gasoline Quality Lab Test', purpose: 'External laboratory analysis to certify fuel composition.' },
          { category: 'Manual Audit', equipment: 'Water Finding Paste', purpose: 'Color-change verification of tank bottom water.' },
        ],
      },
      {
        title: 'Deep-Dive Audit',
        subtitle: 'Efficiency Optimization',
        description: 'A rigorous examination of system efficiency. This level introduces manual auditing tools to verify sensor accuracy, physical integrity, and detailed electrical consumption analysis.',
        features: ['Manual Pressure Verification', 'Gross Flow Volume Audit', 'Power Consumption Profiling', 'Physical Seal Integrity Scan'],
        hardware: [
          { category: 'Foundation', equipment: 'Includes All Level 1 Hardware', purpose: 'Builds upon the standard equipment baseline.' },
          { category: 'Integrity Test', equipment: 'Nitrogen Integrity Test', purpose: 'High-pressure decay simulation to verify manifold seal.' },
          { category: 'Chemistry', equipment: 'Gasoline Reformates Analysis', purpose: 'Simulation of non-evaporative octane boosters.' },
          { category: 'Power Analysis', equipment: '3-Phase Power Analyzer', purpose: 'Logs voltage, current, and power factor.' },
          { category: 'Sensor Audit', equipment: 'Electronic Water Cut', purpose: 'Digital interface probe calibration check.' },
        ],
      },
      {
        title: 'Forensic Stress Test',
        subtitle: 'Maximum Durability',
        description: 'Our most extreme testing protocol. Includes Gold/Silver standard methodology for precise emissions calculation, chemical speciation, and thermal performance analysis.',
        features: ['Full Hydrocarbon Speciation', 'Contaminant Injection Simulation', 'Surge Flow Load Testing (150%)', 'Gold/Silver Standard Validation'],
        hardware: [
          { category: 'Advanced Leak', equipment: 'Optical Gas Imaging', purpose: 'Visualizing fugitive hydrocarbon emissions invisible to the naked eye.' },
          { category: 'Thermal Control', equipment: 'SHED Analysis', purpose: 'Canopy/Shade impact simulation on core operating temperature.' },
          { category: 'Sensory Audit', equipment: 'Olfactory Test', purpose: 'Station map and field olfactometry verification.' },
          { category: 'Precise Emissions', equipment: 'VOC Analyzer (PID/FID)', purpose: 'Real-time ppm concentration.' },
          { category: 'Chemical Analysis', equipment: 'Gas Chromatograph', purpose: 'Full chemical speciation (C4-C6 chains).' },
          { category: 'Advanced Diagnostics', equipment: 'Thermal Imager', purpose: 'Thermal core uniformity analysis.' },
          { category: 'Remote Comms', equipment: 'Wired Internet Connection Test', purpose: 'Ethernet link latency & packet loss verification.' },
          { category: 'Mechanical Health', equipment: 'Acoustic Monitoring', purpose: 'Ultrasonic bearing & cavitation detection.' },
        ],
      },
    ],
    // Interactive component labels
    thermalCore: 'Thermal Core Analysis',
    systemIntegrity: 'System Integrity',
    methodologySelector: 'Methodology Selector',
    methodologySelectorDesc: 'Regulatory validation protocol comparison.',
    measurementDistance: 'Measurement Distance',
    dampeningOn: 'Dampening ON',
    dampeningOff: 'Dampening OFF',
    dampeningDesc: 'Simulates acoustic foam installation.',
    measuredLevel: 'Measured Level',
    limitAt10m: 'Limit @ 10m',
    beforeVru: 'Before VRU',
    afterVru: 'After VRU',
    comparativeIntensity: 'Comparative Intensity Levels',
    selectMapPoint: 'Select a map point',
    olfactoryMap: 'Olfactory Map',
    olfactoryDesc: 'Field Odor Intensity Verification',
    wiredDiagnostic: 'Wired Connection Diagnostic',
    wiredDesc: 'Ethernet Link & Latency Test',
    nitrogenTest: 'Nitrogen Integrity Test',
    nitrogenStandard: 'Standard: Hold 60 PSI for 15 min',
    startSequence: 'START SEQUENCE',
    testing: 'TESTING...',
    opticalGasImaging: 'Optical Gas Imaging',
    opticalDesc: 'MWIR Fugitive Emission Scan',
    waterCut: 'Electronic Water Cut',
    waterCutDesc: 'Capacitance Probe Interface Detection',
    flowMeter: 'Coriolis Mass Flow Meter',
    fractionalEvaporation: 'Fractional Evaporation Analysis',
    vaporPhaseBoundary: 'Vapor Phase Boundary',
    shedAnalysis: 'SHED Analysis',
    coolingLoad: 'Cooling Load',
    sensorHarness: 'Sensor Harness Integrity',
    signalHealth: 'SIGNAL HEALTH',
    // Hardware diagnostics section
    hardwareDiagnostics: 'Hardware Diagnostics',
    selectComponentDesc: 'Select component to run simulation',
    specSheet: 'SPECIFICATION_SHEET_V2.4',
    // Expected deliverables
    expectedDeliverables: 'Expected deliverables',
    deliverables: [
      'Executive pass/fail summary and test scope confirmation.',
      'Detailed instrument, hardware, and variance findings for the site team.',
      'Recommended actions for optimization, remediation, retest, or final signoff.',
    ],
    labNote: 'All testing is conducted by ISO 17025 accredited laboratories.',
    // Request level audit
    requestAudit: 'Request Level {n} Audit',
  },

  // ── Equipment Acceptance Test ──────────────────────────────────────────────
  acceptanceTest: {
    badge: 'Quality Assurance',
    title: 'Acceptance Protocol',
    inProgress: 'IN PROGRESS',
    complete: 'COMPLETE',
    exportPdf: 'Export PDF',
    sectionStatus: 'Section Status',
    authorization: 'Authorization & Sign-Off',
    lastCompleted: 'Last Completed',
    asRequired: 'As Required',
    trackManually: '(Track Manually)',
    setDate: 'Set Date',
    overdue: 'Overdue by',
    dueToday: '(Due today)',
    dueIn: 'Due in',
    signHere: 'Sign Here',
    nameTitlePlaceholder: 'Name & Title',
    dateSigned: 'Date Signed',
    signatureRequired: 'Signature Required',
    type: 'Type',
    draw: 'Draw',
    upload: 'Upload',
    clickToUpload: 'Click to Upload Image',
    observations: 'Observations / Notes...',
    nameTitleLabel: 'Name / Title',
    typeFullName: 'Type Full Name',
    // Tab titles
    tabs: {
      fat: 'FAT Test',
      delivery: 'Delivery',
      sat: 'SAT Test',
      maintenance: 'Maintenance',
      training: 'Training',
      maintSchedule: 'Maint. Schedule',
      commissioning: 'Commissioning',
    },
    // Section long titles & purposes
    sections: {
      fat: {
        longTitle: 'Factory Acceptance Test (FAT)',
        purpose: "This section is used at the manufacturer's facility to verify that the newly built equipment meets all contractual and design specifications before it is shipped to the client's site.",
      },
      delivery: {
        longTitle: 'Delivery Checklist',
        purpose: "This section is used upon the equipment's arrival at the client's site to verify that it has arrived complete and undamaged.",
      },
      sat: {
        longTitle: 'Site Acceptance Test (SAT)',
        purpose: "This section is used after the equipment has been installed and connected to site utilities. It validates the equipment's performance in its actual operating environment with real production materials.",
      },
      maintenance: {
        longTitle: 'Maintenance Turnover',
        purpose: 'This section ensures that all necessary spare parts, tools, documentation, and knowledge are formally handed over to the client\'s maintenance team.',
      },
      training: {
        longTitle: 'Training Verification',
        purpose: 'This section documents that all required personnel (operators, maintenance, etc.) have been adequately trained on the new equipment.',
      },
      maintSchedule: {
        longTitle: 'Maintenance Schedule',
        purpose: 'This page serves as an interactive, ongoing log for tracking all preventative maintenance activities for the equipment.',
      },
      commissioning: {
        longTitle: 'Final Commissioning & Handover',
        purpose: 'This is the final stage of the project, ensuring all contractual obligations have been met, all documentation is finalized, and the equipment is formally handed over for production use.',
      },
    },
    // Signature pad roles
    sigRoles: {
      manufacturer: 'Manufacturer Representative',
      client: 'Client Representative',
      inspector: 'Third Party Inspector',
      manufacturerRole: 'Technical Lead',
      clientRole: 'Site Manager',
      inspectorRole: 'QA/QC Auditor',
    },
  },

  // ── Support Page ───────────────────────────────────────────────────────────
  support: {
    badge: 'Operations Hub',
    title: 'System Diagnostics',
    description: 'Interact with the schematic below to identify components and access specific maintenance protocols.',
    troubleshooting: 'Troubleshooting',
    maintenance: 'Maintenance',
    dispatchRequest: 'Dispatch Request',
    expertNetwork: 'Expert Network',
    expertNetworkDesc: 'Certified professionals ready for on-site deployment.',
    serviceWorkflow: 'Service workflow',
    escalationPaths: 'Escalation paths',
    slaAndIntake: 'SLA and intake',
    serviceSteps: [
      '1. Intake via platform, technician call, or client escalation.',
      '2. Remote triage with logs, alarms, and operating context.',
      '3. Guided operator action or site dispatch decision.',
      '4. Resolution notes, parts follow-up, and service close-out.',
    ],
    escalation: {
      p1: 'Safety risk or outage escalates immediately to senior response.',
      p2: 'Recovery degradation moves into engineering review.',
      p3: 'Reporting, optimization, or planning issues route to service coordination.',
    },
    sla: [
      'Include site name, machine ID, alarm code, and operating state in every request.',
      'Attach photos or dashboard screenshots when available.',
      'Priority is determined by safety, downtime, and commercial impact.',
    ],
    components: [
      {
        id: 'control_panel',
        name: 'Control Panel',
        description: 'The intelligent brain of the VRU, housing the PLC, HMI, and electrical distribution systems.',
        troubleshooting: [
          { q: 'Display is blank.', a: 'First, verify the main power supply to the VRU. If power is present, check the internal fuse for the control panel. A persistent issue may require a panel reset.' },
          { q: 'System reset procedure?', a: 'Yes, a system reboot sequence can be initiated through the maintenance menu. Please consult your operational manual for the step-by-step procedure.' },
        ],
        maintenance: [
          { frequency: 'Monthly', task: 'Verify all indicator lights and alarms are functional.' },
          { frequency: 'Quarterly', task: 'Check for and tighten any loose electrical connections (Power OFF).' },
          { frequency: 'Annually', task: 'Ensure the enclosure seal is intact and free from moisture ingress.' },
        ],
      },
      {
        id: 'flame_arrester',
        name: 'Flame Arrester',
        description: 'Critical safety device installed on the vapor inlet line to prevent flame propagation into the system.',
        troubleshooting: [
          { q: 'High pressure drop at inlet.', a: 'The element bank is likely clogged with debris or particulate matter. Isolate and clean immediately.' },
          { q: 'Visible corrosion on housing.', a: 'Inspect the depth of corrosion. If structural integrity is compromised, replace the unit.' },
        ],
        maintenance: [
          { frequency: 'Monthly', task: 'Visual inspection for external damage or blockage.' },
          { frequency: 'Quarterly', task: 'Remove and clean the element bank with approved solvent.' },
          { frequency: 'Annually', task: 'Hydrostatic testing if required by local regulation.' },
        ],
      },
      {
        id: 'vacuum_pump',
        name: 'Vacuum Pump',
        description: 'Creates the negative pressure required to draw hydrocarbon vapors from the storage tanks into the recovery system.',
        troubleshooting: [
          { q: 'Unable to reach target vacuum.', a: 'Check inlet filters for blockage. Inspect piping for leaks. Verify pump vanes are not worn.' },
          { q: 'Pump is overheating.', a: 'Check oil levels and cooling airflow. Ensure the discharge line is not blocked.' },
        ],
        maintenance: [
          { frequency: 'Weekly', task: 'Check oil level and color.' },
          { frequency: 'Quarterly', task: 'Change vacuum pump oil and replace oil mist filters.' },
          { frequency: 'Annually', task: 'Inspect and replace vanes/seals.' },
        ],
      },
      {
        id: 'scrubber',
        name: 'Scrubber / Sieve',
        description: 'Filtration stage designed to remove particulates and moisture from the incoming vapor stream.',
        troubleshooting: [
          { q: 'High liquid level reported.', a: 'This may indicate an issue with the automated drain valve. Manually drain the scrubber and check the valve for blockages or mechanical failure.' },
          { q: 'Replacement frequency?', a: 'Scrubber media replacement depends on vapor composition. We recommend quarterly inspection and replacement every 12-18 months.' },
        ],
        maintenance: [
          { frequency: 'Weekly', task: 'Drain accumulated liquids from the scrubber housing.' },
          { frequency: 'Monthly', task: 'Check for pressure drops across the scrubber media.' },
          { frequency: 'Quarterly', task: 'Inspect internal components for corrosion or blockages.' },
          { frequency: 'Annually', task: 'Replace scrubber media as per operational hours.' },
        ],
      },
      {
        id: 'compressor',
        name: 'Compressor',
        description: 'Pressurizes the refrigerant to facilitate the heat exchange cycle required for condensation.',
        troubleshooting: [
          { q: 'Compressor is short-cycling.', a: 'Short-cycling is often caused by either low refrigerant levels or a faulty pressure switch. Do not continue operation; contact support immediately.' },
        ],
        maintenance: [
          { frequency: 'Weekly', task: 'Clean compressor intake filters.' },
          { frequency: 'Monthly', task: 'Check compressor oil levels and top up if necessary.' },
          { frequency: 'Quarterly', task: 'Inspect drive belts for wear, tension, and alignment.' },
          { frequency: 'Annually', task: 'Test pressure relief valves.' },
        ],
      },
      {
        id: 'refrigerator',
        name: 'Refrigerator Unit',
        description: 'The core cooling system responsible for condensing hydrocarbon vapors back into liquid form.',
        troubleshooting: [
          { q: 'The unit is not cooling sufficiently.', a: 'Check for obstructions around condenser coils. Ensure adequate airflow. Verify ambient temperature is within range. If issue persists, check refrigerant levels.' },
          { q: 'Unusual noise detected.', a: 'Could indicate fan obstruction or compressor issue. Power down safely and inspect visually. Contact a technician if noise continues after restart.' },
        ],
        maintenance: [
          { frequency: 'Weekly', task: 'Inspect condenser coils for debris and clean if necessary.' },
          { frequency: 'Monthly', task: 'Check refrigerant levels and system pressures.' },
          { frequency: 'Quarterly', task: 'Verify fan motors are operating correctly and free of vibration.' },
          { frequency: 'Annually', task: 'Perform a full refrigerant leak test.' },
        ],
      },
      {
        id: 'tank',
        name: 'Gasoline Tank',
        description: 'The holding vessel for recovered liquid hydrocarbons before they are returned to the main supply.',
        troubleshooting: [
          { q: 'Level sensor reading error.', a: 'The float may be stuck. Perform a manual dip test to verify actual levels. Attempt to recalibrate the sensor via the control panel.' },
          { q: 'Odor detected near tank area.', a: 'Inspect manway gaskets, vent pipes, and flange connections for vapor leaks. Ensure the pressure relief valve is seating correctly.' },
        ],
        maintenance: [
          { frequency: 'Monthly', task: 'Visual inspection of vent risers and rain caps.' },
          { frequency: 'Quarterly', task: 'Check grounding/earthing connections for continuity.' },
          { frequency: 'Annually', task: 'Inspect exterior for corrosion or physical damage.' },
          { frequency: 'Annually', task: 'Calibrate electronic level monitoring system.' },
        ],
      },
      {
        id: 'oil_pump',
        name: 'Oil Pump',
        description: 'Transfers the recovered liquid fuel from the holding tank back to the main underground storage.',
        troubleshooting: [
          { q: 'Pump motor running but no flow.', a: 'Check for air lock in the suction line. Ensure isolation valves are open. Check for blockage in the discharge strainer.' },
          { q: 'Pump leaking.', a: 'Mechanical seal failure is likely. Isolate pump and replace seal kit.' },
        ],
        maintenance: [
          { frequency: 'Monthly', task: 'Check for leaks around shaft seal.' },
          { frequency: 'Quarterly', task: 'Clean suction strainer.' },
          { frequency: 'Annually', task: 'Check alignment and coupling wear.' },
        ],
      },
      {
        id: 'quality_sensor',
        name: 'Gasoline Quality',
        description: 'Real-time analysis unit monitoring fuel composition, RVP, and octane levels of recovered liquid.',
        troubleshooting: [
          { q: 'Inaccurate readings.', a: 'Sensor probe may be fouled. Isolate sensor and clean with approved solvent. Perform zero-calibration.' },
          { q: 'No data output.', a: 'Check signal wiring to PLC. Ensure 24V DC supply is present at the sensor head.' },
        ],
        maintenance: [
          { frequency: 'Monthly', task: 'Verify readings against manual lab sample.' },
          { frequency: 'Quarterly', task: 'Calibration with standard reference fluid.' },
          { frequency: 'Annually', task: 'Replace sensor head assembly.' },
        ],
      },
    ],
  },

  // ── Knowledge Base ─────────────────────────────────────────────────────────
  knowledgeBase: {
    badge: 'Integrated Technical Manual v2.4',
    title: 'Knowledge Nexus',
    description: 'Official technical documentation, operational procedures, and maintenance protocols for MasarZero systems.',
    searchPlaceholder: "Search manual (e.g., 'Compressor', 'Safety')...",
    topicsFound: 'Topics Found',
    searchResults: 'Search Results across all categories:',
    noResults: 'No results found.',
    tryAnother: 'Try a different search term or browse by category.',
    refId: 'Reference ID:',
    categories: {
      overview: 'System Overview',
      safety: 'Safety Protocols',
      installation: 'Installation & Logistics',
      maintenance: 'Maintenance',
      troubleshooting: 'Troubleshooting',
    },
    // Article titles keyed by article id
    articleTitles: {
      'SYS-001': 'Introduction & Intended Use',
      'SYS-002': 'System Components',
      'SYS-003': 'Operational Principles',
      'SAF-001': 'General Safety Guidelines',
      'SAF-002': 'Electrical Safety',
      'SAF-003': 'Emergency Procedures',
      'INS-001': 'Shipment Inspection & Handling',
      'INS-002': 'Storage (Pre-Installation)',
      'INS-003': 'Pre-Requisites & Site Prep',
      'MNT-001': 'General Maintenance Schedule',
      'MNT-002': 'Compressor & Condenser',
      'MNT-003': 'Vacuum/Air Pump',
      'MNT-004': 'Evaporator (Freezing/Icing)',
      'TRB-001': 'Common Alarms & Solutions',
      'TRB-002': 'Motor Issues',
      'TRB-003': 'Oil Pump Troubleshooting',
    },
  },

  // ── Installation Guide ─────────────────────────────────────────────────────
  installationGuide: {
    badge: 'Field Deployment',
    title: 'Installation Guide',
    spatialView: 'SPATIAL VIEW',
    schematicView: 'SCHEMATIC VIEW',
    actionItems: 'Action Items',
    back: 'Back',
    nextStep: 'Next Step',
    finish: 'Finish',
    steps: [
      {
        title: 'Site Preparation',
        desc: 'Ensure the foundation is ready for deployment.',
        checklist: [
          'Verify concrete pad dimensions (2m x 2m min)',
          'Confirm load bearing capacity > 2500kg',
          'Ensure 1m clearance on all sides',
          'Verify grounding rod installation',
        ],
      },
      {
        title: 'Unit Placement',
        desc: 'Positioning the VRU onto the pad.',
        checklist: [
          'Inspect crane lifting points',
          'Lift unit using spreader bar',
          'Align base holes with anchor bolts',
          'Torque anchor bolts to spec (150 Nm)',
        ],
      },
      {
        title: 'Electrical Termination',
        desc: 'High voltage power connection.',
        checklist: [
          'Isolate Main Power (LOTO Procedure)',
          'Connect Phases L1, L2, L3 to XT1 Block',
          'Connect Neutral (N) and PE Ground',
          'Verify Cable Gland Tightness',
        ],
      },
      {
        title: 'Telemetry Uplink',
        desc: 'Establishing cloud data connection.',
        checklist: [
          'Insert SIM Card into V-BOX or Connect Ethernet',
          'Power on Control Circuit (220V)',
          "Verify V-BOX 'NET' LED is blinking",
          "Confirm 'Online' status in PinnacleOS App",
        ],
      },
      {
        title: 'System Boot',
        desc: 'Final startup sequence.',
        checklist: [
          'Open isolation valves',
          'Engage main breaker',
          'Check motor rotation direction',
          'Verify system pressure stabilizes',
        ],
      },
    ],
  },

  // ── Gallery ────────────────────────────────────────────────────────────────
  gallery: {
    title: 'Visual Journey',
    subtitle: 'Scroll to explore our global impact.',
    visitTitle: 'See it in person.',
    visitCTA: 'Schedule Visit',
    items: [
      { title: 'Houston Terminal', subtitle: 'MZ-9000 Pro Deployment' },
      { title: 'Command Center', subtitle: '24/7 Network Operations' },
      { title: 'Fabrication', subtitle: 'Precision Engineering' },
      { title: 'R&D Facility', subtitle: 'Next-Gen Testing' },
      { title: 'On-Site Integration', subtitle: 'Seamless Retrofit' },
      { title: 'Global Logistics', subtitle: 'Supply Chain Excellence' },
    ],
  },
};

export type ResourceDict = typeof en;
