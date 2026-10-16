import { SITE, type Package } from '@/data/site'

export type InquiryDraft = {
  pkg?: Package | null
  interest?: string
  addons?: string[]
  name?: string
  email?: string
  url?: string
  platform?: string
  budget?: string
  challenge?: string
  notes?: string
}

// Builds the plain-text request a visitor sends by WhatsApp, email or form.
export function buildMessage(o: InquiryDraft) {
  const lines: string[] = ['Hi Rabiu, I found you through your portfolio website.', '']
  if (o.pkg) {
    lines.push(`I'm interested in: ${o.pkg.name} (from ${o.pkg.price}, typical delivery ${o.pkg.time}).`)
  } else if (o.interest) {
    lines.push(`I'm interested in: ${o.interest}.`)
  }
  if (o.addons?.length) lines.push(`Add-ons I'd like: ${o.addons.join(', ')}.`)
  lines.push('')
  if (o.name) lines.push(`Name: ${o.name}`)
  if (o.email) lines.push(`Email: ${o.email}`)
  if (o.url) lines.push(`Store URL: ${o.url}`)
  if (o.platform) lines.push(`Platform: ${o.platform}`)
  if (o.budget) lines.push(`Approximate budget: ${o.budget}`)
  if (o.challenge) lines.push('', `Main challenge or goal: ${o.challenge}`)
  if (o.notes) lines.push('', `Details: ${o.notes}`)
  lines.push('', 'Please send me the scope, timeline and your final quote. Thank you.')
  return lines.join('\n')
}

export function whatsappHref(message?: string) {
  if (SITE.whatsappNumber && message) {
    return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
  }
  return SITE.whatsappLink
}

export function mailHref(message: string, subject: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
}

// Posts to the static registration file; the SSR catch-all would swallow a POST to "/".
export async function submitNetlifyForm(formName: 'inquiry' | 'review', data: Record<string, string>) {
  const body = new URLSearchParams({ 'form-name': formName, ...data })
  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error('Submission failed')
  // A plain preview server returns the unprocessed registration file with 200.
  if (/\bdata-netlify\s*=/i.test(await response.text())) {
    throw new Error('Form handling is unavailable')
  }
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
