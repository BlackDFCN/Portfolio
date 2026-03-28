/**
 * EJEMPLO: Formulario de Contacto con Country Components
 * Copia esta estructura adaptada a tus necesidades
 */

'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  CountrySelector,
  PhoneInput,
} from '@/components/ui';
import { COUNTRIES_DATA } from '@/components/ui/CountrySelector';

export function ExampleContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'CL',
    company: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleCountryChange = (country: any) => {
    setFormData((prev) => ({
      ...prev,
      country: country.code,
    }));
  };

  const handlePhoneCountryChange = (countryCode: string) => {
    // Sincronizar si el usuario cambia país en PhoneInput
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí harías el envío al API
    console.log('Datos del formulario:', {
      ...formData,
      // El teléfono solo contiene números, agregar el código:
      phoneWithCode: `+${COUNTRIES_DATA.find((c) => c.code === formData.country)?.dialCode.replace('+', '')} ${formData.phone}`,
    });

    setSubmitted(true);
    
    // Limpiar después de 3 segundos
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: 'CL',
        company: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>📧 Contáctanos</CardTitle>
          <CardDescription>
            Completa el formulario y nos pondremos en contacto rápidamente
          </CardDescription>
        </CardHeader>

        <CardContent>
          {submitted ? (
            <div className="text-center py-8 space-y-2">
              <div className="text-4xl">✓</div>
              <p className="text-lg font-semibold text-green-600">¡Mensaje enviado!</p>
              <p className="text-gray-600">Te contactaremos pronto</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECCIÓN 1: DATOS PERSONALES */}
              <div className="space-y-4 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">👤 Tus Datos</h3>

                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">Empresa (Opcional)</Label>
                  <Input
                    id="company"
                    placeholder="Tu empresa"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* SECCIÓN 2: PAÍS Y TELÉFONO */}
              <div className="space-y-4 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">🌍 Ubicación</h3>

                <CountrySelector
                  value={formData.country}
                  onChange={handleCountryChange}
                  label="¿De dónde contactas?"
                  showDetails={true}
                  required
                />

                <PhoneInput
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: value,
                    }))
                  }
                  onCountryChange={handlePhoneCountryChange}
                  defaultCountry={formData.country}
                  label="Teléfono"
                  required
                />
              </div>

              {/* SECCIÓN 3: MENSAJE */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">💬 Tu Mensaje</h3>

                <div>
                  <Label htmlFor="message">¿En qué podemos ayudarte?</Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos sobre tu necesidad..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={5}
                    required
                  />
                </div>
              </div>

              {/* BOTÓN ENVÍO */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-bold"
              >
                📤 Enviar Mensaje
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Responderemos en menos de 24 horas
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ExampleContactForm;
