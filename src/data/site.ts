/* =====================================================================
   All portfolio content lives here. Edit this file to change contact
   details, prices, packages, projects, reviews, FAQs or policies.
   ===================================================================== */

export const SITE = {
  name: 'Rabiu Yustech',
  person: 'Rabiu Yusuf',
  role: 'Independent eCommerce Growth Specialist',
  email: 'rabiuyustech3@gmail.com',
  fiverr: 'https://www.fiverr.com/rabiuusuf5',
  instagram: 'https://instagram.com/rabi_uyustech',
  instagramHandle: '@rabi_uyustech',
  tiktok: 'https://vm.tiktok.com/ZS9UNLNrSfpdq-0pKYT/',
  whatsappLink: 'https://wa.me/message/MLJZCZ3E7WQJL1',
  // Country code, no + or spaces. Lets WhatsApp open with the message pre-typed.
  whatsappNumber: '2349011359587',
}

export type Package = {
  id: string
  name: string
  price: string
  priceValue: number
  time: string
  short: string
  desc: string
  includes: string[]
  notIncluded: string[]
  needs: string[]
  best: string
  featured?: boolean
}

// Starting prices in USD.
export const PACKAGES: Package[] = [
  {
    id: 'audit',
    name: 'Store Audit',
    price: '$49',
    priceValue: 49,
    time: '2–3 days',
    short:
      'A clear, prioritized report on what is holding your store back, before you spend on fixes.',
    desc: 'A hands-on review of your live store. You get a written report that ranks the problems by impact and effort, so you know exactly what to fix first. Good as a low-risk starting point, or if you already have a developer and want a second opinion.',
    includes: [
      'Review of homepage, collection pages and product pages',
      'Mobile shopping experience check',
      'Speed and usability review',
      'SEO basics check: titles, meta, headings, indexing',
      'Trust signals, policies and checkout friction review',
      'Prioritized action list you can hand to any developer',
      'One follow-up Q&A after delivery',
    ],
    notIncluded: [
      'Implementation of the fixes (available in the other packages)',
      'Ads management',
    ],
    needs: [
      'Your store URL',
      'Store password if it is not public',
      'Your main goal (more sales, better traffic, lower bounce)',
    ],
    best: 'Store owners who want to know what to fix first.',
  },
  {
    id: 'design',
    name: 'Store Design & Optimization',
    price: '$249',
    priceValue: 249,
    time: '5–10 days',
    short:
      'A cleaner, faster, more convincing storefront that is easier to shop on mobile and desktop.',
    desc: 'I redesign and refine the parts of your Shopify store that shape the buying decision: homepage, product pages, collections and navigation. The work is built around your products and customers, not a copy of a template.',
    includes: [
      'Homepage layout and visual hierarchy improvements',
      'Shopify theme customization and custom sections',
      'Product page structure: gallery, benefits, FAQs, shipping and returns info',
      'Collection organization, filters and navigation',
      'Mobile-first layout checks',
      'Trust signals, review placement and buying guidance',
      'Speed and performance cleanup',
      'Two revision rounds',
    ],
    notIncluded: [
      'Full catalog upload (see Full Store A–Z)',
      'Brand logo design',
      'Custom app development',
    ],
    needs: [
      'Store URL and collaborator access',
      'Brand colors, logo and product images',
      'Examples of stores you like',
    ],
    best: 'Stores with traffic that are not converting, or brands that look dated.',
  },
  {
    id: 'seo',
    name: 'SEO & GEO Package',
    price: '$499',
    priceValue: 499,
    time: '7–14 days',
    short:
      'Help Google and AI search tools understand what you sell, so the right shoppers find you.',
    desc: 'SEO covers how search engines find and rank your pages. GEO (Generative Engine Optimization) covers how your content is structured so AI-powered search tools can understand and reference it. I improve both at the product, collection and store level. Rankings and AI mentions can never be guaranteed; this builds the foundation.',
    includes: [
      'Technical SEO check and indexing review',
      'Keyword research for key collections and products',
      'Page titles, meta descriptions, headings and internal links',
      'Product and collection description improvements',
      'Image alt-text recommendations and implementation',
      'Structured data review (products, reviews, FAQ where suitable)',
      'AI-friendly content structure: clear answers, FAQs, entity details',
      'Google Search Console setup and a starting performance baseline',
    ],
    notIncluded: [
      'Guaranteed rankings or AI answer placement',
      'Paid backlinks',
      'Paid advertising',
    ],
    needs: [
      'Store URL and collaborator access',
      'Search Console access, or I can help create it',
      'Your main products and target countries',
    ],
    best: 'Stores that depend on Google traffic or want to show up in AI search.',
  },
  {
    id: 'social',
    name: 'Social Commerce (Facebook & Instagram)',
    price: '$349',
    priceValue: 349,
    time: '3–7 days',
    short:
      'Connect your catalog to Facebook and Instagram Shops with clean tracking behind it.',
    desc: 'I connect your Shopify products to Meta so shoppers can discover and tag your products on Facebook and Instagram. I also check your tracking so your marketing data is accurate. TikTok Shop assistance is available when your country and account are eligible.',
    includes: [
      'Meta Business Suite and Commerce Manager setup',
      'Facebook and Instagram catalog connection',
      'Product sync, variants and catalog consistency review',
      'Meta Pixel setup and event check',
      'Product tagging and shopping journey review',
      'Troubleshooting of rejected or missing products',
      'Short documentation of what was set up',
      'TikTok Shop setup assistance, subject to eligibility',
    ],
    notIncluded: [
      'Running paid ads',
      'Guaranteed account approval (Meta and TikTok decide)',
      'Content creation (available as an add-on)',
    ],
    needs: [
      'Facebook Page and Instagram business account',
      'Meta Business access',
      'Store collaborator access',
    ],
    best: 'Brands that want to sell where their audience already scrolls.',
  },
  {
    id: 'google',
    name: 'Google Presence (Shopping, Merchant Center & Business Profile)',
    price: '$279',
    priceValue: 279,
    time: '5–10 days',
    short:
      'Get your products and business information ready for Google Shopping and local search.',
    desc: "I set up and clean the Google tools that decide whether your products appear on Google: Merchant Center, product feed, Search Console and your Google Business Profile. Approval and visibility depend on Google's rules, so I focus on getting every requirement right the first time.",
    includes: [
      'Google Merchant Center account setup and website claim',
      'Product feed review and attribute improvements',
      'Shipping, returns and policy information alignment',
      'Google & YouTube channel connection on Shopify',
      'Feed diagnostics and disapproval troubleshooting',
      'Google Business Profile creation or optimization',
      'Business information consistency check across your site and profiles',
      'Search Console connection',
    ],
    notIncluded: [
      'Google Ads campaign management',
      'Guaranteed approval or placement',
      'Business verification outcomes controlled by Google',
    ],
    needs: [
      'Store URL and collaborator access',
      'Business name, address or service area',
      'Policies page links (shipping, returns, contact)',
    ],
    best: 'Stores that want free Google Shopping listings and local visibility.',
  },
  {
    id: 'crm',
    name: 'CRM & Email Campaign Package',
    price: '$499',
    priceValue: 499,
    time: '5–10 days',
    short:
      'Automated emails that follow up with shoppers, recover carts and bring customers back.',
    desc: 'I build the email system that works for you after the visitor leaves: welcome emails, abandoned cart recovery, post-purchase follow-up and win-back. I help you pick the right platform (for example Klaviyo or Shopify Email) and set everything up with proper consent and tracking.',
    includes: [
      'CRM requirements and platform selection help',
      'Sign-up form setup',
      'Welcome series',
      'Abandoned cart and abandoned checkout flows',
      'Browse-abandonment flow where supported and consented',
      'Post-purchase follow-up and review requests',
      'Customer segmentation',
      'Win-back flow and one campaign template',
      'Basic reporting walkthrough',
    ],
    notIncluded: [
      'Buying email lists (never)',
      'Guaranteed revenue from flows',
      'Monthly campaign sending (available as ongoing support)',
    ],
    needs: [
      'Store URL and collaborator access',
      'Brand assets and tone of voice',
      'Your CRM account, or I can help choose one',
    ],
    best: 'Stores with visitors who browse, add to cart, and never come back.',
  },
  {
    id: 'full',
    name: 'Full Store A–Z Package',
    price: '$1,799',
    priceValue: 1799,
    time: '3–6 weeks',
    short:
      'Everything from first setup to launch and growth systems, handled in one organized project.',
    desc: 'A complete build and growth setup for a new or relaunching store. I take your store from empty or unfinished to ready to sell and ready to be found, with design, products, SEO, Google, social channels and email automation all connected. You get one point of contact and one plan.',
    includes: [
      'Store setup and structure planning',
      'Theme customization and custom homepage, product and collection layouts',
      'Product upload and organization (catalog size confirmed in your quote)',
      'Required policy pages, shipping and payment configuration',
      'Full SEO & GEO foundation',
      'Google Merchant Center, Search Console and Business Profile',
      'Facebook and Instagram catalog and Meta Pixel',
      'CRM and email automation flows',
      'Analytics and conversion tracking setup',
      'Pre-launch testing checklist',
      '30 days of support after launch',
    ],
    notIncluded: [
      'Product photography',
      'Paid ad spend and campaign management',
      'Custom app development',
    ],
    needs: [
      'Product list and images (or a plan to create them)',
      'Brand assets and preferences',
      'Business, shipping and payment details',
      'Weekly check-in time for approvals',
    ],
    best: 'New brands and relaunches that want one expert for the whole job.',
    featured: true,
  },
]

