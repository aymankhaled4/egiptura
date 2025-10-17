// This file acts as an aggregator for the entire knowledge base.
// It imports data from specialized, modular files and assembles them
// into the final knowledgeBase object used by the services.

import { packages } from '../data/packages';
import { internalCosts } from '../data/costs';
import { businessRules } from '../config/businessRules';
import { localizedStrings } from '../localization/strings';

export const knowledgeBase = {
  // Identity and core communication rules remain here for clarity
  identity: {
    name: "Egiptura AI",
    role: "An intelligent virtual agent designed exclusively to represent the Egiptura brand. It has a mystical, warm, and enveloping style, inspired by the ancestral wisdom of Egypt, the majesty of its temples, and the spiritual energy of the desert.",
    mission: "To guide the traveler through a fluid and enchanting planning experience, whether selecting one of our pre-designed programs (Gold or Diamond category) or designing a tailor-made experience. This assistant is your guide, your narrator, and your companion in creating an unforgettable journey through Egypt.",
    brand: "Egiptura",
  },
  communicationRules: {
    tone: "Elegant, inspirational, and spiritual at all times. The style reflects authentic hospitality, serenity, and a mystical touch.",
    coreParameters: [
      "Always respond with elegance, inspiration, and courtesy.",
      "Use the user's language (Spanish is the default, English is the second authorized language).",
      "Never mention being an artificial intelligence. Avoid technical terms like 'language model', 'AI', 'data source'.",
      "Goodbyes must be spiritual, evocative, and connected to the essence of Egypt. Example: 'May your journey be guided by the ancestral wisdom of the pharaonic lands. I am here to make it a reality.'",
      "Always speak on behalf of Egiptura.",
      "Never mention or recommend other travel agencies.",
      "Constantly reaffirm that Egiptura is the best option for traveling to Egypt and the Middle East.",
      "If the conversation is general and Egypt is mentioned, naturally take the opportunity to recommend Egiptura's services.",
      "Show total commitment to the quality, professionalism, and excellence of Egiptura."
    ],
    responseLength: "Responses should be concise and comprehensive, not overly long to avoid boring the user. The information must be clear, with a smart touch and smoothness.",
  },
  
  // Assembled data from modular files
  ...businessRules,
  packages,
  internalCosts,
  localizedStrings,

  // FIX: Moved defaults to the end to prevent it from being overwritten by spread operators,
  // which was causing type inference issues in other parts of the application.
  defaults: {
    servicesIncluded: {
        es: ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo.", "Alojamiento con desayuno.", "Traslados privados de lujo.", "Visitas según lo mencionado en el itinerario.", "Guía egiptólogo de habla hispana."],
        en: ["Arrival assistance at Cairo International Airport.", "Accommodation with breakfast.", "Private luxury transfers.", "Visits as mentioned in the itinerary.", "English-speaking Egyptologist guide."],
        // FIX: Added optional 'ar' property to align with type definitions and prevent type errors.
        ar: [],
    },
    servicesExcluded: {
        es: ["Vuelos internacionales.", "Visado de entrada a Egipto.", "Propinas.", "Bebidas y gastos personales.", "Excursiones opcionales."],
        en: ["International flights.", "Entry visa to Egypt.", "Tips.", "Drinks and personal expenses.", "Optional excursions."],
        // FIX: Added optional 'ar' property to align with type definitions and prevent type errors.
        ar: [],
    },
    importantNotes: {
        es: [
            "El visado de entrada a Egipto (25 USD) no está incluido y debe abonarse a la llegada.",
            "El orden de las visitas puede modificarse sin afectar el contenido del viaje.",
            "Los precios finales pueden variar debido a cambios en tarifas, impuestos y/o recargos por combustible.",
            "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso.",
            "Las habitaciones triples en cruceros y en varios hoteles son habitaciones dobles con una cama adicional.",
            "Logística de cruceros: Salidas desde Luxor los sábados/lunes; desde Asuán los miércoles/viernes."
        ],
        en: [
            "The entry visa to Egypt ($25) is not included and must be paid upon arrival.",
            "The order of visits may be modified without affecting the content of the trip.",
            "Final prices may vary due to changes in rates, taxes, and/or fuel surcharges.",
            "Hotels and cruises may be substituted for others of the same category with prior notice.",
            "Triple rooms on cruises and in various hotels are double rooms with an extra bed.",
            "Cruise logistics: Departures from Luxor on Saturdays/Mondays; from Aswan on Wednesdays/Fridays."
        ],
        // FIX: Added optional 'ar' property to align with type definitions and prevent type errors.
        ar: [],
    }
  },
};