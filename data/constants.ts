
export enum PipelineStage {
    Prospect = 'Prospect',
    Qualified = 'Qualified',
    Proposal = 'Proposal',
    OnHold = 'On Hold',
    AwaitingFunding = 'Awaiting Internal Funding',
    ClosedWon = 'Closed Won',
    ClosedLost = 'Closed Lost',
}

export enum CompanyType {
    Government = 'GOVERNMENT',
    Public = 'PUBLIC',
    Private = 'PRIVATE',
}

export interface DealOrigin {
    name: string;
    title: string;
    avatarUrl?: string;
}

export interface Payout {
    name: string;
    percentage: number;
}

export interface Attachment {
    name: string;
    url: string;
    type: string;
    uploadedAt: string;
}

export interface Client {
    id: number;
    name: string;
    domain: string;
    logoUrl?: string;
    stage: PipelineStage;
    demand: string;
    potential: {
        directSales: {
            units: number;
            pricePerUnit: number;
            costPerUnit: number; // Base manufacturing cost
        };
        leaseModel: {
            units: number;
            monthlyLease: number;
            termMonths: number;
        };
    };
    nextStep: string;
    location: string;
    marketKey: string;
    companyType: CompanyType;
    stationCount: string;
    dealOrigin: DealOrigin;
    payouts: Payout[];
    attachments?: Attachment[];
}

export interface MarketLogistics {
    destinationPort: string;
    distance: number; // in KM from a central point
    dutyRate: number; // percentage
    vatRate: number; // percentage
}


export const FREIGHT_COST_PER_UNIT_KM = 0.5;

export const MARKET_LOGISTICS_DATA: { [key: string]: MarketLogistics } = {
  'Jordan': { destinationPort: 'Aqaba / Amman', distance: 13200, dutyRate: 0.0, vatRate: 0.16 },
  'Lebanon': { destinationPort: 'Beirut', distance: 11500, dutyRate: 0.05, vatRate: 0.11 },
  'GCC': { destinationPort: 'Jebel Ali', distance: 10630, dutyRate: 0.05, vatRate: 0.05 },
  'USA': { destinationPort: 'LA', distance: 10500, dutyRate: 0.0, vatRate: 0.0885 },
  'Brazil': { destinationPort: 'Santos', distance: 13000, dutyRate: 0.15, vatRate: 0.18 },
  'India': { destinationPort: 'Mumbai', distance: 8745, dutyRate: 0.075, vatRate: 0.18 },
  'Pakistan': { destinationPort: 'Karachi', distance: 9920, dutyRate: 0.03, vatRate: 0.18 },
  'Azerbaijan': { destinationPort: 'Baku', distance: 8000, dutyRate: 0.0, vatRate: 0.18 },
  'Uzbekistan': { destinationPort: 'Tashkent', distance: 7000, dutyRate: 0.0, vatRate: 0.12 },
  'Turkey': { destinationPort: 'Istanbul', distance: 15385, dutyRate: 0.0, vatRate: 0.20 },
  'Italy': { destinationPort: 'Genoa', distance: 25587, dutyRate: 0.0, vatRate: 0.22 },
};

export const YA: DealOrigin = { name: 'Mr. Yalçın Aliyev', title: 'Senior Partner' };
export const ALK: DealOrigin = { name: 'Dr. A. Latif Alkhaja', title: 'Managing Director' };

