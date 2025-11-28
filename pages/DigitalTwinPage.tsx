
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FacilitySelection from '../components/FacilitySelection';
import SimulationView from '../components/SimulationView';

type FacilityType = 'gas' | 'storage';

const DigitalTwinPage: React.FC = () => {
    const [selectedFacility, setSelectedFacility] = useState<FacilityType | null>(null);

    return (
        <section className="min-h-screen w-full bg-[#000212] relative">
            <AnimatePresence mode="wait">
                {!selectedFacility ? (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-32"
                    >
                        <FacilitySelection onSelect={setSelectedFacility} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="simulation"
                        className="relative w-full h-screen z-40 bg-[#000212]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <SimulationView
                            facilityType={selectedFacility}
                            onBack={() => setSelectedFacility(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default DigitalTwinPage;
