import React, { useState, useEffect } from 'react';
import type { CustomQuoteParams, SeasonalPricingDetail } from '../types';
import { calculatePriceScenarios } from '../services/pricingService'; // ✅ سيستخدم النظام الجديد تلقائياً
import { knowledgeBase } from '../services/knowledgeBase';
import { useLanguage } from '../contexts/LanguageContext';
import { RaSunIcon, CrescentMoonIcon, DiamondIcon } from './Icons';

interface CustomPricingCalculatorProps {
  quoteParams: CustomQuoteParams;
  detectedSeason?: 'summer' | 'winter' | null;
}


const CustomPricingCalculator: React.FC<CustomPricingCalculatorProps> = ({ quoteParams, detectedSeason }) => {
  const { language } = useLanguage();
  const uiText = knowledgeBase.localizedStrings.ui[language] ?? knowledgeBase.localizedStrings.ui.es;
  const [seasonalPrices, setSeasonalPrices] = useState<{ summer: SeasonalPricingDetail, winter: SeasonalPricingDetail } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCategory = quoteParams.category;

  useEffect(() => {
    setIsLoading(true);
    try {
      // ✅ هذه الدالة الآن تستخدم النظام الجديد المطابق لـ PDF
      const prices = calculatePriceScenarios(quoteParams);
      setSeasonalPrices(prices);
      console.log('ANALYTICS_EVENT: quote_priced', { 
          category: selectedCategory, 
          travelers: quoteParams.travelers,
          duration: quoteParams.duration
      });
    } catch (e) {
      console.error("Error calculating custom price scenarios:", e);
      setSeasonalPrices(null);
    } finally {
      setIsLoading(false);
    }
  }, [quoteParams]);


  const renderPrice = (priceDetail: SeasonalPricingDetail | null) => {
      if (!priceDetail) return null;
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">{uiText.modalPriceDouble}</p>
            <p className="font-bold text-xl text-[#C59D5F]">{priceDetail.double} USD</p>
            <p className="text-xs text-gray-500">{uiText.modalPerPerson}</p>
          </div>
           <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">{uiText.modalPriceTriple}</p>
            <p className="font-bold text-xl text-[#C59D5F]">{priceDetail.triple} USD</p>
            <p className="text-xs text-gray-500">{uiText.modalPerPerson}</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">{uiText.modalPriceSingle}</p>
            <p className="font-bold text-xl text-[#C59D5F]">{priceDetail.single} USD</p>
             <p className="text-xs text-gray-500">{uiText.modalPerPerson}</p>
          </div>
        </div>
      )
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-200 mb-3">{uiText.modalCategory}</h3>
      <div className={`p-4 border rounded-lg text-left mb-6 ${selectedCategory === 'gold' ? 'border-[#C59D5F] bg-amber-900/20' : 'border-sky-400 bg-sky-900/20'}`}>
          <p className={`font-bold flex items-center gap-2 ${selectedCategory === 'gold' ? 'text-[#C59D5F]' : 'text-sky-400'}`}>
              {selectedCategory === 'gold' ? <RaSunIcon className="w-5 h-5" /> : <DiamondIcon className="w-5 h-5" />}
              {selectedCategory === 'gold' ? uiText.modalCategoryGold : uiText.modalCategoryDiamond}
          </p>
          <p className="text-xs text-gray-400 mt-1">
              {selectedCategory === 'gold' ? uiText.modalCategoryGoldDesc : uiText.modalCategoryDiamondDesc}
          </p>
      </div>

      {isLoading && <p className="text-center text-gray-400">Calculating prices...</p>}

      {!isLoading && seasonalPrices && (
        <div className="animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">
                {uiText.modalPricesBySeason}
                 <span className={`${selectedCategory === 'gold' ? 'text-[#C59D5F]' : 'text-sky-400'} ml-2`}>({selectedCategory === 'gold' ? uiText.modalCategoryGold : uiText.modalCategoryDiamond})</span>
            </h3>
            <div className="space-y-6">
                {(!detectedSeason || detectedSeason === 'summer') && (
                  <div>
                      <h4 className="font-semibold text-gray-300 mb-3 flex items-center"><RaSunIcon className="w-5 h-5 mr-2 text-yellow-400" /> {uiText.modalSummerSeason}</h4>
                      {renderPrice(seasonalPrices.summer)}
                  </div>
                )}
                {(!detectedSeason || detectedSeason === 'winter') && (
                  <div>
                      <h4 className="font-semibold text-gray-300 mb-3 flex items-center"><CrescentMoonIcon className="w-5 h-5 mr-2 text-blue-300" /> {uiText.modalWinterSeason}</h4>
                      {renderPrice(seasonalPrices.winter)}
                  </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default CustomPricingCalculator;