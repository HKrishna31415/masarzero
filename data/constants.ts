
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
  {
    id: 7,
    name: 'Sasco',
    domain: 'sasco.com.sa',
    stage: PipelineStage.Qualified,
    demand: '150 VRU-100 units for highway locations',
    potential: {
      directSales: { units: 833, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 833, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Final technical validation in progress.',
    location: 'Riyadh, Saudi Arabia',
    marketKey: 'GCC',
    companyType: CompanyType.Public,
    stationCount: 'Over 500 stations',
    dealOrigin: ALK,
    payouts: [{ name: 'Romin', percentage: 45 }, { name: 'Hari', percentage: 45 }, { name: 'Sevali', percentage: 10 }]
  },
  {
    id: 30,
    name: 'S-Oil',
    domain: 's-oil.com',
    stage: PipelineStage.ClosedWon,
    demand: 'Full network upgrade for retail locations',
    potential: {
      directSales: { units: 500, pricePerUnit: 70000, costPerUnit: 25000 },
      leaseModel: { units: 500, monthlyLease: 500, termMonths: 120 },
    },
    nextStep: 'Deployment kick-off meeting scheduled.',
    location: 'Seoul, South Korea',
    marketKey: 'Korea',
    companyType: CompanyType.Public,
    stationCount: 'Over 1,000 stations',
    dealOrigin: YA,
    payouts: [{ name: 'Marshall', percentage: 67 }, { name: 'Yalçin', percentage: 16.5 }, { name: 'Hari', percentage: 16.5 }],
  },
];

