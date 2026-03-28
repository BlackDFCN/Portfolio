/**
 * Fase 1 - Formulario de Captura de Leads
 * Recopila información de contacto y necesidades iniciales
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
  PhoneInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Textarea,
} from '@/components/ui';
import { FormDataPhase1 } from '@/lib/leadClassifier';

interface Phase1FormProps {
  onSubmit: (data: FormDataPhase1) => void;
  loading?: boolean;
}

export function Phase1Form({ onSubmit, loading = false }: Phase1FormProps) {
  const [formData, setFormData] = useState<FormDataPhase1>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    business_location: '',
    solution_type: 'website',
    main_objective: '',
    has_design: false,
    has_content: false,
    estimated_budget: 'sin definir',
    timeline: 'flexible',
    consent_data: false,
    additional_notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
          <CardTitle className="text-white">🚀 Cuéntanos sobre tu proyecto</CardTitle>
          <CardDescription className="text-blue-100">
            Completa esta información básica para recibir una propuesta personalizada en minutos.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4 pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Tu Información
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Corporativo</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Ubicación y Contacto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">¿En qué país/ciudad te encuentras? *</Label>
                  <Input
                    id="location"
                    placeholder="Ej: Santiago, Chile"
                    value={formData.business_location}
                    onChange={(e) => setFormData({ ...formData, business_location: e.target.value })}
                    required
                  />
                </div>
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  defaultCountry="CL"
                  label="Teléfono de Contacto"
                  placeholder="XXXXXXXXX"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Tu Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Nombre de la Empresa</Label>
                  <Input
                    id="company"
                    placeholder="Mi Empresa Ltda."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Rubro / Industria</Label>
                  <Input
                    id="industry"
                    placeholder="Ej: E-commerce, Retail, Consultoría..."
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Sobre tu Proyecto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Tipo de Solución</Label>
                  <Select 
                    value={formData.solution_type} 
                    onValueChange={(val) => setFormData({ ...formData, solution_type: val as any })}
                  >
                    <SelectTrigger><SelectValue placeholder="Selecciona el tipo" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog / Personal</SelectItem>
                      <SelectItem value="website">Sitio Web Corporativo</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce / Tienda</SelectItem>
                      <SelectItem value="sistema">Sistema a Medida / SaaS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="objective">Objetivo Principal</Label>
                  <Input
                    id="objective"
                    placeholder="Ej: Aumentar ventas, Marca personal..."
                    value={formData.main_objective}
                    onChange={(e) => setFormData({ ...formData, main_objective: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <Checkbox id="has_design" checked={formData.has_design} onCheckedChange={(c) => setFormData({ ...formData, has_design: !!c })} />
                  <Label htmlFor="has_design" className="cursor-pointer">Ya tengo diseño</Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <Checkbox id="has_content" checked={formData.has_content} onCheckedChange={(c) => setFormData({ ...formData, has_content: !!c })} />
                  <Label htmlFor="has_content" className="cursor-pointer">Ya tengo contenido</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4 pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                Presupuesto y Tiempos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Inversión Estimada</Label>
                  <Select value={formData.estimated_budget} onValueChange={(val) => setFormData({ ...formData, estimated_budget: val })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sin definir">Aún no definido</SelectItem>
                      <SelectItem value="bajo">Bajo (hasta CLP $600k)</SelectItem>
                      <SelectItem value="medio">Medio (CLP $600k - $2.5M)</SelectItem>
                      <SelectItem value="alto">Alto (más de CLP $2.5M)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timeline Deseado</Label>
                  <Select value={formData.timeline} onValueChange={(val) => setFormData({ ...formData, timeline: val })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible</SelectItem>
                      <SelectItem value="1-2 meses">1-2 meses</SelectItem>
                      <SelectItem value="urgente">Menos de 1 mes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <Checkbox id="consent" checked={formData.consent_data} onCheckedChange={(c) => setFormData({ ...formData, consent_data: !!c })} required />
              <Label htmlFor="consent" className="text-sm font-medium cursor-pointer">Acepto el tratamiento de mis datos</Label>
            </div>

            <Button type="submit" disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.consent_data} className="w-full py-6 text-lg font-bold">
              {loading ? '⏳ Procesando...' : 'Obtener Propuesta Ahora →'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
