/**
 * Copy dictionary (i18n-ready layer, brief §3/§11 + Pending #10).
 * Components read strings from here instead of hardcoding them, so French and
 * Arabic (RTL) can be added later as sibling locale objects without touching JSX.
 */

export const copy = {
  ctas: {
    planHoliday: "Plan My Holiday",
    exploreTours: "Explore Tours",
    viewAllTours: "View all tours",
    requestQuote: "Request Quote",
    requestPackage: "Request Your Mauritius Package",
    bookTransfer: "Book Airport Transfer",
    checkAvailability: "Check Availability",
    whatsapp: "Chat on WhatsApp",
    viewTour: "View Details",
    getQuote: "Get My Quote",
  },

  home: {
    hero: {
      eyebrow: "Easy. Trusted. Affordable.", // client tagline (content/site.ts)
      title: "The real Mauritius,",
      titleAccent: "planned without the hassle.",
      subtitle:
        "Authentic island tours, airport transfers and complete holiday packages — arranged by a licensed, IATA-accredited local team. You tell us your dates and dreams; we send back a personalized plan.",
    },
    planner: {
      ariaLabel: "Plan your trip",
      flexible: "My dates are flexible",
      arrival: "Arrival",
      departure: "Departure",
      travellers: "Travellers",
      adults: "Adults",
      children: "Children",
      anyDate: "Add date",
      submit: "Get my quote",
      hint: "No payment needed · reply within 24 hours",
      /** First field per service tab: label + the neutral option shown by default. */
      primary: {
        tour: { label: "Which tour?", any: "Not sure yet" },
        transfer: { label: "Transfer", any: "Airport ↔ hotel" },
        package: { label: "Package", any: "Design one for me" },
        flights: { label: "Flying from", any: "City or airport" },
        hotel: { label: "Preferred coast", any: "Anywhere in Mauritius" },
      },
    },
    featured: {
      eyebrow: "Signature experiences",
      title: "Tours travellers love",
      subtitle:
        "A taste of what's possible. Every tour is private or small-group, guided by locals, and fully customizable to you.",
    },
    services: {
      eyebrow: "What we do",
      title: "Everything for your Mauritius trip, in one place",
      subtitle:
        "From the moment you think about visiting to the moment you fly home — one trusted team handles it all.",
    },
    why: {
      eyebrow: "Why Discover Mauritius",
      title: "Trusted by travellers from around the world",
      subtitle:
        "Choosing a company from afar takes trust. Here is why visitors choose us to plan their Mauritius holiday.",
    },
    how: {
      eyebrow: "How it works",
      title: "Three simple steps to your Mauritius holiday",
      steps: [
        {
          title: "Tell us your plans",
          description:
            "Share your travel dates, party size and what you'd love to see and do — in a quick form or on WhatsApp.",
        },
        {
          title: "Get your personalized quote",
          description:
            "Our local team designs a tailored plan and sends you a clear, no-obligation quote, usually within 24 hours.",
        },
        {
          title: "Enjoy Mauritius",
          description:
            "Confirm the details and relax. We handle the arrangements while you enjoy an authentic island holiday.",
        },
      ],
    },
    testimonials: {
      eyebrow: "In their words",
      title: "What travellers say",
      subtitle:
        "Sample reviews shown while we gather approved guest testimonials.",
    },
    credentials: {
      eyebrow: "Who you're booking with",
      title: "A registered operator, not a middleman",
      subtitle:
        "Your trip is arranged directly by the company that operates it — licensed in Mauritius, accredited by IATA, and reachable on WhatsApp before, during and after you travel.",
    },
    faq: {
      eyebrow: "Good to know",
      title: "Questions, answered",
      subtitle: "The things travellers ask us most before they book.",
    },
    finalCta: {
      eyebrow: "Ready when you are",
      title: "Let's plan your Mauritius holiday",
      subtitle:
        "Share a few details and our team will send you a personalized, no-obligation quote. No payment needed to enquire.",
    },
  },

  trust: {
    responseTime: "We usually reply within 24 hours.",
    noPayment: "No payment required to request a quote.",
    strip: "Licensed Tour Operator · IATA Accredited · Since 2019 · WhatsApp Support",
  },

  quote: {
    title: "Request your personalized travel plan",
    subtitle:
      "Tell us what you're dreaming of and we'll design a tailored Mauritius holiday with a clear, no-obligation quote.",
    steps: ["Service", "Dates & travellers", "Interests & budget", "Your details"],
    success: {
      title: "Thank you — your request is on its way",
      body:
        "Our team will review your details and reply with a personalized quote, usually within 24 hours. For anything urgent, message us on WhatsApp.",
    },
    fields: {
      service: "What can we help you with?",
      arrival: "Arrival date",
      departure: "Departure date",
      flexible: "My dates are flexible",
      adults: "Adults",
      children: "Children",
      interests: "What are you interested in?",
      budget: "Approximate budget per person (optional)",
      name: "Full name",
      email: "Email",
      phone: "Phone / WhatsApp",
      country: "Country of residence",
      contactMethod: "Preferred contact method",
      message: "Anything else we should know?",
    },
  },

  footer: {
    blurb:
      "Discover Mauritius, by N.K. Taher Co Ltd — a licensed tour operator and IATA-accredited travel agency helping visitors experience the real Mauritius, the easy way.",
    columns: {
      explore: "Explore",
      services: "Services",
      company: "Company",
    },
    legalNote:
      "Discover Mauritius is a trading name of N.K. TAHER CO LTD, established 26 April 2019.",
  },
} as const;

export type Copy = typeof copy;
