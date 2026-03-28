# 🌍 Country Components - Selectores de País Reutilizables

## Descripción General

Implementé un sistema de **componentes reutilizables para manejar países** que funcionan en conjunto:

1. **`CountrySelector`** - Selector visual de país con bandera y detalles
2. **`PhoneInput`** - Entrada de teléfono sincronizada con país
3. **`useCountry`** - Hook para sincronizar estado entre componentes

---

## 📦 Componentes Disponibles

### 1. CountrySelector

Selector visual de país que muestra banderas, divisa, zona horaria e idioma.

**Uso Básico:**
```tsx
import { CountrySelector } from '@/components/ui';

<CountrySelector
  value={selectedCountry}
  onChange={(country) => setSelectedCountry(country.code)}
  defaultCountry="CL"
  label="¿De qué país eres?"
  showDetails={true}
  required
/>
```

**Props:**
```typescript
interface CountrySelectorProps {
  value?: string;                          // Country code ('CL', 'AR', etc.)
  onChange: (country: CountryData) => void; // Callback cuando cambia
  defaultCountry?: string;                 // País por defecto ('CL')
  label?: string;                          // Etiqueta
  showDetails?: boolean;                   // Mostrar divisa/timezone/idioma
  required?: boolean;                      // Campo requerido
}
```

**Output:**
```
Muestra:                    Detalles (si showDetails=true):
🇨🇱 Chile              →    💱 Divisa: CLP
+56                        🕐 Zona Horaria: CLT (UTC-3)
                           🗣️ Idioma: Español
```

---

### 2. PhoneInput

Entrada de teléfono inteligente que se sincroniza automáticamente con el país.

**Uso Básico:**
```tsx
import { PhoneInput } from '@/components/ui';

<PhoneInput
  value={phone}
  onChange={(value) => setPhone(value)}
  onCountryChange={(country, dialCode) => setCountryCode(country)}
  defaultCountry={selectedCountry}
  label="Teléfono"
  required
/>
```

**Props:**
```typescript
interface PhoneInputProps {
  value: string;           // Valor (solo números)
  onChange: (value: string) => void;
  onCountryChange?: (country: string, dialCode: string) => void;
  defaultCountry?: string; // País inicial
  label?: string;
  placeholder?: string;
  required?: boolean;
}
```

---

### 3. useCountry Hook

Hook para sincronizar país entre múltiples componentes.

**Uso:**
```tsx
import { useCountry } from '@/hooks/useCountry';

function MyForm() {
  const { country, countryCode, setCountry, dialCode } = useCountry('CL');

  return (
    <>
      <CountrySelector
        value={countryCode}
        onChange={setCountry}
      />
      <PhoneInput
        defaultCountry={countryCode}
        onCountryChange={(c) => setCountry(c)}
      />
      <p>Teléfono: {dialCode} XXXXXX</p>
    </>
  );
}
```

**Return:**
```typescript
interface UseCountryReturn {
  country: CountryData;           // Objeto completo del país
  countryCode: string;            // Código ('CL', 'AR', etc.)
  setCountry: (country) => void;  // Setter
  dialCode: string;               // Código de marcado ('+56')
  phoneCode: {                     // Datos rápidos
    code: string;
    dialCode: string;
    name: string;
  };
}
```

---

## 🎯 Ejemplo Completo en Formulario

```tsx
'use client';

import { useState } from 'react';
import { CountrySelector, PhoneInput, Input } from '@/components/ui';
import { useCountry } from '@/hooks/useCountry';

export function MyForm() {
  const { countryCode, setCountry } = useCountry('CL');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      country: countryCode,
      phone: phone,
      email: email
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Selector de País */}
      <CountrySelector
        value={countryCode}
        onChange={setCountry}
        showDetails={true}
        required
      />

      {/* Email */}
      <div>
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Teléfono - Sincronizado con País */}
      <PhoneInput
        value={phone}
        onChange={setPhone}
        defaultCountry={countryCode}
        onCountryChange={(c) => setCountry(c)}
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
```

---

## 🌍 Países Soportados

Todos desde `COUNTRIES_DATA`:

