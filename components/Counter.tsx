
import React, { useEffect, useState } from 'react';
import { animate, useMotionValue } from 'framer-motion';

const Counter: React.FC = () => {
    // A large, realistic starting number
    const initialValue = 231900203;
    // A realistic rate of recovery in liters per second across all clients
    const ratePerSecond = 15.7;

    const count = useMotionValue(initialValue);
    const [display, setDisplay] = useState({ integerPart: '231,900', decimalPart: '203' });

    useEffect(() => {
        const animation = animate(count, 1e12, { // Animate to a very large number to simulate infinity
            duration: (1e12 - count.get()) / ratePerSecond, // Calculate total duration to maintain the rate
            ease: "linear",
            onUpdate: (latest) => {
                const [integer, decimal] = latest.toLocaleString('en-US', {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                }).split('.');
                setDisplay({ integerPart: integer, decimalPart: decimal || '000' });
            }
        });

        return () => animation.stop();
    }, [count, ratePerSecond]);

    return (
        <div className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter break-all sm:break-normal leading-none text-center px-2" aria-live="polite" aria-atomic="true">
            <span className="text-white">{display.integerPart}</span>
            <span className="text-cyan-400">.{display.decimalPart}</span>
        </div>
    );
};

export default Counter;
