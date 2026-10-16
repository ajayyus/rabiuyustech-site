import { SITE } from './site'

export type LegalDoc = {
  title: string
  intro?: string
  sections: { heading: string; body: string[] }[]
}

export const LEGAL_UPDATED = 'Last updated: October 2026'

export const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'This policy explains how Rabiu Yustech ("I", "me") handles personal information on this website.',
    sections: [
      {
        heading: 'What I collect',
        body: [
          'This website has no user accounts and no checkout. The only personal information I receive is what you choose to send me: your name, email, store URL, project details and any messages sent by email, WhatsApp or social media.',
        ],
      },
      {
        heading: 'How contact forms work',
        body: [
          'When you submit a form on this site, the details you typed are sent to me through Netlify Forms. Netlify keeps a copy of each submission in my account until I delete it. You can instead contact me directly by email or WhatsApp.',
        ],
      },
      {
        heading: 'Why I use your information',
        body: [
          'To reply to your inquiry, prepare a scope and quote, deliver agreed work, and keep a record of our communication.',
        ],
      },
      {
        heading: 'Third parties',
        body: [
          'Form submissions are handled by Netlify, which hosts this site. Messages you send by email or WhatsApp pass through those services, which have their own privacy policies. This site loads fonts from Google Fonts, which may receive your IP address. Links to Fiverr, Instagram and TikTok lead to platforms with their own policies. If you give me access to a store or marketing account for project work, I use it only for the agreed work.',
        ],
      },
      {
        heading: 'Cookies and analytics',
        body: [
          'This site does not set tracking cookies and does not currently use analytics. It remembers your light or dark theme choice in your browser. If this changes, this policy will be updated first.',
        ],
      },
      {
        heading: 'Retention and security',
        body: [
          'I keep inquiry and project communication for as long as needed to respond, deliver work and meet any legal obligations, then delete it on a reasonable schedule. I ask clients to share only the access needed, never passwords or payment card details.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `Depending on where you live, you may have rights to access, correct or delete your information, or object to its use. To make a request, email ${SITE.email}.`,
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Services and scope',
        body: [
          "I offer eCommerce services including store optimization, SEO and GEO, Google and social commerce setup, CRM and email automation, and related content. Each project's scope, deliverables, timeline and price are confirmed in writing before work starts. Package descriptions on this website are summaries; the written quote is the agreed scope.",
        ],
      },
      {
        heading: 'Approvals, timelines and revisions',
        body: [
          'Work begins after you approve the scope and any agreed deposit is received. Timelines depend on timely feedback, access and third-party approvals. Revisions included in a package are stated in the quote; extra requests outside the scope may be quoted separately.',
        ],
      },
      {
        heading: 'Client responsibilities',
        body: [
          'You agree to provide accurate information, the access needed for the work, and content you have the right to use. Share only the permissions required. Never send passwords or payment card details in chat.',
        ],
      },
      {
        heading: 'Third-party platforms',
        body: [
          'Shopify, Google, Meta, TikTok and other platforms set their own rules, approvals and fees. I cannot control their decisions, outages or policy changes.',
        ],
      },
      {
        heading: 'No guaranteed outcomes',
        body: [
          'I do not guarantee search rankings, placement in AI-generated answers, advertising results, conversion rates, traffic or sales. I commit to the agreed deliverables and professional implementation.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'Once the agreed fee is paid in full, you may use the deliverables created specifically for your store. I may keep general know-how and reusable methods. Your brand, products and content remain yours. Unless you object in writing, I may show non-confidential project work in my portfolio.',
        ],
      },
      {
        heading: 'Confidentiality',
        body: [
          'I treat non-public business information you share as confidential for the purpose of the project, unless a separate agreement says otherwise.',
        ],
      },
      {
        heading: 'Communication, termination and disputes',
        body: [
          'We communicate by email and messaging apps. Either side may end a project by written notice; the Service, Payment and Cancellation Policy explains how completed work is handled. We will first try to resolve any dispute through good-faith discussion.',
        ],
      },
    ],
  },
  payment: {
    title: 'Service, Payment & Cancellation Policy',
    sections: [
      {
        heading: 'Quotes and approval',
        body: [
          'After you send your request, I confirm the work, dependencies, timeline and deliverables and send a written quote. A project is approved when you accept the quote in writing (email or message).',
        ],
      },
      {
        heading: 'Payments',
        body: [
          'This website does not take payments. The payment method and any deposit or milestone schedule are stated in the quote and agreed before work starts.',
        ],
      },
      {
        heading: 'Revisions and out-of-scope requests',
        body: [
          'The number of revision rounds is stated in the quote. Requests beyond the agreed scope are quoted separately and only done once approved.',
        ],
      },
      {
        heading: 'Client delays and third-party dependencies',
        body: [
          'If access, content or approvals are delayed, timelines move accordingly. Delays caused by platforms such as Google, Meta or TikTok are outside my control.',
        ],
      },
      {
        heading: 'Cancellation',
        body: [
          'To cancel, send written notice by email. Work already completed up to the cancellation date is billed, and any unused portion of a deposit is handled as stated in the quote. Completed deliverables are released once the amount due is paid.',
        ],
      },
      {
        heading: 'Refunds',
        body: [
          'Refund terms, if any, are stated in the quote for each project. Nothing here limits any rights you have under the consumer or contract law that applies to you.',
        ],
      },
      {
        heading: 'Orders through Fiverr',
        body: ["If we work through Fiverr, Fiverr's terms for payments, cancellations and disputes apply to that order."],
      },
    ],
  },
  cookies: {
    title: 'Cookie Notice',
    intro:
      'This website does not set advertising or analytics cookies and does not use tracking pixels. It stores your light or dark theme preference in your browser so the site looks the way you chose.',
    sections: [
      {
        heading: 'Third-party content',
        body: [
          'The site loads fonts from Google Fonts. Google may receive your IP address when it delivers the fonts. Links to Fiverr, Instagram, TikTok and WhatsApp open on those services, which may set their own cookies under their own policies.',
        ],
      },
      {
        heading: 'If this changes',
        body: [
          'If I add analytics or marketing tools later, I will update this notice and show a choice banner before any non-essential cookie is set.',
        ],
      },
    ],
  },
  accessibility: {
    title: 'Accessibility',
    intro:
      'I want this website to be usable by everyone. It is built for keyboard navigation, readable contrast in light and dark modes, descriptive link text, labelled form fields, reduced-motion support and meaningful image descriptions.',
    sections: [
      {
        heading: 'Feedback',
        body: [
          `I have not had an independent accessibility audit, so I make no claim of formal compliance. If you find a barrier, tell me at ${SITE.email} and I will work to fix it.`,
        ],
      },
    ],
  },
}
