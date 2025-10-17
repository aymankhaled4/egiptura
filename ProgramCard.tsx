import React from 'react';
import type { Program } from '../types';
import { CalendarIcon, MapPinIcon, FeluccaIcon, DiamondIcon } from './Icons';
import { knowledgeBase } from '../services/knowledgeBase';
import { useLanguage } from '../contexts/LanguageContext';

interface ProgramCardProps {
    program: Program;
    onViewDetails: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onViewDetails }) => {
    const { language } = useLanguage();
    const lang = language;
    const uiText = knowledgeBase.localizedStrings.ui[lang] ?? knowledgeBase.localizedStrings.ui.en;

    const FactItem: React.FC<{icon: React.ElementType, label: string, value: string | number | React.ReactNode}> = ({ icon: Icon, label, value}) => (
        <div className="bg-gray-800/50 px-2 py-3 rounded-lg text-center flex flex-col items-center justify-center border border-gray-700/80 h-full">
            <Icon className="w-6 h-6 mb-1 text-[#C59D5F]/90" />
            <p className="font-bold text-lg text-white leading-tight">{value}</p>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mt-1">{label}</p>
        </div>
    );
    
    const factsToDisplay = [
        { key: 'duration', icon: CalendarIcon, value: <>{program.duration.days}&nbsp;/&nbsp;{program.duration.nights}</>, label: uiText.cardLabelDuration },
        { key: 'start', icon: MapPinIcon, label: uiText.cardStart, value: program.startCity?.[lang] ?? program.startCity?.en ?? 'N/A' },
    ];

    if (program.cruiseNights !== undefined && program.cruiseNights > 0) {
        factsToDisplay.push({ key: 'cruise', icon: FeluccaIcon, label: uiText.cardLabelCruiseNights, value: <>{program.cruiseNights}</> });
    }
    
    const normalizedCategories = program.categories.map(c => c.toString().toLowerCase());
    const meaningfulCategories = normalizedCategories.filter(c => c === 'gold' || c === 'diamond');

    if (meaningfulCategories.length > 0) {
        factsToDisplay.push({ key: 'category', icon: DiamondIcon, label: uiText.modalInfoCategories, value: meaningfulCategories.join(' & ') });
    }
    
    const getGridColsClass = (count: number) => {
        switch (count) {
            case 2: return 'grid-cols-2';
            case 3: return 'grid-cols-3';
            case 4: return 'grid-cols-4';
            default: return 'grid-cols-4';
        }
    }
    const gridColsClass = getGridColsClass(factsToDisplay.length);

    return (
        <div className="bg-[#2a2b2e] rounded-xl shadow-lg border border-gray-700 max-w-md w-full overflow-hidden animate-fade-in">
            <div className="p-5">
                <div className="flex items-center space-x-4">
                    <div className="text-4xl">{program.icon}</div>
                    <div>
                        <h3 className="font-bold text-lg text-[#C59D5F] leading-tight">{program.name[lang] ?? program.name.en}</h3>
                    </div>
                </div>

                <div className={`mt-5 grid ${gridColsClass} gap-2 text-center`}>
                    {factsToDisplay.map((fact) => (
                        <FactItem 
                            key={fact.key}
                            icon={fact.icon} 
                            value={fact.value}
                            label={fact.label}
                        />
                    ))}
                </div>

                <p className="text-gray-300 mt-5 text-sm leading-relaxed min-h-[5rem]">
                    {program.briefDescription[lang] ?? program.briefDescription.en}
                </p>

            </div>

            <div className="bg-black/20 px-5 py-3 border-t border-gray-700/80 flex items-center justify-end">
                <button 
                    onClick={onViewDetails}
                    className="w-full px-4 py-2 text-sm font-semibold text-black bg-[#C59D5F] hover:bg-amber-500 rounded-lg transition-colors duration-200"
                >
                    {uiText.cardViewDetails}
                </button>
            </div>
        </div>
    );
};

export default ProgramCard;