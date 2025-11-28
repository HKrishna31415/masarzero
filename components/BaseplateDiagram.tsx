
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalNode {
  row: number;
  col: number;
  label: string;
  desc: string;
  type: 'sensor' | 'actuator' | 'power' | 'network';
}

const terminals: TerminalNode[] = [
  // Row 1
  { row: 1, col: 1, label: 'PRESS.', desc: 'Pressure Transducer', type: 'sensor' },
  { row: 1, col: 2, label: 'VAC.', desc: 'Vacuum Sensor', type: 'sensor' },
  { row: 1, col: 3, label: 'V1', desc: 'Vent Valve 1 Solenoid', type: 'actuator' },
  { row: 1, col: 4, label: 'V4', desc: 'Vent Valve 4 Solenoid', type: 'actuator' },
  { row: 1, col: 5, label: 'D3', desc: 'Drain Valve 3 DC24V Sol.', type: 'actuator' },
  { row: 1, col: 6, label: 'Y2', desc: 'Pressure Relief Solenoid', type: 'actuator' },
  { row: 1, col: 7, label: 'A380', desc: '380V Main Power Input', type: 'power' },

  // Row 2
  { row: 2, col: 1, label: 'F1', desc: 'Flow Meter 1 Sensor', type: 'sensor' },
  { row: 2, col: 2, label: 'GAS', desc: 'Gas Sensor Input', type: 'sensor' },
  { row: 2, col: 3, label: 'V2', desc: 'Vent Valve 2 Solenoid', type: 'actuator' },
  { row: 2, col: 4, label: 'D1', desc: 'Drain Valve 1 DC24V Sol.', type: 'actuator' },
  { row: 2, col: 5, label: 'Y0', desc: 'Spare Sol. General Actuator', type: 'actuator' },
  { row: 2, col: 6, label: 'Y3', desc: 'High Pressure Solenoid', type: 'actuator' },
  { row: 2, col: 7, label: 'Y5', desc: 'Spare Output Actuator', type: 'actuator' },

  // Row 3
  { row: 3, col: 1, label: 'F2', desc: 'Flow Meter 2 Sensor', type: 'sensor' },
  { row: 3, col: 2, label: 'OIL', desc: 'Oil/Fluid Sensor', type: 'sensor' },
  { row: 3, col: 3, label: 'V3', desc: 'Vent Valve 3 Solenoid', type: 'actuator' },
  { row: 3, col: 4, label: 'D2', desc: 'Drain Valve 2 DC24V Sol.', type: 'actuator' },
  { row: 3, col: 5, label: 'Y1', desc: 'Damper Control Solenoid', type: 'actuator' },
  { row: 3, col: 6, label: 'Y4', desc: 'Cooling Water Solenoid', type: 'actuator' },
  { row: 3, col: 7, label: 'W', desc: 'Network Port/Cable', type: 'network' },
];

const BaseplateDiagram: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<TerminalNode | null>(null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'power': return '#ef4444'; // Red
      case 'network': return '#22c55e'; // Green
      default: return '#3b82f6'; // Blue for sensors/actuators
    }
  };

  return (
    <div className="w-full bg-[#050714] border border-slate-700 rounded-xl p-6 md:p-8 relative overflow-hidden my-8">
      
      <div className="flex flex-col items-center">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 w-full text-left border-b border-slate-800 pb-2">
            Baseplate Terminal Map
        </h4>

        <div className="relative w-full max-w-3xl aspect-[2/1] select-none">
            {/* Grid Layout */}
            <div className="absolute inset-0 grid grid-cols-7 gap-4 p-4">
                {terminals.map((node, i) => (
                    <div 
                        key={i} 
                        className="flex flex-col items-center justify-center relative group"
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        {/* Circle Terminal */}
                        <motion.div 
                            className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center z-10 bg-[#0f172a] cursor-pointer transition-all duration-300"
                            style={{ 
                                borderColor: getNodeColor(node.type),
                                boxShadow: hoveredNode === node ? `0 0 15px ${getNodeColor(node.type)}` : 'none'
                            }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <span className="text-[10px] md:text-xs font-bold text-white font-mono">{node.label}</span>
                        </motion.div>

                        {/* Description Label (Desktop) */}
                        <div className="mt-2 text-center hidden md:block opacity-60 group-hover:opacity-100 transition-opacity">
                            <p className="text-[9px] text-cyan-100 font-bold leading-tight max-w-[80px]">{node.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Legend */}
        <div className="w-full mt-6 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-red-500 bg-red-500/20"></div>
                    <span className="text-gray-400">Main Power (380V AC)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-blue-500/20"></div>
                    <span className="text-gray-400">Sensors & Actuators (24V DC)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-green-500 bg-green-500/20"></div>
                    <span className="text-gray-400">Network Connection</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-yellow-500 bg-yellow-500/20 opacity-50"></div>
                    <span className="text-gray-500">220V AC (Not Shown)</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BaseplateDiagram;
