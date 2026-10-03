export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  role: string;
  education: string;
  program: string;
  message: string;
}

/**
 * ============================================================
 * OWNER CONFIGURATION — inquiry form launch
 * ============================================================
 * The inquiry form is NOT connected to a backend yet. Contact.tsx shows an
 * honest "not sent" state and this function throws, so nothing entered in
 * the form is transmitted or stored anywhere.
 *
 * To launch the form:
 *   1. Choose the approved submission destination (form service, email API,
 *      CRM, etc.) with NeuroMind's explicit approval.
 *   2. Implement the POST inside submitInquiry() below and return normally
 *      on success. Contact.tsx will then show the success state.
 *   3. Write the approved privacy wording in PRIVACY_NOTE below (how
 *      inquiries are stored, who reviews them, retention) and display it on
 *      the Contact page next to the form.
 * ============================================================
 */

/** Approved privacy wording goes here once NeuroMind confirms it. */
export const PRIVACY_NOTE = '';

export async function submitInquiry(_data: Inquiry): Promise<void> {
  // No destination approved yet — do not add one without NeuroMind's sign-off.
  throw new Error('Inquiry submission is not yet connected to a live channel.');
}
