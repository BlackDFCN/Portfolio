/**
 * PhoneInput - Campo de teléfono con selector de país
 * Soporta múltiples países y valida formato numérico
 */

'use client';

import { useState } from 'react';
import { Input, Label } from '@/components/ui';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  maxLength: number;
}

const COUNTRIES: Country[] = [
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '+56', maxLength: 9 },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54', maxLength: 10 },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '+57', maxLength: 10 },
  { code: 'MX', name: 'México', flag: '🇲🇽', dialCode: '+52', maxLength: 10 },
  { code: 'PE', name: 'Perú', flag: '🇵🇪', dialCode: '+51', maxLength: 9 },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷', dialCode: '+55', maxLength: 11 },
  { code: 'ES', name: 'España', flag: '🇪🇸', dialCode: '+34', maxLength: 9 },
  { code: 'US', name: 'USA/Canadá', flag: '🇺🇸', dialCode: '+1', maxLength: 10 },
  { code: 'OTHER', name: 'Otro país', flag: '🌍', dialCode: '+', maxLength: 15 },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onCountryChange?: (country: string, dialCode: string) => void;
  defaultCountry?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  onCountryChange,
  defaultCountry = 'CL',
  label = 'Teléfono',
  placeholder = 'XXXXXXXXX',
  required = false,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find((c) => c.code === defaultCountry) || COUNTRIES[0]
  );
  const [showCountryList, setShowCountryList] = useState(false);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
    onCountryChange?.(country.code, country.dialCode);
    // Limpiar el campo de teléfono cuando cambia país
    onChange('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Remover caracteres no numéricos
    input = input.replace(/\D/g, '');

    // Limitar según país
    if (input.length > selectedCountry.maxLength) {
      input = input.slice(0, selectedCountry.maxLength);
    }

    onChange(input);
  };

  // Evitar que se escriban caracteres no numéricos
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Solo permitir números y algunas teclas especiales (backspace, delete, etc)
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Prevenir pegar contenido no numérico
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text');
    if (!/^\d*$/.test(pasteData)) {
      e.preventDefault();
    }
  };

  // Formatear el número para visualización
  const getFormattedPhone = () => {
    if (!value) return '';
    return `${selectedCountry.dialCode} ${value}`;
  };

  return (
    <div className="space-y-2">
      <Label>{label} {required && <span className="text-red-500">*</span>}</Label>

      <div className="flex gap-2 items-center">
        {/* Selector de País - Custom */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCountryList(!showCountryList)}
            className="px-4 py-2 border-2 border-blue-500 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-600 min-w-fit"
            title="Selecciona tu país"
          >
            <span className="text-2xl">{selectedCountry.flag}</span>
          </button>

          {/* Dropdown de países */}
          {showCountryList && (
            <div className="absolute top-full left-0 mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-xl z-50 max-h-56 overflow-y-auto min-w-max">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountryChange(country)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-100 flex items-center gap-3 border-b last:border-b-0 whitespace-nowrap"
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{country.name}</span>
                    <span className="text-xs text-gray-500">{country.dialCode}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Campo de Teléfono */}
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-semibold pointer-events-none">
            {selectedCountry.dialCode}
          </div>
          <Input
            type="tel"
            placeholder={placeholder}
            value={value}
            onChange={handlePhoneChange}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            className="pl-16"
            maxLength={selectedCountry.maxLength}
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Display del teléfono completo */}
      {value && (
        <div className="text-xs text-gray-600 flex items-center gap-2">
          <span>📱 Número completo:</span>
          <code className="bg-gray-100 px-2 py-1 rounded font-semibold">
            {getFormattedPhone()}
          </code>
        </div>
      )}

      {/* Validación */}
      <div className="text-xs text-gray-500">
        {selectedCountry.code !== 'OTHER' ? (
          <>
            ✓ {selectedCountry.name}: {selectedCountry.maxLength} dígitos
            {value && ` (${value.length}/${selectedCountry.maxLength})`}
          </>
        ) : (
          <>🌍 Otro país seleccionado</>
        )}
      </div>
    </div>
  );
}

export default PhoneInput;
