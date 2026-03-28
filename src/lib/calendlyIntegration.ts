/**
 * Calendly Integration
 * Genera links para agendar llamadas
 */

export const CALENDLY_CONFIG = {
  // Cambiar por tu username de Calendly
  username: process.env.NEXT_PUBLIC_CALENDLY_USERNAME || 'tudominio',

  // Tipos de eventos disponibles
  events: {
    discovery_call: {
      slug: 'discovery-30min',
      duration: 30,
      title: 'Discovery Call - 30 minutos',
      description:
        'Llamada inicial para revisar tu propuesta y responder preguntas. Sin compromiso.',
    },
    technical_call: {
      slug: 'technical-scoping',
      duration: 60,
      title: 'Technical Scoping - 1 hora',
      description:
        'Llamada técnica profunda para sistemas complejos. Revisamos arquitectura y detalles.',
    },
    consultation: {
      slug: 'consultation',
      duration: 45,
      title: 'Consulta Gratis - 45 minutos',
      description: 'Sesión de consulta sin compromiso. Cuéntanos tu proyecto.',
    },
  },
};

/**
 * Genera URL para agendar llamada
 */
export function getCalendlyBookingUrl(
  eventType: keyof typeof CALENDLY_CONFIG.events = 'discovery_call',
  prefillData?: {
    name?: string;
    email?: string;
    company?: string;
    proposalId?: string;
  }
): string {
  const event = CALENDLY_CONFIG.events[eventType];
  const baseUrl = `https://calendly.com/${CALENDLY_CONFIG.username}/${event.slug}`;

  if (!prefillData) {
    return baseUrl;
  }

  // Agregar parámetros de prefill
  const params = new URLSearchParams();
  if (prefillData.name) {
    params.append('name', prefillData.name);
  }
  if (prefillData.email) {
    params.append('email', prefillData.email);
  }

  // Nota: Calendly limita los parámetros que se pueden prefill
  // Consultar documentación oficial para más detalles

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Widget de Calendly embebido (para usar en React)
 * Requiere: npm install react-calendly
 */
export function getCalendlyWidgetCode(
  eventType: keyof typeof CALENDLY_CONFIG.events = 'discovery_call'
): string {
  const event = CALENDLY_CONFIG.events[eventType];
  const calendlyUrl = `https://calendly.com/${CALENDLY_CONFIG.username}/${event.slug}`;
  return `
    import { InlineWidget } from "react-calendly";
    
    export function BookingWidget() {
      return (
        <InlineWidget 
          url="${calendlyUrl}"
          styles={{
            height: '630px'
          }}
        />
      );
    }
  `;
}

/**
 * Obtiene las opciones DE horarios disponibles (requiere API key de Calendly)
 * Implementación básica - expandir según necesidad
 */
export async function getAvailableTimeSlots(
  eventType: keyof typeof CALENDLY_CONFIG.events = 'discovery_call'
): Promise<string[]> {
  // Esta función requeriría una llamada a la API de Calendly
  // Por ahora retorna placeholder
  try {
    const response = await fetch(
      `https://calendly.com/api/v1/user/availability?username=${CALENDLY_CONFIG.username}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('No se pudieron obtener horarios');
    }

    const data = await response.json();
    return data.available_times || [];
  } catch (error) {
    console.error('Error fetching Calendly slots:', error);
    // Retornar URL del calendario como fallback
    return [
      getCalendlyBookingUrl(
        eventType as keyof typeof CALENDLY_CONFIG.events
      ),
    ];
  }
}

/**
 * Hook para integrar calendario en componentes React
 */
export function useCalendlyBooking(
  eventType: keyof typeof CALENDLY_CONFIG.events = 'discovery_call'
) {
  const getBookingUrl = (prefillData?: any) => {
    return getCalendlyBookingUrl(eventType, prefillData);
  };

  const openCalendly = (prefillData?: any) => {
    const url = getBookingUrl(prefillData);
    window.open(url, 'calendly-popup', 'width=800,height=700');
  };

  return {
    bookingUrl: getBookingUrl(),
    openCalendly,
    eventInfo: CALENDLY_CONFIG.events[eventType],
  };
}