export const ADDONS = [
  'Rush delivery',
  'Extra revision round',
  'Monthly support after delivery',
  'Product video or social content',
  'Store banners and campaign visuals',
]

export type Review = {
  name: string
  country: string
  flag: string
  rating: number
  source: string
  meta?: string
  text: string
}

// Real client reviews from Fiverr only.
export const REVIEWS: Review[] = [
  {
    name: 'texascoffee76',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    source: 'Fiverr',
    meta: 'Order: $100–$200 · 2 days',
    text: 'Rabiu and I worked great together, maintaining communication, creative problem-solving, flexibility, and teamwork to make this a successful business venture, and I am confident it will succeed.',
  },
  {
    name: 'tommyfrankfurt7',
    country: 'Germany',
    flag: '🇩🇪',
    rating: 5,
    source: 'Fiverr',
    meta: 'Order: $50 · 5 days',
    text: 'Outstanding experience! Rabiu delivered high-quality product designs that exceeded my expectations. Communication was excellent throughout the project, and they were responsive to feedback and made revisions quickly. The final designs were clean, professional, and exactly what I was looking for.',
  },
  {
    name: 'henderson_white',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    source: 'Fiverr',
    meta: 'Order: $50 · 3 days',
    text: "I'm really impressed with the quality of work delivered. The seller understood exactly what I needed and executed it perfectly. They helped me set up everything properly and made the whole process smooth and stress free. Communication was excellent and they were very responsive throughout.",
  },
  {
    name: 'brroklandcarpar',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rating: 5,
    source: 'Fiverr',
    meta: 'Order: $200–$400 · 1 day',
    text: 'lovely working with , great help and will use again 100%',
  },
  {
    name: 'tommyfrankfurt7',
    country: 'Germany',
    flag: '🇩🇪',
    rating: 5,
    source: 'Fiverr',
    meta: 'Order: $50 · 4 days',
    text: "Excellent work The ladies' collection designs came out beautifully and matched my brand perfectly. Great communication, fast delivery, and very professional. Highly recommended!",
  },
  {
    name: 'cleff_max',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    source: 'Fiverr',
    meta: 'Order: $50 · 3 days',
    text: "Great seller! They helped me set up my store perfectly and made the whole process easy to understand. Very professional, responsive, and supportive. I'm really happy with the result and highly recommend their service.",
  },
  {
    name: 'henderson_white',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    source: 'Fiverr',
    meta: 'Social Media Management · Order: $50 · 7 days',
    text: 'Working with this social media manager has been amazing. My social media posting is now more consistent, professional, and engaging. They always use the right captions, hashtags, and posting strategies to help my page grow organically.',
  },
  {
    name: 'landencummings',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    source: 'Fiverr',
    meta: 'Order: $100–$200 · 2 days',
    text: 'Easy to work with and very professional. Highly recommend',
  },
  {
    name: 'bahaaizat',
    country: 'Jordan',
    flag: '🇯🇴',
    rating: 5,
    source: 'Fiverr',
    meta: 'Order: $50 · 2 days',
    text: 'Great work',
  },
  {
    name: 'f2108840f',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    source: 'Fiverr',
    text: 'Great! Highly recommend 🤙',
  },
]