```
🇨🇱 Chile        (+56)   → 9 dígitos   → CLP,   CLT (UTC-3)
🇦🇷 Argentina    (+54)   → 10 dígitos  → ARS,   ART (UTC-3)
🇨🇴 Colombia     (+57)   → 10 dígitos  → COP,   COT (UTC-5)
🇲🇽 México       (+52)   → 10 dígitos  → MXN,   CST (UTC-6)
🇵🇪 Perú         (+51)   → 9 dígitos   → PEN,   PET (UTC-5)
🇧🇷 Brasil       (+55)   → 11 dígitos  → BRL,   BRT (UTC-3)
🇪🇸 España       (+34)   → 9 dígitos   → EUR,   CET (UTC+1)
🇺🇸 USA/Canadá   (+1)    → 10 dígitos  → USD,   EST (UTC-5)
🌍 Otro país     (+)     → 15 dígitos  → USD,   UTC
```

**Ver:** `COUNTRIES_DATA` en `CountrySelector.tsx`

---

## 💡 Casos de Uso

### 1. Formulario Simple (Solo País)
```tsx
<CountrySelector onChange={setCountry} />
```

### 2. Formulario con País + Teléfono
```tsx
const { countryCode, setCountry } = useCountry();

<CountrySelector value={countryCode} onChange={setCountry} />
<PhoneInput defaultCountry={countryCode} />
```

### 3. Formulario con Sincronización Bidireccional
```tsx
const { countryCode, setCountry } = useCountry();

// Si el usuario cambia país en CountrySelector
<CountrySelector onChange={setCountry} />

// Si el usuario cambia país en PhoneInput, actualiza CountrySelector
<PhoneInput onCountryChange={(c) => setCountry(c)} />
```

### 4. Formulario con Auto-relleno por País
```tsx
const { country } = useCountry();

<div>
  <p>Zona Horaria: {country.timezone}</p>
  <p>Divisa: {country.currency}</p>
  <p>Idioma: {country.language}</p>
</div>
```

---

## 🎨 Estilos Personalizados

Ambos componentes usan **Tailwind CSS**, puedes personalizarlos editando sus clases.

**CountrySelector clases principales:**
- Botón: `px-4 py-3 border border-gray-300 rounded-lg`
- Dropdown: `max-h-64 overflow-y-auto`

**PhoneInput clases principales:**
- Selector: `w-40`
- Input: `flex-1 relative`
- Display: `text-xs text-gray-600`

---

## ✅ Integración en Phase1Form

En `Phase1Form.tsx` ya está implementado:

```tsx
// Selector de País prominente
<CountrySelector
  value={selectedCountry}
  onChange={handleCountryChange}
  showDetails={true}
/>

// Teléfono sincronizado
<PhoneInput
  defaultCountry={selectedCountry}
  onCountryChange={(country) => {
    // Sincroniza bidireccional
    const countryData = COUNTRIES_DATA.find((c) => c.code === country);
    if (countryData) handleCountryChange(countryData);
  }}
/>
```

---

## 🚀 Próximos Pasos

### Usar en otros formularios:

1. **Contacto (contact form)**
   ```tsx
   import { CountrySelector, useCountry } from '@/components/ui';
   
   const { country, setCountry } = useCountry();
   <CountrySelector value={country.code} onChange={setCountry} />
   ```

2. **Fase 2 de solicitud**
   ```tsx
   // En EcommerceForm, SystemForm, etc.
   <CountrySelector 
     label="¿En qué país venderás?"
     onChange={(c) => setPhase2Data(prev => ({
       ...prev,
       country: c.code
     }))}
   />
   ```

3. **Propuestas (automatizar por país)**
   ```tsx
   // Ajustar precios/impuestos según país
   const { country } = useCountry();
   const priceAdjustment = PRICE_BY_COUNTRY[country.code];
   ```

---

## 📁 Archivos

- `src/components/ui/CountrySelector.tsx` - Componente selector
- `src/components/ui/PhoneInput.tsx` - Entrada de teléfono
- `src/hooks/useCountry.ts` - Hook de sincronización
- `src/components/forms/Phase1Form.tsx` - Formulario integrado

---

## ✨ Conclusión

Una **solución escalable y reutilizable** para manejar países en cualquier formulario de tu sitio:
- 🎯 Fácil de implementar
- 🔄 Componentes reutilizables
- 🌍 Soporte multi-país
- 💡 Hook para sincronización
- 🎨 Estilos bonitos con Tailwind
