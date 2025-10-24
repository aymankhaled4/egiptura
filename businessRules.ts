import type { BusinessRules } from '../types';

export const businessRules: BusinessRules = {
  features: {
    enableCustomQuotes: true,
  },
  generalInfo: {
    aboutUs: {
        introduction: {
            es: "Bienvenidos a Egiptura, donde las maravillas del antiguo Egipto se encuentran con el lujo moderno. Fundada por un equipo de guías egiptólogos apasionados y expertos, ofrecemos mucho más que simples tours—creamos experiencias inmersivas e inolvidables que lo acercan al corazón y alma de Egipto. Ya sea explorando las majestuosas pirámides, navegando por el tranquilo Nilo o descubriendo los tesoros ocultos de sus vibrantes ciudades, cada viaje con nosotros está diseñado para superar sus expectativas.",
            en: "Welcome to Egiptura, where the wonders of ancient Egypt meet modern luxury. Founded by a team of passionate and expert Egyptologist guides, we offer much more than simple tours—we create immersive and unforgettable experiences that bring you closer to the heart and soul of Egypt. Whether exploring the majestic pyramids, sailing the tranquil Nile, or discovering the hidden treasures of its vibrant cities, every journey with us is designed to exceed your expectations."
        },
        missionDetail: {
            es: "Desde el primer contacto hasta su regreso a casa, nuestra misión es brindarle una experiencia de viaje fluida e inolvidable, adaptada a sus deseos. Nuestro equipo dinámico y bilingüe de expertos está listo para guiarle, ofreciendo un servicio excepcional, conocimientos únicos y una atención meticulosa a cada detalle para asegurar que cada aspecto de su viaje sea perfecto.",
            en: "From the first contact until your return home, our mission is to provide you with a seamless and unforgettable travel experience, tailored to your desires. Our dynamic and bilingual team of experts is ready to guide you, offering exceptional service, unique insights, and meticulous attention to every detail to ensure that every aspect of your trip is perfect."
        },
        whyChooseUs: {
            title: { es: "¿Por Qué Elegir Egiptura?", en: "Why Choose Egiptura?" },
            points: [
                { title: { es: "Narradores Expertos", en: "Expert Storytellers" }, description: { es: "Nuestros guías egiptólogos profesionales dan vida a la historia, ofreciendo conocimientos únicos y relatos cautivadores que hacen de cada destino una experiencia inolvidable.", en: "Our professional Egyptologist guides bring history to life, offering unique insights and captivating stories that make every destination an unforgettable experience." } },
                { title: { es: "Personalización Perfecta", en: "Perfect Customization" }, description: { es: "Adaptamos cada tour a sus preferencias e intereses, ya sea una excursión privada, una aventura familiar o una expedición en grupo.", en: "We tailor each tour to your preferences and interests, whether it's a private excursion, a family adventure, or a group expedition." } },
                { title: { es: "Servicio Inigualable", en: "Unmatched Service" }, description: { es: "Desde la llegada hasta la partida, nos encargamos de todos los detalles, incluyendo transporte, alojamiento y excursiones, para garantizar una experiencia sin preocupaciones.", en: "From arrival to departure, we handle all the details, including transportation, accommodation, and excursions, to ensure a worry-free experience." } },
                { title: { es: "Sostenibilidad y Respeto", en: "Sustainability and Respect" }, description: { es: "Estamos dedicados a preservar el patrimonio cultural y natural de Egipto, diseñando nuestros tours con prácticas sostenibles para proteger esta tierra extraordinaria para las futuras generaciones.", en: "We are dedicated to preserving Egypt's cultural and natural heritage, designing our tours with sustainable practices to protect this extraordinary land for future generations." } }
            ]
        },
        conclusion: {
            es: "En Egiptura, no solo ofrecemos tours—creamos recuerdos. Nuestros viajeros suelen compartir sus experiencias inolvidables, y puedes ver sus momentos felices en nuestra galería, \"Momentos Felices de Nuestros Viajes.\" ¿Listo para embarcarte en el viaje de tu vida? Contáctanos hoy para comenzar a planificar tu aventura de sueño con Egiptura.",
            en: "At Egiptura, we don't just offer tours—we create memories. Our travelers often share their unforgettable experiences, and you can see their happy moments in our gallery, \"Happy Moments from Our Trips.\" Ready to embark on the journey of a lifetime? Contact us today to start planning your dream adventure with Egiptura."
        }
    },
  },
  // FIX: Moved `faq` to be a top-level property to match the BusinessRules type.
  faq: [
      {
        question: { es: "¿Necesito visado para viajar a Egipto?", en: "Do I need a visa to travel to Egypt?" },
        answer: { 
          es: "Sí, la mayoría de las nacionalidades necesitan un visado para entrar en Egipto. Se puede obtener fácilmente a la llegada al aeropuerto de El Cairo por un coste de 25 USD por persona. Nuestro representante te ayudará con el trámite para que sea rápido y sencillo.", 
          en: "Yes, most nationalities need a visa to enter Egypt. It can be easily obtained upon arrival at Cairo airport for a cost of 25 USD per person. Our representative will help you with the process to make it quick and simple." 
        }
      },
      {
        question: { es: "¿Es seguro viajar a Egipto?", en: "Is it safe to travel to Egypt?" },
        answer: { 
            es: "Generalmente sí. Priorizamos tu seguridad, seguimos avisos oficiales y trabajamos con socios locales de confianza.", 
            en: "Generally yes. We prioritize your security, follow official advisories, and work with trusted local partners."
        }
      },
      {
        question: { es: "¿Qué moneda se usa y cómo funciona el cambio?", en: "What currency is used and how does the exchange work?" },
        answer: { 
          es: "La moneda local es la Libra Egipcia (EGP). Puedes cambiar dinero en el aeropuerto, bancos o casas de cambio. Aunque los precios de nuestros paquetes son en USD, te recomendamos llevar algo de moneda local para pequeños gastos, compras en mercados y propinas.", 
          en: "The local currency is the Egyptian Pound (EGP). You can exchange money at the airport, banks, or exchange houses. Although our package prices are in USD, we recommend carrying some local currency for small expenses, market purchases, and tips." 
        }
      },
      {
        question: { es: "¿Qué debo empacar para mi viaje a Egipto?", en: "What should I pack for my trip to Egypt?" },
        answer: { 
            es: "Ropa cómoda, protector solar/sombrero, calzado para caminar y cámara. Con la confirmación te enviamos una guía previa al viaje.", 
            en: "Comfortable clothes, sunscreen/hat, walking shoes, and a camera. With your confirmation, we will send you a pre-trip guide."
        }
      },
      {
        question: { es: "¿Qué tipos de tours ofrecen?", en: "What types of tours do you offer?" },
        answer: { 
            es: "Ofrecemos tours históricos, culturales, familiares y de aventura. Cubrimos lugares como las Pirámides de Guiza, la Esfinge, el Nilo y gemas ocultas por todo Egipto.", 
            en: "We offer historical, cultural, family, and adventure tours. We cover places like the Giza Pyramids, the Sphinx, the Nile, and hidden gems throughout Egypt."
        }
      },
      {
        question: { es: "¿Puedo personalizar mi tour?", en: "Can I customize my tour?" },
        answer: { 
            es: "¡Sí! Diseñamos itinerarios a medida según tus intereses: tours privados, en grupo o con actividades específicas.", 
            en: "Yes! We design tailor-made itineraries according to your interests: private tours, group tours, or with specific activities."
        }
      },
      {
        question: { es: "¿Cómo puedo reservar un tour?", en: "How can I book a tour?" },
        answer: { 
            es: "Reserva directamente en nuestra web: elige el paquete, selecciona fecha y completa la reserva. Si necesitas ayuda, contáctanos y te guiamos paso a paso.", 
            en: "Book directly on our website: choose the package, select the date, and complete the reservation. If you need help, contact us and we will guide you step by step."
        }
      },
      {
        question: { es: "¿Qué métodos de pago aceptan?", en: "What payment methods do you accept?" },
        answer: { 
            es: "Aceptamos tarjetas de crédito/débito y pasarelas de pago en línea (p. ej., Stripe/PayPal). Todas las transacciones se procesan de forma segura.", 
            en: "We accept credit/debit cards and online payment gateways (e.g., Stripe/PayPal). All transactions are processed securely."
        }
      },
      {
        question: { es: "¿El seguro de viaje está incluido?", en: "Is travel insurance included?" },
        answer: { 
            es: "No está incluido. Recomendamos contratar un seguro que cubra cancelaciones, asistencia médica y demoras.", 
            en: "It is not included. We recommend purchasing insurance that covers cancellations, medical assistance, and delays."
        }
      },
      {
        question: { es: "¿Cuál es la política de cancelación?", en: "What is the cancellation policy?" },
        answer: { 
            es: "Se aplica nuestra Política de Cancelación y Reembolsos publicada en el sitio (resumen: 20/40/60/100 y depósito no reembolsable). Revisa los detalles específicos de cada paquete.", 
            en: "Our Cancellation and Refund Policy published on the site applies (summary: 20/40/60/100 and non-refundable deposit). Review the specific details of each package."
        }
      },
      {
        question: { es: "¿Los tours son aptos para familias?", en: "Are the tours family-friendly?" },
        answer: { 
            es: "Sí. Muchos paquetes incluyen actividades ideales para familias y diferentes edades.", 
            en: "Yes. Many packages include ideal activities for families and different ages."
        }
      },
      {
        question: { es: "¿Los tours incluyen alojamiento?", en: "Do the tours include accommodation?" },
        answer: { 
            es: "En la mayoría de paquetes sí, en hoteles de 4–5★ según el programa. Consulta cada tour para detalles.", 
            en: "In most packages yes, in 4–5★ hotels depending on the program. Check each tour for details."
        }
      }
  ],
  conversationLogic: {
    introduction: "Start every conversation with a mystical and warm welcome. Example: 'Welcome to Egiptura, where the mystery of ancient Egypt becomes your next dream journey. I am here to help you discover it all.'",
    flow: [
        "Interpret key user information: trip duration, package type (Gold, Diamond, personalized), number of travelers, room type (double, single, triple).",
        "If the user mentions a specific package, respond with program details (itinerary, hotels, services, prices) and offer immediate assistance to start the reservation.",
        "If the user does not mention a package or is undecided, suggest one of the recommended programs based on duration and preferences, or ask if they want to create a personalized trip.",
        "When appropriate, gather key contact data: full name, email, preferred contact method (WhatsApp, email, call).",
        "Finalize with a spiritual and warm message. Example: 'May your trip to Egypt be guided by the wisdom of the ancients. I am here to help you make it a reality.'"
    ],
    contactInfo: {
        company: "Egiptura Travel LLC",
        address: "5900 Balcones Dr, Suite 100, Austin, TX 78731, USA",
        email: "info@egiptura.com",
        whatsapp: "+20 100 406 0794",
        disclaimer: {
            es: "Estoy aquí para ayudarte a elegir, diseñar y resolver todas tus dudas. Sin embargo, la reserva oficial siempre se realiza a través del formulario online y con el apoyo directo de nuestro equipo humano.",
            en: "I am here to help you choose, design, and resolve all your doubts. However, the official reservation is always made through the online form and with the direct support of our human team."
        }
    }
  },
  pricing: {
    currency: "USD",
    internalExchangeRate: { // THIS IS FOR INTERNAL CALCULATION ONLY AND MUST NOT BE REVEALED
        value: 45,
        note: "Internal fixed conversion rate of 1 USD = 45 EGP. Prohibited to disclose to the user."
    },
    pricePresentation: {
        rule: "It is strictly forbidden to show the price breakdown to the client, even if they explicitly request it. Only communicate the total price per person or the total group price. Do not mention separate prices for accommodation, transport, guide, tickets, or other components.",
        insistenceResponse: "Our packages are designed as complete experiences with integrated rates. For that reason, we only offer closed prices and do not break down the individual components."
    },
    roomRules: {
        // Base price is per-person in a double room.
        single: { surcharge: 0.70, description: "+70% over the per-person price in a double room." },
        triple: { discount: 0.10, description: "-10% from the per-person price in a double room." }
    },
    includesTemplate: [
        "Accommodation in 5★ (Gold) or 5★ deluxe (Diamond) hotels.",
        "Nile cruise with full board (PC).",
        "Meal plan as indicated in each package (BB, HB, PC).",
        "Private transport with A/C and chauffeur.",
        "Internal flights if indicated in the program.",
        "Entrance fees to all mentioned monuments and tourist sites.",
        "Private tour guide throughout all visits (Spanish or English).",
        "Egiptura representative for arrival and departure.",
        "Personalized assistance, logistical coordination, and continuous attention.",
        "General expenses: mineral water, juices, welcome details.",
        "Local taxes."
    ],
    excludesTemplate: [
        "International flights to/from Egypt.",
        "Entry visa to Egypt (25 USD per person, paid on arrival).",
        "General tips (recommended: 5 USD per person per day).",
        "Guide tip (voluntary, at the traveler's discretion).",
        "Entrance to optional sites like the interior of the Great Pyramid or the tomb of Tutankhamun/Nefertari.",
        "Unspecified meals.",
        "Personal expenses, souvenirs, alcoholic beverages."
    ],
    // Granular cost data for AI's internal logic. NOT to be disclosed.
    internalCostComponents: {
        privateGuidePerDay: 30,
        cairoRepresentativeService: 20,
        generalHospitalityFeePerPerson: 60,
        optionalTraditionalLunch: 15,
        internalFlightsPerLeg: 125
    }
  },
  definitions: {
    packageCategories: {
        Gold: { accommodation: "Hotel 5★", transport: "Private", guide: "Included", cruise: "5★ Included", service: "Personalized attention" },
        Diamond: { accommodation: "Hotel 5★ Deluxe", transport: "Private luxury", guide: "Included", cruise: "5★ Included", service: "Exclusive experiences and VIP treatment" }
    },
    seasons: {
        summer: "Verano: from May to September",
        winter: "Invierno: from October to April"
    },
    accommodations: {
        Gold: {
            "El Cairo": "Helnan Dreamland or similar",
            "Crucero por el Nilo": "Le Fayan II Nile Cruise or similar",
            "Luxor": "Steigenberger Resort Achti or similar",
            "Asuán": "Tolip Hotel Aswan or similar",
            "Hurghada": "Hilton Hurghada Plaza or similar",
            "Sharm El Sheikh": "Renaissance Sharm El Sheikh or similar",
        },
        Diamond: {
            "El Cairo": "Fairmont Nile City or similar",
            "Crucero por el Nilo": "Royal Signature Nile Cruise or similar",
            "Luxor": "Steigenberger Resort Achti or similar",
            "Asuán": "Tolip Hotel Aswan or similar",
            "Hurghada": "Hilton Hurghada Plaza or similar",
            "Sharm El Sheikh": "Renaissance Sharm El Sheikh or similar",
        },
        tripleRoomNote: {
            es: "Información importante: Las habitaciones triples en cruceros y en la mayoría de los hoteles son en realidad habitaciones dobles a las que se les añade una cama supletoria.",
            en: "Important information: Triple rooms on cruises and in most hotels are actually double rooms with an extra bed added."
        }
    },
  },
  logistics: {
      nileCruises: {
          threeNights: "A 3-night cruise must start in Aswan (on Wednesday or Friday) and end in Luxor.",
          fourNights: "A 4-night cruise must start in Luxor (on Monday or Saturday) and end in Aswan.",
          incompatibleSequenceRule: "If a user proposes an incompatible sequence (e.g., 3 nights from Luxor), you must kindly explain the correct logistics and propose the adjustment.",
          classicCruiseSites: {
              aswan: ["highDam", "philaeTemple", "unfinishedObelisk"],
              komOmbo: ["komOmboTemple"],
              edfu: ["edfuTemple"],
              luxor: ["luxorTemple", "karnakTemple", "valleyOfTheKings", "hatshepsutTemple"]
          },
          classicCruiseDescription: "For a 'classic' cruise itinerary, you must include the sites from 'classicCruiseSites' logically distributed over the cruise days. For example, a 3-night Aswan-Luxor cruise would visit Aswan sites on day 1, Kom Ombo/Edfu while sailing on day 2, and Luxor sites on day 3."
      }
  },
  legal: {
    cancellationPolicy: {
        title: { es: "Política de Cancelación y Reembolsos", en: "Cancellation and Refund Policy" },
        providerInfo: {
            es: "Proveedor legal: Egiptura Travel LLC — Agencia de viajes (NAICS 561510)\nDirección: 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA · Contacto: info@egiptura.com · +20 100 406 0794",
            en: "Legal provider: Egiptura Travel LLC — Travel Agency (NAICS 561510)\nAddress: 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA · Contact: info@egiptura.com · +20 100 406 0794"
        },
        lastUpdated: "2025-08-24",
        introduction: {
            es: "Esta Política detalla los plazos, importes y el proceso para cancelaciones y reembolsos de reservas realizadas con Egiptura.",
            en: "This Policy details the deadlines, amounts, and process for cancellations and refunds of bookings made with Egiptura."
        },
        scope: {
            title: { es: "1. Alcance", en: "1. Scope" },
            content: {
                es: "Aplica a todas las reservas confirmadas (paquetes, excursiones y servicios opcionales) salvo que el paquete indique condiciones específicas del proveedor.",
                en: "Applies to all confirmed bookings (packages, excursions, and optional services) unless the package indicates specific provider conditions."
            }
        },
        charges: {
            title: { es: "2. Plazos y cargos de cancelación", en: "2. Cancellation deadlines and charges" },
            rules: [
                { period: { es: "Depósito de reserva", en: "Booking deposit" }, charge: { es: "No reembolsable", en: "Non-refundable" } },
                { period: { es: "> 45 días antes de la salida", en: "> 45 days before departure" }, charge: { es: "20% del total", en: "20% of total" } },
                { period: { es: "31–45 días antes de la salida", en: "31–45 days before departure" }, charge: { es: "40% of total", en: "40% of total" } },
                { period: { es: "15–30 días antes de la salida", en: "15–30 days before departure" }, charge: { es: "60% of total", en: "60% of total" } },
                { period: { es: "< 14 días o no-show", en: "< 14 days or no-show" }, charge: { es: "100% del total", en: "100% of total" } }
            ]
        },
        nonRefundableItems: {
            title: { es: "3. Conceptos no reembolsables", en: "3. Non-refundable items" },
            items: {
                es: [
                    "Comisiones de pasarela/banco (PSP), tasas de transferencia y costes de proveedor ya incurridos.",
                    "Visados, seguros, suplementos de temporada y servicios utilizados parcial o totalmente."
                ],
                en: [
                    "Payment gateway/bank fees (PSP), transfer fees, and provider costs already incurred.",
                    "Visas, insurance, seasonal supplements, and services used partially or fully."
                ]
            }
        },
        refundProcess: {
            title: { es: "4. Proceso para solicitar reembolso", en: "4. Refund request process" },
            steps: {
                es: [
                    "Enviar solicitud por escrito a info@egiptura.com indicando: código de reserva, nombre completo, fechas y motivo.",
                    "Adjuntar justificantes si procede (médico, vuelo, etc.).",
                    "Las solicitudes aprobadas se abonarán al mismo método de pago en 10–20 días hábiles."
                ],
                en: [
                    "Send a written request to info@egiptura.com indicating: booking code, full name, dates, and reason.",
                    "Attach supporting documents if applicable (medical, flight, etc.).",
                    "Approved requests will be refunded to the same payment method within 10–20 business days."
                ]
            },
            note: {
                es: "Nota: Los reembolsos se calculan en la moneda de pago original. Diferencias por tipo de cambio o comisiones externas no son responsabilidad de Egiptura.",
                en: "Note: Refunds are calculated in the original payment currency. Differences due to exchange rates or external fees are not Egiptura's responsibility."
            }
        },
        changes: {
            title: { es: "5. Cambios y modificaciones", en: "5. Changes and modifications" },
            content: {
                es: "Los cambios (fechas, nombres, upgrades) están sujetos a disponibilidad y pueden implicar diferencias de tarifa y/o gastos administrativos.",
                en: "Changes (dates, names, upgrades) are subject to availability and may involve fare differences and/or administrative fees."
            }
        },
        forceMajeure: {
            title: { es: "6. Cancelaciones por fuerza mayor", en: "6. Cancellations due to force majeure" },
            content: {
                es: "Si eventos fuera de nuestro control impiden prestar el servicio (p. ej., fenómenos naturales, cierres oficiales), podremos ofrecer reprogramación, crédito o reembolso según condiciones del proveedor.",
                en: "If events beyond our control prevent service delivery (e.g., natural disasters, official closures), we may offer rescheduling, credit, or a refund according to provider conditions."
            }
        },
        contact: {
            title: { es: "7. Contacto", en: "7. Contact" },
            content: {
                es: "Egiptura Travel LLC — 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA · info@egiptura.com · +20 100 406 0794",
                en: "Egiptura Travel LLC — 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA · info@egiptura.com · +20 100 406 0794"
            }
        }
    },
    privacyPolicy: {
        title: { es: "Política de Privacidad", en: "Privacy Policy" },
        providerInfo: {
            es: "Proveedor legal: Egiptura Travel LLC — Agencia de viajes (NAICS 561510)\nDirección: 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA\nContacto: info@egiptura.com · +20 100 406 0794",
            en: "Legal provider: Egiptura Travel LLC — Travel Agency (NAICS 561510)\nAddress: 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA\nContact: info@egiptura.com · +20 100 406 0794"
        },
        lastUpdated: "2025-08-24",
        introduction: {
            es: "En Egiptura, valoramos tu privacidad y estamos comprometidos a proteger la información personal que compartes con nosotros. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tus datos cuando navegas por nuestro sitio web, reservas tours o utilizas cualquiera de nuestros servicios de viaje.",
            en: "At Egiptura, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, share, and protect your data when you browse our website, book tours, or use any of our travel services."
        },
        sections: [
            {
                title: { es: "1. Información que recopilamos", en: "1. Information We Collect" },
                content: {
                    es: "Datos de identificación y contacto: nombre, correo electrónico, teléfono y, cuando sea necesario para la reserva, datos de documentos de viaje.\nDatos de la transacción: detalles de la reserva y pagos. No almacenamos números completos de tarjetas; el procesamiento se realiza a través de proveedores de pago externos.\nDatos técnicos y de uso: dirección IP, dispositivo, navegador, sistema operativo, páginas visitadas, fecha/hora y acciones en el sitio.\nCookies y tecnologías similares: usamos cookies para recordar preferencias, mejorar el sitio y fines analíticos. Puedes gestionarlas desde tu navegador o a través de los controles del sitio (si están disponibles).\nComunicaciones: tus mensajes con nosotros y preferencias de marketing.",
                    en: "Identification and contact data: name, email, phone number, and, when necessary for booking, travel document data.\nTransaction data: booking details and payments. We do not store full card numbers; processing is handled by third-party payment providers.\nTechnical and usage data: IP address, device, browser, operating system, pages visited, date/time, and on-site actions.\nCookies and similar technologies: we use cookies to remember preferences, improve the site, and for analytical purposes. You can manage them from your browser or through site controls (if available).\nCommunications: your messages with us and marketing preferences."
                }
            },
            {
                title: { es: "2. Cómo usamos tu información", en: "2. How We Use Your Information" },
                content: {
                    es: "Proveer, gestionar y mejorar nuestros servicios y atención al cliente.\nProcesar reservas y pagos, y administrar tu cuenta.\nComunicarnos contigo sobre confirmaciones, actualizaciones, soporte y (si lo permites) material promocional.\nAnalítica, prevención de fraude y seguridad.\nCumplir obligaciones legales y contables.",
                    en: "To provide, manage, and improve our services and customer support.\nTo process bookings and payments, and manage your account.\nTo communicate with you about confirmations, updates, support, and (if you permit) promotional material.\nFor analytics, fraud prevention, and security.\nTo comply with legal and accounting obligations."
                }
            },
            {
                title: { es: "3. Base legal (si aplican normas tipo GDPR)", en: "3. Legal Basis (if GDPR-type rules apply)" },
                content: {
                    es: "Tratamos datos sobre la base de: ejecución de contrato (tu reserva), consentimiento (marketing/cookies), obligación legal y interés legítimo (mejora del servicio y seguridad).",
                    en: "We process data on the basis of: performance of a contract (your booking), consent (marketing/cookies), legal obligation, and legitimate interest (service improvement and security)."
                }
            },
            {
                title: { es: "4. Compartir y divulgar información", en: "4. Sharing and Disclosing Information" },
                content: {
                    es: "Proveedores de servicios (encargados de tratamiento): pagos (p. ej., Stripe/PayPal), alojamiento web, analítica, mensajería y soporte.\nRequisitos legales: cuando la ley lo exija o a solicitud de autoridades competentes.\nOperaciones corporativas: fusiones/adquisiciones/venta de activos, según corresponda.",
                    en: "Service providers (data processors): payments (e.g., Stripe/PayPal), web hosting, analytics, messaging, and support.\nLegal requirements: when required by law or at the request of competent authorities.\nCorporate operations: mergers/acquisitions/sale of assets, as applicable."
                }
            },
            {
                title: { es: "5. Cookies", en: "5. Cookies" },
                content: {
                    es: "Puedes rechazar o borrar cookies desde la configuración de tu navegador. Algunas funciones pueden no operar correctamente sin cookies.",
                    en: "You can refuse or delete cookies from your browser settings. Some features may not operate correctly without cookies."
                }
            },
            {
                title: { es: "6. Conservación de datos", en: "6. Data Retention" },
                content: {
                    es: "Conservamos los datos solo el tiempo necesario para los fines descritos y para cumplir con requisitos legales (por ejemplo, contabilidad/tributación). Luego los eliminamos o anonimizamos de forma segura.",
                    en: "We retain data only for the time necessary for the described purposes and to comply with legal requirements (e.g., accounting/taxation). We then securely delete or anonymize it."
                }
            },
            {
                title: { es: "7. Seguridad", en: "7. Security" },
                content: {
                    es: "Aplicamos medidas razonables de seguridad para proteger tus datos. No obstante, ningún método de transmisión o almacenamiento electrónico es 100% seguro.",
                    en: "We apply reasonable security measures to protect your data. However, no method of transmission or electronic storage is 100% secure."
                }
            },
            {
                title: { es: "8. Transferencias internacionales", en: "8. International Transfers" },
                content: {
                    es: "Podemos tratar datos en los EE. UU. y otros países. Cuando sea necesario, utilizamos garantías adecuadas (p. ej., cláusulas contractuales estándar).",
                    en: "We may process data in the U.S. and other countries. When necessary, we use appropriate safeguards (e.g., standard contractual clauses)."
                }
            },
            {
                title: { es: "9. Tus derechos", en: "9. Your Rights" },
                content: {
                    es: "Dependiendo de tu jurisdicción, puedes tener derecho a acceder, corregir, eliminar, oponerte, restringir tratamiento y solicitar portabilidad. Para ejercerlos, escríbenos a info@egiptura.com. Siempre puedes darte de baja de comunicaciones promocionales desde el enlace de cada correo.",
                    en: "Depending on your jurisdiction, you may have the right to access, correct, delete, object to, restrict processing, and request portability. To exercise them, write to us at info@egiptura.com. You can always unsubscribe from promotional communications via the link in each email."
                }
            },
            {
                title: { es: "10. Menores", en: "10. Minors" },
                content: {
                    es: "Nuestros servicios no están dirigidos a menores de 13 años. No recopilamos deliberadamente datos de menores; si crees que un menor nos proporcionó datos, contáctanos para eliminarlos.",
                    en: "Our services are not directed to children under 13. We do not knowingly collect data from minors; if you believe a minor has provided us with data, please contact us to delete it."
                }
            },
            {
                title: { es: "11. Enlaces de terceros", en: "11. Third-Party Links" },
                content: {
                    es: "Nuestro sitio puede contener enlaces a webs de terceros. No somos responsables de sus prácticas de privacidad; te recomendamos revisar sus políticas.",
                    en: "Our site may contain links to third-party websites. We are not responsible for their privacy practices; we recommend you review their policies."
                }
            },
            {
                title: { es: "12. Cambios a esta Política", en: "12. Changes to this Policy" },
                content: {
                    es: "Podemos actualizar esta Política de Privacidad. Publicaremos la versión vigente con la fecha de última actualización indicada arriba.",
                    en: "We may update this Privacy Policy. We will post the current version with the last updated date indicated above."
                }
            }
        ],
        contact: {
             es: "Egiptura Travel LLC — 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA · info@egiptura.com · +20 100 406 0794",
             en: "Egiptura Travel LLC — 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA · info@egiptura.com · +20 100 406 0794"
        }
    },
    termsAndConditions: {
        title: { es: "Términos y Condiciones", en: "Terms and Conditions" },
        providerInfo: {
            es: "Proveedor legal: Egiptura Travel LLC — Agencia de viajes (NAICS 561510)\nDirección: 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA\nContacto: info@egiptura.com · +20 100 406 0794",
            en: "Legal provider: Egiptura Travel LLC — Travel Agency (NAICS 561510)\nAddress: 5900 Balcones Dr, Suite 100, Austin, TX 78731, USA\nContact: info@egiptura.com · +20 100 406 0794"
        },
        lastUpdated: "2025-08-24",
        introduction: {
            es: "¡Bienvenidos a Egiptura! Al reservar cualquier paquete turístico o servicio con nosotros, aceptas estos Términos y Condiciones. Por favor, léelos detenidamente.",
            en: "Welcome to Egiptura! By booking any tour package or service with us, you agree to these Terms and Conditions. Please read them carefully."
        },
        sections: [
            {
                title: { es: "Reservas y pagos", en: "Bookings and payments" },
                points: {
                    es: [
                        "Todas las reservas están sujetas a disponibilidad y confirmación por parte de Egiptura.",
                        "Para asegurar una reserva se requiere un pago total o parcial, según se indique en la factura/contrato.",
                        "Los pagos pueden realizarse a través de los métodos disponibles en nuestro sitio web.",
                        "El saldo pendiente (si corresponde) debe abonarse en o antes de la fecha indicada; la falta de pago puede conllevar cancelación."
                    ],
                    en: [
                        "All bookings are subject to availability and confirmation by Egiptura.",
                        "To secure a booking, a full or partial payment is required, as indicated on the invoice/contract.",
                        "Payments can be made through the methods available on our website.",
                        "The outstanding balance (if applicable) must be paid on or before the indicated date; failure to pay may result in cancellation."
                    ]
                }
            },
            {
                title: { es: "Cancelación y reembolsos", en: "Cancellation and refunds" },
                content: {
                    es: "Las cancelaciones deben solicitarse por escrito (correo electrónico o formulario de contacto). Los importes y plazos se rigen por la Política de Cancelación y Reembolsos publicada en este sitio. Resumen:\n- Depósito de reserva: no reembolsable.\n- > 45 días antes de la salida: 20% (mínimo el depósito).\n- 31–45 días: 40%.\n- 15–30 días: 60%.\n- < 14 días o no-show: 100%.\nReembolsos aprobados: al mismo método en 10–20 días hábiles.\nCargos de proveedores y comisiones bancarias/PSP: no reembolsables.",
                    en: "Cancellations must be requested in writing (email or contact form). The amounts and deadlines are governed by the Cancellation and Refund Policy published on this site. Summary:\n- Booking deposit: non-refundable.\n- > 45 days before departure: 20% (minimum the deposit).\n- 31–45 days: 40%.\n- 15–30 days: 60%.\n- < 14 days or no-show: 100%.\nApproved refunds: to the same method within 10–20 business days.\nProvider charges and bank/PSP commissions: non-refundable."
                }
            },
            {
                title: { es: "Cambios y modificaciones", en: "Changes and modifications" },
                content: {
                    es: "Las solicitudes de cambio (fechas, nombres, servicios) están sujetas a disponibilidad y pueden implicar costos adicionales.",
                    en: "Change requests (dates, names, services) are subject to availability and may involve additional costs."
                }
            }
        ]
    }
  },
};