export const REVIEW_COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Jordan',
  'Germany',
  'United Arab Emirates',
  'Nigeria',
  'Other',
]

export type Project = {
  id: string
  name: string
  url: string
  industry: string
  angle: string
  focus: string[]
  image: string
}

export const PROJECTS: Project[] = [
  {
    id: 'aqua',
    name: 'Aqua Morada',
    url: 'https://www.aquamorada.com/',
    industry: 'Swimwear and lifestyle',
    angle:
      'Premium product merchandising, collection discovery, complementary products, sustainability messaging and shopping confidence.',
    focus: ['Merchandising', 'Collection discovery', 'Cross-sell', 'Brand story'],
    image: '/img/projects/aqua.jpg',
  },
  {
    id: 'belania',
    name: 'BelaniaMX',
    url: 'https://belania.com.mx/',
    industry: 'Ceremony clothing and accessories',
    angle:
      'Product categorization, large-collection navigation, localization, and guiding customers to the right products for specific occasions.',
    focus: ['Categorization', 'Navigation', 'Localization', 'Occasion shopping'],
    image: '/img/projects/belania.jpg',
  },
  {
    id: 'dandys',
    name: "Dandy's",
    url: 'https://www.dandys.com/',
    industry: 'Gardening and landscaping supplies',
    angle:
      'Broad catalog organization, product discovery, product reviews, shipping information and shopping by customer project.',
    focus: ['Large catalog', 'Product discovery', 'Reviews', 'Shipping clarity'],
    image: '/img/projects/dandys.jpg',
  },
  {
    id: 'detailing1',
    name: 'Detailing1',
    url: 'https://detailing1.de/',
    industry: 'Automotive care and detailing',
    angle:
      'Category-led navigation, specialist product information, educational shopping content and product selection.',
    focus: ['Category navigation', 'Product education', 'Selection guidance'],
    image: '/img/projects/detailing1.jpg',
  },
  {
    id: 'liberty',
    name: 'Liberty Safe',
    url: 'https://libertysafe.com/',
    industry: 'Home and gun safes',
    angle:
      'High-consideration products, collection discovery, detailed product evaluation and purchase confidence.',
    focus: ['High-consideration', 'Product evaluation', 'Purchase confidence'],
    image: '/img/projects/liberty.jpg',
  },
  {
    id: 'guests',
    name: 'Guests on Earth',
    url: 'https://www.guestsonearth.com/',
    industry: 'Eco-conscious home cleaning',
    angle:
      'Values-driven merchandising, product education, bundles, refills, reviews and customer retention opportunities.',
    focus: ['Values-led merchandising', 'Bundles & refills', 'Retention'],
    image: '/img/projects/guests.jpg',
  },
]

