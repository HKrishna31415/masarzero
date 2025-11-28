import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('button, a, [data-cursor-hover]')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
             if ((e.target as HTMLElement).closest('button, a, [data-cursor-hover]')) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        document.body.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.body.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const cursorVariants = {
        default: {
            height: 12,
            width: 12,
            backgroundColor: 'rgba(0, 255, 255, 0.5)',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.7)',
            border: '1px solid rgba(0, 255, 255, 0.8)',
        },
        hover: {
            height: 32,
            width: 32,
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
            boxShadow: '0 0 15px rgba(0, 255, 255, 1)',
            border: '2px solid rgba(0, 255, 255, 1)',
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-transform duration-200 ease-out"
            /* Fix: Changed style={{translateX: ...}} to direct x and y props for compatibility and performance. */
            // FIX: Reverted to using style prop for x and y to fix TypeScript error.
            style={{
                x: position.x - (isHovering ? 16 : 6),
                y: position.y - (isHovering ? 16 : 6),
            }}
            variants={cursorVariants}
            animate={isHovering ? 'hover' : 'default'}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};

export default CustomCursor;