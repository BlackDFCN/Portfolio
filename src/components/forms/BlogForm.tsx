/**
 * Fase 2 - Formulario Condicional para BLOG
 * Para: Personas/Freelancers con solución Blog
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

export interface BlogFormData {
  tema_principal: string; 
  frecuencia_publicacion: 'semanal' | 'bisemanal' | 'mensual';
  necesita_cms: boolean;
  necesita_newsletter: boolean;
  necesita_seo: boolean;
  integracion_redes: boolean;
  fotos_propias: boolean;
  notas_adicionales: string;
}

interface BlogFormProps {
  onSubmit: (data: BlogFormData) => void;
  onBack: () => void;
  loading?: boolean;
}

export function BlogForm({ onSubmit, onBack, loading = false }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    tema_principal: '',
    frecuencia_publicacion: 'mensual',
    necesita_cms: true,
    necesita_newsletter: true,
    necesita_seo: true,
    integracion_redes: false,
    fotos_propias: true,
    notas_adicionales: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.tema_principal.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>📝 Detalles de tu Blog</CardTitle>
          <CardDescription>Configura los detalles técnicos de tu nuevo blog.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tema">¿Cuál es la temática principal?</Label>
              <Input
                id="tema"
                placeholder="Ej: Marketing, Gastronomía..."
                value={formData.tema_principal}
                onChange={(e) => setFormData({ ...formData, tema_principal: e.target.value })}
                required
              />
            </div>

            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Checkbox id="cms" checked={formData.necesita_cms} onCheckedChange={(v) => setFormData({...formData, necesita_cms: !!v})} />
                <Label htmlFor="cms">Gestor de Contenidos (Admin Panel)</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="seo" checked={formData.necesita_seo} onCheckedChange={(v) => setFormData({...formData, necesita_seo: !!v})} />
                <Label htmlFor="seo">Optimización SEO Inicial</Label>
              </div>
            </div>

            <div className="flex gap-4 justify-between pt-4">
              <Button type="button" variant="outline" onClick={onBack}>← Volver</Button>
              <Button type="submit" disabled={loading}>{loading ? '⏳ Procesando...' : 'Finalizar →'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