/* Optional per-project details. Fill in ONLY what is true and approved.
   Anything left empty shows a short note instead. */
export const PROJECT_DETAILS: Record<
  string,
  { overview?: string; services?: string[]; work?: string[]; results?: string; next?: string }
> = {}

export type CreativeWork = {
  id: string
  title: string
  kind: string
  image: string
  width: number
  height: number
  span: 'wide' | 'tall' | 'normal'
}

export const CREATIVE: CreativeWork[] = [
  {
    id: 'athletiq',
    title: 'AthletiQ',
    kind: 'Brand hero banner · Fitness apparel',
    image: '/img/creative/athletiq-banner.png',
    width: 2048,
    height: 768,
    span: 'wide',
  },
  {
    id: 'solidarity',
    title: 'Solidarity Sales',
    kind: 'Campaign banner · Footwear sale',
    image: '/img/creative/solidarity-sales.jpg',
    width: 736,
    height: 414,
    span: 'normal',
  },
  {
    id: 'sand',
    title: 'Sand Editorial',
    kind: 'Collection hero · Womenswear',
    image: '/img/creative/sand-editorial.jpg',
    width: 564,
    height: 316,
    span: 'normal',
  },
  {
    id: 'rack',
    title: 'Neutral Edit',
    kind: 'Collection visual · Outerwear',
    image: '/img/creative/neutral-rack.jpg',
    width: 563,
    height: 311,
    span: 'normal',
  },
  {
    id: 'hangers',
    title: 'Boutique Basics',
    kind: 'Store banner · Essentials',
    image: '/img/creative/boutique-hangers.jpg',
    width: 563,
    height: 316,
    span: 'normal',
  },
]

