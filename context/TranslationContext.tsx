import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type SupportedLanguage = 'en' | 'zh-CN' | 'ar';

interface LanguageOption {
  code: SupportedLanguage;
  label: string;
}

type TranslationOptions = {
  returnObjects?: boolean;
  defaultValue?: string;
};

interface TranslationContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  languageOptions: LanguageOption[];
  t: (key: string, options?: TranslationOptions) => any;
}

const STORAGE_KEY = 'masarzero-language';

const languageOptions: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '中文' },
  { code: 'ar', label: 'العربية' },
];

const translations = {
  en: {
    common: {
      processing: 'Processing...',
      startCalculation: 'Start Calculation',
      viewCaseStudies: 'View Case Studies',
      live: 'Live',
    },
    header: {
      nav: {
        home: 'Home',
        solutions: 'Solutions',
        products: 'Products',
        technology: 'Technology',
        cycleSystem: 'Cycle System',
        digitalTwin: 'Digital Twin',
        scadaPlatform: 'SCADA Platform',
        impact: 'Impact',
        environmental: 'Environmental',
        financial: 'Financial',
        global: 'Global',
        gasolineQuality: 'Data & Performance',
        resources: 'Resources',
        gallery: 'Gallery',
        knowledgeBase: 'Knowledge Base',
        technicalLibrary: 'Technical Library',
        installationGuide: 'Installation Guide',
        maintenanceManual: 'Maintenance Manual',
        maintenanceProgram: 'Maintenance Program',
        validationProtocol: 'Validation Protocol',
        equipmentAcceptanceTest: 'Equipment Acceptance Test',
        supportService: 'Support & Service',
        company: 'Company',
        esgHub: 'ESG Hub',
        aboutUs: 'About Us',
        newsroom: 'Newsroom',
        legalCompliance: 'Legal & Compliance',
        contactUs: 'Contact Us',
        clientPipeline: 'Client Pipeline',
        investorRelations: 'Investor Relations',
      },
      actions: {
        calculator: 'Calculator',
        clientPlatform: 'Client Platform',
        languageLabel: 'Select language',
        toggleMenu: 'Toggle menu',
      },
    },
    home: {
      hero: {
        line1: 'Intelligent Recovery.',
        line2: 'Tangible Returns.',
        description:
          'MasarZero deploys intelligent vapor recovery systems that reduce losses, improve site conditions, and turn routine emissions into measurable financial upside.',
        cta: 'See How It Works',
      },
      socialProof: {
        trustedBy: 'Trusted by Global Energy Leaders',
        countries: 'Countries Deployed',
        installations: 'Active Installations',
        uptime: 'Operational Uptime',
      },
      howItWorks: {
        title: 'From Vapor to Value',
        subtitle: 'The Recovery Process',
        desktopSubtitle: 'Scroll to visualize the recovery process',
        systemKey: 'System Key',
        vaporFlow: 'Vapor Flow',
        recoveredFuel: 'Recovered Fuel',
        incomingFuel: 'Incoming Fuel',
        steps: {
          truckDispenses: {
            title: 'Truck Dispenses',
            description:
              'A tanker truck arrives and connects to the primary underground storage tank (UST) to begin refueling.',
          },
          vaporDisplacement: {
            title: 'Vapor Displacement',
            description:
              'As liquid fuel fills the tank, it displaces gasoline vapor, which is fed into the MasarZero VRU.',
          },
          condensation: {
            title: 'Condensation',
            description:
              "The VRU's patented system compresses and condenses the vapor, converting it back into pure, liquid gasoline.",
          },
          efficientRecovery: {
            title: 'Efficient Recovery',
            description:
              'Our technology achieves a 99% recovery efficiency rate, minimizing waste and maximizing value.',
          },
          valueReturned: {
            title: 'Value Returned',
            description:
              'The recovered, sellable fuel is returned to a separate tank, creating a new, immediate revenue stream.',
          },
        },
      },
      features: {
        title: 'Engineered for',
        highlight: 'Dominance',
        description:
          'Our proprietary architecture combines cryogenic physics with neural network logic.',
        idle: 'System Idle // Hover Nodes',
        items: {
          cryo: {
            title: 'Cryogenic Capture',
            description:
              'Patented sub-zero condensation technology achieving 99.9% recovery efficiency.',
          },
          ai: {
            title: 'Adaptive Intelligence',
            description: 'Self-learning algorithms optimize pressure and temperature in real-time.',
          },
          modular: {
            title: 'Modular Architecture',
            description: 'Plug-and-play scalability designed for terminals of any capacity.',
          },
          iot: {
            title: 'IoT Connectivity',
            description: 'Native integration with PinnacleOS for remote command and control.',
          },
          safety: {
            title: 'Ex-Proof Design',
            description:
              'Certified for Zone 1 hazardous environments with intrinsic safety barriers.',
          },
          health: {
            title: 'Predictive Health',
            description:
              'Automated diagnostics detect anomalies to prevent downtime before it occurs.',
          },
        },
      },
      productShowcase: {
        title: 'Industrial Precision',
        description:
          'Built to withstand the harshest environments while delivering laboratory-grade performance.',
        badge: 'On-Site Deployment',
        mainTitle: 'MZ-1',
        mainDescription:
          'Fully automated vapor recovery engineered for reliable performance in demanding terminal environments.',
        intelligentControlTitle: 'Intelligent Control',
        intelligentControlDescription: 'PinnacleOS Dashboard Integration',
        cryoCoreTitle: 'Patented Cryo-Core',
        cryoCoreDescription: 'Advanced Condensation Technology',
      },
      sustainability: {
        title: 'Commitment to Sustainability',
        description:
          "Our technology is not just about economic returns; it's about creating a sustainable future for the industry and the planet. We empower our clients to achieve tangible returns while building a sustainable legacy.",
      },
      deploymentProof: {
        badge: 'Deployment Proof',
        title: 'Proven in the field, not just in presentations.',
        description: 'MasarZero systems are already being deployed across retail and industrial environments with real site constraints, measurable recovery value, and visibly improved operating conditions.',
        explore: 'Explore deployments',
        request: 'Request site review',
        blocks: {
          saudi: {
            title: 'Saudi retail deployment',
            location: 'Abha, Saudi Arabia',
            metrics: ['Improved odor conditions', 'Fuel recovery in live operation', 'Supports compliance reporting'],
            summary: 'A live station deployment focused on vapor capture, cleaner site conditions, and dependable day-to-day operations.'
          },
          korea: {
            title: 'Korea dual-machine installation',
            location: 'Korea',
            metrics: ['Two-machine architecture', 'Redundancy for uptime', 'Scalable deployment pattern'],
            summary: 'A dual-unit deployment model designed for larger throughput and repeatable terminal-scale expansion.'
          }
        }
      }
    },
    pages: {
      environmental: {
        title: 'Environmental Impact',
        subtitle: 'Our commitment to a cleaner world.',
        hero: {
          badge: 'Impact Analysis',
          title: 'Turning Emissions into Value',
          description: 'Our VRU systems prevent harmful VOCs from entering the atmosphere, creating a cleaner environment and recovering valuable resources.',
        },
        metrics: {
          co2: { title: 'CO₂ Reduced', description: 'Preventing greenhouse gases from entering the atmosphere annually.' },
          fuel: { title: 'Fuel Recovered', description: 'Turning waste vapor back into valuable, sellable liquid fuel.' },
          trees: { title: 'Tree Equivalent', description: 'Carbon sequestration equivalent to planting millions of trees.' },
          water: { title: 'Water Saved', description: 'Conserving water resources through efficient closed-loop cooling.' },
          air: { title: 'Cleaner Air', description: 'Reduction in Volatile Organic Compounds (VOCs) and pollutants.' },
          compliance: { title: 'Compliance', description: 'Surpassing strict global environmental regulations consistently.' }
        },
        chart: {
          title: 'Performance Correlation',
          subtitle: 'Real-time Analysis // Node: MZ-Alpha',
          liveFeed: 'LIVE FEED',
          revenue: 'REVENUE GROWTH',
          emissions: 'EMISSION DROP',
          timeframe: 'Timeframe',
          netProfit: 'Net Profit'
        },
        scrolling: 'Scroll to Analyze',
        features: {
          carbonCredits: 'Carbon Credits',
          efficiencyRating: 'Efficiency Rating',
          verified: 'Verified'
        },
        beforeAfter: {
          title: 'Before / after operating conditions',
          before: { label: 'Before', text: 'Open vapor losses, stronger odor around transfer activity, reduced visibility into fugitive emissions, and fewer usable financial signals from the site.' },
          after: { label: 'After', text: 'Captured vapor, improved odor conditions for operators and nearby customers, better compliance posture, and clearer revenue value from recovered product.' }
        },
        odorValue: {
          title: 'Why odor improvement matters',
          description: 'Environmental performance is not only a carbon story. Better vapor capture can materially improve the everyday sensory experience at the site by reducing persistent hydrocarbon odor around fueling and transfer operations.',
          points: [
            'Improves customer and operator perception of site cleanliness.',
            'Supports workplace comfort in active fueling environments.',
            'Strengthens the practical value case for recovery beyond compliance alone.'
          ]
        },
        shield: {
          title: 'A Shield For Our Planet',
          tagline: 'VRUs deliver a powerful combination of environmental protection, resource conservation, and improved safety.',
          pollution: { title: 'Reduces Air Pollution', desc: 'Filters over 95% of Volatile Organic Compounds (VOCs) and other harmful vapors before they enter the atmosphere.' },
          resources: { title: 'Conserves Resources', desc: 'Recovers valuable hydrocarbon vapors and converts them back into usable liquid products, preventing resource waste.' },
          ozone: { title: 'Prevents Ozone Formation', desc: 'By capturing VOCs, VRUs help prevent the formation of ground-level ozone (smog), a major component of air pollution.' },
          safety: { title: 'Improves Safety', desc: 'Reduces the risk of fire and explosion by minimizing flammable vapor concentrations at industrial sites.' }
        },
        atmosphere: {
          smog: { title: 'Inhibits Smog Formation (N₂O₄)', desc: 'VRUs capture VOCs & NOx. These compounds not only form smog but also act as greenhouse gases that trap heat in the atmosphere. Preventing their release is key for cleaner air and a stable climate.' },
          protection: { title: 'Protecting Our Atmosphere', desc: 'By capturing Volatile Organic Compounds (VOCs), VRUs reduce the formation of ground-level ozone (smog) and protect the vital stratospheric ozone layer.' }
        }
      },
      esg: {
        title: 'The Sustainability Engine.',
        subtitle: 'We engineer outcomes, not just technology. Every MasarZero unit deployed acts as a regenerative lung for the industrial sector, transforming compliance into a competitive advantage.',
        tabs: {
          environmental: 'Environmental',
          social: 'Social',
          governance: 'Governance'
        },
        env: {
          title: 'Planetary Impact',
          subtitle: 'REAL-TIME CARBON REDUCTION METRICS',
          dataStream: 'DATA STREAM: ONLINE',
          carbonCredits: {
            title: 'Carbon credits',
            desc: 'We treat carbon credits as a commercialization layer on top of measured emissions reduction, not as a substitute for operational proof.',
            points: [
              'Measured reduction pathway tied to operating data',
              'Registry readiness and verification workflow planning',
              'Additional upside alongside recovered fuel economics'
            ]
          },
          lending: {
            title: 'Sustainability-linked lending',
            desc: 'The operating model also supports SLL conversations by linking deployment, emissions metrics, uptime, and reporting discipline to lender-facing KPI frameworks.',
            points: [
              'KPI-backed reporting cadence',
              'Operational evidence for financing narratives',
              'Useful for lenders, investors, and infrastructure partners'
            ]
          },
          nextTab: 'Next: Explore Social Responsibility'
        },
        social: {
          title: 'Zero Harm Culture',
          subtitle: 'Safety isn\'t just a metric; it\'s our moral imperative. We engineer systems that protect people first.',
          nextTab: 'Next: View Governance Framework'
        },
        gov: {
          title: 'Radical Transparency',
          subtitle: 'Trust is built on accountability. Our governance framework provides clear, verifiable insights into our operations, ensuring we meet the highest standards of integrity.',
          financeTitle: 'Finance-aligned governance',
          financeDesc: 'Governance here is not limited to policy language. It also supports lender confidence, carbon-market credibility, and sustainability-linked lending frameworks by keeping data, control history, and accountability trails organized.',
          reportTitle: '2024 ESG Impact Report',
          reportDesc: 'Download our comprehensive annual report detailing our methodology, full audit trails, and future sustainability targets.',
          download: 'Download PDF',
          nextTab: 'Return to Environmental'
        },
        impactDashboard: {
          title: 'Live Impact Telemetry',
          subtitle: 'Global Aggregation',
          co2: { label: 'CO₂ Reduced', sub: 'Annual Run Rate' },
          fuel: { label: 'Fuel Recovered', sub: 'Cumulative Global' },
          trees: { label: 'Tree Equivalent', sub: 'Sequestration Match' },
          water: { label: 'Water Conserved', sub: 'Cooling Efficiency' }
        },
        lifecycle: {
          title: 'Full Lifecycle Sustainability',
          subtitle: 'From raw material to end-of-life, every phase is optimized for minimal environmental impact.',
          stages: [
            { title: 'Ethical Sourcing', desc: '95% of raw materials sourced from certified sustainable providers with full traceability.' },
            { title: 'Green Manufacturing', desc: 'Facilities powered by 100% renewable energy with closed-loop water systems.' },
            { title: 'High-Efficiency Operation', desc: 'Generates 250x the energy consumed. AI-driven optimization minimizes grid impact.' },
            { title: 'Circular Economy', desc: 'Over 90% recyclable by weight. Designed for disassembly and remanufacturing.' }
          ]
        },
        community: {
          title: 'Community & Innovation',
          subtitle: 'Our responsibility extends beyond our facilities. We\'re committed to building stronger communities and pioneering technology for a better world.',
          areas: [
            { title: 'Community Partnerships', desc: 'We invest in STEM education programs in our local communities, inspiring the next generation of engineers and environmental scientists.' },
            { title: 'Local Hiring & Development', desc: 'Our policy prioritizes hiring and developing local talent, ensuring our growth contributes directly to the economic vitality of the regions we operate in.' },
            { title: 'Innovation for Good', desc: 'The MasarZero Innovation Lab is dedicated to pioneering next-gen solutions, including affordable carbon capture and water purification technologies.' },
            { title: 'Employee Volunteer Program', desc: 'We provide paid time off for employees to volunteer for environmental and social causes, amplifying our positive impact beyond our core business.' }
          ]
        },
        safety: {
          title: 'Commitment to Health & Safety',
          subtitle: 'The well-being of our employees, partners, and communities is our highest priority. We maintain a world-class safety culture through rigorous training and proactive measures.',
          stats: [
            { label: 'Total Recordable Incident Rate (TRIR)' },
            { label: 'Lost Time Injuries (LTI)' },
            { label: 'Annual Employee Safety Training', suffix: '+ hours' }
          ]
        },
        governance: {
          title: 'Governance & Ethics in Action',
          subtitle: 'Explore the core tenets of our governance framework, built on transparency, integrity, and accountability.',
          mechanisms: 'Key Mechanisms',
          tabs: [
            { title: 'Board Oversight', content: 'Our board\'s dedicated ESG committee provides rigorous oversight, ensuring our strategies align with long-term sustainability goals and shareholder interests.', points: ['Independent ESG Committee', 'Quarterly Performance Reviews', 'Executive Compensation Tied to ESG Targets'] },
            { title: 'Data Privacy & Security', content: 'We uphold the strictest standards of data privacy, employing end-to-end encryption and robust cybersecurity protocols to protect client operational data.', points: ['GDPR & CCPA Compliant', 'End-to-End Encryption', 'Regular Third-Party Security Audits'] },
            { title: 'Business Ethics', content: 'A zero-tolerance policy on corruption and bribery is foundational to our operations. All employees undergo mandatory annual ethics training.', points: ['Zero-Tolerance Anti-Corruption Policy', 'Transparent Whistleblower Program', 'Annual Mandatory Ethics Training'] },
            { title: 'Stakeholder Engagement', content: 'We actively engage with investors, clients, employees, and community members to ensure our ESG strategy is responsive and relevant.', points: ['Annual Stakeholder Forums', 'Materiality Assessments', 'Transparent ESG Reporting'] }
          ]
        },
        globalGoals: {
          title: 'UN Sustainable Development Goals',
          goals: [
            { title: 'Climate Action', desc: 'Directly mitigates climate change by capturing potent greenhouse gases like methane.' },
            { title: 'Sustainable Cities', desc: 'Reduces air pollution (smog), leading to healthier and more sustainable communities.' },
            { title: 'Responsible Production', desc: 'Prevents product waste by converting vapor back to a usable state, promoting circular economy.' },
            { title: 'Affordable & Clean Energy', desc: 'Recovered hydrocarbons are a ready-to-use energy source, reducing the need for new extraction.' }
          ]
        },
        energyTrilemma: {
          title: 'Addressing the Energy Trilemma',
          subtitle: 'VRU technology provides a balanced solution, making significant improvements across the three core pillars of the global energy challenge.',
          clickLearn: 'Click an icon to learn more',
          pillars: {
            security: { title: 'Energy Security', desc: 'By recovering valuable fuel that would otherwise be lost as vapor, our VRU technology enhances domestic energy supply and reduces dependence on new extraction.' },
            sustainability: { title: 'Environmental Sustainability', desc: 'Capturing potent greenhouse gases and VOCs directly combats climate change and significantly improves local air quality.' },
            equity: { title: 'Energy Equity', desc: 'The recovered hydrocarbons provide a ready-to-use, more affordable energy source, helping to lower operational costs and increase accessibility.' }
          }
        },
        audit: {
          verified: 'AUDIT_TRAIL: VERIFIED'
        }
      },
      about: {
        title: 'Building for the Long Tail of Energy.',
        tagline: 'MasarZero is building vapor recovery infrastructure with a tighter link between engineering, deployment proof, factory capability, and financial outcome. We are focused on systems that work in real operating environments, not just in concept decks.',
        trustTitle: 'Why customers trust us',
        trustDescription: 'Trust comes from seeing the chain hold together: factory readiness, real deployments, third-party testing, and a team that can support commissioning through operations.',
        trustPoints: [
          'SGS testing pathways and documented performance validation',
          'Control Union engagement for audit and certification workflows',
          'ATEX-oriented engineering direction for hazardous-area readiness',
          'Factory-backed fabrication, commissioning, and support teams'
        ],
        milestones: {
          title: 'Concrete milestones',
          items: [
            'Prototype-to-field transition completed across live vapor recovery environments',
            'Factory output expanded with repeatable production-ready machine layouts',
            'Third-party testing and documentation tracks established for certification readiness',
            'Cross-border deployment activity underway across retail and industrial programs'
          ]
        },
        journey: {
          title: 'Our Journey of Innovation',
          subtitle: 'From a bold idea to a global leader, our history is defined by relentless innovation and an unwavering commitment to our mission.',
          events: [
            { date: '2018', title: 'Foundation', description: 'MasarZero is founded by a team of veteran energy sector engineers with a mission to eliminate industrial emissions through intelligent technology.' },
            { date: '2020', title: 'First Patent Granted', description: 'We were granted our first patent for the revolutionary cryo-condensation vapor recovery process, establishing our unique position in the market.' },
            { date: '2021', title: 'First Commercial Deployment', description: 'Successful installation of the first MZ-9000 unit at a major Houston terminal, achieving a 99.8% recovery rate in a live environment.' },
            { date: '2023', title: 'Global Expansion', description: 'Expanded operations into Europe and Asia, establishing key partnerships in Rotterdam and Singapore to serve our international clients.' },
            { date: '2024', title: 'AI Integration', description: 'Launched the AI-powered SCADA platform, introducing predictive maintenance and real-time optimization to maximize efficiency and uptime for all clients.' }
          ]
        },
        testing: {
          title: 'Testing and assurance',
          desc: 'Our commercial story is being reinforced through validation partners, documented testing, and compliance-ready reporting pathways instead of loose marketing claims.'
        },
        team: {
          title: 'The Architects',
          subtitle: 'Visionaries building the infrastructure of tomorrow.',
          members: [
            { name: 'Dr. A. Latif Alkhaja', role: 'Chairman and CEO', bio: '20+ years in global energy infrastructure.' },
            { name: 'Mr. Yalçın Aliyev', role: 'Senior Partner', bio: 'Decades of experience connected to CIS and MENA OMCs.' },
            { name: 'Yang Qishan', role: 'Chief Technology Officer', bio: 'Lead architect of the MZ-1 and MZ-9000.' },
            { name: 'Sultan Alkhaja', role: 'Head of Operations', bio: 'Expert in large-scale deployment logistics.' },
            { name: 'Hari Krishna', role: 'Lead Engineer', icon: 'Code', bio: 'Specialist in SCADA and AI integration.' },
            { name: 'Larry Nash', role: 'Chief Operating Officer', icon: 'Users', bio: 'Driving global operational excellence and scaling business logistics.' }
          ]
        },
        dna: {
          title: 'Corporate DNA',
          subtitle: 'The code that governs our operations.',
          values: [
            { title: 'Audacity', text: 'We tackle the hardest problems others ignore.' },
            { title: 'Precision', text: 'Exact engineering for measurable results.' },
            { title: 'Trust Through Proof', text: 'We back claims with deployments, testing, and documentation.' }
          ]
        },
        testimonials: [
          {
            quote: 'MasarZero feels less like a hardware vendor and more like an operating partner. They understand the site, the recovery economics, and the compliance conversation.',
            author: 'Terminal development partner'
          },
          {
            quote: 'The strongest signal for us was seeing factory capability, deployment intent, and testing discipline show up together instead of as separate promises.',
            author: 'Industrial infrastructure advisor'
          }
        ]
      },
      contact: {
        badge: 'Get In Touch',
        title: 'Contact Information',
        subtitle: 'Connect with our global team. Whether you\'re ready to deploy or just have a question, we\'re here to help.',
        nexus: 'Global Nexus',
        channels: 'Direct Channels',
        emergency: '24/7 Emergency Support'
      },
      global: {
        stats: {
          activeSites: 'Active Sites',
          marketsOnline: 'Markets Online',
          globalRevenue: 'Global Revenue',
          annualRunRate: 'Annual Run Rate',
          carbonOffset: 'Carbon Offset',
          metricTonsYear: 'Metric Tons / Year'
        },
        feed: {
          filterSignal: 'Filter signal...',
          scanningSector: 'Scanning Sector 7...'
        },
        modal: {
          siteLocated: 'Site Located',
          latitude: 'LATITUDE',
          longitude: 'LONGITUDE',
          annualRevenue: 'Annual Revenue',
          co2Reduction: 'CO₂ Reduction',
          hardwareModel: 'Hardware Model',
          operator: 'Operator',
          unitType: 'Unit Type',
          deploymentNetwork: 'Deployment Network',
          sites: 'Sites',
          siteKrEn: 'Site (KR/EN)',
          locationAddress: 'Location Address',
          date: 'Date',
          uptime: 'UPTIME',
          efficiency: 'EFFICIENCY',
          pressure: 'PRESSURE',
          accessTelemetry: 'Access Telemetry'
        }
      },
      products: {
        badge: 'Product Portfolio',
        title: 'Distinct systems for distinct operating environments',
        description: 'We now separate the portfolio more clearly: MZ-1 for retail vapor recovery, MZ-9000 for larger tank and terminal environments, plus adjacent solution families for custom industrial programs.',
        flagship: [
          {
            name: 'MZ-1',
            label: 'Retail Vapor Recovery',
            description: 'Designed for forecourts and service stations where odor control, emissions capture, and commercial recovery need to work in a compact daily-use environment.',
            metrics: ['Retail-focused footprint', 'Improves site odor conditions', 'Continuous recovery and monitoring'],
            cta: 'Explore MZ-1 technology'
          },
          {
            name: 'MZ-9000',
            label: 'Terminal / Tank Farm Recovery',
            description: 'Built for larger storage and transfer environments where throughput, hazardous-area readiness, and broader infrastructure integration matter most.',
            metrics: ['Higher-throughput environments', 'Terminal-scale architecture', 'Designed for integration with broader site controls'],
            cta: 'Talk to engineering'
          },
          {
            name: 'Power Filter',
            label: 'Power Quality',
            description: 'Specialized power management tool designed to ensure electrical stability and protect sensitive electronics across demanding field installations.',
            metrics: ['Heavy-duty continuous rating', 'Fail-safe integration', 'Real-time telemetry'],
            cta: 'Discuss technical specs'
          },
          {
            name: 'W2E',
            label: 'Waste-to-Energy',
            description: 'Transforming recovered volatile organics into usable power for continuous facility operations.',
            metrics: ['Self-powering architecture', 'Maximum resource utilization', 'Zero-emission output'],
            cta: 'Learn more'
          }
        ],
        cta: {
          mz1: 'Explore MZ1 technology',
          terminal: 'Talk to engineering',
          power: 'Discuss technical specs',
          learnMore: 'Learn more'
        },
        solutions: {
          title: 'Adjacent Solution Families',
          custom: { title: 'Custom Engineering', subtitle: 'MZ Custom', description: 'Bespoke systems for unusual flow, footprint, climate, or utility constraints.' },
          fuel: { title: 'Fuel Treatment', subtitle: 'MZ-MFT', description: 'Conditioning and quality-improvement workflows for recovered or blended fuel streams.' },
          heat: { title: 'Heat Capture', subtitle: 'MZ-HC', description: 'Recovery concepts for thermal waste streams and industrial efficiency improvements.' },
          efficiency: { title: 'Efficiency Services', subtitle: 'MZ-ESCO', description: 'Performance-led delivery models for energy and process optimization projects.' }
        }
      },
      technology: {
        badge: 'Technology Overview',
        title: 'A 50,000-foot view of how the platform works',
        description: 'Before dropping into component-level detail, the system can be understood in three layers: vapor capture, thermal recovery, and intelligent control. Select the product you want to explore next.',
        cards: {
          capture: { title: 'Capture', text: 'The MZ-1 intercepts displaced hydrocarbon vapors before they escape into the atmosphere.' },
          condense: { title: 'Condense', text: 'A controlled cooling and recovery process turns vapor back into useful liquid product.' },
          control: { title: 'Control', text: 'Sensors, logic, and telemetry keep the system stable while creating audit-ready operating data.' }
        },
        schematic: {
          mz1: 'Enter MZ-1 schematic',
          mz9000: 'View MZ-9000 overview',
          title: 'MZ-1 Schematic',
          description: 'Explore the MZ-1 component layout. Drag to rotate, scroll to zoom, and click components to inspect the system architecture in more detail.'
        }
      },
      financial: {
        badge: 'Financial Model',
        title: 'Make vapor recovery visible on the P&L',
        description: 'This page now carries the simple ROI estimator directly, so teams can see recovery upside, revenue share logic, and strategic value without jumping out to a separate calculator page.',
        cards: {
          capex: { title: 'Zero-CapEx structure', text: 'Preserve cash while still deploying recovery infrastructure.' },
          value: { title: 'Recovered product value', text: 'Turn displaced vapor into saleable inventory and recurring margin.' },
          risk: { title: 'Risk-aligned model', text: 'Performance and service incentives stay linked to uptime and recovery.' }
        },
        oldStandard: {
          title: 'The old standard',
          capex: { title: 'Heavy upfront capex', text: 'Large purchases hit budgets before recovery value is proven.' },
          payback: { title: 'Slow payback visibility', text: 'Teams struggle to connect emissions controls to direct financial upside.' },
          risk: { title: 'Owner carries performance risk', text: 'Downtime, support burden, and maintenance uncertainty sit with the site.' }
        },
        masarzeroModel: {
          title: 'The MasarZero model',
          capital: { title: 'Capital-light deployment', text: 'Clients preserve capital while still unlocking recovery upside.' },
          clarity: { title: 'Revenue-share clarity', text: 'Recovered product value becomes visible, explainable, and shareable.' },
          upside: { title: 'Secondary upside', text: 'Reduced emissions, compliance support, and carbon-market narratives.' }
        },
        estimator: {
          title: 'Simple ROI estimator',
          subtitle: 'A lightweight planning tool for revenue-share conversations. Adjust throughput, station count, and fuel price to see a directional profit estimate.',
          volume: 'Daily vapor volume (L)',
          stations: 'Station count',
          fuelPrice: 'Fuel price ($/L)',
          results: {
            title: 'Projected Output',
            dailyRecovered: 'Daily Recovered (L)',
            yearlyProfit: 'Client Annual Profit ($)',
            cumulative: 'Cumulative Profit Projection',
            modelOutput: 'Model output',
            recoveredLiters: 'Recovered liters / day',
            annualProfit: 'Client annual profit',
            fiveYear: '5-year cumulative',
            benchmark: 'Directional estimate based on a 0.15% recovery benchmark and a 20% client share.'
          }
        }
      },
      data: {
        badge: 'Validation Engine',
        title: 'Gasoline Quality & Recovery Metrics',
        description: 'Deep visibility into chemical integrity. We don\'t just recover vapor; we restore it to its specific liquid chain without compromising octane ratings or volatility standards.',
        lab: {
          title: 'Interactive Analysis Lab',
          description: 'Simulate the MasarZero verification process. Click "Analyze New Sample" to process different fuel grades from our global terminals and view detailed chemical breakdowns.',
          input: 'INPUT SAMPLE',
          source: 'Source',
          terminal: 'Terminal',
          analyze: 'Analyze New Sample',
          verified: 'VERIFIED OUTPUT',
          rotate: 'Rotate sample to begin analysis.',
          complete: 'Analysis complete. Results verified.',
          standards: {
            title: 'Chemical Verification',
            industry: 'Industry Standard',
            output: 'MasarZero Output',
            analysis: 'Analysis'
          }
        },
        comparison: {
          advanced: {
            badge: 'MasarZero VRU',
            title: 'Advanced System',
            subtitle: 'The pinnacle of vapor recovery technology.',
            energy: { title: '250x Return on Energy', desc: 'Generating 250 times the energy it consumes.' },
            performance: { title: '5x Better Than Competitors', desc: 'Outperforms the nearest competitor by a factor of five.' },
            recovery: { title: '99% Recovery Rate', desc: 'Capture virtually all valuable vapor, ensuring minimal waste.' }
          },
          conventional: {
            badge: 'Conventional VRU',
            title: 'Legacy Tech',
            subtitle: 'Traditional carbon bed and membrane systems.',
            energy: { title: '1:1 Energy Ratio', desc: 'High operational costs relative to recovery output.' },
            maintenance: { title: 'Frequent Media Changes', desc: 'Recurrent downtime for carbon bed replacement.' },
            efficiency: { title: '80-85% Recovery', desc: 'Significant fugitive emissions remain uncaptured.' }
          }
        },
        validation: {
          title: 'Independent Recovery Validation',
          cu: 'Control Union Recovery',
          sgs: 'SGS Recovery'
        },
        reports: {
          title: 'Gasoline Testing Reports',
          jordan: 'Jordan Gasoline Testing Data',
          korea: 'Korea Gasoline Testing Data',
          liveTelemetry: 'Live Telemetry'
        }
      },
      scada: {
        badge: 'Introducing PinnacleOS',
        title: 'The operating layer behind the equipment',
        description: 'Machine telemetry, alarm states, service context, and commercial reporting in one operating layer.',
        whatItDoesTitle: 'What the platform actually does',
        whatItDoesDesc1: 'PinnacleOS connects machine telemetry, alarm states, service context, and commercial reporting into one operating layer. It gives teams a single place to understand how the recovery system is performing and what needs attention.',
        whatItDoesDesc2: 'Instead of treating SCADA as a visual wrapper, the product is framed here as an operational backbone: machine visibility, exception handling, remote support coordination, and reporting discipline.',
        labels: {
          alerts: 'Alerts',
          telemetry: 'Telemetry',
          reports: 'Reports',
          service: 'Service',
        },
        values: {
          alerts: 'Exception handling',
          telemetry: 'Live + historical context',
          reports: 'Operational and compliance outputs',
          service: 'Remote triage and guided response',
        },
        productViewsTitle: 'Product views',
        productViewsDesc: 'Real screenshots are more useful here than a simulated interactive panel, so this section now shows the platform in clearer, role-based views.',
        animation: {
          tagline: 'The Operating System for Industrial Sustainability.',
          processing: 'Processing',
          flowRate: 'Flow Rate',
          pressure: 'Pressure',
          recoveryTrend: 'Recovery Efficiency Trend',
          systemAlerts: 'System Alerts',
          filterMaintenance: 'Filter Maintenance',
          deltaP: 'Delta P > 2.5 PSI',
          remoteOps: 'Remote Ops',
          telemetry: 'Real-Time Telemetry',
          telemetryDesc: 'Instant visibility into flow rates and pressures.',
          predictiveAlerts: 'Predictive Alerts',
          predictiveDesc: 'AI diagnostics detect anomalies before failures occur.',
          remoteCommand: 'Remote Command',
          remoteCommandDesc: 'Secure, encrypted control from anywhere in the world.',
        },
        features: {
          logic: { title: 'Control logic plus telemetry', text: 'PinnacleOS connects real machine states, alarms, and operating logic.' },
          remote: { title: 'Remote visibility', text: 'Operators can see machine behavior, trends, and historical context.' },
          audit: { title: 'Audit-ready reporting', text: 'Operational history and exception handling support compliance and service.' },
          service: { title: 'Service support workflows', text: 'Structured for remote triage, guided field response, and resolution.' }
        },
        screenshots: [
          { title: 'Operations Overview', text: 'Core operational visibility into station and fleet performance.' },
          { title: 'Alerts & Issue Handling', text: 'Alarm visibility, acknowledgement workflow, and escalation context.' },
          { title: 'Commercial Insights', text: 'Recovery value, profit signals, and financial summary tied to operations.' },
          { title: 'Remote Control', text: 'Supervised remote operations and command workflows for qualified teams.' },
        ],
      },
      cycle: {
        badge: 'Advanced Flow Dynamics',
        title: 'The Cycle System',
        description: 'MasarZero achieves exponential capacity without exponential hardware by transforming your existing infrastructure into a dynamic pressure buffer.',
        diagram: {
          groundLevel: 'Ground Level',
          vaporSpace: 'VAPOR SPACE',
          liquidFuel: 'LIQUID FUEL',
          buffer: 'BUFFER',
          vruCore: 'VRU CORE',
          processing: 'PROCESSING',
          vaporIntake: 'VAPOR INTAKE',
          excessReturn: 'EXCESS RETURN',
          liquidRecovery: 'LIQUID RECOVERY',
        },
        features: {
          battery: { title: 'Vapor Battery', text: 'The system utilizes the Underground Storage Tank (UST) vapor space as a buffer, storing excess pressure during peak unload times rather than venting it.' },
          time: { title: 'Time Dilation', text: 'We spread the load of a 15-minute truck drop over 60 minutes. This allows a smaller, more energy-efficient machine to handle industrial-scale surges.' },
          waste: { title: 'Zero Waste', text: 'By keeping the system closed-loop even during peak pressure, we ensure zero fugitive emissions escape to the atmosphere, maximizing recovery yield.' }
        }
      },
      newsroom: {
        badge: 'Media Uplink',
        title: 'News & Logs',
        featured: 'Featured Story',
        searchPlaceholder: 'Search logs...',
        readFull: 'Read Full Report',
        accessLog: 'Access Log',
        mediaUplink: 'Media Uplink',
        pressKit: 'SECURE ACCESS // PRESS KIT',
        pressContact: 'Press Contact',
        articles: [
          {
            id: 1,
            category: 'Event',
            title: 'Global Energy Transition Congress: MasarZero Showcases High-Efficiency VRU',
            date: 'September 12, 2024',
            excerpt: 'At the Global Energy Transition Congress, MasarZero demonstrated its next-generation vapor recovery systems, highlighting the tighter link between engineering precision and carbon mitigation.',
            featured: true,
          },
          {
            id: 2,
            category: 'Event',
            title: 'MasarZero at COP29: Advancing Global Decarbonization Targets',
            date: 'November 15, 2024',
            excerpt: 'Participating in COP29, our leadership team engaged with global energy ministers to discuss the role of rapid vapor recovery deployment in meeting immediate methane reduction goals.',
          },
          {
            id: 3,
            category: 'Partnership',
            title: 'Kobia SMB Development Agency Engagement in Azerbaijan',
            date: 'October 05, 2024',
            excerpt: 'MasarZero has secured a strategic engagement with the Kobia SMB Development Agency to foster localized infrastructure growth and industrial technology exchange.',
          },
          {
            id: 4,
            category: 'Deployment',
            title: 'Flagship Pilot Project Launched in Riyadh',
            date: 'August 22, 2024',
            excerpt: 'The pilot project in Riyadh has successfully completed its first operational phase, validating performance in extreme high-temperature environments.',
          },
          {
            id: 5,
            category: 'Technology',
            title: 'Jordan SGS Validation: System Efficiency Exceeds 99%',
            date: 'July 18, 2024',
            excerpt: 'Third-party testing conducted by SGS in Jordan has officially confirmed our recovery systems achieve over 99% efficiency under varying site conditions.',
          },
          {
            id: 6,
            category: 'Partnership',
            title: 'Strategic MOUs Signed for National Rollout in Pakistan',
            date: 'June 30, 2024',
            excerpt: 'Multiple Memorandums of Understanding have been signed with key energy distributors in Pakistan to initiate national vapor recovery upgrades.',
          }
        ]
      },
      investor: {
        badge: 'Investor Relations',
        title: 'Investor Terminal',
        updated: 'Last Updated',
        contact: 'Contact IR',
        prospectus: '2024 Prospectus',
        thesis: 'Investment Thesis',
        catalysts: 'Upcoming Catalysts',
        dataRoom: {
          title: 'Data Room',
          docName: 'Document Name',
          type: 'Type',
          date: 'Date',
          action: 'Action'
        },
        metrics: {
          revenue: 'Revenue (TTM)',
          margin: 'Gross Margin',
          deployments: 'Deployments',
          retention: 'Retention Rate'
        }
      },
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
          { title: 'Global Logistics', subtitle: 'Supply Chain Excellence' }
        ]
      },
      roi: {
        badge: 'Precision Modeling',
        title: 'ROI Engine',
        description: 'Configure operational parameters to model exact financial outcomes. Switch between a quick estimate and a comprehensive financial analysis.',
        switcher: {
          quick: 'Quick Estimate',
          deep: 'Deep Dive Model'
        },
        openCalc: 'Open Dedicated Calculator'
      },
      digitalTwin: {
        badge: 'System Initialized',
        title: 'Digital Twin',
        description: 'Select a facility environment to initialize the MasarZero VRU simulation kernel.',
        initialize: 'Initialize Simulation',
        retail: {
          title: 'Retail Station',
          subtitle: 'Urban Environment',
          description: 'Simulate high-frequency refueling cycles and vapor displacement in a standard underground tank configuration.'
        },
        terminal: {
          title: 'Storage Terminal',
          subtitle: 'Industrial Hub',
          description: 'Model large-scale vapor recovery efficiency for bulk liquid storage farms and distribution terminals.'
        }
      },
      library: {
        badge: 'Digital Archive',
        title: 'Technical Library',
        description: 'The library now groups materials more clearly, shows document thumbnails, and exposes simple next actions for review, download, or requesting the full file package.',
        categories: {
          all: 'All',
          spec: 'Spec Sheet',
          whitepaper: 'Whitepaper',
          caseStudy: 'Case Study',
          guide: 'Guide'
        },
        search: 'Search documents...',
        actions: {
          view: 'View PDF',
          download: 'Download',
          request: 'Request Full Package'
        },
        items: {
          specs: { title: 'Spec sheets', text: 'Dimensional, utility, and product fit information.' },
          commercial: { title: 'Commercial papers', text: 'ROI, deployment economics, and value capture narratives.' },
          field: { title: 'Field guides', text: 'Install, commissioning, and service-oriented documentation.' }
        }
      },
      support: {
        badge: 'Operations Hub',
        title: 'Support & Maintenance',
        description: 'Comprehensive technical support, troubleshooting guides, and maintenance schedules to ensure your MasarZero systems keep performing at peak efficiency.',
        tabs: {
          troubleshooting: 'Troubleshooting',
          maintenance: 'Maintenance Schedule',
          contact: 'Contact Support'
        },
        contact: {
          title: 'Direct Support Channels',
          subtitle: 'Our technical teams are available for immediate coordination on critical system issues or routine maintenance planning.',
          hotline: 'Global Hotline',
          email: 'Technical Email',
          office: 'Regional Hub'
        }
      },
      knowledgeBase: {
        badge: 'Integrated Technical Manual v2.4',
        title: 'Knowledge Nexus',
        description: 'Official technical documentation, operational procedures, and maintenance protocols for MasarZero systems.',
        searchPlaceholder: 'Search manual (e.g., \'Compressor\', \'Safety\')...',
        topicsFound: 'Topics Found',
        searchResults: 'Search Results across all categories:',
        noResults: 'No results found for',
        tryAnother: 'Try a different search term or browse by category.',
        refId: 'Reference ID:',
        categories: {
          overview: 'System Overview',
          safety: 'Safety Protocols',
          installation: 'Installation & Logistics',
          maintenance: 'Maintenance',
          troubleshooting: 'Troubleshooting',
        },
      },
      installationGuide: {
        badge: 'Field Deployment',
        title: 'Installation Guide',
        spatialView: 'SPATIAL VIEW',
        schematicView: 'SCHEMATIC VIEW',
        actionItems: 'Action Items',
        back: 'Back',
        nextStep: 'Next Step',
        finish: 'Finish',
      },
      maintenanceGuide: {
        badge: 'Technical Documentation v2.4',
        title: 'Maintenance Manual',
        description: 'Comprehensive repair guides, wiring diagrams, and troubleshooting protocols for certified MasarZero technicians.',
        downloadSheet: 'Download sheet',
        module: 'Module:',
        sheets: {
          daily: 'Daily operator check sheet',
          weekly: 'Weekly inspection checklist',
          quarterly: 'Quarterly service worksheet',
        },
        intervals: {
          daily: 'Daily',
          weekly: 'Weekly',
          quarterly: 'Quarterly',
        },
        severity: {
          critical: 'Critical',
          high: 'High',
          planned: 'Planned',
        },
      },
      vruTesting: {
        badge: 'Acoustic Lab',
        title: 'VRU Validation Protocol',
        description: 'Interactive testing environment for vapor recovery unit acoustic and performance validation.',
      },
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
      },
      sidebar: {
        liveTrends: 'Live Trends',
        pumpStatus: 'Live Pump Status',
        speed: 'Speed',
        pressure: 'Pressure',
        systemStatus: 'System Status',
        specSheet: 'Spec Sheet',
        nextPart: 'Next Part',
        flowRate: 'Flow Rate'
      },
      legal: {
        badge: 'Compliance Mainframe',
        title: 'Legal Center',
        description: 'Transparency and security are the bedrock of our operations. Access our regulatory frameworks, terms of use, and certification portfolio.',
        wallTitle: 'Wall of Trust',
        wallDesc: 'We adhere to the highest global standards for quality, safety, and environmental management.',
        quickSummary: 'Quick Summary',
        collapseDetails: 'Collapse Details',
        close: 'Close',
        active: 'Active',
        pending: 'Pending',
        sections: {
          terms: { title: 'Terms of Service', summary: 'Governs your access to our proprietary technology and services.', buttonText: 'Read Full Terms' },
          privacy: { title: 'Privacy Policy', summary: 'How we collect, encrypt, and safeguard operational data.', buttonText: 'Read Full Policy' },
          compliance: { title: 'Regulatory Compliance', summary: 'Adherence to EPA, CARB, ATEX, and global environmental standards.', buttonText: 'View Standards' },
          cookies: { title: 'Cookie Policy', summary: 'Transparent usage of essential and analytical cookies.', buttonText: 'Manage Preferences' },
        },
      },
    },
    footer: {
      counterTitle: 'Total liters of fuel recovered for clients',
      tagline: 'Intelligent Recovery. Tangible Returns.',
      categories: {
        solutions: 'Solutions',
        impact: 'Impact',
        resources: 'Resources',
        company: 'Company',
      },
      dataPerformance: 'Data & Performance',
      copyright: 'MasarZero Technologies. All Rights Reserved.',
    },
  },
  'zh-CN': {
    common: {
      processing: '处理中...',
      startCalculation: '开始计算',
      viewCaseStudies: '查看案例研究',
      live: '实时',
    },
    header: {
      nav: {
        home: '首页',
        solutions: '解决方案',
        products: '产品',
        technology: '技术',
        cycleSystem: '循环系统',
        digitalTwin: '数字孪生',
        scadaPlatform: 'SCADA 平台',
        impact: '成效',
        environmental: '环境影响力',
        financial: '财务模型',
        global: '全球布局',
        gasolineQuality: '数据与绩效',
        resources: '资源中心',
        gallery: '视觉之旅',
        knowledgeBase: '知识库',
        technicalLibrary: '技术资料库',
        installationGuide: '安装指南',
        maintenanceManual: '维护手册',
        maintenanceProgram: '维护计划',
        validationProtocol: '验证方案',
        equipmentAcceptanceTest: '设备验收测试',
        supportService: '支持与服务',
        company: '公司',
        esgHub: 'ESG 中心',
        aboutUs: '关于我们',
        newsroom: '新闻中心',
        legalCompliance: '法律与合规',
        contactUs: '联系我们',
        clientPipeline: '客户管道',
        investorRelations: '投资者关系',
      },
      actions: {
        calculator: '计算器',
        clientPlatform: '客户平台',
        languageLabel: '选择语言',
        toggleMenu: '切换菜单',
      },
    },
    home: {
      hero: {
        line1: '智能回收。',
        line2: '切实回报。',
        description:
          'MasarZero 专注于先进油气回收装置，通过 AI 驱动工程将排放转化为收入，同时守护环境。',
        cta: '了解我们的技术',
      },
      socialProof: {
        trustedBy: '受到全球能源领军企业信赖',
        countries: '已部署国家',
        installations: '在运行装置',
        uptime: '运行可用率',
      },
      howItWorks: {
        title: '从蒸汽到价值',
        subtitle: '回收流程',
        desktopSubtitle: '滚动查看回收流程',
        systemKey: '系统图例',
        vaporFlow: '蒸汽流动',
        recoveredFuel: '回收燃油',
        incomingFuel: '输入燃油',
        steps: {
          truckDispenses: {
            title: '油罐车卸油',
            description: '油罐车到达后连接主地下储罐，开始补充燃油。',
          },
          vaporDisplacement: {
            title: '蒸汽置换',
            description: '液态燃油进入储罐时会挤出汽油蒸汽，并将其输送到 MasarZero VRU。',
          },
          condensation: {
            title: '冷凝',
            description: 'VRU 的专利系统对蒸汽进行压缩和冷凝，将其重新转化为纯净液态汽油。',
          },
          efficientRecovery: {
            title: '高效回收',
            description: '我们的技术可实现 99% 的回收效率，最大程度减少浪费并提升价值。',
          },
          valueReturned: {
            title: '价值回流',
            description: '回收后的可销售燃油被送回独立储罐，形成新的即时收入来源。',
          },
        },
      },
      features: {
        title: '为',
        highlight: '领先而设计',
        description: '我们的专有架构将低温物理与神经网络逻辑结合在一起。',
        idle: '系统空闲 // 悬停节点',
        items: {
          cryo: {
            title: '低温捕集',
            description: '专利亚零度冷凝技术，实现 99.9% 回收效率。',
          },
          ai: {
            title: '自适应智能',
            description: '自学习算法实时优化压力与温度。',
          },
          modular: {
            title: '模块化架构',
            description: '即插即用的可扩展设计，适用于各种规模终端。',
          },
          iot: {
            title: '物联网连接',
            description: '与 PinnacleOS 原生集成，实现远程指挥与控制。',
          },
          safety: {
            title: '防爆设计',
            description: '通过 Zone 1 危险环境认证，并配备本安型安全屏障。',
          },
          health: {
            title: '预测健康',
            description: '自动诊断可提前发现异常，避免停机。',
          },
        },
      },
      productShowcase: {
        title: '工业级精度',
        description: '在严苛环境下依然保持实验室级性能表现。',
        badge: '现场部署',
        mainTitle: 'MZ-1',
        mainDescription: '全自动油气回收系统，专为高强度终端环境中的稳定运行而设计。',
        intelligentControlTitle: '智能控制',
        intelligentControlDescription: 'PinnacleOS 仪表盘集成',
        cryoCoreTitle: '专利 Cryo-Core',
        cryoCoreDescription: '先进冷凝技术',
      },
      sustainability: {
        title: '可持续发展承诺',
        description:
          '我们的技术不仅带来经济回报，更是在为行业和地球创造可持续未来。我们帮助客户实现切实收益，同时建立可持续的长期价值。',
      },
      deploymentProof: {
        badge: '部署证明',
        title: '实地验证，而非纸上谈兵。',
        description: 'MasarZero 系统已在存在实际现场限制、可衡量回收价值和明显改善运行条件的零售及工业环境中部署。',
        explore: '探索部署情况',
        request: '申请现场评估',
        blocks: {
          saudi: {
            title: '沙特零售部署',
            location: '阿布哈，沙特阿拉伯',
            metrics: ['改善异味状况', '实地运行中的燃料回收', '支持合规报告'],
            summary: '专注于蒸汽捕集、更清洁的现场条件和可靠日常运营的现场部署项目。'
          },
          korea: {
            title: '韩国双机安装',
            location: '韩国',
            metrics: ['双机架构', '系统可靠性保证', '可扩展部署模式'],
            summary: '专为更大数据吞吐量和可重复的终端规模扩展而设计的双机部署模式。'
          }
        }
      }
    },
    pages: {
      environmental: {
        title: '环境影响',
        subtitle: '我们对更清洁世界的承诺。',
        hero: {
          badge: '影响分析',
          title: '将排放转化为价值',
          description: '我们的 VRU 系统防止有害 VOCs 进入大气，创造更清洁的环境并回收宝贵资源。',
        },
        metrics: {
          co2: { title: '二氧化碳减排', description: '每年防止温室气体进入大气。' },
          fuel: { title: '燃油回收', description: '将废弃蒸汽转化为有价值的、可销售的液态燃料。' },
          trees: { title: '等效植树', description: '碳封存量相当于种植数百万棵树。' },
          water: { title: '节约用水', description: '通过高效闭环冷却节约水资源。' },
          air: { title: '更清新的空气', description: '减少挥发性有机化合物 (VOCs) 和污染物。' },
          compliance: { title: '合规性', description: '始终超越全球严苛的环境法规。' }
        },
        chart: {
          title: '性能相关性',
          subtitle: '实时分析 // 节点：MZ-Alpha',
          liveFeed: '实时反馈',
          revenue: '收入增长',
          emissions: '排放下降',
          timeframe: '时间跨度',
          netProfit: '净利润'
        },
        scrolling: '向下滚动分析',
        features: {
          carbonCredits: '碳信用额',
          efficiencyRating: '效率等级',
          verified: '已验证'
        },
        beforeAfter: {
          title: '运行前后对比',
          before: { label: '前', text: '开放式蒸汽损失，转运活动周围气味较重，无组织排放可见度低，现场可用的财务信号较少。' },
          after: { label: '后', text: '捕获蒸汽，改善操作员和附近客户的气味环境，更好的合规姿态，回收产品带来的收入价值更清晰。' }
        },
        odorValue: {
          title: '为什么气味改善很重要',
          description: '环境性能不仅是碳的故事。更好的蒸汽捕获可以通过减少加油和转运操作周围持久的碳氢化合物气味，切实改善现场的日常感官体验。',
          points: [
            '提高客户和操作员对现场清洁度的认知。',
            '支持活跃加油环境中的职场舒适度。',
            '强化了除合规之外的回收实际价值案例。'
          ]
        },
        shield: {
          title: '地球的盾牌',
          tagline: 'VRU 结合了环境保护、资源节约和安全性提升。',
          pollution: { title: '减少空气污染', desc: '在进入大气前过滤超过 95% 的挥发性有机化合物 (VOC) 和其他有害蒸汽。' },
          resources: { title: '节约资源', desc: '回收有价值的碳氢化合物蒸汽并将其转换回可用的液体产品，防止资源浪费。' },
          ozone: { title: '防止臭氧形成', desc: '通过捕获 VOC，VRU 有助于防止地面臭氧（雾霾）的形成，这是空气污染的主要成分。' },
          safety: { title: '提高安全性', desc: '通过最大限度地减少工业现场的可燃蒸汽浓度，降低火灾和爆炸风险。' }
        },
        atmosphere: {
          smog: { title: '抑制雾霾形成 (N₂O₄)', desc: 'VRU 捕获 VOC 和 NOx。这些化合物不仅形成雾霾，还作为温室气体在大气中捕获热量。防止其释放是清洁空气和稳定气候的关键。' },
          protection: { title: '保护我们的大气层', desc: '通过捕获挥发性有机化合物 (VOC)，VRU 减少了地面臭氧（雾霾）的形成并保护了至关重要的平流层臭氧层。' }
        }
      },
      esg: {
        title: '可持续性引擎',
        subtitle: '我们设计的是结果，而不仅仅是技术。每一台部署的 MasarZero 设备都充当工业领域的再生肺，将合规性转化为竞争优势。',
        tabs: {
          environmental: '环境',
          social: '社会',
          governance: '治理'
        },
        env: {
          title: '全球影响',
          subtitle: '实时减碳指标',
          dataStream: '数据流：在线',
          carbonCredits: {
            title: '碳信用额',
            desc: '我们将碳信用额视为衡量减排基础之上的商业化层，而不是运营证据的替代品。',
            points: [
              '与运营数据挂钩的实测减排路径',
              '注册就绪和核实工作流规划',
              '与回收燃料经济效益并行的额外收益'
            ]
          },
          lending: {
            title: '可持续发展挂钩贷款',
            desc: '该运营模式还通过将部署、排放指标、运行时间和报告纪律与面向贷方的 KPI 框架联系起来，支持 SLL 对话。',
            points: [
              '由 KPI 支持的报告节奏',
              '融资叙事的运营证据',
              '适用于贷方、投资者和基础设施合作伙伴'
            ]
          },
          nextTab: '下一页：探索社会责任'
        },
        social: {
          title: '零伤害 culture',
          subtitle: '安全不仅仅是一项指标；它是我们的道德准则。我们设计首要保护人的系统。',
          nextTab: '下一页：查看治理框架'
        },
        gov: {
          title: '极端透明',
          subtitle: '信任建立在问责制之上。我们的治理框架提供清晰、可验证的操作见解，确保我们符合诚信的最高标准。',
          financeTitle: '金融一致性治理',
          financeDesc: '这里的治理不限于政策语言。它还通过保持数据、控制历史和问责轨迹的一致性，支持贷款人信心、碳市场信誉以及可持续发展挂钩贷款框架。',
          reportTitle: '2024 ESG 影响报告',
          reportDesc: '下载我们详细介绍方法论、完整审计轨迹和未来可持续性目标的综合年度报告。',
          download: '下载 PDF',
          nextTab: '返回环境篇'
        },
        impactDashboard: {
          title: '实时环境遥测',
          subtitle: '全球数据聚合',
          co2: { label: '二氧化碳减排量', sub: '年运行率' },
          fuel: { label: '燃油回收量', sub: '全球累计' },
          trees: { label: '等效植树量', sub: '碳封存匹配' },
          water: { label: '节约用水量', sub: '冷却效率' }
        },
        lifecycle: {
          title: '全生命周期可持续性',
          subtitle: '从原材料到报废，每个阶段都针对最小环境影响进行了优化。',
          stages: [
            { title: '道德采购', desc: '95% 的原材料来自通过认证的、具有完全可追溯性的可持续供应商。' },
            { title: '绿色制造', desc: '工厂由 100% 可再生能源提供动力，并配备闭环水系统。' },
            { title: '高效运行', desc: '产生的能量是消耗量的 250 倍。AI 驱动的优化可最大限度减少对电网的影响。' },
            { title: '循环经济', desc: '按重量计算，90% 以上可回收。设计易于拆解和再制造。' }
          ]
        },
        community: {
          title: '社区与创新',
          subtitle: '我们的责任不止于工厂。我们致力于建设更强大的社区，并为更美好的世界开拓技术。',
          areas: [
            { title: '社区伙伴关系', desc: '我们在当地社区投资 STEM 教育计划，激励下一代工程师和环境科学家。' },
            { title: '本地招聘与发展', desc: '我们的政策优先招聘和培养本地人才，确保我们的增长直接为当地经济活力做出贡献。' },
            { title: '为善创新', desc: 'MasarZero 创新实验室致力于开拓下一代解决方案，包括价格合理的碳捕集和水净化技术。' },
            { title: '员工志愿服务计划', desc: '我们为员工提供参与环境和社会事业志愿服务的带薪假期，扩大我们核心业务之外的积极影响。' }
          ]
        },
        safety: {
          title: '健康与安全承诺',
          subtitle: '员工、合作伙伴和社区的福祉是我们的首要任务。我们通过严密的培训和预防措施维护世界一流的安全文化。',
          stats: [
            { label: '总可记录事故率 (TRIR)' },
            { label: '损失工时伤亡 (LTI)' },
            { label: '年度员工安全培训', suffix: '+ 小时' }
          ]
        },
        governance: {
          title: '治理与道德在行动',
          subtitle: '探索我们以透明、诚信和问责为核心的治理框架基本原则。',
          mechanisms: '核心机制',
          tabs: [
            { title: '董事会监督', content: '董事会专门的 ESG 委员会提供严格监督，确保我们的战略与长期可持续发展目标及股东利益一致。', points: ['独立 ESG 委员会', '季度绩效评审', '高管薪酬与 ESG 目标挂钩'] },
            { title: '数据隐私与安全', content: '我们坚持最严格的数据隐私标准，采用端到端加密和稳健的网络安全协议来保护客户运营数据。', points: ['符合 GDPR 和 CCPA', '端到端加密', '定期的第三方安全审计'] },
            { title: '商业道德', content: '对腐败和贿赂的零容忍政策是我们运营的基石。所有员工每年都必须接受强制性的道德培训。', points: ['零容忍反腐败政策', '透明的举报人计划', '年度强制性道德培训'] },
            { title: '利益相关者参与', content: '我们积极与投资者、客户、员工和社区成员互动，确保我们的 ESG 战略具有响应性和相关性。', points: ['年度利益相关者论坛', '重要性评估', '透明的 ESG 报告'] }
          ]
        },
        globalGoals: {
          title: '联合国可持续发展目标',
          goals: [
            { title: '气候行动', desc: '通过捕获甲烷等强效温室气体，直接缓解气候变化。' },
            { title: '可持续城市', desc: '减少空气污染（雾霾），建设更健康、更可持续的社区。' },
            { title: '负责任生产', desc: '通过将蒸汽转化回可用状态来防止产品浪费，促进循环经济。' },
            { title: '经济适用的清洁能源', desc: '回收的碳氢化合物是即开即用的能源，减少了对新开采的需求。' }
          ]
        },
        energyTrilemma: {
          title: '应对能源三难困境',
          subtitle: 'VRU 技术提供了一个均衡的解决方案，在全球能源挑战的三大支柱上都有显著改进。',
          clickLearn: '点击图标了解更多',
          pillars: {
            security: { title: '能源安全', desc: '通过回收原本会以蒸汽形式损失的宝贵燃料，我们的 VRU 技术增强了国内能源供应，减少了对新开采的依赖。' },
            sustainability: { title: '环境可持续性', desc: '捕获强效温室气体和 VOC 直接应对气候变化，并显著改善局部空气质量。' },
            equity: { title: '能源公平', desc: '回收的碳氢化合物提供了一种现成的、更实惠的能源，有助于降低运营成本并提高能源可得性。' }
          }
        },
        audit: {
          verified: '审计追踪：已验证'
        }
      },
      about: {
        title: '为能源的长期发展而建设。',
        tagline: 'MasarZero 正在建设油气回收基础设施，将工程设计、部署证明、工厂能力和财务成果紧密结合。我们专注于在实际运行环境中有效的系统，而不仅仅是概念方案。',
        trustTitle: '为什么客户信任我们',
        trustDescription: '信任源于看到整个链条各环节紧密相扣：工厂准备就绪、实际部署、第三方测试以及能够提供从调试到运营全方位支持的团队。',
        trustPoints: [
          'SGS 测试路径及记录在案的性能验证',
          '与 Control Union 合作开展审计与认证工作流程',
          '针对危险区域准备就绪的 ATEX 导向工程方向',
          '工厂支持的制造、调试和支持团队'
        ],
        milestones: {
          title: '具体里程碑',
          items: [
            '已在多个现场油气回收环境中完成从原型到实地的过渡',
            '工厂产能扩大，拥有可重复的量产型机器布局',
            '建立了用于认证准备的第三方测试和文档轨道',
            '零售及工业项目已开始跨国部署活动'
          ]
        },
        journey: {
          title: '我们的创新之旅',
          subtitle: '从一个大胆的想法到全球领导者，我们的历史充满了坚持不懈的创新和对使命的坚定承诺。',
          events: [
            { date: '2018', title: '成立', description: 'MasarZero 由一群资深能源领域工程师创立，其使命是通过智能技术消除工业排放。' },
            { date: '2020', title: '获得首个专利', description: '我们获得了革命性的低温冷凝蒸汽回收过程的首个专利，确立了我们在市场上的独特地位。' },
            { date: '2021', title: '首次商业部署', description: '在休斯顿一个主要终端成功安装第一台 MZ-9000 单元，在实际环境中实现了 99.8% 的回收率。' },
            { date: '2023', title: '全球扩张', description: '将业务扩展到欧洲和亚洲，在鹿特丹和新加坡建立关键合作伙伴关系，为我们的国际客户服务。' },
            { date: '2024', title: 'AI 集成', description: '推出人工智能驱动的 SCADA 平台，引入预测性维护和实时优化，以最大化所有客户的效率和正常运行时间。' }
          ]
        },
        testing: {
          title: '测试与保证',
          desc: '我们的商业故事正通过验证合作伙伴、记录在案的测试以及符合合规要求的报告路径得到加强，而不是空泛的营销承诺。'
        },
        team: {
          title: '架构师们',
          subtitle: '构建明天基础设施的愿景家。',
          members: [
            { name: 'Dr. A. Latif Alkhaja', role: '董事长兼首席执行官', bio: '20 多年全球能源基础设施经验。' },
            { name: 'Mr. Yalçın Aliyev', role: '高级合伙人', bio: '数十年的 CIS 和 MENA 油气营销公司（OMC）合作经验。' },
            { name: 'Yang Qishan', role: '首席技术官', bio: 'MZ-1 和 MZ-9000 的首席架构师。' },
            { name: 'Sultan Alkhaja', role: '运营主管', bio: '大规模部署物流专家。' },
            { name: 'Hari Krishna', role: '首席工程师', bio: 'SCADA 和 AI 集成专家。' },
            { name: 'Larry Nash', role: '首席运营官', bio: '推动全球卓越运营和扩大业务物流。' }
          ]
        },
        dna: {
          title: '企业 DNA',
          subtitle: '管理我们业务的代码。',
          values: [
            { title: '胆识', text: '我们解决他人忽略的最难问题。' },
            { title: '精确', text: '针对可衡量结果的精密工程。' },
            { title: '以证立信', text: '我们通过部署、测试和文档支持我们的主张。' }
          ]
        },
        testimonials: [
          {
            quote: 'MasarZero 感觉不像是一个硬件供应商，更像是一个运营合作伙伴。他们了解现场、回收经济效益以及合规对话。',
            author: '终端开发合作伙伴'
          },
          {
            quote: '对我们来说，最强烈的信号是看到工厂能力、部署意图和测试纪律作为一个整体出现，而不是分开的承诺。',
            author: '工业基础设施顾问'
          }
        ]
      },
      contact: {
        offices: [
          { city: '加利福尼亚', country: '美国', type: '美国中心', address: '硅谷, CA' },
          { city: '迪拜', country: '阿联酋', type: '中东总部', address: 'DIFC, 迪拜' },
          { city: '新加坡', country: '新加坡', type: '亚太中心', address: '滨海湾, 新加坡' }
        ],
        departments: [
          { name: '一般咨询', email: 'hello@masarzero.com', icon: 'HelpCircle', desc: '一般问题和信息。' },
          { name: '技术支持', email: 'support@masarzero.com', icon: 'ShieldCheck', desc: '现有客户的 24/7 现场和远程支持。' },
          { name: '合作伙伴', email: 'partners@masarzero.com', icon: 'Users', desc: '探索商业合作机会。' }
        ]
      },
      global: {
        stats: {
          activeSites: '活跃站点',
          marketsOnline: '在线市场',
          globalRevenue: '全球收入',
          annualRunRate: '年度运行率',
          carbonOffset: '碳抵消',
          metricTonsYear: '公吨/年'
        },
        feed: {
          filterSignal: '过滤信号...',
          scanningSector: '扫描扇区 7...'
        },
        modal: {
          siteLocated: '站点定位',
          latitude: '纬度',
          longitude: '经度',
          annualRevenue: '年度收入',
          co2Reduction: '二氧化碳减排',
          hardwareModel: '硬件型号',
          operator: '运营商',
          unitType: '装置类型',
          deploymentNetwork: '部署网络',
          sites: '站点',
          siteKrEn: '站点 (KR/EN)',
          locationAddress: '位置地址',
          date: '日期',
          uptime: '正常运行时间',
          efficiency: '效率',
          pressure: '压力',
          accessTelemetry: '访问遥测数据'
        }
      },
      products: {
        badge: '产品组合',
        title: '针对不同运营环境的独特系统',
        description: '我们现在更清晰地划分了产品组合：用于零售油气回收的 MZ-1，用于大型储罐和终端环境的 MZ-9000，以及用于定制工业项目的相邻解决方案系列。',
        flagship: [
          {
            name: 'MZ-1',
            label: '零售油气回收',
            description: '专为加油站前场设计，在紧凑的日常使用环境中实现异味控制、排放捕集和商业回收。',
            metrics: ['零售导向布局', '改善现场异味状况', '持续回收与监测'],
            cta: '探索 MZ-1 技术'
          },
          {
            name: 'MZ-9000',
            label: '终端/罐区回收',
            description: '专为大型存储和转运环境构建，重点关注吞吐量、危险区域准备就绪以及更广泛的基础设施集成。',
            metrics: ['高吞吐量环境', '终端级架构', '设计用于与更广泛的现场控制集成'],
            cta: '联系工程团队'
          },
          {
            name: 'Power Filter',
            label: '电能质量',
            description: '专业的电源管理工具，旨在确保电气稳定性并保护严苛现场安装中的敏感电子设备。',
            metrics: ['重型连续额定值', '故障安全集成', '实时遥测'],
            cta: '讨论技术规格'
          },
          {
            name: 'W2E',
            label: '废物转能源',
            description: '将回收的挥发性有机物转化为用于持续设施运营的可用电力。',
            metrics: ['自供电架构', '最大资源利用', '零排放输出'],
            cta: '了解更多'
          }
        ],
        cta: {
          mz1: '探索 MZ1 技术',
          terminal: '联系工程团队',
          power: '讨论技术规格',
          learnMore: '了解更多'
        },
        solutions: {
          title: '相邻解决方案系列',
          custom: { title: '定制工程', subtitle: 'MZ Custom', description: '针对特殊流量、占地面积、气候或公用设施限制的定制系统。' },
          fuel: { title: '燃料处理', subtitle: 'MZ-MFT', description: '针对回收或调和燃料流的调理和质量改进工作流程。' },
          heat: { title: '热量捕集', subtitle: 'MZ-HC', description: '针对热废流的回收概念和工业效率改进。' },
          efficiency: { title: '效率服务', subtitle: 'MZ-ESCO', description: '针对能源和工艺优化项目的绩效导向交付模式。' }
        }
      },
      technology: {
        badge: '技术概览',
        title: '平台工作原理的全景视图',
        description: '在深入组件级细节之前，可以从三个层面理解该系统：蒸汽捕集、热回收和智能控制。选择您想要进一步探索的产品。',
        cards: {
          capture: { title: '捕集', text: 'MZ-1 在置换出的碳氢化合物蒸汽逃逸到大气中之前对其进行拦截。' },
          condense: { title: '冷凝', text: '受控的冷却和回收过程将蒸汽重新转化为有用的液态产品。' },
          control: { title: '控制', text: '传感器、逻辑和遥测在保持系统稳定的同时创建审计就绪的运行数据。' }
        },
        schematic: {
          mz1: '进入 MZ-1 示意图',
          mz9000: '查看 MZ-9000 概览',
          title: 'MZ-1 示意图',
          description: '探索 MZ-1 组件布局。拖动旋转，滚动缩放，点击组件以查看系统架构的更多细节。'
        }
      },
      contact: {
        badge: '联系我们',
        title: '联系方式',
        subtitle: '与我们的全球团队联系。无论您是准备好部署还是只是有疑问，我们都会随时为您提供帮助。',
        nexus: '全球网络',
        channels: '直接通道',
        emergency: '24/7 紧急支持',
        offices: [
          { city: '加利福尼亚', country: '美国', type: '美国中心', address: '硅谷, CA' },
          { city: '迪拜', country: '阿联酋', type: '中东总部', address: 'DIFC, 迪拜' },
          { city: '新加坡', country: '新加坡', type: '亚太中心', address: '滨海湾, 新加坡' }
        ],
        departments: [
          { name: '一般咨询', email: 'hello@masarzero.com', icon: 'HelpCircle', desc: '一般问题和信息。' },
          { name: '技术支持', email: 'support@masarzero.com', icon: 'ShieldCheck', desc: '现有客户的 24/7 现场和远程支持。' },
          { name: '合作伙伴', email: 'partners@masarzero.com', icon: 'Users', desc: '探索商业合作机会。' }
        ]
      },
      global: {
        stats: {
          activeSites: '活跃站点',
          marketsOnline: '在线市场',
          globalRevenue: '全球收入',
          annualRunRate: '年化运行率',
          carbonOffset: '碳抵消',
          metricTonsYear: '公吨 / 年'
        },
        feed: {
          filterSignal: '过滤信号...',
          scanningSector: '正在扫描扇区 7...'
        },
        modal: {
          siteLocated: '站点定位',
          latitude: '纬度',
          longitude: '经度',
          annualRevenue: '年收入',
          co2Reduction: '二氧化碳减排',
          hardwareModel: '硬件型号',
          operator: '运营商',
          unitType: '装置类型',
          deploymentNetwork: '部署网络',
          sites: '站点',
          siteKrEn: '站点 (中/英)',
          locationAddress: '位置地址',
          date: '日期',
          uptime: '运行时间',
          efficiency: '效率',
          pressure: '压力',
          accessTelemetry: '访问遥测'
        }
      },
      products: {
        badge: '产品组合',
        title: '针对不同运营环境的独特系统',
        description: '我们现在更清晰地划分了产品组合：用于零售蒸汽回收的 MZ-1，用于大型储罐和终端环境的 MZ-9000，以及用于定制工业项目的相邻解决方案系列。',
        flagship: [
          {
            name: 'MZ-1',
            label: '零售油气回收',
            description: '专为前庭和加油站设计，在紧凑的日常运行环境中满足气味控制、排放捕获和商业回收需求。',
            metrics: ['专注于零售的占地面积', '改善站点气味状况', '持续回收与监测'],
            cta: '探索 MZ-1 技术'
          },
          {
            name: 'MZ-9000',
            label: '终端 / 罐区回收',
            description: '专为大型存储和转运环境打造，在这些环境下，吞吐量、危险区域就绪情况和更广泛的基础设施集成至关重要。',
            metrics: ['高吞吐量环境', '终端级架构', '专为与更广泛的现场控制集成而设计'],
            cta: '联系工程团队'
          },
          {
            name: '功率滤波器',
            label: '电能质量',
            description: '专用电源管理工具，旨在确保电气稳定性，并在严苛的现场安装中保护敏感电子设备。',
            metrics: ['重型连续额定值', '故障安全集成', '实时遥测'],
            cta: '讨论技术规格'
          },
          {
            name: 'W2E',
            label: '废物能源化',
            description: '将回收的挥发性有机物转化为可用于持续设施运营的电力。',
            metrics: ['自供电架构', '最大限度的资源利用', '零排放输出'],
            cta: '了解更多'
          }
        ],
        cta: {
          mz1: '探索 MZ1 技术',
          terminal: '联系工程团队',
          power: '讨论技术规格',
          learnMore: '了解更多'
        },
        solutions: {
          title: '相邻解决方案系列',
          custom: { title: '定制工程', subtitle: 'MZ 定制', description: '针对非标准流量、占地面积、气候或电力限制的定制系统。' },
          fuel: { title: '燃料处理', subtitle: 'MZ-MFT', description: '用于回收或混合燃料流的调节和质量改进流程。' },
          heat: { title: '热捕捉', subtitle: 'MZ-HC', description: '用于热废物回收和工业效率改进的回收概念。' },
          efficiency: { title: '效率服务', subtitle: 'MZ-ESCO', description: '用于能源和流程优化项目的绩效导向交付模式。' }
        }
      },
      technology: {
        badge: '技术概览',
        title: '平台运作方式的 50,000 英尺视角',
        description: '在深入了解组件级别的细节之前，可以将系统理解为三个层级：蒸汽捕获、热回收和智能控制。选择您接下来要探索的产品。',
        cards: {
          capture: { title: '捕获', text: 'MZ-1 在置换的碳氢化合物蒸汽逸出到大气之前对其进行拦截。' },
          condense: { title: '冷凝', text: '受控的冷却和回收过程将蒸汽转化为有用的液态产品。' },
          control: { title: '控制', text: '传感器、逻辑和遥测保持系统稳定，同时生成符合审计要求的运营数据。' }
        },
        schematic: {
          mz1: '进入 MZ-1 示意图',
          mz9000: '查看 MZ-9000 概览',
          title: 'MZ-1 示意图',
          description: '探索 MZ-1 组件布局。拖动以旋转，滚动以缩放，点击组件以更详细地检查系统架构。'
        }
      },
      financial: {
        badge: '财务模型',
        title: '让蒸汽回收在损益表中清晰可见',
        description: '此页面现在直接集成了简单的 ROI 评估器，因此团队可以查看回收收益、收入分成逻辑和战略价值。',
        cards: {
          capex: { title: '零资本支出结构', text: '在部署回收基础设施的同时保留现金流。' },
          value: { title: '回收产品价值', text: '将置换出的蒸汽转化为可销售的库存及持续利润。' },
          risk: { title: '风险一致模型', text: '绩效和维护激励措施均与正常运行时间和回收率挂钩。' },
          product: { title: '回收产品经济学', text: '优化回收液态燃料的销售策略，实现利润最大化。' }
        },
        newsroom: {
          badge: '新闻中心',
          title: '行业动态与 MZ 更新',
          description: '关注我们对能源基础设施、环境合规和蒸汽回收技术的最新洞察。',
          articles: [
            {
              id: '1',
              date: '2024年3月15日',
              category: '技术',
              title: 'MZ-9000 Pro 实现 99.8% 回收效率',
              excerpt: '在最近于休斯顿码头进行的现场测试中，我们的旗舰系统超出了排放标准。',
              content: '我们的工程团队在休斯顿最大的燃料转运站之一成功完成了一项为期 30 天的测试。结果显示，蒸汽回收效率始终保持在 99.8% 以上，显著降低了该设施的碳足迹。'
            },
            {
              id: '2',
              date: '2024年2月28日',
              category: '合作伙伴',
              title: 'MasarZero 与全球物流巨头建立战略联盟',
              excerpt: '一项旨在为全球 50 个主要配送中心提供回收基础设施的新合作伙伴关系。',
              content: '我们很高兴地宣布与全球领先的物流公司建立多年合作伙伴关系。此项计划将在未来 18 个月内分阶段在主要国际中心部署 MZ 技术。'
            },
            {
              id: '3',
              date: '2024年2月10日',
              category: '部署',
              title: '在东南亚市场实现首个商业运营',
              excerpt: 'MZ 在新加坡港口成功部署，标志着亚太地区扩张的开始。',
              content: '我们在新加坡的首次部署标志着 MasarZero 的一个重要里程碑。该设施现在运行我们的全自动回收逻辑，为该地区未来的项目提供了基准。'
            }
          ]
        },
        gallery: {
          badge: '视觉之旅',
          title: '回收实录',
          description: '探索我们在全球各地的部署实景、研发中心和运营中心。',
          items: [
            { title: '休斯顿终端', subtitle: 'MZ-9000 Pro 部署' },
            { title: '控制中心', subtitle: '24/7 网络运营' },
            { title: '精密制造', subtitle: '工程卓越' },
            { title: '研发设施', subtitle: '下一代测试' },
            { title: '现场集成', subtitle: '无缝改造' },
            { title: '全球物流', subtitle: '供应链卓越' }
          ]
        },
        legal: {
          badge: '合规框架',
          title: '法律与合规中心',
          description: '透明度和安全性是我们运营的基石。',
          sections: {
            terms: {
              title: '服务条款',
              summary: '管理您对我们专有技术和服务的访问。',
              content: '访问或使用 MasarZero ("MZ") 的服务，即表示您同意受这些服务条款的约束。'
            },
            privacy: {
              title: '隐私政策',
              summary: '我们如何收集、加密和保护运营数据。',
              content: 'MZ 致力于保护您的数据。本政策概述了我们如何处理系统生成的信息。'
            },
            compliance: {
              title: '监管合规',
              summary: '遵守 EPA、CARB、ATEX 和全球环境标准。',
              content: '我们的技术旨在满足并超过严格的环境法规。'
            },
            cookies: {
              title: 'Cookie 政策',
              summary: '透明使用必要和分析型 Cookie。',
              content: '我们的网站使用最少的 Cookie 来增强用户体验。'
            }
          },
          certifications: [
            { name: 'ISO 9001:2015', status: '有效' },
            { name: 'ATEX 指令', status: '有效' },
            { name: 'SGS 认证', status: '有效' },
            { name: 'API Spec Q1', status: '待定' },
            { name: 'EPA 合规', status: '待定' },
            { name: 'CARB 合规', status: '待定' }
          ]
        },
        scada: {
          badge: 'PinnacleOS',
          title: '下一代 SCADA',
          description: '连接机器遥测、警报状态、服务上下文和商业报告的单一运营层。',
          features: {
            logic: { title: '智能回收逻辑', text: '根据流量、温度和压力实时自动调整运行参数。' },
            remote: { title: '安全远程控制', text: '具备多层认证和审计日志的受监控远程操作。' },
            audit: { title: '合规审计追踪', text: '自动生成的排放报告，符合全球监管标准。' },
            service: { title: '预测性维护', text: '利用 AI 识别组件故障征兆，在停机发生前进行干预。' }
          },
          screenshots: [
            { title: '运营概览', text: '油站和车队性能的核心运营可见性。' },
            { title: '警报与问题处理', text: '警报可见性、确认流程和升级上下文。' },
            { title: '商业洞察', text: '与运营挂钩的回收价值、利润信号和财务摘要。' },
            { title: '远程控制', text: '针对合格团队的监督式远程操作和命令工作流。' }
          ]
        },
        contact: {
          badge: '联系我们',
          title: '联系方式',
          description: '无论您是对技术、合作伙伴还是职业机会感兴趣，我们都在这里为您提供帮助。',
          offices: [
            { city: '加利福尼亚', country: '美国', type: '美国中心', address: '硅谷, CA' },
            { city: '迪拜', country: '阿联酋', type: '中东总部', address: 'DIFC, 迪拜' },
            { city: '新加坡', country: '新加坡', type: '亚太中心', address: '滨海湾, 新加坡' }
          ],
          departments: [
            { name: '一般咨询', desc: '一般问题和信息。' },
            { name: '技术支持', desc: '现有客户的 24/7 现场和远程支持。' },
            { name: '合作伙伴', desc: '探索商业合作机会。' }
          ]
        },
        oldStandard: {
          title: '旧标准',
          capex: { title: '沉重的先期资本支出', text: '在回收价值得到证实之前，大宗采购已严重影响预算。' },
          payback: { title: '投资回报可见度慢', text: '团队难以将排放控制与直接财务收益联系起来。' },
          risk: { title: '业主承担绩效风险', text: '停机、支持负担和维护的不确定性均由现场承担。' }
        },
        masarzeroModel: {
          title: 'MasarZero 模型',
          capital: { title: '轻资本部署', text: '客户在保留资本的同时解锁回收收益。' },
          clarity: { title: '分成比例清晰', text: '回收产品价值变得清晰可见、易于解释且可按比例分成。' },
          upside: { title: '二次收益', text: '减少排放、提供合规支持以及碳市场叙事进一步增强投资价值。' }
        },
        estimator: {
          title: '简易投资回报估算器',
          subtitle: '用于收入分成对话的轻量级规划工具。调整吞吐量、站点数量和燃油价格，以查看方向性的利润估算。',
          volume: '每日蒸汽量 (L)',
          stations: '站点数量',
          fuelPrice: '燃油价格 ($/L)',
          results: {
            title: '预计产出',
            dailyRecovered: '每日回收量 (L)',
            yearlyProfit: '客户年度利润 ($)',
            cumulative: '累积利润预测',
            modelOutput: '模型输出',
            recoveredLiters: '每日回收升数',
            annualProfit: '客户年度利润',
            fiveYear: '5年累积',
            benchmark: '基于0.15%回收基准和20%客户分成的方向性估算。'
          }
        }
      },
      data: {
        badge: '验证引擎',
        title: '汽油质量与回收指标',
        description: '深度可见化学完整性。我们不仅回收蒸汽；我们将其恢复到特定的液体链，而不损害辛烷值或挥发性标准。',
        lab: {
          title: '交互式分析实验室',
          description: '模拟 MasarZero 验证过程。点击“分析新样本”以处理来自全球终端的不同燃料等级，并查看详细的化学分解。',
          input: '输入样本',
          source: '来源',
          terminal: '终端',
          analyze: '分析新样本',
          verified: '经验证的输出',
          rotate: '旋转样本以开始分析。',
          complete: '分析完成。结果已验证。',
          standards: {
            title: '化学验证',
            industry: '行业标准',
            output: 'MasarZero 输出',
            analysis: '分析'
          }
        },
        comparison: {
          advanced: {
            badge: 'MasarZero VRU',
            title: '高级系统',
            subtitle: '蒸汽回收技术的巅峰。',
            energy: { title: '250倍能量回报', desc: '产生的能量是其消耗能量的250倍。' },
            performance: { title: '比竞争对手好5倍', desc: '表现优于目前最接近的竞争对手五倍。' },
            recovery: { title: '99% 回收率', desc: '捕获几乎所有宝贵的蒸汽，确保浪费最少。' }
          },
          conventional: {
            badge: '传统 VRU',
            title: '传统技术',
            subtitle: '传统的碳床和膜系统。',
            energy: { title: '1:1 能量比', desc: '相对于回收产出的运营成本高。' },
            maintenance: { title: '频繁更换介质', desc: '由于碳床更换而导致的周期性停机。' },
            efficiency: { title: '80-85% 回收率', desc: '大量的无组织排放仍未被捕获。' }
          }
        },
        validation: {
          title: '独立回收验证',
          cu: 'Control Union 回收',
          sgs: 'SGS 回收'
        },
        reports: {
          title: '汽油测试报告',
          jordan: '约旦汽油测试数据',
          korea: '韩国汽油测试数据',
          liveTelemetry: '实时遥测'
        }
      },
      scada: {
        badge: 'PinnacleOS 简介',
        title: '设备背后的操作系统层',
        description: '将机械遥测、告警状态、维护背景和商业报告整合至一个统一的运营层。',
        whatItDoesTitle: '平台实际功能',
        whatItDoesDesc1: 'PinnacleOS 将机械遥测、告警状态、服务背景和商业报告整合到一个运营层。它为团队提供一个统一的地方，了解回收系统的运行状况和需要关注的事项。',
        whatItDoesDesc2: '我们不将 SCADA 视为视觉包装，而是将其定位为运营骨干：机械可见性、异常处理、远程支持协调和报告纪律。',
        labels: { alerts: '告警', telemetry: '遥测', reports: '报告', service: '服务' },
        values: { alerts: '异常处理', telemetry: '实时 + 历史背景', reports: '运营和合规输出', service: '远程分类和引导响应' },
        productViewsTitle: '产品视图',
        productViewsDesc: '真实截图比模拟交互面板更有用，因此本节现在以更清晰的基于角色的视图展示平台。',
        animation: {
          tagline: '工业可持续发展的操作系统。',
          processing: '处理中',
          flowRate: '流量',
          pressure: '压力',
          recoveryTrend: '回收效率趋势',
          systemAlerts: '系统告警',
          filterMaintenance: '过滤器维护',
          deltaP: '压差 > 2.5 PSI',
          remoteOps: '远程操作',
          telemetry: '实时遥测',
          telemetryDesc: '即时查看流量和压力。',
          predictiveAlerts: '预测性告警',
          predictiveDesc: 'AI 诊断在故障发生前检测异常。',
          remoteCommand: '远程指令',
          remoteCommandDesc: '从世界任何地方进行安全加密控制。',
        },
        features: {
          logic: { title: '控制逻辑及遥测', text: 'PinnacleOS 将真实的机械状态、告警和运营逻辑联系起来。' },
          remote: { title: '远程可见性', text: '运营人员可查看机械行为、趋势以及历史数据背景。' },
          audit: { title: '符合审计的报告', text: '运营历史和异常处理均有记录，支持合规和维护支持。' },
          service: { title: '维护支持工作流', text: '针对远程诊断、引导式现场响应及快速解决进行了专门设计。' }
        },
        screenshots: [
          { title: '运营概览', text: '站点和车队性能的核心运营可见性。' },
          { title: '告警与问题处理', text: '告警可见性、确认流程和升级背景。' },
          { title: '商业洞察', text: '与运营挂钩的回收价值、利润信号和财务摘要。' },
          { title: '远程控制', text: '针对合格团队的监督式远程操作和命令工作流。' },
        ],
      },
      cycle: {
        badge: '高级流量动态',
        title: '循环系统',
        description: 'MasarZero 通过将现有基础设施转化为动态压力缓冲器，在不增加硬件的情况下实现了产能的指数级提升。',
        diagram: {
          groundLevel: '地面',
          vaporSpace: '蒸汽空间',
          liquidFuel: '液态燃料',
          buffer: '缓冲区',
          vruCore: 'VRU 核心',
          processing: '处理中',
          vaporIntake: '蒸汽进口',
          excessReturn: '多余回流',
          liquidRecovery: '液态回收',
        },
        features: {
          battery: { title: '蒸汽电池', text: '系统利用地下储罐 (UST) 的蒸汽空间作为缓冲，在卸货高峰期储存多余压力而非排放。' },
          time: { title: '时间扩张', text: '我们将 15 分钟的卡车卸货负荷分散到 60 分钟内。这使得更小、更节能的设备能够处理工业级浪涌。' },
          waste: { title: '零排放', text: '通过在压力高峰期保持系统闭环，我们确保无任何无组织排放逸出至大气，从而最大化回收率。' }
        }
      },
      newsroom: {
        badge: '媒体连接',
        title: '新闻与日志',
        featured: '精选故事',
        searchPlaceholder: '搜索日志...',
        readFull: '阅读完整报告',
        accessLog: '访问日志',
        mediaUplink: '媒体连接',
        pressKit: '安全访问 // 媒体资料包',
        pressContact: '媒体联系人'
      },
      investor: {
        badge: '投资者关系',
        title: '投资者终端',
        updated: '最后更新',
        contact: '联系投资者关系',
        prospectus: '2024 招股说明书',
        thesis: '投资逻辑',
        catalysts: '近期催化剂',
        dataRoom: {
          title: '资料库',
          docName: '文档名称',
          type: '类型',
          date: '日期',
          action: '操作'
        },
        metrics: {
          revenue: '收入 (TTM)',
          margin: '毛利率',
          deployments: '部署数量',
          retention: '保留率'
        }
      },
      roi: {
        badge: '精密建模',
        title: '投资回报引擎',
        description: '配置运营参数以模拟精确的财务结果。在快速评估和全面财务分析之间切换。',
        switcher: {
          quick: '快速评估',
          deep: '深度分析模型'
        },
        openCalc: '打开专用计算器'
      },
      digitalTwin: {
        badge: '系统已初始化',
        title: '数字孪生',
        description: '选择设施环境以初始化 MasarZero VRU 模拟内核。',
        initialize: '初始化模拟',
        retail: {
          title: '零售站',
          subtitle: '城市环境',
          description: '模拟标准地下储罐配置中的高频加油循环和蒸汽置换。'
        },
        terminal: {
          title: '储罐终端',
          subtitle: '工业中心',
          description: '模拟散装液体储罐场和分配终端的大规模蒸汽回收效率。'
        }
      },
      library: {
        badge: '数字档案',
        title: '技术资料库',
        description: '现在资料库对材料进行了更清晰的分组，显示文档缩略图，并提供审阅、下载或索取完整文件包的简单后续操作。',
        categories: {
          all: '全部',
          spec: '规格表',
          whitepaper: '白皮书',
          caseStudy: '案例研究',
          guide: '指南'
        },
        search: '搜索文档...',
        actions: {
          view: '查看 PDF',
          download: '下载',
          request: '索取完整包'
        },
        items: {
          specs: { title: '规格表', text: '尺寸、公用设施和产品安装信息。' },
          commercial: { title: '商业文件', text: 'ROI、部署经济学和价值捕获叙述。' },
          field: { title: '现场指南', text: '安装、调试和面向服务的文档。' }
        }
      },
      support: {
        badge: '运营中心',
        title: '支持与维护',
        description: '全面的技术支持、故障排除指南和维护计划，确保您的 MasarZero 系统保持最佳效率运行。',
        tabs: {
          troubleshooting: '故障排除',
          maintenance: '维护计划',
          contact: '联系支持'
        },
        contact: {
          title: '直接支持渠道',
          subtitle: '我们的技术团队可随时就关键系统问题或常规维护计划进行协调。',
          hotline: '全球热线',
          email: '技术邮箱',
          office: '区域中心'
        }
      },
      knowledgeBase: {
        badge: '综合技术手册 v2.4',
        title: '知识中枢',
        description: 'MasarZero 系统的官方技术文档、操作规程和维护协议。',
        searchPlaceholder: '搜索手册（例如"压缩机"、"安全"）...',
        topicsFound: '个主题',
        searchResults: '跨所有类别的搜索结果：',
        noResults: '未找到相关结果：',
        tryAnother: '请尝试其他搜索词或按类别浏览。',
        refId: '参考编号：',
        categories: {
          overview: '系统概述',
          safety: '安全规程',
          installation: '安装与物流',
          maintenance: '维护',
          troubleshooting: '故障排除',
        },
      },
      installationGuide: {
        badge: '现场部署',
        title: '安装指南',
        spatialView: '空间视图',
        schematicView: '示意图视图',
        actionItems: '操作项目',
        back: '返回',
        nextStep: '下一步',
        finish: '完成',
      },
      maintenanceGuide: {
        badge: '技术文档 v2.4',
        title: '维护手册',
        description: '面向认证 MasarZero 技术人员的综合维修指南、接线图和故障排除协议。',
        downloadSheet: '下载表格',
        module: '模块：',
        sheets: {
          daily: '每日操作员检查表',
          weekly: '每周检查清单',
          quarterly: '季度服务工作表',
        },
        intervals: {
          daily: '每日',
          weekly: '每周',
          quarterly: '每季度',
        },
        severity: {
          critical: '关键',
          high: '高',
          planned: '计划',
        },
      },
      vruTesting: {
        badge: '声学实验室',
        title: 'VRU 验证协议',
        description: '用于油气回收装置声学和性能验证的交互式测试环境。',
      },
      acceptanceTest: {
        badge: '质量保证',
        title: '验收协议',
        inProgress: '进行中',
        complete: '已完成',
        exportPdf: '导出 PDF',
        sectionStatus: '章节状态',
        authorization: '授权与签署',
        lastCompleted: '上次完成',
        asRequired: '按需',
        trackManually: '（手动跟踪）',
        setDate: '设置日期',
        overdue: '已逾期',
        dueToday: '（今日到期）',
        dueIn: '到期于',
        signHere: '在此签名',
        nameTitlePlaceholder: '姓名与职务',
        dateSigned: '签署日期',
        signatureRequired: '需要签名',
        type: '输入',
        draw: '手写',
        upload: '上传',
        clickToUpload: '点击上传图片',
        observations: '观察 / 备注...',
      },
      sidebar: {
        liveTrends: '实时趋势',
        pumpStatus: '实时泵状态',
        speed: '速度',
        pressure: '压力',
        systemStatus: '系统状态',
        specSheet: '规格书',
        nextPart: '下一部件',
        flowRate: '流量'
      },
      legal: {
        badge: '合规主机',
        title: '法律中心',
        description: '透明度和安全性是我们运营的基石。访问我们的监管框架、使用条款和认证组合。',
        wallTitle: '信任之墙',
        wallDesc: '我们遵守质量、安全和环境管理的最高全球标准。',
        quickSummary: '快速摘要',
        collapseDetails: '收起详情',
        close: '关闭',
        active: '有效',
        pending: '待定',
        sections: {
          terms: { title: '服务条款', summary: '管理您对我们专有技术和服务的访问。', buttonText: '阅读完整条款' },
          privacy: { title: '隐私政策', summary: '我们如何收集、加密和保护运营数据。', buttonText: '阅读完整政策' },
          compliance: { title: '监管合规', summary: '遵守 EPA、CARB、ATEX 和全球环境标准。', buttonText: '查看标准' },
          cookies: { title: 'Cookie 政策', summary: '透明使用必要和分析型 Cookie。', buttonText: '管理偏好' },
        },
      },
    },
    footer: {
      counterTitle: '已为客户回收的燃油总升数',
      tagline: '智能回收。切实回报。',
      categories: {
        solutions: '解决方案',
        impact: '成效',
        resources: '资源',
        company: '公司',
      },
      dataPerformance: '数据与绩效',
      copyright: 'MasarZero Technologies 版权所有。',
    },
  },
  ar: {
    common: {
      processing: 'جاري المعالجة...',
      startCalculation: 'ابدأ الحساب',
      viewCaseStudies: 'عرض دراسات الحالة',
      live: 'مباشر',
    },
    header: {
      nav: {
        home: 'الرئيسية',
        solutions: 'الحلول',
        products: 'المنتجات',
        technology: 'التقنية',
        cycleSystem: 'نظام الدورة',
        digitalTwin: 'التوأم الرقمي',
        scadaPlatform: 'منصة سكادا',
        impact: 'الأثر',
        environmental: 'البيئة',
        financial: 'المالي',
        global: 'الانتشار العالمي',
        gasolineQuality: 'البيانات والأداء',
        resources: 'الموارد',
        gallery: 'المعرض',
        knowledgeBase: 'قاعدة المعرفة',
        technicalLibrary: 'المكتبة الفنية',
        installationGuide: 'دليل التركيب',
        maintenanceManual: 'دليل الصيانة',
        maintenanceProgram: 'برنامج الصيانة',
        validationProtocol: 'بروتوكول التحقق',
        equipmentAcceptanceTest: 'اختبار قبول المعدات',
        supportService: 'الدعم والخدمة',
        company: 'الشركة',
        esgHub: 'مركز ESG',
        aboutUs: 'من نحن',
        newsroom: 'الأخبار',
        legalCompliance: 'القانون والامتثال',
        contactUs: 'اتصل بنا',
        clientPipeline: 'مسار العملاء',
        investorRelations: 'علاقات المستثمرين',
      },
      actions: {
        calculator: 'الحاسبة',
        clientPlatform: 'منصة العملاء',
        languageLabel: 'اختر اللغة',
        toggleMenu: 'تبديل القائمة',
      },
    },
    home: {
      hero: {
        line1: 'استرداد ذكي.',
        line2: 'عوائد ملموسة.',
        description:
          'تطوّر MasarZero وحدات متقدمة لاسترجاع الأبخرة لتحويل الانبعاثات إلى إيرادات مع حماية البيئة عبر هندسة مدعومة بالذكاء الاصطناعي.',
        cta: 'اكتشف تقنيتنا',
      },
      socialProof: {
        trustedBy: 'موثوق من قبل رواد الطاقة العالميين',
        countries: 'دول تم النشر فيها',
        installations: 'منشآت عاملة',
        uptime: 'جاهزية تشغيلية',
      },
      howItWorks: {
        title: 'من البخار إلى القيمة',
        subtitle: 'عملية الاسترداد',
        desktopSubtitle: 'مرر الصفحة لتصور عملية الاسترداد',
        systemKey: 'مفتاح النظام',
        vaporFlow: 'تدفق البخار',
        recoveredFuel: 'الوقود المستعاد',
        incomingFuel: 'الوقود الداخل',
        steps: {
          truckDispenses: {
            title: 'تفريغ الشاحنة',
            description:
              'تصل شاحنة الصهريج وتتصل بخزان التخزين الأرضي الرئيسي لبدء إعادة التزويد بالوقود.',
          },
          vaporDisplacement: {
            title: 'إزاحة الأبخرة',
            description:
              'عند امتلاء الخزان بالوقود السائل، تُزاح أبخرة البنزين وتُوجّه إلى وحدة MasarZero.',
          },
          condensation: {
            title: 'التكثيف',
            description:
              'يقوم النظام الحاصل على براءة اختراع داخل الوحدة بضغط البخار وتكثيفه وتحويله مجددًا إلى بنزين سائل نقي.',
          },
          efficientRecovery: {
            title: 'استرداد فعّال',
            description:
              'تحقق تقنيتنا كفاءة استرداد تصل إلى 99%، ما يقلل الفاقد ويعظّم القيمة.',
          },
          valueReturned: {
            title: 'إرجاع القيمة',
            description:
              'يُعاد الوقود القابل للبيع إلى خزان منفصل، ما يخلق مصدر دخل مباشرًا جديدًا.',
          },
        },
      },
      features: {
        title: 'مصمم من أجل',
        highlight: 'الريادة',
        description: 'تجمع بنيتنا الخاصة بين الفيزياء التبريدية ومنطق الشبكات العصبية.',
        idle: 'النظام في وضع الخمول // مرر فوق العقد',
        items: {
          cryo: {
            title: 'التقاط تبريدي',
            description: 'تقنية تكثيف تحت الصفر حاصلة على براءة اختراع بكفاءة استرداد 99.9%.',
          },
          ai: {
            title: 'ذكاء تكيفي',
            description: 'خوارزميات ذاتية التعلم تضبط الضغط ودرجة الحرارة لحظيًا.',
          },
          modular: {
            title: 'بنية معيارية',
            description: 'قابلية توسع مرنة مصممة لمحطات بجميع السعات.',
          },
          iot: {
            title: 'اتصال إنترنت الأشياء',
            description: 'تكامل أصيل مع PinnacleOS للتحكم والإدارة عن بُعد.',
          },
          safety: {
            title: 'تصميم مقاوم للانفجار',
            description: 'معتمد لبيئات المنطقة 1 الخطرة مع حواجز أمان ذاتية.',
          },
          health: {
            title: 'صحة تنبؤية',
            description: 'تشخيصات آلية ترصد الشذوذ قبل أن تتسبب في توقف التشغيل.',
          },
        },
      },
      productShowcase: {
        title: 'دقة صناعية',
        description: 'مصمم لتحمل أقسى البيئات مع أداء بمستوى المختبر.',
        badge: 'نشر موقعي',
        mainTitle: 'MZ-1',
        mainDescription:
          'نظام استرداد أبخرة مؤتمت بالكامل ومصمم لأداء موثوق في بيئات المحطات عالية المتطلبات.',
        intelligentControlTitle: 'تحكم ذكي',
        intelligentControlDescription: 'تكامل لوحة PinnacleOS',
        cryoCoreTitle: 'Cryo-Core حاصل على براءة اختراع',
        cryoCoreDescription: 'تقنية تكثيف متقدمة',
      },
      sustainability: {
        title: 'الالتزام بالاستدامة',
        description:
          'تقنيتنا لا تتعلق فقط بالعوائد الاقتصادية، بل بصناعة مستقبل مستدام للقطاع وللكوكب. نحن نمكّن عملاءنا من تحقيق عوائد ملموسة مع بناء إرث مستدام.',
      },
      deploymentProof: {
        badge: 'إثبات النشر',
        title: 'مثبت في الميدان، وليس فقط في العروض التقديمية.',
        description: 'تُنشر أنظمة MasarZero بالفعل عبر البيئات التجزئة والصناعية مع قيود الموقع الحقيقية والقيمة القابلة للقياس للاسترداد وظروف التشغيل المحسنة بشكل واضح.',
        explore: 'استكشاف عمليات النشر',
        request: 'طلب مراجعة الموقع',
        blocks: {
          saudi: {
            title: 'نشر التجزئة في السعودية',
            location: 'أبها، المملكة العربية السعودية',
            metrics: ['تحسين ظروف الرائحة', 'استرداد الوقود في التشغيل المباشر', 'يدعم تقارير الامتثال'],
            summary: 'مشروع نشر مباشر يركز على التقاط الأبخرة، وظروف الموقع الأنظف، والعمليات اليومية التي يمكن الاعتماد عليها.'
          },
          korea: {
            title: 'تركيب الماكينة المزدوجة في كوريا',
            location: 'كوريا',
            metrics: ['بنية الماكينة المزدوجة', 'توفير التكرار لضمان التشغيل', 'نمط نشر قابل للتوسع'],
            summary: 'نموذج نشر بوحدة مزدوجة مصمم لإنتاجية أكبر وتوسعة متكررة على نطاق المحطة.'
          }
        }
      }
    },
    pages: {
      environmental: {
        title: 'الأثر البيئي',
        subtitle: 'التزامنا بعالم أنظف.',
        hero: {
          badge: 'تحليل الأثر',
          title: 'تحويل الانبعاثات إلى قيمة',
          description: 'تمنع أنظمة VRU الخاصة بنا المركبات العضوية المتطايرة الضارة من دخول الغلاف الجوي، مما يخلق بيئة أنظف ويستعيد موارد قيمة.',
        },
        metrics: {
          co2: { title: 'خفض CO₂', description: 'منع غازات الاحتباس الحراري من دخول الغلاف الجوي سنويًا.' },
          fuel: { title: 'الوقود المستعاد', description: 'تحويل بخار النفايات مرة أخرى إلى وقود سائل قيم وقابل للبيع.' },
          trees: { title: 'ما يعادل الأشجار', description: 'عزل الكربون بما يعادل زراعة ملايين الأشجار.' },
          water: { title: 'توفير المياه', description: 'الحفاظ على موارد المياه من خلال تبريد الحلقة المغلقة الفعال.' },
          air: { title: 'هواء أنظف', description: 'الحد من المركبات العضوية المتطايرة (VOCs) والملوثات.' },
          compliance: { title: 'الامتثال', description: 'تجاوز اللوائح البيئية العالمية الصارمة باستمرار.' }
        },
        chart: {
          title: 'ارتباط الأداء',
          subtitle: 'تحليل مباشر // العقدة: MZ-Alpha',
          liveFeed: 'بث مباشر',
          revenue: 'نمو الإيرادات',
          emissions: 'انخفاض الانبعاثات',
          timeframe: 'الإطار الزمني',
          netProfit: 'صافي الربح'
        },
        scrolling: 'مرر للتحليل',
        features: {
          carbonCredits: 'ائتمانات الكربون',
          efficiencyRating: 'تصنيف الكفاءة',
          verified: 'تم التحقق'
        },
        beforeAfter: {
          title: 'ظروف التشغيل قبل / بعد',
          before: { label: 'قبل', text: 'فقدان بخار مفتوح، رائحة أقوى حول نشاط النقل، رؤية أقل للانبعاثات الهاربة، وإشارات مالية أقل قابلية للاستخدام من الموقع.' },
          after: { label: 'بعد', text: 'بخار ملتقط، تحسين ظروف الرائحة للمشغلين والعملاء القريبين، وضع امتثال أفضل، وقيمة إيرادات أوضح من المنتج المستعاد.' }
        },
        odorValue: {
          title: 'لماذا يهم تحسين الرائحة',
          description: 'الأداء البيئي ليس مجرد قصة كربون. يمكن لتقاطع البخار الأفضل أن يحسن بشكل مادي التجربة الحسية اليومية في الموقع من خلال تقليل رائحة الهيدروكربون المستمرة حول عمليات التزود بالوقود والنقل.',
          points: [
            'يحسن تصور العميل والمشغل لنظافة الموقع.',
            'يدعم الراحة في مكان العمل في بيئات التزود بالوقود النشطة.',
            'يعزز حالة القيمة العملية للاسترداد بما يتجاوز الامتثال وحده.'
          ]
        },
        shield: {
          title: 'درع لكوكبنا',
          tagline: 'تقدم وحدات استرداد البخار مزيجًا قويًا من الحماية البيئية، والحفاظ على الموارد، وتحسين السلامة.',
          pollution: { title: 'يقلل من تلوث الهواء', desc: 'يصفي أكثر من 95٪ من المركبات العضوية المتطايرة (VOCs) والأبخرة الضارة الأخرى قبل دخولها الغلاف الجوي.' },
          resources: { title: 'يحافظ على الموارد', desc: 'يستعيد أبخرة الهيدروكربون القيمة ويحولها مرة أخرى إلى منتجات سائلة قابلة للاستخدام، مما يمنع هدر الموارد.' },
          ozone: { title: 'يمنع تكون الأوزون', desc: 'من خلال التقاط المركبات العضوية المتطايرة، تساعد وحدات استرداد البخار في منع تكون الأوزون في مستوى الأرض (الضباب الدخاني)، وهو مكون رئيسي لتلوث الهواء.' },
          safety: { title: 'يحسن السلامة', desc: 'يقلل من خطر الحريق والانفجار من خلال تقليل تركيزات البخار القابل للاشتعال في المواقع الصناعية.' }
        },
        atmosphere: {
          smog: { title: 'يمنع تكون الضباب الدخاني (N₂O₄)', desc: 'تلتقط وحدات استرداد البخار المركبات العضوية المتطايرة وأكاسيد النيتروجين. لا تشكل هذه المركبات ضبابًا دخانيًا فحسب، بل تعمل أيضًا كغازات دفيئة تحبس الحرارة في الغلاف الجوي. منع إطلاقها هو المفتاح لهواء أنظف ومناخ مستقر.' },
          protection: { title: 'حماية غلافنا الجوي', desc: 'من خلال التقاط المركبات العضوية المتطايرة (VOCs)، تقلل وحدات استرداد البخار من تكون الأوزون في مستوى الأرض (الضباب الدخاني) وتحمي طبقة الأوزون الستراتوسفيرية الحيوية.' }
        }
      },
      esg: {
        title: 'محرك الاستدامة',
        subtitle: 'نحن نصمم النتائج، وليس فقط التكنولوجيا. تعمل كل وحدة MasarZero يتم نشرها كرئة متجددة للقطاع الصناعي، مما يحول الامتثال إلى ميزة تنافسية.',
        tabs: {
          environmental: 'البيئية',
          social: 'الاجتماعية',
          governance: 'الحوكمة'
        },
        env: {
          title: 'الأثر العالمي',
          subtitle: 'مقاييس خفض الكربون في الوقت الفعلي',
          dataStream: 'تدفق البيانات: متصل',
          carbonCredits: {
            title: 'ائتمانات الكربون',
            desc: 'نحن نتعامل مع ائتمانات الكربون كطبقة تجارية فوق التخفيض المقاس للانبعاثات، وليس كبديل للإثبات التشغيلي.',
            points: [
              'مسار التخفيض المقاس المرتبط بالبيانات التشغيلية',
              'جاهزية السجل وتخطيط سير عمل التحقق',
              'مزايا إضافية إلى جانب اقتصاديات الوقود المسترجع'
            ]
          },
          lending: {
            title: 'الإقراض المرتبط بالاستدامة',
            desc: 'يدعم نموذج التشغيل أيضًا محادثات SLL من خلال ربط النشر ومقاييس الانبعاثات ووقت التشغيل وانضباط التقارير بأطر KPI الموجهة للمقرضين.',
            points: [
              'وتيرة التقارير المدعومة بمؤشرات الأداء الرئيسية',
              'أدلة تشغيلية لروايات التمويل',
              'مفيد للمقرضين والمستثمرين وشركاء البنية التحتية'
            ]
          },
          nextTab: 'التالي: استكشاف المسؤولية الاجتماعية'
        },
        social: {
          title: 'ثقافة عدم الضرر',
          subtitle: 'السلامة ليست مجرد مقياس؛ إنها ضرورة أخلاقية. نحن نصمم أنظمة تحمي الناس أولاً.',
          nextTab: 'التالي: عرض إطار الحوكمة'
        },
        gov: {
          title: 'شفافية جذابة',
          subtitle: 'تبنى الثقة على المساءلة. يوفر إطار الحوكمة لدينا رؤى واضحة وقابلة للتحقق في عملياتنا، مما يضمن التزامنا بأعلى معايير النزاهة.',
          financeTitle: 'الحوكمة المتوافقة مع التمويل',
          financeDesc: 'لا تقتصر الحوكمة هنا على لغة السياسات. بل تدعم أيضًا ثقة المقرضين، ومصداقية سوق الكربون، وأطر الإقراض المرتبطة بالاستدامة من خلال الحفاظ على البيانات وتاريخ التحكم ومسارات المساءلة منظمة.',
          reportTitle: 'تقرير أثر ESG لعام 2024',
          reportDesc: 'قم بتنزيل تقريرنا السنوي الشامل الذي يوضح منهجيتنا ومسارات التدقيق الكاملة وأهداف الاستدامة المستقبلية.',
          download: 'تحميل PDF',
          nextTab: 'العودة إلى البيئة'
        },
        impactDashboard: {
          title: 'رصد الأثر المباشر',
          subtitle: 'التجميع العالمي',
          co2: { label: 'CO₂ خفض', sub: 'معدل التشغيل السنوي' },
          fuel: { label: 'الوقود المسترجع', sub: 'التراكمي العالمي' },
          trees: { label: 'ما يعادل الأشجار', sub: 'مطابقة الاشجار' },
          water: { label: 'المياه المحفوظة', sub: 'كفاءة التبريد' }
        },
        lifecycle: {
          title: 'استدامة دورة الحياة الكاملة',
          subtitle: 'من المواد الخام إلى نهاية العمر، يتم تحسين كل مرحلة لتقليل الأثر البيئي.',
          stages: [
            { title: 'التوريد الأخلاقي', desc: 'بيانات التوريد بنسبة 95٪ من المواد الخام من مزودي الخدمة المعتمدين.' },
            { title: 'التصنيع الأخضر', desc: 'المرافق تعمل بالطاقة المتجددة بنسبة 100٪ مع أنظمة مياه مغلقة.' },
            { title: 'التشغيل عالي الكفاءة', desc: 'يولد 250 ضعف الطاقة المستهلكة مع تحسين الذكاء الاصطناعي.' },
            { title: 'الاقتصاد الدائري', desc: 'أكثر من 90٪ قابل لإعادة التدوير ومصمم للتفكيك وإعادة التصنيع.' }
          ]
        },
        community: {
          title: 'المجتمع والابتكار',
          subtitle: 'تمتد مسؤوليتنا إلى ما وراء مرافقنا. نحن ملتزمون ببناء مجتمعات أقوى وابتكار التكنولوجيا من أجل عالم أفضل.',
          areas: [
            { title: 'شراكات المجتمع', desc: 'نستثمر في برامج تعليم STEM في مجتمعاتنا المحلية لإلهام الجيل القادم.' },
            { title: 'التوظيف والتطوير المحلي', desc: 'تعطي سياستنا الأولوية لتوظيف وتطوير المواهب المحلية في المناطق التي نعمل فيها.' },
            { title: 'الابتكار من أجل الخير', desc: 'مختبر MasarZero مخصص لتقديم حلول الجيل القادم في التقاط الكربون.' },
            { title: 'برنامج تطوع الموظفين', desc: 'نوفر وقتاً مدفوع الأجر للموظفين للتطوع في القضايا البيئية والاجتماعية.' }
          ]
        },
        safety: {
          title: 'الالتزام بالصحة والسلامة',
          subtitle: 'رفاهية موظفينا وشركائنا ومجتمعاتنا هي أولويتنا القصوى. نحن نحافظ على ثقافة سلامة عالمية.',
          stats: [
            { label: 'معدل حوادث العمل القابلة للتسجيل (TRIR)' },
            { label: 'إصابات الوقت الضائع (LTI)' },
            { label: 'تدريب سلامة الموظفين السنوي', suffix: '+ ساعة' }
          ]
        },
        governance: {
          title: 'الحوكمة والأخلاقيات في العمل',
          subtitle: 'استكشف المبادئ الأساسية لإطار الحوكمة لدينا، المبني على الشفافية والنزاهة والمساءلة.',
          mechanisms: 'الآليات الرئيسية',
          tabs: [
            { title: 'رقابة مجلس الإدارة', content: 'توفر لجنة ESG التابعة لمجلس الإدارة رقابة صارمة، مما يضمن توافق استراتيجياتنا مع الأهداف طويلة المدى.', points: ['لجنة ESG مستقلة', 'مراجعات الأداء الربع سنوية', 'تعويضات التنفيذيين مرتبطة بأهداف ESG'] },
            { title: 'خصوصية البيانات والأمن', content: 'نحن نلتزم بأعلى معايير خصوصية البيانات، ونستخدم التشفير وبروتوكولات الأمن السيبراني.', points: ['متوافق مع GDPR و CCPA', 'تشفير من طرف إلى طرف', 'عمليات تدقيق أمنية منتظمة من جهة خارجية'] },
            { title: 'أخلاقيات العمل', content: 'سياسة عدم التسامح مطلقاً مع الفساد والرشوة هي أساس عملياتنا. يخضع الجميع لتدريب سنوي.', points: ['سياسة عدم التسامح مع الفساد', 'برنامج شفاف للإبلاغ عن المخالفات', 'تدريب أخلاقي إلزامي سنوي'] },
            { title: 'مشاركة أصحاب المصلحة', content: 'نحن نتفاعل بنشاط مع المستثمرين والعملاء والموظفين للتأكد من أن استراتيجيتنا ESG ذات صلة.', points: ['منتديات سنوية لأصحاب المصلحة', 'تقييمات الأهمية النسبية', 'تقارير ESG شفافة'] }
          ]
        },
        globalGoals: {
          title: 'أهداف التنمية المستدامة للأمم المتحدة',
          goals: [
            { title: 'العمل المناخي', desc: 'يخفف مباشرة من تغير المناخ عن طريق التقاط غازات الدفيئة القوية مثل الميثان.' },
            { title: 'مدن مستدامة', desc: 'يقلل من تلوث الهواء (الضباب الدخاني)، مما يؤدي إلى مجتمعات أكثر صحة واستدامة.' },
            { title: 'الإنتاج المسؤول', desc: 'يمنع هدر المنتج عن طريق تحويل البخار مرة أخرى إلى حالة قابلة للاستخدام.' },
            { title: 'طاقة نظيفة بأسعار معقولة', desc: 'الهيدروكربونات المسترجعة هي مصدر طاقة جاهز للاستخدام، مما يقلل الحاجة لاستخراج جديد.' }
          ]
        },
        energyTrilemma: {
          title: 'معالجة معضلة الطاقة الثلاثية',
          subtitle: 'توفر تكنولوجيا VRU حلاً متوازناً، مع إجراء تحسينات كبيرة عبر الركائز الثلاث للتحدي العالمي للطاقة.',
          clickLearn: 'انقر فوق أيقونة لمعرفة المزيد',
          pillars: {
            security: { title: 'أمن الطاقة', desc: 'من خلال استعادة الوقود الذي كان سيفقد كبخار، تعزز تقنيتنا إمدادات الطاقة المحلية.' },
            sustainability: { title: 'الاستدامة البيئية', desc: 'التقاط غازات الدفيئة القوية يحارب تغير المناخ ويحسن جودة الهواء المحلي بشكل كبير.' },
            equity: { title: 'عدالة الطاقة', desc: 'توفر الهيدروكربونات المسترجعة مصدر طاقة ميسور التكلفة، مما يساعد في خفض التكاليف التشغيلية.' }
          }
        },
        audit: {
          verified: 'سجل التدقيق: تم التحقق'
        }
      },
      about: {
        title: 'البناء من أجل الأمد الطويل للطاقة.',
        tagline: 'تقوم MasarZero ببناء بنية تحتية لاسترداد الأبخرة مع ارتباط أوثق بين الهندسة وإثبات النشر وقدرة المصنع والنتائج المالية. نحن نركز على الأنظمة التي تعمل في بيئات التشغيل الحقيقية، وليس فقط في العروض المفاهيمية.',
        trustTitle: 'لماذا يثق بنا العملاء',
        trustDescription: 'تأتي الثقة من رؤية السلسلة متصلة ببعضها البعض: جاهزية المصنع، وعمليات النشر الحقيقية، واختبارات الطرف الثالث، وفريق يمكنه دعم التكليف من خلال العمليات.',
        trustPoints: [
          'مسارات اختبار SGS والتحقق من الأداء الموثق',
          'مشاركة Control Union لسير عمل التدقيق والشهادات',
          'التوجيه الهندسي الموجه نحو ATEX للجاهزية للمناطق الخطرة',
          'فرق تصنيع وتكليف ودعم مدعومة من المصنع'
        ],
        milestones: {
          title: 'معالم ملموسة',
          items: [
            'تم الانتهاء من الانتقال من النموذج الأولي إلى الميدان عبر بيئات استرداد الأبخرة الحية',
            'التوسع في مخرجات المصنع من خلال تصميمات ماكينات جاهزة للإنتاج وقابلة للتكرار',
            'إنشاء مسارات اختبار وتوثيق من طرف ثالث للجاهزية للشهادات',
            'نشاط النشر عبر الحدود جارٍ عبر البرامج التجارية والصناعية'
          ]
        },
        journey: {
          title: 'رحلتنا في الابتكار',
          subtitle: 'من فكرة جريئة إلى ريادة عالمية، يتم تحديد تاريخنا من خلال الابتكار المستمر والالتزام الراسخ بمهمتنا.',
          events: [
            { date: '2018', title: 'التأسيس', description: 'تأسست MasarZero على يد فريق من المهندسين المخضرمين في قطاع الطاقة بهدف القضاء على الانبعاثات الصناعية من خلال التكنولوجيا الذكية.' },
            { date: '2020', title: 'منح أول براءة اختراع', description: 'حصلنا على أول براءة اختراع لعملية استرداد بخار التكثيف المبرد الثورية، مما أرسى مكانتنا الفريدة في السوق.' },
            { date: '2021', title: 'أول نشر تجاري', description: 'التثبيت الناجح لأول وحدة MZ-9000 في محطة رئيسية في هيوستن، وتحقيق معدل استرداد 99.8٪ في بيئة حية.' },
            { date: '2023', title: 'التوسع العالمي', description: 'توسيع العمليات إلى أوروبا وآسيا، وإقامة شراكات رئيسية في روتردام وسنغافورة لخدمة عملائنا الدوليين.' },
            { date: '2024', title: 'تكامل الذكاء الاصطناعي', description: 'إطلاق منصة SCADA المدعومة بالذكاء الاصطناعي، وإدخال الصيانة التنبؤية والتحسين في الوقت الفعلي لزيادة الكفاءة ووقت التشغيل لجميع العملاء.' }
          ]
        },
        testing: {
          title: 'الاختبار والضمان',
          desc: 'يتم تعزيز خطنا التجاري من خلال شركاء التحقق والاختبار الموثق ومسارات إعداد التقارير الجاهزة للامتثال بدلاً من الادعاءات التسويقية الفضفاضة.'
        },
        team: {
          title: 'المهندسون المعماريون',
          subtitle: 'رؤى لبناء بنية تحتية للمستقبل.',
          members: [
            { name: 'Dr. A. Latif Alkhaja', role: 'رئيس مجلس الإدارة والرئيس التنفيذي', bio: 'أكثر من 20 عاماً في البنية التحتية العالمية للطاقة.' },
            { name: 'Mr. Yalçın Aliyev', role: 'شريك رئيسي', bio: 'عقود من الخبرة المرتبطة بشركات تسويق النفط في رابطة الدول المستقلة والشرق الأوسط وشمال أفريقيا.' },
            { name: 'Yang Qishan', role: 'رئيس قسم التكنولوجيا', bio: 'المهندس المعماري الرئيسي لـ MZ-1 و MZ-9000.' },
            { name: 'Sultan Alkhaja', role: 'مدير العمليات', bio: 'خبير في لوجستيات النشر واسعة النطاق.' },
            { name: 'Hari Krishna', role: 'كبير المهندسين', bio: 'متخصص في تكامل SCADA والذكاء الاصطناعي.' },
            { name: 'Larry Nash', role: 'رئيس العمليات التشغيلية', bio: 'قيادة التميز التشغيلي العالمي وتوسيع نطاق العمليات اللوجستية للأعمال.' }
          ]
        },
        dna: {
          title: 'الحمض النووي للشركة',
          subtitle: 'المدونة التي تحكم عملياتنا.',
          values: [
            { title: 'الجرأة', text: 'نحن نعالج أصعب المشاكل التي يتجاهلها الآخرون.' },
            { title: 'الدقة', text: 'هندسة دقيقة لنتائج ملموسة.' },
            { title: 'الثقة من خلال الإثبات', text: 'نحن ندعم ادعاءاتنا بالنشر والاختبار والتوثيق.' }
          ]
        },
        testimonials: [
          {
            quote: 'تشعر MasarZero وكأنها شريك تشغيلي أكثر من كونها بائعاً للأجهزة. إنهم يفهمون الموقع واقتصاديات الاسترداد وسياق الامتثال.',
            author: 'شريك تطوير المحطات'
          },
          {
            quote: 'أقوى إشارة بالنسبة لنا كانت رؤية قدرة المصنع ونية النشر وانضباط الاختبار تظهر معاً بدلاً من وعود منفصلة.',
            author: 'مستشار البنية التحتية الصناعية'
          }
        ]
      },
      contact: {
        badge: 'تواصل معنا',
        title: 'معلومات الاتصال',
        subtitle: 'تواصل مع فريقنا العالمي. سواء كنت مستعداً للنشر أو لديك سؤال فقط، نحن هنا للمساعدة.',
        nexus: 'الرابط العالمي',
        channels: 'القنوات المباشرة',
        emergency: 'دعم الطوارئ 24/7'
      },
      global: {
        stats: {
          activeSites: 'المواقع النشطة',
          marketsOnline: 'الأسواق المتصلة',
          globalRevenue: 'الإيرادات العالمية',
          annualRunRate: 'معدل التشغيل السنوي',
          carbonOffset: 'إزاحة الكربون',
          metricTonsYear: 'طن متري / سنة'
        },
        feed: {
          filterSignal: 'تصفية الإشارة...',
          scanningSector: 'مسح القطاع 7...'
        },
        modal: {
          siteLocated: 'تم تحديد الموقع',
          latitude: 'خط العرض',
          longitude: 'خط الطول',
          annualRevenue: 'الإيرادات السنوية',
          co2Reduction: 'تقليل CO₂',
          hardwareModel: 'طراز الأجهزة',
          operator: 'المشغل',
          unitType: 'نوع الوحدة',
          deploymentNetwork: 'شبكة النشر',
          sites: 'مواقع',
          siteKrEn: 'الموقع (KR/EN)',
          locationAddress: 'عنوان الموقع',
          date: 'التاريخ',
          uptime: 'وقت التشغيل',
          efficiency: 'الكفاءة',
          pressure: 'الضغط',
          accessTelemetry: 'الوصول إلى التحكم'
        }
      },
      products: {
        badge: 'محفظة المنتجات',
        title: 'أنظمة متميزة لبيئات تشغيل متميزة',
        description: 'نقوم الآن بتقسيم المحفظة بشكل أكثر وضوحاً: MZ-1 لاستعادة أبخرة التجزئة، و MZ-9000 لبيئات الخزانات والمحطات الأكبر، بالإضافة إلى فئات الحلول المجاورة للبرامج الصناعية المخصصة.',
        flagship: [
          {
            name: 'MZ-1',
            label: 'استعادة بخار التجزئة',
            description: 'مصمم للمحطات ومحطات الخدمة حيث يهم التحكم في الرائحة والتقاط الانبعاثات في بيئة مدمجة.',
            metrics: ['بصمة مركزة على التجزئة', 'تحسين ظروف الرائحة في الموقع', 'استرداد ومراقبة مستمرة'],
            cta: 'استكشف تقنية MZ-1'
          },
          {
            name: 'MZ-9000',
            label: 'استعادة المحطات / حقول الخزانات',
            description: 'تم بناؤه لبيئات التخزين والنقل الأكبر حيث يهم حجم الإنتاج والجاهزية للمناطق الخطرة.',
            metrics: ['بيئات إنتاج عالية', 'هندسة على مستوى المحطة', 'مصمم للتكامل مع ضوابط الموقع'],
            cta: 'تحدث إلى الهندسة'
          },
          {
            name: 'فلتر الطاقة',
            label: 'جودة الطاقة',
            description: 'أداة متخصصة في إدارة الطاقة لضمان الاستقرار الكهربائي وحماية الإلكترونيات الحساسة.',
            metrics: ['تصنيف مستمر للخدمة الشاقة', 'تكامل آمن من الفشل', 'قياس عن بعد في الوقت الفعلي'],
            cta: 'ناقش المواصفات الفنية'
          },
          {
            name: 'W2E',
            label: 'تحويل النفايات إلى طاقة',
            description: 'تحويل المواد العضوية المتطايرة المسترجعة إلى طاقة قابلة للاستخدام في عمليات المرافق المستمرة.',
            metrics: ['هندسة ذاتية الطاقة', 'أقصى استفادة من الموارد', 'مخرجات خالية من الانبعاثات'],
            cta: 'اقرأ المزيد'
          }
        ],
        cta: {
          mz1: 'اكتشف تقنية MZ1',
          terminal: 'تحدث إلى الهندسة',
          power: 'ناقش المواصفات الفنية',
          learnMore: 'تعلم المزيد'
        },
        solutions: {
          title: 'فئات الحلول المجاورة',
          custom: { title: 'الهندسة المخصصة', subtitle: 'MZ Custom', description: 'أنظمة مصممة خصيصاً لتدفقات أو مساحات أو مناخات أو قيود مرافق غير عادية.' },
          fuel: { title: 'معالجة الوقود', subtitle: 'MZ-MFT', description: 'سير عمل تحسين الجودة لتيارات الوقود المستعادة أو المخلوطة.' },
          heat: { title: 'التقاط الحرارة', subtitle: 'MZ-HC', description: 'مفاهيم الاسترداد لتيارات النفايات الحرارية وتحسينات الكفاءة الصناعية.' },
          efficiency: { title: 'خدمات الكفاءة', subtitle: 'MZ-ESCO', description: 'نماذج تسليم قائمة على الأداء لمشاريع تحسين الطاقة والعمليات.' }
        }
      },
      technology: {
        badge: 'نظرة عامة على التقنية',
        title: 'رؤية شاملة لكيفية عمل المنصة من ارتفاع 50,000 قدم',
        description: 'قبل الدخول في تفاصيل مستوى المكونات، يمكن فهم النظام في ثلاث طبقات: التقاط الأبخرة، والاسترداد الحراري، والتحكم الذكي. اختر المنتج الذي تريد استكشافه بعد ذلك.',
        cards: {
          capture: { title: 'الالتقاط', text: 'يقوم MZ-1 باعتراض أبخرة الهيدروكربون المزاحة قبل هروبها إلى الغلاف الجوي.' },
          condense: { title: 'التكثيف', text: 'عملية تبريد واسترداد محكومة تحول البخار مرة أخرى إلى منتج سائل مفيد.' },
          control: { title: 'التحكم', text: 'تحافظ الحساسات والمنطق والتحكم عن بعد على استقرار النظام مع إنشاء بيانات تشغيل جاهزة للتدقيق.' }
        },
        schematic: {
          mz1: 'دخول مخطط MZ-1',
          mz9000: 'عرض نظرة عامة على MZ-9000',
          title: 'مخطط MZ-1',
          description: 'استكشف تخطيط مكونات MZ-1. اسحب للتدوير، ومرر للتكبير، وانقر على المكونات لفحص بنية النظام بمزيد من التفصيل.'
        }
      },
      financial: {
        badge: 'النموذج المالي',
        title: 'اجعل استرجاع الأبخرة مرئياً في الأرباح والخسائر',
        description: 'تحمل هذه الصفحة الآن مقدر ROI البسيط مباشرة، حتى يمكن للفرق رؤية عوائد الاسترداد ومنطق مشاركة الإيرادات والقيمة الاستراتيجية.',
        cards: {
          capex: { title: 'هيكل Zero-CapEx', text: 'الحفاظ على السيولة النقدية مع الاستمرار في نشر البنية التحتية للاسترداد.' },
          value: { title: 'قيمة المنتج المستعاد', text: 'تحويل البخار المزاح إلى مخزون قابل للبيع وهامش ربح متكرر.' },
          risk: { title: 'نموذج متوافق مع المخاطر', text: 'تبقى حوافز الأداء والخدمة مرتبطة بوقت التشغيل والاسترداد.' },
          product: { title: 'اقتصاديات المنتج المستعاد', text: 'تحسين استراتيجيات المبيعات للوقود السائل المستعاد لتحقيق أقصى قدر من الأرباح.' }
        },
        newsroom: {
          badge: 'غرفة الأخبار',
          title: 'رؤى الصناعة وتحديثات MZ',
          description: 'تابع أحدث رؤانا حول البنية التحتية للطاقة والامتثال البيئي وتكنولوجيا استعادة البخار.',
          articles: [
            {
              id: '1',
              date: '15 مارس 2024',
              category: 'تكنولوجيا',
              title: 'MZ-9000 Pro يحقق كفاءة استرداد بنسبة 99.8٪',
              excerpt: 'في الاختبارات الميدانية الأخيرة في محطة هيوستن، تجاوز نظامنا الرائد معايير الانبعاثات.',
              content: 'أكمل فريقنا الهندسي بنجاح اختباراً لمدة 30 يوماً في واحدة من أكبر محطات نقل الوقود في هيوستن. أظهرت النتائج كفاءة استرداد بخار تزيد باستمرار عن 99.8٪.'
            },
            {
              id: '2',
              date: '28 فبراير 2024',
              category: 'شراكة',
              title: 'MasarZero تعلن عن تحالف استراتيجي مع عملاق اللوجستيات العالمي',
              excerpt: 'شراكة جديدة تهدف إلى توفير بنية تحتية للاسترداد لـ 50 مركز توزيع رئيسياً حول العالم.',
              content: 'يسعدنا الإعلان عن شراكة لعدة سنوات مع شركة لوجستية عالمية رائدة. ستشهد هذه المبادرة نشر تقنية MZ في مراكز دولية رئيسية على مراحل خلال الـ 18 شهراً القادمة.'
            },
            {
              id: '3',
              date: '10 فبراير 2024',
              category: 'نشر',
              title: 'أول عملية تجارية في سوق جنوب شرق آسيا',
              excerpt: 'نشر ناجح لنظام MZ في ميناء سنغافورة، مما يمثل بداية التوسع في منطقة آسيا والمحيط الهادئ.',
              content: 'يمثل أول نشر لنا في سنغافورة علامة فارقة لشركة MasarZero. تعمل المنشأة الآن بمنطق الاسترداد المؤتمت بالكامل الخاص بنا، مما يوفر معياراً للمشاريع المستقبلية في المنطقة.'
            }
          ]
        },
        gallery: {
          badge: 'رحلة بصرية',
          title: 'الاسترداد في العمل',
          description: 'استكشف عمليات النشر العالمية ومرافق البحث والتطوير ومراكز العمليات لدينا.',
          items: [
            { title: 'محطة هيوستن', subtitle: 'نشر MZ-9000 Pro' },
            { title: 'مركز القيادة', subtitle: 'عمليات الشبكة 24/7' },
            { title: 'التصنيع الدقيق', subtitle: 'التميز الهندسي' },
            { title: 'مرفق البحث والتطوير', subtitle: 'اختبار الجيل القادم' },
            { title: 'التكامل في الموقع', subtitle: 'تحديث سلس' },
            { title: 'اللوجستيات العالمية', subtitle: 'تميز سلسلة التوريد' }
          ]
        },
        legal: {
          badge: 'إطار الامتثال',
          title: 'المركز القانوني والامتثال',
          description: 'الشفافية والأمان هما حجر الزاوية في عملياتنا.',
          sections: {
            terms: {
              title: 'شروط الخدمة',
              summary: 'تحكم وصولك إلى تقنيتنا وخدماتنا الخاصة.',
              content: 'من خلال الوصول إلى خدمات MasarZero ("MZ") أو استخدامها، فإنك توافق على الالتزام بشروط الخدمة هذه.'
            },
            privacy: {
              title: 'سياسة الخصوصية',
              summary: 'كيف نجمع البيانات التشغيلية ونشفرها ونحميها.',
              content: 'تلتزم MZ بحماية بياناتك. توضح هذه السياسة كيفية تعاملنا مع المعلومات التي تولدها أنظمتنا.'
            },
            compliance: {
              title: 'الامتثال التنظيمي',
              summary: 'الالتزام بمعايير EPA و CARB و ATEX والمعايير البيئية العالمية.',
              content: 'تم تصميم تقنيتنا لتلبية وتجاوز اللوائح البيئية الصارمة.'
            },
            cookies: {
              title: 'سياسة ملفات تعريف الارتباط',
              summary: 'استخدام شفاف لملفات تعريف الارتباط الأساسية والتحليلية.',
              content: 'يستخدم موقعنا الحد الأدنى من ملفات تعريف الارتباط لتحسين تجربة المستخدم.'
            }
          },
          certifications: [
            { name: 'ISO 9001:2015', status: 'نشط' },
            { name: 'توجيه ATEX', status: 'نشط' },
            { name: 'معتمد من SGS', status: 'نشط' },
            { name: 'API Spec Q1', status: 'معلق' },
            { name: 'امتثال EPA', status: 'معلق' },
            { name: 'متوافق مع CARB', status: 'معلق' }
          ]
        },
        scada: {
          badge: 'PinnacleOS',
          title: 'الجيل القادم من SCADA',
          description: 'طبقة تشغيل واحدة تربط قياسات الماكينة عن بُعد وحالات الإنذار وسياق الخدمة والتقارير التجارية.',
          features: {
            logic: { title: 'منطق الاسترداد الذكي', text: 'تعديلات تلقائية في الوقت الفعلي لمعايير التشغيل بناءً على التدفق ودرجة الحرارة والضغط.' },
            remote: { title: 'تحكم آمن عن بُعد', text: 'عمليات عن بُعد مراقبة مع مصادقة متعددة الطبقات وسجلات تدقيق.' },
            audit: { title: 'مسار تدقيق الامتثال', text: 'تقارير انبعاثات يتم إنشاؤها تلقائياً وتتوافق مع المعايير التنظيمية العالمية.' },
            service: { title: 'الصيانة التنبؤية', text: 'تحديد علامات فشل المكونات باستخدام الذكاء الاصطناعي للتدخل قبل حدوث التوقف.' }
          },
          screenshots: [
            { title: 'نظرة عامة على العمليات', text: 'رؤية تشغيلية أساسية لأداء المحطة والأسطول.' },
            { title: 'التنبيهات ومعالجة المشكلات', text: 'رؤية الإنذارات، وتدفقات الإقرار، وسياق التصعيد.' },
            { title: 'رؤية تجارية', text: 'القيمة المستعادة، وإشارات الهامش، والملخصات المالية المرتبطة بالعمليات.' },
            { title: 'التحكم عن بُعد', text: 'إجراءات عن بُعد خاضعة للإشراف وسير عمل الأوامر للفرق المؤهلة.' }
          ]
        },
        contact: {
          badge: 'اتصل بنا',
          title: 'تواصل معنا',
          description: 'سواء كنت مهتماً بالتكنولوجيا أو الشراكات أو الفرص المهنية، فنحن هنا للمساعدة.',
          offices: [
            { city: 'كاليفورنيا', country: 'الولايات المتحدة', type: 'مركز الولايات المتحدة', address: 'سيليكون فالي، كاليفورنيا' },
            { city: 'دبي', country: 'الإمارات', type: 'مقر الشرق الأوسط', address: 'مركز دبي المالي العالمي، دبي' },
            { city: 'سنغافورة', country: 'سنغافورة', type: 'مركز آسيا والمحيط الهادئ', address: 'مارينا باي، سنغافورة' }
          ],
          departments: [
            { name: 'الاستفسارات العامة', desc: 'أسئلة ومعلومات عامة.' },
            { name: 'الدعم الفني', desc: 'دعم ميداني وعن بُعد على مدار الساعة طوال أيام الأسبوع للعملاء الحاليين.' },
            { name: 'الشراكات', desc: 'استكشاف فرص التعاون التجاري.' }
          ]
        },
        oldStandard: {
          title: 'المعيار القديم',
          capex: { title: 'نفقات رأسمالية ضخمة مقدماً', text: 'المشتريات الكبيرة تضرب الميزانيات قبل إثبات قيمة الاسترداد.' },
          payback: { title: 'رؤية بطيئة لاسترداد التكاليف', text: 'تكافح الفرق لربط ضوابط الانبعاثات بالجانب المالي المباشر.' },
          risk: { title: 'المالك يتحمل مخاطر الأداء', text: 'تقع مسؤولية التوقف وعبء الدعم وعدم اليقين في الصيانة على عاتق الموقع.' }
        },
        masarzeroModel: {
          title: 'نموذج MasarZero',
          capital: { title: 'نشر خفيف رأس المال', text: 'يحافظ العملاء على رأس المال مع الاستمرار في فتح عوائد الاسترداد.' },
          clarity: { title: 'وضوح مشاركة الإيرادات', text: 'تصبح قيمة المنتج المستعاد مرئية وقابلة للتفسير والمشاركة.' },
          upside: { title: 'مزايا إضافية ثانوية', text: 'تعمل الانبعاثات المنخفضة ودعم الامتثال وروايات سوق الكربون على تعزيز حالة الاستثمار.' }
        },
        estimator: {
          title: 'مقدر عائد الاستثمار البسيط',
          subtitle: 'أداة تخطيط خفيفة لمحادثات مشاركة الإيرادات. اضبط معدل التدفق، وعدد المحطات، وسعر الوقود لرؤية تقدير توجيهي للأرباح.',
          volume: 'حجم البخار اليومي (لتر)',
          stations: 'عدد المحطات',
          fuelPrice: 'سعر الوقود ($/لتر)',
          results: {
            title: 'المخرجات المتوقعة',
            dailyRecovered: 'الاسترداد اليومي (لتر)',
            yearlyProfit: 'الربح السنوي للعميل ($)',
            cumulative: 'توقعات الأرباح التراكمية',
            modelOutput: 'مخرجات النموذج',
            recoveredLiters: 'اللترات المستردة / اليوم',
            annualProfit: 'الربح السنوي للعميل',
            fiveYear: 'تراكمي 5 سنوات',
            benchmark: 'تقدير توجيهي يعتمد على معيار استرداد بنسبة 0.15٪ وحصة عميل بنسبة 20٪.'
          }
        }
      },
      data: {
        badge: 'محرك التحقق',
        title: 'مقاييس جودة البنزين والاسترداد',
        description: 'رؤية عميقة للنزاهة الكيميائية. نحن لا نستعيد البخار فحسب؛ بل نعيده إلى سلسلته السائلة المحددة دون المساومة على درجات الأوكتان أو معايير التطاير.',
        lab: {
          title: 'مختبر التحليل التفاعلي',
          description: 'محاكاة عملية التحقق من MasarZero. انقر فوق "تحليل عينة جديدة" لمعالجة درجات الوقود المختلفة من محطاتنا العالمية وعرض التفاصيل الكيميائية التفصيلية.',
          input: 'عينة الإدخال',
          source: 'المصدر',
          terminal: 'المحطة',
          analyze: 'تحليل عينة جديدة',
          verified: 'المخرجات المؤكدة',
          rotate: 'أدر العينة لبدء التحليل.',
          complete: 'اكتمل التحليل. تم التحقق من النتائج.',
          standards: {
            title: 'التحقق الكيميائي',
            industry: 'معيار الصناعة',
            output: 'مخرجات MasarZero',
            analysis: 'تحليل'
          }
        },
        comparison: {
          advanced: {
            badge: 'MasarZero VRU',
            title: 'النظام المتقدم',
            subtitle: 'قمة تكنولوجيا استرداد البخار.',
            energy: { title: '250x عائد الطاقة', desc: 'توليد 250 مرة من الطاقة التي يستهلكها.' },
            performance: { title: '5 مرات أفضل من المنافسين', desc: 'يتفوق على أقرب منافس بعامل خمسة.' },
            recovery: { title: '99% معدل الاسترداد', desc: 'التقاط جميع الأبخرة القيمة تقريبًا، مما يضمن تقليل النفايات.' }
          },
          conventional: {
            badge: 'VRU التقليدي',
            title: 'التقنية الموروثة',
            subtitle: 'أنظمة الكربون التقليدية وأنظمة الأغشية.',
            energy: { title: '1:1 نسبة الطاقة', desc: 'تكاليف تشغيل عالية مقارنة بمخرجات الاسترداد.' },
            maintenance: { title: 'تغييرات متكررة في الوسائط', desc: 'توقف متكرر لاستبدال طبقة الكربون.' },
            efficiency: { title: '80-85% استرداد', desc: 'لا تزال انبعاثات هاربة كبيرة غير ملتقطة.' }
          }
        },
        validation: {
          title: 'التحقق المستقل من الاسترداد',
          cu: 'استرداد Control Union',
          sgs: 'استرداد SGS'
        },
        reports: {
          title: 'تقارير اختبار البنزين',
          jordan: 'بيانات اختبار البنزين في الأردن',
          korea: 'بيانات اختبار البنزين في كوريا',
          liveTelemetry: 'القياس عن بُعد المباشر'
        }
      },
      scada: {
        badge: 'تقديم PinnacleOS',
        title: 'الطبقة التشغيلية خلف المعدات',
        description: 'التحكم عن بعد في الماكينة، وحالات التنبيه، وسياق الخدمة، والتقارير التجارية في طبقة تشغيل واحدة.',
        whatItDoesTitle: 'ما تفعله المنصة فعلياً',
        whatItDoesDesc1: 'يربط PinnacleOS القياس عن بُعد للآلة وحالات التنبيه وسياق الخدمة والتقارير التجارية في طبقة تشغيل واحدة. يمنح الفرق مكاناً واحداً لفهم أداء نظام الاسترداد وما يحتاج إلى اهتمام.',
        whatItDoesDesc2: 'بدلاً من التعامل مع SCADA كغلاف مرئي، يُقدَّم المنتج هنا كعمود فقري تشغيلي: رؤية الآلة، ومعالجة الاستثناءات، وتنسيق الدعم عن بُعد، وانضباط التقارير.',
        labels: { alerts: 'التنبيهات', telemetry: 'القياس عن بُعد', reports: 'التقارير', service: 'الخدمة' },
        values: { alerts: 'معالجة الاستثناءات', telemetry: 'سياق مباشر + تاريخي', reports: 'مخرجات تشغيلية وامتثالية', service: 'الفرز عن بُعد والاستجابة الموجهة' },
        productViewsTitle: 'عروض المنتج',
        productViewsDesc: 'لقطات الشاشة الحقيقية أكثر فائدة من لوحة تفاعلية محاكاة، لذا يعرض هذا القسم الآن المنصة في عروض أوضح قائمة على الأدوار.',
        animation: {
          tagline: 'نظام التشغيل للاستدامة الصناعية.',
          processing: 'معالجة',
          flowRate: 'معدل التدفق',
          pressure: 'الضغط',
          recoveryTrend: 'اتجاه كفاءة الاسترداد',
          systemAlerts: 'تنبيهات النظام',
          filterMaintenance: 'صيانة الفلتر',
          deltaP: 'فرق الضغط > 2.5 PSI',
          remoteOps: 'العمليات عن بُعد',
          telemetry: 'القياس عن بُعد في الوقت الفعلي',
          telemetryDesc: 'رؤية فورية لمعدلات التدفق والضغوط.',
          predictiveAlerts: 'التنبيهات التنبؤية',
          predictiveDesc: 'تكتشف تشخيصات الذكاء الاصطناعي الشذوذات قبل حدوث الأعطال.',
          remoteCommand: 'الأوامر عن بُعد',
          remoteCommandDesc: 'تحكم آمن ومشفر من أي مكان في العالم.',
        },
        features: {
          logic: { title: 'منطق التحكم بالإضافة إلى التحكم عن بعد', text: 'يربط PinnacleOS حالات الماكينة الحقيقية والتنبيهات ومنطق التشغيل.' },
          remote: { title: 'الرؤية عن بعد', text: 'يمكن للمشغلين رؤية سلوك الماكينة والاتجاهات والسياق التاريخي.' },
          audit: { title: 'تقارير جاهزة للتدقيق', text: 'تاريخ التشغيل ومعالجة الاستثناءات منظمة لدعم الامتثال والخدمة.' },
          service: { title: 'سير عمل دعم الخدمة', text: 'منظم لدعم الفرز عن بعد والاستجابة الميدانية الموجهة والحل الأسرع.' }
        },
        screenshots: [
          { title: 'نظرة عامة على العمليات', text: 'رؤية تشغيلية أساسية لأداء المحطة والأسطول.' },
          { title: 'التنبيهات ومعالجة المشكلات', text: 'رؤية التنبيهات وسير عمل الإقرار وسياق التصعيد.' },
          { title: 'الرؤى التجارية', text: 'قيمة الاسترداد وإشارات الربح والملخص المالي المرتبط بالعمليات.' },
          { title: 'التحكم عن بُعد', text: 'العمليات عن بُعد المُشرف عليها وسير عمل الأوامر للفرق المؤهلة.' },
        ],
      },
      cycle: {
        badge: 'ديناميكيات التدفق المتقدمة',
        title: 'نظام الدورة',
        description: 'تحقق MasarZero سعة هائلة دون الحاجة إلى أجهزة ضخمة عن طريق تحويل بنيتك التحتية الحالية إلى مخزن ضغط ديناميكي.',
        diagram: {
          groundLevel: 'مستوى الأرض',
          vaporSpace: 'فضاء البخار',
          liquidFuel: 'الوقود السائل',
          buffer: 'المخزن المؤقت',
          vruCore: 'نواة VRU',
          processing: 'معالجة',
          vaporIntake: 'مدخل البخار',
          excessReturn: 'العودة الزائدة',
          liquidRecovery: 'استرداد سائل',
        },
        features: {
          battery: { title: 'بطارية البخار', text: 'يستخدم النظام مساحة البخار في خزان التخزين السفلي (UST) كمخزن، حيث يتم تخزين الضغط الزائد أثناء أوقات التفريغ القصوى بدلاً من تنفيسه.' },
          time: { title: 'تمدد الوقت', text: 'نقوم بتوزيع حمل تفريغ شاحنة مدته 15 دقيقة على مدار 60 دقيقة. هذا يسمح لآلة أصغر وأكثر كفاءة في استهلاك الطاقة بالتعامل مع التدفقات الصناعية الكبيرة.' },
          waste: { title: 'صفر نفايات', text: 'من خلال الحفاظ على النظام في حلقة مغلقة حتى أثناء الضغط الأقصى، نضمن عدم هروب انبعاثات متطايرة إلى الغلاف الجوي، مما يزيد من عائد الاسترداد.' }
        }
      },
      newsroom: {
        badge: 'رابط الوسائط',
        title: 'الأخبار والسجلات',
        featured: 'قصة مميزة',
        searchPlaceholder: 'البحث في السجلات...',
        readFull: 'قراءة التقرير الكامل',
        accessLog: 'سجل الوصول',
        mediaUplink: 'رابط الوسائط',
        pressKit: 'وصول آمن // ملف صحفي',
        pressContact: 'الاتصال الصحفي'
      },
      investor: {
        badge: 'علاقات المستثمرين',
        title: 'محطة المستثمرين',
        updated: 'آخر تحديث',
        contact: 'اتصل بعلاقات المستثمرين',
        prospectus: 'نشرة الإصدار 2024',
        thesis: 'أطروحة الاستثمار',
        catalysts: 'المحفزات القادمة',
        dataRoom: {
          title: 'غرفة البيانات',
          docName: 'اسم المستند',
          type: 'النوع',
          date: 'التاريخ',
          action: 'إجراء'
        },
        metrics: {
          revenue: 'الإيرادات (TTM)',
          margin: 'هامش الربح الإجمالي',
          deployments: 'عمليات النشر',
          retention: 'الاحتفاظ'
        }
      },
      roi: {
        badge: 'النمذجة الدقيقة',
        title: 'محرك ROI',
        description: 'قم بتكوين معايير التشغيل لنمذجة نتائج مالية دقيقة. بدّل بين التقدير السريع والتحليل المالي الشامل.',
        switcher: {
          quick: 'تقدير سريع',
          deep: 'نموذج التعمق'
        },
        openCalc: 'فتح الحاسبة المخصصة'
      },
      digitalTwin: {
        badge: 'تم تهيئة النظام',
        title: 'التوأم الرقمي',
        description: 'حدد بيئة المنشأة لتهيئة نواة محاكاة MasarZero VRU.',
        initialize: 'بدء المحاكاة',
        retail: {
          title: 'محطة تجزئة',
          subtitle: 'بيئة حضرية',
          description: 'محاكاة دورات التزود بالوقود عالية التكرر وإزاحة البخار في تكوين خزان سفلي قياسي.'
        },
        terminal: {
          title: 'محطة تخزين',
          subtitle: 'مركز صناعي',
          description: 'نمذجة كفاءة استرداد البخار على نطاق واسع لمزارع تخزين السوائل السائبة ومحطات التوزيع.'
        }
      },
      library: {
        badge: 'الأرشيف الرقمي',
        title: 'المكتبة التقنية',
        description: 'تجمع المكتبة الآن المواد بوضوح أكبر، وتعرض الصور المصغرة للمستندات، وتعرض إجراءات تالية بسيطة للمراجعة أو التنزيل أو طلب حزمة الملفات الكاملة.',
        categories: {
          all: 'الكل',
          spec: 'ورقة المواصفات',
          whitepaper: 'ورقة بيضاء',
          caseStudy: 'دراسة حالة',
          guide: 'دليل'
        },
        search: 'البحث عن المستندات...',
        actions: {
          view: 'عرض PDF',
          download: 'تنزيل',
          request: 'طلب الحزمة الكاملة'
        },
        items: {
          specs: { title: 'أوراق المواصفات', text: 'معلومات الأبعاد والمرافق وملاءمة المنتج.' },
          commercial: { title: 'الأوراق التجارية', text: 'عائد الاستثمار واقتصاديات النشر وروايات استيلاء القيمة.' },
          field: { title: 'الأدلة الميدانية', text: 'التثبيت والتكليف والوثائق الموجهة للخدمة.' }
        }
      },
      support: {
        badge: 'مركز العمليات',
        title: 'الدعم والصيانة',
        description: 'دعم فني شامل، وأدلة استكشاف الأخطاء وإصلاحها، وجداول الصيانة لضمان استمرار عمل أنظمة MasarZero بأعلى كفاءة.',
        tabs: {
          troubleshooting: 'استكشاف الأخطاء وإصلاحها',
          maintenance: 'جدول الصيانة',
          contact: 'اتصل بالدعم'
        },
        contact: {
          title: 'قنوات الدعم المباشر',
          subtitle: 'فرقنا الفنية متاحة للتنسيق الفوري بشأن قضايا النظام الحرجة أو تخطيط الصيانة الروتينية.',
          hotline: 'الخط الساخن العالمي',
          email: 'البريد الإلكتروني التقني',
          office: 'المركز الإقليمي'
        }
      },
      knowledgeBase: {
        badge: 'الدليل الفني المتكامل v2.4',
        title: 'مركز المعرفة',
        description: 'الوثائق الفنية الرسمية وإجراءات التشغيل وبروتوكولات الصيانة لأنظمة MasarZero.',
        searchPlaceholder: 'ابحث في الدليل (مثل: "الضاغط"، "السلامة")...',
        topicsFound: 'موضوع',
        searchResults: 'نتائج البحث عبر جميع الفئات:',
        noResults: 'لا توجد نتائج لـ',
        tryAnother: 'جرب مصطلح بحث مختلف أو تصفح حسب الفئة.',
        refId: 'رقم المرجع:',
        categories: {
          overview: 'نظرة عامة على النظام',
          safety: 'بروتوكولات السلامة',
          installation: 'التركيب والخدمات اللوجستية',
          maintenance: 'الصيانة',
          troubleshooting: 'استكشاف الأخطاء',
        },
      },
      installationGuide: {
        badge: 'النشر الميداني',
        title: 'دليل التركيب',
        spatialView: 'عرض مكاني',
        schematicView: 'عرض تخطيطي',
        actionItems: 'بنود العمل',
        back: 'رجوع',
        nextStep: 'الخطوة التالية',
        finish: 'إنهاء',
      },
      maintenanceGuide: {
        badge: 'الوثائق الفنية v2.4',
        title: 'دليل الصيانة',
        description: 'أدلة إصلاح شاملة ومخططات توصيل وبروتوكولات استكشاف الأخطاء للفنيين المعتمدين من MasarZero.',
        downloadSheet: 'تنزيل الورقة',
        module: 'الوحدة:',
        sheets: {
          daily: 'قائمة فحص المشغل اليومية',
          weekly: 'قائمة التفتيش الأسبوعية',
          quarterly: 'ورقة عمل الخدمة الفصلية',
        },
        intervals: {
          daily: 'يومي',
          weekly: 'أسبوعي',
          quarterly: 'ربع سنوي',
        },
        severity: {
          critical: 'حرج',
          high: 'عالٍ',
          planned: 'مخطط',
        },
      },
      vruTesting: {
        badge: 'مختبر صوتي',
        title: 'بروتوكول التحقق من VRU',
        description: 'بيئة اختبار تفاعلية للتحقق الصوتي والأدائي لوحدة استرداد البخار.',
      },
      acceptanceTest: {
        badge: 'ضمان الجودة',
        title: 'بروتوكول القبول',
        inProgress: 'قيد التنفيذ',
        complete: 'مكتمل',
        exportPdf: 'تصدير PDF',
        sectionStatus: 'حالة القسم',
        authorization: 'التفويض والتوقيع',
        lastCompleted: 'آخر إتمام',
        asRequired: 'حسب الحاجة',
        trackManually: '(تتبع يدوي)',
        setDate: 'تحديد التاريخ',
        overdue: 'متأخر بـ',
        dueToday: '(مستحق اليوم)',
        dueIn: 'مستحق خلال',
        signHere: 'وقّع هنا',
        nameTitlePlaceholder: 'الاسم والمسمى الوظيفي',
        dateSigned: 'تاريخ التوقيع',
        signatureRequired: 'التوقيع مطلوب',
        type: 'كتابة',
        draw: 'رسم',
        upload: 'رفع',
        clickToUpload: 'انقر لرفع صورة',
        observations: 'ملاحظات...',
      },
      sidebar: {
        liveTrends: 'الاتجاهات المباشرة',
        pumpStatus: 'حالة المضخة المباشرة',
        speed: 'السرعة',
        pressure: 'الضغط',
        systemStatus: 'حالة النظام',
        specSheet: 'ورقة المواصفات',
        nextPart: 'الجزء التالي',
        flowRate: 'معدل التدفق'
      },
      legal: {
        badge: 'الإطار التنظيمي',
        title: 'المركز القانوني',
        description: 'الشفافية والأمان هما ركيزة عملياتنا. الوصول إلى أطرنا التنظيمية وشروط الاستخدام ومحفظة الشهادات.',
        wallTitle: 'جدار الثقة',
        wallDesc: 'نلتزم بأعلى المعايير العالمية لإدارة الجودة والسلامة والبيئة.',
        quickSummary: 'ملخص سريع',
        collapseDetails: 'طي التفاصيل',
        close: 'إغلاق',
        active: 'نشط',
        pending: 'معلق',
        sections: {
          terms: { title: 'شروط الخدمة', summary: 'تحكم وصولك إلى تقنيتنا الخاصة وخدماتنا.', buttonText: 'قراءة الشروط الكاملة' },
          privacy: { title: 'سياسة الخصوصية', summary: 'كيف نجمع البيانات التشغيلية ونشفرها ونحميها.', buttonText: 'قراءة السياسة الكاملة' },
          compliance: { title: 'الامتثال التنظيمي', summary: 'الالتزام بمعايير EPA وCARB وATEX والمعايير البيئية العالمية.', buttonText: 'عرض المعايير' },
          cookies: { title: 'سياسة ملفات تعريف الارتباط', summary: 'الاستخدام الشفاف لملفات تعريف الارتباط الأساسية والتحليلية.', buttonText: 'إدارة التفضيلات' },
        },
      },
    },
    footer: {
      counterTitle: 'إجمالي لترات الوقود المستعاد لعملائنا',
      tagline: 'استرداد ذكي. عوائد ملموسة.',
      categories: {
        solutions: 'الحلول',
        impact: 'الأثر',
        resources: 'الموارد',
        company: 'الشركة',
      },
      dataPerformance: 'البيانات والأداء',
      copyright: 'جميع الحقوق محفوظة لشركة MasarZero Technologies.',
    },
  },
} as const;


