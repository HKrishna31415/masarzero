import { MOCK_CLIENTS, MARKET_LOGISTICS_DATA, FREIGHT_COST_PER_UNIT_KM } from './constants';
import { PipelineStage, Client, EnrichedClient } from '../types/pipeline';

export const stages = [
    { name: PipelineStage.Prospect, color: '#0ea5e9' },
    { name: PipelineStage.Qualified, color: '#8b5cf6' },
    { name: 'Proposal', color: '#a78bfa' },
    { name: PipelineStage.OnHold, color: '#f59e0b' },
    { name: PipelineStage.AwaitingFunding, color: '#f59e0b' },
    { name: PipelineStage.ClosedWon, color: '#22c55e' },
    { name: PipelineStage.ClosedLost, color: '#ef4444' },
];


const calculateLandedCostDetails = (client: Client) => {
    const market = MARKET_LOGISTICS_DATA[client.marketKey];
    const baseCost = client.potential.directSales.costPerUnit;
    
    if (!market) {
        return {
            baseCost,
            freight: 0,
            duty: 0,
            vat: 0,
            total: baseCost,
        };
    }

    const freight = market.distance * FREIGHT_COST_PER_UNIT_KM;
    // Simplified calc: Duty on (Base + Freight), then VAT on (Base + Freight + Duty)
    const costPlusFreight = baseCost + freight;
    const duty = costPlusFreight * market.dutyRate;
    const costPlusDuty = costPlusFreight + duty;
    const vat = costPlusDuty * market.vatRate;

    return {
        baseCost,
        freight,
        duty,
        vat,
        total: costPlusDuty + vat,
    };
};

export const deals: EnrichedClient[] = MOCK_CLIENTS.map(client => {
    const landedCostDetails = calculateLandedCostDetails(client);
    const landedCost = landedCostDetails.total;
    
    const profitPerUnit = client.potential.directSales.pricePerUnit - landedCost;
    const directSalesProfit = profitPerUnit * client.potential.directSales.units;
    
    return {
        ...client,
        logo: client.logoUrl || `https://logo.clearbit.com/${client.domain}`,
        value: directSalesProfit > 0 ? directSalesProfit : 0, // Kanban value
        type: client.companyType, // mapping for existing component
        company: client.name, // mapping for existing component
        
        calculated: {
            landedCost,
            landedCostDetails,
            profitPerUnit,
            directSalesProfit,
            totalLeaseValue: client.potential.leaseModel.units * client.potential.leaseModel.monthlyLease * client.potential.leaseModel.termMonths
        }
    };
});
