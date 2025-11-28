import { useState, useEffect, useRef } from 'react';

const GAS_STATION_RATE = 0.5; // Liters per second
const STORAGE_FACILITY_RATE = 5.0; // Liters per second
const PRICE_PER_LITER = 0.7; // Dollars
const CO2_KG_PER_LITER = 2.3; // kg

export const useSimulation = (isRunning: boolean, facilityType: 'gas' | 'storage') => {
    const [litersRecovered, setLitersRecovered] = useState(0);
    const intervalRef = useRef<number | null>(null);

    const recoveryRate = facilityType === 'gas' ? GAS_STATION_RATE : STORAGE_FACILITY_RATE;

    useEffect(() => {
        if (isRunning) {
            const startTime = Date.now() - (litersRecovered / recoveryRate) * 1000;
            intervalRef.current = window.setInterval(() => {
                const elapsedSeconds = (Date.now() - startTime) / 1000;
                setLitersRecovered(elapsedSeconds * recoveryRate);
            }, 100); // Update every 100ms for smoother display
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, recoveryRate, litersRecovered]);
    
    useEffect(() => {
        // Reset on facility change
        setLitersRecovered(0);
    }, [facilityType])

    const revenueGenerated = litersRecovered * PRICE_PER_LITER;
    const emissionsPrevented = litersRecovered * CO2_KG_PER_LITER;

    return {
        litersRecovered,
        revenueGenerated,
        emissionsPrevented,
    };
};
