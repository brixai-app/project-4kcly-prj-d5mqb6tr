import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRegion?: { country: string; currency: string; code: string };
  onSelectRegion?: (region: { country: string; currency: string; code: string }) => void;
  brandName?: string;
}

export default function WelcomeModal({
  isOpen,
  onClose,
  selectedRegion = { country: 'United States', currency: 'USD ($)', code: 'USD' },
  onSelectRegion,
  brandName = 'EAST SIDE',
}: WelcomeModalProps) {
  const [currentCurrency, setCurrentCurrency] = useState(selectedRegion.code || 'USD');
  const [isDetecting, setIsDetecting] = useState(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: '$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'AUD', name: 'Australian Dollar', symbol: '$' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  ];

  // Country to currency mapping
  const countryToCurrency: Record<string, string> = {
    'United States': 'USD',
    'Canada': 'CAD',
    'United Kingdom': 'GBP',
    'European Union': 'EUR',
    'India': 'INR',
    'Australia': 'AUD',
    'Japan': 'JPY',
  };

  const currencyToCountry = Object.entries(countryToCurrency).reduce((acc: any, [country, curr]) => {
    acc[curr] = country;
    return acc;
  }, {});

  const detectLocation = async () => {
    setIsDetecting(true);
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const countryToCurrencyMap: Record<string, string> = {
        'US': 'USD', 'CA': 'CAD', 'GB': 'GBP', 'IN': 'INR',
        'AU': 'AUD', 'JP': 'JPY',
        'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR',
        'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR', 'PT': 'EUR',
        'GR': 'EUR', 'IE': 'EUR', 'FI': 'EUR',
      };
      const detectedCurrency = countryToCurrencyMap[data.country_code] || 'USD';
      setCurrentCurrency(detectedCurrency);
    } catch (error) {
      console.error('Location detection failed:', error);
    } finally {
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    if (selectedRegion.code) setCurrentCurrency(selectedRegion.code);
  }, [selectedRegion]);

  const handleSave = () => {
    const selected = currencies.find(c => c.code === currentCurrency);
    if (onSelectRegion && selected) {
      onSelectRegion({
        country: currencyToCountry[currentCurrency] || 'United States',
        currency: `${selected.code} (${selected.symbol})`,
        code: selected.code
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-white max-w-md w-full relative animate-in fade-in duration-200">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 hover:opacity-60 transition-opacity cursor-pointer text-black"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-medium tracking-wide mb-8 text-black">
              WELCOME TO {brandName}
            </h1>

            <div className="mb-8">
              <p className="text-gray-600 mb-4 text-sm font-sans uppercase">YOU ARE SHIPPING TO:</p>
              
              {/* Auto-detect button */}
              <button
                onClick={detectLocation}
                disabled={isDetecting}
                className="w-full mb-4 border border-gray-300 px-4 py-3 text-sm flex items-center justify-center gap-2 hover:border-black transition-colors disabled:opacity-50 text-black font-sans cursor-pointer uppercase"
              >
                <MapPin size={16} />
                {isDetecting ? 'DETECTING LOCATION...' : 'AUTO-DETECT MY LOCATION'}
              </button>
              
              {/* Country/Currency Selector */}
              <select
                value={currentCurrency}
                onChange={(e) => setCurrentCurrency(e.target.value)}
                className="w-full border border-gray-300 px-4 py-4 text-lg font-medium focus:outline-none focus:border-black transition-colors bg-white appearance-none cursor-pointer text-black"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem',
                  paddingRight: '3rem'
                }}
              >
                {currencies.map(curr => (
                  <option key={curr.code} value={curr.code} className="text-black">
                    {currencyToCountry[curr.code] || curr.name} / {curr.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-black text-white py-4 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors cursor-pointer uppercase"
            >
              SAVE
            </button>

            <p className="text-xs text-gray-500 mt-6 text-center font-sans">
              You can change your region anytime from your profile
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
