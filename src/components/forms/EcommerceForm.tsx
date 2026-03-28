/**
 * Fase 2 - Formulario Condicional para E-COMMERCE
 * Para: PYME con solución E-commerce
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

export interface EcommerceFormData {
  cantidad_productos: number;
  necesita_inventario_realtime: boolean;
  pasarelas_pago: string[]; // webpay, stripe, transferencia
  envios_nacional: boolean;
  integracion_contabilidad: boolean;
  email_transaccional: boolean;
  reportes_ventas: boolean;
  notas_adicionales: string;
}

interface EcommerceFormProps {
  onSubmit: (data: EcommerceFormData) => void;
  onBack: () => void;
  loading?: boolean;
}

const PASARELAS = [
  { id: 'webpay', label: 'Webpay (Transbank)' },
  { id: 'stripe', label: 'Stripe' },
  { id: 'transferencia', label: 'Transferencia Bancaria' },
];

export function EcommerceForm({ onSubmit, onBack, loading = false }: EcommerceFormProps) {
  const [formData, setFormData] = useState<EcommerceFormData>({
    cantidad_productos: 100,
    necesita_inventario_realtime: true,
    pasarelas_pago: ['webpay'],
    envios_nacional: true,
    integracion_contabilidad: false,
    email_transaccional: true,
    reportes_ventas: true,
    notas_adicionales: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePasarela = (id: string) => {
    const newPasarelas = formData.pasarelas_pago.includes(id)
      ? formData.pasarelas_pago.filter((p) => p !== id)
      : [...formData.pasarelas_pago, id];
    setFormData({ ...formData, pasarelas_pago: newPasarelas });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>🛒 Detalles del E-commerce</CardTitle>
          <CardDescription>Configura los detalles de tu tienda online.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productos">¿Cuántos productos aproximadamente?</Label>
              <Input
                id="productos"
                type="number"
                min="20"
                value={formData.cantidad_productos}
                onChange={(e) => setFormData({ ...formData, cantidad_productos: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-4">
              <Label>Pasarelas de Pago</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PASARELAS.map((p) => (
                  <div key={p.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <Checkbox id={p.id} checked={formData.pasarelas_pago.includes(p.id)} onCheckedChange={() => togglePasarela(p.id)} />
                    <Label htmlFor={p.id} className="cursor-pointer font-semibold">{p.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 justify-between pt-4">
              <Button type="button" variant="outline" onClick={onBack}>← Volver</Button>
              <Button type="submit" disabled={loading}>{loading ? '⏳ Procesando...' : 'Propuesta Ahora →'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
