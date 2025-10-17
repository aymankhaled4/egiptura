import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Program, ItineraryItem, SeasonalPricingDetail } from '../types';
import { getOfficialExchangeRate } from '../services/currencyService';
import Tabs from './Tabs';
import Accordion from './Accordion';
import { CrossedSceptersIcon, LotusIcon, RaSunIcon, CrescentMoonIcon, EyeOfHorusIcon, CalendarIcon, MapPinIcon, ShipIcon, DiamondIcon, WhatsAppIcon } from './Icons';
import { knowledgeBase } from '../services/knowledgeBase';
import { useLanguage, Language } from '../contexts/LanguageContext';
import QuoteRequestForm from './QuoteRequestForm';
import CustomPricingCalculator from './CustomPricingCalculator';

interface ProgramModalProps {
  program: Program;
  onClose: () => void;
}

const ProgramModal: React.FC<ProgramModalProps> = ({ program, onClose }) => {
  const { language } = useLanguage();
  const lang = language;
  const uiText = knowledgeBase.localizedStrings.ui[lang] ?? knowledgeBase.localizedStrings.ui.en;
  const [selectedCategory, setSelectedCategory] = useState<'gold' | 'diamond' | null>(program.isCustom ? program.quoteParams?.category ?? null : 'gold');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryItem[]>(() => {
    if (program.itinerary && Array.isArray(program.itinerary)) {
      return program.itinerary;
    }
    if (program.itineraryOptions && program.itineraryOptions[0] && program.itineraryOptions[0].itinerary && Array.isArray(program.itineraryOptions[0].itinerary)) {
      return program.itineraryOptions[0].itinerary;
    }
    return [];
  });
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  useEffect(() => {
    getOfficialExchangeRate().then(setExchangeRate);
  }, []);

  const handleItineraryOptionChange = (index: number) => {
    if (program.itineraryOptions && program.itineraryOptions[index]) {
      setSelectedItinerary(program.itineraryOptions[index].itinerary || []);
    }
  };

    const handleSaveTrip = useCallback(() => {
        try {
            const programJson = JSON.stringify(program);
            localStorage.setItem('savedEgipturaProgram', programJson);
            const messages = {
                es: '¡Viaje guardado! Podrás cargarlo en tu próxima visita.',
                en: 'Trip saved! You can load it on your next visit.',
                ar: 'تم حفظ الرحلة! يمكنك تحميلها في زيارتك القادمة.'
            };
            alert(messages[language]);
        } catch (error) {
            console.error("Failed to save trip:", error);
            const messages = {
                es: 'Error al guardar el viaje.',
                en: 'Error saving trip.',
                ar: 'خطأ في حفظ الرحلة.'
            };
            alert(messages[language]);
        }
    }, [program, language]);

  const programName = program.name[lang] ?? program.name.en;

  const renderPriceTable = (season: 'summer' | 'winter', seasonLabel: string) => {
    const pricing = program.seasonalPricing?.[season];
    if (!pricing) return null;

    const renderCategoryPrice = (category: 'gold' | 'diamond', categoryLabel: string, icon: React.ReactNode) => {
      const priceData = pricing[category];
      if (!priceData || typeof priceData === 'number') return null;

      return (
        <div key={category} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className={`font-bold text-lg mb-3 flex items-center gap-2 ${category === 'gold' ? 'text-[#C59D5F]' : 'text-sky-400'}`}>
                {icon} {categoryLabel}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                <div className="bg-gray-900/40 p-2 rounded">
                    <p className="text-xs text-gray-400">{uiText.modalPriceDouble}</p>
                    <p className="font-semibold text-white">{ (priceData as SeasonalPricingDetail).double } USD</p>
                </div>
                <div className="bg-gray-900/40 p-2 rounded">
                    <p className="text-xs text-gray-400">{uiText.modalPriceTriple}</p>
                    <p className="font-semibold text-white">{ (priceData as SeasonalPricingDetail).triple } USD</p>
                </div>
                <div className="bg-gray-900/40 p-2 rounded">
                    <p className="text-xs text-gray-400">{uiText.modalPriceSingle}</p>
                    <p className="font-semibold text-white">{ (priceData as SeasonalPricingDetail).single } USD</p>
                </div>
            </div>
        </div>
      );
    };

    return (
      <div>
        <h3 className="text-md font-semibold text-gray-300 mb-3 flex items-center">
            {season === 'summer' ? <RaSunIcon className="w-5 h-5 mr-2 text-yellow-400" /> : <CrescentMoonIcon className="w-5 h-5 mr-2 text-blue-300" />}
            {seasonLabel}
        </h3>
        <div className="space-y-4">
            {renderCategoryPrice('gold', uiText.modalCategoryGold, <RaSunIcon className="w-5 h-5"/>)}
            {renderCategoryPrice('diamond', uiText.modalCategoryDiamond, <DiamondIcon className="w-5 h-5" />)}
        </div>
      </div>
    );
  };
  
  const TABS = useMemo(() => [
    {
      label: uiText.modalOverview,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-3"><CalendarIcon className="w-6 h-6 text-[#C59D5F]"/> <div><span className="font-bold">{program.duration.days} / {program.duration.nights}</span><br/><span className="text-xs text-gray-400">{uiText.modalInfoDaysNights}</span></div></div>
              <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-3"><MapPinIcon className="w-6 h-6 text-[#C59D5F]"/> <div><span className="font-bold">{program.startCity?.[lang] ?? program.startCity?.en}</span><br/><span className="text-xs text-gray-400">{uiText.modalInfoStartIn}</span></div></div>
              {program.cruiseNights && program.cruiseNights > 0 && <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-3"><ShipIcon className="w-6 h-6 text-[#C59D5F]"/> <div><span className="font-bold">{program.cruiseNights}</span><br/><span className="text-xs text-gray-400">{uiText.modalInfoCruiseNights}</span></div></div>}
              <div className="bg-gray-800/50 p-3 rounded-lg flex items-center gap-3"><DiamondIcon className="w-6 h-6 text-[#C59D5F]"/> <div><span className="font-bold">{program.categories.join(' & ')}</span><br/><span className="text-xs text-gray-400">{uiText.modalInfoCategories}</span></div></div>
          </div>
          <p className="text-gray-300 leading-relaxed">{program.generalDescription[lang] ?? program.generalDescription.en}</p>
        </div>
      ),
    },
    {
      label: uiText.modalItinerary,
      content: (
        <div className="space-y-4">
          {program.itineraryOptions && program.itineraryOptions.length > 1 && (
            <div className="flex space-x-2 p-1 bg-gray-800 rounded-lg">
              {program.itineraryOptions.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleItineraryOptionChange(index)}
                  className={`w-full px-3 py-2 text-sm font-medium rounded-md transition ${selectedItinerary === opt.itinerary ? 'bg-[#C59D5F] text-black' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  {opt.name[lang] ?? opt.name.en}
                </button>
              ))}
            </div>
          )}
          <Accordion items={(selectedItinerary || []).map(item => {
            // Debug logging
            console.log('Processing itinerary item:', item);
            console.log('Activities type:', typeof item.activities);
            console.log('Activities value:', item.activities);
            
            // Handle both array format and localized object format for activities
            let activitiesList: string[] = [];
            if (Array.isArray(item.activities)) {
              activitiesList = item.activities;
            } else if (item.activities && typeof item.activities === 'object') {
              activitiesList = item.activities[lang] ?? item.activities.en ?? [];
            } else {
              // Fallback for undefined or unexpected activities format
              activitiesList = [];
            }
            
            console.log('Final activities list:', activitiesList);
            
            return {
              title: `${uiText.modalDay} ${item.day}: ${item.title?.[lang] ?? item.title?.en ?? 'Untitled'}`,
              content: <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">{activitiesList.map((act, i) => <li key={i}>{act}</li>)}</ul>,
            };
          })} defaultOpenIndices={[0]}/>
        </div>
      ),
    },
    {
        label: uiText.modalAccommodation,
        content: (
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-[#C59D5F]">
                        <RaSunIcon className="w-5 h-5"/> {uiText.modalCategoryGold}
                    </h4>
                    <div className="space-y-3">
                        {program.accommodations?.gold.map((acc, index) => (
                            <div key={`gold-${index}`} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
                                <MapPinIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-200">{acc.city[lang] ?? acc.city.en}</p>
                                    <p className="text-sm text-gray-400">{acc.hotel[lang] ?? acc.hotel.en}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-sky-400">
                        <DiamondIcon className="w-5 h-5"/> {uiText.modalCategoryDiamond}
                    </h4>
                    <div className="space-y-3">
                        {program.accommodations?.diamond.map((acc, index) => (
                             <div key={`diamond-${index}`} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
                                <MapPinIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-200">{acc.city[lang] ?? acc.city.en}</p>
                                    <p className="text-sm text-gray-400">{acc.hotel[lang] ?? acc.hotel.en}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
      label: uiText.modalPricing,
      content: program.isCustom && program.quoteParams ? (
        <CustomPricingCalculator quoteParams={program.quoteParams} />
      ) : (
        <div className="space-y-6">
            {renderPriceTable('summer', uiText.modalSummerSeason)}
            {renderPriceTable('winter', uiText.modalWinterSeason)}
            {exchangeRate && <p className="text-xs text-gray-500 text-center pt-2">{uiText.modalExchangeRate} 1 USD ≈ {exchangeRate.toFixed(2)} EGP. {uiText.modalExchangeRateDisclaimer}</p>}
        </div>
      ),
    },
    {
      label: uiText.modalIncluded,
      content: (
        <Accordion items={[
            { title: uiText.modalIncluded, content: <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">{(program.servicesIncluded?.[lang] ?? program.servicesIncluded?.en)?.map((item, i) => <li key={i}>{item}</li>)}</ul> },
            { title: uiText.modalExcluded, content: <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">{(program.servicesExcluded?.[lang] ?? program.servicesExcluded?.en)?.map((item, i) => <li key={i}>{item}</li>)}</ul> },
            { title: uiText.modalImportantNotes, content: <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">{(program.importantNotes?.[lang] ?? program.importantNotes?.en)?.map((item, i) => <li key={i}>{item}</li>)}</ul> },
        ]} defaultOpenIndices={[0, 1, 2]} />
      )
    },
  ], [program, lang, uiText, selectedItinerary, exchangeRate, selectedCategory]);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-[#202123] rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-700 animate-fade-in"
          onClick={e => e.stopPropagation()}
        >
          <header className="flex items-start justify-between p-4 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{program.icon}</div>
              <div>
                <h2 className="text-xl font-bold text-[#C59D5F]">{programName}</h2>
                <p className="text-sm text-gray-400">{program.briefDescription[lang] ?? program.briefDescription.en}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-300 p-1">
              <CrossedSceptersIcon className="w-8 h-8" />
            </button>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            <Tabs tabs={TABS} />
          </main>

          <footer className="flex items-center justify-end p-4 border-t border-gray-700 space-x-3 flex-shrink-0 bg-gray-800/30">
            <button
                onClick={handleSaveTrip}
                className="px-5 py-2.5 text-sm font-semibold text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
                {uiText.cardSaveChanges}
            </button>
            <a
                href="https://wa.me/201004060794"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EAE52] rounded-lg transition-colors duration-200 flex items-center gap-2"
                aria-label="Contact on WhatsApp"
            >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp</span>
            </a>
            <button
              onClick={() => setIsQuoteFormOpen(true)}
              className="px-5 py-2.5 text-sm font-semibold text-black bg-[#C59D5F] hover:bg-amber-500 rounded-lg transition-colors duration-200"
            >
              {uiText.modalQuoteButton}
            </button>
          </footer>
        </div>
      </div>
      {isQuoteFormOpen && (
        <QuoteRequestForm
          programName={programName}
          category={selectedCategory}
          onClose={() => setIsQuoteFormOpen(false)}
        />
      )}
    </>
  );
};

export default ProgramModal;