export type Service = {
  id: string
  title: string
  icon: 'store' | 'search' | 'cart' | 'share' | 'loop' | 'chart' | 'video'
  hook: string
  purpose: string
  deliverables: string[]
  value: string
  caveat?: string
  packageId?: string
}

export const SERVICES: Service[] = [
  {
    id: 'shopify',
    title: 'Shopify Store Optimization',
    icon: 'store',
    hook: 'Visitors leave when a store is confusing or slow on mobile. I simplify the path from first click to checkout.',
    purpose:
      'Improve the store experience and remove unnecessary friction in the path to purchase.',
    deliverables: [
      'Homepage layout and visual hierarchy improvements',
      'Shopify theme customization and section design',
      'Product page structure and product information improvements',
      'Collection organization and navigation',
      'Mobile shopping experience improvements',
      'Trust signals, reviews, shipping information, and buying guidance',
      'Store usability and performance review',
      'Identification of checkout and conversion friction within the agreed scope',
    ],
    value:
      'Make the store easier to understand, navigate, and shop while improving the conditions that support conversion.',
    packageId: 'design',
  },
  {
    id: 'seo',
    title: 'SEO, GEO & AI Search Visibility',
    icon: 'search',
    hook: "Shoppers can't buy what they can't find. I make your products clearer to search engines and AI search tools.",
    purpose:
      'Help search engines and relevant discovery systems understand the store, its products, and its expertise more clearly.',
    deliverables: [
      'Technical SEO review and indexability checks',
      'Product and collection keyword research',
      'Page titles, meta descriptions, headings, and internal links',
      'Product descriptions and collection content improvements',
      'Image alt-text recommendations and implementation',
      'Structured data review where applicable',
      'Content organization for relevant AI-powered search experiences',
      'Search Console setup and performance monitoring',
    ],
    value:
      'Build a stronger organic discovery foundation and improve the quality and relevance of store content.',
    caveat:
      'GEO means Generative Engine Optimization: structuring content so AI-powered search tools can understand it. Rankings and placement in AI-generated answers are never guaranteed.',
    packageId: 'seo',
  },
  {
    id: 'google',
    title: 'Google Shopping & Merchant Center',
    icon: 'cart',
    hook: 'Your products may be eligible for Google, but only if the feed and policies are right. I get them ready.',
    purpose:
      "Help make eligible products available for Google's relevant shopping surfaces.",
    deliverables: [
      'Google Merchant Center configuration',
      'Product feed and catalog review',
      'Product data and attribute improvements',
      'Website and business information consistency review',
      'Shipping, returns, and relevant policy information review',
      'Search Console connection where appropriate',
      'Feed diagnostics and disapproval troubleshooting',
      'Google Business Profile setup and optimization',
    ],
    value:
      'Improve product data quality and establish a better foundation for product discovery through Google.',
    caveat:
      "Account approval, free listings, paid placements, and advertising results depend on Google's requirements, policies, eligibility, and other factors.",
    packageId: 'google',
  },
  {
    id: 'social',
    title: 'Social Commerce Integration',
    icon: 'share',
    hook: 'Product discovery happens on social. I connect your catalog so people can go from post to product.',
    purpose: "Connect a store's product catalog with supported social shopping channels.",
    deliverables: [
      'TikTok Shop setup assistance, subject to eligibility',
      'Facebook and Instagram catalog integration',
      'Product synchronization and listing review',
      'Product variants and catalog consistency',
      'Meta Pixel and relevant tracking configuration',
      'Product tagging and shopping journey review',
      'Social commerce troubleshooting and documentation',
    ],
    value:
      'Make products easier to discover through relevant social channels and reduce friction between discovery and purchase.',
    caveat:
      'Platform, region, account, and product eligibility is confirmed before any integration is promised.',
    packageId: 'social',
  },
  {
    id: 'crm',
    title: 'CRM & Marketing Automation',
    icon: 'loop',
    hook: "Most visitors don't buy the first time. Automated follow-up brings interested shoppers back.",
    purpose:
      'Create structured ways to maintain customer relationships and recover relevant purchase opportunities.',
    deliverables: [
      'CRM requirements and platform selection',
      'Welcome and customer onboarding flows',
      'Abandoned-cart and abandoned-checkout automation',
      'Browse-abandonment messaging where supported and consented',
      'Post-purchase follow-up and review requests',
      'Customer segmentation and win-back campaigns',
      'Email campaign planning and reporting',
      'Customer support or AI-agent integration where appropriate',
    ],
    value:
      'Help stores follow up with interested shoppers, improve communication, and create opportunities for repeat purchases.',
    caveat:
      "Automation must respect customer consent, privacy requirements, and the selected platform's capabilities.",
    packageId: 'crm',
  },
  {
    id: 'cro',
    title: 'Conversion Optimization & Analytics',
    icon: 'chart',
    hook: 'Guesswork is expensive. I use your data to decide which changes are worth making.',
    purpose:
      "Identify and prioritize changes that may improve the store's ability to turn visitors into customers.",
    deliverables: [
      'Customer journey review',
      'Product-page and collection-page usability review',
      'Mobile usability analysis',
      'Analytics and conversion tracking checks',
      'Funnel and customer behavior analysis where data is available',
      'Hypothesis-driven experiments',
      'Prioritized improvement roadmap and reporting',
    ],
    value: 'Make improvement decisions more evidence-based instead of relying on guesswork.',
    caveat:
      'A conversion-rate increase is never guaranteed. The effect of changes is evaluated using available data and, where appropriate, controlled tests.',
    packageId: 'audit',
  },
  {
    id: 'content',
    title: 'Product Content & eCommerce Video',
    icon: 'video',
    hook: 'Banners, campaign visuals and short videos that show the product clearly and give buyers a reason to act.',
    purpose:
      'Strengthen the way products are presented across the store and relevant marketing channels.',
    deliverables: [
      'Product demonstration videos',
      'Short-form social content',
      'Product-focused creative concepts',
      'Store banners and campaign visuals',
      'Product listing copy and merchandising guidance',
      'Content recommendations based on audience and positioning',
    ],
    value:
      'Communicate product value more clearly and give potential buyers useful information when deciding to purchase.',
  },
]

