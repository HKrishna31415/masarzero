
export type View = 'home' | 'products' | 'technology' | 'about' | 'data' | 
                   'environmental' | 'financial' | 'global' |
                   'scada' | 'knowledge' | 'library' | 'legal' | 'contact' | 'investor' | 'newsroom' | 'esg' | 'digital-twin' | 'support' | 'installation-guide' | 'vru-testing' | 'roi-calculator' | 'pipeline' | 'equipment-acceptance-test' | 'gallery' | 'cycle-system' | 'maintenance-guide';

export interface Project {
  name: string;
  location: string;
  countryCode: string;
  coordinates: [number, number];
  operator: string;
  vru_model: string;
  status: 'Online' | 'Under Construction' | 'Verified';
  annual_revenue: string;
  co2_reduction: string;
  image: string;
}
