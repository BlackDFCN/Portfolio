/**
 * Fase 2 - Formulario Condicional para SISTEMA A MEDIDA / SaaS
 * Para: PYME/Empresa con solución de Software a Medida
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

export interface SystemFormData {
  usuarios_estimados: number;
  modulos: number;
  necesita_auth_compleja: boolean;
  necesita_api: boolean;
  necesita_roles: boolean;
  necesita_reportes: boolean;
  integracion_erp: boolean;
  database_size: 'pequeña' | 'mediana' | 'grande';
  compliance_reglas: boolean;
  notas_adicionales: string;
}

interface SystemFormProps {
  onSubmit: (data: SystemFormData) => void;
  onBack: () => void;
  loading?: boolean;
}

export function SystemForm({ onSubmit, onBack, loading = false }: SystemFormProps) {
  const [formData, setFormData] = useState<SystemFormData>({
    usuarios_estimados: 10,
    modulos: 3,
    necesita_auth_compleja: true,
    necesita_api: true,
    necesita_roles: true,
    necesita_reportes: true,
    integracion_erp: false,
    database_size: 'mediana',
    compliance_reglas: false,
    notas_adicionales: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>⚙️ Detalles del Sistema a Medida</CardTitle>
          <CardDescription>Configura los requerimientos de tu SaaS o sistema interno.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usuarios">Usuarios simultáneos</Label>
                <Input
                  id="usuarios"
                  type="number"
                  min="1"
                  value={formData.usuarios_estimados}
                  onChange={(e) => setFormData({ ...formData, usuarios_estimados: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modulos">Cantidad de módulos</Label>
                <Input
                  id="modulos"
                  type="number"
                  min="1"
                  value={formData.modulos}
                  onChange={(e) => setFormData({ ...formData, modulos: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Checkbox id="auth" checked={formData.necesita_auth_compleja} onCheckedChange={(v) => setFormData({...formData, necesita_auth_compleja: !!v})} />
                <Label htmlFor="auth">Auth Robusta / 2FA</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="api" checked={formData.necesita_api} onCheckedChange={(v) => setFormData({...formData, necesita_api: !!v})} />
                <Label htmlFor="api">API Rest Pública</Label>
              </div>
            </div>
            <div className="flex gap-4 justify-between pt-4">
              <Button type="button" variant="outline" onClick={onBack}>← Volver</Button>
              <Button type="submit" disabled={loading}>{loading ? '⏳ Procesando...' : 'Obtener Cotización →'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
