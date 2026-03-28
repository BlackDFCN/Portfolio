/**
 * PDF Generation & Email Service
 * Nota: Se recomienda usar window.print() en el componente ProposalView
 * Este archivo es para referencia de generación de PDFs programáticos en el futuro
 */

import { ProposalData, formatCLP, formatDate } from './proposalGenerator';

/**
 * Placeholder para futura implementación de PDF con jsPDF
 * Por ahora, usar ProposalView con window.print()
 */
export async function generateProposalPDF(proposal: ProposalData): Promise<Buffer> {
  // Implementación futura con jsPDF + html2canvas
  throw new Error('PDF generation via API not yet implemented. Use window.print() from UI.');
}

/**
 * Envía propuesta por email (requiere API backend)
 * TODO: Implementar con Resend o similar
 */
export async function sendProposalEmail(
  proposal: ProposalData,
  recipientEmail: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch('/api/email/send-proposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientEmail,
        proposalId: proposal.proposalId,
        clientName: proposal.lead.name,
        proposalData: proposal,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }

    const data = await response.json();
    return { success: true, messageId: data.messageId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
