/**
 * site.ts — owner-swappable business info for the NeuroMind site.
 *
 * Everything in SITE is copy the site owner can replace after launch.
 * No contact detail is approved yet, so every `contactOptions` value is
 * CONTACT_PLACEHOLDER — a sentinel, not a real detail. Nothing here is a
 * promise and nothing here is a live channel.
 *
 * HOW TO UPDATE (owner):
 * - Replace a CONTACT_PLACEHOLDER value with the real, confirmed detail
 *   (e.g. value: '+91 9xxxx xxxxx') once it is approved for publication.
 *   The Contact page automatically switches from the "details are being
 *   finalised" line to the list as soon as at least one value is real;
 *   still-placeholder entries are skipped, so no placeholder string renders.
 * - Keep `whatHappensNext` free of response-time promises ("within 24h",
 *   "same day", …). The site must not promise a turnaround until a channel
 *   is actually live.
 * - `responseNote` is an optional factual line under the steps; leave it
 *   null and nothing extra renders.
 */

/** Sentinel meaning "not yet confirmed — do not render". */
export const CONTACT_PLACEHOLDER = '__PLACEHOLDER__';

export type ContactOptionType = 'Phone' | 'Email' | 'WhatsApp' | 'Address' | 'Hours';

export interface ContactOption {
  type: ContactOptionType;
  /** Real published value once confirmed; until then CONTACT_PLACEHOLDER. */
  value: string;
}

export const SITE = {
  /** MOCK DATA — every value below is a placeholder; no contact detail is
   *  approved for publication yet. */
  contactOptions: [
    { type: 'Phone', value: CONTACT_PLACEHOLDER },
    { type: 'Email', value: CONTACT_PLACEHOLDER },
    { type: 'WhatsApp', value: CONTACT_PLACEHOLDER },
    { type: 'Address', value: CONTACT_PLACEHOLDER },
    { type: 'Hours', value: CONTACT_PLACEHOLDER },
  ] as ContactOption[],

  /** The eventual inquiry process. Describes what will happen once the form
   *  is connected — deliberately no time promises. */
  whatHappensNext: [
    'You send an inquiry once the form is connected',
    'NeuroMind reviews it and reaches out using published contact channels',
    'You decide whether to book a counselling discussion',
  ] as string[],

  /** Optional line under the steps. null = nothing renders. */
  responseNote: null as string | null,

  /** Microcopy shown under the CTA rows on program pages (owner-supplied). */
  counsellingNote: 'Free counselling call — 15 minutes',
};