export const EXPERTISE = [
  'Shopify Store Optimization',
  'SEO & AI Search Visibility',
  'Google Shopping & Merchant Center',
  'Social Commerce Integration',
  'Conversion Rate Optimization',
  'CRM & Customer Retention',
  'eCommerce Content & Product Videos',
  'Store Banners & Campaign Visuals',
]

export const PROBLEMS = [
  {
    icon: 'search' as const,
    title: 'Limited discoverability',
    text: 'Product pages, collections and store content don’t clearly communicate relevance to search engines and potential customers.',
  },
  {
    icon: 'store' as const,
    title: 'Shopping friction',
    text: 'Navigation, mobile usability, product information, trust signals or the path to purchase make visitors hesitate.',
  },
  {
    icon: 'share' as const,
    title: 'Disconnected channels',
    text: 'Shopping channels, product catalogs, tracking tools and store data don’t work together.',
  },
  {
    icon: 'loop' as const,
    title: 'Lost customers',
    text: 'No CRM workflows for cart recovery, follow-up and repeat purchases, so interested shoppers never come back.',
  },
]

export const PROCESS = [
  {
    title: 'Tell me about your store',
    text: 'Share your website URL, products, current challenges, and goals. The objective is to understand the business before selecting a service.',
  },
  {
    title: 'Review the opportunity',
    text: 'We identify relevant opportunities in your store experience, search visibility, marketing systems, or customer journey, based on the agreed scope.',
  },
  {
    title: 'Receive a practical plan',
    text: 'You receive a clear explanation of the recommended work, deliverables, dependencies, estimated timeline, and price.',
  },
  {
    title: 'Approve and implement',
    text: 'Once the scope and terms are agreed, work begins. Any required store permissions are requested using the minimum access needed.',
  },
  {
    title: 'Test, document, review',
    text: 'The completed work is tested and documented. Where data is available, performance is reviewed against an agreed baseline.',
  },
  {
    title: 'Decide the next priority',
    text: 'After the initial engagement, we identify the next useful improvement or discuss ongoing support if it fits your business.',
  },
]

