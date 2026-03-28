/**
 * useCountry - Hook para manejar país y sincronizar entre componentes
 * Mantiene sincronizado el país entre PhoneInput, CountrySelector y otros campos
 */

'use client';

import { useState, useCallback } from 'react';
import { COUNTRIES_DATA, CountryData } from '@/components/ui/CountrySelector';

interface UseCountryReturn {
  country: CountryData;
  countryCode: string;
  setCountry: (country: CountryData | string) => void;
  dialCode: string;
  phoneCode: { code: string; dialCode: string; name: string };
}

export function useCountry(initialCountry: string = 'CL'): UseCountryReturn {
  const [countryCode, setCountryCode] = useState<string>(initialCountry);

  const country = COUNTRIES_DATA.find((c) => c.code === countryCode) || COUNTRIES_DATA[0];

  const setCountry = useCallback((incoming: CountryData | string) => {
    if (typeof incoming === 'string') {
      setCountryCode(incoming);
    } else {
      setCountryCode(incoming.code);
    }
  }, []);

  return {
    country,
    countryCode,
    setCountry,
    dialCode: country.dialCode,
    phoneCode: {
      code: country.code,
      dialCode: country.dialCode,
      name: country.name,
    },
  };
}

export default useCountry;
