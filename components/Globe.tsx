
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { Globe as GlobeIcon, ArrowLeft, Building } from 'lucide-react';
import { Project } from '../types/appTypes';

// Declare amCharts globals to avoid TypeScript errors
declare const am5: any;
declare const am5map: any;
declare const am5geodata_worldLow: any;
declare const am5themes_Animated: any;

interface GlobeProps {
    projects: Project[];
    onProjectClick: (projectData: any) => void;
    onCountryDoubleClick?: (countryCode: string) => void;
    supplyLines?: { from: [number, number]; to: [number, number] }[];
}

const Globe: React.FC<GlobeProps> = ({ projects, onProjectClick, onCountryDoubleClick, supplyLines }) => {
    const { t } = useTranslation();
    const chartDivRef = useRef<HTMLDivElement>(null);
    const autorotateRef = useRef<any>(null);
    const [zoomedCountry, setZoomedCountry] = useState<{name: string, id: string} | null>(null);

    const projectsInZoomedCountry = zoomedCountry 
        ? projects.filter(p => p.countryCode === zoomedCountry.id).length
        : 0;

    useEffect(() => {
        if (!chartDivRef.current) return;
        
        const root = am5.Root.new(chartDivRef.current);
        const projectCountryCodes = new Set(projects.map(p => p.countryCode));

        root.setThemes([ am5themes_Animated.new(root) ]);

        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                projection: am5map.geoOrthographic(),
                panX: "rotateX",
                panY: "rotateY",
                wheelY: "zoom",
                maxZoomLevel: 3,
                homeZoomLevel: 1,
                homeGeoPoint: { latitude: 26, longitude: 50 } // Center on Bahrain
            })
        );
        
        const backgroundSeries = chart.series.push(
          am5map.MapPolygonSeries.new(root, {})
        );
        backgroundSeries.mapPolygons.template.setAll({
          fill: am5.color(0x0a0f32),
          fillOpacity: 0.1,
          strokeOpacity: 0
        });
        backgroundSeries.data.push({
          geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });

        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ["AQ"]
            })
        );

        polygonSeries.mapPolygons.template.setAll({
            fill: am5.color(0x0e143b),
            stroke: am5.color(0x00ffff),
            strokeWidth: 0.5,
            strokeOpacity: 0.3,
        });
        
        // --- Conditional Interactivity via Adapters ---
        polygonSeries.mapPolygons.template.adapters.add("interactive", (value: any, target: any) => {
            if (!target.dataItem) return value;
            return projectCountryCodes.has(target.dataItem.get("id"));
        });
        polygonSeries.mapPolygons.template.adapters.add("tooltipText", (value: any, target: any) => {
            if (!target.dataItem) return "";
            return projectCountryCodes.has(target.dataItem.get("id")) ? "{name}" : "";
        });
        polygonSeries.mapPolygons.template.adapters.add("cursorOverStyle", (value: any, target: any) => {
            if (!target.dataItem) return "default";
            return projectCountryCodes.has(target.dataItem.get("id")) ? "pointer" : "default";
        });
        
        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color(0x0077b6)
        });

        polygonSeries.mapPolygons.template.events.on("click", (ev: any) => {
            const dataItem = ev.target.dataItem;
            const countryCode = dataItem?.get("id");
            const countryProjects = projects.filter(p => p.countryCode === countryCode);

            if (chart.get("zoomToDataItem") === dataItem) {
                chart.goHome();
                autorotateRef.current?.resume();
                setZoomedCountry(null);
            } else {
                polygonSeries.zoomToDataItem(dataItem);
                autorotateRef.current?.pause();
                setZoomedCountry({ name: dataItem.dataContext.name, id: countryCode });
                
                // NEW: Open modal immediately if there is exactly one project
                if (countryProjects.length === 1) {
                    onProjectClick(countryProjects[0]);
                }
            }
        });

        polygonSeries.mapPolygons.template.events.on("dblclick", (ev: any) => {
            const dataItem = ev.target.dataItem;
            const countryCode = dataItem?.get("id");
            if (countryCode && onCountryDoubleClick) {
                onCountryDoubleClick(countryCode);
            }
        });

        // Add line series for supply chain routes
        if (supplyLines) {
            const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
            lineSeries.mapLines.template.setAll({
                stroke: am5.color(0x00ffff),
                strokeWidth: 1,
                strokeOpacity: 0.4,
                interactive: false,
            });

            const lineData = supplyLines.map(line => ({
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [line.from[1], line.from[0]], // [lon, lat]
                        [line.to[1], line.to[0]]      // [lon, lat]
                    ]
                }
            }));

            lineSeries.data.setAll(lineData);

            // Add animated bullets
            lineSeries.bullets.push(() => {
                const circle = am5.Circle.new(root, {
                    radius: 3,
                    fill: am5.color(0x00ffff),
                    tooltipText: "Supply Route"
                });

                circle.animate({
                    key: "scale",
                    from: 1,
                    to: 1.5,
                    duration: 600,
                    easing: am5.ease.out(am5.ease.cubic),
                    loops: Infinity,
                });
                circle.animate({
                    key: "opacity",
                    from: 1,
                    to: 0.5,
                    duration: 600,
                    easing: am5.ease.out(am5.ease.cubic),
                    loops: Infinity,
                });

                const bullet = am5.Bullet.new(root, {
                    sprite: circle,
                    dynamic: true,
                });

                bullet.animate({
                    key: "positionOnLine",
                    from: 0,
                    to: 1,
                    duration: 6000,
                    loops: Infinity,
                    easing: am5.ease.linear
                });

                return bullet;
            });
        }


        const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
        
        pointSeries.bullets.push((root: any, series: any, dataItem: any) => {
            const isHub = dataItem.dataContext.countryCode === 'BH';
            
            const circle = am5.Circle.new(root, {
                radius: isHub ? 7 : 5,
                fill: isHub ? am5.color(0xfb923c) : am5.color(0x00ffff),
                stroke: root.interfaceColors.get("background"),
                strokeWidth: 2,
                tooltipText: "{title}",
                cursorOverStyle: 'pointer'
            });

            circle.events.on("click", (ev: any) => {
                onProjectClick(ev.target.dataItem.dataContext);
                ev.originalEvent.stopPropagation();
            });

            circle.animate({ key: "scale", from: 1, to: 1.5, duration: 800, easing: am5.ease.out(am5.ease.cubic), loops: Infinity });
            circle.animate({ key: "opacity", from: 1, to: 0, duration: 800, easing: am5.ease.out(am5.ease.cubic), loops: Infinity });

            return am5.Bullet.new(root, { sprite: circle });
        });
        
        const projectData = projects.map(p => ({
            geometry: { type: "Point", coordinates: [p.coordinates[1], p.coordinates[0]] },
            title: p.name,
            ...p
        }));
        pointSeries.data.setAll(projectData);
        
        autorotateRef.current = chart.animate({ key: "rotationX", from: 0, to: 360, duration: 40000, loops: Infinity });

        return () => {
            root.dispose();
        };

    }, [projects, onProjectClick, onCountryDoubleClick, supplyLines]);

    const panelVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="relative w-full h-full">
            <div ref={chartDivRef} className="w-full h-full"></div>
            <AnimatePresence>
                {zoomedCountry && (
                    <motion.div
                        className="absolute top-28 left-4 md:left-1/2 md:-translate-x-1/2 glass-card p-4 rounded-lg pointer-events-auto"
                        variants={panelVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div 
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={(e) => {
                                const countryProjects = projects.filter(p => p.countryCode === zoomedCountry.id);
                                if (countryProjects.length > 0) {
                                  onProjectClick(countryProjects[0]);
                                }
                                e.stopPropagation();
                            }}
                        >
                            <GlobeIcon className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-emerald-300 transition-colors uppercase tracking-tight">{zoomedCountry.name}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-2 font-mono">
                                    <Building size={12} className="group-hover:text-emerald-400" /> 
                                    {projectsInZoomedCountry} {t('pages.global.modal.activeProjects')}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                const chart = am5.registry.rootElements[0].container.children.getIndex(0);
                                if (chart) {
                                    chart.goHome();
                                    autorotateRef.current?.resume();
                                    setZoomedCountry(null);
                                }
                            }} 
                            className="ml-4 p-1 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Back to World View"
                            data-cursor-hover
                        >
                            <ArrowLeft size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Globe;
