// Fix: Removed 'as BaseClient' alias to make the Client type directly available.
import { Client, PipelineStage, CompanyType, DealOrigin, Payout, Attachment, MarketLogistics } from "../data/constants";

export { PipelineStage, CompanyType };
export type { DealOrigin, Payout, Attachment, Client, MarketLogistics };

// Fix: Changed BaseClient to Client to match the updated import.
export type EnrichedClient = Client & {
    logo: string;
    value: number;
    type: CompanyType;
    company: string;
    calculated: {
        landedCost: number;
        landedCostDetails: {
            baseCost: number;
            freight: number;
            duty: number;
            vat: number;
            total: number;
        };
        profitPerUnit: number;
        directSalesProfit: number;
        totalLeaseValue: number;
    };
};
