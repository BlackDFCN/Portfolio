/**
 * Fase 2 - Formulario Condicional para WEBSITE
 * Para: PYME con solución Website Corporativo
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Checkbox,
  Textarea,
} from '@/components/ui';

export interface WebsiteFormData {
  cantidad_paginas: number;
  necesita_blog: boolean;
  necesita_formularios: boolean;
  necesita_galeria: boolean;
  necesita_maps: boolean;
  necesita_newsletter: boolean;
  integraciones: string[]; // Calendly, Zapier, etc
  copywriting_incluido: boolean;
  idiomas?: string[]; // Cuáles idiomas
  seo_avanzado: boolean; // Estrategia SEO completa
  notas_adicionales: string;
}

interface WebsiteFormProps {
  onSubmit: (data: WebsiteFormData) => void;
  onBack: () => void;
  loading?: boolean;
}

const INTEGRACIONES_DISPONIBLES = [
  { id: 'calendly', label: 'Calendly (Agendar citas)', price: 50000 },
  { id: 'zapier', label: 'Zapier (Automatizaciones)', price: 75000 },
  { id: 'stripe', label: 'Stripe (Pagos de productos)', price: 100000 },
  { id: 'shopify', label: 'Shopify (Sincronización)', price: 150000 },
  { id: 'crm', label: 'CRM (HubSpot/Pipedrive)', price: 100000 },
];

export function WebsiteForm({ onSubmit, onBack, loading = false }: WebsiteFormProps) {
  const [formData, setFormData] = useState<WebsiteFormData>({
    cantidad_paginas: 7,
    necesita_blog: false,
    necesita_formularios: true,
    necesita_galeria: false,
    necesita_maps: false,
    necesita_newsletter: true,
    integraciones: [],
    copywriting_incluido: false,
    idiomas: ['Español'],
    seo_avanzado: false,
    notas_adicionales: '',
  });

  const [errors, setErrors] = useState<Partial<WebsiteFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<WebsiteFormData> = {};
    if (formData.cantidad_paginas < 5 || formData.cantidad_paginas > 50) {
      newErrors.cantidad_paginas = 'Debes especificar entre 5 y 50 páginas' as any;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const toggleIntegracion = (id: string) => {
    const newIntegraciones = formData.integraciones.includes(id)
      ? formData.integraciones.filter((i) => i !== id)
      : [...formData.integraciones, id];
    setFormData({ ...formData, integraciones: newIntegraciones });
  };

  const costoIntegraciones = formData.integraciones.reduce((total, id) => {
    const integracion = INTEGRACIONES_DISPONIBLES.find((i) => i.id === id);
    return total + (integracion?.price || 0);
  }, 0);

  const costoCopywriting = formData.copywriting_incluido ? 100000 : 0;
  const precioTotal = 1500000 + costoIntegraciones + costoCopywriting;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>🌐 Detalles del Sitio Web</CardTitle>
          <CardDescription>
            Cuéntanos los requerimientos técnicos de tu sitio corporativo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paginas">¿Cuántas páginas aproximadamente tendrá el sitio? (5-50)</Label>
              <Input
                id="paginas"
                type="number"
                min="5"
                max="50"
                value={formData.cantidad_paginas}
                onChange={(e) => setFormData({ ...formData, cantidad_paginas: parseInt(e.target.value) })}
                className={errors.cantidad_paginas ? 'border-red-500' : ''}
              />
              {errors.cantidad_paginas && <p className="text-sm text-red-500">{errors.cantidad_paginas}</p>}
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-sm">Funcionalidades Extras</p>
              <div className="flex items-center space-x-3">
                <Checkbox id="blog" checked={formData.necesita_blog} onCheckedChange={(c) => setFormData({...formData, necesita_blog: !!c})} />
                <Label htmlFor="blog">Blog Integrado (CMS)</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="galeria" checked={formData.necesita_galeria} onCheckedChange={(c) => setFormData({...formData, necesita_galeria: !!c})} />
                <Label htmlFor="galeria">Galería de Proyectos</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="newsletter" checked={formData.necesita_newsletter} onCheckedChange={(c) => setFormData({...formData, necesita_newsletter: !!c})} />
                <Label htmlFor="newsletter">Newsletter (Email Marketing)</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Integraciones</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {INTEGRACIONES_DISPONIBLES.map((int) => (
                  <div key={int.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox id={int.id} checked={formData.integraciones.includes(int.id)} onCheckedChange={() => toggleIntegracion(int.id)} />
                    <Label htmlFor={int.id}>{int.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notas">Notas adicionales</Label>
              <Textarea
                id="notas"
                placeholder="Requerimientos específicos, inspiración..."
                value={formData.notas_adicionales}
                onChange={(e) => setFormData({ ...formData, notas_adicionales: e.target.value })}
                rows={3}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total Estimado Fase 2</span>
                <span className="text-xl font-bold text-blue-600">${precioTotal.toLocaleString()} CLP</span>
              </div>
            </div>

            <div className="flex gap-4 justify-between pt-4">
              <Button type="button" variant="outline" onClick={onBack}>← Volver</Button>
              <Button type="submit" disabled={loading}>{loading ? '⏳ Procesando...' : 'Generar Propuesta →'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
