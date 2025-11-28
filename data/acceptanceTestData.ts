export interface Checkpoint {
  id: string;
  criteria: string;
  checked: boolean;
  notes: string;
  lastCompleted: string | null;
}

export interface ChecklistSection {
  title: string;
  checkpoints: Checkpoint[];
}

export interface TestSection {
  id: string; // kebab-case key for tab id
  title: string; // Short title for tab
  longTitle: string; // Full title for page header
  purpose: string;
  checklistSections: ChecklistSection[];
}

export const acceptanceTestData: TestSection[] = [
  {
    id: 'fat-test',
    title: 'FAT Test',
    longTitle: 'Factory Acceptance Test (FAT)',
    purpose: "This section is used at the manufacturer's facility to verify that the newly built equipment meets all contractual and design specifications before it is shipped to the client's site.",
    checklistSections: [
      {
        title: "1.1 Documentation & Preparation Review",
        checkpoints: [
          "Approved User Requirement Specification (URS), P&IDs, and Technical Specifications are available.",
          "Final mechanical, electrical, and software drawings are complete and match the fabricated unit.",
          "Material certifications, welding logs, motor data sheets, and pressure vessel certificates (if applicable) are present and valid.",
          "All testing equipment and internal sensors/gauges used in the FAT have valid calibration certificates.",
          "Final Operation, Maintenance, and Safety Manuals are complete. Recommended Spare Parts List is verified.",
          "The FAT Test Procedure and acceptance criteria are formally approved by both manufacturer and client."
        ].map((criteria, i) => ({ id: `1.1.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      },
      {
        title: "1.2 Visual, Mechanical, and Structural Inspection",
        checkpoints: [
          "Equipment is free from visible damage, rust, and sharp edges. Paint and finish quality are acceptable.",
          "Critical physical dimensions (footprint, height, utility locations) match the General Arrangement Drawing.",
          "All major components (motors, pumps, valves) are correctly labeled and tagged according to P&ID.",
          "Welding, bracing, and structural stability are sound. Fasteners are tight and correctly torqued.",
          "All moving parts (shafts, bearings, gears) are correctly installed, aligned, and operate smoothly.",
          "Key maintenance access points, filtration units, and lubrication points are easily reachable."
        ].map((criteria, i) => ({ id: `1.2.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      },
      {
        title: "1.3 Electrical and Control System Inspection",
        checkpoints: [
          "Electrical panel wiring is neat, secured, correctly bundled, and clearly labeled per schematics.",
          "All non-current carrying metal parts are correctly and consistently grounded.",
          "Fuses, circuit breakers, and overload relays are correctly rated and installed.",
          "All digital and analog Input/Output signals are individually tested and verified against the I/O list.",
          "PLC/DCS/HMI software/firmware versions are confirmed to be the latest approved versions."
        ].map((criteria, i) => ({ id: `1.3.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      },
      {
        title: "1.4 Functional and Performance Testing (Simulated Conditions)",
        checkpoints: [
          "The complete automatic start and stop process executes without error.",
          "All valves, pumps, and actuators can be controlled individually and correctly in Manual mode.",
          "The primary production sequence runs correctly through all defined steps/phases (using simulated material or utilities where necessary).",
          "Critical process alarms are simulated and system response (visual, audible, logging) is verified.",
          "Safety and process interlocks are tested to confirm functionality.",
          "Leak testing with dry nitrogen."
        ].map((criteria, i) => ({ id: `1.4.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      },
      {
        title: "1.5 Safety and Compliance Testing",
        checkpoints: [
          "All E-Stop buttons are physically tested to ensure immediate and safe equipment shutdown.",
          "Energy isolation points are confirmed and clearly marked for Lockout/Tagout procedures.",
          "Testing of flame arresters in worst case scenario."
        ].map((criteria, i) => ({ id: `1.5.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      }
    ]
  },
  {
    id: 'delivery',
    title: 'Delivery',
    longTitle: 'Delivery Checklist',
    purpose: "This section is used upon the equipment's arrival at the client's site to verify that it has arrived complete and undamaged.",
    checklistSections: [
      {
        title: "2.1 Receiving Inspection",
        checkpoints: [
          "Equipment is inspected for any external damage to crates or wrapping that may have occurred during shipment.",
          "All crates, boxes, and skids on the shipping manifest and packing list are accounted for.",
          "Shipping documents (Bill of Lading, Packing List, Commercial Invoice) are present and correct.",
          "Tipping indicators and shock-watch sensors (if used) are checked and their status is recorded.",
          "Photographs are taken of the equipment as-received, prior to uncrating.",
          "Equipment is moved to a secure, weather-protected staging area designated by the client.",
          "Loose components and boxes of parts are inventoried against the packing list."
        ].map((criteria, i) => ({ id: `2.1.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      }
    ]
  },
  {
    id: 'sat-test',
    title: 'SAT Test',
    longTitle: 'Site Acceptance Test (SAT)',
    purpose: "This section is used after the equipment has been installed and connected to site utilities. It validates the equipment's performance in its actual operating environment with real production materials.",
    checklistSections: [
      {
        title: "3.1 Installation and Pre-Startup Verification",
        checkpoints: [
          "Equipment is inspected for any damage incurred during shipment and handling post-uncrating.",
          "Equipment is correctly positioned, leveled, and secured/anchored to the floor or foundation.",
          "All site utilities (electrical power, compressed air, water, drainage) are properly and safely connected.",
          "Site conditions (temperature, humidity, vibration) are within the equipment’s specified operating envelope.",
          "Verification that all outstanding items identified in the FAT have been resolved prior to commencing SAT."
        ].map((criteria, i) => ({ id: `3.1.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      },
      {
        title: "3.2 System Integration and Interface Test",
        checkpoints: [
          "The equipment powers up successfully using the site's permanent electrical supply (confirming voltage/phase stability).",
          "Communication link to the client’s control system (SCADA, MES, Historian) is established and verified stable.",
          "Data exchange and physical interlocking with adjacent production equipment are tested and confirmed functional.",
          "Remote diagnostic and monitoring features (if specified) are verified to be working on the client network."
        ].map((criteria, i) => ({ id: `3.2.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      },
      {
        title: "3.3 Performance and Operational Validation",
        checkpoints: [
          "Equipment runs the full automatic sequence using actual materials and site utilities.",
          "Equipment achieves the specified Key Performance Indicator (KPI) throughput rate.",
          "Final product quality parameters are measured and meet specifications.",
          "An agreed-upon continuous run test (e.g., 4 to 8 hours) is completed without critical fault intervention.",
          "Real-world alarms (e.g., low tank level) are triggered, and the system responds and recovers correctly."
        ].map((criteria, i) => ({ id: `3.3.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      },
      {
        title: "3.4 Final Review, Training, and Sign-off",
        checkpoints: [
          "Core operations team demonstrates proficiency in equipment startup, shutdown, and error recovery.",
          "Maintenance team demonstrates proficiency in Preventative Maintenance (PM) tasks and parts changeover procedures.",
          "All final As-Built drawings, completed FAT/SAT protocols, and operating licenses are provided to the client.",
          "The client formally signs the SAT completion document, authorizing the equipment for production use."
        ].map((criteria, i) => ({ id: `3.4.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      }
    ]
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    longTitle: 'Maintenance Turnover',
    purpose: "This section ensures that all necessary spare parts, tools, documentation, and knowledge are formally handed over to the client's maintenance team.",
    checklistSections: [
      {
        title: "4.1 Turnover Checklist",
        checkpoints: [
          "A complete inventory of recommended spare parts has been delivered and verified on-site.",
          "All special tools, jigs, and fixtures required for maintenance have been handed over.",
          "The final Preventative Maintenance (PM) schedule and procedures have been provided and reviewed.",
          "A comprehensive lubrication schedule and chart identifying all grease points and specified lubricants is available.",
          "The client’s maintenance team has received hands-on training for common troubleshooting and repair tasks.",
          "Contact information for technical support and spare parts ordering has been provided and is clearly visible."
        ].map((criteria, i) => ({ id: `4.1.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      }
    ]
  },
  {
    id: 'training',
    title: 'Training',
    longTitle: 'Training Verification',
    purpose: "This section documents that all required personnel (operators, maintenance, etc.) have been adequately trained on the new equipment.",
    checklistSections: [
      {
        title: "5.1 Training Checklist",
        checkpoints: [
          "Operator training on equipment startup, normal operation, and shutdown procedures is complete.",
          "Maintenance team training on all scheduled Preventative Maintenance (PM) tasks is complete.",
          "Key personnel have been trained on troubleshooting common faults and alarm recovery procedures.",
          "Safety training, including Emergency Stop, Lockout/Tagout, and specific hazard awareness, is complete.",
          "All training manuals, guides, and digital resources have been handed over and their location is known to the team.",
          "A formal Q&A session was held, and all significant questions from the client team have been answered and documented."
        ].map((criteria, i) => ({ id: `5.1.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      }
    ]
  },
  {
    id: 'maint-schedule',
    title: 'Maint. Schedule',
    longTitle: 'Maintenance Schedule',
    purpose: "This page serves as an interactive, ongoing log for tracking all preventative maintenance activities for the equipment.",
    checklistSections: [
        { title: 'Daily', checkpoints: ["Check for unusual noises or vibrations...", "Visually inspect for any signs of refrigerant leaks..."] },
        { title: 'Weekly', checkpoints: ["Wipe down equipment housing...", "Ensure air vents and grilles are clear..."] },
        { title: 'Monthly', checkpoints: ["Inspect fan blades and motor..."] },
        { title: 'Quarterly', checkpoints: ["Clean condenser and evaporator coils...", "Check refrigerant charge..."] },
        { title: 'Annually', checkpoints: ["Perform a comprehensive leak test...", "Check compressor oil level...", "Perform offline motor insulation test...", "Lubricate motor bearings...", "Open bottom panels and clean...", "Visually inspect pipes...", "Drain and replace oil pump oil..."] },
        { title: 'Every 2000 Hrs', checkpoints: ["Regrease oil pump bearings..."] },
        { title: 'Periodic', checkpoints: ["Clean Stainless Steel/GRP pipes..."] }
    ].map(section => ({
        title: section.title,
        checkpoints: section.checkpoints.map((criteria, i) => ({ id: `${section.title}-${i+1}`, criteria, checked: false, notes: '', lastCompleted: null}))
    }))
  },
  {
    id: 'commissioning',
    title: 'Commissioning',
    longTitle: 'Final Commissioning & Handover',
    purpose: "This is the final stage of the project, ensuring all contractual obligations have been met, all documentation is finalized, and the equipment is formally handed over for production use.",
    checklistSections: [
      {
        title: "7.1 Handover Checklist",
        checkpoints: [
          "All punch list items from FAT, SAT, and Delivery have been formally closed out and verified.",
          "The final, complete set of 'As-Built' documentation has been handed over and accepted by the client.",
          "All required training for operators and maintenance personnel is complete and attendance is documented.",
          "Digital and physical copies of all Training Manuals, presentations, and supporting materials have been handed over to the client.",
          "A comprehensive Spare Parts Sourcing Guide, including vendor contacts and part numbers for non-proprietary items, has been provided.",
          "Final sign-off and formal acceptance of the on-site spare parts inventory has been completed by the client.",
          "The manufacturer's official Warranty Certificate has been received, and start/end dates are formally documented.",
          "The procedure and contact information for making a warranty claim are clearly documented and provided to the maintenance team.",
          "Proof of insurance coverage for the equipment (e.g., transit, installation, liability) has been received and filed.",
          "All project deliverables have been met as per the original contract and scope of work.",
          "The system has been officially handed over to the Operations department for production use.",
          "Final project completion and acceptance certificates are signed by all required parties."
        ].map((criteria, i) => ({ id: `7.1.${i + 1}`, criteria, checked: false, notes: '', lastCompleted: null }))
      }
    ]
  },
];