export const MOCK_CLIENTS: Client[] = [
  // Prospect
  {
    id: 31,
    name: 'Indian Oil',
    domain: 'iocl.com',
    stage: PipelineStage.Prospect,
    demand: 'VRU implementation for their extensive retail network across India',
    potential: {
      directSales: { units: 50000, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 50000, monthlyLease: 450, termMonths: 120 },
    },
    nextStep: 'Awaiting technical specifications for pilot program.',
    location: 'New Delhi, India',
    marketKey: 'India',
    companyType: CompanyType.Government,
    stationCount: 'Over 30,000 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 3,
    name: 'QatarEnergy',
    domain: 'qatarenergy.qa',
    stage: PipelineStage.Prospect,
    demand: 'Nationwide retail station outfitting',
    potential: {
      directSales: { units: 200, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 200, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Conduct site-surveys for 5 flagship locations.',
    location: 'Doha, Qatar',
    marketKey: 'GCC',
    companyType: CompanyType.Government,
    stationCount: 'Over 120 stations (via WOQOD)',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 27,
    name: 'Hascol',
    domain: 'hascol.com',
    stage: PipelineStage.Prospect,
    demand: 'VRUs for network of 150 stations',
    potential: {
      directSales: { units: 1000, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 1000, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Initial quote provided, follow up in one week.',
    location: 'Karachi, Pakistan',
    marketKey: 'Pakistan',
    companyType: CompanyType.Public,
    stationCount: 'Over 600 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 2,
    name: 'ADNOC',
    domain: 'adnoc.ae',
    stage: PipelineStage.Prospect,
    demand: 'VRUs for all ADNOC Distribution service stations',
    potential: {
      directSales: { units: 750, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 750, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Initial contact to be made with retail operations manager.',
    location: 'Abu Dhabi, UAE',
    marketKey: 'GCC',
    companyType: CompanyType.Government,
    stationCount: 'Over 450 stations',
    dealOrigin: ALK,
    payouts: [{ name: 'Romin', percentage: 45 }, { name: 'Hari', percentage: 45 }, { name: 'Sevali', percentage: 10 }]
  },
  {
    id: 21,
    name: 'Petrobras',
    domain: 'petrobras.com.br',
    stage: PipelineStage.Prospect,
    demand: 'Nationwide VRU upgrade for BR Distribuidora retail network',
    potential: {
      directSales: { units: 12833, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 12833, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Connect with head of retail operations.',
    location: 'Rio de Janeiro, Brazil',
    marketKey: 'Brazil',
    companyType: CompanyType.Government,
    stationCount: 'Over 7,700 stations (via Petrobras Distribuidora)',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 22,
    name: 'PARCO',
    domain: 'parco.com.pk',
    stage: PipelineStage.Prospect,
    demand: 'VRU units for their expanding retail fuel station network',
    potential: {
      directSales: { units: 1250, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 1250, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Initial RFI received, schedule intro call with retail division.',
    location: 'Karachi, Pakistan',
    marketKey: 'Pakistan',
    companyType: CompanyType.Public,
    stationCount: 'Growing network',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
   {
    id: 33,
    name: 'UNG Petrol',
    domain: 'ung.uz',
    stage: PipelineStage.Prospect,
    demand: 'VRU units for their national network of stations',
    potential: {
      directSales: { units: 1333, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 1333, monthlyLease: 600, termMonths: 120 },
    },
    nextStep: 'Initial outreach to procurement department.',
    location: 'Tashkent, Uzbekistan',
    marketKey: 'Uzbekistan',
    companyType: CompanyType.Government,
    stationCount: 'Over 400 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 34,
    name: 'Aytemiz',
    domain: 'aytemiz.com.tr',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWVPpEBL43Qdcaw_djZxCk581wjTCAKxBkUA&s',
    stage: PipelineStage.Prospect,
    demand: 'VRU solutions for their network across Turkey',
    potential: {
      directSales: { units: 1900, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 1900, monthlyLease: 600, termMonths: 120 },
    },
    nextStep: 'Follow up on marketing material sent to operations lead.',
    location: 'Istanbul, Turkey',
    marketKey: 'Turkey',
    companyType: CompanyType.Private,
    stationCount: 'Over 570 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  
  // Qualified
  {
    id: 35,
    name: 'Azpetrol',
    domain: 'azpetrol.az',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Azpetrol_loqo.jpg',
    stage: PipelineStage.Qualified,
    demand: 'VRUs for their large network of premium stations',
    potential: {
      directSales: { units: 417, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 417, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Initial technical meeting completed, awaiting RFI response.',
    location: 'Baku, Azerbaijan',
    marketKey: 'Azerbaijan',
    companyType: CompanyType.Private,
    stationCount: 'Over 250 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
   {
    id: 9,
    name: 'JOil',
    domain: 'joil.com.sa',
    stage: PipelineStage.Qualified,
    demand: '30 VRU-100 units for regional station expansion',
    potential: {
      directSales: { units: 30, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 30, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Technical deep-dive scheduled post-pilot feedback review.',
    location: 'Jeddah, Saudi Arabia',
    marketKey: 'GCC',
    companyType: CompanyType.Private,
    stationCount: 'Approx. 30 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 25,
    name: 'SOCAR',
    domain: 'socar.az',
    logoUrl: 'https://media.licdn.com/dms/image/v2/C4D0BAQEeQHKQ8bJQOw/company-logo_200_200/company-logo_200_200/0/1630509348336/socartrading_logo?e=2147483647&v=beta&t=797jrAIXu2FE_-MOB3m9eTsB4LAmZLE5oFCpGkrD1Y8',
    stage: PipelineStage.Qualified,
    demand: 'Outfitting new and existing stations across Azerbaijan',
    potential: {
      directSales: { units: 667, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 667, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Technical deep-dive scheduled with retail engineering lead.',
    location: 'Baku, Azerbaijan',
    marketKey: 'Azerbaijan',
    companyType: CompanyType.Government,
    stationCount: 'Over 400 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
   {
    id: 26,
    name: 'PSO',
    domain: 'psopk.com',
    stage: PipelineStage.Qualified,
    demand: 'Fleet-wide VRU assessment for 500+ stations',
    potential: {
      directSales: { units: 5833, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 5833, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'NDA signed, awaiting site data from client.',
    location: 'Karachi, Pakistan',
    marketKey: 'Pakistan',
    companyType: CompanyType.Public,
    stationCount: 'Over 3,500 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 28,
    name: 'Wafi',
    domain: 'wafi.com.sa',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Wafi_Energy_Pakistan_logo.png/500px-Wafi_Energy_Pakistan_logo.png',
    stage: PipelineStage.Qualified,
    demand: 'VRUs for 25 new premium service stations',
    potential: {
      directSales: { units: 25, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 25, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Provide quote based on station blueprints.',
    location: 'Riyadh, Saudi Arabia',
    marketKey: 'GCC',
    companyType: CompanyType.Private,
    stationCount: 'Approx. 25 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
   {
    id: 10,
    name: 'Liter',
    domain: 'litergroup.com',
    logoUrl: 'https://litergroup.com/wp-content/uploads/2024/09/logo-vertical-white-.webp',
    stage: PipelineStage.Qualified,
    demand: 'VRUs for 15 new urban stations',
    potential: {
      directSales: { units: 15, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 15, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Provide quote based on preliminary assessment.',
    location: 'Dammam, Saudi Arabia',
    marketKey: 'GCC',
    companyType: CompanyType.Private,
    stationCount: 'Approx. 15 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },

  // Proposal
  {
    id: 1,
    name: 'Saudi Aramco',
    domain: 'aramco.com',
    stage: PipelineStage.Proposal,
    demand: 'VRU upgrade program for Aramco-branded gas stations',
    potential: {
      directSales: { units: 2000, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 2000, monthlyLease: 750, termMonths: 120 },
    },
    nextStep: 'Present comprehensive technical proposal to retail operations committee.',
    location: 'Dhahran, Saudi Arabia',
    marketKey: 'GCC',
    companyType: CompanyType.Government,
    stationCount: 'Over 2,000 stations',
    dealOrigin: ALK,
    payouts: [{ name: 'Romin', percentage: 45 }, { name: 'Hari', percentage: 45 }, { name: 'Sevali', percentage: 10 }],
    attachments: [
      { name: 'Aramco_LOI_Q2.pdf', url: '#', type: 'LOI', uploadedAt: '2024-05-21' },
      { name: 'Technical_Proposal_v2.docx', url: '#', type: 'Other', uploadedAt: '2024-06-15' },
    ]
  },
   {
    id: 6,
    name: 'Bapco Energies',
    domain: 'bapcoenergies.com',
    stage: PipelineStage.Proposal,
    demand: 'VRU rollout for all Bapco service stations',
    potential: {
      directSales: { units: 20, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 20, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Final proposal submitted, awaiting review by retail capex team.',
    location: 'Awali, Bahrain',
    marketKey: 'GCC',
    companyType: CompanyType.Government,
    stationCount: 'Approx. 20 stations',
    dealOrigin: ALK,
    payouts: [{ name: 'Romin', percentage: 45 }, { name: 'Hari', percentage: 45 }, { name: 'Sevali', percentage: 10 }]
  },
  
  // On Hold
  {
    id: 4,
    name: 'Kuwait Petroleum Corp.',
    domain: 'kpc.com.kw',
    stage: PipelineStage.OnHold,
    demand: 'VRU compliance for Q8-branded European station network',
    potential: {
      directSales: { units: 6667, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 6667, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Awaiting budget approval for next fiscal year.',
    location: 'Kuwait City, Kuwait',
    marketKey: 'GCC',
    companyType: CompanyType.Government,
    stationCount: 'Over 4,000 stations (Q8 in Europe)',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 8,
    name: 'Aldrees',
    domain: 'aldrees.com',
    stage: PipelineStage.OnHold,
    demand: '120 VRU-100 and 20 VRU-250 units for their stations',
    potential: {
      directSales: { units: 1000, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 1000, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Project paused due to internal restructuring. Follow up in Q3.',
    location: 'Riyadh, Saudi Arabia',
    marketKey: 'GCC',
    companyType: CompanyType.Public,
    stationCount: 'Over 600 stations',
    dealOrigin: ALK,
    payouts: [{ name: 'Romin', percentage: 45 }, { name: 'Hari', percentage: 45 }, { name: 'Sevali', percentage: 10 }]
  },
  
  // Awaiting Internal Funding
  {
    id: 29,
    name: 'Tosoil',
    domain: 'tosoil.it',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGv2VxN8kDwl04P28jQQzvZdkRqUlxpZXXg&s',
    stage: PipelineStage.AwaitingFunding,
    demand: 'Network-wide VRU implementation for Italian stations',
    potential: {
      directSales: { units: 20, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 20, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Project paused pending our internal capital allocation for Q4.',
    location: 'Rome, Italy',
    marketKey: 'Italy',
    companyType: CompanyType.Private,
    stationCount: 'Approx. 20 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
  {
    id: 32,
    name: 'Al Aytam',
    domain: 'aytampetroleum.com',
    logoUrl: 'http://aytampetroleum.com/img/logo_en.png',
    stage: PipelineStage.AwaitingFunding,
    demand: 'VRU units for their network across Lebanon',
    potential: {
      directSales: { units: 20, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 20, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Awaiting client\'s internal budget approval for Q4.',
    location: 'Beirut, Lebanon',
    marketKey: 'Lebanon',
    companyType: CompanyType.Private,
    stationCount: 'Approx. 20 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },

  // Closed Won
  {
    id: 30,
    name: 'JoPetrol',
    domain: 'jopetrol.com.jo',
    stage: PipelineStage.ClosedWon,
    demand: 'Full network upgrade of 58 stations',
    potential: {
      directSales: { units: 500, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 500, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Deployment kick-off meeting scheduled.',
    location: 'Amman, Jordan',
    marketKey: 'Jordan',
    companyType: CompanyType.Public,
    stationCount: 'Over 300 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Marshall', percentage: 67 }, { name: 'Yalçin', percentage: 16.5 }, { name: 'Hari', percentage: 16.5 }],
    attachments: [
        { name: 'JoPetrol_Signed_Contract.pdf', url: '#', type: 'Contract', uploadedAt: '2024-07-01' }
    ]
  },

  // Closed Lost
  {
    id: 7,
    name: 'Sasco',
    domain: 'sasco.com.sa',
    stage: PipelineStage.ClosedLost,
    demand: '150 VRU-100 units for highway locations',
    potential: {
      directSales: { units: 833, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 833, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Client selected a lower-cost competitor solution.',
    location: 'Riyadh, Saudi Arabia',
    marketKey: 'GCC',
    companyType: CompanyType.Public,
    stationCount: 'Over 500 stations',
    dealOrigin: ALK,
    payouts: [{ name: 'Romin', percentage: 45 }, { name: 'Hari', percentage: 45 }, { name: 'Sevali', percentage: 10 }]
  },
  {
    id: 5,
    name: 'OQ',
    domain: 'oq.com',
    stage: PipelineStage.ClosedLost,
    demand: 'Modernization of OQ retail fuel network',
    potential: {
      directSales: { units: 383, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 383, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Project cancelled due to shifting strategic priorities.',
    location: 'Muscat, Oman',
    marketKey: 'GCC',
    companyType: CompanyType.Government,
    stationCount: 'Over 230 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Romin', percentage: 33 }, { name: 'Sevali (Yalçin)', percentage: 33 }, { name: 'Hari', percentage: 33 }]
  },
];
