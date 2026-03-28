/**
 * CountrySelector - Selector de País Reutilizable
 * Muestra banderas y auto-rellena datos del país
 */

'use client';

import { useState } from 'react';
import { Input, Label } from '@/components/ui';

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  currency: string;
  timezone: string;
  language: string;
}

export const COUNTRIES_DATA: CountryData[] = [
  {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    dialCode: '+56',
    currency: 'CLP',
    timezone: 'CLT (UTC-3)',
    language: 'Español',
  },
  {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    dialCode: '+54',
    currency: 'ARS',
    timezone: 'ART (UTC-3)',
    language: 'Español',
  },
  {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    dialCode: '+57',
    currency: 'COP',
    timezone: 'COT (UTC-5)',
    language: 'Español',
  },
  {
    code: 'MX',
    name: 'México',
    flag: '🇲🇽',
    dialCode: '+52',
    currency: 'MXN',
    timezone: 'CST (UTC-6)',
    language: 'Español',
  },
  {
    code: 'PE',
    name: 'Perú',
    flag: '🇵🇪',
    dialCode: '+51',
    currency: 'PEN',
    timezone: 'PET (UTC-5)',
    language: 'Español',
  },
  {
    code: 'BR',
    name: 'Brasil',
    flag: '🇧🇷',
    dialCode: '+55',
    currency: 'BRL',
    timezone: 'BRT (UTC-3)',
    language: 'Portugués',
  },
  {
    code: 'ES',
    name: 'España',
    flag: '🇪🇸',
    dialCode: '+34',
    currency: 'EUR',
    timezone: 'CET (UTC+1)',
    language: 'Español',
  },
  {
    code: 'US',
    name: 'USA/Canadá',
    flag: '🇺🇸',
    dialCode: '+1',
    currency: 'USD',
    timezone: 'EST (UTC-5)',
    language: 'Inglés',
  },
  {
    code: 'OTHER',
    name: 'Otro país',
    flag: '🌍',
    dialCode: '+',
    currency: 'USD',
    timezone: 'UTC',
    language: 'English',
  },
];

interface CountrySelectorProps {
  value?: string; // Country code
  onChange: (country: CountryData) => void;
  defaultCountry?: string;
  label?: string;
  showDetails?: boolean; // Mostrar divisa, zona horaria, idioma
  required?: boolean;
}

export function CountrySelector({
  value,
  onChange,
  defaultCountry = 'CL',
  label = 'País / Región',
  showDetails = true,
  required = false,
}: CountrySelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedCountry =
    COUNTRIES_DATA.find((c) => c.code === value || c.code === defaultCountry) || COUNTRIES_DATA[0];

  const handleSelectCountry = (country: CountryData) => {
    onChange(country);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-2">
      <Label>{label} {required && <span className="text-red-500">*</span>}</Label>

      <div className="relative">
        {/* Botón Selector */}
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedCountry.flag}</span>
            <div className="text-left">
              <div className="font-semibold text-gray-900">{selectedCountry.name}</div>
              <div className="text-xs text-gray-500">{selectedCountry.dialCode}</div>
            </div>
          </div>
          <span className="text-gray-500">{showDropdown ? '▲' : '▼'}</span>
        </button>

        {/* Dropdown de Países */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
            {COUNTRIES_DATA.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelectCountry(country)}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b last:border-b-0 transition"
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{country.name}</div>
                  <div className="text-xs text-gray-500">{country.dialCode}</div>
                </div>
                {value === country.code && <span className="text-blue-600 font-bold">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detalles del País */}
      {showDetails && selectedCountry.code !== 'OTHER' && (
        <div className="grid grid-cols-2 gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <p className="text-xs text-gray-600">💱 Divisa</p>
            <p className="font-semibold text-blue-600">{selectedCountry.currency}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">🕐 Zona Horaria</p>
            <p className="font-semibold text-blue-600">{selectedCountry.timezone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-600">🗣️ Idioma</p>
            <p className="font-semibold text-blue-600">{selectedCountry.language}</p>
          </div>
        </div>
      )}

      {/* No mostrar detalles si es "Otro país" */}
      {selectedCountry.code === 'OTHER' && (
        <div className="text-xs text-gray-500 p-2">
          🌍 Selecciona un país de la lista para ver más detalles
        </div>
      )}
    </div>
  );
}

export default CountrySelector;