const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

const isRtlLanguage = (language: SupportedLanguage) => language === 'ar';

const resolveTranslation = (language: SupportedLanguage, key: string, options?: TranslationOptions): any => {
  const parts = key.split('.');
  let current: unknown = translations[language];

  for (const part of parts) {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      current = undefined;
      break;
    }
    current = (current as Record<string, unknown>)[part];
  }

  if (current !== undefined) {
    if (typeof current === 'string') return current;
    if (options?.returnObjects && (typeof current === 'object' || Array.isArray(current))) return current;
  }

  // Fallback to English
  let fallback: unknown = translations.en;
  for (const part of parts) {
    if (typeof fallback !== 'object' || fallback === null || !(part in fallback)) {
      return options?.defaultValue || (options?.returnObjects ? [] : key);
    }
    fallback = (fallback as Record<string, unknown>)[part];
  }

  if (fallback !== undefined) {
    if (typeof fallback === 'string') return fallback;
    if (options?.returnObjects && (typeof fallback === 'object' || Array.isArray(fallback))) return fallback;
  }

  return options?.defaultValue || (options?.returnObjects ? [] : key);
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    return saved && languageOptions.some(option => option.code === saved) ? saved : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtlLanguage(language) ? 'rtl' : 'ltr';
    document.body.dir = isRtlLanguage(language) ? 'rtl' : 'ltr';
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      languageOptions,
      t: (key: string, options?: TranslationOptions) => resolveTranslation(language, key, options),
    }),
    [language],
  );

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }

  return context;
};
