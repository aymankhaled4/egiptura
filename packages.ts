
import type { Program } from '../types';

export const packages: Program[] = [
    {
        id: 1,
        name: {
            es: "El Rey Tut te Invita",
            en: "The King Tut Invite",
            ar: "دعوة الملك توت"
        },
        icon: "🏺",
        duration: { days: 8, nights: 7 },
        priceFrom: 1365,
        categories: ["Adventure", "Cultural"],
        startCity: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' },
        cruiseNights: 4,
        runDays: {
            es: "Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
            en: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
            ar: "الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت، الأحد"
        },
        cruiseRunDays: {
            es: "Los cruceros desde Luxor salen cada sábado y lunes. Los cruceros desde Asuán salen cada miércoles y viernes.",
            en: "Cruises from Luxor depart every Saturday and Monday. Cruises from Aswan depart every Wednesday and Friday.",
            ar: "تبحر الرحلات من الأقصر كل سبت واثنين. تبحر الرحلات من أسوان كل أربعاء وجمعة."
        },
        briefDescription: {
            es: "Una majestuosa odisea de 8 días por el corazón de Egipto. Personaliza tu aventura eligiendo si tu crucero de lujo por el Nilo comienza en Lúxor o Asuán, y explora las Pirámides, templos icónicos y los tesoros del Gran Museo Egipcio.",
            en: "A majestic 8-day odyssey through the heart of Egypt. Customize your adventure by choosing whether your luxury Nile cruise starts in Luxor or Aswan, and explore the Pyramids, iconic temples, and the treasures of the Grand Egyptian Museum.",
            ar: "رحلة مهيبة لمدة 8 أيام عبر قلب مصر. خصص مغامرتك باختيار ما إذا كانت رحلتك النيلية الفاخرة تبدأ من الأقصر أو أسوان، واستكشف الأهرامات والمعابد الشهيرة وكنوز المتحف المصري الكبير."
        },
        generalDescription: {
            es: "Embárcate en una odisea de 8 días a través del corazón eterno de Egipto, un majestuoso viaje donde las maravillas ancestrales y el eterno abrazo del Nilo tejen tu historia inolvidable. Ya sea que elijas sumergirte primero en el vibrante pulso de El Cairo o zarpar de inmediato por el legendario río, una cálida bienvenida egipcia y los esplendores de los faraones te esperan. Admira con asombro las majestuosas Grandes Pirámides de Guiza, donde la enigmática Esfinge mantiene su vigilia eterna. Piérdete entre los deslumbrantes tesoros del Museo Egipcio, hogar de reliquias invaluables que susurran relatos de una era pasada. En El Cairo, también tendrás la oportunidad de explorar la antigua necrópolis de Saqqara y deambular por los bulliciosos y aromáticos callejones del bazar Khan el-Khalili, según el camino que elijas. Tu travesía se despliega luego por la arteria vital de Egipto, el Nilo, a bordo de un crucero de lujo cinco estrellas. Desde la serena belleza de Asuán, maravíllate con el místico Templo de Filae, una visión etérea que emerge de las aguas. Tal vez desees deslizarte bajo un manto de estrellas en una tradicional faluca, sintiendo el ritmo ancestral del río. Aventúrate hasta los monumentales templos de Abu Simbel, un sobrecogedor testimonio del poder y la devoción faraónica, esculpido en la propia roca. Mientras navegas por las suaves corrientes, descubre el singular Templo ribereño de Kom Ombo y el notablemente conservado Templo de Edfu. Llega a Luxor, el museo al aire libre más grande del mundo, donde los colosales pilares de los templos de Karnak y Luxor se alzan hacia los cielos. Camina por los senderos sagrados del Valle de los Reyes, donde los faraones yacen en su sueño eterno, y contempla la maravilla arquitectónica del templo de la reina Hatshepsut, enclavado dramáticamente contra los acantilados. Concluyendo con recuerdos entrañables y una última noche en El Cairo, este viaje extraordinario te permite personalizar tu descubrimiento. Deja que el encanto del Nilo, la grandeza de las civilizaciones antiguas y la calidez de la hospitalidad egipcia se conviertan en parte indeleble de tu alma, dejándote cautivado para siempre.",
            en: "Embark on an 8-day odyssey through the eternal heart of Egypt, a majestic journey where ancient wonders and the timeless embrace of the Nile weave your unforgettable story. Whether you choose to first immerse yourself in the vibrant pulse of Cairo or set sail immediately on the legendary river, a warm Egyptian welcome and the splendors of the pharaohs await you. Gaze in awe at the majestic Great Pyramids of Giza, where the enigmatic Sphinx keeps its eternal vigil. Lose yourself among the dazzling treasures of the Egyptian Museum, home to priceless relics that whisper tales of a bygone era. In Cairo, you will also have the opportunity to explore the ancient necropolis of Saqqara and wander through the bustling, aromatic alleys of the Khan el-Khalili bazaar, depending on the path you choose. Your journey then unfolds along Egypt's lifeblood, the Nile, aboard a five-star luxury cruise. From the serene beauty of Aswan, marvel at the mystical Temple of Philae, an ethereal vision emerging from the waters. You might wish to glide under a blanket of stars in a traditional felucca, feeling the ancestral rhythm of the river. Venture to the monumental temples of Abu Simbel, a breathtaking testament to pharaonic power and devotion, carved into the rock itself. As you sail the gentle currents, discover the unique riverside Temple of Kom Ombo and the remarkably preserved Temple of Edfu. Arrive in Luxor, the world's largest open-air museum, where the colossal pillars of the Karnak and Luxor temples rise to the heavens. Walk the sacred paths of the Valley of the Kings, where the pharaohs lie in their eternal slumber, and behold the architectural wonder of Queen Hatshepsut's temple, dramatically nestled against the cliffs. Concluding with cherished memories and a final night in Cairo, this extraordinary journey allows you to customize your discovery. Let the charm of the Nile, the grandeur of ancient civilizations, and the warmth of Egyptian hospitality become an indelible part of your soul, leaving you forever captivated.",
            ar: "انطلق في رحلة ملحمية لمدة 8 أيام عبر قلب مصر الخالد، رحلة مهيبة حيث تنسج العجائب القديمة وعناق النيل الخالد قصتك التي لا تُنسى. سواء اخترت أن تغمر نفسك أولاً في نبض القاهرة النابض بالحياة أو تبحر فوراً في النهر الأسطوري، فإن الترحيب المصري الحار وروائع الفراعنة في انتظارك. تأمل بدهشة أهرامات الجيزة المهيبة، حيث يحافظ أبو الهول الغامض على حراسته الأبدية. تاه في كنوز المتحف المصري المبهرة، موطن الآثار التي لا تقدر بثمن والتي تهمس بحكايات عصر مضى. في القاهرة، ستتاح لك أيضاً فرصة استكشاف جبانة سقارة القديمة والتجول في أزقة خان الخليلي المزدحمة والعطرة، حسب المسار الذي تختاره. تتكشف رحلتك بعد ذلك على طول شريان حياة مصر، النيل، على متن رحلة بحرية فاخرة من فئة الخمس نجوم. من جمال أسوان الهادئ، تعجب بمعبد فيلة الغامض، رؤية أثيرية تخرج من المياه. قد ترغب في الانزلاق تحت غطاء من النجوم في فلوكة تقليدية، وتشعر بإيقاع النهر القديم. غامر بالوصول إلى معابد أبو سمبل الأثرية، شهادة مذهلة على قوة الفراعنة وتفانيهم، منحوتة في الصخر نفسه. بينما تبحر في التيارات اللطيفة، اكتشف معبد كوم أمبو الفريد على ضفاف النهر ومعبد إدفو المحفوظ بشكل ملحوظ. تصل إلى الأقصر، أكبر متحف في الهواء الطلق في العالم، حيث ترتفع أعمدة معبدي الكرنك والأقصر الضخمة إلى السماء. امش في المسارات المقدسة لوادي الملوك، حيث يرقد الفراعنة في نومهم الأبدي، وتأمل في الأعجوبة المعمارية لمعبد الملكة حتشبسوت، الذي يقع بشكل درامي على المنحدرات. تختتم بذكريات عزيزة وليلة أخيرة في القاهرة، تتيح لك هذه الرحلة الاستثنائية تخصيص اكتشافك. دع سحر النيل، وعظمة الحضارات القديمة، ودفء الضيافة المصرية يصبح جزءًا لا يمحى من روحك، ويتركك مفتونًا إلى الأبد."
        },
        accommodations: {
            gold: [
                { city: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' }, hotel: { es: 'Helnan Dreamland o similar', en: 'Helnan Dreamland or similar', ar: 'هيلنان دريم لاند أو ما يعادله' } },
                { city: { es: 'Crucero por el Nilo', en: 'Nile Cruise', ar: 'رحلة نيلية' }, hotel: { es: 'Le Fayan II Nile Cruise o similar', en: 'Le Fayan II Nile Cruise or similar', ar: 'لو فايان 2 كروز أو ما يعادله' } }
            ],
            diamond: [
                { city: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' }, hotel: { es: 'Fairmont Nile City o similar', en: 'Fairmont Nile City or similar', ar: 'فيرمونت نايل سيتي أو ما يعادله' } },
                { city: { es: 'Crucero por el Nilo', en: 'Nile Cruise', ar: 'رحلة نيلية' }, hotel: { es: 'Royal Signature Nile Cruise o similar', en: 'Royal Signature Nile Cruise or similar', ar: 'رويال سيغنتشر كروز أو ما يعادله' } }
            ]
        },
        itineraryOptions: [
            {
                name: { es: "Opción: Crucero desde Asuán", en: "Option: Cruise from Aswan", ar: "خيار: رحلة نيلية من أسوان" },
                itinerary: [
                    { day: 1, title: { es: "Llegada a El Cairo – Comienza tu sueño egipcio", en: "Arrival in Cairo – Your Egyptian dream begins", ar: "الوصول إلى القاهرة – يبدأ حلمك المصري" }, activities: { es: ["Bienvenido a Egipto. A tu llegada al Aeropuerto Internacional de El Cairo, nuestro equipo te recibirá para asistirte con el visado y aduanas. Traslado en vehículo privado de lujo a tu hotel para descansar."], en: ["Welcome to Egypt. Upon your arrival at Cairo International Airport, our team will greet you to assist with visa and customs. Transfer in a private luxury vehicle to your hotel to rest."], ar: ["أهلاً بك في مصر. عند وصولك إلى مطار القاهرة الدولي، سيقوم فريقنا باستقبالك للمساعدة في إجراءات التأشيرة والجمارك. سيتم نقلك في سيارة خاصة فاخرة إلى فندقك للراحة."] } },
                    { day: 2, title: { es: "Cairo – Pirámides Eternas y el Gran Museo Egipcio", en: "Cairo – Eternal Pyramids & The Grand Egyptian Museum", ar: "القاهرة – الأهرامات الخالدة والمتحف المصري الكبير" }, activities: { es: ["Desayuno. Visita a la meseta de Guiza para admirar las Pirámides de Keops, Kefrén y Micerino, y la enigmática Esfinge. Almuerzo. Visita al Gran Museo Egipcio (GEM), hogar de la colección de Tutankamón. Regreso al hotel."], en: ["Breakfast. Visit the Giza plateau to admire the Pyramids of Cheops, Khafre, and Mykerinos, and the enigmatic Sphinx. Lunch. Visit the Grand Egyptian Museum (GEM), home to Tutankhamun's collection. Return to the hotel."], ar: ["إفطار. زيارة هضبة الجيزة للاستمتاع بأهرامات خوفو وخفرع ومنقرع وأبو الهول الغامض. غداء. زيارة المتحف المصري الكبير، موطن مجموعة توت عنخ آمون. العودة إلى الفندق."] } },
                    { day: 3, title: { es: "Vuelo a Asuán e Inicio del Crucero", en: "Flight to Aswan & Cruise Embarkation", ar: "رحلة إلى أسوان وبدء الرحلة النيلية" }, activities: { es: ["Desayuno. Traslado al aeropuerto para volar a Asuán. A la llegada, visita a la Alta Presa y al Templo de Filae. Embarque en el crucero de lujo. Almuerzo. Por la tarde, paseo en faluca alrededor de la Isla Elefantina. Cena y noche a bordo."], en: ["Breakfast. Transfer to the airport to fly to Aswan. Upon arrival, visit the High Dam and the Temple of Philae. Embark on the luxury cruise. Lunch. In the afternoon, a felucca ride around Elephantine Island. Dinner and overnight on board."], ar: ["إفطار. الانتقال إلى المطار للسفر إلى أسوان. عند الوصول، زيارة السد العالي ومعبد فيلة. الصعود إلى السفينة الفاخرة. غداء. في فترة ما بعد الظهر، جولة بالفلوكة حول جزيرة إلفنتين. عشاء ومبيت على متن السفينة."] } },
                    { day: 4, title: { es: "Abu Simbel y Navegación a Kom Ombo", en: "Abu Simbel & Sailing to Kom Ombo", ar: "أبو سمبل والإبحار إلى كوم أمبو" }, activities: { es: ["Excursión opcional a los Templos de Abu Simbel. Regreso al crucero para el almuerzo mientras se navega hacia Kom Ombo. Visita al Templo de Sobek y Haroeris. Navegación hacia Edfu. Cena y noche a bordo."], en: ["Optional excursion to the Abu Simbel Temples. Return to the cruise for lunch while sailing to Kom Ombo. Visit the Temple of Sobek and Haroeris. Sail to Edfu. Dinner and overnight on board."], ar: ["رحلة اختيارية إلى معابد أبو سمبل. العودة إلى السفينة للغداء أثناء الإبحار إلى كوم أمبو. زيارة معبد سوبك وحورس. الإبحار إلى إدفو. عشاء ومبيت على متن السفينة."] } },
                    { day: 5, title: { es: "Edfu y Navegación a Luxor", en: "Edfu & Sailing to Luxor", ar: "إدفو والإبحار إلى الأقصر" }, activities: { es: ["Desayuno. Visita al Templo de Horus en Edfu. Navegación hacia Luxor. A la llegada, visita al Templo de Luxor. Cena y noche a bordo."], en: ["Breakfast. Visit the Temple of Horus in Edfu. Sail to Luxor. Upon arrival, visit Luxor Temple. Dinner and overnight on board."], ar: ["إفطار. زيارة معبد حورس في إدفو. الإبحار إلى الأقصر. عند الوصول، زيارة معبد الأقصر. عشاء ومبيت على متن السفينة."] } },
                    { day: 6, title: { es: "Orilla Occidental de Luxor", en: "Luxor's West Bank", ar: "الضفة الغربية للأقصر" }, activities: { es: ["Desayuno. Visita al Valle de los Reyes, el Templo de Hatshepsut y los Colosos de Memnón. Tarde libre. Cena y noche a bordo."], en: ["Breakfast. Visit the Valley of the Kings, the Temple of Hatshepsut, and the Colossi of Memnon. Free afternoon. Dinner and overnight on board."], ar: ["إفطار. زيارة وادي الملوك ومعبد حتشبسوت وتمثالي ممنون. فترة ما بعد الظهر حرة. عشاء ومبيت على متن السفينة."] } },
                    { day: 7, title: { es: "Karnak y Regreso a El Cairo", en: "Karnak & Return to Cairo", ar: "الكرنك والعودة إلى القاهرة" }, activities: { es: ["Desayuno y desembarque. Visita al Templo de Karnak. Traslado al aeropuerto de Luxor para volar de regreso a El Cairo. Traslado al hotel y alojamiento."], en: ["Breakfast and disembarkation. Visit Karnak Temple. Transfer to Luxor airport to fly back to Cairo. Transfer to the hotel and accommodation."], ar: ["إفطار ونزول من السفينة. زيارة معبد الكرنك. الانتقال إلى مطار الأقصر للعودة إلى القاهرة. الانتقال إلى الفندق والإقامة."] } },
                    { day: 8, title: { es: "Salida de El Cairo", en: "Departure from Cairo", ar: "المغادرة من القاهرة" }, activities: { es: ["Desayuno. A la hora prevista, traslado al Aeropuerto Internacional de El Cairo para tu vuelo de regreso."], en: ["Breakfast. At the scheduled time, transfer to Cairo International Airport for your return flight."], ar: ["إفطار. في الوقت المحدد، الانتقال إلى مطار القاهرة الدولي لرحلة العودة."] } }
                ]
            },
            {
                name: { es: "Opción: Crucero desde Luxor", en: "Option: Cruise from Luxor", ar: "خيار: رحلة نيلية من الأقصر" },
                itinerary: [
                    { day: 1, title: { es: "Llegada a El Cairo", en: "Arrival in Cairo", ar: "الوصول إلى القاهرة" }, activities: { es: ["Llegada, asistencia y traslado al hotel."], en: ["Arrival, assistance, and transfer to the hotel."], ar: ["الوصول والمساعدة والنقل إلى الفندق."] } },
                    { day: 2, title: { es: "Pirámides y Gran Museo Egipcio", en: "Pyramids & Grand Egyptian Museum", ar: "الأهرامات والمتحف المصري الكبير" }, activities: { es: ["Visita a las Pirámides de Guiza, la Esfinge y el Gran Museo Egipcio."], en: ["Visit the Giza Pyramids, the Sphinx, and the Grand Egyptian Museum."], ar: ["زيارة أهرامات الجيزة وأبو الهول والمتحف المصري الكبير."] } },
                    { day: 3, title: { es: "Vuelo a Luxor e Inicio del Crucero", en: "Flight to Luxor & Cruise Embarkation", ar: "رحلة إلى الأقصر وبدء الرحلة النيلية" }, activities: { es: ["Vuelo a Luxor. Embarque y almuerzo. Visita a los Templos de Karnak y Luxor."], en: ["Flight to Luxor. Embarkation and lunch. Visit the Temples of Karnak and Luxor."], ar: ["رحلة جوية إلى الأقصر. الصعود إلى السفينة والغداء. زيارة معبدي الكرنك والأقصر."] } },
                    { day: 4, title: { es: "Orilla Occidental de Luxor", en: "Luxor's West Bank", ar: "الضفة الغربية للأقصر" }, activities: { es: ["Visita al Valle de los Reyes, Templo de Hatshepsut y Colosos de Memnón. Navegación a Esna."], en: ["Visit the Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon. Sail to Esna."], ar: ["زيارة وادي الملوك ومعبد حتشبسوت وتمثالي ممنون. الإبحار إلى إسنا."] } },
                    { day: 5, title: { es: "Edfu y Kom Ombo", en: "Edfu & Kom Ombo", ar: "إدفو وكوم أمبو" }, activities: { es: ["Visita al Templo de Horus en Edfu, luego al Templo de Sobek en Kom Ombo. Navegación a Asuán."], en: ["Visit the Temple of Horus in Edfu, then the Temple of Sobek in Kom Ombo. Sail to Aswan."], ar: ["زيارة معبد حورس في إدفو، ثم معبد سوبك في كوم أمبو. الإبحار إلى أسوان."] } },
                    { day: 6, title: { es: "Asuán: Presa y Templos", en: "Aswan: Dam & Temples", ar: "أسوان: السد والمعابد" }, activities: { es: ["Visita a la Alta Presa, el Templo de Filae. Tarde libre. Opción de visitar un pueblo Nubio."], en: ["Visit the High Dam, the Temple of Philae. Free afternoon. Option to visit a Nubian village."], ar: ["زيارة السد العالي ومعبد فيلة. فترة ما بعد الظهر حرة. خيار زيارة قرية نوبية."] } },
                    { day: 7, title: { es: "Abu Simbel y Regreso a El Cairo", en: "Abu Simbel & Return to Cairo", ar: "أبو سمبل والعودة إلى القاهرة" }, activities: { es: ["Desayuno y desembarque. Excursión opcional a Abu Simbel. Vuelo de Asuán a El Cairo. Traslado al hotel."], en: ["Breakfast and disembarkation. Optional excursion to Abu Simbel. Flight from Aswan to Cairo. Transfer to the hotel."], ar: ["إفطار ونزول من السفينة. رحلة اختيارية إلى أبو سمبل. رحلة جوية من أسوان إلى القاهرة. الانتقال إلى الفندق."] } },
                    { day: 8, title: { es: "Salida de El Cairo", en: "Departure from Cairo", ar: "المغادرة من القاهرة" }, activities: { es: ["Desayuno y traslado al aeropuerto para el vuelo de regreso."], en: ["Breakfast and transfer to the airport for the return flight."], ar: ["إفطار وانتقال إلى المطار لرحلة العودة."] } }
                ]
            }
        ],
    servicesIncluded: {
        es: [
            "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para trámites de visa y aduanas.",
            "Vuelos domésticos (El Cairo-Asuán, Luxor-El Cairo) o (El Cairo-Luxor, Asuán-El Cairo).",
            "3 o 4 noches de alojamiento en El Cairo con desayuno.",
            "4 o 3 noches en un crucero por el Nilo de 5 estrellas con pensión completa (bebidas no incluidas).",
            "1 almuerzo gourmet en restaurante local seleccionado.",
            "Traslados privados de lujo entre todos los destinos y aeropuertos.",
            "Visitas según se menciona en el itinerario."
        ],
        en: [
            "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
            "Domestic flights (Cairo-Aswan, Luxor-Cairo) or (Cairo-Luxor, Aswan-Cairo).",
            "3 or 4 nights of accommodation in Cairo with breakfast.",
            "4 or 3 nights on a 5-star Nile cruise with full board (drinks not included).",
            "1 gourmet lunch at selected local restaurant.",
            "Private luxury transfers between all destinations and airports.",
            "Visits as mentioned in the itinerary."
        ],
        ar: [
            "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
            "الرحلات الجوية المحلية (القاهرة - أسوان، الأقصر - القاهرة) أو (القاهرة - الأقصر، أسوان - القاهرة).",
            "3 أو 4 ليالٍ في القاهرة مع الإفطار.",
            "4 أو 3 ليالٍ في رحلة نيلية فاخرة 5 نجوم بنظام الإقامة الكاملة (المشروبات غير مشمولة).",
            "غداء فاخر في مطعم محلي مختار.",
            "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.",
            "الزيارات كما هو مذكور في البرنامج."
        ]
},
        servicesExcluded: {
            es: ["Vuelos internacionales.", "Visado 25 $ (pagadero a la llegada).", "Propinas para conductores y personal del crucero 50 $ por persona.", "Entradas al interior de las Pirámides y a la Tumba de Tutankamón.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
            en: ["International flights.", "Visa $25 (payable upon arrival).", "Tips for drivers and cruise staff $50 per person.", "Entrance fees to the interior of the Pyramids and Tutankhamun's Tomb.", "Optional excursions and any visits not mentioned in the program.", "Beverages  and personal expenses."],
            ar: ["الرحلات الدولية.", "تأشيرة الدخول 25 دولارًا (تُدفع عند الوصول).", "إكراميات للسائقين وموظفي الرحلة البحرية 50 دولارًا للشخص الواحد.", "رسوم الدخول إلى داخل الأهرامات ومقبرة توت عنخ آمون.", "الرحلات الاختيارية وأي زيارات غير مذكورة في البرنامج.", "المشروبات والمصروفات الشخصية."]
        },
        importantNotes: {
            es: [
                "Salida diaria garantizada con un mínimo de 2 personas.",
                "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.",
                "Los precios finales pueden variar debido a cambios en tarifas, impuestos y/o recargos por combustible.",
                "El orden de las visitas puede modificarse sin afectar el contenido del viaje.",
                "Las habitaciones triples en cruceros y en varios hoteles son habitaciones dobles con una cama adicional.",
                "Los cruceros desde Luxor salen cada sábado y lunes.",
                "Los cruceros desde Asuán salen cada miércoles y viernes."
            ],
            en: [
                "Guaranteed daily departure with a minimum of 2 people.",
                "Hotels and cruises may be substituted for others of the same category with prior notice to the client.",
                "Final prices may vary due to changes in rates, taxes, and/or fuel surcharges.",
                "The order of visits may be modified without affecting the content of the trip.",
                "Triple rooms on cruises and in various hotels are double rooms with an extra bed.",
                "Cruises from Luxor depart every Saturday and Monday.",
                "Cruises from Aswan depart every Wednesday and Friday."
            ],
            ar: [
                "مغادرة يومية مضمونة بحد أدنى شخصين.",
                "يمكن استبدال الفنادق والرحلات البحرية بأخرى من نفس الفئة مع إشعار مسبق للعميل.",
                "قد تختلف الأسعار النهائية بسبب التغييرات في الأسعار والضرائب و/أو رسوم الوقود الإضافية.",
                "قد يتم تعديل ترتيب الزيارات دون التأثير على محتوى الرحلة.",
                "الغرف الثلاثية في الرحلات البحرية وفي العديد من الفنادق هي غرف مزدوجة مع سرير إضافي.",
                "تغادر الرحلات البحرية من الأقصر كل سبت واثنين.",
                "تغادر الرحلات البحرية من أسوان كل أربعاء وجمعة."
            ]
        },
        seasonalPricing: {
            summer: {
                gold: { single: 1670, double: 1400, triple: 1365 },
                diamond: { single: 2185, double: 1690, triple: 1650 }
            },
            winter: {
                gold: { single: 1930, double: 1540, triple: 1500 },
                diamond: { single: 2465, double: 1855, triple: 1815 }
            }
        }
    },
    {
        id: 2,
        name: {
            es: "Crónicas de El Cairo: Escapada De Lujo",
            en: "Cairo Chronicles: Luxury Getaway",
            ar: "سجلات القاهرة: ملاذ فاخر"
        },
        icon: "🕌",
        duration: { days: 5, nights: 4 },
        priceFrom: 540,
        categories: ["Cultural", "Historical"],
        startCity: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' },
        // cruiseNights: 0,
        runDays: {
            es: "Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
            en: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
            ar: "الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت، الأحد"
        },
        briefDescription: {
            es: "Una escapada fascinante a la esencia de Egipto. Descubrirás las joyas de El Cairo: las Pirámides, Saqqara, el Gran Museo Egipcio, y el bazar Khan el-Khalili.",
            en: "A fascinating getaway to the essence of Egypt. You will discover the jewels of Cairo: the Pyramids, Saqqara, the Grand Egyptian Museum, and the Khan el-Khalili bazaar.",
            ar: "رحلة ساحرة إلى جوهر مصر. ستكتشف جواهر القاهرة: الأهرامات، سقارة، المتحف المصري الكبير، وبازار خان الخليلي."
        },
        generalDescription: {
            es: "Una escapada fascinante a la esencia de Egipto. Desde la mágica bienvenida en el aeropuerto hasta la comodidad de un hotel seleccionado, descubrirás las joyas de El Cairo: las Pirámides de Guiza y la Gran Esfinge, la necrópolis de Saqqara, el innovador Gran Museo Egipcio, y la imponente Mezquita de Mohamed Ali en la Ciudadela. Explora el bullicioso bazar Khan el-Khalili y disfruta de un día libre para elegir entre experiencias únicas: una visita a Menfis, el Cairo Copto, un crucero en faluca privada o simplemente relajarte en tu hotel. Una aventura que concluye en el corazón de la ciudad, llena de asombro y descubrimiento.",
            en: "A fascinating getaway to the essence of Egypt. From the magical welcome at the airport to the comfort of a selected hotel, you'll discover the jewels of Cairo: the Giza Pyramids and the Great Sphinx, the Saqqara necropolis, the innovative Grand Egyptian Museum, and the imposing Mohamed Ali Mosque at the Citadel. Explore the bustling Khan el-Khalili bazaar and enjoy a free day to choose from unique experiences: a visit to Memphis, Coptic Cairo, a private felucca cruise, or simply relaxing at your hotel. An adventure that concludes in the heart of the city, filled with wonder and discovery.",
            ar: "ملاذ ساحر إلى جوهر مصر. من الترحيب السحري في المطار إلى راحة فندق مختار، ستكتشف جواهر القاهرة: أهرامات الجيزة وأبو الهول، مقبرة سقارة، المتحف المصري الكبير المبتكر، ومسجد محمد علي المهيب في القلعة. استكشف بازار خان الخليلي الصاخب واستمتع بيوم حر للاختيار من بين تجارب فريدة: زيارة ممفيس، القاهرة القبطية، رحلة بحرية خاصة بالفلوكة، أو ببساطة الاسترخاء في فندقك. مغامرة تنتهي في قلب المدينة، مليئة بالدهشة والاكتشاف."
        },
        accommodations: {
            gold: [
                { city: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' }, hotel: { es: 'Helnan Dreamland o similar', en: 'Helnan Dreamland or similar', ar: 'هيلنان دريم لاند أو ما يعادله' } }
            ],
            diamond: [
                { city: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' }, hotel: { es: 'Fairmont Nile City o similar', en: 'Fairmont Nile City or similar', ar: 'فيرمونت نايل سيتي أو ما يعادله' } }
            ]
        },
        itinerary: [
            {
                day: 1,
                title: {
                    es: "Llegada a El Cairo – Gran Bienvenida",
                    en: "Arrival in Cairo – Grand Welcome",
                    ar: "الوصول إلى القاهرة – ترحيب كبير"
                },
                activities: {
                    es: [
                        "A su llegada al Aeropuerto Internacional de El Cairo, disfrute de una cálida bienvenida.",
                        "Nuestro equipo estará esperando para ayudarle con los trámites de visa y aduanas, garantizando un proceso rápido y sin problemas.",
                        "Relájese con refrescos antes de ser trasladado a su hotel.",
                        "Un lujoso vehículo privado lo llevará a su hotel, donde será recibido con un servicio de check-in personalizado.",
                        "En su elegante habitación, podrá relajarse después del viaje y disfrutar de una tranquila primera noche en El Cairo."
                    ],
                    en: [
                        "Upon your arrival at Cairo International Airport, enjoy a warm welcome.",
                        "Our team will be waiting to assist you with visa and customs procedures, ensuring a fast and smooth process.",
                        "Relax with refreshments before being transferred to your hotel.",
                        "A luxurious private vehicle will take you to your hotel, where you will be welcomed with personalized check-in service.",
                        "In your elegant room, you can unwind after the journey and enjoy a peaceful first night in Cairo."
                    ],
                    ar: [
                        "عند وصولك إلى مطار القاهرة الدولي، استمتع بترحيب حار.",
                        "سيكون فريقنا في انتظارك لمساعدتك في إجراءات التأشيرة والجمارك، مما يضمن عملية سريعة وسلسة.",
                        "استرخِ مع المشروبات المنعشة قبل نقللك إلى فندقك.",
                        "ستنقلك سيارة فاخرة خاصة إلى فندقك، حيث سيتم استقبالك بخدمة تسجيل وصول شخصية.",
                        "في غرفتك الأنيقة، يمكنك الاسترخاء بعد الرحلة والاستمتاع بليلة أولى هادئة في القاهرة."
                    ]
                }
            },
            {
                day: 2,
                title: {
                    es: "Las Majestuosas Pirámides y Saqqara",
                    en: "The Majestic Pyramids and Saqqara",
                    ar: "الأهرامات المهيبة وسقارة"
                },
                activities: {
                    es: [
                        "Comience su día con un delicioso desayuno bufé en su hotel, preparándose para un viaje inolvidable a través de las maravillas más icónicas de Egipto.",
                        "Disfrute de una visita privada a las legendarias Pirámides de Giza: Keops, Kefrén y Micerinos, maravillas arquitectónicas que han capturado la imaginación del mundo durante milenios.",
                        "Acompañado por su guía privado, obtendrá información exclusiva sobre estas impresionantes estructuras, experimentándolas de manera íntima y detallada.",
                        "Párese ante la enigmática Esfinge y explore el Templo del Valle de Kefrén, donde aprenderá sobre los fascinantes rituales funerarios que honraban a los faraones del Antiguo Egipto.",
                        "A continuación, aventúrese en la Necrópolis de Saqqara, hogar de la Pirámide Escalonada de Zoser, el edificio de piedra más antiguo del mundo y una hazaña arquitectónica innovadora.",
                        "Aquí, descubrirá el legado dejado por los antiguos reyes y altos funcionarios dentro de este vasto complejo funerario.",
                        "Para el almuerzo, saboree platos egipcios tradicionales en un renombrado restaurante local, donde los sabores gourmet se elaboran con auténtica experiencia.",
                        "Regrese a su hotel para una tarde de ocio a su propio ritmo, con alojamiento en El Cairo."
                    ],
                    en: [
                        "Begin your day with a delightful buffet breakfast at your hotel, preparing for an unforgettable journey through Egypt's most iconic wonders.",
                        "Enjoy a private visit to the legendary Pyramids of Giza—Khufu, Khafre, and Menkaure—architectural marvels that have captured the world's imagination for millennia.",
                        "Accompanied by your private guide, you'll gain exclusive insights into these awe-inspiring structures, experiencing them in an intimate and detailed way.",
                        "Stand before the enigmatic Sphinx and explore the Valley Temple of Khafre, where you'll learn about the fascinating funerary rituals that honored the pharaohs of Ancient Egypt.",
                        "Next, venture to the Saqqara Necropolis, home to the Step Pyramid of Djoser, the world's oldest stone building and a groundbreaking architectural feat.",
                        "Here, you'll uncover the legacy left by ancient kings and high officials within this vast funerary complex.",
                        "For lunch, savor traditional Egyptian dishes at a renowned local restaurant, where gourmet flavors are crafted with authentic expertise.",
                        "Return to your hotel for a leisurely afternoon at your own pace, with accommodations in Cairo."
                    ],
                    ar: [
                        "ابدأ يومك بفطور بوفيه لذيذ في فندقك، مستعدًا لرحلة لا تُنسى عبر أعظم عجائب مصر.",
                        "استمتع بزيارة خاصة للأهرامات الأسطورية في الجيزة: خوفو، خفرع، ومنقرع، عجائب معمارية أسرت خيال العالم لآلاف السنين.",
                        "برفقة مرشدك الخاص، ستحصل على رؤى حصرية لهذه الهياكل المذهلة، وتختبرها بطريقة حميمة ومفصلة.",
                        "قف أمام أبو الهول الغامض واستكشف معبد الوادي لخفرع، حيث ستتعرف على الطقوس الجنائزية الرائعة التي كرمت فراعنة مصر القديمة.",
                        "بعد ذلك، اغامر بالذهاب إلى مقبرة سقارة، موطن هرم زوسر المدرج، أقدم مبنى حجري في العالم وإنجاز معماري رائد.",
                        "هنا، ستكشف عن الإرث الذي تركه الملوك القدماء وكبار المسؤولين داخل هذا المجمع الجنائزي الشاسع.",
                        "لتناول الغداء، استمتع بأطباق مصرية تقليدية في مطعم محلي مشهور، حيث يتم صنع النكهات الفاخرة بخبرة أصلية.",
                        "عد إلى فندقك لظهيرة من الاسترخاء على طريقتك، مع الإقامة في القاهرة."
                    ]
                }
            },
            {
                day: 3,
                title: {
                    es: "Historia, Cultura y Bazar",
                    en: "History, Culture, and Bazaar",
                    ar: "التاريخ والثقافة والبازار"
                },
                activities: {
                    es: [
                        "Comience su día con un suculento desayuno bufé en su hotel, estableciendo el tono para un viaje a través de los tesoros culturales e históricos de El Cairo.",
                        "Adéntrese en el futuro de la egiptología con una visita al Gran Museo Egipcio (GEM), el museo arqueológico más grande del mundo dedicado a una sola civilización.",
                        "Situado cerca de las Pirámides de Giza, el GEM exhibe una espectacular colección de artefactos de la rica historia de Egipto, incluyendo estatuas colosales, reliquias antiguas y fascinantes exposiciones que combinan tecnología de vanguardia con antigüedades atemporales.",
                        "El diseño moderno y las exhibiciones inmersivas del museo proporcionan una experiencia única e inolvidable.",
                        "A continuación, ascienda a la Mezquita de Alabastro, también conocida como la Mezquita de Mohamed Ali, majestuosamente encaramada en lo alto de la Ciudadela de Saladino.",
                        "Desde este icónico mirador, disfrute de impresionantes vistas panorámicas del horizonte de El Cairo mientras aprende sobre la rica historia de este símbolo del poder y la fe de Egipto.",
                        "Continúe con un paseo por el bullicioso Bazar Khan el-Khalili, un vibrante laberinto de especias exóticas, productos artesanales y tesoros únicos.",
                        "Este animado mercado ofrece la oportunidad perfecta para encontrar recuerdos únicos y sumergirse en el espíritu vivaz de la cultura local de El Cairo.",
                        "Haga una pausa para almorzar en un restaurante local de alta gama, donde puede disfrutar de una cocina egipcia refinada.",
                        "Disfrute de una tarde de ocio a su propio ritmo, ya sea explorando más de El Cairo o relajándose en su hotel.",
                        "Alojamiento: El Cairo."
                    ],
                    en: [
                        "Begin your day with a sumptuous buffet breakfast at your hotel, setting the tone for a journey through Cairo's cultural and historical treasures.",
                        "Step into the future of Egyptology with a visit to the Grand Egyptian Museum (GEM), the largest archaeological museum in the world dedicated to a single civilization.",
                        "Situated near the Giza Pyramids, the GEM showcases a spectacular collection of artifacts from Egypt's rich history, including colossal statues, ancient relics, and fascinating exhibitions that combine cutting-edge technology with timeless antiquities.",
                        "The museum's modern design and immersive displays provide a unique and unforgettable experience.",
                        "Next, ascend to the Alabaster Mosque, also known as the Mohamed Ali Mosque, majestically perched atop the Citadel of Saladin.",
                        "From this iconic vantage point, take in sweeping panoramic views of Cairo's skyline as you learn about the rich history of this symbol of Egypt's power and faith.",
                        "Continue with a stroll through the bustling Khan el-Khalili Bazaar, a vibrant labyrinth of exotic spices, handcrafted goods, and one-of-a-kind treasures.",
                        "This lively market offers the perfect opportunity to find unique souvenirs and immerse yourself in the lively spirit of Cairo's local culture.",
                        "Pause for lunch at a high-end local restaurant, where you can indulge in refined Egyptian cuisine.",
                        "Enjoy a leisurely afternoon at your own pace, whether exploring more of Cairo or relaxing at your hotel.",
                        "Accommodation: Cairo."
                    ],
                    ar: [
                        "ابدأ يومك بفطور بوفيه فاخر في فندقك، مُعدًا النغمة لرحلة عبر كنوز القاهرة الثقافية والتاريخية.",
                        "ادخل إلى مستقبل علم المصريات بزيارة المتحف المصري الكبير (GEM)، أكبر متحف أثري في العالم مخصص لحضارة واحدة.",
                        "يقع بالقرب من أهرامات الجيزة، يعرض المتحف المصري الكبير مجموعة مذهلة من القطع الأثرية من التاريخ الغني لمصر، بما في ذلك تماثيل عملاقة، وآثار قديمة، ومعارض رائعة تجمع بين التكنولوجيا المتطورة والآثار الخالدة.",
                        "يوفر التصميم الحديث والعروض الغامرة للمتحف تجربة فريدة لا تُنسى.",
                        "بعد ذلك، اصعد إلى مسجد محمد علي الرخامي، المتواجد بمهابة atop قلعة صلاح الدين.",
                        "من هذه النقطة البارزة، استمتع بمناظر بانورامية شاملة لأفق القاهرة بينما تتعرف على التاريخ الغني لهذا الرمز لقوة وإيمان مصر.",
                        "استمر في نزهة عبر بازار خان الخليلي الصاخب، متاهة نابضة بالحياة من التوابل الغريبة، والبضائع المصنوعة يدويًا، والكنوز الفريدة من نوعها.",
                        "يقدم هذا السوق النابض بالحياة الفرصة المثالية للعثور على هدايا تذكارية فريدة والانغماس في الروح الحيوية للثقافة المحلية في القاهرة.",
                        "توقف لتناول الغداء في مطعم محلي راقٍ، حيث يمكنك الاستمتاع بالمأكولات المصرية المكررة.",
                        "استمتع بظهيرة من الاسترخاء على طريقتك، سواء باستكشاف المزيد من القاهرة أو الاسترخاء في فندقك.",
                        "الإقامة: القاهرة."
                    ]
                }
            },
            {
                day: 4,
                title: {
                    es: "Un Día para Explorar o Relajarse",
                    en: "A Day to Explore or Relax",
                    ar: "يوم للاستكشاف أو الاسترخاء"
                },
                activities: {
                    es: [
                        "Comience su día con un delicioso desayuno bufé en su hotel, seguido de un día libre para adaptar su experiencia en El Cairo a sus intereses personales.",
                        "Elija entre una variedad de experiencias opcionales para enriquecer aún más su viaje.",
                        "Embárquese en una excursión a Menfis, la antigua capital de Egipto, donde notables artefactos y monumentos revelan la grandeza de las primeras dinastías de Egipto.",
                        "Alternativamente, sumérjase en la rica historia del Cairo Copto con una visita a la Iglesia Colgante, un hito reverenciado que destaca el diverso patrimonio cultural de la ciudad.",
                        "Para aquellos que prefieren un ritmo más relajado, relájese en su hotel de lujo, aprovechando sus instalaciones de bienestar para un día de relajación.",
                        "O, disfrute de una experiencia tranquila en el Nilo con un paseo en faluca privada, donde puede disfrutar de la serena belleza del río, sumergiéndose en los paisajes atemporales de Egipto.",
                        "Alojamiento en El Cairo."
                    ],
                    en: [
                        "Start your day with a delicious buffet breakfast at your hotel, followed by a free day to tailor your experience in Cairo to your personal interests.",
                        "Choose from a variety of optional experiences to further enrich your journey.",
                        "Embark on an excursion to Memphis, the ancient capital of Egypt, where remarkable artifacts and monuments reveal the grandeur of Egypt's early dynasties.",
                        "Alternatively, delve into the rich history of Coptic Cairo with a visit to the Hanging Church, a revered landmark that highlights the city's diverse cultural heritage.",
                        "For those who prefer a more leisurely pace, unwind at your luxury hotel, taking advantage of its wellness facilities for a day of relaxation.",
                        "Or, enjoy a tranquil experience on the Nile with a private felucca ride, where you can bask in the serene beauty of the river, immersing yourself in the timeless landscapes of Egypt.",
                        "Accommodation in Cairo."
                    ],
                    ar: [
                        "ابدأ يومك بفطور بوفيه لذيذ في فندقك، يليه يوم حر لتخصيص تجربتك في القاهرة وفقًا لاهتماماتك الشخصية.",
                        "اختر من بين مجموعة متنوعة من التجارب الاختيارية لإثراء رحلتك أكثر.",
                        "انطلق في رحلة إلى ممفيس، العاصمة القديمة لمصر، حيث تكشف القطع الأثرية والمعالم الرائعة عن عظمة الأسرات المبكرة لمصر.",
                        "بدلاً من ذلك، اغوص في التاريخ الغني للقاهرة القبطية بزيارة إلى الكنيسة المعلقة، معلم موقر يسلط الضوء على التراث الثقافي المتنوع للمدينة.",
                        "لأولئك الذين يفضلون وتيرة أكثر استرخاءً، استرخِ في فندقك الفاخر، مستفيدًا من مرافقه الصحية ليوم من الاسترخاء.",
                        "أو، استمتع بتجربة هادئة على النيل برحلة فلوكا خاصة، حيث يمكنك التمتع بالجمال الهادئ للنهر، منغمسًا في المناظر الطبيعية الخالدة لمصر.",
                        "الإقامة في القاهرة."
                    ]
                }
            },
            {
                day: 5,
                title: {
                    es: "Despedida de El Cairo",
                    en: "Farewell to Cairo",
                    ar: "وداع القاهرة"
                },
                activities: {
                    es: [
                        "Después de un delicioso desayuno bufé en su hotel, será trasladado en un vehículo privado al Aeropuerto Internacional de El Cairo.",
                        "Nuestro equipo se asegurará de que su partida sea tan fluida como su llegada, asistiéndole en cada paso del camino para garantizar un viaje a casa sin complicaciones.",
                        "Fin de nuestros servicios."
                    ],
                    en: [
                        "After a delicious buffet breakfast at your hotel, you will be transferred in a private vehicle to Cairo International Airport.",
                        "Our team will ensure that your departure is as smooth as your arrival, assisting you every step of the way to guarantee a hassle-free journey home.",
                        "End of our services."
                    ],
                    ar: [
                        "بعد إفطار بوفيه لذيذ في فندقك، سيتم نقلك بسيارة خاصة إلى مطار القاهرة الدولي.",
                        "سيتأكد فريقنا من أن مغادرتك سلسة مثل وصولك، مساعدتك في كل خطوة على الطريق لضمان رحلة عودة خالية من المتاعب.",
                        "نهاية خدماتنا."
                    ]
                }
            }
        ],
        servicesIncluded: {
            es: [
                "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para trámites de visa y aduanas.",
                "4 noches de alojamiento en El Cairo con desayuno.",
                "2 almuerzos gourmet en restaurantes locales seleccionados.",
                "Traslados privados de lujo entre todos los destinos y aeropuertos.",
                "Visitas según se menciona en el itinerario."
            ],
            en: [
                "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
                "4 nights of accommodation in Cairo with breakfast.",
                "2 gourmet lunches at selected local restaurants.",
                "Private luxury transfers between all destinations and airports.",
                "Visits as mentioned in the itinerary."
            ],
            ar: [
                "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
                "4 ليالٍ من الإقامة في القاهرة مع الإفطار.",
                "غداءان فاخران في مطاعم محلية مختارة.",
                "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.",
                "الزيارات كما هو مذكور في البرنامج."
            ]
        },
        servicesExcluded: {
            es: [
                "Vuelos internacionales.",
                "Visado 25 USD (pagadero a la llegada).",
                "Propinas para conductores y personal del hotel: 25 USD por persona.",
                "Tarifas de entrada al interior de las Pirámides.",
                "Tours opcionales y cualquier visita no mencionada en el programa.",
                "Bebidas y gastos personales."
            ],
            en: [
                "International flights.",
                "Visa 25 USD (payable upon arrival).",
                "Tips for drivers and hotel staff 25 $ per person.",
                "Entrance fees to the interiors of the Pyramids.",
                "Optional tours and any visits not mentioned in the program.",
                "Beverages and personal expenses."
            ],
            ar: [
                "الرحلات الدولية.",
                "التأشيرة 25 دولارًا أمريكيًا (قابلة للدفع عند الوصول).",
                "الإكراميات للسائقين وطاقم الفندق: 25 دولارًا أمريكيًا للشخص الواحد.",
                "رسوم الدخول إلى داخل الأهرامات.",
                "الجولات الاختيارية وأي زيارات غير مذكورة في البرنامج.",
                "المشروبات والمصروفات الشخصية."
            ]
        },
        importantNotes: {
            es: [
                "Salida diaria garantizada con un mínimo de 2 personas.",
                "Hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.",
                "Precios finales pueden variar debido a cambios en tarifas, impuestos y/o cargos por combustible.",
                "El orden de visitas puede modificarse sin afectar el contenido del viaje.",
                "Habitaciones triples en cruceros y varios hoteles son habitaciones dobles con una cama adicional."
            ],
            en: [
                "Guaranteed daily departure with a minimum of 2 people.",
                "Hotels and cruces may be substituted with others of the same category with prior notice to the client.",
                "Final prices may vary due to changes in rates, taxes, and/or fuel charges.",
                "The order of visits may be modified without affecting the trip content.",
                "Triple rooms in cruises and several hotels are double rooms with an additional bed."
            ],
            ar: [
                "انطلاق يومي مضمون بحد أدنى شخصين.",
                "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة بعد إخطار العميل مسبقًا.",
                "قد تختلف الأسعار النهائية بسبب تغييرات في الأسعار أو الضرائب أو رسوم الوقود.",
                "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.",
                "الغرف الثلاثية في الرحلات البحرية وبعض الفنادق هي غرف مزدوجة مع سرير إضافي."
            ]
        },
        seasonalPricing: {
            summer: {
                gold: { single: 730, double: 580, triple: 540 },
                diamond: { single: 1140, double: 820, triple: 780 }
            },
            winter: {
                gold: { single: 830, double: 640, triple: 600 },
                diamond: { single: 1240, double: 880, triple: 840 }
            }
        }
    },




    {
        id: 3,
        name: {
            es: "El Viaje de los Faraones",
            en: "Journey of the Pharaohs",
            ar: "رحلة الفراعنة"
        },
        icon: "🚂",
        duration: { days: 8, nights: 7 },
        priceFrom: 915,
        categories: ["Cultural", "Historical"],
        startCity: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' },
        cruiseNights: 3,
        runDays: {
            es: "Lunes, Martes, Jueves, Sábado, Domingo",
            en: "Monday, Tuesday, Thursday, Saturday, Sunday",
            ar: "الاثنين، الثلاثاء، الخميس، السبت، الأحد"
        },
        cruiseRunDays: {
            es: "Los cruceros desde Asuán salen cada miércoles y viernes.",
            en: "Cruises from Aswan depart every Wednesday and Friday.",
            ar: "تغادر الرحلات البحرية من أسوان كل أربعاء وجمعة."
        },
        briefDescription: {
            es: "Un viaje inolvidable de 8 días siguiendo los pasos de los faraones. Explora las Pirámides de Guiza, viaja en tren nocturno VIP a Asuán, y navega por el Nilo descubriendo templos majestuosos hasta Lúxor.",
            en: "An unforgettable 8-day journey following in the footsteps of the pharaohs. Explore the Giza Pyramids, travel by VIP overnight train to Aswan, and sail the Nile discovering majestic temples up to Luxor.",
            ar: "رحلة لا تنسى لمدة 8 أيام على خطى الفراعنة. استكشف أهرامات الجيزة، وسافر بالقطار الليلي لكبار الشخصيات إلى أسوان، وأبحر في النيل لاكتشاف المعابد المهيبة حتى الأقصر."
        },
        generalDescription: {
            es: "Embárquese en un inolvidable viaje de 8 días por Egipto, siguiendo los pasos de los faraones mientras explora icónicas maravillas antiguas y la belleza escénica del Nilo. Comience en El Cairo con una cálida bienvenida y maravíllese ante las eternas Pirámides de Giza y la misteriosa Esfinge. Aborde el tren nocturno VIP hacia Asuán y comience su aventura por el Nilo, visitando los majestuosos templos de Kom Ombo y Edfu, y opcionalmente Abu Simbel. Continúe hacia Luxor para explorar los impresionantes templos de Luxor y Karnak, y descubra los misterios del Valle de los Reyes y el elegante Templo de Hatshepsut (opcional). Concluya su viaje regresando a El Cairo para un día libre donde podrá explorar según sus intereses, incluyendo el Gran Museo Egipcio (GEM) y el vibrante Bazar de Khan el-Khalili. Experimente la perfecta combinación de historia, cultura y confort moderno en esta extraordinaria travesía.",
            en: "Embark on an unforgettable 8-day journey through Egypt, following in the footsteps of the pharaohs as you explore iconic ancient wonders and the scenic beauty of the Nile. Start in Cairo with a warm welcome and marvel at the timeless Pyramids of Giza and the mysterious Sphinx. Board the VIP overnight train to Aswan and begin your Nile adventure, visiting the majestic temples of Kom Ombo and Edfu, with an optional trip to Abu Simbel. Continue to Luxor to explore the stunning Luxor and Karnak temples, and discover the mysteries of the Valley of the Kings and the elegant Temple of Hatshepsut (optional). Conclude your journey by returning to Cairo for a free day to explore according to your interests, including the Grand Egyptian Museum (GEM) and the vibrant Khan el-Khalili Bazaar. Experience the perfect blend of history, culture, and modern comfort in this extraordinary journey.",
            ar: "انطلق في رحلة لا تنسى لمدة 8 أيام عبر مصر، متبعًا خطى الفراعنة بينما تستكشف العجائب القديمة الشهيرة وجمال النيل الخلاب. ابدأ في القاهرة بترحيب حار وتأمل في أهرامات الجيزة الخالدة وأبو الهول الغامض. استقل القطار الليلي لكبار الشخصيات إلى أسوان وابدأ مغامرتك في النيل، بزيارة معابد كوم أمبو وإدفو المهيبة، مع رحلة اختيارية إلى أبو سمبل. استمر إلى الأقصر لاستكشاف معبدي الأقصر والكرنك المذهلين، واكتشف أسرار وادي الملوك ومعبد حتشبسوت الأنيق (اختياري). اختتم رحلتك بالعودة إلى القاهرة ليوم حر لاستكشاف ما يثير اهتمامك، بما في ذلك المتحف المصري الكبير (GEM) وبازار خان الخليلي النابض بالحياة. جرب المزيج المثالي من التاريخ والثقافة والراحة الحديثة في هذه الرحلة الاستثنائية."
        },
        accommodations: {
            gold: [
                { city: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' }, hotel: { es: 'Amarante Pyramids o similar', en: 'Amarante Pyramids or similar', ar: 'أمارانت بيراميدز أو ما يعادله' } },
                { city: { es: 'Crucero por el Nilo', en: 'Nile Cruise', ar: 'رحلة نيلية' }, hotel: { es: 'Crucero por el Nilo Hapi V o similar', en: 'Hapi V Nile Cruise or similar', ar: 'كروز حابي 5 أو ما يعادله' } }
            ],
            diamond: []
        },
        itinerary: [
            {
                day: 1,
                title: {
                    es: "Llegada a El Cairo – Una Gran Bienvenida",
                    en: "Arrival in Cairo – A Grand Welcome",
                    ar: "الوصول إلى القاهرة – ترحيب حار"
                },
                activities: {
                    es: [
                        "A su llegada al Aeropuerto Internacional de El Cairo, recibirá una cálida bienvenida de nuestro equipo dedicado, que lo asistirá con los trámites de visa y aduanas para garantizar una llegada sin problemas y cómoda.",
                        "Un vehículo privado de lujo estará listo para trasladarlo a su hotel, donde podrá relajarse y instalarse en su habitación elegantemente equipada.",
                        "Tómese este tiempo para relajarse después de su viaje y saborear su primera noche en El Cairo, una ciudad impregnada de historia y maravilla eterna."
                    ],
                    en: [
                        "Upon your arrival at Cairo International Airport, you'll receive a warm welcome from our dedicated team, who will assist you with visa and customs procedures to ensure a seamless and comfortable arrival.",
                        "A luxury private vehicle will be ready to transfer you to your hotel, where you can relax and settle into your elegantly appointed room.",
                        "Take this time to unwind after your journey and savor your first night in Cairo, a city steeped in history and timeless wonder."
                    ],
                    ar: [
                        "عند وصولك إلى مطار القاهرة الدولي، ستتلقى ترحيبًا حارًا من فريقنا المخصص، الذي سيساعدك في إجراءات التأشيرة والجمارك لضمان وصول سلس ومريح.",
                        "ستكون مركبة فاخرة خاصة جاهزة لنقلك إلى فندقك، حيث يمكنك الاسترخاء والاستقرار في غرفتك الأنيقة.",
                        "استغل هذا الوقت للاسترخاء بعد رحلتك وتذوق ليلتك الأولى في القاهرة، مدينة غارقة في التاريخ والعجائب الخالدة."
                    ]
                }
            },
            {
                day: 2,
                title: {
                    es: "El Cairo – Desde las Pirámides Eternas hasta el Viaje al Sur a Asuán",
                    en: "Cairo – From the Eternal Pyramids to the Journey South to Aswan",
                    ar: "القاهرة – من الأهرامات الخالدة إلى الرحلة جنوبًا إلى أسوان"
                },
                activities: {
                    es: [
                        "Comience el día con un delicioso desayuno bufé en su hotel, preparándose para una exploración extraordinaria de los sitios icónicos del antiguo Egipto.",
                        "Realice una visita privada de las legendarias Pirámides de Giza: Keops, Kefrén y Micerinos, maravillas de la ingeniería que han cautivado al mundo durante milenios.",
                        "Con su guía personal, descubra los secretos y la historia detrás de estas estructuras monumentales y experimente la grandeza de la última Maravilla del Mundo Antiguo que aún se conserva.",
                        "A continuación, visite la enigmática Esfinge, con su cuerpo de león y rostro humano, un símbolo de fuerza y sabiduría.",
                        "Continúe al Templo del Valle de Kefrén, donde aprenderá sobre los rituales funerarios y las prácticas religiosas que definieron el antiguo Egipto.",
                        "Al final de la visita, trasládese a la estación de tren de Giza, donde abordará el tren nocturno con destino a Asuán, marcando el comienzo de un nuevo capítulo en su aventura por Egipto.",
                        "Relájese y disfrute del paisaje mientras viaja hacia el sur.",
                        "Pernocte a bordo del tren a Asuán."
                    ],
                    en: [
                        "Begin the day with a delicious buffet breakfast at your hotel, preparing for an extraordinary exploration of the iconic sites of ancient Egypt.",
                        "Take a private tour of the legendary Pyramids of Giza —Khufu, Khafre, and Menkaure—, marvels of engineering that have captivated the world for millennia.",
                        "With your personal guide, discover the secrets and history behind these monumental structures and experience the greatness of the last Wonder of the Ancient World that is still preserved.",
                        "Next, visit the enigmatic Sphinx, with its lion's body and human face, a symbol of strength and wisdom.",
                        "Continue to the Valley Temple of Khafre, where you will learn about the funerary rituals and religious practices that defined ancient Egypt.",
                        "At the end of the visit, transfer to the Giza train station, where you will board the overnight train bound for Aswan, marking the beginning of a new chapter in your adventure through Egypt.",
                        "Relax and enjoy the scenery as you travel south.",
                        "Overnight on board the train to Aswan."
                    ],
                    ar: [
                        "ابدأ اليوم بفطور بوفيه لذيذ في فندقك، مستعدًا لاكتشاف استثنائي لمواقع مصر القديمة الأيقونية.",
                        "قم بجولة خاصة في أهرامات الجيزة الأسطورية: خوفو، خفرع، ومنقرع، عجائب هندسية أسرت العالم لآلاف السنين.",
                        "مع مرشدك الشخصي، اكتشف الأسرار والتاريخ وراء هذه الهياكل الضخمة واختبر عظمة آخر عجائب الدنيا السبع التي لا تزال محفوظة.",
                        "بعد ذلك، قم بزيارة أبو الهول الغامض، بجسم الأسد ووجه الإنسان، رمز القوة والحكمة.",
                        "استمر إلى معبد الوادي لخفرع، حيث ستتعرف على الطقوس الجنائزية والممارسات الدينية التي حددت مصر القديمة.",
                        "في نهاية الزيارة، انتقل إلى محطة قطار الجيزة، حيث ستصعد على متن القطار الليلي المتجه إلى أسوان، معلناً بداية فصل جديد في مغامرتك عبر مصر.",
                        "استرخِ واستمتع بالمناظر الطبيعية أثناء سفرك جنوبًا.",
                        "المبيت على متن القطار إلى أسوان."
                    ]
                }
            },
            {
                day: 3,
                title: {
                    es: "Asuán – El Comienzo de la Aventura en el Nilo",
                    en: "Aswan – The Beginning of the Nile Adventure",
                    ar: "أسوان – بداية المغامرة على النيل"
                },
                activities: {
                    es: [
                        "Después de pasar la noche a bordo del tren nocturno, comience el día con el desayuno servido en el tren mientras se acerca a la cálida tierra de Nubia.",
                        "A su llegada a la estación de Asuán, será recibido y trasladado directamente a su crucero por el Nilo.",
                        "Instálese en su cabina y disfrute de un delicioso almuerzo a bordo mientras comienza su viaje a lo largo del río legendario.",
                        "Por la tarde, visite la impresionante Presa Alta de Asuán, una maravilla de la ingeniería moderna que transformó la economía de Egipto y cambió el curso del Nilo.",
                        "Relájese con un tranquilo paseo en faluca, un velero tradicional egipcio, alrededor de la Isla Elefantina, donde podrá admirar las vistas del Mausoleo de Aga Khan y el frondoso Jardín Botánico.",
                        "Para aquellos que buscan una experiencia cultural más profunda, hay una visita opcional a una aldea nubia, que ofrece una perspectiva única de la vida local y el arte tradicional.",
                        "Pernocte a bordo del crucero."
                    ],
                    en: [
                        "After spending the night on board the overnight train, begin the day with breakfast served on the train as you approach the warm land of Nubia.",
                        "Upon arrival at Aswan station, you will be met and transferred directly to your Nile cruise.",
                        "Settle into your cabin and enjoy a delicious lunch on board as you begin your journey along the legendary river.",
                        "In the afternoon, visit the impressive High Dam of Aswan, a marvel of modern engineering that transformed Egypt's economy and changed the course of the Nile.",
                        "Relax with a peaceful felucca ride, a traditional Egyptian sailboat, around Elephantine Island, where you can admire views of the Mausoleum of Aga Khan and the lush Botanical Garden.",
                        "For those seeking a deeper cultural experience, there is an optional visit to a Nubian village, offering a unique insight into local life and traditional art.",
                        "Overnight on board the cruise."
                    ],
                    ar: [
                        "بعد قضاء الليل على متن القطار الليلي، ابدأ اليوم بوجبة إفطار تقدم على متن القطار بينما تقترب من أرض النوبة الدافئة.",
                        "عند الوصول إلى محطة أسوان، سيتم استقبالك ونقلك مباشرة إلى رحلتك النيلية.",
                        "استقر في كابينتك واستمتع بغداء لذيذ على متن السفينة بينما تبدأ رحلتك على طول النهر الأسطوري.",
                        "في فترة الظهيرة، قم بزيارة السد العالي بأسوان المثير للإعجاب، وهو معجزة هندسية حديثة حولت اقتصاد مصر وغيرت مسار النيل.",
                        "استرخِ برحلة فلوكا هادئة، مركب شراعي مصري تقليدي، حول جزيرة إلفنتين، حيث يمكنك الإعجاب بمناظر ضريح آغا خان والحديقة النباتية الخضراء.",
                        "لأولئك الذين يبحثون عن تجربة ثقافية أعمق، هناك زيارة اختيارية لقرية نوبية، تقدم نظرة فريدة على الحياة المحلية والفن التقليدي.",
                        "المبيت على متن الرحلة النيلية."
                    ]
                }
            },
            {
                day: 4,
                title: {
                    es: "Asuán a Kom Ombo – Abu Simbel y Templos Icónicos",
                    en: "Aswan to Kom Ombo – Abu Simbel and Iconic Temples",
                    ar: "من أسوان إلى كوم أمبو – أبو سمبل والمعابد الأيقونية"
                },
                activities: {
                    es: [
                        "Disfrute de pensión completa a bordo del crucero.",
                        "Por la mañana, tiene la opción de embarcarse en una excursión inolvidable a los majestuosos Templos de Abu Simbel, uno de los sitios más impresionantes de Egipto.",
                        "Estos templos monumentales, tallados directamente en la roca por orden de Ramsés II, fueron dedicados al faraón y a su amada reina, Nefertari.",
                        "Pararse frente a estas grandiosas estatuas es una experiencia que captura el poder y la devoción del antiguo Egipto.",
                        "Regrese al crucero para almorzar mientras navega hacia Kom Ombo, deslizándose por las tranquilas aguas del Nilo.",
                        "Por la tarde, visite el notable Templo de Kom Ombo, una estructura única compartida por dos dioses: Sobek, el dios cocodrilo, y Haroeris, el dios halcón.",
                        "Camine a través de sus santuarios duales y aprenda sobre las leyendas y rituales asociados con cada deidad.",
                        "Continúe navegando a Edfu, donde se relajará con una cena gourmet a bordo, disfrutando de la serenidad del Nilo al caer la tarde.",
                        "Pernocte en el crucero."
                    ],
                    en: [
                        "Enjoy full board onboard the cruise.",
                        "In the morning, you have the option to embark on an unforgettable excursion to the majestic Temples of Abu Simbel, one of Egypt's most awe-inspiring sites.",
                        "These monumental temples, carved directly into the rock by order of Ramses II, were dedicated to the pharaoh and his beloved queen, Nefertari.",
                        "Standing before these grand statues is an experience that captures the power and devotion of ancient Egypt.",
                        "Return to the cruise for lunch as you sail toward Kom Ombo, drifting along the tranquil waters of the Nile.",
                        "In the afternoon, visit the remarkable Temple of Kom Ombo, a unique structure shared by two gods: Sobek, the crocodile god, and Haroeris, the falcon god.",
                        "Walk through its dual sanctuaries and learn about the legends and rituals associated with each deity.",
                        "Continue sailing to Edfu, where you'll unwind with a gourmet dinner onboard, enjoying the serenity of the Nile as evening falls.",
                        "Overnight on the cruise."
                    ],
                    ar: [
                        "استمتع بالإقامة كاملة على متن الرحلة النيلية.",
                        "في الصباح، لديك خيار الانطلاق في رحلة لا تُنسى إلى معابد أبو سمبل المهيبة، أحد أكثر المواقع إثارة للإعجاب في مصر.",
                        "هذه المعابد الضخمة، المنحوتة مباشرة في الصخر بأمر من رمسيس الثاني، كُرست للفرعون وملكته المحبوبة، نفرتاري.",
                        "الوقوف أمام هذه التماثيل العظيمة هو تجربة تلتقط قوة وتفاني مصر القديمة.",
                        "عد إلى الرحلة النيلية لتناول الغداء بينما تبحر نحو كوم أمبو، منزلقة على طول مياه النيل الهادئة.",
                        "في فترة الظهيرة، قم بزيارة معبد كوم أمبو الرائع، وهو هيكل فريد يشترك فيه إلهان: سوبek، إله التمساح، وحروريس، إله الصقر.",
                        "امشِ عبر ملاذاته المزدوجة وتعلم عن الأساطير والطقوس المرتبطة بكل إله.",
                        "استمر في الإبحار إلى إدفو، حيث ستسترخي مع عشاء فاخر على متن السفينة، مستمتعًا بهدوء النيل مع حلول المساء.",
                        "المبيت على متن الرحلة النيلية."
                    ]
                }
            },
            {
                day: 5,
                title: {
                    es: "Edfu a Luxor – Templos y Navegación",
                    en: "Edfu to Luxor – Temples and Sailing",
                    ar: "من إدفو إلى الأقصر – المعابد والإبحار"
                },
                activities: {
                    es: [
                        "Comience su día con una visita al magnífico Templo de Horus en Edfu, uno de los templos mejor conservados de Egipto.",
                        "Esta impresionante estructura, con sus altísimos muros y relieves intrincadamente tallados, muestra la grandeza de la arquitectura del antiguo Egipto.",
                        "Mientras su guía comparte la historia y el simbolismo de este sitio sagrado, obtendrá una apreciación más profunda de su papel en el rico patrimonio de Egipto.",
                        "Continúe su viaje a lo largo del Nilo, navegando hacia Luxor, la antigua ciudad de Tebas.",
                        "A su llegada, dependiendo del tiempo, tendrá la oportunidad de explorar el impresionante Templo de Luxor, ubicado en el corazón del centro espiritual y político del antiguo Egipto.",
                        "Este gran monumento, con sus pilares colosales y relieves detallados, se erige como un testimonio del legado de los faraones.",
                        "Disfrute de una cena gourmet a bordo mientras se relaja en la velada, rodeado por la belleza eterna del Nilo.",
                        "Pernocte en el crucero."
                    ],
                    en: [
                        "Begin your day with a visit to the magnificent Temple of Horus in Edfu, one of Egypt's best-preserved temples.",
                        "This impressive structure, with its towering walls and intricately carved reliefs, showcases the grandeur of ancient Egyptian architecture.",
                        "As your guide shares the history and symbolism of this sacred site, you'll gain a deeper appreciation for its role in Egypt's rich heritage.",
                        "Continue your journey along the Nile, sailing towards Luxor, the ancient city of Thebes.",
                        "Upon arrival, depending on the time, you'll have the opportunity to explore the awe-inspiring Luxor Temple, located at the heart of ancient Egypt's spiritual and political center.",
                        "This grand monument, with its colossal pillars and detailed reliefs, stands as a testament to the legacy of the pharaohs.",
                        "Enjoy a gourmet dinner onboard as you relax into the evening, surrounded by the timeless beauty of the Nile.",
                        "Overnight on the cruise."
                    ],
                    ar: [
                        "ابدأ يومك بزيارة إلى معبد حورس المهيب في إدفو، أحد أفضل المعابد حفظًا في مصر.",
                        "هذا الهيكل المثير للإعجاب، بجدرانه الشاهقة ونقوشه المنحوتة بدقة، يعرض عظمة العمارة المصرية القديمة.",
                        "بينما يشارك مرشدك تاريخ ورمزية هذا الموقع المقدس، ستحصل على تقدير أعمق لدوره في التراث الغني لمصر.",
                        "واصل رحلتك على طول النيل، مبحرًا نحو الأقصر، مدينة طيبة القديمة.",
                        "عند الوصول، حسب التوقيت، ستتاح لك الفرصة لاستكشاف معبد الأقصر المذهل، الواقع في قلب المركز الروحي والسياسي لمصر القديمة.",
                        "هذا النصب التذكاري العظيم، بأعمدته العملاقة ونقوشه المفصلة، يقف شهادة على إرث الفراعنة.",
                        "استمتع بعشاء فاخر على متن السفينة بينما تسترخي في المساء، محاطًا بجمال النيل الخالد.",
                        "المبيت على متن الرحلة النيلية."
                    ]
                }
            },
            {
                day: 6,
                title: {
                    es: "Luxor a El Cairo – Tesoros de Tebas y Regreso a la Capital",
                    en: "Luxor to Cairo – Treasures of Thebes and Return to the Capital",
                    ar: "من الأقصر إلى القاهرة – كنوز طيبة والعودة إلى العاصمة"
                },
                activities: {
                    es: [
                        "Comience el día con un desayuno bufé a bordo del crucero antes de desembarcar.",
                        "Hoy explorará los impresionantes Templos de Karnak, un vasto complejo y uno de los monumentos más majestuosos del antiguo Egipto.",
                        "Construido durante más de 2.000 años, este asombroso sitio revela la brillantez arquitectónica y la devoción espiritual de los faraones.",
                        "Camine a través de sus grandes salones y columnas elevadas, y maravíllese con los intrincados relieves que adornan este espacio sagrado.",
                        "Para aquellos interesados, una excursión opcional al Valle de los Reyes ofrece una experiencia única, con acceso a algunas de las tumbas más importantes del Reino Nuevo.",
                        "Explore los lugares de descanso final de los grandes faraones de Egipto, incluida la opción de visitar la famosa tumba de Tutankamón (entrada opcional).",
                        "Continúe con una visita al impresionante Templo de Hatshepsut, una obra maestra arquitectónica construida en terrazas contra los acantilados, en honor a la única faraona de Egipto.",
                        "Termine su recorrido en los imponentes Colosos de Memnón, dos estatuas gigantescas que han custodiado la necrópolis tebana durante más de 3.000 años.",
                        "Después de un día inmerso en las antiguas maravillas, trasládese a la estación de tren de Luxor, donde abordará el tren nocturno con destino a El Cairo.",
                        "Relájese y disfrute del viaje mientras se dirige al norte a través del fértil Valle del Nilo."
                    ],
                    en: [
                        "Begin the day with a buffet breakfast on board the cruise before disembarking.",
                        "Today you will explore the impressive Temples of Karnak, a vast complex and one of the most majestic monuments of ancient Egypt.",
                        "Built over more than 2,000 years, this astonishing site reveals the architectural brilliance and spiritual devotion of the pharaohs.",
                        "Walk through its great halls and towering columns, and marvel at the intricate reliefs that adorn this sacred space.",
                        "For those interested, an optional excursion to the Valley of the Kings offers a unique experience, with access to some of the most important tombs of the New Kingdom.",
                        "Explore the final resting places of the great pharaohs of Egypt, including the option to visit the famous tomb of Tutankhamun (optional entrance).",
                        "Continue with a visit to the impressive Temple of Hatshepsut, an architectural masterpiece built in terraces against the cliffs, in honor of the only female pharaoh of Egypt.",
                        "End your tour at the imposing Colossi of Memnon, two gigantic statues that have guarded the Theban necropolis for more than 3,000 years.",
                        "After a day immersed in ancient wonders, transfer to the Luxor train station, where you will board the overnight train bound for Cairo.",
                        "Relax and enjoy the journey as you head north through the fertile Nile Valley."
                    ],
                    ar: [
                        "ابدأ اليوم بفطور بوفيه على متن الرحلة النيلية قبل النزول.",
                        "اليوم ستستكشف معابد الكرنك المذهلة، مجمع شاسع وأحد أروع آثار مصر القديمة.",
                        "بني على مدى أكثر من 2000 عام، يكشف هذا الموقع المدهش عن براعة العمارة والتفاني الروحي للفراعنة.",
                        "امشِ عبر قاعاته العظيمة وأعمدته الشاهقة، وانبهر بالنقوش المعقدة التي تزين هذا الفضاء المقدس.",
                        "للمهتمين، تقدم رحلة اختيارية إلى وادي الملوك تجربة فريدة، مع دخول إلى بعض أهم مقابر الدولة الحديثة.",
                        "استكشف أماكن الراحة الأخيرة لفراعنة مصر العظماء، بما في ذلك خيار زيارة مقبرة توت عنخ آمون الشهيرة (دخول اختياري).",
                        "استمر بزيارة إلى معبد حتشبسوت المذهل، تحفة معمارية بنيت بمدرجات against المنحدرات، تكريمًا لفرعون مصر الأنثى الوحيدة.",
                        "اختتم جولتك عند تمثالي ممنون المهيبين، تمثالان عملاقان يحرسان مقبرة طيبة منذ أكثر من 3000 عام.",
                        "بعد يوم منغمس في عجائب القدماء، انتقل إلى محطة قطار الأقصر، حيث ستصعد على متن القطار الليلي المتجه إلى القاهرة.",
                        "استرخِ واستمتع بالرحلة بينما تتجه شمالاً عبر وادي النيل الخصيب."
                    ]
                }
            },
            {
                day: 7,
                title: {
                    es: "El Cairo – El Gran Museo Egipcio y los Encantos de la Ciudad",
                    en: "Cairo – The Grand Egyptian Museum and the City's Charms",
                    ar: "القاهرة – المتحف المصري الكبير وسحر المدينة"
                },
                activities: {
                    es: [
                        "Después de pasar la noche a bordo del tren, llegará por la mañana a la estación de Giza.",
                        "Disfrute del desayuno servido en el tren antes de comenzar un día dedicado a explorar El Cairo según sus preferencias.",
                        "Hoy tendrá la libertad de elegir entre visitas opcionales adaptadas a sus intereses.",
                        "Uno de los más destacados es el Gran Museo Egipcio (GEM), donde los tesoros de Tutankamón y otras obras maestras revelan el esplendor del antiguo Egipto.",
                        "Continúe a la Mezquita de Alabastro en la Ciudadela de Saladino, una obra maestra arquitectónica que ofrece vistas panorámicas del paisaje histórico de El Cairo.",
                        "Para sumergirse en la vibrante cultura de la ciudad, explore el bullicioso bazar Khan el-Khalili, uno de los mercados más antiguos y emblemáticos, donde puede encontrar artesanías, especias y recuerdos únicos mientras disfruta del ambiente animado.",
                        "Tome un descanso para un almuerzo gourmet en un restaurante de primera clase, saboreando los sabores contemporáneos de Egipto antes de regresar a su hotel para descansar.",
                        "Alojamiento en El Cairo."
                    ],
                    en: [
                        "After spending the night on board the train, you will arrive in the morning at Giza station.",
                        "Enjoy breakfast served on the train before beginning a day dedicated to exploring Cairo according to your preferences.",
                        "Today you will have the freedom to choose from optional visits tailored to your interests.",
                        "One of the most outstanding is the Grand Egyptian Museum (GEM), where the treasures of Tutankhamun and other masterpieces reveal the splendor of ancient Egypt.",
                        "Continue to the Alabaster Mosque in the Citadel of Saladin, an architectural masterpiece that offers panoramic views of Cairo's historic landscape.",
                        "To immerse yourself in the city's vibrant culture, explore the bustling Khan el-Khalili bazaar, one of the oldest and most iconic markets, where you can find handicrafts, spices, and unique souvenirs while enjoying the lively atmosphere.",
                        "Take a break for a gourmet lunch in a top-class restaurant, savoring the contemporary flavors of Egypt before returning to your hotel to rest.",
                        "Accommodation in Cairo."
                    ],
                    ar: [
                        "بعد قضاء الليل على متن القطار، ستصل في الصباح إلى محطة الجيزة.",
                        "استمتع بوجبة الإفطار المقدمة على متن القطار قبل أن تبدأ يومًا مخصصًا لاستكشاف القاهرة وفقًا لتفضيلاتك.",
                        "اليوم سيكون لديك حرية الاختيار من بين زيارات اختيارية مصممة وفقًا لاهتماماتك.",
                        "أحد أبرزها المتحف المصري الكبير (GEM)، حيث تكشف كنوز توت عنخ آمون وروائع أخرى عن روعة مصر القديمة.",
                        "استمر إلى مسجد محمد علي الرخامي في قلعة صلاح الدين، تحفة معمارية تقدم إطلالات بانورامية على المشهد التاريخي للقاهرة.",
                        "للانغماس في الثقافة النابضة بالحياة للمدينة، استكشف بازار خان الخليلي الصاخب، أحد أقدم وأشهر الأسواق، حيث يمكنك العثور على الحرف اليدوية والتوابل والتحف الفريدة mientras تستمتع بالأجواء النابضة بالحياة.",
                        "خذ استراحة لتناول غداء فاخر في مطعم من الدرجة الأولى، متذوقًا النكهات المعاصرة لمصر قبل العودة إلى فندقك للراحة.",
                        "الإقامة في القاهرة."
                    ]
                }
            },
            {
                day: 8,
                title: {
                    es: "Despedida de El Cairo – Fin del Viaje",
                    en: "Farewell to Cairo – End of the Journey",
                    ar: "وداع القاهرة – نهاية الرحلة"
                },
                activities: {
                    es: [
                        "Disfrute de un desayuno bufé en su hotel mientras reflexiona sobre el increíble viaje a través de las maravillas eternas de Egipto.",
                        "Un vehículo privado lo trasladará al Aeropuerto Internacional de El Cairo para su salida, asegurando que sus momentos finales en Egipto sean tan fluidos y cómodos como su llegada.",
                        "Fin de nuestros servicios."
                    ],
                    en: [
                        "Enjoy a buffet breakfast at your hotel as you reflect on the incredible journey through Egypt's timeless wonders.",
                        "A private vehicle will transfer you to Cairo International Airport for your departure, ensuring that your final moments in Egypt are as seamless and comfortable as your arrival.",
                        "End of our services."
                    ],
                    ar: [
                        "استمتع بفطور بوفيه في فندقك بينما تتأمل في الرحلة المذهلة عبر عجائب مصر الخالدة.",
                        "ستنقلك مركبة خاصة إلى مطار القاهرة الدولي لمغادرتك، مما يضمن أن لحظاتك الأخيرة في مصر ستكون سلسة ومريحة مثل وصولك.",
                        "نهاية خدماتنا."
                    ]
                }
            }
        ],
        servicesIncluded: {
            es: [
                "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para trámites de visa y aduanas.",
                "Billetes de tren VIP con 2 noches de alojamiento en tren nocturno (El Cairo - Asuán y Luxor - El Cairo).",
                "2 noches de alojamiento en El Cairo con desayuno.",
                "3 noches en un crucero por el Nilo de 5 estrellas con pensión completa (bebidas no incluidas).",
                "Traslados privados de lujo entre todos los destinos y aeropuertos.",
                "Visitas según se menciona en el itinerario."
            ],
            en: [
                "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
                "VIP train tickets with 2 nights accommodation on overnight train (Cairo - Aswan and Luxor - Cairo).",
                "2 nights of accommodation in Cairo with breakfast.",
                "3 nights on a 5-star Nile cruise with full board (drinks not included).",
                "Private luxury transfers between all destinations and airports.",
                "Visits as mentioned in the itinerary."
            ],
            ar: [
                "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
                "تذاكر قطار VIP مع ليلتين في قطار ليلي (القاهرة - أسوان والأقصر - القاهرة).",
                "ليلتان في القاهرة مع الإفطار.",
                "3 ليالٍ في رحلة نيلية فاخرة 5 نجوم بنظام الإقامة الكاملة (المشروبات غير مشمولة).",
                "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.",
                "الزيارات كما هو مذكور في البرنامج."
            ]
        },

        servicesExcluded: {
            es: [
                "Vuelos internacionales.",
                "Visado 25 USD (pagadero a la llegada).",
                "Suplemento por vuelo doméstico (CAI/ASW - LXR/CAI): 250 USD por persona, incluye 2 noches adicionales de alojamiento en El Cairo.",
                "Propinas para conductores y personal del crucero: 50 USD por persona.",
                "Tarifas de entrada al interior de las Pirámides y la Tumba de Tutankamón.",
                "Tours opcionales y cualquier visita no mencionada en el programa.",
                "Bebidas y gastos personales."
            ],
            en: [
                "International flights.",
                "Visa 25 USD (payable upon arrival).",
                "Domestic flight supplement (CAI/ASW - LXR/CAI): 250 USD per person, includes 2 additional nights accommodation in Cairo.",
                "Tips for drivers and cruise staff: 50 USD per person.",
                "Entrance fees to the interiors of the Pyramids and the Tomb of Tutankhamun.",
                "Optional tours and any visits not mentioned in the program.",
                "Beverages and personal expenses."
            ],
            ar: [
                "الرحلات الدولية.",
                "التأشيرة 25 دولارًا أمريكيًا (قابلة للدفع عند الوصول).",
                "رسوم إضافية للرحلة الداخلية (CAI/ASW - LXR/CAI): 250 دولارًا أمريكيًا للشخص الواحد، تشمل ليلتين إضافيتين في القاهرة.",
                "الإكراميات للسائقين وطاقم الرحلة البحرية: 50 دولارًا أمريكيًا للشخص الواحد.",
                "رسوم الدخول إلى داخل الأهرامات ومقبرة توت عنخ آمون.",
                "الجولات الاختيارية وأي زيارات غير مذكورة في البرنامج.",
                "المشروبات والمصروفات الشخصية."
            ]
        },
        importantNotes: {
            es: ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.", "Los precios finales pueden variar debido a cambios en tarifas, impuestos o cargos por combustible.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Las habitaciones triples en cruceros y varios hoteles son habitaciones dobles con una cama adicional.", "Los cruceros desde Luxor salen todos los sábados y lunes."],
            en: ["Guaranteed daily departure with a minimum of 2 people.", "Hotels and cruises may be substituted with others of the same category with prior notice to the client.", "Final prices may vary due to changes in rates, taxes, and/or fuel charges.", "The order of visits may be modified without affecting the trip content.", "Triple rooms in cruises and several hotels are double rooms with an additional bed.", "Cruises from Luxor depart every Saturday and Monday."],
            ar: ["انطلاق يومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة بعد إخطار العميل مسبقًا.", "قد تختلف الأسعار النهائية بسبب تغييرات في الأسعار أو الضرائب أو رسوم الوقود.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "الغرف الثلاثية في الرحلات البحرية وبعض الفنادق هي غرف مزدوجة مع سرير إضافي.", "تنطلق الرحلات النيلية من الأقصر كل يوم سبت واثنين."]
        },
        seasonalPricing: {
            summer: {
                gold: { single: 1115, double: 940, triple: 915 },
                diamond: { single: 0, double: 0, triple: 0 }
            },
            winter: {
                gold: { single: 1295, double: 1060, triple: 1035 },
                diamond: { single: 0, double: 0, triple: 0 }
            }
        }
    },




    {
        id: 4,
        name: {
            es: "Encantado por el Nilo",
            en: "Enchanted by the Nile",
            ar: "مفتون بالنيل"
        },
        icon: "🚢",
        duration: { days: 8, nights: 7 },
        priceFrom: 1330,
        categories: ["Cultural", "Historical"],
        startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
        cruiseNights: 4,
        runDays: {
            es: "Martes, Miércoles, Jueves, Viernes, Domingo",
            en: "Tuesday, Wednesday, Thursday, Friday, Sunday",
            ar: "الثلاثاء، الأربعاء، الخميس، الجمعة، الأحد"
        },
        briefDescription: {
            es: "Déjese llevar en una travesía de ensueño de 8 días, encantado por las maravillas eternas de Egipto a lo largo del Nilo. Explore las Pirámides de Giza, el Museo Egipcio, y los majestuosos templos desde Luxor hasta Asuán.",
            en: "Let yourself be carried away on an 8-day dream journey, enchanted by Egypt’s eternal wonders along the Nile. Explore the Giza Pyramids, the Egyptian Museum, and majestic temples from Luxor to Aswan.",
            ar: "انغمس في رحلة حالمة لمدة 8 أيام، مفتونًا بعجائب مصر الخالدة على طول النيل. استكشف أهرامات الجيزة والمتحف المصري والمعابد المهيبة من الأقصر إلى أسوان."
        },
        generalDescription: {
            es: "Déjese llevar en un viaje de ensueño de 8 días, encantado por los esplendores eternos de Egipto a lo largo del Nilo. Comience con una cálida bienvenida en El Cairo, donde las legendarias Pirámides de Giza se elevan contra el horizonte, la enigmática Esfinge monta guardia y los tesoros del Museo Egipcio revelan relatos de una antigua civilización. Desde El Cairo, viaje a Luxor para abordar su crucero de 5 estrellas por el Nilo y adéntrese en los grandiosos Templos de Luxor y Karnak, maravillándose ante la escala y belleza de estos espacios sagrados. En el Valle de los Reyes, camine por los senderos ocultos de los antiguos gobernantes de Egipto y párese ante el majestuoso Templo de Hatshepsut, una maravilla arquitectónica anidada en los acantilados. Navegue por las suaves aguas del Nilo hacia Edfu y Kom Ombo, donde le esperan templos bien conservados dedicados a dioses y reyes para su descubrimiento. En Asuán, visite el etéreo Templo de Philae, elevándose como una visión desde las aguas, y viaje a los impresionantes Templos de Abu Simbel, un símbolo de devoción tallado en la roca. Concluya su viaje con una última noche en El Cairo, donde la belleza y el misticismo de Egipto permanecerán en su corazón, dejándolo para siempre encantado por el Nilo.",
            en: "Let yourself be carried away on an 8-day dream journey, enchanted by Egypt's timeless splendors along the Nile. Begin with a warm welcome in Cairo, where the legendary Pyramids of Giza rise against the horizon, the enigmatic Sphinx stands guard, and the treasures of the Egyptian Museum reveal tales of an ancient civilization. From Cairo, journey to Luxor to board your 5-star Nile cruise and step into the grand Temples of Luxor and Karnak, marveling at the scale and beauty of these sacred spaces. In the Valley of the Kings, walk the hidden paths of Egypt's ancient rulers and stand before the majestic Temple of Hatshepsut, an architectural wonder nestled in the cliffs. Sail the Nile's gentle waters toward Edfu and Kom Ombo, where well-preserved temples dedicated to gods and kings await your discovery. In Aswan, visit the ethereal Temple of Philae, rising like a vision from the waters, and journey to the awe-inspiring Temples of Abu Simbel, a symbol of devotion carved into the rock. Conclude your journey with a final night in Cairo, where Egypt's beauty and mystique will linger in your heart, leaving you forever enchanted by the Nile.",
            ar: "دع نفسك تنطلق في رحلة حلم لمدة 8 أيام، مفتونًا بروائع مصر الخالدة على طول النيل. ابدأ بترحيب حار في القاهرة، حيث تعلو أهرامات الجيزة الأسطورية ضد الأفق، ويقف أبو الهول الغامض حارسًا، وتكشف كنوز المتحف المصري حكايا حضارة قديمة. من القاهرة، سافر إلى الأقصر لتصعد على متن رحلتك النيلية الفاخرة ذات الخمس نجوم وتخطو إلى معابد الأقصر والكرنك العظيمة، منبهرًا بحجم وجمال هذه الأماكن المقدسة. في وادي الملوك، امشي في المسارات المخفية لحكام مصر القدماء ووقف أمام معبد حتشبسوت المهيب، معجزة معمارية متداخلة في المنحدرات. ابحر في مياه النيل اللطيفة نحو إدفو وكوم أمبو، حيث تنتظرك معابد محفوظة جيدًا مكرسة للآلهة والملوك لاكتشافك. في أسوان، قم بزيارة معبد فيلاي السماوي، الذي يرتفع كرؤية من المياه، وسافر إلى معابد أبو سمبل المذهلة، رمز التفاني المنحوت في الصخر. اختتم رحلتك بليلة أخيرة في القاهرة، حيث سيبقى جمال وغموض مصر في قلبك، تاركًا إياك مفتونًا إلى الأبد بالنيل."
        },
        accommodations: {
            gold: [
                { city: { es: "El Cairo", en: "Cairo", ar: "القاهرة" }, hotel: { es: "Helnan Dreamland o similar", en: "Helnan Dreamland or similar", ar: "هيلنان دريم لاند أو ما يعادله" } },
                { city: { es: "Crucero por el Nilo", en: "Nile Cruise", ar: "رحلة نيلية" }, hotel: { es: "Le Fayan II o similar", en: "Le Fayan II or similar", ar: "لو فايان 2 أو ما يعادله" } }
            ],
            diamond: [
                { city: { es: "El Cairo", en: "Cairo", ar: "القاهرة" }, hotel: { es: "Fairmont Nile City o similar", en: "Fairmont Nile City or similar", ar: "فيرمونت نايل سيتي أو ما يعادله" } },
                { city: { es: "Crucero por el Nilo", en: "Nile Cruise", ar: "رحلة نيلية" }, hotel: { es: "Royal Signature o similar", en: "Royal Signature or similar", ar: "رويال سيغنتشر أو ما يعادله" } }
            ]
        },
        itinerary: [
            {
                "day": 1,
                "title": {
                    "es": "Llegada a El Cairo – Una Gran Bienvenida",
                    "en": "Arrival in Cairo – A Grand Welcome",
                    "ar": "الوصول إلى القاهرة – ترحيب حار"
                },
                "activities": {
                    "es": [
                        "Desde el momento en que llegue al Aeropuerto Internacional de El Cairo, nuestro equipo dedicado estará allí para asistirle con los trámites de visa y aduanas, garantizando una entrada rápida y sin problemas a Egipto.",
                        "Sea bienvenido con bebidas refrescantes y la cálida hospitalidad por la que Egipto es reconocido.",
                        "Un vehículo privado de lujo lo transportará a su hotel, donde le espera una experiencia de check-in personalizada, que establece el tono para un viaje inolvidable.",
                        "Instálese en su habitación elegantemente equipada y relájese, abrazando el comienzo de esta extraordinaria aventura.",
                        "Disfrute de una tranquila velada en El Cairo, rodeado del ambiente encantador de la ciudad."
                    ],
                    "en": [
                        "From the moment you arrive at Cairo International Airport, our dedicated team will be there to assist you with visa and customs procedures, ensuring a swift and seamless entry into Egypt.",
                        "Be welcomed with refreshing beverages and the warm hospitality for which Egypt is renowned.",
                        "A luxury private vehicle will transport you to your hotel, where a personalized check-in experience awaits, setting the tone for an unforgettable journey.",
                        "Settle into your elegantly appointed room and unwind, embracing the beginning of this extraordinary adventure.",
                        "Enjoy a tranquil evening in Cairo, surrounded by the city's enchanting ambiance."
                    ],
                    "ar": [
                        "من لحظة وصولك إلى مطار القاهرة الدولي، سيكون فريقنا المخصص هناك لمساعدتك في إجراءات التأشيرة والجمارك، مما يضمن دخولاً سريعًا وسلسًا إلى مصر.",
                        "كن مرحبًا بك بمشروبات منعشة والضيافة الدافئة التي تشتهر بها مصر.",
                        "ستنقلك مركبة فاخرة خاصة إلى فندقك، حيث تنتظرك تجربة تسجيل وصول شخصية، مما يضع نغمة رحلة لا تُنسى.",
                        "استقر في غرفتك المجهزة بأناقة واسترخِ، معتنقًا بداية هذه المغامرة الاستثنائية.",
                        "استمتع بمساء هادئ في القاهرة، محاطًا بالأجواء الساحرة للمدينة."
                    ]
                }
            },
            {
                "day": 2,
                "title": {
                    "es": "El Cairo – Las Majestuosas Pirámides y Tesoros del Antiguo Egipto",
                    "en": "Cairo – The Majestic Pyramids and Treasures of Ancient Egypt",
                    "ar": "القاهرة – الأهرامات المهيبة وكنوز مصر القديمة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un lujoso desayuno bufé en su hotel.",
                        "Embárquese en una visita privada de las imponentes Pirámides de Giza: Keops, Kefrén y Micerinos, las más magníficas de las Siete Maravillas del Mundo Antiguo.",
                        "Con acceso exclusivo, explorará estos monumentos eternos en una serena privacidad, absorbiendo su grandeza y misterio.",
                        "A continuación, párese ante la mítica Esfinge, su cabeza humana y cuerpo de león son un símbolo perdurable de la antigua sabiduría de Egipto.",
                        "Continúe con una visita privada al Templo del Valle de Kefrén, donde le esperan fascinantes perspectivas sobre los rituales antiguos.",
                        "Luego, maravíllese con los tesoros del Museo Egipcio, incluyendo los encantadores artefactos funerarios de Tutankamón.",
                        "Durante una visita exclusiva fuera del horario de atención, experimente las maravillas del museo en un entorno de tranquila intimidad.",
                        "Explore el histórico Barrio Copto de El Cairo y visite la Iglesia de San Sergio, un sitio reverenciado donde se cree que se refugió la Sagrada Familia durante su estancia en Egipto.",
                        "Saboree un almuerzo gourmet en un renombrado restaurante local, donde la cocina egipcia contemporánea se prepara con un toque refinado.",
                        "Regrese a su hotel para una velada relajante, reflexionando sobre los notables lugares visitados durante el día."
                    ],
                    "en": [
                        "Start your day with a luxury buffet breakfast at your hotel.",
                        "Embark on a private tour of the imposing Pyramids of Giza—Khufu, Khafre, and Menkaure—the most magnificent of the Seven Wonders of the Ancient World.",
                        "With exclusive access, you'll explore these timeless monuments in serene privacy, taking in their grandeur and mystery.",
                        "Next, stand before the mythical Sphinx, its human head and lion's body an enduring symbol of Egypt's ancient wisdom.",
                        "Continue with a private visit to the Valley Temple of Khafre, where fascinating insights into ancient rituals await.",
                        "Then, marvel at the treasures of the Egyptian Museum, including the enchanting funerary artifacts of Tutankhamun.",
                        "During an exclusive out-of-hours visit, experience the museum's wonders in a setting of quiet intimacy.",
                        "Explore Cairo's historic Coptic Quarter and visit the Church of St. Sergius, a revered site believed to have sheltered the Holy Family during their time in Egypt.",
                        "Savor a gourmet lunch at a renowned local restaurant, where contemporary Egyptian cuisine is prepared with a refined twist.",
                        "Return to your hotel for a relaxing evening, reflecting on the remarkable sights of the day."
                    ],
                    "ar": [
                        "ابدأ يومك مع إفطار بوفيه فاخر في فندقك.",
                        "انطلق في جولة خاصة للأهرامات المهيبة في الجيزة - خوفو، خفرع، ومنقرع - الأكثر روعة among عجائب الدنيا السبع في العالم القديم.",
                        "مع دخول حصري، ستستكشف هذه الآثار الخالدة في خصوصية هادئة، متأملاً عظمتها وغموضها.",
                        "بعد ذلك، قف أمام أبو الهول الأسطوري، رأسه البشري وجسم الأسد رمز دائم للحكمة القديمة لمصر.",
                        "استمر بزيارة خاصة لمعبد الوادي لخفرع، حيث تنتظرك رؤى رائعة عن الطقوس القديمة.",
                        "ثم انبهر بكنوز المتحف المصري، بما في ذلك القطع الجنائزية الساحرة لتوت عنخ آمون.",
                        "خلال زيارة حصرية خارج أوقات العمل، جرب عجائب المتحف في أجواء من الحميمية الهادئة.",
                        "استكشف الحي القبطي التاريخي في القاهرة وقم بزيارة كنيسة القديس سرجيوس، موقع موقر يُعتقد أن العائلة المقدسة لجأت إليه خلال وجودها في مصر.",
                        "تذوق غداء فاخر في مطعم محلي مشهور، حيث يتم تحضير المأكولات المصرية المعاصرة بلمعة مكررة.",
                        "عد إلى فندقك لمساء من الاسترخاء، متأملاً المشاهد الرائعة لليوم."
                    ]
                }
            },
            {
                "day": 3,
                "title": {
                    "es": "De El Cairo a Luxor – El Corazón de la Antigua Tebas",
                    "en": "From Cairo to Luxor – The Heart of Ancient Thebes",
                    "ar": "من القاهرة إلى الأقصر – قلب طيبة القديمة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un delicioso desayuno bufé en el hotel.",
                        "Un traslado privado lo llevará al Aeropuerto de El Cairo para su vuelo a Luxor, donde comienza su encantadora travesía por el Nilo.",
                        "A su llegada, le espera una embarcación fluvial de lujo de 5 estrellas, que ofrece la combinación perfecta de comodidad y elegancia.",
                        "Disfrute de un almuerzo gourmet a bordo mientras se instala y se prepara para las maravillas que le esperan.",
                        "Por la tarde, visite los majestuosos Templos de Luxor y Karnak, el complejo monumental más grande del mundo antiguo.",
                        "Explore estos impresionantes sitios, admirando las vastas columnas y los intrincados relieves mientras el sol proyecta un resplandor dorado sobre el horizonte tebano.",
                        "Regrese a la embarcación fluvial para una cena gourmet y relájese en el lujoso ambiente de sus alrededores, pasando la noche a bordo mientras el Nilo fluye suavemente debajo de usted."
                    ],
                    "en": [
                        "Begin your day with a delightful buffet breakfast at the hotel.",
                        "A private transfer will take you to Cairo Airport for your flight to Luxor, where your enchanting Nile cruise begins.",
                        "Upon arrival, a 5-star luxury riverboat awaits, providing the perfect blend of comfort and elegance.",
                        "Enjoy a gourmet lunch onboard as you settle in and prepare for the wonders ahead.",
                        "In the afternoon, visit the majestic Temples of Luxor and Karnak, the largest monumental complex of the ancient world.",
                        "Explore these breathtaking sites, admiring the vast columns and intricate reliefs as the sun casts a golden glow over the Theban horizon.",
                        "Return to the riverboat for a gourmet dinner and unwind in the luxurious ambiance of your surroundings, spending the night onboard as the Nile gently flows beneath you."
                    ],
                    "ar": [
                        "ابدأ يومك مع إفطار بوفيه لذيذ في الفندق.",
                        "سيأخذك نقل خاص إلى مطار القاهرة لرحلة الطيران إلى الأقصر، حيث تبدأ رحلتك النيلية الساحرة.",
                        "عند الوصول، تنتظرك مركبة نهرية فاخرة من فئة 5 نجوم، توفر المزيج المثالي من الراحة والأناقة.",
                        "استمتع بغداء فاخر على متن السفينة بينما تستقر وتستعد للعجائب التي تنتظرك.",
                        "في فترة الظهيرة، قم بزيارة معبدي الأقصر والكرنك المهيبين، أكبر مجمع أثري في العالم القديم.",
                        "استكشف هذه المواقع المذهلة، معجبًا بالأعمدة الشاسعة والنقوش المعقدة بينما يلقي الشمس توهجًا ذهبيًا على أفق طيبة.",
                        "عد إلى المركبة النهرية لتناول عشاء فاخر واسترخِ في الأجواء الفاخرة لمحيطك، مقضيًا الليلة على متن السفينة بينما يتدفق النيل بلطف beneath أنت."
                    ]
                }
            },
            {
                "day": 4,
                "title": {
                    "es": "Luxor – Valle de los Reyes y Templo de Hatshepsut",
                    "en": "Luxor – Valley of the Kings and Hatshepsut Temple",
                    "ar": "الأقصر – وادي الملوك ومعبد حتشبسوت"
                },
                "activities": {
                    "es": [
                        "Disfrute de pensión completa a bordo del crucero.",
                        "Comience su día con una exploración del legendario Valle de los Reyes, donde los faraones del Reino Nuevo yacen en descanso eterno.",
                        "Con acceso especial, explore tumbas seleccionadas, con la opción de visitar la famosa tumba de Tutankamón para obtener una visión íntima del sitio de entierro más renombrado de Egipto.",
                        "Continúe con una visita al impresionante Templo de Hatshepsut, una maravilla arquitectónica construida en terrazas contra los acantilados.",
                        "Sienta el eco de la historia mientras camina por salones dedicados a la faraona más poderosa de Egipto, admirando la grandeza que honra su legado.",
                        "Concluya el día con una parada en los imponentes Colosos de Memnón, dos estatuas monumentales que han custodiado la necrópolis tebana durante más de 3.000 años.",
                        "Al atardecer, zarpe hacia Esna, pasando por la esclusa.",
                        "Disfrute de una cena gourmet a bordo y pase una noche tranquila en Esna."
                    ],
                    "en": [
                        "Enjoy full board onboard the cruise.",
                        "Begin your day with an exploration of the legendary Valley of the Kings, where the pharaohs of the New Kingdom lie in eternal rest.",
                        "With special access, explore selected tombs, with the option to visit the famous tomb of Tutankhamun for an intimate glimpse into Egypt's most renowned burial site.",
                        "Continue with a visit to the awe-inspiring Temple of Hatshepsut, an architectural marvel built in terraces against the cliffs.",
                        "Feel the echo of history as you walk through halls dedicated to Egypt's most powerful female pharaoh, admiring the grandeur that honors her legacy.",
                        "Conclude the day with a stop at the imposing Colossi of Memnon, two monumental statues that have guarded the Theban necropolis for over 3,000 years.",
                        "As the sun sets, set sail toward Esna, passing through the lock.",
                        "Relish a gourmet dinner onboard and enjoy a peaceful overnight stay in Esna."
                    ],
                    "ar": [
                        "استمتع بالإقامة كاملة على متن الرحلة النيلية.",
                        "ابدأ يومك باستكشاف وادي الملوك الأسطوري، حيث يرقد فراعنة الدولة الحديثة في راحة أبدية.",
                        "مع دخول خاص، استكشف مقابر مختارة، مع خيار زيارة مقبرة توت عنخ آمون الشهيرة للحصول على لمحة حميمة لأشهر موقع دفن في مصر.",
                        "استمر بزيارة إلى معبد حتشبسوت المذهل، معجزة معمارية بنيت بمدرجات against المنحدرات.",
                        "اشعر بصدى التاريخ أثناء سيرك في قاعات مخصصة لأقوى فرعونة في مصر، معجبًا بالعظمة التي تكرم إرثها.",
                        "اختتم اليوم بتوقف عند تمثالي ممنون المهيبين، تمثالان ضخمان يحرسان مقبرة طيبة منذ أكثر من 3000 عام.",
                        "مع غروب الشمس، ابحر نحو إسنا، مرورًا بالقفل.",
                        "استمتع بعشاء فاخر على متن السفينة وتمتع بإقامة ليلية هادئة في إسنا."
                    ]
                }
            },
            {
                "day": 5,
                "title": {
                    "es": "Esna – Edfu y Kom Ombo",
                    "en": "Esna – Edfu and Kom Ombo",
                    "ar": "إسنا – إدفو وكوم أمبو"
                },
                "activities": {
                    "es": [
                        "Disfrute de pensión completa a bordo del crucero.",
                        "Zarpe hacia Edfu, donde explorará el majestuoso Templo de Horus, uno de los templos mejor conservados del antiguo Egipto.",
                        "Este gran monumento, con sus altísimos muros y tallas intrincadas, lo sumerge en la grandeza y el misticismo del mundo antiguo de Egipto.",
                        "Continúe su viaje a lo largo del Nilo hasta Kom Ombo, donde visitará el fascinante templo dual dedicado a Sobek, el dios cocodrilo, y Haroeris, el dios con cabeza de halcón.",
                        "Este sitio único es reverenciado por su doble dedicación, reflejando el equilibrio de dualidades en la mitología egipcia.",
                        "A medida que el día llega a su fin, disfrute de una cena gourmet a bordo mientras continúa navegando hacia Asuán, el vibrante corazón de Nubia.",
                        "Relájese con una estancia nocturna a bordo, rodeado por la serena belleza del Nilo."
                    ],
                    "en": [
                        "Enjoy full board onboard the cruise.",
                        "Set sail toward Edfu, where you'll explore the majestic Temple of Horus, one of the best-preserved temples of ancient Egypt.",
                        "This grand monument, with its towering walls and intricate carvings, immerses you in the grandeur and mystique of Egypt's ancient world.",
                        "Continue your journey along the Nile to Kom Ombo, where you'll visit the fascinating dual temple dedicated to Sobek, the crocodile god, and Haroeris, the falcon-headed god.",
                        "This unique site is revered for its dual dedication, reflecting the balance of dualities in Egyptian mythology.",
                        "As the day draws to a close, enjoy a gourmet dinner onboard as you continue sailing toward Aswan, the vibrant heart of Nubia.",
                        "Relax with an overnight stay onboard, surrounded by the serene beauty of the Nile."
                    ],
                    "ar": [
                        "استمتع بالإقامة كاملة على متن الرحلة النيلية.",
                        "ابحر نحو إدفو، حيث ستستكشف معبد حورس المهيب، أحد أفضل المعابد حفظًا في مصر القديمة.",
                        "هذا النصب التذكاري العظيم، بجدرانه الشاهقة ونقوشه المعقدة، يغمرك في عظمة وغموض العالم القديم لمصر.",
                        "واصل رحلتك على طول النيل إلى كوم أمبو، حيث ستزور المعبد المزدوج الرائع المخصص لـ سوبek، إله التمساح، وحروريس، إله الصقر.",
                        "هذا الموقع الفريد موقر لتكريسه المزدوج، عاكسًا توازن الازدواجية في ميثولوجيا مصر.",
                        "مع اقتراب اليوم من نهايته، استمتع بعشاء فاخر على متن السفينة بينما تواصل الإبحار نحو أسوان، القلب النابض بالنوبة.",
                        "استرخِ مع المبيت على متن السفينة، محاطًا بجمال النيل الهادئ."
                    ]
                }
            },
            {
                "day": 6,
                "title": {
                    "es": "Asuán – Templos y Navegación en el Nilo",
                    "en": "Aswan – Temples and Sailing on the Nile",
                    "ar": "أسوان – المعابد والإبحار على النيل"
                },
                "activities": {
                    "es": [
                        "Comience su día con una visita a la impresionante Presa Alta de Asuán, una maravilla de la ingeniería moderna que remodeló la historia de Egipto y aprovechó el poder del Nilo para las generaciones venideras.",
                        "A continuación, viaje en barco al encantador Templo de Philae, dedicado a la diosa Isis.",
                        "Ubicado en una isla serena, la atmósfera tranquila y apartada de este templo lo convierte en uno de los sitios más bellos de Egipto, evocando una sensación de paz y misticismo.",
                        "Por la tarde, relájese con un paseo en faluca alrededor de la Isla Elefantina, donde podrá disfrutar de vistas del Mausoleo de Aga Khan y los frondosos Jardines Botánicos, capturando la belleza eterna del Nilo.",
                        "Para una experiencia cultural más profunda, considere una visita opcional a una aldea nubia.",
                        "Aquí, puede disfrutar de una interacción cultural auténtica con artesanos locales, descubriendo artesanías únicas y quizás llevándose a casa una pieza artesanal como recuerdo.",
                        "Regrese al barco para una cena privada a la luz de las velas con vistas a las tranquilas aguas del Nilo.",
                        "Pase la noche a bordo, inmerso en la magia del Nilo."
                    ],
                    "en": [
                        "Begin your day with a visit to the impressive Aswan High Dam, a modern engineering marvel that reshaped Egypt's history and harnessed the power of the Nile for generations to come.",
                        "Next, journey by boat to the enchanting Temple of Philae, dedicated to the goddess Isis.",
                        "Set on a serene island, this temple's tranquil and secluded atmosphere makes it one of Egypt's most beautiful sites, evoking a sense of peace and mysticism.",
                        "In the afternoon, unwind with a felucca ride around Elephantine Island, where you'll be treated to views of the Agha Khan Mausoleum and the lush Botanical Gardens, capturing the timeless beauty of the Nile.",
                        "For a deeper cultural experience, consider an optional visit to a Nubian village.",
                        "Here, you can enjoy an authentic cultural interaction with local artisans, discovering unique crafts and perhaps taking home a handcrafted piece as a keepsake.",
                        "Return to the boat for a private candlelit dinner overlooking the Nile's tranquil waters.",
                        "Spend the night onboard, immersed in the magic of the Nile."
                    ],
                    "ar": [
                        "ابدأ يومك بزيارة إلى السد العالي بأسوان المثير للإعجاب، معجزة هندسية حديثة أعادت تشكيل تاريخ مصر واستغلت قوة النيل للأجيال القادمة.",
                        "بعد ذلك، سافر بالقارب إلى معبد فيلاي الساحر، المخصص للإلهة إيزيس.",
                        "موجود على جزيرة هادئة، تجعل الأجواء الهادئة والمعزولة لهذا المعبد أحد أجمل المواقع في مصر، مستحضرة إحساسًا بالسلام والتصوف.",
                        "في فترة الظهيرة، استرخِ برحلة فلوكا حول جزيرة إلفنتين، حيث ستستمتع بمناظر ضريح آغا خان والحدائق النباتية الخضراء، مت capture جمال النيل الخالد.",
                        "لتجربة ثقافية أعمق، فكر في زيارة اختيارية لقرية نوبية.",
                        "هنا، يمكنك الاستمتاع بتفاعل ثقافي أصيل مع الحرفيين المحليين، لاكتشاف الحرف الفريدة وربما أخذ قطعة مصنوعة يدويًا إلى المنزل كتذكار.",
                        "عد إلى القارب لعشاء خاص على ضوء الشموع مطلاً على مياه النيل الهادئة.",
                        "اقض الليلة على متن السفينة، منغمسًا في سحر النيل."
                    ]
                }
            },
            {
                "day": 7,
                "title": {
                    "es": "Asuán – Abu Simbel y Regreso a El Cairo",
                    "en": "Aswan – Abu Simbel and Return to Cairo",
                    "ar": "أسوان – أبو سمبل والعودة إلى القاهرة"
                },
                "activities": {
                    "es": [
                        "Desembarque después de un desayuno tranquilo.",
                        "Embárquese en una excursión exclusiva a Abu Simbel, uno de los monumentos más impresionantes de Egipto.",
                        "Este majestuoso complejo, tallado directamente en la roca, se erige como un tributo a Ramsés II y su amada reina, Nefertari.",
                        "Disfrute de una visita personalizada, que le permitirá explorar este magnífico sitio a su propio ritmo y apreciar plenamente su escala monumental y arte.",
                        "Después de su visita, trasládese al Aeropuerto de Asuán para su vuelo de regreso a El Cairo.",
                        "A su llegada, un traslado privado lo llevará a su hotel para una última noche en esta vibrante ciudad, donde podrá reflexionar sobre el viaje inolvidable que ha experimentado a través de las maravillas eternas de Egipto."
                    ],
                    "en": [
                        "Disembark after a leisurely breakfast.",
                        "Embark on an exclusive excursion to Abu Simbel, one of Egypt's most awe-inspiring monuments.",
                        "This majestic complex, carved directly into the rock, stands as a tribute to Ramses II and his beloved queen, Nefertari.",
                        "Enjoy a personalized visit, allowing you to explore this magnificent site at your own pace and fully appreciate its monumental scale and artistry.",
                        "After your visit, transfer to Aswan Airport for your flight back to Cairo.",
                        "Upon arrival, a private transfer will take you to your hotel for a final night in this vibrant city, where you can reflect on the unforgettable journey you've experienced through Egypt's timeless wonders."
                    ],
                    "ar": [
                        "انزل بعد إفطار مريح.",
                        "انطلق في رحلة حصرية إلى أبو سمبل، أحد أكثر الآثار إثارة للإعجاب في مصر.",
                        "هذا المجمع المهيب، المنحوت مباشرة في الصخر، يقف كتحية لرمسيس الثاني وملكته المحبوبة، نفرتاري.",
                        "استمتع بزيارة شخصية، تسمح لك باستكشاف هذا الموقع الرائع وفقًا لسرعتك الخاصة وتقدير حجمه الضخم وفنه بالكامل.",
                        "بعد زيارتك، انتقل إلى مطار أسوان لرحلة العودة إلى القاهرة.",
                        "عند الوصول، سينقلك نقل خاص إلى فندقك لليلة أخيرة في هذه المدينة النابضة بالحياة، حيث يمكنك التفكير في الرحلة التي لا تُنسى التي خضتها عبر عجائب مصر الخالدة."
                    ]
                }
            },
            {
                day: 8,
                title: {
                    es: "El Cairo – Despedida de Egipto",
                    en: "Cairo – Farewell to Egypt",
                    ar: "القاهرة – وداعًا لمصر"
                },
                activities: {
                    es: [
                        "Después de un desayuno bufé, su vehículo privado lo llevará al Aeropuerto Internacional de El Cairo para su vuelo de regreso.",
                        "Como despedida, nuestro equipo se asegurará de que su partida sea tan fluida y memorable como su llegada.",
                        "Fin de nuestros servicios."
                    ],
                    en: [
                        "After a buffet breakfast, your private vehicle will take you to Cairo International Airport for your return flight.",
                        "As a farewell, our team will ensure your departure is as seamless and memorable as your arrival.",
                        "End of our services."
                    ],
                    ar: [
                        "بعد إفطار بوفيه، ستنقلك سيارتك الخاصة إلى مطار القاهرة الدولي لرحلة العودة.",
                        "كوداع، سيتأكد فريقنا من أن مغادرتك سلسة ولا تنسى مثل وصولك.",
                        "نهاية خدماتنا."
                    ]
                }
            }
        ],
        servicesIncluded: {
            es: [
                "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para trámites de visa y aduanas.",
                "Vuelos domésticos (El Cairo-Luxor, Asuán-El Cairo).",
                "3 noches de alojamiento en El Cairo con desayuno.",
                "4 noches en un crucero por el Nilo de 5 estrellas con pensión completa (bebidas no incluidas).",
                "1 almuerzo gourmet en restaurante local seleccionado.",
                "Traslados privados de lujo entre todos los destinos y aeropuertos.",
                "Visitas según se menciona en el itinerario."
            ],
            en: [
                "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
                "Domestic flights (Cairo-Luxor, Aswan-Cairo).",
                "3 nights of accommodation in Cairo with breakfast.",
                "4 nights on a 5-star Nile cruise with full board (drinks not included).",
                "1 gourmet lunch at selected local restaurant.",
                "Private luxury transfers between all destinations and airports.",
                "Visits as mentioned in the itinerary."
            ],
            ar: [
                "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
                "الرحلات الجوية المحلية (القاهرة - الأقصر، أسوان - القاهرة).",
                "3 ليالٍ في القاهرة مع الإفطار.",
                "4 ليالٍ في رحلة نيلية فاخرة 5 نجوم بنظام الإقامة الكاملة (المشروبات غير مشمولة).",
                "غداء فاخر في مطعم محلي مختار.",
                "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.",
                "الزيارات كما هو مذكور في البرنامج."
            ]
        },
        servicesExcluded: {
            es: ["Vuelos internacionales.", "Visado 25 USD (pagadero a la llegada).", "Propinas para conductores y personal del crucero 60 USD por persona.", "Entradas al interior de las Pirámides y a la Tumba de Tutankamón.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
            en: ["International flights.", "Visa $25 (payable upon arrival).", "Tips for drivers and cruise staff $60 per person.", "Entrance fees to the interiors of the Pyramids and the Tomb of Tutankhamun.", "Optional tours and any visits not mentioned in the program.", "Beverages and personal expenses."],
            ar: ["الرحلات الدولية.", "تأشيرة دخول بقيمة 25 دولارًا (تُدفع عند الوصول).", "إكراميات للسائقين وطاقم الرحلة النيلية بقيمة 60 دولارًا للشخص.", "رسوم دخول داخل الأهرامات وقبر توت عنخ آمون.", "الجولات الاختيارية وأي زيارات غير مذكورة في البرنامج.", "المشروبات والمصروفات الشخصية."]
        },
        importantNotes: {
            es: ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.", "Los precios finales pueden variar debido a cambios en tarifas, impuestos o cargos por combustible.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Las habitaciones triples en cruceros y varios hoteles son habitaciones dobles con una cama adicional.", "Los cruceros desde Luxor salen todos los sábados y lunes."],
            en: ["Guaranteed daily departure with a minimum of 2 people.", "Hotels and cruises may be substituted with others of the same category with prior notice to the client.", "Final prices may vary due to changes in rates, taxes, and/or fuel charges.", "The order of visits may be modified without affecting the trip content.", "Triple rooms in cruises and several hotels are double rooms with an additional bed.", "Cruises from Luxor depart every Saturday and Monday."],
            ar: ["انطلاق يومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة بعد إخطار العميل مسبقًا.", "قد تختلف الأسعار النهائية بسبب تغييرات في الأسعار أو الضرائب أو رسوم الوقود.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "الغرف الثلاثية في الرحلات البحرية وبعض الفنادق هي غرف مزدوجة مع سرير إضافي.", "تنطلق الرحلات النيلية من الأقصر كل يوم سبت واثنين."]
        },
        seasonalPricing: {
            summer: {
                gold: { single: 1675, double: 1370, triple: 1330 },
                diamond: { single: 2080, double: 1610, triple: 1570 }
            },
            winter: {
                gold: { single: 1920, double: 1515, triple: 1475 },
                diamond: { single: 2395, double: 1795, triple: 1755 }
            }
        }
    },




    {
        id: 5,
        name: {
            es: "Misterios del Nilo",
            en: "Mysteries of the Nile",
            ar: "ألغاز النيل"
        },
        icon: "🏺",
        duration: { days: 8, nights: 7 },
        priceFrom: 1365,
        categories: ["Cultural", "City Tour"],
        startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
        cruiseNights: 3,
        runDays: {
            es: "Lunes, Martes, Jueves, Sábado, Domingo",
            en: "Monday, Tuesday, Thursday, Saturday, Sunday",
            ar: "الاثنين، الثلاثاء، الخميس، السبت، الأحد"
        },
        briefDescription: {
            es: "Descubra los Misterios del Nilo en un viaje majestuoso de 8 días a través de las maravillas eternas de Egipto. Explore El Cairo, Asuán y Luxor en una experiencia inolvidable.",
            en: "Discover the Mysteries of the Nile on a majestic 8-day journey through Egypt’s eternal wonders. Explore Cairo, Aswan, and Luxor in an unforgettable experience.",
            ar: "اكتشف ألغاز النيل في رحلة مهيبة لمدة 8 أيام عبر عجائب مصر الخالدة. استكشف القاهرة وأسوان والأقصر في تجربة لا تُنسى."
        },

        generalDescription: {
            es: "Desbloquee los Misterios del Nilo en un majestuoso viaje de 8 días a través de las maravillas eternas de Egipto. Comience en El Cairo, donde le espera una cálida bienvenida, y adéntrese en el mundo legendario de los faraones. Contémplese ante las Grandes Pirámides de Giza y explore la antigua necrópolis de Saqqara, donde los secretos del pasado permanecen en las arenas. Pasee por los tesoros de El Cairo, desde las reliquias invaluables del Museo Egipcio hasta el bullicio vibrante del Bazar Khan el-Khalili. Desde El Cairo, vuele hacia el sur hasta Asuán y deslícese hacia la tranquilidad a bordo de un crucero de 5 estrellas por el Nilo. Maravíllese con el místico Templo de Philae y deslícese bajo las estrellas en una faluca tradicional, sintiendo el pulso eterno del Nilo. Viaje a los monumentales templos de Abu Simbel, un tributo a la grandeza de Egipto, y continúe hasta el Templo de Kom Ombo, encaramado al borde del río. Al llegar a Luxor, la antigua ciudad de templos y reyes, póngase de pie entre los colosales pilares de Karnak y Luxor, camine por el sagrado Valle de los Reyes y contemple la maravilla arquitectónica del templo de Hatshepsut anidado en los acantilados. Concluya este extraordinario viaje con una última noche en El Cairo, llevándose consigo recuerdos grabados en el espíritu de Egipto. Permita que el encanto del Nilo se convierta en parte de su historia.",
            en: "Unlock the Mysteries of the Nile on an 8-day majestic voyage through Egypt's timeless wonders. Begin in Cairo, where a warm welcome awaits, and step into the legendary world of the pharaohs. Stand in awe of the Great Pyramids of Giza and explore the ancient necropolis of Saqqara, where secrets of the past linger in the sands. Wander through Cairo's treasures, from the priceless relics of the Egyptian Museum to the vibrant bustle of Khan el-Khalili Bazaar. From Cairo, soar south to Aswan and drift into tranquility aboard a 5-star Nile cruise. Marvel at the mystical Temple of Philae and glide under the stars on a traditional felucca, feeling the timeless pulse of the Nile. Journey to the monumental temples of Abu Simbel, a tribute to Egypt's grandeur, and continue to the Temple of Kom Ombo, perched on the river's edge. Arriving in Luxor, the ancient city of temples and kings, stand among the colossal pillars of Karnak and Luxor, walk the sacred Valley of the Kings, and gaze upon the architectural marvel of Hatshepsut's temple nestled in the cliffs. Conclude this extraordinary journey with a final night in Cairo, taking with you memories etched in the spirit of Egypt. Let the enchantment of the Nile become a part of your story.",
            ar: "افتح أسرار النيل في رحلة مهيبة لمدة 8 أيام عبر عجائب مصر الخالدة. ابدأ في القاهرة، حيث ينتظرك ترحيب حار، وادخل إلى عالم الفراعنة الأسطوري. قف بإجلال أمام أهرامات الجيزة العظيمة واستكشف مقبرة سقارة القديمة، حيث تبقى أسرار الماضي في الرمال. تجول في كنوز القاهرة، من آثار المتحف المصري التي لا تقدر بثمن إلى صخب سوق خان الخليلي النابض بالحياة. من القاهرة، اطير جنوبًا إلى أسوان وانزلق إلى الهدوء على متن رحلة نيلية فاخرة من فئة 5 نجوم. انبهر بمعبد فيلاي السحري وانزلق تحت النجوم في فلوكا تقليدية، وشعر بالنبض الخالد للنيل. سافر إلى معابد أبو سمبل الضخمة، تحية لعظمة مصر، واستمر إلى معبد كوم أمبو، الواقع على حافة النهر. عند الوصول إلى الأقصر، مدينة المعابد والملوك القديمة، قف بين أعمدة الكرنك والأقصر العملاقة، وامشي في وادي الملوك المقدس، وتأمل في معجزة معبد حتشبسوت المعمارية المتداخلة في المنحدرات. اختتم هذه الرحلة الاستثنائية بليلة أخيرة في القاهرة، حاملاً معك ذكريات محفورة في روح مصر. دع سحر النيل يصبح جزءًا من قصتك."
        }
        ,
        accommodations: {
            gold: [
                { city: { es: "El Cairo", en: "Cairo", ar: "القاهرة" }, hotel: { es: "Helnan Dreamland o similar", en: "Helnan Dreamland or similar", ar: "هيلنان دريم لاند أو ما يعادله" } },
                { city: { es: "Crucero por el Nilo", en: "Nile Cruise", ar: "رحلة نيلية" }, hotel: { es: "Le Fayan II o similar", en: "Le Fayan II or similar", ar: "لو فايان 2 أو ما يعادله" } }
            ],
            diamond: [
                { city: { es: "El Cairo", en: "Cairo", ar: "القاهرة" }, hotel: { es: "Fairmont Nile City o similar", en: "Fairmont Nile City or similar", ar: "فيرمونت نايل سيتي أو ما يعادله" } },
                { city: { es: "Crucero por el Nilo", en: "Nile Cruise", ar: "رحلة نيلية" }, hotel: { es: "Royal Signature o similar", en: "Royal Signature or similar", ar: "رويال سيغنتشر أو ما يعادله" } }
            ]
        },
        itinerary:
            [
                {
                    day: 1,
                    title: {
                        es: "Llegada a El Cairo – Una Gran Bienvenida",
                        en: "Arrival in Cairo – A Grand Welcome",
                        ar: "الوصول إلى القاهرة – ترحيب حار"
                    },
                    activities: {
                        es: [
                            "A su llegada al Aeropuerto Internacional de El Cairo, será recibido por nuestro equipo dedicado, listo para hacer su entrada a Egipto sin problemas y cómoda.",
                            "Lo guiaremos sin esfuerzo a través de los trámites de visa y aduanas, dándole la bienvenida con bebidas refrescantes y el calor de la verdadera hospitalidad egipcia.",
                            "Un vehículo de lujo privado espera para trasladarlo a su hotel, donde un check-in personalizado prepara el escenario para su aventura.",
                            "Relájese en los alojamientos más exclusivos de El Cairo, disfrutando de una velada libre mientras se adapta al ritmo cautivador de Egipto."
                        ],
                        en: [
                            "Upon arrival at Cairo International Airport, be greeted by our dedicated team, ready to make your entry into Egypt seamless and comfortable.",
                            "We'll guide you effortlessly through visa and customs procedures, welcoming you with refreshing drinks and the warmth of true Egyptian hospitality.",
                            "A private luxury vehicle awaits to transfer you to your hotel, where a personalized check-in sets the stage for your adventure.",
                            "Relax in Cairo's most exclusive accommodations, enjoying an evening at leisure as you settle into the captivating rhythm of Egypt."
                        ],
                        ar: [
                            "عند الوصول إلى مطار القاهرة الدولي، سيتم استقبالكم من قبل فريقنا المخصص، الجاهز لجعل دخولكم إلى مصر سلسًا ومريحًا.",
                            "سنقودكم بسلاسة خلال إجراءات التأشيرة والجمارك، ونرحب بكم بمشروبات منعشة ودفء الضيافة المصرية الحقيقية.",
                            "تنتظركم مركبة فاخرة خاصة لنقلكم إلى فندقكم، حيث يضع تسجيل الوصول الشخصي حجر الأساس لمغامرتكم.",
                            "استرخوا في أرقى أماكن الإقامة في القاهرة، واستمتعوا بأمسية حرة بينما تستقرون في الإيقاع الجذاب لمصر."
                        ]
                    }
                },
                {
                    day: 2,
                    title: {
                        es: "El Cairo – Las Pirámides Eternas y Secretos de Saqqara",
                        en: "Cairo – The Eternal Pyramids and Secrets of Sakkara",
                        ar: "القاهرة – الأهرامات الخالدة وأسرار سقارة"
                    },
                    activities: {
                        es: [
                            "Comience su día con un suculento desayuno bufé en su hotel, preparando el escenario para un viaje inolvidable.",
                            "Embárquese en una visita privada a las legendarias Pirámides de Giza, comenzando con la Gran Pirámide de Keops, la más grande y famosa de las tres pirámides.",
                            "Maravíllese con las Pirámides de Kefrén y Micerinos, cada una un testimonio del genio arquitectónico antiguo, y párese ante la enigmática Esfinge, un guardián eterno tallado en piedra caliza que ha vigilado el paisaje de Egipto durante milenios.",
                            "Continúe a Saqqara, la vasta necrópolis que sirvió como lugar de entierro para las primeras dinastías de Egipto.",
                            "Aquí, encontrará la notable Pirámide Escalonada de Zoser, diseñada por el visionario arquitecto Imhotep y considerada la primera estructura de piedra monumental del mundo.",
                            "Explore las tumbas y cámaras funerarias que albergan tallas intrincadas y pinturas vibrantes, arrojando luz sobre la vida y creencias durante el Reino Antiguo de Egipto.",
                            "Para el almuerzo, disfrute de una experiencia gastronómica exclusiva en un restaurante renombrado, saboreando auténtica cocina egipcia servida con sofisticación gourmet.",
                            "Regrese a su hotel para relajarse y disfrutar de una tranquila velada a su gusto, rodeado de los ecos de las maravillas eternas de Egipto."
                        ],
                        en: [
                            "Begin your day with a sumptuous buffet breakfast at your hotel, setting the stage for an unforgettable journey.",
                            "Embark on a private tour to the legendary Pyramids of Giza, beginning with the Great Pyramid of Khufu, the largest and most famous of the three pyramids.",
                            "Marvel at the Pyramids of Khafre and Menkaure, each a testament to ancient architectural genius, and stand before the enigmatic Sphinx, a timeless guardian carved from limestone that has watched over Egypt's landscape for millennia.",
                            "Continue to Saqqara, the vast necropolis that served as the burial ground for Egypt's earliest dynasties.",
                            "Here, you'll encounter the remarkable Step Pyramid of Djoser, designed by the visionary architect Imhotep and considered the world's first monumental stone structure.",
                            "Explore the tombs and burial chambers that house intricate carvings and vibrant paintings, shedding light on life and beliefs during Egypt's Old Kingdom.",
                            "For lunch, indulge in an exclusive dining experience at a renowned restaurant, savoring authentic Egyptian cuisine served with gourmet sophistication.",
                            "Return to your hotel to relax and enjoy a quiet evening at your leisure, surrounded by the echoes of Egypt's eternal wonders."
                        ],
                        ar: [
                            "ابدأ يومك مع إفطار بوفيه فاخر في فندقك، مُعدًا المسرح لرحلة لا تُنسى.",
                            "انطلق في جولة خاصة إلى أهرامات الجيزة الأسطورية، بدءًا من الهرم الأكبر لخوفو، الأكبر والأشهر بين الأهرامات الثلاثة.",
                            "انبهر بأهرامات خفرع ومنقرع، كل منها شهادة على العبقرية المعمارية القديمة، ووقف أمام أبو الهول الغامض، الحارس الخالد المنحوت من الحجر الجيري الذي راقب مشهد مصر لآلاف السنين.",
                            "استمر إلى سقارة، المقبرة الشاسعة التي خدمت كأرض دفن لأقدم أسرات مصر.",
                            "هنا، ستواجه هرم زوسر المدرج الرائع، المصمم من قبل المهندس المعماري المبصر إمحوتب ويعتبر أول مبنى حجري ضخم في العالم.",
                            "استكشف المقابر وغرف الدفن التي تضم منحوتات معقدة ولوحات نابضة بالحياة، مما يلقي الضوء على الحياة والمعتقدات خلال عصر المملكة القديمة في مصر.",
                            "لتناول الغداء، استمتع بتجربة طعام حصرية في مطعم مشهور، متذوقًا المأكولات المصرية الأصيلة المقدمة بأناقة الطهاة.",
                            "عد إلى فندقك للاسترخاء والاستمتاع بمساء هادئ حسب رغبتك، محاطًا بصدى عجائب مصر الخالدة."
                        ]
                    }
                },
                {
                    day: 3,
                    title: {
                        es: "El Cairo – Tesoros Culturales y Maravillas del Bazar",
                        en: "Cairo – Cultural Treasures and Bazaar Wonders",
                        ar: "القاهرة – الكنوز الثقافية وعجائب البازار"
                    },
                    activities: {
                        es: [
                            "Después de un delicioso desayuno, comience su día explorando la rica herencia cultural de El Cairo.",
                            "Comience con una visita al Museo Egipcio, donde tendrá acceso a una colección curada de artefactos.",
                            "Descubra una vasta gama de arte egipcio antiguo, momias y reliquias que narran la grandeza de la historia de Egipto, ofreciendo un vistazo íntimo a las vidas, creencias y arte de una de las civilizaciones más antiguas del mundo.",
                            "Continúe a la majestuosa Mezquita de Alabastro de Mohamed Ali, encaramada en lo alto de la histórica Ciudadela de Saladino.",
                            "Admire las grandes cúpulas de la mezquita y la ornamentada arquitectura mientras disfruta de impresionantes vistas panorámicas de El Cairo, una ciudad donde la historia antigua y la vida moderna se mezclan a la perfección.",
                            "A continuación, sumérjase en la atmósfera animada del Bazar Khan el-Khalili, el mercado más histórico de El Cairo.",
                            "Pasee por callejones bulliciosos llenos de colores vibrantes y aromas únicos, hojeando joyas hechas a mano, textiles intrincados y otros tesoros elaborados por artesanos locales.",
                            "Para el almuerzo, disfrute de una comida relajada en un restaurante local exclusivo, saboreando la mejor cocina egipcia en un entorno elegante.",
                            "Después, regrese a su hotel para una noche de descanso, con recuerdos de las maravillas culturales de El Cairo."
                        ],
                        en: [
                            "After a delightful breakfast, begin your day exploring Cairo's rich cultural heritage.",
                            "Start with a visit to the Egyptian Museum, where you'll have access to a curated collection of artifacts.",
                            "Discover a vast array of ancient Egyptian art, mummies, and relics that narrate the grandeur of Egypt's history, offering an intimate glimpse into the lives, beliefs, and artistry of one of the world's oldest civilizations.",
                            "Continue to the majestic Alabaster Mosque of Mohamed Ali, perched atop the historic Citadel of Saladin.",
                            "Admire the mosque's grand domes and ornate architecture as you take in breathtaking panoramic views of Cairo, a city where ancient history and modern life blend seamlessly.",
                            "Next, dive into the lively atmosphere of Khan el-Khalili Bazaar, Cairo's most historic market.",
                            "Stroll through bustling alleys filled with vibrant colors and unique aromas, browsing handcrafted jewelry, intricate textiles, and other treasures crafted by local artisans.",
                            "For lunch, enjoy a relaxed meal at an exclusive local restaurant, savoring the finest Egyptian cuisine in an elegant setting.",
                            "Afterward, return to your hotel for a restful night, with memories of Cairo's cultural wonders."
                        ],
                        ar: [
                            "بعد إفطار لذيذ، ابدأ يومك باستكشاف التراث الثقافي الغني للقاهرة.",
                            "ابدأ بزيارة إلى المتحف المصري، حيث سيكون لديك access إلى مجموعة مختارة من القطع الأثرية.",
                            "اكتشف مجموعة واسعة من الفن المصري القديم، والمومياوات، والآثار التي تحكي عظمة تاريخ مصر، مقدمة نظرة حميمة على حياة ومعتقدات وفن إحدى أقدم الحضارات في العالم.",
                            "استمر إلى مسجد محمد Ali الرخامي المهيب، الواقع في قمة قلعة صلاح الدين التاريخية.",
                            "انبهر بقباب المسجد الكبيرة وهندسته المعمارية المزخرفة بينما تستمتع بمناظر بانورامية مذهلة للقاهرة، مدينة where يمتزج التاريخ القديم والحياة الحديثة بسلاسة.",
                            "بعد ذلك، اغوص في الأجواء النابضة بالحياة لخان الخليلي، أقدم أسواق القاهرة.",
                            "تمشى في الأزقة الصاخبة المليئة بالألوان النابضة بالحياة والروائح الفريدة، وتصفح المجوهرات المصنوعة يدويًا، والمنسوجات المعقدة، وكنوز أخرى صنعها الحرفيون المحليون.",
                            "لتناول الغداء، استمتع بوجبة مريحة في مطعم محلي حصري، متذوقًا أفضل المأكولات المصرية في جو أنيق.",
                            "بعد ذلك، عد إلى فندقك ليلة هادئة، مع ذكريات عجائب القاهرة الثقافية."
                        ]
                    }
                },
                {
                    day: 4,
                    title: {
                        es: "De El Cairo a Asuán – Templos a la Orilla del Nilo",
                        en: "From Cairo to Aswan – Temples on the Nile's Edge",
                        ar: "من القاهرة إلى أسوان – معابد على حافة النيل"
                    },
                    activities: {
                        es: [
                            "Después de un delicioso desayuno, trasládese al Aeropuerto de El Cairo para su vuelo a Asuán, donde comienza su aventura en el Nilo.",
                            "A su llegada, visite la impresionante Presa Alta, una maravilla de la ingeniería moderna que remodeló la relación de Egipto con el Nilo y transformó la región.",
                            "A continuación, navegue al tranquilo Templo de Philae, dedicado a la diosa Isis.",
                            "Ubicado en una isla rodeada por las pacíficas aguas del Nilo, este templo hechiza a los visitantes con su belleza mística y entorno sereno.",
                            "Suba a bordo de su lujoso crucero por el Nilo de 5 estrellas, donde le espera un almuerzo gourmet mientras zarpa a través del corazón de Egipto.",
                            "Relájese en su cabina privada, completa con ventanas panorámicas que ofrecen impresionantes vistas de las riberas del río mientras se desliza a lo largo del Nilo.",
                            "Por la tarde, embárquese en un paseo en faluca alrededor de la Isla Elefantina, pasando por el Mausoleo de Aga Khan y los frondosos y pintorescos Jardines Botánicos.",
                            "Para un toque adicional de inmersión cultural, puede optar por visitar la Aldea Nubia, donde se encontrará con artesanos locales y experimentará los colores vibrantes, tradiciones y calidez de la cultura nubia.",
                            "Regrese al crucero para una cena a la luz de las velas a bordo, y disfrute de una estancia nocturna bajo las estrellas, rodeado por la tranquilidad del Nilo."
                        ],
                        en: [
                            "After a delightful breakfast, transfer to Cairo Airport for your flight to Aswan, where your Nile adventure begins.",
                            "Upon arrival, visit the impressive High Dam, a marvel of modern engineering that reshaped Egypt's relationship with the Nile and transformed the region.",
                            "Next, sail to the tranquil Philae Temple, dedicated to the goddess Isis.",
                            "Located on an island surrounded by the peaceful waters of the Nile, this temple enchants visitors with its mystical beauty and serene setting.",
                            "Board your luxurious 5-star Nile cruise, where a gourmet lunch awaits as you set sail through the heart of Egypt.",
                            "Relax in your private cabin, complete with panoramic windows offering stunning views of the riverbanks as you drift along the Nile.",
                            "In the afternoon, embark on a felucca ride around Elephantine Island, passing by the Agha Khan Mausoleum and the lush, scenic Botanical Gardens.",
                            "For an added touch of cultural immersion, you may choose to visit the Nubian Village, where you'll meet local artisans and experience the vibrant colors, traditions, and warmth of Nubian culture.",
                            "Return to the cruise for a candlelit dinner on board, and enjoy an overnight stay under the stars, surrounded by the tranquility of the Nile."
                        ],
                        ar: [
                            "بعد إفطار لذيذ، انتقل إلى مطار القاهرة لرحلة الطيران إلى أسوان، حيث تبدأ مغامرتكم النيلية.",
                            "عند الوصول، قم بزيارة السد العالي المثير للإعجاب، معجزة الهندسة الحديثة التي أعادت تشكيل علاقة مصر مع النيل وحولت المنطقة.",
                            "بعد ذلك، ابحر إلى معبد فيلة الهادئ، المخصص للإلهة إيزيس.",
                            "يقع على جزيرة محاطة بمياه النيل الهادئة، يسحر هذا المعبد الزوار بجماله الغامض ووضعه الهادئ.",
                            "اصعد على متن رحلتكم النيلية الفاخرة ذات الخمس نجوم، حيث ينتظركم غداء فاخر بينما تبحرون عبر قلب مصر.",
                            "استرخوا في كابينتكم الخاصة، المزودة بنوافذ بانورامية تقدم مناظر مذهلة لضفاف النهر بينما تنجرفون على طول النيل.",
                            "في فترة الظهيرة، انطلقوا في رحلة فلوكا حول جزيرة إلفنتين، مرورًا بضريح آغا خان والحدائق النباتية الخضراء والخلابة.",
                            "لمسة إضافية من الانغماس الثقافي، يمكنكم اختيار زيارة القرية النوبية، حيث ستقابلون حرفيين محليين وتختبرون الألوان النابضة بالحياة، والتقاليد، ودفء الثقافة النوبية.",
                            "عودوا إلى الرحلة النيلية لعشاء على ضوء الشموع على متن السفينة، واستمتعوا بإقامة ليلية تحت النجوم، محاطين بهدوء النيل."
                        ]
                    }
                },
                {
                    day: 5,
                    title: {
                        es: "Asuán – El Majestuoso Abu Simbel y Kom Ombo",
                        en: "Aswan – The Majestic Abu Simbel and Kom Ombo",
                        ar: "أسوان – أبو سمبل المهيب وكوم أمبو"
                    },
                    activities: {
                        es: [
                            "Pensión completa en el crucero.",
                            "Comience su día con una excursión inolvidable a Abu Simbel, donde los colosales templos de Ramsés II y la Reina Nefertari están tallados en los acantilados.",
                            "Sea testigo de una de las escenas más icónicas de Egipto mientras la luz de la mañana ilumina las estatuas gigantescas, capturando la grandeza y el poder del antiguo Egipto. (Traslado por carretera).",
                            "Después de su tour exclusivo, regrese al crucero para un almuerzo gourmet mientras navega hacia Kom Ombo.",
                            "Por la tarde, explore el único Templo dual de Sobek y Haroeris en Kom Ombo, donde cada santuario honra la influencia de los dioses en la vida del antiguo Egipto.",
                            "Admire las intrincadas tallas y jeroglíficos que relatan historias de devoción y misticismo.",
                            "Continúe navegando hacia Edfu, donde le espera una cena refinada a bordo del crucero.",
                            "Pase la noche a bordo, mecido por el suave ritmo del Nilo."
                        ],
                        en: [
                            "Full board on the cruise.",
                            "Start your day with an unforgettable excursion to Abu Simbel, where the colossal temples of Ramses II and Queen Nefertari are carved into the cliffs.",
                            "Witness one of Egypt's most iconic scenes as the morning light illuminates the towering statues, capturing the grandeur and power of ancient Egypt. (Road transfer).",
                            "After your exclusive tour, return to the cruise for a gourmet lunch while sailing toward Kom Ombo.",
                            "In the afternoon, explore the unique dual Temple of Sobek and Haroeris in Kom Ombo, where each sanctuary honors the gods' influence on life in ancient Egypt.",
                            "Admire the intricate carvings and hieroglyphs that recount stories of devotion and mysticism.",
                            "Continue sailing to Edfu, where a refined dinner awaits aboard the cruise.",
                            "Spend the night onboard, lulled by the gentle rhythm of the Nile."
                        ],
                        ar: [
                            "الإقامة كاملة على متن الرحلة النيلية.",
                            "ابدأ يومك برحلة لا تُنسى إلى أبو سمبل، حيث تم نحت المعابد العملاقة لرمسيس الثاني والملكة نفرتاري في المنحدرات.",
                            "كن شاهدًا على أحد أكثر المشاهد شهرة في مصر بينما يضيء ضوء الصباح التماثيل الشاهقة، مت capture عظمة وقوة مصر القديمة. (نقل بري).",
                            "بعد جولتك الحصرية، عد إلى الرحلة النيلية لتناول غداء فاخر أثناء الإبحار نحو كوم أمبو.",
                            "في فترة الظهيرة، استكشف المعبد المزدوج الفريد لسوبek وحروريس في كوم أمبو، حيث يكرم كل ملاذ تأثير الآلهة على الحياة في مصر القديمة.",
                            "انبهر بالنقوش المعقدة والهيروغليفية التي تروي قصص التفاني والتصوف.",
                            "استمر في الإبحار إلى إدفو، حيث ينتظركم عشاء راق على متن الرحلة النيلية.",
                            "اقض الليلة على متن السفينة، مستسلمًا للإيقاع اللطيف للنيل."
                        ]
                    }
                },
                {
                    day: 6,
                    title: {
                        es: "Edfu – Luxor – Ecos de los Faraones",
                        en: "Edfu – Luxor – Echoes of the Pharaohs",
                        ar: "إدفو – الأقصر – أصداء الفراعنة"
                    },
                    activities: {
                        es: [
                            "Pensión completa en el crucero.",
                            "Por la mañana, visite el gran Templo de Horus en Edfu, uno de los templos mejor conservados de Egipto.",
                            "Sienta los ecos de los rituales antiguos mientras camina por las imponentes salas y maravíllese con los relieves vívidos que capturan el poder y la protección de Horus.",
                            "Zarpe hacia Luxor, el corazón del antiguo Egipto.",
                            "A su llegada, visite el majestuoso Templo de Luxor, donde grandes columnas y estatuas crean una atmósfera inspiradora.",
                            "Al caer la noche, el templo se baña en un resplandor cálido, creando un ambiente mágico para una visita encantadora al atardecer.",
                            "Regrese al crucero para una cena gourmet y una estancia nocturna a bordo del barco, rodeado por la belleza eterna del Nilo."
                        ],
                        en: [
                            "Full board on the cruise.",
                            "In the morning, visit the grand Temple of Horus in Edfu, one of the best-preserved temples in Egypt.",
                            "Feel the echoes of ancient rituals as you walk through the towering halls and marvel at the vivid reliefs that capture the power and protection of Horus.",
                            "Set sail for Luxor, the heart of ancient Egypt.",
                            "Upon arrival, visit the majestic Luxor Temple, where grand columns and statues create an awe-inspiring atmosphere.",
                            "As night falls, the temple is bathed in a warm glow, creating a magical ambiance for an enchanting sunset visit.",
                            "Return to the cruise for a gourmet dinner and an overnight stay aboard the ship, surrounded by the timeless beauty of the Nile."
                        ],
                        ar: [
                            "الإقامة كاملة على متن الرحلة النيلية.",
                            "في الصباح، قم بزيارة معبد حورس العظيم في إدفو، أحد أفضل المعابد حفظًا في مصر.",
                            "اشعر بأصداء الطقوس القديمة أثناء سيرك في القاعات الشاهقة وانبهر بالنقوش الحية التي ت capture قوة وحماية حورس.",
                            "ابحر towards الأقصر، قلب مصر القديمة.",
                            "عند الوصول، قم بزيارة معبد الأقصر المهيب، حيث تخلق الأعمدة والتماثيل الكبيرة أجواءً تبعث على الرهبة.",
                            "مع حلول الليل، يغمر المعبد توهج دافئ، مما يخلق أجواءً سحرية لزيارة ساحرة عند غروب الشمس.",
                            "عد إلى الرحلة النيلية لتناول عشاء فاخر وإقامة ليلية على متن السفينة، محاطًا بجمال النيل الخالد."
                        ]
                    }
                },
                {
                    day: 7,
                    title: {
                        es: "Luxor – Valle de los Reyes y Karnak",
                        en: "Luxor – Valley of the Kings and Karnak",
                        ar: "الأقصر – وادي الملوك والكرنك"
                    },
                    activities: {
                        es: [
                            "Después de un delicioso desayuno, desembarque para una excursión exclusiva a algunos de los sitios más sagrados e inspiradores de Egipto.",
                            "Comience su viaje en el magnífico Templo de Karnak, el complejo religioso más grande del mundo antiguo.",
                            "Camine entre sus altas columnas y tallas intrincadas, cada una adornada con símbolos e historias que resuenan a través de la rica historia de Egipto.",
                            "Los vastos terrenos del templo ofrecen una visión cautivadora de la vida espiritual del antiguo Egipto.",
                            "Continúe al sagrado Valle de los Reyes, donde los faraones más poderosos de Egipto encontraron su lugar de descanso eterno.",
                            "Aquí, tendrá acceso especial a tumbas seleccionadas, donde vibrantes pinturas murales representan el viaje de los faraones al más allá.",
                            "También puede optar por entrar a la famosa tumba de Tutankamón, un sitio de extraordinaria importancia histórica.",
                            "A continuación, visite el gran Templo de Hatshepsut, una notable obra maestra terraplenada dedicada a la gobernante femenina más poderosa de Egipto.",
                            "Admire el diseño armonioso que se mezcla perfectamente con los acantilados, reflejando la fuerza y elegancia de esta reina visionaria.",
                            "Concluya su día con una visita a los imponentes Colosos de Memnón, dos estatuas monumentales que han permanecido como guardianes silenciosos sobre la necrópolis tebana durante miles de años, encarnando la grandeza y el misterio del antiguo Egipto.",
                            "Después, trasládese al Aeropuerto de Luxor para su vuelo de regreso a El Cairo, donde le espera una última noche de lujo en su hotel, ofreciéndole un cierre pacífico para su viaje inolvidable."
                        ],
                        en: [
                            "After a delightful breakfast, disembark for an exclusive excursion to some of Egypt's most sacred and awe-inspiring sites.",
                            "Begin your journey at the magnificent Karnak Temple, the largest religious complex of the ancient world.",
                            "Walk among its towering columns and intricate carvings, each adorned with symbols and stories that echo through Egypt's rich history.",
                            "The vast temple grounds offer a captivating glimpse into the spiritual life of ancient Egypt.",
                            "Continue to the hallowed Valley of the Kings, where Egypt's most powerful pharaohs found their eternal resting place.",
                            "Here, you'll have special access to selected tombs, where vibrant wall paintings depict the pharaohs' journey to the afterlife.",
                            "You may also opt to enter the famed tomb of Tutankhamun, a site of extraordinary historical significance.",
                            "Next, visit the grand Temple of Hatshepsut, a remarkable terraced masterpiece dedicated to Egypt's most powerful female ruler.",
                            "Admire the harmonious design that blends seamlessly into the cliffs, reflecting the strength and elegance of this visionary queen.",
                            "Conclude your day with a visit to the towering Colossi of Memnon, two monumental statues that have stood as silent guardians over the Theban necropolis for thousands of years, embodying the grandeur and mystery of ancient Egypt.",
                            "Afterward, transfer to Luxor Airport for your flight back to Cairo, where one last luxurious night at your hotel awaits, offering you a peaceful close to your unforgettable journey."
                        ],
                        ar: [
                            "بعد إفطار لذيذ، انزل لرحلة حصرية إلى بعض من أكثر المواقع قدسية وإلهامًا في مصر.",
                            "ابدأ رحلتك في معبد الكرنك المهيب، أكبر مجمع ديني في العالم القديم.",
                            "امشِ بين أعمدةه الشاهقة ونقوشه المعقدة، كل منها مزين برموز وقصص تتردد عبر تاريخ مصر الغني.",
                            "تقدم أراضي المعبد الشاسعة نظرة آسرة على الحياة الروحية لمصر القديمة.",
                            "استمر إلى وادي الملوك المقدس، حيث وجد أقوى فراعنة مصر مكان راحتهم الأبدية.",
                            "هنا، سيكون لديك access خاص إلى مقابر مختارة، حيث تصور اللوحات الجدارية النابضة بالحياة رحلة الفراعنة إلى الحياة الآخرة.",
                            "يمكنك أيضًا اختيار دخول مقبرة توت عنخ آمون الشهيرة، موقع ذو أهمية تاريخية استثنائية.",
                            "بعد ذلك، قم بزيارة معبد حتشبسوت العظيم، تحفة معمارية مدرجة مذهلة مخصصة لأقوى حاكمة أنثى في مصر.",
                            "انبهر بالتصميم المتناغم الذي يمتزج بسلاسة مع المنحدرات، عاكسًا قوة وأناقة هذه الملكة المبصرة.",
                            "اختتم يومك بزيارة إلى تمثالي ممنون الشاهقين، تمثالان ضخمان وقفا كحراس صامتين على مقبرة طيبة لآلاف السنين، يجسدان عظمة وغموض مصر القديمة.",
                            "بعد ذلك، انتقل إلى مطار الأقصر لرحلة العودة إلى القاهرة، حيث تنتظركم ليلة فاخرة أخيرة في فندقكم، مما يقدم لكم ختامًا هادئًا لرحلتكم التي لا تُنسى."
                        ]
                    }
                },
                {
                    day: 8,
                    title: {
                        es: "Salida de El Cairo – Despedida de Egipto",
                        en: "Departure from Cairo – Farewell to Egypt",
                        ar: "مغادرة القاهرة – وداعًا لمصر"
                    },
                    activities: {
                        es: [
                            "Después de un desayuno bufé final, será trasladado al Aeropuerto Internacional de El Cairo para su vuelo de regreso.",
                            "Mientras se despide de las maravillas eternas de Egipto, nuestro equipo se asegurará de que su partida sea tan suave y cómoda como su llegada.",
                            "Fin de nuestros servicios."
                        ],
                        en: [
                            "After a final buffet breakfast, you'll be transferred to Cairo International Airport for your return flight.",
                            "As you bid farewell to Egypt's timeless wonders, our team will ensure that your departure is as smooth and comfortable as your arrival.",
                            "End of our services."
                        ],
                        ar: [
                            "بعد إفطار بوفيه أخير، سيتم نقلكم إلى مطار القاهرة الدولي لرحلة العودة.",
                            "بينما تودعون عجائب مصر الخالدة، سيتأكد فريقنا من أن مغادرتك سلسة ومريحة مثل وصولك.",
                            "نهاية خدماتنا."
                        ]
                    }
                }
            ],
        servicesIncluded: {
            es: [
                "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para trámites de visa y aduanas.",
                "Vuelos domésticos (El Cairo-Asuán, Luxor-El Cairo).",
                "4 noches de alojamiento en El Cairo con desayuno.",
                "3 noches en un crucero por el Nilo de 5 estrellas con pensión completa (bebidas no incluidas).",
                "2 almuerzos gourmet en restaurantes locales seleccionados.",
                "Traslados privados de lujo entre todos los destinos y aeropuertos.",
                "Visitas según se menciona en el itinerario."
            ],
            en: [
                "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
                "Domestic flights (Cairo-Aswan, Luxor-Cairo).",
                "4 nights of accommodation in Cairo with breakfast.",
                "3 nights on a 5-star Nile cruise with full board (drinks not included).",
                "2 gourmet lunches at selected local restaurants.",
                "Private luxury transfers between all destinations and airports.",
                "Visits as mentioned in the itinerary."
            ],
            ar: [
                "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
                "الرحلات الجوية المحلية (القاهرة - أسوان، الأقصر - القاهرة).",
                "4 ليالٍ في القاهرة مع الإفطار.",
                "3 ليالٍ في رحلة نيلية فاخرة 5 نجوم بنظام الإقامة الكاملة (المشروبات غير مشمولة).",
                "غداءان فاخران في مطاعم محلية مختارة.",
                "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.",
                "الزيارات كما هو مذكور في البرنامج."
            ]

        },
        servicesExcluded: {
            es: ["Vuelos internacionales.", "Visado 25 USD (pagadero a la llegada).", "Propinas para conductores y personal del crucero 60 USD por persona.", "Entradas al interior de las Pirámides y a la Tumba de Tutankamón.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
            en: ["International flights.", "Visa $25 (payable upon arrival).", "Tips for drivers and cruise staff $60 per person.", "Entrance fees to the interiors of the Pyramids and the Tomb of Tutankhamun.", "Optional tours and any visits not mentioned in the program.", "Beverages and personal expenses."],
            ar: ["الرحلات الدولية.", "تأشيرة دخول بقيمة 25 دولارًا (تُدفع عند الوصول).", "إكراميات للسائقين وطاقم الرحلة النيلية بقيمة 60 دولارًا للشخص.", "رسوم دخول داخل الأهرامات وقبر توت عنخ آمون.", "الجولات الاختيارية وأي زيارات غير مذكورة في البرنامج.", "المشروبات والمصروفات الشخصية."]
        },
        importantNotes: {
            es: ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.", "Los precios finales pueden variar debido a cambios en tarifas, impuestos o cargos por combustible.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Las habitaciones triples en cruceros y varios hoteles son habitaciones dobles con una cama adicional.", "Los cruceros desde Luxor salen todos los sábados y lunes."],
            en: ["Guaranteed daily departure with a minimum of 2 people.", "Hotels and cruises may be substituted with others of the same category with prior notice to the client.", "Final prices may vary due to changes in rates, taxes, and/or fuel charges.", "The order of visits may be modified without affecting the trip content.", "Triple rooms in cruises and several hotels are double rooms with an additional bed.", "Cruises from Luxor depart every Saturday and Monday."],
            ar: ["انطلاق يومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة بعد إخطار العميل مسبقًا.", "قد تختلف الأسعار النهائية بسبب تغييرات في الأسعار أو الضرائب أو رسوم الوقود.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "الغرف الثلاثية في الرحلات البحرية وبعض الفنادق هي غرف مزدوجة مع سرير إضافي.", "تنطلق الرحلات النيلية من الأقصر كل يوم سبت واثنين."]
        },
        seasonalPricing: {
            summer: {
                gold: { single: 1670, double: 1400, triple: 1365 },
                diamond: { single: 2185, double: 1690, triple: 1650 }
            },
            winter: {
                gold: { single: 1930, double: 1540, triple: 1500 },
                diamond: { single: 2465, double: 1855, triple: 1815 }
            }
        }
    },




    {
        id: 6,
        name: {
            es: "Esplendores de Egipto",
            en: "Splendors of Egypt",
            ar: "روائع مصر"
        },
        icon: "🌅",
        duration: { days: 9, nights: 8 },
        priceFrom: 1480,
        categories: ["Cultural", "Historical"],
        startCity: { es: "El Cairo", en: "Cairo", ar: "القاهرة" },
        cruiseNights: 4,
        runDays: {
            es: "Martes, Miércoles, Jueves, Viernes, Domingo",
            en: "Tuesday, Wednesday, Thursday, Friday, Sunday",
            ar: "الثلاثاء، الأربعاء، الخميس، الجمعة، الأحد"
        },
        briefDescription: {
            es: "Embárquese en un viaje de 9 días por los Esplendores de Egipto. Explore El Cairo, Luxor, Asuán y Abu Simbel, disfrutando del encanto eterno del Nilo.",
            en: "Embark on a 9-day journey through Egypt’s Splendors. Explore Cairo, Luxor, Aswan, and Abu Simbel while enjoying the eternal charm of the Nile.",
            ar: "انطلق في رحلة لمدة 9 أيام عبر روائع مصر. استكشف القاهرة والأقصر وأسوان وأبو سمبل واستمتع بسحر النيل الخالد."
        },

        generalDescription: {
            es: "Embárquese en un viaje de 9 días a través de las Maravillas de Egipto, donde antiguos prodigios y el encantador Nilo le esperan. Comience su travesía en El Cairo, donde una cálida bienvenida le introduce a esta tierra de atemporal encanto. Contémplese ante las icónicas Pirámides de Giza, maravíllese con la enigmática Esfinge y explore los tesoros del histórico Museo Egipcio, donde los legados de los faraones cobran vida. Desde El Cairo, vuele a Luxor, la ciudad de los templos, donde los monumentales Templos de Luxor y Karnak revelan la grandeza del pasado de Egipto. Suba a bordo de un lujoso crucero de 5 estrellas por el Nilo y deslícese por sus aguas históricas, descubriendo el Valle de los Reyes, lugar de descanso final de los nobles gobernantes de Egipto, y el majestuoso Templo de Hatshepsut tallado en los acantilados. Mientras navega, explore el Templo de Horus en Edfu y los únicos templos duales de Kom Ombo, dedicados a Sobek y Haroeris. Llegue a Asuán para visitar la poderosa Presa Alta y el hermoso Templo de Philae, un sitio de culto y leyenda. Su viaje culmina con los impresionantes Templos de Abu Simbel tallados en la roca, un símbolo perdurable de la grandeza antigua. Concluya esta inolvidable aventura con una última noche en El Cairo, rodeado de los ecos del esplendor de Egipto. Permita que esta gran travesía por las antiguas maravillas de Egipto y el eterno Nilo le deje recuerdos que atesorará para siempre.",
            en: "Embark on a 9-day voyage through the Splendors of Egypt, where ancient wonders and the enchanting Nile await. Begin your journey in Cairo, where a warm welcome introduces you to this land of timeless allure. Stand in awe of the iconic Pyramids of Giza, marvel at the enigmatic Sphinx, and explore the treasures of the historic Egyptian Museum, where pharaohs’ legacies come alive. From Cairo, fly to Luxor, the city of temples, where the monumental Temples of Luxor and Karnak reveal the grandeur of Egypt’s past. Board a luxurious 5-star Nile cruise and drift along the river’s storied waters, discovering the Valley of the Kings, final resting place of Egypt’s noble rulers, and the majestic Temple of Hatshepsut carved into the cliffs. As you sail onward, explore the Temple of Horus at Edfu and the unique dual temples of Kom Ombo, dedicated to Sobek and Haroeris. Arrive in Aswan to visit the mighty High Dam and the beautiful Temple of Philae, a site of worship and legend. Your journey crescendos with the awe-inspiring rock-cut Temples of Abu Simbel, an enduring symbol of ancient grandeur. Conclude this unforgettable adventure with a final night in Cairo, surrounded by the echoes of Egypt’s splendor. Let this grand voyage through Egypt’s ancient wonders and the timeless Nile leave you with memories to treasure forever.",
            ar: "انطلق في رحلة لمدة 9 أيام عبر عجائب مصر، حيث تنتظرك العجائب القديمة والنيل الساحر. ابدأ رحلتك في القاهرة، حيث يرحب بك ترحيب حار في أرض السحر الخالدة. قف بإجلال أمام أهرامات الجيزة الأيقونية، وانبهر بأبو الهول الغامض، واستكشف كنوز المتحف المصري التاريخي، حيث تُحيى تراث الفراعنة. من القاهرة، اطير إلى الأقصر، مدينة المعابد، حيث يكشف معبدا الأقصر والكرنك الهائلان عن عظمة ماضي مصر. استقل رحلة نيلية فاخرة من فئة 5 نجوم وانزلق على طول مياه النيل التارخية، لاكتشاف وادي الملوك، مكان الراحة الأخير لحكام مصر النبلاء، ومعبد حتشبسوت المهيب المنحوت في المنحدرات. بينما تبحر قدمًا، استكشف معبد حورس في إدفو والمعابد المزدوجة الفريدة في كوم أمبو، المكرسة لـ سوبيك وحروريس. وصل إلى أسوان لزيارة السد العالي العملاق ومعبد فيلة الجميل، موقع العبادة والأساطير. تبلغ رحلتك ذروتها مع معابد أبو سمبل المقطوعة في الصخر المذهلة، رمزًا دائمًا للعظمة القديمة. اختتم هذه المغامرة التي لا تُنسى بليلة أخيرة في القاهرة، محاطًا بصدى عظمة مصر. دع هذه الرحلة الكبرى عبر عجائب مصر القديمة والنيل الخالد تتركك بذكريات ستعتز بها إلى الأبد."
        },
        accommodations: {
            gold: [
                { city: { es: "El Cairo", en: "Cairo", ar: "القاهرة" }, hotel: { es: "Helnan Dreamland o similar", en: "Helnan Dreamland or similar", ar: "هيلنان دريم لاند أو ما يعادله" } },
                { city: { es: "Luxor", en: "Luxor", ar: "الأقصر" }, hotel: { es: "Steigenberger Resort Achti o similar", en: "Steigenberger Resort Achti or similar", ar: "شتايجنبرجر أختي أو ما يعادله" } },
                { city: { es: "Crucero por el Nilo", en: "Nile Cruise", ar: "رحلة نيلية" }, hotel: { es: "Le Fayan II o similar", en: "Le Fayan II or similar", ar: "لو فايان 2 أو ما يعادله" } }
            ],
            diamond: [
                { city: { es: "El Cairo", en: "Cairo", ar: "القاهرة" }, hotel: { es: "Fairmont Nile City o similar", en: "Fairmont Nile City or similar", ar: "فيرمونت نايل سيتي أو ما يعادله" } },
                { city: { es: "Luxor", en: "Luxor", ar: "الأقصر" }, hotel: { es: "Steigenberger Resort Achti o similar", en: "Steigenberger Resort Achti or similar", ar: "شتايجنبرجر أختي أو ما يعادله" } },
                { city: { es: "Crucero por el Nilo", en: "Nile Cruise", ar: "رحلة نيلية" }, hotel: { es: "Royal Signature o similar", en: "Royal Signature or similar", ar: "رويال سيغنتشر أو ما يعادله" } }
            ]
        },
        itinerary:
            [
                {
                    "day": 1,
                    "title": {
                        "es": "Llegada a El Cairo – Una Gran Bienvenida",
                        "en": "Arrival in Cairo – A Grand Welcome",
                        "ar": "الوصول إلى القاهرة – ترحيب حار"
                    },
                    "activities": {
                        "es": [
                            "A su llegada al Aeropuerto Internacional de El Cairo, será calurosamente recibido por nuestro equipo dedicado, quien lo asistirá con todos los trámites de visa y aduanas, garantizando una entrada sin problemas y sin esfuerzo a Egipto.",
                            "Relájese con una refrescante bebida de bienvenida mientras nosotros nos ocupamos de los detalles, luego será acompañado en un vehículo de lujo a su hotel.",
                            "Instálese en su habitación, donde lo esperan impresionantes vistas de El Cairo, y relájese con comodidad mientras se prepara para embarcarse en este viaje inolvidable a través de los esplendores eternos de Egipto."
                        ],
                        "en": [
                            "Upon arrival at Cairo International Airport, you'll be warmly greeted by our dedicated team, who will assist with all visa and customs procedures, ensuring a smooth and effortless entry into Egypt.",
                            "Relax with a refreshing welcome drink as we handle the details, then be escorted in a luxury vehicle to your hotel.",
                            "Settle into your room, where stunning views of Cairo await, and unwind in comfort as you prepare to embark on this unforgettable journey through Egypt's timeless splendors."
                        ],
                        "ar": [
                            "عند الوصول إلى مطار القاهرة الدولي، سوف يتم ترحيبكم بحرارة من قبل فريقنا المخصص، الذي سيساعد في جميع إجراءات التأشيرة والجمارك، مما يضمن دخولاً سلساً وخالياً من المتاعب إلى مصر.",
                            "استرخِ مع مشروب ترحيب منعش بينما نحن نتعامل مع التفاصيل، ثم يتم اصطحابكم في مركبة فاخرة إلى فندقكم.",
                            "استقروا في غرفتكم، حيث تنتظركم مناظر خلابة للقاهرة، واسترخوا براحة بينما تستعدون لبدء هذه الرحلة التي لا تنسى عبر عجائب مصر الخالدة."
                        ]
                    }
                },
                {
                    "day": 2,
                    "title": {
                        "es": "El Cairo – Antiguas Maravillas y Tesoros Históricos",
                        "en": "Cairo – Ancient Wonders and Historical Treasures",
                        "ar": "القاهرة – عجائب قديمة وكنوز تاريخية"
                    },
                    "activities": {
                        "es": [
                            "Después de un delicioso desayuno bufé, prepárese para un día inolvidable explorando las antiguas maravillas de El Cairo.",
                            "Comience con una visita a las icónicas Pirámides de Giza: Keops, Kefrén y Micerinos, donde su guía privado le proporcionará acceso a las áreas más impresionantes de estas estructuras monumentales.",
                            "Párese ante la legendaria Esfinge y explore el Templo del Valle de Kefrén, sumergiéndose en los fascinantes rituales y ceremonias funerarias de los faraones.",
                            "A continuación, viaje al Museo Egipcio, un tesoro de la historia de Egipto y hogar de los invaluables artefactos de Tutankamón.",
                            "Disfrute de una visita privada, con información exclusiva sobre las exhibiciones más cautivadoras del museo, cada una revelando el legado y la arte del antiguo Egipto.",
                            "Continúe hacia el histórico Barrio Copto de El Cairo, donde explorará la Iglesia de San Sergio, un santuario donde se cree que la Sagrada Familia buscó refugio durante su viaje por Egipto.",
                            "Haga una pausa para almorzar en un restaurante gourmet cuidadosamente seleccionado, donde disfrutará de auténticos sabores egipcios preparados con experiencia culinaria refinada.",
                            "Regrese a su hotel para una tarde libre a su disposición, con actividades culturales opcionales disponibles para enriquecer aún más su experiencia."
                        ],
                        "en": [
                            "After a delightful buffet breakfast, prepare for an unforgettable day exploring the ancient wonders of Cairo.",
                            "Begin with a visit to the iconic Pyramids of Giza—Khufu, Khafre, and Menkaure—where your private guide will provide access to the most impressive areas of these monumental structures.",
                            "Stand before the legendary Sphinx and explore the Valley Temple of Khafre, immersing yourself in the fascinating rituals and funeral ceremonies of the pharaohs.",
                            "Next, journey to the Egyptian Museum, a treasure trove of Egypt's history and home to the priceless artifacts of Tutankhamun.",
                            "Enjoy a private tour, with exclusive insights into the museum's most captivating exhibits, each revealing the legacy and artistry of ancient Egypt.",
                            "Continue to Cairo's historic Coptic Quarter, where you'll explore the Church of St. Sergius, a sanctuary where the Holy Family is believed to have sought refuge during their journey through Egypt.",
                            "Pause for lunch at a carefully selected gourmet restaurant, where you'll enjoy authentic Egyptian flavors prepared with refined culinary expertise.",
                            "Return to your hotel for a free afternoon at leisure, with optional cultural activities available to further enrich your experience."
                        ],
                        "ar": [
                            "بعد إفطار بوفيه لذيذ، استعد ليوم لا يُنسى تستكشف فيه عجائب القاهرة القديمة.",
                            "ابدأ بزيارة إلى أهرامات الجيزة الأيقونية - خوفو، خفرع، ومنقرع - حيث سيوفر لك مرشدك الخاص الوصول إلى أكثر المناطق إثارة للإعجاب في هذه الهياكل الضخمة.",
                            "قف أمام أبو الهول الأسطوري واستكشف معبد الوادي لخفرع، منغمسًا في الطقوس والحفلات الجنائزية الرائعة للفراعنة.",
                            "بعد ذلك، سافر إلى المتحف المصري، كنز من تاريخ مصر وموطن القطع الأثرية التي لا تقدر بثمن لتوت عنخ آمون.",
                            "استمتع بجولة خاصة، مع رؤى حصرية حول المعروضات الأكثر جذبًا في المتحف، كل منها يكشف عن إرث وفن مصر القديمة.",
                            "استمر إلى الحي القبطي التاريخي في القاهرة، حيث ستستكشف كنيسة القديس سرجيوس، ملاذًا يُعتقد أن العائلة المقدسة لجأت إليه خلال رحلتهم عبر مصر.",
                            "توقف لتناول الغداء في مطعم فاخر تم اختياره بعناية، حيث ستستمتع بالنكهات المصرية الأصيلة المحضرة بخبرة طهوية مكررة.",
                            "عد إلى فندقك لمساء حر في وقت فراغك، مع أنشطة ثقافية اختيارية متاحة لإثراء تجربتك أكثر."
                        ]
                    }
                },
                {
                    "day": 3,
                    "title": {
                        "es": "El Cairo a Luxor – Templos Majestuosos",
                        "en": "Cairo to Luxor – Majestic Temples",
                        "ar": "من القاهرة إلى الأقصر – معابد مهيبة"
                    },
                    "activities": {
                        "es": [
                            "Comience su día con un delicioso desayuno bufé en su hotel. Posteriormente, un traslado privado lo llevará al Aeropuerto Internacional de El Cairo para su vuelo a Luxor.",
                            "A su llegada, será acompañado por un vehículo privado a su hotel en Luxor, donde podrá relajarse y prepararse para una tarde llena de descubrimientos.",
                            "Por la tarde, embárquese en un viaje a través del tiempo mientras explora los magníficos Templos de Luxor y Karnak.",
                            "Descubra la grandeza de la antigua Tebas y maravíllese con el vasto complejo de Karnak, donde columnas elevadas y relieves intrincados se erigen como testimonio de más de 2,000 años de historia y devoción.",
                            "Mientras camina por estos sitios sagrados, sienta la presencia de los poderosos faraones de Egipto que una vez adoraron aquí.",
                            "Regrese a su hotel para una cena privada y elegante, terminando el día con una cocina exquisita y un alojamiento cómodo en Luxor."
                        ],
                        "en": [
                            "Begin your day with a delightful buffet breakfast at your hotel. Afterward, a private transfer will take you to Cairo International Airport for your flight to Luxor.",
                            "Upon arrival, you'll be escorted by private vehicle to your hotel in Luxor, where you can unwind and prepare for an afternoon filled with discovery.",
                            "In the afternoon, embark on a journey through time as you explore the magnificent Temples of Luxor and Karnak.",
                            "Discover the grandeur of ancient Thebes, and marvel at the vast complex of Karnak, where towering columns and intricate reliefs stand as a testament to over 2,000 years of history and devotion.",
                            "As you walk through these sacred sites, feel the presence of Egypt's powerful pharaohs who once worshipped here.",
                            "Return to your hotel for an elegant private dinner, ending the day with exquisite cuisine and comfortable accommodation in Luxor."
                        ],
                        "ar": [
                            "ابدأ يومك مع إفطار بوفيه لذيذ في فندقك. بعد ذلك، سينقلك نقل خاص إلى مطار القاهرة الدولي لرحلة الطيران إلى الأقصر.",
                            "عند الوصول، سيتم اصطحابك بمركبة خاصة إلى فندقك في الأقصر، حيث يمكنك الاسترخاء والاستعداد لظهيرة مليئة بالاكتشاف.",
                            "في فترة الظهيرة، انطلق في رحلة عبر الزمن بينما تستكشف معبدي الأقصر والكرنك المهيبين.",
                            "اكتشف عظمة طيبة القديمة، وانبهر بالمجمع الشاسع للكرنك، حيث تقف الأعمدة الشاهقة والنقوش المعقدة شهادة على أكثر من 2000 عام من التاريخ والتفاني.",
                            "أثناء سيرك عبر هذه المواقع المقدسة، اشعر بوجود فراعنة مصر الأقوياء الذين عبدوا هنا ذات يوم.",
                            "عد إلى فندقك لعشاء خاص وأنيق، منهيًا اليوم بمأكولات رائعة وإقامة مريحة في الأقصر."
                        ]
                    }
                },
                {
                    "day": 4,
                    "title": {
                        "es": "Luxor – Templos de Dendera y Abydos",
                        "en": "Luxor – Temples of Dendera and Abydos",
                        "ar": "الأقصر – معابد دندرة وأبيدوس"
                    },
                    "activities": {
                        "es": [
                            "Comience su día con un delicioso desayuno bufé en su hotel, preparándose para un viaje a los notables Templos de Dendera y Abydos.",
                            "Primero, explore el Templo de Seti I en Abydos, celebrado por su exquisita arquitectura y relieves intrincados. Con su conexión con el Faraón Ramsés II, este templo ocupa un lugar especial en la historia de Egipto como centro de devoción y ritual antiguo.",
                            "A continuación, visite el Templo de Hathor en Dendera, una maravilla arquitectónica que refleja bellamente las influencias artísticas griegas y romanas.",
                            "Admire los vibrantes y bien conservados relieves y los coloridos techos que hacen de este templo una fusión extraordinaria de culturas y un testimonio del legado artístico de Egipto.",
                            "Para el almuerzo, saboree auténticos sabores egipcios en un restaurante gourmet cuidadosamente seleccionado, donde la experiencia culinaria refinada saca lo mejor de la herencia culinaria de Egipto.",
                            "Después de sus visitas al templo, trasládese a su crucero fluvial y zarpe a lo largo del tranquilo y majestuoso Nilo.",
                            "Relájese con la cena a bordo y pase la noche abrazado por el suave flujo del río, rodeado por la belleza eterna de Egipto."
                        ],
                        "en": [
                            "Begin your day with a delightful buffet breakfast at your hotel, preparing for a journey to the remarkable Temples of Dendera and Abydos.",
                            "First, explore the Temple of Seti I in Abydos, celebrated for its exquisite architecture and intricate reliefs. With its connection to Pharaoh Ramses II, this temple holds a special place in Egypt's history as a center of devotion and ancient ritual.",
                            "Next, visit the Temple of Hathor in Dendera, an architectural marvel that beautifully reflects Greek and Roman artistic influences.",
                            "Admire the vibrant, well-preserved reliefs and colorful ceilings that make this temple an extraordinary fusion of cultures and a testament to Egypt's artistic legacy.",
                            "For lunch, savor authentic Egyptian flavors at a carefully selected gourmet restaurant, where refined culinary expertise brings out the best of Egypt's culinary heritage.",
                            "After your temple visits, transfer to your river cruise and set sail along the tranquil, majestic Nile.",
                            "Relax with dinner onboard and spend the night embraced by the gentle flow of the river, surrounded by Egypt's timeless beauty."
                        ],
                        "ar": [
                            "ابدأ يومك مع إفطار بوفيه لذيذ في فندقك، مستعدًا لرحلة إلى معابد دندرة وأبيدوس الرائعة.",
                            "أولاً، استكشف معبد سيتي الأول في أبيدوس، المشهور بهندسته المعمارية الرائعة ونقوشه المعقدة. مع ارتباطه بالفرعون رمسيس الثاني، يحمل هذا المعبد مكانة خاصة في تاريخ مصر كمركز للعبادة والطقوس القديمة.",
                            "بعد ذلك، قم بزيارة معبد حتحور في دندرة، معجزة معمارية تعكس بشكل جميل التأثيرات الفنية اليونانية والرومانية.",
                            "انبهر بالنقوش النابضة بالحياة والمحفوظة جيدًا والأسقف الملونة التي تجعل هذا المعبد مزيجًا استثنائيًا من الثقافات وشهادة على التراث الفني لمصر.",
                            "لتناول الغداء، استمتع بالنكهات المصرية الأصيلة في مطعم فاخر تم اختياره بعناية، حيث تبرز الخبرة الطهوية المكررة أفضل ما في التراث الطهوي المصري.",
                            "بعد زيارات المعابد، انتقل إلى رحلتك النيلية وابحر على طول النيل الهادئ المهيب.",
                            "استرخ مع العشاء على متن السفينة واقض الليلة محاطًا بالتدفق اللطيف للنهر، محاطًا بجمال مصر الخالد."
                        ]
                    }
                },
                {
                    "day": 5,
                    "title": {
                        "es": "Luxor a Esna – Historia y Navegación",
                        "en": "Luxor to Esna – History and Sailing",
                        "ar": "من الأقصر إلى إسنا – تاريخ وإبحار"
                    },
                    "activities": {
                        "es": [
                            "Pensión completa a bordo del crucero.",
                            "Comience su día con una visita al legendario Valle de los Reyes, donde las tumbas de los más grandes faraones de Egipto del Reino Nuevo yacen escondidas en los acantilados.",
                            "Disfrute de acceso especial a algunas de las tumbas más importantes, cada una adornada con vibrantes pinturas murales que representan el viaje de los faraones al más allá.",
                            "También puede optar por entrar a la famosa tumba de Tutankamón (opcional), un sitio de extraordinaria importancia histórica.",
                            "Continúe al Templo de Hatshepsut, una impresionante obra maestra arquitectónica con grandes terrazas que se mezclan perfectamente con los acantilados, honrando a la poderosa gobernante femenina de Egipto.",
                            "Luego, deténgase para admirar los Colosos de Memnón, dos estatuas gigantes que han vigilado la necrópolis tebana durante milenios.",
                            "Regrese al crucero y comience su sereno viaje hacia Esna, pasando por la esclusa mientras se desliza por las tranquilas aguas del Nilo.",
                            "Disfrute de la cena a bordo, seguida de una estancia nocturna pacífica, rodeado por la belleza eterna de Egipto."
                        ],
                        "en": [
                            "Full board onboard the cruise.",
                            "Begin your day with a visit to the legendary Valley of the Kings, where the tombs of Egypt's greatest pharaohs from the New Kingdom lie hidden in the cliffs.",
                            "Enjoy special access to some of the most important tombs, each adorned with vibrant wall paintings depicting the pharaohs' journey to the afterlife.",
                            "You may also choose to enter the famed tomb of Tutankhamun (optional), a site of extraordinary historical significance.",
                            "Continue to the Temple of Hatshepsut, a stunning architectural masterpiece with grand terraces blending seamlessly into the cliffs, honoring Egypt's powerful female ruler.",
                            "Then, stop to admire the Colossi of Memnon, two towering statues that have watched over the Theban necropolis for millennia.",
                            "Return to the cruise and begin your serene journey toward Esna, passing through the lock as you glide along the Nile's tranquil waters.",
                            "Enjoy dinner onboard, followed by a peaceful overnight stay, surrounded by the timeless beauty of Egypt."
                        ],
                        "ar": [
                            "الإقامة كاملة على متن الرحلة النيلية.",
                            "ابدأ يومك بزيارة إلى وادي الملوك الأسطوري، حيث تقبع مقابر أعظم فراعنة مصر من الدولة الحديثة مخبأة في المنحدرات.",
                            "استمتع بالوصول الخاص إلى بعض من أهم المقابر، كل منها مزين بلوحات جدارية نابضة بالحياة تصور رحلة الفراعنة إلى الحياة الآخرة.",
                            "يمكنك أيضًا اختيار دخول مقبرة توت عنخ آمون الشهيرة (اختياري)، موقع ذو أهمية تاريخية استثنائية.",
                            "استمر إلى معبد حتشبسوت، تحفة معمارية مذهلة ذات شرفات كبيرة تندمج بسلاسة مع المنحدرات، تكريمًا للحاكمة الأنثى القوية لمصر.",
                            "ثم توقف للإعجاب بتمثالي ممنون، تمثالان عملاقان يراقبان مقبرة طيبة منذ آلاف السنين.",
                            "عد إلى الرحلة النيلية وابدأ رحلتك الهادئة نحو إسنا، مرورًا بالقفل بينما تنزلق على طول مياه النيل الهادئة.",
                            "استمتع بالعشاء على متن السفينة، يليه إقامة ليلية سلمية، محاطًا بجمال مصر الخالد."
                        ]
                    }
                },
                {
                    "day": 6,
                    "title": {
                        "es": "Esna a Kom Ombo – Templos y Navegación",
                        "en": "Esna to Kom Ombo – Temples and Sailing",
                        "ar": "من إسنا إلى كوم أمبو – معابد وإبحار"
                    },
                    "activities": {
                        "es": [
                            "Pensión completa a bordo del crucero.",
                            "Comience su día con una navegación pacífica hacia Edfu, donde visitará el notable Templo de Horus, uno de los templos mejor conservados de Egipto.",
                            "Retroceda en el tiempo mientras explora este gran templo, dedicado a Horus, el dios con cabeza de halcón de la protección y la realeza, y aprenda sobre su lugar venerado en la mitología del antiguo Egipto.",
                            "Continúe su viaje, navegando hacia Kom Ombo a lo largo del pintoresco Nilo, donde el paisaje revela la belleza de las riberas eternas del río de Egipto.",
                            "Por la tarde, visite el único Templo de Kom Ombo, dedicado a dos deidades: Sobek, el dios cocodrilo, y Haroeris, el dios halcón.",
                            "Este raro diseño de templo dual le permite explorar santuarios y relieves dedicados a cada dios, ofreciendo una visión del panteón complejo y fascinante de Egipto.",
                            "Regrese al crucero para disfrutar de una cena gourmet a bordo mientras navega hacia Asuán, saboreando una cocina exquisita mientras está rodeado por la serena belleza del Nilo por la noche."
                        ],
                        "en": [
                            "Full board onboard the cruise.",
                            "Begin your day with a peaceful sail to Edfu, where you'll visit the remarkable Temple of Horus, one of the best-preserved temples in Egypt.",
                            "Step back in time as you explore this grand temple, dedicated to Horus, the falcon-headed god of protection and kingship, and learn about his revered place in ancient Egyptian mythology.",
                            "Continue your journey, sailing toward Kom Ombo along the scenic Nile, where the landscape reveals the beauty of Egypt's timeless riverbanks.",
                            "In the afternoon, visit the unique Temple of Kom Ombo, dedicated to two deities: Sobek, the crocodile god, and Haroeris, the falcon god.",
                            "This rare dual-temple design allows you to explore shrines and reliefs dedicated to each god, offering insight into Egypt's complex and fascinating pantheon.",
                            "Return to the cruise to enjoy a gourmet dinner onboard as you sail toward Aswan, savoring exquisite cuisine while surrounded by the serene beauty of the Nile at night."
                        ],
                        "ar": [
                            "الإقامة كاملة على متن الرحلة النيلية.",
                            "ابدأ يومك بإبحار هادئ إلى إدفو، حيث ستزور معبد حورس الرائع، أحد أفضل المعابد حفظًا في مصر.",
                            "عد بالزمن إلى الوراء بينما تستكشف هذا المعبد العظيم، المخصص لحورس، إله الحماية والملكية برأس الصقر، وتعلم عن مكانته الموقرة في ميثولوجيا مصر القديمة.",
                            "واصل رحلتك، مبحرًا نحو كوم أمبو على طول النيل الخلاب، حيث يكشف المشهد عن جمال ضفاف النيل الخالدة في مصر.",
                            "في فترة الظهيرة، قم بزيارة معبد كوم أمبو الفريد، المخصص لاثنين من الآلهة: سوبek، إله التمساح، وحروريس، إله الصقر.",
                            "يسمح لك هذا التصميم النادر للمعبد المزدوج باستكشاف الأضرحة والنقوش المخصصة لكل إله، مما يقدم نظرة ثاقبة على البانثيون المعقد والرائع لمصر.",
                            "عد إلى الرحلة النيلية للاستمتاع بعشاء فاخر على متن السفينة بينما تبحر نحو أسوان، متذوقًا المأكولات الرائعة بينما أنت محاط بالجمال الهادئ للنيل ليلاً."
                        ]
                    }
                },
                {
                    "day": 7,
                    "title": {
                        "es": "Kom Ombo a Asuán – Belleza Nubia y Cultura Antigua",
                        "en": "Kom Ombo to Aswan – Nubian Beauty and Ancient Culture",
                        "ar": "من كوم أمبو إلى أسوان – جمال نوبي وثقافة قديمة"
                    },
                    "activities": {
                        "es": [
                            "Pensión completa a bordo del crucero.",
                            "Comience el día con una visita a la impresionante Presa Alta de Asuán, una maravilla de la ingeniería moderna que transformó la agricultura y la producción de electricidad de Egipto, remodelando la relación entre el Nilo y el pueblo de Egipto.",
                            "A continuación, viaje al encantador Templo de Philae, dedicado a la diosa Isis.",
                            "Accesible solo en barco, este templo está situado en una pequeña isla, rodeado por las pacíficas aguas del Nilo. Su encanto y belleza seguramente dejarán una impresión duradera mientras explora sus salas sagradas y relieves intrincados.",
                            "Por la tarde, experimente la serenidad del Nilo en un paseo en faluca alrededor de la Isla Elefantina, donde verá el Mausoleo de Aga Khan y el frondoso Jardín Botánico.",
                            "Para aquellos interesados en una experiencia cultural aún más profunda, está disponible una visita opcional a la Aldea Nubia, donde puede sumergirse en las vibrantes tradiciones y arte de la cultura nubia.",
                            "Termine el día con una cena gourmet y una estancia nocturna a bordo del crucero en Asuán, abrazando el encanto de la belleza sureña de Egipto."
                        ],
                        "en": [
                            "Full board onboard the cruise.",
                            "Begin the day with a visit to the impressive Aswan High Dam, a modern engineering marvel that transformed Egypt's agriculture and electricity production, reshaping the relationship between the Nile and the people of Egypt.",
                            "Next, journey to the enchanting Temple of Philae, dedicated to the goddess Isis.",
                            "Accessible only by boat, this temple is set on a small island, surrounded by the peaceful waters of the Nile. Its charm and beauty are sure to leave a lasting impression as you explore its sacred halls and intricate reliefs.",
                            "In the afternoon, experience the serenity of the Nile on a felucca ride around Elephantine Island, where you'll view the Agha Khan Mausoleum and the lush Botanical Garden.",
                            "For those interested in an even deeper cultural experience, an optional visit to the Nubian Village is available, where you can immerse yourself in the vibrant traditions and artistry of Nubian culture.",
                            "End the day with a gourmet dinner and an overnight stay onboard the cruise in Aswan, embracing the allure of Egypt's southern beauty."
                        ],
                        "ar": [
                            "الإقامة كاملة على متن الرحلة النيلية.",
                            "ابدأ اليوم بزيارة إلى السد العالي بأسوان المثير للإعجاب، معجزة هندسية حديثة غيرت الزراعة وإنتاج الكهرباء في مصر، أعادت تشكيل العلاقة بين النيل وشعب مصر.",
                            "بعد ذلك، سافر إلى معبد فيلة الساحر، المخصص للإلهة إيزيس.",
                            "يمكن الوصول إليه فقط بالقارب، يقع هذا المعبد على جزيرة صغيرة، محاط بمياه النيل الهادئة. من المؤكد أن سحره وجماله سيبقان انطباعًا دائمًا بينما تستكشف قاعاته المقدسة ونقوشه المعقدة.",
                            "في فترة الظهيرة، جرب هدوء النيل في رحلة فلوكا حول جزيرة إلفنتين، حيث سترى ضريح آغا خان والحديقة النباتية الخضراء.",
                            "لأولئك المهتمين بتجربة ثقافية أعمق، توجد زيارة اختيارية للقرية النوبية، حيث يمكنك الانغماس في التقاليد النابضة بالحياة وفن الثقافة النوبية.",
                            "انهي اليوم بعشاء فاخر وإقامة ليلية على متن الرحلة النيلية في أسوان، متبنياً سحر جمال جنوب مصر."
                        ]
                    }
                },
                {
                    "day": 8,
                    "title": {
                        "es": "Asuán a El Cairo – Maravillas de Abu Simbel",
                        "en": "Aswan to Cairo – Wonders of Abu Simbel",
                        "ar": "من أسوان إلى القاهرة – عجائب أبو سمبل"
                    },
                    "activities": {
                        "es": [
                            "Después de un desayuno tranquilo, desembarque y emprenda una excursión privada a los impresionantes Templos de Abu Simbel, una verdadera maravilla arquitectónica y uno de los mejores tesoros de Egipto.",
                            "Estos templos monumentales, tallados en la roca por Ramsés II, honran tanto al faraón como a su reina, Nefertari, con estatuas colosales que se erigen como símbolos perdurables del poder y la devoción antiguos.",
                            "Mientras explora este magnífico sitio, será testigo de primera mano de uno de los momentos más notables de su viaje.",
                            "Después de su visita, trasládese al Aeropuerto de Asuán para su vuelo de regreso a El Cairo.",
                            "A su llegada, será acompañado a su hotel, donde puede relajarse y reflexionar sobre su viaje con una última noche en esta ciudad cautivadora."
                        ],
                        "en": [
                            "After a leisurely breakfast, disembark and embark on a private excursion to the awe-inspiring Temples of Abu Simbel, a true architectural marvel and one of Egypt's finest treasures.",
                            "These monumental temples, carved into the rock by Ramses II, honor both the pharaoh and his queen, Nefertari, with colossal statues that stand as enduring symbols of ancient power and devotion.",
                            "As you explore this magnificent site, you'll witness firsthand one of the most remarkable highlights of your journey.",
                            "Following your visit, transfer to Aswan Airport for your flight back to Cairo.",
                            "Upon arrival, you'll be escorted to your hotel, where you can unwind and reflect on your journey with one final night in this captivating city."
                        ],
                        "ar": [
                            "بعد إفطار مريح، انزل وانطلق في رحلة خاصة إلى معابد أبو سمبل المذهلة، معجزة معمارية حقيقية وواحد من أروع كنوز مصر.",
                            "هذه المعابد الضخمة، التي نحتت في الصخر من قبل رمسيس الثاني، تكرم كل من الفرعون وملكته، نفرتاري، بتماثيل عملاقة تقف كرموز دائمة للقوة والتفاني القديمين.",
                            "أثناء استكشافك لهذا الموقع الرائع، ستشهد مباشرة أحد أبرز معالم رحلتك.",
                            "بعد زيارتك، انتقل إلى مطار أسوان لرحلة العودة إلى القاهرة.",
                            "عند الوصول، سيتم اصطحابك إلى فندقك، حيث يمكنك الاسترخاء والتأمل في رحلتك بليلة أخيرة في هذه المدينة الآسرة."
                        ]
                    }
                },
                {
                    "day": 9,
                    "title": {
                        "es": "Despedida de El Cairo – Fin del Viaje",
                        "en": "Farewell to Cairo – End of the Journey",
                        "ar": "وداع القاهرة – نهاية الرحلة"
                    },
                    "activities": {
                        "es": [
                            "Después de un delicioso desayuno bufé, será trasladado cómodamente al Aeropuerto Internacional de El Cairo.",
                            "Nuestro equipo atenderá cada detalle, asegurando que su salida sea tan fluida y sin estrés como su llegada, permitiéndole despedirse de Egipto con facilidad.",
                            "Fin de nuestros servicios."
                        ],
                        "en": [
                            "After a delightful buffet breakfast, you'll be transferred in comfort to Cairo International Airport.",
                            "Our team will attend to every detail, ensuring your departure is as seamless and stress-free as your arrival, allowing you to bid farewell to Egypt with ease.",
                            "End of our services."
                        ],
                        "ar": [
                            "بعد إفطار بوفيه لذيذ، سيتم نقللك براحة إلى مطار القاهرة الدولي.",
                            "سيهتم فريقنا بكل التفاصيل، مما يضمن أن مغادرتك سلسة وخالية من الإجهاد مثل وصولك، مما يسمح لك بتوديع مصر بسهولة.",
                            "نهاية خدماتنا."
                        ]
                    }
                }
            ],

        servicesIncluded: {
            "es": [
                "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para trámites de visa y aduanas.",
                "Vuelos domésticos (El Cairo – Luxor, Asuán – El Cairo).",
                "3 noches de alojamiento en El Cairo con desayuno.",
                "1 noche de alojamiento en Luxor con media pensión (desayuno y cena incluidos).",
                "4 noches en un crucero por el Nilo de 5 estrellas con pensión completa (bebidas no incluidas).",
                "2 almuerzos gourmet en restaurantes locales seleccionados.",
                "Traslados privados de lujo entre todos los destinos y aeropuertos.",
                "Visitas según se menciona en el itinerario."
            ],
            "en": [
                "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
                "Domestic flights (Cairo – Luxor, Aswan – Cairo).",
                "3 nights of accommodation in Cairo with breakfast.",
                "1 night of accommodation in Luxor with half board (breakfast and dinner included).",
                "4 nights on a 5-star Nile cruise with full board (drinks not included).",
                "2 gourmet lunch at selected local restaurant.",
                "Private luxury transfers between all destinations and airports.",
                "Visits as mentioned in the itinerary."
            ],
            "ar": [
                "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
                "الرحلات الجوية المحلية (القاهرة – الأقصر، أسوان – القاهرة).",
                "3 ليالٍ في القاهرة مع الإفطار.",
                "ليلة واحدة في الأقصر بنظام نصف إقامة (الإفطار والعشاء مشمولان).",
                "4 ليالٍ في رحلة نيلية فاخرة 5 نجوم بنظام الإقامة الكاملة (المشروبات غير مشمولة).",
                "غداءان فاخران في مطعم محلي مختار.",
                "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.",
                "الزيارات كما هو مذكور في البرنامج."
            ]
        }
        ,
        servicesExcluded: {
            "es": ["Vuelos internacionales.", "Visado 25 USD (pagadero a la llegada).", "Propinas para conductores y personal del crucero 60 USD por persona.", "Entradas al interior de las Pirámides y a la Tumba de Tutankamón.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
            "en": ["International flights.", "Visa $25 (payable upon arrival).", "Tips for drivers and cruise staff $60 per person.", "Entrance fees to the interiors of the Pyramids and the Tomb of Tutankhamun.", "Optional tours and any visits not mentioned in the program.", "Beverages and personal expenses."],
            "ar": ["الرحلات الدولية.", "تأشيرة دخول بقيمة 25 دولارًا (تُدفع عند الوصول).", "إكراميات للسائقين وطاقم الرحلة النيلية بقيمة 60 دولارًا للشخص.", "رسوم دخول داخل الأهرامات وقبر توت عنخ آمون.", "الجولات الاختيارية وأي زيارات غير مذكورة في البرنامج.", "المشروبات والمصروفات الشخصية."]
        },
        importantNotes: {
            "es": ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.", "Los precios finales pueden variar debido a cambios en tarifas, impuestos o cargos por combustible.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Las habitaciones triples en cruceros y varios hoteles son habitaciones dobles con una cama adicional.", "Los cruceros desde Luxor salen todos los sábados y lunes."],
            "en": ["Guaranteed daily departure with a minimum of 2 people.", "Hotels and cruises may be substituted with others of the same category with prior notice to the client.", "Final prices may vary due to changes in rates, taxes, and/or fuel charges.", "The order of visits may be modified without affecting the trip content.", "Triple rooms in cruises and several hotels are double rooms with an additional bed.", "Cruises from Luxor depart every Saturday and Monday."],
            "ar": ["انطلاق يومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة بعد إخطار العميل مسبقًا.", "قد تختلف الأسعار النهائية بسبب تغييرات في الأسعار أو الضرائب أو رسوم الوقود.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "الغرف الثلاثية في الرحلات البحرية وبعض الفنادق هي غرف مزدوجة مع سرير إضافي.", "تنطلق الرحلات النيلية من الأقصر كل يوم سبت واثنين."]
        },
        seasonalPricing: {
            summer: {
                gold: { single: 1880, double: 1520, triple: 1480 },
                diamond: { single: 2275, double: 1760, triple: 1720 }
            },
            winter: {
                gold: { single: 2130, double: 1675, triple: 1635 },
                diamond: { single: 2610, double: 1955, triple: 1915 }
            }
        }
    },






    {
        id: 7,
        name: {
            "es": "La Majestad del Nilo",
            "en": "Majesty of the Nile",
            "ar": "عظمة النيل"
        },
        icon: "🏺",
        duration: { "days": 10, "nights": 9 },
        priceFrom: 1720,
        categories: ["Cultural", "Historical"],
        startCity: { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" },
        cruiseNights: 4,
        runDays: {
            "es": "Martes, Miércoles, Jueves, Viernes, Domingo",
            "en": "Tuesday, Wednesday, Thursday, Friday, Sunday",
            "ar": "الثلاثاء، الأربعاء، الخميس، الجمعة، الأحد"
        },
        briefDescription: {
            "es": "Embárquese en una odisea de 10 días a través de Egipto, explorando las Pirámides, Luxor, Asuán y Abu Simbel en un viaje lleno de historia y majestuosidad.",
            "en": "Embark on a 10-day odyssey through Egypt, exploring the Pyramids, Luxor, Aswan, and Abu Simbel in a journey filled with history and majesty.",
            "ar": "انطلق في رحلة مدتها 10 أيام عبر مصر، تستكشف خلالها الأهرامات والأقصر وأسوان وأبو سمبل في رحلة مليئة بالتاريخ والعظمة."
        },
        generalDescription: {
            "es": "Emprenda una odisea de 10 días por Egipto, donde las antiguas maravillas y los majestuosos templos cuentan historias de una civilización que ha cautivado al mundo. Comience con una cálida bienvenida en El Cairo y ponga un pie entre las eternas Pirámides de Giza, mire a los ojos de la enigmática Esfinge y descubra los tesoros del Museo Egipcio, cada artefacto una puerta al pasado legendario de Egipto. Desde El Cairo, vuele a Luxor, la antigua ciudad de Tebas, donde le esperan los impresionantes templos de Karnak y Luxor. Embarque en un crucero por el Nilo y deje que la suave corriente del río lo guíe hacia sitios sagrados, incluido el Valle de los Reyes, el elegante Templo de Hatshepsut enclavado contra altos acantilados y los imponentes Colosos de Memnón que vigilan la tierra de los faraones. Continúe su viaje por el Nilo, deteniéndose en Edfu y Kom Ombo, donde explorará algunos de los templos mejor conservados de Egipto, dedicados a los dioses que una vez gobernaron estas tierras. Al llegar a Asuán, visite el etéreo Templo de Filae, que se alza como una visión desde las aguas, y maravíllese con la grandeza de los templos tallados en roca de Abu Simbel, testimonio del inigualable poder arquitectónico del antiguo Egipto. Regrese a El Cairo para una despedida inolvidable, llevándose consigo recuerdos de un viaje impregnado de la belleza y la majestuosidad eternas de Egipto.",
            "en": "Embark on a 10-day odyssey through Egypt, where ancient wonders and majestic temples tell tales of a civilization that has captivated the world. Begin with a warm welcome in Cairo, and set foot among the timeless Pyramids of Giza, gaze into the eyes of the enigmatic Sphinx, and uncover the treasures of the Egyptian Museum, each artifact a gateway to Egypt’s storied past. From Cairo, fly to Luxor—the ancient city of Thebes—where the awe-inspiring Temples of Karnak and Luxor await. Board a luxurious Nile cruise, and let the river’s gentle current guide you to sacred sites, including the Valley of the Kings, the elegant Temple of Hatshepsut nestled against towering cliffs, and the imposing Colossi of Memnon, standing watch over the land of the pharaohs. Continue your journey along the Nile, stopping at Edfu and Kom Ombo, where you’ll explore some of Egypt’s most well-preserved temples, dedicated to gods who once ruled these lands. Arriving in Aswan, visit the ethereal Temple of Philae, rising like a vision from the waters, and marvel at the grandeur of the rock-cut Temples of Abu Simbel, a testament to ancient Egypt’s unmatched architectural prowess. Return to Cairo for an unforgettable farewell, carrying with you memories of a journey steeped in the timeless beauty and majesty of Egypt.",
            "ar": "انطلق في رحلة تستمر عشرة أيام عبر مصر، حيث تروي العجائب القديمة والمعابد المهيبة قصص حضارة أسرت العالم. ابدأ باستقبال دافئ في القاهرة، وسِر بين أهرامات الجيزة الخالدة، وانظر في عيني أبي الهول الغامض، واكتشف كنوز المتحف المصري، حيث يمثل كل قطعة أثرية بوابة إلى تاريخ مصر العريق. من القاهرة، سافر إلى الأقصر، المدينة القديمة طيبة، حيث تنتظرك معابد الكرنك والأقصر المهيبة. استقل رحلة نيلية فاخرة ودع تيار النيل الهادئ يقودك إلى المواقع المقدسة، بما في ذلك وادي الملوك ومعبد حتشبسوت الأنيق المحاط بالمنحدرات الشاهقة وتماثيل ممنون الشامخة التي تحرس أرض الفراعنة. واصل رحلتك على طول النيل متوقفًا عند إدفو وكوم أمبو، حيث ستستكشف بعضًا من أكثر المعابد المصرية حفظًا والمكرسة للآلهة الذين حكموا هذه الأرض. عند وصولك إلى أسوان، زر معبد فيلة الساحر الذي ينهض من بين المياه كأنه رؤية، وتأمل عظمة معابد أبو سمبل المنحوتة في الصخور، شهادة على براعة العمارة المصرية القديمة التي لا مثيل لها. عد إلى القاهرة لوداع لا يُنسى محملًا بذكريات رحلة غارقة في الجمال والعظمة الأبدية لمصر."
        },
        accommodations: {
            "gold": [
                { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Helnan Dreamland o similar", "en": "Helnan Dreamland or similar", "ar": "هيلنان دريم لاند أو ما يعادله" } },
                { "city": { "es": "Luxor", "en": "Luxor", "ar": "الأقصر" }, "hotel": { "es": "Steigenberger Resort Achti o similar", "en": "Steigenberger Resort Achti or similar", "ar": "شتايجنبرجر أختي أو ما يعادله" } },
                { "city": { "es": "Abu Simbel", "en": "Abu Simbel", "ar": "أبو سمبل" }, "hotel": { "es": "Eskaleh Eco-Lodge o similar", "en": "Eskaleh Eco-Lodge or similar", "ar": "إسكاليه إيكو لودج أو ما يعادله" } },
                { "city": { "es": "Crucero por el Nilo", "en": "Nile Cruise", "ar": "رحلة نيلية" }, "hotel": { "es": "Le Fayan II o similar", "en": "Le Fayan II or similar", "ar": "لو فايان 2 أو ما يعادله" } }
            ],
            "diamond": [
                { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Fairmont Nile City o similar", "en": "Fairmont Nile City or similar", "ar": "فيرمونت نايل سيتي أو ما يعادله" } },
                { "city": { "es": "Luxor", "en": "Luxor", "ar": "الأقصر" }, "hotel": { "es": "Steigenberger Resort Achti o similar", "en": "Steigenberger Resort Achti or similar", "ar": "شتايجنبرجر أختي أو ما يعادله" } },
                { "city": { "es": "Abu Simbel", "en": "Abu Simbel", "ar": "أبو سمبل" }, "hotel": { "es": "Seti Abu Simbel Lake Resort o similar", "en": "Seti Abu Simbel Lake Resort or similar", "ar": "ستي أبو سمبل ليك ريزورت أو ما يعادله" } },
                { "city": { "es": "Crucero por el Nilo", "en": "Nile Cruise", "ar": "رحلة نيلية" }, "hotel": { "es": "Royal Signature o similar", "en": "Royal Signature or similar", "ar": "رويال سيغنتشر أو ما يعادله" } }
            ]
        },
        itinerary: [
            {
                "day": 1,
                "title": {
                    "es": "Llegada a El Cairo – Una Gran Bienvenida",
                    "en": "Arrival in Cairo – A Grand Welcome",
                    "ar": "الوصول إلى القاهرة – ترحيب حار"
                },
                "activities": {
                    "es": [
                        "A su llegada al Aeropuerto Internacional de El Cairo, nuestro equipo dedicado estará listo para asistirle con los trámites de visa y aduanas, garantizando una entrada sin problemas a Egipto.",
                        "Disfrute de bebidas refrescantes y una cálida recepción que encarna la hospitalidad egipcia.",
                        "Un vehículo privado de lujo lo trasladará a su hotel, donde le espera un check-in personalizado que marca el tono para un viaje inolvidable.",
                        "Instálese en su habitación elegantemente equipada y relájese, sumergiéndose en la comodidad mientras se prepara para las maravillas por venir."
                    ],
                    "en": [
                        "Upon arrival at Cairo International Airport, our dedicated team will be ready to assist you with visa and customs procedures, ensuring a smooth and effortless entry into Egypt.",
                        "Enjoy refreshing beverages and a warm reception that embodies Egyptian hospitality.",
                        "A luxury private vehicle will transfer you to your hotel, where a personalized check-in awaits, setting the tone for an unforgettable journey.",
                        "Settle into your elegantly appointed room and unwind, immersing yourself in comfort as you prepare for the wonders to come."
                    ],
                    "ar": [
                        "عند الوصول إلى مطار القاهرة الدولي، سيكون فريقنا المخصص جاهزًا لمساعدتك في إجراءات الفيزا والجمارك، مما يضمن دخولاً سلسًا وبلا عناء إلى مصر.",
                        "استمتع بمشروبات منعشة واستقبال حار يجسد كرم الضيافة المصرية.",
                        "ستنقلك سيارة فاخرة خاصة إلى فندقك، حيث ينتظرك تسجيل وصول شخصي يضع نغمة رحلة لا تُنسى.",
                        "استقر في غرفتك المجهزة بأناقة واسترخِ، منغمسًا في الراحة بينما تستعد لعجائب الرحلة القادمة."
                    ]
                }
            },
            {
                "day": 2,
                "title": {
                    "es": "Las Majestuosas Pirámides y los Tesoros del Antiguo Egipto",
                    "en": "The Majestic Pyramids and Treasures of Ancient Egypt",
                    "ar": "الأهرامات المهيبة وكنوز مصر القديمة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un delicioso desayuno bufé antes de embarcarse en una visita privada para explorar las legendarias Pirámides de Giza: Keops, Kefrén y Micerinos, una de las Siete Maravillas del Mundo Antiguo.",
                        "Maravíllese con la grandeza eterna de estas estructuras monumentales, cada una de ellas un testimonio de la notable historia de Egipto.",
                        "A continuación, visite la icónica Esfinge y el Templo del Valle de Kefrén, donde su guía personalizado compartirá información cultural, dando vida a los misterios de esta antigua civilización.",
                        "Continúe su viaje a través de la historia con una visita al Museo Egipcio, hogar de los fascinantes tesoros de Tutankamón y una colección inigualable de artefactos que abarca milenios.",
                        "Esta experiencia cuidadosamente seleccionada ofrece una visión única del pasado lleno de historia de Egipto.",
                        "Haga una pausa para un almuerzo gourmet en un renombrado restaurante local, donde las tradiciones culinarias egipcias se encuentran con sabores refinados para una experiencia gastronómica inolvidable.",
                        "Por la tarde, explore el Barrio Copto de El Cairo, donde visitará la Iglesia de San Sergio, un santuario reverenciado donde se cree que la Sagrada Familia encontró refugio durante su estancia en Egipto.",
                        "Regrese a su hotel para relajarse, u opte por una exploración nocturna de la vibrante vida nocturna de El Cairo, con recomendaciones personalizadas de nuestro equipo."
                    ],
                    "en": [
                        "Start your day with a delicious buffet breakfast before embarking on a private tour to explore the legendary Pyramids of Giza—Khufu, Khafre, and Menkaure—one of the Seven Wonders of the Ancient World.",
                        "Marvel at the timeless grandeur of these monumental structures, each one a testament to Egypt's remarkable history.",
                        "Next, visit the iconic Sphinx and the Valley Temple of Khafre, where your personalized guide will share cultural insights, bringing to life the mysteries of this ancient civilization.",
                        "Continue your journey through history with a visit to the Egyptian Museum, home to the fascinating treasures of Tutankhamun and an unparalleled collection of artifacts spanning millennia.",
                        "This curated experience offers a unique glimpse into Egypt's storied past.",
                        "Pause for a gourmet lunch at a renowned local restaurant, where Egyptian culinary traditions meet refined flavors for an unforgettable dining experience.",
                        "In the afternoon, explore Cairo's Coptic Quarter, where you'll visit the Church of St. Sergius, a revered sanctuary where the Holy Family is believed to have found refuge during their time in Egypt.",
                        "Return to your hotel to relax, or opt for an evening exploration of Cairo's vibrant nightlife, with personalized recommendations from our team."
                    ],
                    "ar": [
                        "ابدأ يومك مع إفطار بوفيه لذيذ قبل الشروع في جولة خاصة لاستكشاف أهرامات الجيزة الأسطورية - خوفو، وخفرع، ومنقرع - إحدى عجائب الدنيا السبع في العالم القديم.",
                        "انبهر بالعظمة الخالدة لهذه الهياكل الضخمة، كل منها شهادة على تاريخ مصر الملحوظ.",
                        "بعد ذلك، قم بزيارة أبو الهول الأيقوني ومعبد الوادي لخفرع، حيث سيشاركك مرشدك الشخصي رؤى ثقافية، مجسدًا أسرار هذه الحضارة القديمة.",
                        "واصل رحلتك عبر التاريخ بزيارة المتحف المصري، موطن كنوز توت عنخ آمون الرائعة ومجموعة لا مثيل لها من القطع الأثرية التي تمتد عبر آلاف السنين.",
                        "تقدم هذه التجربة المُعدة خصيصًا نظرة فريدة على ماضي مصر الحافل.",
                        "توقف لتناول غداء جورمي في مطعم محلي مشهور، حيث تلتقي التقاليد الطهوية المصرية بالنكهات المكررة لتجربة طعام لا تُنسى.",
                        "في فترة الظهيرة، استكشف الحي القبطي في القاهرة، حيث ستزور كنيسة القديس سرجيوس، ملاذًا موقرًا يُعتقد أن العائلة المقدسة وجدت فيه ملاذًا خلال وجودها في مصر.",
                        "عد إلى فندقك للاسترخاء، أو اختر استكشاف حياة القاهرة الليلية النابضة بالحياة، مع توصيات مخصصة من فريقنا."
                    ]
                }
            },
            {
                "day": 3,
                "title": {
                    "es": "De El Cairo a Luxor – El Corazón de la Antigua Tebas",
                    "en": "Cairo to Luxor – The Heart of Ancient Thebes",
                    "ar": "من القاهرة إلى الأقصر – قلب طيبة القديمة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un delicioso desayuno bufé en su hotel antes de que un traslado privado lo lleve al Aeropuerto de El Cairo para tomar su vuelo a Luxor.",
                        "A su llegada, un vehículo privado estará listo para escoltarle a su hotel, donde será recibido con atención personalizada y un itinerario a medida que garantiza que su estancia en Luxor se ajuste a sus preferencias.",
                        "Por la tarde, embárquese en una visita privada a los magníficos Templos de Luxor y Karnak, el complejo monumental más grande del mundo antiguo.",
                        "Llegando cuando el sol comienza a ponerse, explorará estos impresionantes templos en una atmósfera serena, mientras la luz dorada realza su atractivo místico y su pasado histórico.",
                        "Después, regrese a su hotel para cenar. Disfrute de una experiencia gastronómica exclusiva diseñada para mostrar los ricos sabores de la cocina egipcia, preparada con destreza gourmet para una velada inolvidable."
                    ],
                    "en": [
                        "Begin your day with a delicious buffet breakfast at your hotel before a private transfer takes you to Cairo Airport for your flight to Luxor.",
                        "Upon arrival, a private vehicle will be ready to escort you to your hotel, where you'll be greeted with personalized attention and a tailored itinerary that ensures your stay in Luxor aligns with your preferences.",
                        "In the afternoon, embark on a private visit to the magnificent Temples of Luxor and Karnak, the largest monumental complex of the ancient world.",
                        "Arriving as the sun begins to set, you'll explore these awe-inspiring temples in a serene atmosphere, as the golden light enhances their mystical allure and storied past.",
                        "Afterward, return to your hotel for dinner. Enjoy an exclusive dining experience designed to showcase the rich flavors of Egyptian cuisine, prepared with gourmet finesse for an unforgettable evening."
                    ],
                    "ar": [
                        "ابدأ يومك مع إفطار بوفيه لذيذ في فندقك قبل أن ينقلك نقل خاص إلى مطار القاهرة لرحلة الطيران إلى الأقصر.",
                        "عند الوصول، ستكون سيارة خاصة جاهزة لاصطحابك إلى فندقك، حيث سيتم استقبالك باهتمام شخصي وجدول زمني مخصص يضمن أن إقامتك في الأقصر تتماشى مع تفضيلاتك.",
                        "في فترة الظهيرة، انطلق في زيارة خاصة لمعبدي الأقصر والكرنك المهيبين، أكبر مجمع أثري في العالم القديم.",
                        "مع بدء غروب الشمس، ستستكشف هذه المعابد المذهلة في أجواء هادئة، بينما يعزز الضوء الذهبي جاذبيتها الغامضة وماضيها الحافل.",
                        "بعد ذلك، عد إلى فندقك لتناول العشاء. استمتع بتجربة طعام حصرية مصممة لعرض النكهات الغنية للمطبخ المصري، مُعدة بروعة الطهاة لمساء لا يُنسى."
                    ]
                }
            },
            {
                "day": 4,
                "title": {
                    "es": "Luxor – Templos de Dendera y Abydos",
                    "en": "Luxor – Temples of Dendera and Abydos",
                    "ar": "الأقصر – معابد دندرة وأبيدوس"
                },
                "activities": {
                    "es": [
                        "Comience su día con un delicioso desayuno bufé en su hotel, preparándose para un viaje a dos de los templos más fascinantes e históricamente ricos de Egipto: Dendera y Abydos.",
                        "Comience con una visita al Templo de Seti I en Abydos, un sitio sagrado dedicado al padre de Ramsés II. Este templo es conocido por sus intrincados relieves y ocupa un lugar especial en la historia de Egipto como centro de devoción y ritual.",
                        "A continuación, diríjase al Templo de Hathor en Dendera, una joya arquitectónica única celebrada por sus influencias griegas y romanas.",
                        "Admire los vívidos y bien conservados relieves y los coloridos techos, que combinan el arte de dos civilizaciones en una impresionante exhibición.",
                        "Para el almuerzo, saboree auténticos sabores egipcios en un restaurante gourmet cuidadosamente seleccionado, donde la experiencia culinaria refinada saca lo mejor de la herencia culinaria de Egipto.",
                        "Después de sus visitas al templo, trasládese a su crucero fluvial y zarpe a lo largo del tranquilo y majestuoso Nilo.",
                        "Relájese con la cena a bordo, cenando bajo las estrellas mientras se desliza por el legendario río de Egipto.",
                        "Pase la noche abrazado por el suave flujo del Nilo, rodeado por la belleza eterna de Egipto."
                    ],
                    "en": [
                        "Start your day with a delightful buffet breakfast at your hotel, preparing you for a journey to two of Egypt's most fascinating and historically rich temples: Dendera and Abydos.",
                        "Begin with a visit to the Temple of Seti I in Abydos, a sacred site dedicated to the father of Ramses II. This temple is renowned for its intricate reliefs and holds a special place in Egypt's history as a center of devotion and ritual.",
                        "Next, head to the Temple of Hathor in Dendera, a unique architectural gem celebrated for its Greek and Roman influences.",
                        "Admire the vivid, well-preserved reliefs and colorful ceilings, which blend the artistry of two civilizations in a stunning display.",
                        "For lunch, savor authentic Egyptian flavors at a carefully selected gourmet restaurant, where refined culinary expertise brings out the best of Egypt's culinary heritage.",
                        "After your temple visits, transfer to your river cruise and set sail along the tranquil, majestic Nile.",
                        "Relax with dinner onboard, dining under the stars as you glide along Egypt's legendary river.",
                        "Spend the night embraced by the gentle flow of the Nile, surrounded by Egypt's timeless beauty."
                    ],
                    "ar": [
                        "ابدأ يومك مع إفطار بوفيه لذيذ في فندقك، مستعدًا لرحلة إلى اثنين من أكثر المعابد روعة وغنى تاريخي في مصر: دندرة وأبيدوس.",
                        "ابدأ بزيارة معبد سيتي الأول في أبيدوس، موقع مقدس مخصص لوالد رمسيس الثاني. يشتهر هذا المعبد بنقوشه المعقدة ويحتل مكانة خاصة في تاريخ مصر كمركز للعبادة والطقوس.",
                        "بعد ذلك، توجه إلى معبد حتحور في دندرة، جوهرة معمارية فريدة تشتهر بتأثيراتها اليونانية والرومانية.",
                        "انبهر بالنقوش الحية المحفوظة جيدًا والأسقف الملونة، التي تمزج بين فنون حضارتين في عرض مذهل.",
                        "لتناول الغداء، استمتع بالنكهات المصرية الأصيلة في مطعم جورمي تم اختياره بعناية، حيث تبرز الخبرة الطهوية المكررة أفضل ما في التراث الطهوي المصري.",
                        "بعد زيارات المعابد، انتقل إلى رحلتك النيلية وابحر على طول النيل الهادئ المهيب.",
                        "استرخ مع العشاء على متن السفينة، تتناول العشاء تحت النجوم بينما تنزلق على طول النهر الأسطوري لمصر.",
                        "اقض الليلة محاطًا بالتدفق اللطيف للنيل، محاطًا بجمال مصر الخالد."
                    ]
                }
            },
            {
                "day": 5,
                "title": {
                    "es": "Luxor – Valle de los Reyes y Templo de Hatshepsut",
                    "en": "Luxor – Valley of the Kings and Hatshepsut Temple",
                    "ar": "الأقصر – وادي الملوك ومعبد حتشبسوت"
                },
                "activities": {
                    "es": [
                        "Disfrute de pensión completa a bordo del crucero.",
                        "Comience su día con una excursión privada al legendario Valle de los Reyes, el lugar de descanso final de los grandes faraones del Reino Nuevo.",
                        "Explore una selección de las tumbas más impresionantes, cada una adornada con arte antiguo y símbolos de la vida después de la muerte.",
                        "Una visita opcional a la Tumba de Tutankamón está disponible, ofreciendo una visión de los misterios del entierro de este joven faraón.",
                        "A continuación, visite el impresionante Templo de Hatshepsut, una obra maestra de la arquitectura de terrazas enclavada en los acantilados.",
                        "Esta magnífica estructura se erige como un tributo a la única faraona de Egipto, reflejando su legado y poder perdurables.",
                        "Concluya el día con una parada en los Colosos de Memnón, dos estatuas gigantes que han custodiado la necrópolis tebana durante milenios.",
                        "Cuando el sol comience a ponerse, regrese al crucero y zarpe hacia Esna, pasando por la famosa esclusa.",
                        "Disfrute de una cena gourmet a bordo y relájese con una estancia nocturna mientras se desliza por el Nilo."
                    ],
                    "en": [
                        "Enjoy full board onboard the cruise.",
                        "Begin your day with a private excursion to the legendary Valley of the Kings, the final resting place of the great pharaohs of the New Kingdom.",
                        "Explore a selection of the most impressive tombs, each adorned with ancient art and symbols of the afterlife.",
                        "An optional visit to the Tomb of Tutankhamun is available, offering a glimpse into the mysteries of this young pharaoh's burial.",
                        "Next, visit the breathtaking Temple of Hatshepsut, a masterpiece of terrace architecture nestled against the cliffs.",
                        "This magnificent structure stands as a tribute to Egypt's only female pharaoh, reflecting her enduring legacy and power.",
                        "Conclude the day with a stop at the Colossi of Memnon, two towering statues that have guarded the Theban necropolis for millennia.",
                        "As the sun begins to set, return to the cruise and set sail toward Esna, passing through the famous lock.",
                        "Enjoy a gourmet dinner onboard and relax with an overnight stay as you drift along the Nile."
                    ],
                    "ar": [
                        "استمتع بالإقامة كاملة على متن الرحلة النيلية.",
                        "ابدأ يومك برحلة خاصة إلى وادي الملوك الأسطوري، مكان الراحة الأخير لفراعنة الدولة الحديثة العظماء.",
                        "استكشف مجموعة من أكثر المقابر إثارة للإعجاب، كل منها مزين بفن قديم ورموز للحياة الآخرة.",
                        "توجد زيارة اختيارية لمقبرة توت عنخ آمون، تقدم لمحة عن أسرار دفن هذا الفرعون الشاب.",
                        "بعد ذلك، قم بزيارة معبد حتشبسوت المذهل، تحفة معمارية مدرجة متداخلة against المنحدرات.",
                        "يقف هذا الهيكل المهيب كتحية لفرعون مصر الأنثى الوحيدة، عاكسًا إرثها وقوتها الدائمين.",
                        "اختتم اليوم مع توقف عند تمثالي ممنون العملاقين، تمثالان شاهقان يحرسان مقبرة طيبة منذ آلاف السنين.",
                        "مع بدء غروب الشمس، عد إلى الرحلة النيلية وابحر نحو إسنا، مرورًا بالقفل الشهير.",
                        "استمتع بعشاء جورمي على متن السفينة واسترخ مع المبيت بينما تنجرف على طول النيل."
                    ]
                }
            },
            {
                "day": 6,
                "title": {
                    "es": "Esna – Edfu y Kom Ombo",
                    "en": "Esna – Edfu and Kom Ombo",
                    "ar": "إسنا – إدفو وكوم أمبو"
                },
                "activities": {
                    "es": [
                        "Disfrute de pensión completa a bordo del crucero.",
                        "Comience su día navegando hacia Edfu, donde visitará el magnífico Templo de Horus, uno de los templos mejor conservados de Egipto.",
                        "Admire la impresionante arquitectura y los intrincados relieves que muestran la grandeza de la antigua civilización egipcia y su devoción por Horus, el dios con cabeza de halcón de la protección.",
                        "Continúe su viaje a lo largo del Nilo hasta Kom Ombo, hogar del único templo dual dedicado a Sobek y Haroeris.",
                        "Este fascinante sitio es excepcional en su dedicación a dos deidades, reflejando las dualidades en las creencias y la cultura del antiguo Egipto.",
                        "Por la noche, saboree una cena gourmet privada a bordo mientras el crucero navega hacia Asuán, la vibrante capital de Nubia.",
                        "Disfrute de la serena ambientación del Nilo mientras cena, rodeado por la belleza eterna de Egipto."
                    ],
                    "en": [
                        "Enjoy full board onboard the cruise.",
                        "Begin your day by sailing to Edfu, where you'll visit the magnificent Temple of Horus, one of Egypt's best-preserved temples.",
                        "Admire the impressive architecture and intricate reliefs that showcase the grandeur of the ancient Egyptian civilization and its devotion to Horus, the falcon-headed god of protection.",
                        "Continue your journey along the Nile to Kom Ombo, home to the unique dual temple dedicated to Sobek and Haroeris.",
                        "This fascinating site is exceptional in its dedication to two deities, reflecting the dualities in ancient Egyptian beliefs and culture.",
                        "In the evening, savor a private gourmet dinner onboard as the cruise sails toward Aswan, the vibrant capital of Nubia.",
                        "Relish the serene ambiance of the Nile as you dine, surrounded by the timeless beauty of Egypt."
                    ],
                    "ar": [
                        "استمتع بالإقامة كاملة على متن الرحلة النيلية.",
                        "ابدأ يومك بالإبحار إلى إدفو، حيث ستزور معبد حورس المهيب، أحد أفضل المعابد حفظًا في مصر.",
                        "انبهر بالهندسة المعمارية المثيرة للإعجاب والنقوش المعقدة التي تعرض عظمة الحضارة المصرية القديمة وتفانيها لحورس، إله الحماية برأس الصقر.",
                        "واصل رحلتك على طول النيل إلى كوم أمبو، موطن المعبد المزدوج الفريد المخصص لسوبek وهارويريس.",
                        "هذا الموقع الرائع استثنائي في تكريسه لاثنين من الآلهة، عاكسًا الازدواجية في معتقدات وثقافة مصر القديمة.",
                        "في المساء، استمتع بعشاء جورمي خاص على متن السفينة بينما تبحر الرحلة النيلية نحو أسوان، عاصمة النوبة النابضة بالحياة.",
                        "تمتع بالأجواء الهادئة للنيل أثناء تناول العشاء، محاطًا بجمال مصر الخالد."
                    ]
                }
            },
            {
                "day": 7,
                "title": {
                    "es": "Asuán – La Belleza de los Templos en el Nilo",
                    "en": "Aswan – The Beauty of the Temples on the Nile",
                    "ar": "أسوان – جمال المعابد على النيل"
                },
                "activities": {
                    "es": [
                        "Disfrute de pensión completa a bordo del crucero.",
                        "Comience su día con una visita a la impresionante Presa Alta de Asuán, una maravilla de la ingeniería moderna que transformó la agricultura y la producción de energía de Egipto.",
                        "Este logro del siglo XX refleja la fuerza y el ingenio de Egipto en la gestión de las poderosas aguas del Nilo.",
                        "A continuación, explore el encantador Templo de Philae, dedicado a la diosa Isis.",
                        "Ubicado en una isla y accesible solo en barco, el entorno de este templo crea una atmósfera de ensueño, con aguas relucientes que realzan su atractivo místico.",
                        "Por la tarde, realice un pintoresco paseo en faluca alrededor de la Isla Elefantina, donde pasará por el Mausoleo de Aga Khan y los frondosos Jardines Botánicos, ofreciendo vistas serenas y vislumbres de la historia de las islas sagradas del Nilo.",
                        "Para una experiencia cultural más profunda, considere una visita opcional a una Aldea Nubia, donde tendrá la oportunidad de interactuar con artesanos locales, aprender sobre artesanías tradicionales y experimentar la vibrante cultura de Nubia.",
                        "Regrese al crucero para una cena gourmet y relájese con una noche tranquila a bordo, rodeado por la belleza del Nilo."
                    ],
                    "en": [
                        "Enjoy full board onboard the cruise.",
                        "Begin your day with a visit to the impressive Aswan High Dam, a modern engineering marvel that transformed Egypt's agriculture and energy production.",
                        "This 20th-century achievement reflects the strength and ingenuity of Egypt in managing the Nile's mighty waters.",
                        "Next, explore the enchanting Temple of Philae, dedicated to the goddess Isis.",
                        "Nestled on an island and accessible only by boat, this temple's surroundings create a dreamlike atmosphere, with shimmering water that enhances its mystical allure.",
                        "In the afternoon, take a scenic felucca ride around Elephantine Island, where you'll pass by the Agha Khan Mausoleum and the lush Botanical Gardens, offering serene views and glimpses into the history of the Nile's sacred islands.",
                        "For a deeper cultural experience, consider an optional visit to a Nubian Village, where you'll have the opportunity to interact with local artisans, learn about traditional crafts, and experience the vibrant culture of Nubia.",
                        "Return to the cruise for a gourmet dinner and relax with a peaceful night onboard, surrounded by the beauty of the Nile."
                    ],
                    "ar": [
                        "استمتع بالإقامة كاملة على متن الرحلة النيلية.",
                        "ابدأ يومك بزيارة إلى السد العالي بأسوان المثير للإعجاب، معجزة هندسية حديثة غيرت الزراعة وإنتاج الطاقة في مصر.",
                        "يعكس هذا الإنجاز في القرن العشرين قوة وبراعة مصر في إدارة مياه النيل الجبارة.",
                        "بعد ذلك، استكشف معبد فيلة الساحر، المخصص للإلهة إيزيس.",
                        "متواجد على جزيرة ويمكن الوصول إليه فقط بالقارب، تخلق محيط هذا المعبد أجواءً تشبه الحلم، مع مياه متلألئة تعزز جاذبيته الغامضة.",
                        "في فترة الظهيرة، خذ رحلة فلوكا خلابة حول جزيرة إلفنتين، حيث ستمر بضريح آغا خان والحدائق النباتية الخضراء، مما يقدم مناظر هادئة ونظرات على تاريخ جزر النيل المقدسة.",
                        "لتجربة ثقافية أعمق، فكر في زيارة اختيارية لقرية نوبية، حيث ستتاح لك الفرصة للتفاعل مع الحرفيين المحليين، والتعرف على الحرف التقليدية، وتجربة الثقافة النابضة بالحياة للنوبة.",
                        "عد إلى الرحلة النيلية لعشاء جورمي واسترخ مع ليلة هادئة على متن السفينة، محاطًا بجمال النيل."
                    ]
                }
            },
            {
                "day": 8,
                "title": {
                    "es": "Asuán – Abu Simbel, Un Viaje al Esplendor",
                    "en": "Aswan – Abu Simbel, A Journey to Splendor",
                    "ar": "أسوان – أبو سمبل، رحلة إلى العظمة"
                },
                "activities": {
                    "es": [
                        "Después del desayuno, desembarque de su crucero y embárquese en un pintoresco traslado por carretera a los impresionantes templos de Abu Simbel.",
                        "Llegue a los impresionantes templos excavados en la roca de Abu Simbel, dedicados a Ramsés II y su amada reina, Nefertari.",
                        "Estos monumentos colosales, que rivalizan con la grandeza de las Pirámides de Giza, son una maravilla de la ingeniería y la devoción antiguas, sus masivas estatuas son un testimonio del rico patrimonio de Egipto.",
                        "Después de explorar los templos, trasládese a su hotel en Abu Simbel para descansar y recargar energías.",
                        "Por la noche, prepárese para un inolvidable Espectáculo de Sonido y Luz en los templos de Abu Simbel.",
                        "Este espectáculo inmersivo da vida a la historia y la belleza de estos monumentos antiguos a través de una iluminación dramática y narración, creando una atmósfera cautivadora contra el cielo estrellado del desierto.",
                        "Disfrute de la cena y una estancia nocturna en su hotel, rodeado por el misterio de Abu Simbel."
                    ],
                    "en": [
                        "After breakfast, disembark from your cruise and embark on a scenic road transfer to the breathtaking temples of Abu Simbel.",
                        "Arrive at the awe-inspiring rock-carved temples of Abu Simbel, dedicated to Ramses II and his beloved queen, Nefertari.",
                        "These colossal monuments, rivaling the grandeur of the Pyramids of Giza, are a marvel of ancient engineering and devotion, their massive statues standing as a testament to Egypt's rich heritage.",
                        "After exploring the temples, transfer to your hotel in Abu Simbel to rest and recharge.",
                        "In the evening, prepare for an unforgettable Sound and Light Show at the Abu Simbel temples.",
                        "This immersive spectacle brings the history and beauty of these ancient monuments to life through dramatic lighting and storytelling, creating a captivating atmosphere against the starry desert sky.",
                        "Enjoy dinner and an overnight stay at your hotel, surrounded by the mystique of Abu Simbel."
                    ],
                    "ar": [
                        "بعد الإفطار، انزل من رحلتك النيلية وانطلق في نقل بري خلاب إلى معابد أبو سمبل المذهلة.",
                        "صل إلى المعابد المقطوعة في الصخر المذهلة في أبو سمبل، المخصصة لرمسيس الثاني وملكته المحبوبة، نفرتاري.",
                        "هذه الآثار العملاقة، التي تنافس عظمة أهرامات الجيزة، هي معجزة في الهندسة القديمة والتفاني، حيث تقف تماثيلها الضخمة شهادة على التراث الغني لمصر.",
                        "بعد استكشاف المعابد، انتقل إلى فندقك في أبو سمبل للراحة وإعادة الشحن.",
                        "في المساء، استعد لعرض الصوت والضوء لا يُنسى في معابد أبو سمبل.",
                        "يجلب هذا المشهد الغامر تاريخ وجمال هذه الآثار القديمة إلى الحياة من خلال الإضاءة المثيرة وسرد القصص، مما يخلق أجواءً آسرة تحت سماء الصحراء المرصعة بالنجوم.",
                        "استمتع بالعشاء والمبيت في فندقك، محاطًا بغموض أبو سمبل."
                    ]
                }
            },
            {
                "day": 9,
                "title": {
                    "es": "Abu Simbel a Asuán y El Cairo",
                    "en": "Abu Simbel to Aswan and Cairo",
                    "ar": "من أبو سمبل إلى أسوان والقاهرة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un desayuno bufé en su hotel en Abu Simbel.",
                        "Después, disfrute de un pintoresco traslado de regreso a Asuán, donde tomará un vuelo nacional a El Cairo.",
                        "A su llegada a El Cairo, un traslado privado lo llevará a su hotel para una última noche en esta cautivadora ciudad.",
                        "Tómese la noche para relajarse, reflexionar sobre su viaje por Egipto o explorar El Cairo a su gusto, saboreando el ambiente de este destino eterno."
                    ],
                    "en": [
                        "Start your day with a buffet breakfast at your hotel in Abu Simbel.",
                        "Afterward, enjoy a scenic transfer back to Aswan, where you will catch a domestic flight to Cairo.",
                        "Upon arrival in Cairo, a private transfer will take you to your hotel for a final night in this captivating city.",
                        "Take the evening to unwind, reflect on your journey through Egypt, or explore Cairo at your leisure, savoring the ambiance of this timeless destination."
                    ],
                    "ar": [
                        "ابدأ يومك مع إفطار بوفيه في فندقك في أبو سمبل.",
                        "بعد ذلك، استمتع بنقل خلاب back إلى أسوان، حيث ستصطاد رحلة طيران محلية إلى القاهرة.",
                        "عند الوصول إلى القاهرة، سينقلك نقل خاص إلى فندقك لليلة أخيرة في هذه المدينة الآسرة.",
                        "خذ المساء للاسترخاء، والتأمل في رحلتك عبر مصر، أو استكشف القاهرة براحتك، متذوقًا أجواء هذه الوجهة الخالدة."
                    ]
                }
            },
            {
                "day": 10,
                "title": {
                    "es": "El Cairo – Despedida de Egipto",
                    "en": "Cairo – Farewell to Egypt",
                    "ar": "القاهرة – وداعًا لمصر"
                },
                "activities": {
                    "es": [
                        "Después de un desayuno bufé final, su vehículo privado estará listo para trasladarlo al Aeropuerto Internacional de El Cairo para su vuelo de regreso.",
                        "Nuestro equipo le brindará atención personalizada, garantizando que su salida sea tan fluida e inolvidable como su llegada, ocupándose de cada detalle hasta el último momento.",
                        "Fin de nuestros servicios."
                    ],
                    "en": [
                        "After a final buffet breakfast, your private vehicle will be ready to transfer you to Cairo International Airport for your return flight.",
                        "Our team will provide personalized attention, ensuring that your departure is as seamless and unforgettable as your arrival, taking care of every detail until the last moment.",
                        "End of our services."
                    ],
                    "ar": [
                        "بعد إفطار بوفيه أخير، ستكون سيارتك الخاصة جاهزة لنقلك إلى مطار القاهرة الدولي لرحلة العودة.",
                        "سيوفر فريقنا اهتمامًا شخصيًا، مما يضمن أن مغادرتك سلسة ولا تنسى مثل وصولك، مع الاهتمام بكل التفاصيل حتى اللحظة الأخيرة.",
                        "نهاية خدماتنا."
                    ]
                }
            }
        ],
        servicesIncluded: {
            "es": ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo para trámites de visado y aduana.", "Vuelos domésticos (Cairo–Luxor, Asuán–Cairo).", "3 noches de alojamiento en El Cairo con desayuno.", "1 noche de alojamiento en Luxor con media pensión (desayuno y cena incluidos).", "4 noches en un crucero de 5 estrellas por el Nilo con pensión completa (bebidas no incluidas).", "1 noche de alojamiento en Abu Simbel con media pensión (desayuno y cena incluidos).", "2 almuerzos gourmet en restaurante local seleccionado.", "Traslados privados de lujo entre todos los destinos y aeropuertos.", "Visitas según el itinerario."],
            "en": ["Assistance upon arrival at Cairo International Airport for visa and customs procedures.", "Domestic flights (Cairo–Luxor, Aswan–Cairo).", "3 nights of accommodation in Cairo with breakfast.", "1 night of accommodation in Luxor with half board (breakfast and dinner included).", "4 nights on a 5-star Nile cruise with full board (drinks not included).", "1 night of accommodation in Abu Simbel with half board (breakfast and dinner included).", "2 gourmet lunches at selected local restaurant.", "Private luxury transfers between all destinations and airports.", "Visits as mentioned in the itinerary."],
            "ar": ["المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.", "رحلات داخلية (القاهرة – الأقصر، أسوان – القاهرة).", "3 ليالٍ إقامة في القاهرة مع الإفطار.", "ليلة واحدة إقامة في الأقصر بنظام نصف الإقامة (إفطار وعشاء).", "4 ليالٍ على متن رحلة نيلية فاخرة من فئة 5 نجوم بنظام الإقامة الكاملة (المشروبات غير مشمولة).", "ليلة واحدة إقامة في أبو سمبل بنظام نصف الإقامة (إفطار وعشاء).", "غداءان فاخران في مطعم محلي مختار.", "انتقالات فاخرة خاصة بين جميع الوجهات والمطارات.", "الزيارات كما هو مذكور في البرنامج."]
        },
        servicesExcluded: {
            "es": ["Vuelos internacionales.", "Visado 25 USD (pagadero a la llegada).", "Propinas para conductores y personal del crucero 60 USD por persona.", "Entradas al interior de las Pirámides y a la Tumba de Tutankamón.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
            "en": ["International flights.", "Visa $25 (payable upon arrival).", "Tips for drivers and cruise staff $60 per person.", "Entrance fees to the interiors of the Pyramids and the Tomb of Tutankhamun.", "Optional tours and any visits not mentioned in the program.", "Beverages and personal expenses."],
            "ar": ["الرحلات الدولية.", "تأشيرة دخول بقيمة 25 دولارًا (تُدفع عند الوصول).", "إكراميات للسائقين وطاقم الرحلة النيلية بقيمة 60 دولارًا للشخص.", "رسوم دخول داخل الأهرامات وقبر توت عنخ آمون.", "الجولات الاختيارية وأي زيارات غير مذكورة في البرنامج.", "المشروبات والمصروفات الشخصية."]
        },
        importantNotes: {
            "es": ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.", "Los precios finales pueden variar debido a cambios en tarifas, impuestos o cargos por combustible.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Las habitaciones triples en cruceros y varios hoteles son habitaciones dobles con una cama adicional.", "Los cruceros desde Luxor salen todos los sábados y lunes."],
            "en": ["Guaranteed daily departure with a minimum of 2 people.", "Hotels and cruises may be substituted with others of the same category with prior notice to the client.", "Final prices may vary due to changes in rates, taxes, and/or fuel charges.", "The order of visits may be modified without affecting the trip content.", "Triple rooms in cruises and several hotels are double rooms with an additional bed.", "Cruises from Luxor depart every Saturday and Monday."],
            "ar": ["انطلاق يومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة بعد إخطار العميل مسبقًا.", "قد تختلف الأسعار النهائية بسبب تغييرات في الأسعار أو الضرائب أو رسوم الوقود.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "الغرف الثلاثية في الرحلات البحرية وبعض الفنادق هي غرف مزدوجة مع سرير إضافي.", "تنطلق الرحلات النيلية من الأقصر كل يوم سبت واثنين."]
        },
        seasonalPricing: {
            "summer": {
                "gold": { "single": 2215, "double": 1760, "triple": 1720 },
                "diamond": { "single": 2640, "double": 2010, "triple": 1970 }
            },
            "winter": {
                "gold": { "single": 2450, "double": 1915, "triple": 1875 },
                "diamond": { "single": 3040, "double": 2245, "triple": 2205 }
            }
        }
    },



    {
        id: 8,
        name: {
            "es": "Maravillas de Egipto",
            "en": "Wonders of Egypt",
            "ar": "عجائب مصر"
        },
        icon: "🌅",
        duration: { "days": 10, "nights": 9 },
        priceFrom: 1475,
        categories: ["Adventure", "Historical"],
        startCity: { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" },
        cruiseNights: 3,
        runDays: {
            "es": "Lunes, Martes, Jueves, Sábado, Domingo",
            "en": "Monday, Tuesday, Thursday, Saturday, Sunday",
            "ar": "الاثنين، الثلاثاء، الخميس، السبت، الأحد"
        },
        briefDescription: {
            "es": "Adéntrese en un viaje de 10 días por Egipto, donde los misterios antiguos, los templos majestuosos y las playas del Mar Rojo lo esperan.",
            "en": "Embark on a 10-day journey through Egypt, where ancient mysteries, majestic temples, and the Red Sea’s golden shores await.",
            "ar": "انطلق في رحلة مدتها 10 أيام عبر مصر، حيث تنتظرك الأسرار القديمة والمعابد المهيبة وسواحل البحر الأحمر الخلابة."
        },
        generalDescription: {
            "es": "Adéntrese en un viaje de 10 días por Egipto, donde los misterios de la historia antigua, los majestuosos templos y las encantadoras costas del Mar Rojo lo esperan. Comience en El Cairo, recibido como la realeza, y entre en un mundo de maravillas eternas. Admire las icónicas Pirámides de Giza, contemple la enigmática Esfinge y descubra los tesoros del Museo Egipcio, que susurran historias de un pasado distante. Vuele a Asuán para comenzar su crucero por el Nilo, una travesía por los antiguos paisajes de Egipto. Descubra lugares emblemáticos como la monumental Alta Presa, los impresionantes templos de Abu Simbel y los templos dobles de Kom Ombo, cada uno un testimonio de la grandeza del pasado de Egipto. Continúe navegando hacia Luxor, la ciudad de los dioses, donde el Valle de los Reyes, el majestuoso Templo de Hatshepsut y las grandiosas columnas de Karnak lo esperan. Desde Luxor, diríjase a las costas del Mar Rojo para un sereno retiro en Hurgada. Relájese en playas prístinas o sumérjase en las aguas cristalinas, donde la vibrante vida marina ofrece una muestra de la belleza natural de Egipto. Concluya su viaje con una última noche en El Cairo, llevándose recuerdos de las maravillas de Egipto: desde sus antiguos templos hasta las tranquilas costas del Mar Rojo.",
            "en": "Step into a 10-day journey through Egypt, where the mysteries of ancient history, majestic temples, and the enchanting shores of the Red Sea beckon. Begin in Cairo, welcomed like royalty, as you enter a world of timeless wonders. Stand before the iconic Pyramids of Giza, gaze upon the enigmatic Sphinx, and uncover treasures in the Egyptian Museum that whisper tales of a distant past. Fly to Aswan to start your Nile cruise, a passage through Egypt’s ancient landscapes. Discover landmarks like the monumental High Dam, the awe-inspiring temples of Abu Simbel, and the dual temples of Kom Ombo, each a testament to the grandeur of Egypt’s past. Continue sailing to Luxor, the city of the gods, where the Valley of the Kings, the majestic Temple of Hatshepsut, and the grand pillars of Karnak await your exploration. From Luxor, journey to the shores of the Red Sea for a serene retreat in Hurghada. Relax on pristine beaches or dive into the crystal-clear waters, where vibrant marine life offers a glimpse of Egypt’s natural beauty. Conclude your journey with a final night in Cairo, taking with you memories of Egypt’s wonders—from ancient temples to the peaceful shores of the Red Sea.",
            "ar": "انطلق في رحلة لمدة 10 أيام عبر مصر، حيث تنتظرك أسرار التاريخ القديم والمعابد العظيمة وسواحل البحر الأحمر الساحرة. ابدأ في القاهرة، حيث يُستقبلك كأحد أفراد الملوك، وادخل عالم العجائب الأبدية. تأمل الأهرامات الشهيرة في الجيزة، وانظر إلى أبو الهول الغامض، واكتشف كنوز المتحف المصري التي تروي قصصًا من الماضي البعيد. سافر إلى أسوان لبدء رحلتك النيلية، وهي رحلة عبر مناظر مصر القديمة. اكتشف معالم بارزة مثل السد العالي العظيم، ومعابد أبو سمبل المذهلة، والمعابد المزدوجة في كوم أمبو، وكل منها شاهد على عظمة ماضي مصر. تابع الإبحار نحو الأقصر، مدينة الآلهة، حيث ينتظرك وادي الملوك، ومعبد حتشبسوت المهيب، والأعمدة الضخمة في الكرنك. من الأقصر، توجه إلى سواحل البحر الأحمر لقضاء فترة استرخاء هادئة في الغردقة. استمتع بالشواطئ النظيفة أو الغوص في المياه الصافية، حيث تقدم الحياة البحرية النابضة لمحة عن الجمال الطبيعي لمصر. اختتم رحلتك بليلة أخيرة في القاهرة، حاملًا معك ذكريات عجائب مصر من معابدها القديمة إلى سواحلها الهادئة."
        },
        accommodations: {
            "gold": [
                { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Helnan Dreamland o similar", "en": "Helnan Dreamland or similar", "ar": "هيلنان دريم لاند أو ما يعادله" } },
                { "city": { "es": "Crucero por el Nilo", "en": "Nile Cruise", "ar": "رحلة نيلية" }, "hotel": { "es": "Le Fayan II o similar", "en": "Le Fayan II or similar", "ar": "لو فايان 2 أو ما يعادله" } },
                { "city": { "es": "Hurghada", "en": "Hurghada", "ar": "الغردقة" }, "hotel": { "es": "Hilton Hurghada Plaza o similar", "en": "Hilton Hurghada Plaza or similar", "ar": "هيلتون الغردقة بلازا أو ما يعادله" } }
            ],
            "diamond": [
                { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Fairmont Nile City o similar", "en": "Fairmont Nile City or similar", "ar": "فيرمونت نايل سيتي أو ما يعادله" } },
                { "city": { "es": "Crucero por el Nilo", "en": "Nile Cruise", "ar": "رحلة نيلية" }, "hotel": { "es": "Royal Signature o similar", "en": "Royal Signature or similar", "ar": "رويال سيغنتشر أو ما يعادله" } },
                { "city": { "es": "Hurghada", "en": "Hurghada", "ar": "الغردقة" }, "hotel": { "es": "Hilton Hurghada Plaza o similar", "en": "Hilton Hurghada Plaza or similar", "ar": "هيلتون الغردقة بلازا أو ما يعادله" } }
            ]
        },
        itinerary: [
            {
                "day": 1,
                "title": {
                    "es": "Llegada a El Cairo – Una Gran Bienvenida",
                    "en": "Arrival in Cairo – A Grand VIP Welcom",
                    "ar": "الوصول إلى القاهرة – ترحيب حار"
                },
                "activities": {
                    "es": [
                        "Asistencia en el aeropuerto, trámites de visado y aduana para una llegada sin complicaciones.",
                        "Traslado privado de lujo al hotel y alojamiento en una habitación elegante.",
                        "Noche libre en El Cairo para descansar o explorar los alrededores."
                    ],
                    "en": [
                        "Upon your arrival at Cairo International Airport, our dedicated team will be ready to assist you with visa and customs procedures, ensuring a seamless and stress-free entry into Egypt.",
                        "A luxury private vehicle will transfer you to your hotel, where you can unwind in your elegantly appointed room, taking in the ambiance of this extraordinary city.",
                        "Enjoy your first evening in Cairo with the option to explore the surrounding area at your leisure, or simply relax and prepare for the wonders that await."
                    ],
                    "ar": [
                        "عند وصولك إلى مطار القاهرة الدولي، سيكون فريقنا جاهزًا لمساعدتك في إجراءات التأشيرة والجمارك لضمان دخول سلس ومريح إلى مصر.",
                        "سيقوم سائق خاص بنقلك بسيارة فاخرة إلى الفندق حيث يمكنك الاسترخاء في غرفتك الأنيقة والاستمتاع بأجواء هذه المدينة الفريدة.",
                        "استمتع بأول أمسية لك في القاهرة، مع خيار استكشاف المنطقة المحيطة أو الاسترخاء استعدادًا لما ينتظرك من روائع."
                    ]
                }
            },
            {
                "day": 2,
                "title": {
                    "es": "El Cairo – Las Majestuosas Pirámides y Tesoros Antiguos",
                    "en": "Cairo – The Majestic Pyramids and Ancient Treasures",
                    "ar": "القاهرة – الأهرامات المهيبة والكنوز القديمة"
                },
                "activities": {
                    "es": [
                        "Desayuno buffet de lujo en el hotel.",
                        "Visita guiada privada a las Pirámides de Guiza: Keops, Kefrén y Micerinos, con acceso exclusivo y explicación detallada de su historia y secretos.",
                        "Visita a la Gran Esfinge y al Templo del Valle de Kefrén para conocer los antiguos rituales funerarios de los faraones.",
                        "Exploración del Museo Egipcio para admirar los tesoros dorados de Tutankamón y otras piezas invaluables.",
                        "Recorrido por el Barrio Copto de El Cairo y visita a la Iglesia de San Sergio, lugar donde la Sagrada Familia se refugió según la tradición.",
                        "Almuerzo gourmet en un restaurante local seleccionado con esmero.",
                        "Regreso al hotel para una tarde de descanso o reflexión sobre las experiencias del día."
                    ],
                    "en": [
                        "Begin your day with a luxurious buffet breakfast.",
                        "Set out on a captivating tour of the iconic Pyramids of Giza—Khufu, Khafre, and Menkaure—architectural wonders that have inspired awe for millennia. With exclusive access, your personal guide will share the rich history and hidden secrets of these magnificent monuments.",
                        "Next, visit the mythical Sphinx and the Valley Temple of Khafre, where you’ll gain insight into the ancient ceremonies and rituals of Egypt’s pharaohs.",
                        "Continue to the Egyptian Museum, where the fascinating golden treasures of Tutankhamun and other priceless artifacts await. Your private tour allows you to appreciate these remarkable pieces in a more intimate setting.",
                        "Then, explore Cairo’s historic Coptic Quarter, visiting the Church of St. Sergius—a revered site where, according to tradition, the Holy Family sought refuge during their time in Egypt.",
                        "Savor a gourmet lunch at a carefully selected local restaurant, where the flavors of Egyptian cuisine are elevated to a fine dining experience.",
                        "Return to your hotel for a relaxing afternoon, with the option to unwind and reflect on the day’s incredible experiences."
                    ],
                    "ar": [
                        "ابدأ يومك بوجبة إفطار فاخرة على طراز البوفيه.",
                        "انطلق في جولة خاصة إلى أهرامات الجيزة الشهيرة خوفو وخفرع ومنقرع، روائع معمارية أبهرت العالم لآلاف السنين. سيقدم لك المرشد الخاص شرحًا غنيًا عن تاريخها وأسرارها الخفية.",
                        "قم بزيارة أبو الهول الأسطوري ومعبد الوادي لخفرع للتعرف على الطقوس والمراسم الفرعونية القديمة.",
                        "تابع إلى المتحف المصري حيث تنتظرك كنوز توت عنخ آمون الذهبية وغيرها من القطع الأثرية النادرة. الجولة الخاصة تتيح لك تجربة أكثر هدوءًا وتأملًا.",
                        "استكشف حي القاهرة القبطي التاريخي، وقم بزيارة كنيسة القديس سرجيوس، التي يُعتقد أن العائلة المقدسة لجأت إليها خلال إقامتها في مصر.",
                        "استمتع بغداء فاخر في مطعم محلي مختار بعناية حيث تمتزج النكهات المصرية بتجربة طعام راقية.",
                        "العودة إلى الفندق لقضاء فترة راحة بعد يوم مليء بالاكتشافات المدهشة."
                    ]
                }
            },
            {
                "day": 3,
                "title": {
                    "es": "De El Cairo a Asuán – Historia y Belleza Natural",
                    "en": "Cairo to Aswan – History and Natural Beauty",
                    "ar": "من القاهرة إلى أسوان – التاريخ والجمال الطبيعي"
                },
                "activities": {
                    "es": [
                        "Desayuno buffet en el hotel.",
                        "Traslado al aeropuerto para el vuelo a Asuán.",
                        "A la llegada, traslado privado al crucero de lujo por el Nilo y almuerzo a bordo.",
                        "Visita a la impresionante Presa Alta de Asuán, una maravilla moderna de la ingeniería.",
                        "Paseo en faluca alrededor de la isla Elefantina con vistas al Mausoleo de Agha Khan y al Jardín Botánico.",
                        "Opción de visitar un pueblo nubio para conocer su cultura y artesanía local.",
                        "Cena gourmet y noche a bordo del crucero."
                    ],
                    "en": [
                        "Buffet breakfast at the hotel.",
                        "Transfer to the airport for the flight to Aswan.",
                        "Upon arrival, private transfer to your luxury Nile cruise and lunch onboard.",
                        "Visit the impressive Aswan High Dam, a modern engineering marvel.",
                        "Felucca ride around Elephantine Island with views of the Agha Khan Mausoleum and the Botanical Garden.",
                        "Optional visit to a Nubian Village to experience local culture and craftsmanship.",
                        "Gourmet dinner and overnight onboard the cruise."
                    ],
                    "ar": [
                        "إفطار بوفيه في الفندق.",
                        "الانتقال إلى المطار لرحلة إلى أسوان.",
                        "عند الوصول، انتقال خاص إلى باخرة النيل الفاخرة وتناول الغداء على متنها.",
                        "زيارة السد العالي في أسوان، أحد إنجازات الهندسة الحديثة.",
                        "جولة بالمركب الشراعي حول جزيرة إلفنتين مع إطلالة على ضريح آغا خان والحديقة النباتية.",
                        "خيار زيارة قرية نوبية للتعرف على الثقافة والحرف المحلية.",
                        "عشاء فاخر ومبيت على متن الباخرة."
                    ]
                }
            },
            {
                "day": 4,
                "title": {
                    "es": "Asuán – Abu Simbel y Navegación hacia Kom Ombo",
                    "en": "Aswan – Abu Simbel and Sailing to Kom Ombo",
                    "ar": "أسوان – أبو سمبل والإبحار إلى كوم أمبو"
                },
                "activities": {
                    "es": [
                        "Régimen de pensión completa a bordo del crucero.",
                        "Excursión al legendario Templo de Abu Simbel, dedicado a Ramsés II y su esposa Nefertari.",
                        "Visita privada para explorar el sitio con tranquilidad y admirar su grandeza.",
                        "Regreso al crucero para el almuerzo y navegación hacia Kom Ombo.",
                        "Visita al Templo de Kom Ombo, dedicado a los dioses Sobek y Haroeris.",
                        "Exploración de la arquitectura y relieves simbólicos que revelan las creencias del Antiguo Egipto.",
                        "Continuación hacia Edfu con cena gourmet a bordo y noche tranquila en el Nilo."
                    ],
                    "en": [
                        "Full board onboard the cruise.",
                        "Excursion to the legendary Temple of Abu Simbel, dedicated to Ramses II and Queen Nefertari.",
                        "Private tour to explore the site and admire its grandeur.",
                        "Return to the cruise for lunch and sail toward Kom Ombo.",
                        "Visit the Temple of Kom Ombo, dedicated to Sobek and Haroeris.",
                        "Explore its architecture and carvings reflecting ancient Egyptian beliefs.",
                        "Continue sailing toward Edfu with a gourmet dinner onboard and overnight on the Nile."
                    ],
                    "ar": [
                        "إقامة شاملة على متن الباخرة.",
                        "رحلة إلى معبد أبو سمبل الأسطوري المخصص لرمسيس الثاني وزوجته نفرتاري.",
                        "جولة خاصة لاستكشاف الموقع والاستمتاع بعظمته.",
                        "العودة إلى الباخرة لتناول الغداء والإبحار نحو كوم أمبو.",
                        "زيارة معبد كوم أمبو المخصص للإلهين سوبك وحوروريس.",
                        "استكشاف هندسة المعبد والنقوش التي تعكس معتقدات المصريين القدماء.",
                        "مواصلة الإبحار نحو إدفو مع عشاء فاخر على متن الباخرة ومبيت هادئ على النيل."
                    ]
                }
            },
            {
                "day": 5,
                "title": {
                    "es": "De Edfu a Lúxor – Templos Majestuosos",
                    "en": "Edfu to Luxor – Majestic Temples",
                    "ar": "إدفو إلى الأقصر – المعابد العظيمة"
                },
                "activities": {
                    "es": [
                        "Régimen de pensión completa a bordo del crucero.",
                        "Visita al impresionante Templo de Horus en Edfu, uno de los templos mejor conservados del Antiguo Egipto.",
                        "Exploración de sus altos muros y relieves detallados que reflejan la grandeza del mundo antiguo.",
                        "Navegación hacia Lúxor, corazón de la antigua Tebas.",
                        "Según la hora de llegada, visita al icónico Templo de Lúxor, una obra maestra a orillas del Nilo.",
                        "Disfrute del ambiente mágico del templo iluminado al anochecer.",
                        "Cena gourmet y noche a bordo del crucero atracado en Lúxor."
                    ],
                    "en": [
                        "Full board onboard the cruise.",
                        "Visit the impressive Temple of Horus in Edfu, one of the best-preserved temples of ancient Egypt.",
                        "Explore its towering walls and intricate carvings reflecting the grandeur of the ancient world.",
                        "Sail toward Luxor, the heart of ancient Thebes.",
                        "Depending on arrival time, visit the iconic Luxor Temple along the Nile.",
                        "Experience the temple illuminated at dusk, creating a mystical atmosphere.",
                        "Enjoy a gourmet dinner and overnight onboard, docked in Luxor."
                    ],
                    "ar": [
                        "إقامة شاملة على متن الباخرة.",
                        "زيارة معبد حورس المهيب في إدفو، أحد أفضل المعابد المحفوظة في مصر القديمة.",
                        "استكشاف الجدران الشاهقة والنقوش الدقيقة التي تعكس عظمة العالم القديم.",
                        "الإبحار نحو الأقصر، قلب طيبة القديمة.",
                        "بحسب وقت الوصول، زيارة معبد الأقصر الشهير المطل على ضفاف النيل.",
                        "الاستمتاع بأجواء المعبد المضاءة عند الغروب.",
                        "عشاء فاخر ومبيت على متن الباخرة الراسية في الأقصر."
                    ]
                }
            },
            {
                "day": 6,
                "title": {
                    "es": "De Lúxor a Hurgada – Templos y Playas",
                    "en": "Luxor to Hurghada – Temples and Beaches",
                    "ar": "الأقصر إلى الغردقة – المعابد والشواطئ"
                },
                "activities": {
                    "es": [
                        "Desayuno buffet a bordo del crucero.",
                        "Visita a los monumentales Templos de Karnak, uno de los complejos religiosos más grandes del mundo antiguo, construido a lo largo de más de 2.000 años.",
                        "Recorrido por sus salas y columnas gigantes que dan vida a la historia del antiguo Egipto.",
                        "Exploración del Valle de los Reyes, lugar de descanso de los faraones del Imperio Nuevo, con opción de visitar la tumba de Tutankamón.",
                        "Visita al notable Templo de Hatshepsut, maravilla arquitectónica integrada en los acantilados.",
                        "Parada en los majestuosos Colosos de Memnón, guardianes del Valle Tebano por más de 3.000 años.",
                        "Traslado privado a Hurgada para disfrutar de las playas y las aguas cristalinas del Mar Rojo.",
                        "Registro en el hotel y tiempo libre para relajarse junto al mar."
                    ],
                    "en": [
                        "Buffet breakfast onboard.",
                        "Visit the monumental Karnak Temples, one of the largest religious complexes of the ancient world built over 2,000 years.",
                        "Walk through its vast halls and towering columns that bring ancient Egypt’s history to life.",
                        "Explore the Valley of the Kings, final resting place of New Kingdom pharaohs, with the option to enter Tutankhamun’s tomb.",
                        "Visit the remarkable Temple of Hatshepsut, an architectural wonder nestled into the cliffs.",
                        "Stop at the majestic Colossi of Memnon, standing for over 3,000 years as guardians of the Theban necropolis.",
                        "Private transfer to Hurghada to enjoy the Red Sea’s crystal-clear waters and pristine beaches.",
                        "Check in at your coastal hotel and relax by the sea."
                    ],
                    "ar": [
                        "إفطار بوفيه على متن الباخرة.",
                        "زيارة معابد الكرنك الضخمة، أحد أكبر المجمعات الدينية في العالم القديم الذي بُني على مدى أكثر من 2000 عام.",
                        "التجول بين القاعات الواسعة والأعمدة الشاهقة التي تجسد تاريخ مصر القديمة.",
                        "زيارة وادي الملوك، مثوى ملوك الدولة الحديثة، مع إمكانية دخول مقبرة توت عنخ آمون.",
                        "زيارة معبد حتشبسوت الرائع، معجزة معمارية منقوشة في الجبال.",
                        "توقف عند تمثالي ممنون الشاهقين اللذين يحرسان طيبة منذ أكثر من 3000 عام.",
                        "انتقال خاص إلى الغردقة للاستمتاع بمياه البحر الأحمر الصافية وشواطئه الهادئة.",
                        "تسجيل الوصول في الفندق والاسترخاء على الشاطئ."
                    ]
                }
            },
            {
                "day": 7,
                "title": {
                    "es": "Hurgada – Relajación y Aventuras en el Mar Rojo",
                    "en": "Hurghada – Relaxation and Adventures on the Red Sea",
                    "ar": "الغردقة – الاسترخاء والمغامرات في البحر الأحمر"
                },
                "activities": {
                    "es": [
                        "Alojamiento con todo incluido en Hurgada.",
                        "Tómese un día para descansar en las playas de arena blanca, donde las aguas cristalinas del Mar Rojo lo invitan a relajarse y rejuvenecer. Para quienes buscan aventura, hay disponibles actividades acuáticas opcionales, como esnórquel, buceo o paseos en barco para explorar los vibrantes arrecifes de coral y la diversa vida marina del lugar.",
                        "Ya sea que elija descansar bajo el sol o descubrir las maravillas submarinas, este día ofrece la combinación perfecta de tranquilidad y emoción en las costas del Mar Rojo."
                    ],
                    "en": [
                        "Enjoy all-inclusive accommodation in Hurghada.",
                        "Take a day to unwind on the pristine white sandy beaches, where the crystal-clear waters of the Red Sea invite you to relax and rejuvenate. For those seeking adventure, optional water activities are available, including snorkeling, diving, or boat trips to explore vibrant coral reefs and encounter the area’s diverse marine life.",
                        "Whether you choose to lounge under the sun or discover the underwater wonders, this day offers the perfect blend of tranquility and excitement on the shores of the Red Sea."
                    ],
                    "ar": [
                        "استمتع بإقامة شاملة في الغردقة.",
                        "خذ يومًا للاسترخاء على الشواطئ الرملية البيضاء النقية، حيث تدعوك المياه الصافية للبحر الأحمر للاسترخاء وتجديد النشاط. للراغبين في المغامرة، تتوفر أنشطة مائية اختيارية، بما في ذلك الغوص والغطس أو رحلات القوارب لاستكشاف الشعاب المرجانية النابضة بالحياة والتعرف على الحياة البحرية المتنوعة في المنطقة.",
                        "سواء اخترت الاستلقاء تحت أشعة الشمس أو اكتشاف العجائب تحت الماء، فإن هذا اليوم يقدم مزيجًا مثاليًا من الهدوء والإثارة على شواطئ البحر الأحمر."
                    ]
                }
            },
            {
                "day": 8,
                "title": {
                    "es": "Hurgada – Día Libre en el Paraíso del Mar Rojo",
                    "en": "Hurghada – Free Day in the Red Sea Paradise",
                    "ar": "الغردقة – يوم حر في جنة البحر الأحمر"
                },
                "activities": {
                    "es": [
                        "Alojamiento con todo incluido en Hurgada.",
                        "Disfrute de otro día en el paraíso del Mar Rojo, donde puede optar por relajarse junto al agua o embarcarse en aventuras acuáticas opcionales. Descubra los vibrantes arrecifes de coral en una excursión de esnórquel o buceo, o pase un día tranquilo tomando el sol en una de las playas privadas exclusivas de Hurgada.",
                        "Como broche de oro a su estancia, disfrute de una cena especial en su resort, agregando un toque de lujo a esta inolvidable experiencia en el Mar Rojo."
                    ],
                    "en": [
                        "Enjoy all-inclusive accommodation in Hurghada.",
                        "Savor another day in the paradise of the Red Sea, where you can choose to relax by the water or dive into optional water adventures. Discover the vibrant coral reefs on a snorkeling or diving excursion, or spend a leisurely day soaking up the sun on one of Hurghada’s exclusive private beaches.",
                        "As a perfect finale to your stay, enjoy a special dinner at your resort, adding an elegant touch of luxury to this unforgettable Red Sea experience."
                    ],
                    "ar": [
                        "استمتع بإقامة شاملة في الغردقة.",
                        "اقضِ يومًا آخر في جنة البحر الأحمر، حيث يمكنك الاسترخاء بجانب الماء أو خوض مغامرات مائية اختيارية. اكتشف الشعاب المرجانية النابضة بالحياة في رحلة غوص أو غطس، أو استمتع بيوم هادئ تحت أشعة الشمس على إحدى الشواطئ الخاصة الحصرية في الغردقة.",
                        "كختام مثالي لإقامتك، استمتع بعشاء خاص في المنتجع ليضيف لمسة من الفخامة إلى هذه التجربة التي لا تُنسى في البحر الأحمر."
                    ]
                }
            },
            {
                "day": 9,
                "title": {
                    "es": "De Hurgada a El Cairo – Regreso a la Capital",
                    "en": "Hurghada to Cairo – Return to the Capital",
                    "ar": "من الغردقة إلى القاهرة – العودة إلى العاصمة"
                },
                "activities": {
                    "es": [
                        "Comience el día con un desayuno tipo bufé en su resort, disfrutando los últimos momentos de su retiro en el Mar Rojo. Después del desayuno, un traslado privado lo llevará al Aeropuerto de Hurgada para su vuelo de regreso a El Cairo.",
                        "A su llegada a El Cairo, será trasladado a su hotel, donde podrá relajarse y disfrutar de su última noche en esta fascinante ciudad. Tómese un tiempo para explorar los lugares cercanos o simplemente descansar, recordando su increíble viaje por las maravillas eternas de Egipto."
                    ],
                    "en": [
                        "Begin your day with a buffet breakfast at your resort, savoring the final moments of your Red Sea retreat. Following breakfast, a private transfer will take you to Hurghada Airport for your flight back to Cairo.",
                        "Upon arrival in Cairo, you’ll be escorted to your hotel, where you can unwind and enjoy your last evening in this captivating city. Take time to explore nearby sights or simply relax, reflecting on the incredible journey through Egypt’s timeless wonders."
                    ],
                    "ar": [
                        "ابدأ يومك بوجبة إفطار على طراز البوفيه في المنتجع، مستمتعًا بلحظاتك الأخيرة في استجمام البحر الأحمر. بعد الإفطار، سينقلك انتقال خاص إلى مطار الغردقة لرحلتك إلى القاهرة.",
                        "عند الوصول إلى القاهرة، سيتم نقلك إلى الفندق حيث يمكنك الاسترخاء وقضاء آخر أمسية في هذه المدينة الساحرة. خذ وقتك لاستكشاف المعالم القريبة أو استرخِ وتأمل رحلتك المذهلة بين عجائب مصر الخالدة."
                    ]
                }
            },
            {
                "day": 10,
                "title": {
                    "es": "El Cairo – Despedida de Egipto",
                    "en": "Cairo – Farewell to Egypt",
                    "ar": "القاهرة – وداعًا لمصر"
                },
                "activities": {
                    "es": [
                        "Después de un último desayuno tipo bufé en su hotel, será trasladado al Aeropuerto Internacional de El Cairo en un vehículo de lujo.",
                        "Nuestro equipo se encargará de todos los detalles para asegurar que su salida sea tan fluida como su llegada.",
                        "Fin de nuestros servicios."
                    ],
                    "en": [
                        "After a final buffet breakfast at your hotel, you will be transferred to Cairo International Airport in a luxury vehicle.",
                        "Our team will handle all the details, ensuring that your departure is as smooth as your arrival.",
                        "End of our services."
                    ],
                    "ar": [
                        "بعد تناول وجبة الإفطار الأخيرة في الفندق، سيتم نقلك إلى مطار القاهرة الدولي بسيارة فاخرة.",
                        "سيتولى فريقنا جميع التفاصيل لضمان أن تكون مغادرتك سلسة مثل وصولك.",
                        "نهاية خدماتنا."
                    ]
                }
            }
        ],
        servicesIncluded: {
            "es": [
                "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para los trámites de visado y aduana.",
                "Vuelos domésticos (Cairo – Asuán, Hurgada – Cairo).",
                "3 noches de alojamiento en El Cairo con desayuno.",
                "3 noches en un crucero de 5 estrellas por el Nilo con pensión completa (bebidas no incluidas).",
                "3 noche de alojamiento en Hurgada con servicio todo incluido (comidas y bebidas incluidas).",
                "1 almuerzo gourmet en un restaurante local seleccionado.",
                "Traslados privados de lujo entre todos los destinos y aeropuertos.",
                "Visitas según lo mencionado en el itinerario."
            ],
            "en": [
                "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
                "Domestic flights (Cairo – Aswan, Hurghada – Cairo).",
                "3 nights of accommodation in Cairo with breakfast.",
                "3 nights on a 5-star Nile cruise with full board (drinks not included).",
                "3 night of accommodation in Hurghada with all-inclusive service (meals and drinks included).",
                "1 gourmet lunch at selected local restaurant.",
                "Private luxury transfers between all destinations and airports.",
                "Visits as mentioned in the itinerary."
            ],
            "ar": [
                "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
                "رحلات داخلية (القاهرة – أسوان، الغردقة – القاهرة).",
                "الإقامة 3 ليالٍ في القاهرة مع الإفطار.",
                "الإقامة 3 ليالٍ في رحلة نيلية بخمس نجوم مع إقامة كاملة (المشروبات غير مشمولة).",
                "الإقامة 3 ليالٍ في الغردقة بنظام شامل (يشمل الوجبات والمشروبات).",
                "غداء فاخر في مطعم محلي مختار.",
                "انتقالات فاخرة خاصة بين جميع الوجهات والمطارات.",
                "الزيارات كما هو مذكور في البرنامج."
            ]
        },
        servicesExcluded: {
            "es": [
                "Vuelos internacionales.",
                "Visado 25 $ (pagadero a la llegada).",
                "Propinas para conductores y personal del crucero 60 $ por persona.",
                "Entradas al interior de las Pirámides y a la Tumba de Tutankamón.",
                "Excursiones opcionales y cualquier visita no mencionada en el programa.",
                "Bebidas y gastos personales."
            ],
            "en": [
                "International flights.",
                "Visa 25 $ (payable upon arrival).",
                "Tips for drivers and cruise staff 60 $ per person.",
                "Entrance fees to the interiors of the Pyramids and the Tomb of Tutankhamun.",
                "Optional tours and any visits not mentioned in the program.",
                "Beverages and personal expenses."
            ],
            "ar": [
                "الرحلات الدولية.",
                "التأشيرة (25 دولارًا تُدفع عند الوصول).",
                "الإكراميات للسائقين وطاقم الرحلات البحرية (60 دولارًا للشخص).",
                "رسوم الدخول إلى داخل الأهرامات وقبر توت عنخ آمون.",
                "الجولات الاختيارية وأي زيارات غير مذكورة في البرنامج.",
                "المشروبات والمصروفات الشخصية."
            ]
        },

        importantNotes: {
            "es": [
                "Salida diaria garantizada con un mínimo de 2 personas.",
                "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.",
                "Los precios finales pueden variar debido a cambios en tarifas, impuestos y/o recargos por combustible.",
                "El orden de las visitas puede modificarse sin afectar el contenido del viaje.",
                "Las habitaciones triples en cruceros y en varios hoteles son habitaciones dobles con una cama adicional.",
                "Los cruceros desde Luxor salen cada sábado y lunes."
            ],
            "en": [
                "Guaranteed daily departure with a minimum of 2 people.",
                "Hotels and cruises may be substituted with others of the same category with prior notice to the client.",
                "Final prices may vary due to changes in rates, taxes, and/or fuel charges.",
                "The order of visits may be modified without affecting the trip content.",
                "Triple rooms in cruises and several hotels are double rooms with an additional bed.",
                "Cruises from Luxor depart every Saturday and Monday."
            ],
            "ar": [
                "انطلاق يومي مضمون بحد أدنى شخصين.",
                "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة بعد إخطار العميل مسبقًا.",
                "قد تتغير الأسعار النهائية بسبب تغييرات في الأسعار أو الضرائب أو رسوم الوقود.",
                "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.",
                "الغرف الثلاثية في الرحلات النيلية وبعض الفنادق هي غرف مزدوجة مع سرير إضافي.",
                "تغادر الرحلات النيلية من الأقصر كل يوم سبت واثنين."
            ]
        },

        seasonalPricing: {
            "summer": {
                "gold": { "single": 1925, "double": 1515, "triple": 1475 },
                "diamond": { "single": 2257, "double": 1710, "triple": 1670 }
            },
            "winter": {
                "gold": { "single": 2180, "double": 1665, "triple": 1625 },
                "diamond": { "single": 2665, "double": 1950, "triple": 1910 }
            }
        }
    },




    {
        id: 9,
        name: {
            "es": "Ecos de la Eternidad",
            "en": "Echoes of Eternity",
            "ar": "أصداء الأبدية"
        },
        icon: "🌅",
        duration: { "days": 8, "nights": 7 },
        priceFrom: 1145,
        categories: ["Cultural", "Historical"],
        startCity: { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" },
        runDays: {
            "es": "Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
            "en": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
            "ar": "الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت، الأحد"
        },
        briefDescription: {
            "es": "Embárquese en un viaje de 8 días a través de los ecos del antiguo Egipto, explorando El Cairo, Matrouh y el místico oasis de Siwa en una experiencia llena de historia, cultura y serenidad.",
            "en": "Embark on an 8-day journey through the echoes of ancient Egypt, exploring Cairo, Matrouh, and the mystical Siwa Oasis in an experience filled with history, culture, and serenity.",
            "ar": "انطلق في رحلة لمدة 8 أيام عبر أصداء مصر القديمة، تستكشف خلالها القاهرة ومطروح وواحة سيوة في تجربة مليئة بالتاريخ والثقافة والسكينة."
        },
        generalDescription: {
            "es": "Embárquese en un viaje de 8 días a través de los ecos de la antigua Egipto, donde la historia, el misticismo y los paisajes serenos se entrelazan. Comience en El Cairo con una cálida bienvenida y tours exclusivos por las eternas Pirámides de Giza, la antigua necrópolis de Saqqara y los tesoros del Museo Egipcio. Recorra el vibrante Bazar de Khan El-Khalili, un lugar lleno de susurros del pasado, y admire la icónica Mezquita de Alabastro en lo alto de la Ciudadela. Continúe su viaje hacia la tranquila costa mediterránea de Matrouh, un santuario de belleza prístina, para disfrutar de un relajante retiro junto al mar. Desde allí, adéntrese en el místico Oasis de Siwa, un antiguo refugio de maravillas naturales y tradiciones atemporales, donde la historia, la belleza y la tranquilidad lo envuelven. Concluya su viaje con una última noche en El Cairo, llevándose consigo los ecos eternos del misticismo y la majestuosidad de Egipto, y despidiéndose de una tierra llena de antiguos secretos.",
            "en": "Embark on an 8-day journey through the echoes of ancient Egypt, where history, mysticism, and serene landscapes intertwine. Begin in Cairo with a warm welcome and exclusive tours of the timeless Pyramids of Giza, the ancient necropolis of Saqqara, and the treasures of the Egyptian Museum. Wander through the vibrant Khan El-Khalili Bazaar, a place alive with whispers of the past, and stand in awe at the iconic Alabaster Mosque atop the Citadel. Continue your journey to the tranquil Mediterranean coast of Matrouh, a sanctuary of pristine beauty, for a peaceful seaside retreat. From there, venture into the mystical Siwa Oasis, an ancient haven of natural wonders and timeless traditions, where history, beauty, and tranquility surround you. Conclude your journey with a final night in Cairo, carrying with you the eternal echoes of Egypt’s mysticism and majesty, and bidding farewell to a land of ancient secrets.",
            "ar": "انطلق في رحلة لمدة 8 أيام عبر أصداء مصر القديمة، حيث تتداخل التاريخ والروحانية والمناظر الهادئة. ابدأ في القاهرة باستقبال دافئ وجولات حصرية تشمل أهرامات الجيزة الخالدة، والجبانة القديمة في سقارة، وكنوز المتحف المصري. تجول في بازار خان الخليلي النابض بالحياة، مكان يملؤه عبق الماضي، وتأمل مسجد الألباستر الشهير فوق القلعة. تابع رحلتك إلى الساحل المتوسطي الهادئ في مرسى مطروح، ملاذ الجمال الطبيعي النقي، لقضاء استراحة مريحة بجوار البحر. من هناك، انطلق نحو واحة سيوة الساحرة، ملاذ قديم للعجائب الطبيعية والتقاليد الخالدة، حيث يحيط بك التاريخ والجمال والسكينة. اختتم رحلتك بليلة أخيرة في القاهرة، حاملاً معك الأصداء الأبدية لروح مصر وسحرها، مودعًا أرض الأسرار القديمة."
        },
        accommodations: {
            "gold": [
                { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Helnan Dreamland o similar", "en": "Helnan Dreamland or similar", "ar": "هيلنان دريم لاند أو ما يعادله" } },
                { "city": { "es": "Matrouh", "en": "Matrouh", "ar": "مطروح" }, "hotel": { "es": "Jaz Almaza Beach Resort o similar", "en": "Jaz Almaza Beach Resort or similar", "ar": "جاز ألماظة بيتش ريزورت أو ما يعادله" } },
                { "city": { "es": "Siwa", "en": "Siwa", "ar": "سيوة" }, "hotel": { "es": "Siwa Shali Resort o similar", "en": "Siwa Shali Resort or similar", "ar": "سيوة شالي ريزورت أو ما يعادله" } }
            ],
            "diamond": [
                { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Fairmont Nile City o similar", "en": "Fairmont Nile City or similar", "ar": "فيرمونت نايل سيتي أو ما يعادله" } },
                { "city": { "es": "Matrouh", "en": "Matrouh", "ar": "مطروح" }, "hotel": { "es": "Jaz Almaza Beach Resort o similar", "en": "Jaz Almaza Beach Resort or similar", "ar": "جاز ألماظة بيتش ريزورت أو ما يعادله" } },
                { "city": { "es": "Siwa", "en": "Siwa", "ar": "سيوة" }, "hotel": { "es": "Siwa Shali Resort o similar", "en": "Siwa Shali Resort or similar", "ar": "سيوة شالي ريزورت أو ما يعادله" } }
            ]
        },
        itinerary: [
            {
                "day": 1,
                "title": {
                    "es": "Llegada a El Cairo – Una Gran Bienvenida",
                    "en": "Arrival in Cairo – A Grand Welcome",
                    "ar": "الوصول إلى القاهرة – ترحيب كبير"
                },
                "activities": {
                    "es": [
                        "A su llegada al Aeropuerto Internacional de El Cairo, experimente una cálida bienvenida egipcia. Nuestro equipo le asistirá con los trámites de visado y aduana, asegurando una entrada fluida y relajada en Egipto. Será recibido con refrescos y una atención personalizada desde el primer momento.",
                        "Un vehículo privado de lujo lo trasladará a su hotel, donde podrá instalarse en su elegante habitación y relajarse. Disfrute de una tranquila velada que le permitirá sumergirse en el encantador ambiente de El Cairo.",
                        "Su primera noche en El Cairo prepara el escenario para un viaje inolvidable a través de las maravillas eternas."
                    ],
                    "en": [
                        "Upon your arrival at Cairo International Airport, experience a warm Egyptian welcome. Our team will assist you with visa and customs procedures to ensure a smooth and relaxed entry into Egypt. You will be greeted with refreshments and personalized attention from the very beginning.",
                        "A private luxury vehicle will transfer you to your hotel, where you can settle into your elegant room and unwind. Enjoy a peaceful evening that allows you to immerse yourself in Cairo’s charming atmosphere.",
                        "Your first night in Cairo sets the stage for an unforgettable journey through timeless wonders."
                    ],
                    "ar": [
                        "عند وصولك إلى مطار القاهرة الدولي، ستتلقى ترحيبًا مصريًا دافئًا. سيساعدك فريقنا في إجراءات التأشيرة والجمارك لضمان دخول سلس ومريح إلى مصر. ستُستقبل بالمشروبات المنعشة وخدمة شخصية منذ اللحظة الأولى.",
                        "سيقوم سائق خاص بسيارة فاخرة بنقلك إلى الفندق حيث يمكنك الاستقرار في غرفتك الأنيقة والاسترخاء. استمتع بسهرة هادئة تتيح لك الانغماس في أجواء القاهرة الساحرة.",
                        "ليلتك الأولى في القاهرة تمهد لرحلة لا تُنسى عبر روائعها الخالدة."
                    ]
                }
            },
            {
                "day": 2,
                "title": {
                    "es": "El Cairo – Las Pirámides y Maravillas de la Antigüedad",
                    "en": "Cairo – The Pyramids and Wonders of Antiquity",
                    "ar": "القاهرة – الأهرامات وعجائب العصور القديمة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un delicioso desayuno buffet, preparándose para una jornada de exploración de los sitios más icónicos de Egipto.",
                        "Empiece con una visita a las legendarias Pirámides de Giza (Keops, Kefrén y Micerino), maravillas arquitectónicas y la última de las Siete Maravillas del Mundo Antiguo. Con su guía privado, explore estos monumentos eternos y descubra los fascinantes secretos que han perdurado durante milenios.",
                        "Párese frente a la majestuosa Esfinge, el enigmático guardián de las pirámides, y visite el Templo del Valle de Kefrén, donde se realizaban los rituales de los antiguos faraones. Continúe hacia la Necrópolis de Saqqara, donde encontrará la Pirámide Escalonada de Djoser, la estructura de piedra monumental más antigua de la historia, sintiendo los ecos de más de 3,000 años de legado faraónico.",
                        "Haga una pausa para un almuerzo gourmet en un restaurante local cuidadosamente seleccionado, saboreando los auténticos sabores de Egipto.",
                        "Después, regrese a su hotel para relajarse y reflexionar sobre los descubrimientos del día. Alojamiento en El Cairo."
                    ],
                    "en": [
                        "Start your day with a delicious buffet breakfast, preparing for a full day exploring Egypt’s most iconic sites.",
                        "Begin with a visit to the legendary Pyramids of Giza (Khufu, Khafre, and Menkaure), architectural marvels and the last of the Seven Wonders of the Ancient World. With your private guide, explore these timeless monuments and uncover the fascinating secrets that have endured for millennia.",
                        "Stand before the majestic Sphinx, the enigmatic guardian of the pyramids, and visit the Valley Temple of Khafre, where the ancient pharaohs performed their burial rituals. Continue to the Saqqara Necropolis, home to the Step Pyramid of Djoser, the oldest monumental stone structure in history, echoing more than 3,000 years of pharaonic legacy.",
                        "Pause for a gourmet lunch at a carefully selected local restaurant, savoring the authentic flavors of Egypt.",
                        "Afterward, return to your hotel to relax and reflect on the day’s discoveries. Overnight in Cairo."
                    ],
                    "ar": [
                        "ابدأ يومك بوجبة إفطار بوفيه شهية استعدادًا ليوم من استكشاف أبرز معالم مصر.",
                        "ابدأ بزيارة أهرامات الجيزة الأسطورية (خوفو وخفرع ومنقرع)، روائع معمارية وآخر عجائب الدنيا السبع القديمة الباقية. برفقة دليلك الخاص، استكشف هذه المعالم الخالدة واكتشف الأسرار المثيرة التي استمرت لآلاف السنين.",
                        "تأمل أبا الهول المهيب، الحارس الغامض للأهرامات، وزر معبد وادي خفرع حيث كانت تُقام الطقوس الجنائزية للفراعنة القدماء. ثم واصل إلى جبانة سقارة، حيث ستجد هرم زوسر المدرج، أقدم بناء حجري ضخم في التاريخ، واستشعر صدى أكثر من 3000 عام من الإرث الفرعوني.",
                        "توقف لتناول غداء فاخر في مطعم محلي مختار بعناية لتذوق النكهات الأصيلة للمطبخ المصري.",
                        "بعد ذلك، عد إلى فندقك للاسترخاء والتأمل في اكتشافات اليوم. إقامة في القاهرة."
                    ]
                }
            },
            {
                "day": 3,
                "title": {
                    "es": "El Cairo – Tesoros Culturales y Compras en el Bazar",
                    "en": "Cairo – Cultural Treasures and Shopping in the Bazaar",
                    "ar": "القاهرة – الكنوز الثقافية والتسوق في البازار"
                },
                "activities": {
                    "es": [
                        "Comience su día con un desayuno buffet en su hotel.",
                        "Inicie con una visita al renombrado Museo Egipcio, hogar de los tesoros dorados de Tutankamón y una vasta colección de artefactos que abarcan milenios de historia. Mientras explora con su guía privado, disfrute de una experiencia íntima de la cautivadora historia y el arte de Egipto.",
                        "Luego, visite la magnífica Mezquita de Alabastro de Mohamed Ali, situada en lo alto de la Ciudadela de Saladino, donde le esperan vistas panorámicas de El Cairo. La grandeza de esta mezquita y las historias que encierra reflejan la profunda herencia espiritual y cultural de Egipto.",
                        "Sumérjase en el vibrante bazar de Khan el-Khalili, un mercado animado donde la historia, el color y la cultura se entrelazan perfectamente. Pasee por el laberinto de puestos, disfrutando de los aromas de especias exóticas, los sonidos del comercio animado y la vista de artesanías egipcias finamente elaboradas.",
                        "Disfrute de un almuerzo en un restaurante de alta categoría, donde podrá saborear los auténticos sabores de la cocina egipcia en un ambiente refinado y elegante.",
                        "Regrese a su hotel para una tarde de relajación. Por la noche, elija entre una selección de actividades personalizadas adaptadas a sus intereses o simplemente disfrute de una noche tranquila en su hotel. Alojamiento en El Cairo."
                    ],
                    "en": [
                        "Start your day with a buffet breakfast at your hotel.",
                        "Begin with a visit to the renowned Egyptian Museum, home to the golden treasures of Tutankhamun and a vast collection of artifacts spanning millennia. Explore with your private guide and enjoy an intimate journey through Egypt’s captivating history and art.",
                        "Next, visit the magnificent Alabaster Mosque of Muhammad Ali, located atop the Citadel of Salah El-Din, offering panoramic views of Cairo. The mosque’s grandeur and stories reflect Egypt’s deep spiritual and cultural heritage.",
                        "Immerse yourself in the vibrant Khan El-Khalili Bazaar, a lively market where history, color, and culture intertwine. Wander through the maze of stalls, taking in the aromas of exotic spices, the sounds of bustling trade, and the sight of finely crafted Egyptian goods.",
                        "Enjoy lunch at a high-end restaurant where you can savor authentic Egyptian cuisine in a refined setting.",
                        "Return to your hotel for an afternoon of relaxation. In the evening, choose from personalized activities suited to your interests or simply unwind at your hotel. Overnight in Cairo."
                    ],
                    "ar": [
                        "ابدأ يومك بوجبة إفطار بوفيه في فندقك.",
                        "ابدأ بزيارة المتحف المصري الشهير، موطن كنوز توت عنخ آمون الذهبية ومجموعة واسعة من القطع الأثرية التي تمتد عبر آلاف السنين. استكشف مع دليلك الخاص واستمتع برحلة عميقة في تاريخ وفن مصر الساحر.",
                        "بعد ذلك، زر مسجد محمد علي الألبستر الرائع، الواقع على قمة قلعة صلاح الدين، حيث تنتظرك إطلالات بانورامية على القاهرة. تعكس عظمة هذا المسجد قصص التراث الروحي والثقافي العميق لمصر.",
                        "انغمس في سوق خان الخليلي النابض بالحياة، وهو سوق مليء بالتاريخ والألوان والثقافة. تجول بين الأزقة واستمتع بروائح التوابل الغريبة وأصوات الباعة ومناظر الحرف المصرية المتقنة.",
                        "استمتع بالغداء في مطعم فاخر حيث يمكنك تذوق المأكولات المصرية الأصيلة في أجواء راقية.",
                        "عد إلى فندقك للاسترخاء في فترة ما بعد الظهر. في المساء، اختر من بين أنشطة مخصصة تناسب اهتماماتك أو استمتع بليلة هادئة في فندقك. إقامة في القاهرة."
                    ]
                }
            },
            {
                "day": 4,
                "title": {
                    "es": "De El Cairo a Matrouh – Costas Doradas del Mediterráneo",
                    "en": "From Cairo to Matrouh – Golden Coasts of the Mediterranean",
                    "ar": "من القاهرة إلى مرسى مطروح – السواحل الذهبية للبحر الأبيض المتوسط"
                },
                "activities": {
                    "es": [
                        "Comience su día con un delicioso desayuno buffet en su hotel antes de emprender un recorrido panorámico hacia la impresionante ciudad costera de Matrouh, donde el azul brillante del Mediterráneo se encuentra con las doradas arenas de Egipto.",
                        "Al llegar a Matrouh, instálese en su hotel, donde el confort y la tranquilidad lo esperan en este refugio junto al mar.",
                        "Disfrute de una tarde libre para explorar los tranquilos alrededores, y luego saboree una deliciosa cena en su hotel, donde los sabores locales y los ingredientes frescos se sirven en un entorno sereno, diseñado para resaltar la belleza de la costa.",
                        "Alojamiento en Matrouh, donde podrá relajarse y sumergirse en la calma costera."
                    ],
                    "en": [
                        "Start your day with a delicious buffet breakfast at your hotel before setting out on a scenic journey to the stunning coastal city of Matrouh, where the bright blue Mediterranean meets Egypt’s golden sands.",
                        "Upon arrival in Matrouh, check in to your hotel, where comfort and tranquility await in this seaside retreat.",
                        "Enjoy a free afternoon to explore the peaceful surroundings, then savor a delightful dinner at your hotel, featuring fresh local flavors served in a serene setting designed to highlight the beauty of the coast.",
                        "Overnight in Matrouh, where you can relax and soak in the calm seaside atmosphere."
                    ],
                    "ar": [
                        "ابدأ يومك بوجبة إفطار بوفيه شهية في فندقك قبل الانطلاق في رحلة ذات مناظر خلابة إلى مدينة مرسى مطروح الساحلية المذهلة، حيث يلتقي البحر الأبيض المتوسط الأزرق الصافي برمال مصر الذهبية.",
                        "عند الوصول إلى مرسى مطروح، قم بتسجيل الوصول في فندقك حيث الراحة والهدوء في انتظارك في هذا الملاذ المطل على البحر.",
                        "استمتع بعد الظهر بوقت حر لاستكشاف المناطق الهادئة المحيطة، ثم تناول عشاءً لذيذًا في فندقك حيث تُقدم النكهات المحلية والمكونات الطازجة في أجواء هادئة تُبرز جمال الساحل.",
                        "إقامة في مرسى مطروح حيث يمكنك الاسترخاء والانغماس في هدوء البحر."
                    ]
                }
            },
            {
                "day": 5,
                "title": {
                    "es": "De Matrouh a Siwa – Aventura en el Oasis",
                    "en": "Matrouh to Siwa – Adventure in the Oasis",
                    "ar": "من مرسى مطروح إلى سيوة – مغامرة في الواحة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un desayuno buffet en su hotel en Matrouh antes de emprender el viaje hacia el místico Oasis de Siwa, uno de los destinos más remotos y encantadores de Egipto. Conocido por su rica historia, impresionantes paisajes y atmósfera serena, Siwa ofrece un refugio de tranquilidad único en su tipo.",
                        "A su llegada, instálese en su encantador hotel, donde la belleza atemporal del oasis lo rodea y una profunda paz prevalece.",
                        "Al caer la noche, disfrute de una cena tranquila en el hotel, bajo el cielo estrellado del desierto, una experiencia mágica que captura la esencia de este oasis apartado.",
                        "Alojamiento en Siwa, donde podrá relajarse y descansar en el sereno abrazo de este ambiente tranquilo."
                    ],
                    "en": [
                        "Start your day with a buffet breakfast at your hotel in Matrouh before embarking on the journey to the mystical Siwa Oasis, one of Egypt’s most remote and enchanting destinations. Known for its rich history, stunning landscapes, and serene atmosphere, Siwa offers a truly unique retreat of peace and beauty.",
                        "Upon arrival, settle into your charming hotel, surrounded by the timeless beauty of the oasis and a deep sense of calm.",
                        "As night falls, enjoy a quiet dinner at the hotel under the starry desert sky, a magical experience that captures the essence of this secluded oasis.",
                        "Overnight in Siwa, where you can relax and rest in the peaceful embrace of this tranquil environment."
                    ],
                    "ar": [
                        "ابدأ يومك بوجبة إفطار بوفيه في فندقك بمرسى مطروح قبل الانطلاق في رحلة إلى واحة سيوة الساحرة، إحدى أكثر الوجهات عزلة وسحرًا في مصر. تشتهر بتاريخها الغني ومناظرها الطبيعية الخلابة وأجوائها الهادئة، وتقدم سيوة ملاذًا فريدًا من نوعه للسلام والجمال.",
                        "عند الوصول، استقر في فندقك الساحر المحاط بجمال الواحة الأزلي والسكينة العميقة التي تسود المكان.",
                        "عند حلول المساء، استمتع بعشاء هادئ في الفندق تحت سماء الصحراء المرصعة بالنجوم، في تجربة ساحرة تجسد جوهر هذه الواحة المنعزلة.",
                        "إقامة في سيوة حيث يمكنك الاسترخاء والراحة في أحضان هذا الجو الهادئ."
                    ]
                }
            },
            {
                "day": 6,
                "title": {
                    "es": "Siwa – Un Día en el Oasis, Historia y Relajación",
                    "en": "Siwa – A Day in the Oasis, History and Relaxation",
                    "ar": "سيوة – يوم في الواحة، تاريخ واسترخاء"
                },
                "activities": {
                    "es": [
                        "Comience su día con un delicioso desayuno en su hotel, listo para explorar la encantadora historia y serenidad de Siwa.",
                        "Empiece con una visita al Manantial de Cleopatra, donde podrá disfrutar de un refrescante baño en las aguas cristalinas de esta legendaria fuente natural, que fue un retiro favorito de la antigua realeza.",
                        "A continuación, explore la Montaña de los Muertos, una necrópolis con tumbas talladas en la roca, cada una contando historias de antiguos reyes y guerreros. Pasee por este fascinante sitio, donde la historia parece resonar desde cada rincón.",
                        "Continúe hacia el Templo del Oráculo, famoso por haber sido visitado por Alejandro Magno. Sienta la poderosa energía que aún permanece en este sitio sagrado, un lugar de profecía y reverencia en tiempos antiguos.",
                        "Al finalizar el día, experimente la singular flotabilidad de los lagos salados de Siwa, flotando sin esfuerzo en aguas ricas en minerales y disfrutando de una relajación total.",
                        "Termine el día con una cena privada en el hotel, cenando bajo el vasto cielo del desierto, un cierre sereno y mágico para su estancia en Siwa.",
                        "Alojamiento en Siwa."
                    ],
                    "en": [
                        "Start your day with a delicious breakfast at your hotel, ready to explore the charming history and serenity of Siwa.",
                        "Begin with a visit to Cleopatra’s Spring, where you can enjoy a refreshing swim in the crystal-clear waters of this legendary natural pool, once a favorite retreat of ancient royalty.",
                        "Next, explore the Mountain of the Dead, a necropolis with rock-carved tombs, each telling stories of ancient kings and warriors. Walk through this fascinating site, where history seems to echo from every corner.",
                        "Continue to the Temple of the Oracle, famous for being visited by Alexander the Great. Feel the powerful energy that still lingers in this sacred site, once a place of prophecy and reverence in ancient times.",
                        "At the end of the day, experience the unique buoyancy of Siwa’s salt lakes, effortlessly floating in mineral-rich waters and enjoying complete relaxation.",
                        "End the day with a private dinner at the hotel, dining under the vast desert sky, a serene and magical close to your stay in Siwa.",
                        "Overnight in Siwa."
                    ],
                    "ar": [
                        "ابدأ يومك بوجبة إفطار لذيذة في فندقك استعدادًا لاكتشاف تاريخ سيوة الساحر وهدوئها.",
                        "ابدأ بزيارة عين كليوباترا، حيث يمكنك الاستمتاع بالسباحة المنعشة في مياهها الصافية، وهي نبع طبيعي أسطوري كان ملاذًا مفضلًا للملوك القدماء.",
                        "بعد ذلك، استكشف جبل الموتى، وهو مقبرة تضم مقابر محفورة في الصخور تروي قصص الملوك والمحاربين القدماء. تجول في هذا الموقع المثير حيث يتردد صدى التاريخ في كل زاوية.",
                        "واصل إلى معبد الوحي الشهير الذي زاره الإسكندر الأكبر. استشعر الطاقة القوية التي لا تزال تسكن هذا الموقع المقدس، الذي كان مكانًا للتنبؤ والعبادة في العصور القديمة.",
                        "في نهاية اليوم، جرب الطفو الفريد في بحيرات سيوة المالحة، حيث تطفو بسهولة في المياه الغنية بالمعادن وتستمتع بالاسترخاء التام.",
                        "اختتم اليوم بعشاء خاص في الفندق تحت سماء الصحراء الواسعة في ختام هادئ وساحر لإقامتك في سيوة.",
                        "إقامة في سيوة."
                    ]
                }
            },
            {
                "day": 7,
                "title": {
                    "es": "De Siwa a El Cairo – Regreso a la Ciudad",
                    "en": "From Siwa to Cairo – Return to the City",
                    "ar": "من سيوة إلى القاهرة – العودة إلى المدينة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un desayuno en su hotel, disfrutando de la tranquilidad de Siwa una última vez.",
                        "Luego, emprenda un viaje panorámico de regreso a El Cairo en un vehículo privado, disfrutando de los paisajes cambiantes mientras pasa del sereno oasis del desierto a la vibrante capital de Egipto.",
                        "A su llegada, instálese en su hotel para una última noche de confort y relajación, reflexionando sobre las experiencias únicas y las maravillas eternas encontradas a lo largo de su viaje.",
                        "Alojamiento en El Cairo."
                    ],
                    "en": [
                        "Start your day with breakfast at your hotel, enjoying the tranquility of Siwa one last time.",
                        "Then, embark on a scenic journey back to Cairo in a private vehicle, taking in the changing landscapes as you transition from the serene desert oasis to Egypt’s vibrant capital.",
                        "Upon arrival, settle into your hotel for one last night of comfort and relaxation, reflecting on the unique experiences and timeless wonders discovered throughout your journey.",
                        "Overnight in Cairo."
                    ],
                    "ar": [
                        "ابدأ يومك بتناول الإفطار في فندقك مستمتعًا بهدوء سيوة للمرة الأخيرة.",
                        "بعد ذلك، انطلق في رحلة ذات مناظر خلابة عائدًا إلى القاهرة بسيارة خاصة، مستمتعًا بتغير المناظر من واحة الصحراء الهادئة إلى العاصمة النابضة بالحياة في مصر.",
                        "عند الوصول، استقر في فندقك لقضاء ليلة أخيرة من الراحة والاسترخاء، متأملًا التجارب الفريدة والعجائب الخالدة التي اكتشفتها خلال رحلتك.",
                        "إقامة في القاهرة."
                    ]
                }
            },
            {
                "day": 8,
                "title": {
                    "es": "Despedida de El Cairo – Salida",
                    "en": "Farewell to Cairo – Departure",
                    "ar": "وداع القاهرة – المغادرة"
                },
                "activities": {
                    "es": [
                        "Disfrute de un último desayuno buffet en su hotel, tomando un momento para reflexionar sobre el inolvidable viaje a través de las maravillas antiguas de Egipto.",
                        "Un cómodo traslado lo llevará al Aeropuerto Internacional de El Cairo, donde nuestro equipo se asegurará de que su partida sea tan fluida y sin contratiempos como su llegada, permitiéndole un viaje de regreso relajado.",
                        "Fin de nuestros servicios."
                    ],
                    "en": [
                        "Enjoy a final buffet breakfast at your hotel, taking a moment to reflect on the unforgettable journey through Egypt’s ancient wonders.",
                        "A comfortable transfer will take you to Cairo International Airport, where our team will ensure your departure is as smooth and seamless as your arrival, allowing for a relaxed return journey.",
                        "End of our services."
                    ],
                    "ar": [
                        "استمتع بوجبة إفطار بوفيه أخيرة في فندقك، وخذ لحظة للتفكير في الرحلة التي لا تُنسى عبر عجائب مصر القديمة.",
                        "سينقلك انتقال مريح إلى مطار القاهرة الدولي، حيث سيتأكد فريقنا من أن مغادرتك ستكون سلسة كما كانت وصولك، مما يسمح لك برحلة عودة مريحة.",
                        "نهاية خدماتنا."
                    ]
                }
            }
        ],
        servicesIncluded: {
            "es": [
                "Asistencia a la llegada al Aeropuerto Internacional de El Cairo para los trámites de visado y aduana.",
                "4 noches de alojamiento en El Cairo con desayuno.",
                "1 noche de alojamiento en Matrouh con media pensión (desayuno y cena incluidos).",
                "2 noches de alojamiento en Siwa con media pensión (desayuno y cena incluidos).",
                "2 almuerzos gourmet en restaurantes locales seleccionados.",
                "Traslados privados de lujo entre todos los destinos y aeropuertos.",
                "Visitas según lo mencionado en el itinerario."
            ],
            "en": [
                "Assistance upon arrival at Cairo International Airport for visa and customs procedures.",
                "4 nights of accommodation in Cairo with breakfast.",
                "1 night of accommodation in Matrouh with half board (breakfast and dinner included).",
                "2 nights of accommodation in Siwa with half board (breakfast and dinner included).",
                "2 gourmet lunches at selected local restaurants.",
                "Private luxury transfers between all destinations and airports.",
                "Visits as mentioned in the itinerary."
            ],
            "ar": [
                "المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.",
                "الإقامة لمدة 4 ليالٍ في القاهرة مع الإفطار.",
                "الإقامة لمدة ليلة واحدة في مطروح بنظام نصف الإقامة (إفطار وعشاء).",
                "الإقامة لمدة ليلتين في سيوة بنظام نصف الإقامة (إفطار وعشاء).",
                "غداءان فاخران في مطاعم محلية مختارة.",
                "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.",
                "الزيارات كما هو مذكور في البرنامج."
            ]
        },
        servicesExcluded: {
            "es": [
                "Vuelos internacionales.",
                "Visado 25 $ (pagadero a la llegada).",
                "Propinas para conductores y personal del hotel 40 $ por persona.",
                "Entradas al interior de las Pirámides.",
                "Excursiones opcionales y cualquier visita no mencionada en el programa.",
                "Bebidas y gastos personales."
            ],
            "en": [
                "International flights.",
                "Visa 25 $ (payable upon arrival).",
                "Tips for drivers and hotel staff 40 $ per person.",
                "Entrance fees to the interiors of the Pyramids.",
                "Optional tours and any visits not mentioned in the program.",
                "Beverages and personal expenses."
            ],
            "ar": [
                "الرحلات الجوية الدولية.",
                "التأشيرة 25 دولارًا (تُدفع عند الوصول).",
                "إكراميات للسائقين وموظفي الفنادق 40 دولارًا للشخص الواحد.",
                "رسوم الدخول إلى داخل الأهرامات.",
                "الجولات الاختيارية وأي زيارات غير مذكورة في البرنامج.",
                "المشروبات والمصاريف الشخصية."
            ]
        },
        importantNotes: {
            "es": [
                "Salida diaria garantizada con un mínimo de 2 personas.",
                "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.",
                "Los precios finales pueden variar debido a cambios en tarifas, impuestos y/o recargos por combustible.",
                "El orden de las visitas puede modificarse sin afectar el contenido del viaje.",
                "Las habitaciones triples en cruceros y en varios hoteles son habitaciones dobles con una cama adicional."
            ],
            "en": [
                "Guaranteed daily departure with a minimum of 2 people.",
                "Hotels and cruises may be substituted with others of the same category with prior notice to the client.",
                "Final prices may vary due to changes in rates, taxes, and/or fuel charges.",
                "The order of visits may be modified without affecting the trip content.",
                "Triple rooms in cruises and several hotels are double rooms with an additional bed."
            ],
            "ar": [
                "الانطلاق اليومي مضمون بحد أدنى شخصين.",
                "قد يتم استبدال الفنادق والرحلات البحرية بأخرى من نفس الفئة بعد إشعار مسبق للعميل.",
                "قد تختلف الأسعار النهائية بسبب التغييرات في الأسعار أو الضرائب أو رسوم الوقود.",
                "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.",
                "الغرف الثلاثية في الرحلات البحرية وبعض الفنادق هي غرف مزدوجة بسرير إضافي."
            ]
        }
        ,
        seasonalPricing: {
            "summer": {
                "gold": { "single": 1355, "double": 1185, "triple": 1145 },
                "diamond": { "single": 1860, "double": 1425, "triple": 1385 }
            },
            "winter": {
                "gold": { "single": 1605, "double": 1275, "triple": 1235 },
                "diamond": { "single": 2015, "double": 1515, "triple": 1475 }
            }
        }
    },





    {
        id: 10,
        name: {
            "es": "Leyendas del Nilo",
            "en": "Legends of the Nile",
            "ar": "أساطير النيل"
        },
        icon: "🌊",
        duration: { "days": 6, "nights": 5 },
        priceFrom: 975,
        categories: ["Adventure", "Honeymoon"],
        startCity: { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" },
        runDays: {
            "es": "Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
            "en": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
            "ar": "الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت، الأحد"
        },
        briefDescription: {
            "es": "Embárquese en un cautivador viaje de 6 días por Egipto, donde las antiguas leyendas y el encanto costero se entrelazan.",
            "en": "Embark on a captivating 6-day journey through Egypt, where ancient legends and coastal charm intertwine.",
            "ar": "انطلق في رحلة ساحرة لمدة 6 أيام عبر مصر، حيث تتشابك الأساطير القديمة مع سحر السواحل."
        },
        generalDescription: {
            "es": "Embárquese en un cautivador viaje de 6 días por Egipto, donde las antiguas leyendas y el encanto costero se entrelazan. Comience con una cálida bienvenida en El Cairo y sumérjase en la historia con tours privados por las icónicas Pirámides de Giza, la enigmática Esfinge y la histórica necrópolis de Saqqara. Descubra las joyas culturales de El Cairo mientras recorre el Museo Egipcio, hogar de los tesoros de los faraones, y el vibrante Bazar de Khan El-Khalili, lleno de energía atemporal y artesanías locales. Luego, viaje a Alejandría, donde lo espera la historia mediterránea. Explore la legendaria Biblioteca de Alejandría, admire el histórico Castillo de Qaitbey y descienda a las antiguas Catacumbas, un testimonio del pasado de múltiples capas de Egipto. Después de un día de relajación junto al mar, regrese a El Cairo para una partida sin contratiempos, llevándose consigo recuerdos de las maravillas de Egipto, desde sus antiguos monumentos hasta sus leyendas costeras.",
            "en": "Embark on a captivating 6-day journey through Egypt, where ancient legends and coastal allure intertwine. Begin with a warm welcome in Cairo, and step into history with private tours of the iconic Pyramids of Giza, the enigmatic Sphinx, and the storied necropolis of Saqqara. Uncover Cairo’s cultural gems as you wander through the Egyptian Museum, home to treasures of the pharaohs, and the vibrant Khan El-Khalili Bazaar, alive with timeless energy and local craftsmanship. Then, journey to Alexandria, where the Mediterranean’s whispers of history await. Explore the legendary Library of Alexandria, marvel at the historic Castle of Qaitbey, and descend into the ancient Catacombs, a testament to Egypt’s layered past. After a day of relaxation by the sea, return to Cairo for a seamless departure, bringing home memories of Egypt’s wonders, from its ancient landmarks to its coastal legends.",
            "ar": "انطلق في رحلة ساحرة لمدة 6 أيام عبر مصر، حيث تتداخل الأساطير القديمة مع سحر السواحل. ابدأ باستقبال دافئ في القاهرة، وانغمس في أعماق التاريخ من خلال جولات خاصة لأهرامات الجيزة الشهيرة، وأبو الهول الغامض، والجبانة التاريخية في سقارة. اكتشف الجواهر الثقافية في القاهرة أثناء زيارتك للمتحف المصري، موطن كنوز الفراعنة، وسوق خان الخليلي النابض بالحياة، المليء بالحرف اليدوية والطاقة الخالدة. ثم توجه إلى الإسكندرية، حيث التاريخ المتوسطي في انتظارك. استكشف مكتبة الإسكندرية الأسطورية، وأعجب بقلعة قايتباي التاريخية، وانزل إلى السراديب القديمة (الكتاكومب)، التي تشهد على التاريخ المتعدد الطبقات لمصر. وبعد يوم من الاسترخاء على شاطئ البحر، عد إلى القاهرة لرحيل سلس، حاملاً معك ذكريات لا تُنسى عن عجائب مصر، من آثارها القديمة إلى أساطيرها الساحلية."
        },
        servicesIncluded: {
            "es": ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo para los trámites de visado y aduana.", "4 noches de alojamiento en El Cairo con desayuno.", "1 noche de alojamiento en Alejandría con media pensión (desayuno y cena incluidos).", "3 almuerzos gourmet en restaurantes locales seleccionados.", "Traslados privados de lujo entre todos los destinos y aeropuertos.", "Visitas según lo mencionado en el itinerario."],
            "en": ["Assistance upon arrival at Cairo International Airport for visa and customs procedures.", "4 nights of accommodation in Cairo with breakfast.", "1 night of accommodation in Alexandria with half board (breakfast and dinner included).", "3 gourmet lunches at selected local restaurants.", "Private luxury transfers between all destinations and airports.", "Visits as mentioned in the itinerary."],
            "ar": ["المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.", "4 ليالٍ في القاهرة مع الإفطار.", "ليلة واحدة في الإسكندرية بنظام نصف الإقامة (الإفطار والعشاء مشمولان).", "3 وجبات غداء فاخرة في مطاعم محلية مختارة.", "تنقلات خاصة فاخرة بين جميع الوجهات والمطارات.", "الزيارات حسب البرنامج."]
        },
        servicesExcluded: {
            "es": ["Vuelos internacionales.", "Visado 25 $ (pagadero a la llegada).", "Propinas para conductores y personal del hotel 30 $ por persona.", "Entradas al interior de las Pirámides.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
            "en": ["International flights.", "Visa 25 $, (payable upon arrival).", "Tips for drivers and hotel staff 30 $ per person.", "Entrance fees to the interiors of the Pyramids.", "Optional tours and any visits not mentioned in the program.", "Beverages and personal expenses."],
            "ar": ["الرحلات الدولية.", "التأشيرة 25 دولارًا (تدفع عند الوصول).", "البقشيش للسائقين وموظفي الفندق 30 دولارًا للشخص.", "رسوم دخول الأهرامات.", "الرحلات الاختيارية وأي زيارات غير مذكورة في البرنامج.", "المشروبات والمصروفات الشخصية."]
        },
        itinerary: [
            { "day": 1, "title": { "es": "Llegada a El Cairo – Una Gran Bienvenida", "en": "Arrival in Cairo – A Grand Welcome", "ar": "الوصول إلى القاهرة – ترحيب كبير" }, "activities": { "es": ["A su llegada al Aeropuerto Internacional de El Cairo, nuestro equipo le brindará una cálida bienvenida, asistiendo con los trámites de visado y aduana para garantizar una llegada fluida y sin inconvenientes. Relájese con refrescos mientras recibe atención personalizada desde el inicio de su viaje.", "Un vehículo lo trasladará cómodamente a su hotel. Instálese en su elegante habitación, relájese y disfrute de su primera noche en la vibrante ciudad de El Cairo, sumergiéndose en su cautivadora atmósfera.", "Alojamiento en El Cairo."], "en": ["Upon your arrival at Cairo International Airport, experience a warm welcome from our team, who will assist you with visa and customs procedures to ensure a smooth and hassle-free arrival. Relax with refreshments as you receive personalized attention from the very start of your journey.", "A comfortable vehicle will transfer you to your hotel. Settle into your elegant room, unwind, and enjoy your first night in the vibrant city of Cairo, immersing yourself in its captivating ambiance.", "Overnight in Cairo."], "ar": ["عند وصولك إلى مطار القاهرة الدولي، سيستقبلك فريقنا ترحيبًا حارًا، مع المساعدة في إجراءات التأشيرة والجمارك لضمان وصول سلس دون أي متاعب. استرخِ واستمتع بالمشروبات المنعشة بينما تتلقى خدمة شخصية منذ بداية رحلتك.", "سيقوم سائق بنقلك براحة إلى الفندق. استقر في غرفتك الأنيقة، استرخِ واستمتع بليلتك الأولى في مدينة القاهرة النابضة بالحياة، منغمسًا في أجوائها الساحرة.", "إقامة في القاهرة."] } },
            { "day": 2, "title": { "es": "El Cairo – Pirámides y Tesoros de la Antigüedad", "en": "Cairo – Pyramids and Ancient Treasures", "ar": "القاهرة – الأهرامات وكنوز العصور القديمة" }, "activities": { "es": ["Comience su día con un desayuno buffet en su hotel, recargando su energía para un día lleno de descubrimientos impresionantes.", "Visite las icónicas Pirámides de Giza (Keops, Kefrén y Micerino), maravillas arquitectónicas que han cautivado a la humanidad durante más de 4,000 años. Con su guía experto, descubrirá detalles ocultos y secretos fascinantes de estos majestuosos monumentos.", "Admire la misteriosa Esfinge, el eterno guardián de las pirámides, y explore el Templo del Valle de Kefrén, donde aprenderá sobre las ceremonias funerarias de los antiguos faraones.", "Luego, explore la Necrópolis de Saqqara, hogar de la Pirámide Escalonada de Djoser, la estructura de piedra más antigua del mundo. Sumérjase en la historia viva de más de 3,000 años de rituales y entierros.", "Disfrute de un almuerzo gourmet en un restaurante local cuidadosamente seleccionado, donde podrá saborear los auténticos sabores de la cocina egipcia con un toque moderno.", "Regrese a su hotel para una tarde libre para relajarse o explorar a su gusto.", "Alojamiento en El Cairo."], "en": ["Start your day with a buffet breakfast at your hotel, recharging your energy for a day filled with impressive discoveries.", "Begin with a visit to the iconic Pyramids of Giza (Khufu, Khafre, and Menkaure), marvels of architecture that have captivated humanity for over 4,000 years. With your expert guide, gain insights into the hidden details and fascinating secrets of these majestic monuments.", "Admire the mysterious Sphinx, the eternal guardian of the pyramids, and explore the Valley Temple of Khafre, where you’ll learn about the funerary ceremonies of the ancient pharaohs.", "Next, visit the Saqqara Necropolis, home to the Step Pyramid of Djoser, the world’s oldest stone structure. Immerse yourself in the ancient history of over 3,000 years of rituals and burials.", "Enjoy a gourmet lunch at a carefully selected local restaurant, where you can savor the authentic flavors of Egyptian cuisine with a modern twist.", "Return to your hotel for a free afternoon to relax or explore at your leisure.", "Overnight in Cairo."], "ar": ["ابدأ يومك بوجبة إفطار بوفيه في فندقك لتجديد طاقتك ليوم مليء بالاكتشافات المذهلة.", "ابدأ بزيارة أهرامات الجيزة الشهيرة (خوفو وخفرع ومنقرع)، روائع معمارية أبهرت البشرية لأكثر من 4000 عام. برفقة دليلك المتخصص، ستتعرف على التفاصيل الخفية والأسرار المثيرة لهذه المعالم العظيمة.", "أعجب بأبو الهول الغامض، الحارس الأبدي للأهرامات، واستكشف معبد وادي خفرع حيث ستتعرف على طقوس الدفن عند الفراعنة القدماء.", "بعد ذلك، قم بزيارة جبانة سقارة التي تضم هرم زوسر المدرج، أقدم بناء حجري في العالم. انغمس في التاريخ العريق الممتد لأكثر من 3000 عام من الطقوس والدفن.", "استمتع بغداء فاخر في مطعم محلي مختار بعناية حيث يمكنك تذوق نكهات المطبخ المصري الأصيل بلمسة عصرية.", "عد إلى فندقك لقضاء فترة بعد الظهر بحرية للاسترخاء أو الاستكشاف حسب رغبتك.", "مبيت في القاهرة."] } },
            {
                "day": 3,
                "title": {
                    "es": "El Cairo – Historia, Cultura y Tradición",
                    "en": "Cairo – History, Culture and Tradition",
                    "ar": "القاهرة – التاريخ والثقافة والتقاليد"
                },
                "activities": {
                    "es": [
                        "Disfrute de un desayuno buffet en su hotel antes de sumergirse nuevamente en la rica historia y cultura de Egipto.",
                        "Comience su día en el famoso Museo Egipcio, hogar de los legendarios tesoros dorados del Rey Tutankamón. Con miles de artefactos que abarcan más de 5,000 años, este museo ofrece una emocionante exploración de las antiguas reliquias de Egipto.",
                        "A continuación, visite la majestuosa Mezquita de Alabastro de Mohamed Ali, situada en lo alto de la Ciudadela de Saladino. Disfrute de las vistas panorámicas de El Cairo y descubra la fascinante historia de este sitio sagrado, símbolo del poder y la devoción de Egipto.",
                        "Luego, sumérjase en el vibrante bazar de Khan el-Khalili, uno de los mercados más antiguos y coloridos de El Cairo. Los aromas de especias exóticas, artesanías y la auténtica atmósfera del mercado lo transportarán a otra época. Aproveche para adquirir tesoros únicos de Egipto y disfrute de una experiencia de compra inolvidable.",
                        "Saboree un almuerzo en un restaurante local y disfrute de una tarde libre para explorar a su propio ritmo o relajarse en su hotel.",
                        "Alojamiento en El Cairo."
                    ],
                    "en": [
                        "Enjoy a buffet breakfast at your hotel before diving once again into the rich history and culture of Egypt.",
                        "Begin your day at the famous Egyptian Museum, home to the legendary golden treasures of King Tutankhamun. With thousands of artifacts spanning over 5,000 years, this museum offers an exciting exploration of Egypt’s ancient relics.",
                        "Next, visit the majestic Alabaster Mosque of Mohamed Ali, perched atop the Citadel of Saladin. Enjoy panoramic views of Cairo and uncover the fascinating history of this sacred site, a symbol of Egypt’s power and devotion.",
                        "Then, immerse yourself in the vibrant Khan el-Khalili Bazaar, one of Cairo’s oldest and most colorful markets. The aromas of exotic spices, crafts, and the authentic atmosphere will transport you to another era. Take the opportunity to find unique Egyptian treasures and enjoy an unforgettable shopping experience.",
                        "Savor lunch at a local restaurant and enjoy a free afternoon to explore at your own pace or relax at your hotel.",
                        "Overnight in Cairo."
                    ],
                    "ar": [
                        "استمتع بوجبة إفطار بوفيه في فندقك قبل أن تغوص مرة أخرى في التاريخ والثقافة الغنية لمصر.",
                        "ابدأ يومك بزيارة المتحف المصري الشهير، موطن الكنوز الذهبية الأسطورية للملك توت عنخ آمون. يضم آلاف القطع الأثرية التي تمتد لأكثر من 5000 عام، ويقدم المتحف رحلة شيقة عبر تاريخ مصر القديم.",
                        "بعد ذلك، زر مسجد محمد علي المرمر الرائع الواقع أعلى قلعة صلاح الدين. استمتع بالإطلالات البانورامية على القاهرة واكتشف التاريخ المثير لهذا الموقع المقدس، رمز القوة والإيمان في مصر.",
                        "ثم انغمس في سوق خان الخليلي الحيوي، أحد أقدم وأشهر الأسواق في القاهرة. ستأخذك روائح التوابل والمشغولات اليدوية والأجواء الأصيلة في رحلة إلى زمن آخر. اغتنم الفرصة لاقتناء كنوز مصرية فريدة واستمتع بتجربة تسوق لا تُنسى.",
                        "تناول الغداء في مطعم محلي واستمتع ببقية اليوم بحرية للاستكشاف أو الاسترخاء في فندقك.",
                        "إقامة في القاهرة."
                    ]
                }
            },
            {
                "day": 4,
                "title": {
                    "es": "De El Cairo a Alejandría – La Joya del Mediterráneo",
                    "en": "From Cairo to Alexandria – The Jewel of the Mediterranean",
                    "ar": "من القاهرة إلى الإسكندرية – جوهرة البحر الأبيض المتوسط"
                },
                "activities": {
                    "es": [
                        "Después de un delicioso desayuno buffet en su hotel, parta hacia la histórica ciudad de Alejandría, conocida por su rico patrimonio cultural y fascinante historia. Viaje en un cómodo vehículo, disfrutando de las vistas panorámicas de los diversos paisajes de Egipto.",
                        "A su llegada a Alejandría, comience con una visita a la impresionante Biblioteca de Alejandría, una maravilla moderna que rinde homenaje al antiguo centro de conocimiento. Explore sus colecciones y exposiciones exclusivas que celebran la historia y la civilización de Egipto.",
                        "A continuación, visite la Ciudadela de Qaitbay, una impresionante fortaleza medieval construida sobre las ruinas del legendario Faro de Alejandría, una de las Siete Maravillas del Mundo Antiguo. Disfrute de espectaculares vistas del puerto y del Mar Mediterráneo desde este sitio histórico.",
                        "Continúe hacia las Catacumbas de Kom el Shoqafa, una fascinante necrópolis subterránea que mezcla estilos arquitectónicos egipcios, griegos y romanos, ofreciendo una experiencia única y envolvente de la historia de Egipto.",
                        "Concluya su recorrido con una visita a la Columna de Pompeyo, un antiguo monumento que se alza sobre el paisaje de Alejandría, erigido en honor al emperador Diocleciano.",
                        "Saboree un almuerzo gourmet en un reconocido restaurante local, donde podrá disfrutar de los frescos sabores del Mediterráneo.",
                        "Después del recorrido, traslado a su hotel, donde podrá disfrutar de una cena tranquila y una relajante noche junto al mar.",
                        "Alojamiento en Alejandría."
                    ],
                    "en": [
                        "After a delicious buffet breakfast at your hotel, depart for the historic city of Alexandria, known for its rich cultural heritage and fascinating history. Travel in a comfortable vehicle and enjoy panoramic views of Egypt’s diverse landscapes.",
                        "Upon arrival in Alexandria, begin with a visit to the impressive Library of Alexandria, a modern marvel that pays tribute to the ancient center of knowledge. Explore its exclusive collections and exhibitions that celebrate Egypt’s history and civilization.",
                        "Next, visit the Citadel of Qaitbay, an impressive medieval fortress built on the ruins of the legendary Lighthouse of Alexandria, one of the Seven Wonders of the Ancient World. Enjoy spectacular views of the harbor and the Mediterranean Sea from this historic site.",
                        "Continue to the Catacombs of Kom El Shoqafa, a fascinating underground necropolis blending Egyptian, Greek, and Roman architectural styles, offering a unique and immersive experience of Egypt’s past.",
                        "End your tour with a visit to Pompey’s Pillar, an ancient monument rising above Alexandria’s skyline, built in honor of Emperor Diocletian.",
                        "Savor a gourmet lunch at a renowned local restaurant, where you can enjoy the fresh flavors of the Mediterranean.",
                        "After the tour, transfer to your hotel to enjoy a peaceful dinner and a relaxing evening by the sea.",
                        "Overnight in Alexandria."
                    ],
                    "ar": [
                        "بعد تناول وجبة إفطار بوفيه شهية في فندقك، انطلق إلى مدينة الإسكندرية التاريخية المعروفة بتراثها الثقافي الغني وتاريخها المثير. استمتع بالرحلة في سيارة مريحة ومشاهدة المناظر الخلابة للطبيعة المصرية المتنوعة.",
                        "عند الوصول إلى الإسكندرية، ابدأ بزيارة مكتبة الإسكندرية المذهلة، وهي معجزة حديثة تكرم المركز القديم للمعرفة. استكشف مجموعاتها ومعارضها الفريدة التي تحتفي بتاريخ مصر وحضارتها.",
                        "بعد ذلك، زر قلعة قايتباي، وهي حصن من العصور الوسطى بُني فوق أنقاض منارة الإسكندرية الأسطورية، إحدى عجائب الدنيا السبع القديمة. استمتع بالإطلالات الرائعة على الميناء والبحر الأبيض المتوسط من هذا الموقع التاريخي.",
                        "تابع إلى مقابر كوم الشقافة، وهي مدينة دفن تحت الأرض تجمع بين الأساليب المعمارية المصرية واليونانية والرومانية، مما يقدم تجربة فريدة ومتكاملة لتاريخ مصر.",
                        "اختم جولتك بزيارة عمود بومبي، وهو نصب قديم شامخ فوق أفق الإسكندرية، أقيم تكريمًا للإمبراطور دقلديانوس.",
                        "استمتع بغداء فاخر في مطعم محلي معروف حيث يمكنك تذوق نكهات البحر الأبيض المتوسط الطازجة.",
                        "بعد الجولة، انتقل إلى فندقك لتستمتع بعشاء هادئ وليلة مريحة بجانب البحر.",
                        "إقامة في الإسكندرية."
                    ]
                }
            },
            {
                "day": 5,
                "title": {
                    "es": "Alejandría – Día Libre y Regreso a El Cairo",
                    "en": "Alexandria – Free Day and Return to Cairo",
                    "ar": "الإسكندرية – يوم حر والعودة إلى القاهرة"
                },
                "activities": {
                    "es": [
                        "Comience su día con un desayuno buffet en su hotel con vistas al Mediterráneo.",
                        "Disfrute de un día libre para relajarse y explorar Alejandría a su propio ritmo. Pasee por el encantador Corniche, admire las vistas al mar o relájese en una cafetería al aire libre mientras toma un café.",
                        "Opcional: Puede optar por unirse a un tour privado adicional para descubrir más secretos ocultos de Alejandría o explorar otros sitios de interés según sus preferencias.",
                        "A la hora programada, un vehículo privado lo trasladará de regreso a El Cairo. Disfrute de su última noche en su hotel, donde podrá relajarse y concluir su viaje con estilo.",
                        "Alojamiento en El Cairo."
                    ],
                    "en": [
                        "Start your day with a buffet breakfast at your hotel overlooking the Mediterranean Sea.",
                        "Enjoy a free day to relax and explore Alexandria at your own pace. Stroll along the charming Corniche, admire the sea views, or relax at an outdoor café while having a coffee.",
                        "Optional: You may choose to join an additional private tour to uncover more hidden secrets of Alexandria or visit other points of interest according to your preferences.",
                        "At the scheduled time, a private vehicle will transfer you back to Cairo. Enjoy your last night at your hotel, where you can relax and end your journey in comfort.",
                        "Overnight in Cairo."
                    ],
                    "ar": [
                        "ابدأ يومك بوجبة إفطار بوفيه في فندقك المطل على البحر الأبيض المتوسط.",
                        "استمتع بيوم حر للاسترخاء واستكشاف الإسكندرية على طريقتك الخاصة. تمشَّ على الكورنيش الساحر، واستمتع بإطلالات البحر أو اجلس في مقهى في الهواء الطلق لتناول القهوة.",
                        "اختياري: يمكنك الانضمام إلى جولة خاصة إضافية لاكتشاف المزيد من أسرار الإسكندرية أو زيارة أماكن أخرى حسب تفضيلاتك.",
                        "في الوقت المحدد، سيقوم سائق خاص بنقلك مرة أخرى إلى القاهرة. استمتع بليلتك الأخيرة في الفندق حيث يمكنك الاسترخاء وإنهاء رحلتك براحة.",
                        "إقامة في القاهرة."
                    ]
                }
            },
            {
                "day": 6,
                "title": {
                    "es": "El Cairo – Despedida de Egipto",
                    "en": "Cairo – Farewell to Egypt",
                    "ar": "القاهرة – توديع مصر"
                },
                "activities": {
                    "es": [
                        "Después de disfrutar de un desayuno buffet en su hotel, será trasladado en un vehículo privado VIP al Aeropuerto Internacional de El Cairo.",
                        "Nuestro equipo se asegurará de que su partida sea tan fluida como su llegada, garantizando que su experiencia en Egipto termine de manera tranquila y con recuerdos inolvidables.",
                        "Fin de nuestros servicios."
                    ],
                    "en": [
                        "After enjoying a buffet breakfast at your hotel, you will be transferred in a private VIP vehicle to Cairo International Airport.",
                        "Our team will ensure your departure is as smooth as your arrival, making sure your experience in Egypt ends peacefully and with unforgettable memories.",
                        "End of our services."
                    ],
                    "ar": [
                        "بعد الاستمتاع بوجبة إفطار بوفيه في فندقك، سيتم نقلك بسيارة خاصة فاخرة إلى مطار القاهرة الدولي.",
                        "سيتأكد فريقنا من أن تكون مغادرتك سلسة مثل وصولك، لضمان أن تنتهي رحلتك في مصر بهدوء وذكريات لا تُنسى.",
                        "نهاية خدماتنا."
                    ]
                }
            }
        ],
        accommodations: {
            "gold": [
                { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Helnan Dreamland", "en": "Helnan Dreamland", "ar": "هيلنان دريم لاند" } },
                { "city": { "es": "Alejandría", "en": "Alexandria", "ar": "الإسكندرية" }, "hotel": { "es": "Helnan Mamoura", "en": "Helnan Mamoura", "ar": "هيلنان مامورا" } }
            ],
            "diamond": [
                { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Fairmont Nile City", "en": "Fairmont Nile City", "ar": "فيرمونت نايل سيتي" } },
                { "city": { "es": "Alejandría", "en": "Alexandria", "ar": "الإسكندرية" }, "hotel": { "es": "Helnan Mamoura", "en": "Helnan Mamoura", "ar": "هيلنان مامورا" } }
            ]
        },
        seasonalPricing: {
            "summer": {
                "gold": { "single": 865, "double": 775, "triple": 735 },
                "diamond": { "single": 1275, "double": 1015, "triple": 975 }
            },
            "winter": {
                "gold": { "single": 985, "double": 845, "triple": 805 },
                "diamond": { "single": 1390, "double": 1085, "triple": 1045 }
            }
        },
        importantNotes: {
            "es": [
                "Salida diaria garantizada con un mínimo de 2 personas.",
                "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.",
                "Los precios finales pueden variar debido a cambios en tarifas, impuestos y/o recargos por combustible.",
                "El orden de las visitas puede modificarse sin afectar el contenido del viaje.",
                "Las habitaciones triples en cruceros y en varios hoteles son habitaciones dobles con una cama adicional."
            ],
            "en": [
                "Guaranteed daily departure with a minimum of 2 people.",
                "Hotels and cruises may be substituted with others of the same category with prior notice to the client.",
                "Final prices may vary due to changes in rates, taxes, and/or fuel charges.",
                "The order of visits may be modified without affecting the trip content.",
                "Triple rooms in cruises and several hotels are double rooms with an additional bed."
            ],
            "ar": [
                "الانطلاق اليومي مضمون بحد أدنى شخصين.",
                "قد يتم استبدال الفنادق والسفن بأخرى من نفس الفئة بعد إشعار مسبق.",
                "قد تتغير الأسعار النهائية بسبب تغييرات الرسوم أو الضرائب أو الوقود.",
                "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.",
                "الغرف الثلاثية في بعض الفنادق والسفن هي غرف مزدوجة مع سرير إضافي."
            ]
        }

    }
];