export const PRINCIPLES = [
  {
    title: 'Understand before implementing.',
    text: 'I start by learning about your store and its objectives instead of recommending the same package to every business.',
  },
  {
    title: 'Prioritize what matters.',
    text: 'Not every store needs a redesign or another marketing app. The right starting point depends on the evidence and the business goal.',
  },
  {
    title: 'Combine strategy with implementation.',
    text: 'I help translate recommendations into practical changes, with an agreed scope and clear deliverables.',
  },
  {
    title: 'Make progress understandable.',
    text: 'I explain the work, document what has been completed, and use relevant metrics where available to evaluate progress.',
  },
  {
    title: 'Build for the longer term.',
    text: 'Where it makes sense, I help businesses move from isolated fixes towards an ongoing improvement process.',
  },
]

export const ENGAGEMENTS = [
  {
    title: 'Focused Optimization',
    text: 'For a store that has a clearly defined problem or needs a specific improvement.',
  },
  {
    title: 'Growth Implementation',
    text: 'For a business that needs several related improvements, such as SEO and product optimization or social commerce and CRM.',
  },
  {
    title: 'Ongoing Growth Support',
    text: 'For businesses that want continued implementation, monitoring, and prioritized improvements over time.',
  },
]

export const FAQ = [
  {
    q: 'What types of businesses do you work with?',
    a: 'I work with eCommerce businesses, particularly Shopify stores, that want to improve their storefront experience, online visibility, marketing integrations, conversion opportunities, or customer retention systems.',
  },
  {
    q: 'Do you only build Shopify stores?',
    a: 'No. My services also cover store optimization, eCommerce SEO, social commerce, CRM, marketing automation, product content, and related growth systems. The exact scope depends on your platform and requirements.',
  },
  {
    q: 'Can you work on a store that is already live?',
    a: 'Yes. Many improvements can be made to an existing store. The right starting point depends on its current setup, goals, and the opportunities identified.',
  },
  {
    q: 'Do you guarantee sales or first-page Google rankings?',
    a: "No. Sales, rankings, and visibility depend on factors beyond one service provider's control. I focus on agreed deliverables, sound implementation, and measurable indicators where reliable data is available.",
  },
  {
    q: 'Do I have to purchase every service?',
    a: 'No. You can start with a specific service or a focused project. Additional services can be considered later if they support your business objectives.',
  },
  {
    q: 'Will you need access to my Shopify store?',
    a: 'Some implementations require collaborator access or permissions in relevant platforms. I request only the access needed for the agreed work. Never share passwords or payment credentials unnecessarily.',
  },
  {
    q: 'How much do your services cost?',
    a: 'Each package shows a starting price. The final price depends on the work required, complexity, integrations, and timeline. After understanding your needs, I provide a defined scope and quote before work begins.',
  },
  {
    q: 'How do I pay?',
    a: 'This website does not take payments. After we agree the scope and quote, I share the payment arrangement with you directly, including any deposit or milestone terms stated in the quote. We can also work through Fiverr.',
  },
  {
    q: 'How long does a project take?',
    a: 'The timeline depends on the agreed scope, platform access, product catalog, integrations, and any third-party approvals. Each package shows a typical delivery time, and the expected timeline is confirmed in your proposal.',
  },
  {
    q: 'Can you provide ongoing support?',
    a: 'Yes. Ongoing support can cover implementation, maintenance, performance review, marketing automation, and prioritized store improvements under an agreed arrangement.',
  },
  {
    q: 'How do I start?',
    a: 'Pick a package and send the details to me on WhatsApp or email, or use the contact page. Include your store URL and describe what you would like to improve. We can then decide the most appropriate next step.',
  },
]
