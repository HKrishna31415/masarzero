
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle2, Upload, Type, PenTool, Trash2, Calendar } from 'lucide-react';
import { acceptanceTestData as initialData, TestSection } from '../data/acceptanceTestData';

// --- Date Helper Functions ---
const calculateNextDueDate = (lastCompleted: string, frequency: string): Date | null => {
    if (!lastCompleted) return null;
    const lastDate = new Date(lastCompleted);
    const nextDate = new Date(lastDate.getUTCFullYear(), lastDate.getUTCMonth(), lastDate.getUTCDate());

    switch (frequency) {
        case 'Daily': nextDate.setDate(nextDate.getDate() + 1); break;
        case 'Weekly': nextDate.setDate(nextDate.getDate() + 7); break;
        case 'Monthly': nextDate.setMonth(nextDate.getMonth() + 1); break;
        case 'Quarterly': nextDate.setMonth(nextDate.getMonth() + 3); break;
        case 'Annually': nextDate.setFullYear(nextDate.getFullYear() + 1); break;
        default: return null;
    }
    return nextDate;
};

const formatDueDateStatus = (nextDate: Date | null, frequency: string): { dateString: string; relativeString: string; color: string } => {
    if (frequency === 'Periodic' || frequency === 'Every 2000 Hrs') {
        return { dateString: 'As Required', relativeString: '(Track Manually)', color: 'text-gray-400' };
    }
    if (!nextDate) {
        return { dateString: 'Set Date', relativeString: '', color: 'text-gray-500' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let relativeString = '';
    let color = 'text-green-400';

    if (diffDays < 0) {
        relativeString = `(Overdue by ${Math.abs(diffDays)}d)`;
        color = 'text-red-400';
    } else if (diffDays === 0) {
        relativeString = '(Due today)';
        color = 'text-yellow-400';
    } else if (diffDays <= 7) {
        relativeString = `(Due in ${diffDays}d)`;
        color = 'text-yellow-400';
    } else {
        relativeString = `(Due in ${diffDays}d)`;
    }
    
    const dateString = nextDate.toLocaleDateString('en-CA');
    return { dateString, relativeString, color };
};

// --- Signature Component ---
const SignaturePad = ({ label, role }: { label: string, role?: string }) => {
    const [mode, setMode] = useState<'type' | 'draw' | 'upload'>('draw');
    const [name, setName] = useState('');
    const [title, setTitle] = useState(role || '');
    const [signatureImage, setSignatureImage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Reset canvas when switching to draw mode
    useEffect(() => {
        if (mode === 'draw' && canvasRef.current && !signatureImage) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = '#22d3ee'; // Cyan
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
            }
        }
    }, [mode, signatureImage]);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (mode !== 'draw') return;
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || mode !== 'draw') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const { offsetX, offsetY } = getCoordinates(e, canvas);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        if (canvasRef.current) {
            // Optional: Save state if needed, but canvas keeps drawing
        }
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }
        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top
        };
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            setSignatureImage(null);
        }
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setSignatureImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 flex flex-col gap-4 hover:border-white/20 transition-colors">
            <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col">
                    <label className="text-sm font-bold text-white uppercase tracking-wider">{label}</label>
                    <span className="text-[10px] text-gray-500">Signature Required</span>
                </div>
                <div className="flex bg-black/40 rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setMode('type')}
                        className={`p-1.5 rounded transition-all ${mode === 'type' ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:text-white'}`}
                        title="Type"
                    >
                        <Type size={14} />
                    </button>
                    <button
                        onClick={() => setMode('draw')}
                        className={`p-1.5 rounded transition-all ${mode === 'draw' ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:text-white'}`}
                        title="Draw"
                    >
                        <PenTool size={14} />
                    </button>
                    <button
                        onClick={() => setMode('upload')}
                        className={`p-1.5 rounded transition-all ${mode === 'upload' ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:text-white'}`}
                        title="Upload"
                    >
                        <Upload size={14} />
                    </button>
                </div>
            </div>

            {/* Signature Area */}
            <div className="h-32 border-2 border-dashed border-slate-700 rounded-lg bg-black/20 relative overflow-hidden flex items-center justify-center group">
                {mode === 'type' && (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type Full Name"
                        className="w-full h-full bg-transparent text-center text-3xl text-cyan-400 focus:outline-none placeholder-slate-700"
                        style={{ fontFamily: 'cursive' }}
                    />
                )}
                
                {mode === 'draw' && (
                    <>
                        <canvas
                            ref={canvasRef}
                            width={400}
                            height={128}
                            className="w-full h-full touch-none cursor-crosshair"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                        <button 
                            onClick={clearCanvas} 
                            className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition-colors"
                            title="Clear Signature"
                        >
                            <Trash2 size={14} />
                        </button>
                        {!isDrawing && (
                            <div className="absolute bottom-2 left-2 text-[9px] text-slate-600 pointer-events-none">Sign Here</div>
                        )}
                    </>
                )}

                {mode === 'upload' && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        {signatureImage ? (
                            <div className="relative w-full h-full group/img p-2">
                                <img src={signatureImage} alt="Signature" className="w-full h-full object-contain" />
                                <button 
                                    onClick={() => setSignatureImage(null)}
                                    className="absolute top-2 right-2 text-slate-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors">
                                <Upload size={24} />
                                <span className="text-xs">Click to Upload Image</span>
                                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                            </label>
                        )}
                    </div>
                )}
            </div>

            {/* Info Fields */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Name / Title</label>
                    <input
                        type="text"
                        value={mode === 'type' ? name : title}
                        onChange={(e) => mode === 'type' ? setName(e.target.value) : setTitle(e.target.value)}
                        placeholder="Name & Title"
                        className="w-full bg-black/30 border border-slate-700 rounded px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Date Signed</label>
                    <div className="relative">
                        <input
                            type="date"
                            className="w-full bg-black/30 border border-slate-700 rounded px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none transition-colors appearance-none"
                            defaultValue={new Date().toISOString().split('T')[0]}
                        />
                        <Calendar size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const EquipmentAcceptanceTestPage: React.FC = () => {
    const [testData, setTestData] = useState<TestSection[]>(initialData);
    const [activeTabId, setActiveTabId] = useState(initialData[0].id);

    const activeSection = useMemo(() => testData.find(section => section.id === activeTabId) || testData[0], [testData, activeTabId]);

    const progress = useMemo(() => {
        if (!activeSection) return 0;
        const allCheckpoints = activeSection.checklistSections.flatMap(s => s.checkpoints);
        if (allCheckpoints.length === 0) return 0;
        const completed = allCheckpoints.filter(c => c.checked).length;
        return (completed / allCheckpoints.length) * 100;
    }, [activeSection]);

    const handleCheckboxChange = (sectionId: string, checkpointId: string, checked: boolean) => {
        setTestData(prevData =>
            prevData.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        checklistSections: section.checklistSections.map(cs => ({
                            ...cs,
                            checkpoints: cs.checkpoints.map(cp =>
                                cp.id === checkpointId ? { ...cp, checked } : cp
                            ),
                        })),
                      }
                    : section
            )
        );
    };

    const handleNotesChange = (sectionId: string, checkpointId: string, notes: string) => {
        setTestData(prevData =>
            prevData.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        checklistSections: section.checklistSections.map(cs => ({
                            ...cs,
                            checkpoints: cs.checkpoints.map(cp =>
                                cp.id === checkpointId ? { ...cp, notes } : cp
                            ),
                        })),
                      }
                    : section
            )
        );
    };
    
    const handleDateChange = (sectionId: string, checkpointId: string, date: string) => {
        setTestData(prevData =>
            prevData.map(section =>
                section.id === sectionId
                    ? {
                        ...section,
                        checklistSections: section.checklistSections.map(cs => ({
                            ...cs,
                            checkpoints: cs.checkpoints.map(cp =>
                                cp.id === checkpointId ? { ...cp, lastCompleted: date } : cp
                            ),
                        })),
                      }
                    : section
            )
        );
    };

    const isMaintSchedule = activeSection.id === 'maint-schedule';

    const shouldShowSignOff = [
        'fat-test',
        'delivery',
        'sat-test',
        'maintenance',
        'training',
        'commissioning'
    ].includes(activeSection.id);

    return (
        <div className="min-h-screen bg-[#000212] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Page Header */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                        <div>
                            <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-2 block">Quality Assurance</span>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                Acceptance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Protocol</span>
                            </h1>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-[#0f172a] px-4 py-3 rounded-xl border border-white/10 flex flex-col justify-center min-w-[140px]">
                                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Section Status</span>
                                <span className={`font-mono font-bold text-lg ${progress === 100 ? 'text-green-400' : 'text-cyan-400'}`}>
                                    {progress === 100 ? 'COMPLETE' : 'IN PROGRESS'}
                                </span>
                            </div>
                            <button className="flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-white/10 border border-white/10 text-white font-bold px-6 py-3 rounded-xl transition-colors h-full group">
                                <Download size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                                <span className="hidden md:inline">Export PDF</span>
                            </button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="overflow-x-auto pb-2 custom-scrollbar">
                        <div className="flex gap-2 min-w-max">
                            {testData.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTabId(tab.id)}
                                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border ${
                                        activeTabId === tab.id
                                            ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                                            : 'bg-slate-900/50 border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Full Page Flow */}
                <motion.div 
                    key={activeSection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#0b1021] rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl"
                >
                    {/* Section Header */}
                    <div className="bg-[#0f1629] border-b border-white/10 p-8 md:p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                            <div className="max-w-3xl">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{activeSection.longTitle}</h2>
                                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{activeSection.purpose}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-4xl font-black font-mono text-white mb-1">{progress.toFixed(0)}%</div>
                                <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden ml-auto">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-green-500' : 'bg-cyan-500'}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checklists */}
                    <div className="p-8 md:p-10 space-y-12">
                        {activeSection.checklistSections.map((checklistSection, idx) => (
                            <div key={`${activeSection.id}-sec-${idx}`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-sm">
                                        {idx + 1}
                                    </div>
                                    <h4 className="font-bold text-white text-lg uppercase tracking-wide">{checklistSection.title}</h4>
                                </div>
                                
                                <div className="bg-[#0f1629]/50 rounded-2xl border border-white/5 overflow-hidden">
                                    <div className="divide-y divide-white/5">
                                        {checklistSection.checkpoints.map(checkpoint => {
                                            const nextDueDate = isMaintSchedule ? calculateNextDueDate(checkpoint.lastCompleted!, checklistSection.title) : null;
                                            const dueDateStatus = isMaintSchedule ? formatDueDateStatus(nextDueDate, checklistSection.title) : null;

                                            return (
                                            <div key={checkpoint.id} className="p-5 hover:bg-white/5 transition-colors grid grid-cols-12 gap-6 items-start group">
                                                {/* Checkbox */}
                                                <div className="col-span-1 flex pt-1 justify-center">
                                                    <label className="relative flex items-center justify-center cursor-pointer w-6 h-6">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={checkpoint.checked} 
                                                            onChange={e => handleCheckboxChange(activeSection.id, checkpoint.id, e.target.checked)} 
                                                            className="peer appearance-none w-6 h-6 border-2 border-slate-600 rounded bg-transparent checked:bg-cyan-500 checked:border-cyan-500 transition-all"
                                                        />
                                                        <CheckCircle2 size={16} className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                                    </label>
                                                </div>

                                                {/* Criteria */}
                                                <div className={`col-span-11 md:${isMaintSchedule ? 'col-span-5' : 'col-span-7'}`}>
                                                    <p className="text-sm md:text-base text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors">
                                                        {checkpoint.criteria}
                                                    </p>
                                                    <p className="text-xs text-gray-600 font-mono mt-1">ID: {checkpoint.id}</p>
                                                </div>
                                                
                                                {/* Maintenance Schedule Fields */}
                                                {isMaintSchedule && (
                                                    <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4 bg-black/20 p-3 rounded-lg">
                                                        <div>
                                                            <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Last Completed</label>
                                                             <input 
                                                                type="date" 
                                                                value={checkpoint.lastCompleted || ''} 
                                                                onChange={e => handleDateChange(activeSection.id, checkpoint.id, e.target.value)} 
                                                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none transition-colors" 
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center">
                                                            <span className={`text-xs font-bold ${dueDateStatus!.color}`}>{dueDateStatus!.dateString}</span>
                                                            <span className={`text-[10px] font-mono ${dueDateStatus!.color} opacity-70`}>{dueDateStatus!.relativeString}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Notes Field */}
                                                {!isMaintSchedule && (
                                                    <div className="col-span-12 md:col-span-4">
                                                        <textarea 
                                                            value={checkpoint.notes} 
                                                            onChange={e => handleNotesChange(activeSection.id, checkpoint.id, e.target.value)} 
                                                            placeholder="Observations / Notes..." 
                                                            className="w-full bg-black/20 border border-white/5 rounded-lg p-3 text-xs text-gray-300 focus:text-white focus:border-cyan-500/50 focus:outline-none transition-all resize-none placeholder-gray-600 h-full min-h-[60px]" 
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )})}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {/* Sign Off Section */}
                        {shouldShowSignOff && (
                            <div className="mt-16 pt-10 border-t border-white/10">
                                <h3 className="text-2xl font-bold mb-8 text-white">Authorization & Sign-Off</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <SignaturePad label="Manufacturer Representative" role="Technical Lead" />
                                    <SignaturePad label="Client Representative" role="Site Manager" />
                                    <SignaturePad label="Third Party Inspector" role="QA/QC Auditor" />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EquipmentAcceptanceTestPage;
