
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
        categories: ["Aventura", "Cultural", "Histórico", "Familiar", "Lujo", "Crucero"],
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
            es: ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo para los trámites de visado y aduana.", "Vuelos domésticos (Cairo-Asuán, Luxor-Cairo) o (Cairo-Luxor, Asuán-Cairo).", "3 o 4 noches de alojamiento en El Cairo con desayuno.", "4 o 3 noches en un crucero de 5 estrellas por el Nilo con pensión completa (bebidas no incluidas).", "1 almuerzo gourmet en un restaurante local seleccionado.", "Traslados privados de lujo entre todos los destinos y aeropuertos.", "Visitas según lo mencionado en el itinerario."],
            en: ["Arrival assistance at Cairo International Airport for visa and customs procedures.", "Domestic flights (Cairo-Aswan, Luxor-Cairo) or (Cairo-Luxor, Aswan-Cairo).", "3 or 4 nights accommodation in Cairo with breakfast.", "4 or 3 nights on a 5-star Nile cruise with full board (drinks not included).", "1 gourmet lunch at a selected local restaurant.", "Private luxury transfers between all destinations and airports.", "Visits as mentioned in the itinerary."],
            ar: ["المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.", "رحلات طيران داخلية (القاهرة-أسوان، الأقصر-القاهرة) أو (القاهرة-الأقصر، أسوان-القاهرة).", "3 أو 4 ليالٍ إقامة في القاهرة مع وجبة الإفطار.", "4 أو 3 ليالٍ في رحلة نيلية 5 نجوم مع إقامة كاملة (المشروبات غير مدرجة).", "وجبة غداء فاخرة واحدة في مطعم محلي مختار.", "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.", "الزيارات كما هو مذكور في خط سير الرحلة."]
        },
        servicesExcluded: {
            es: ["Vuelos internacionales.", "Visado 25 $ (pagadero a la llegada).", "Propinas para conductores y personal del crucero 50 $ por persona.", "Entradas al interior de las Pirámides y a la Tumba de Tutankamón.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
            en: ["International flights.", "Visa $25 (payable upon arrival).", "Tips for drivers and cruise staff $50 per person.", "Entrance fees to the interior of the Pyramids and Tutankhamun's Tomb.", "Optional excursions and any visits not mentioned in the program.", "Drinks and personal expenses."],
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
        categories: ["Cultural", "Histórico"],
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
            en: "A fascinating getaway to the essence of Egypt. From the magical welcome at the airport to the comfort of a selected hotel, you'll discover the jewels of Cairo: the Giza Pyramids and the Great Sphinx, the Saqqara necropolis, the innovative Grand Egyptian Museum, and the imposing Mohamed Ali Mosque at the Citadel. Explore the bustling Khan el-Khalili bazaar and enjoy a free day to choose from unique experiences: a visit to Memphis, Coptic Cairo, a private felucca cruise, or simply relaxing at your hotel. An adventure that concludes in the heart of the city, full of wonder and discovery.",
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
                title: { es: "Llegada a El Cairo – Gran Bienvenida", en: "Arrival in Cairo – Grand Welcome", ar: "الوصول إلى القاهرة – ترحيب كبير" }, 
                activities: { 
                    es: ["A su llegada al Aeropuerto Internacional de El Cairo, disfrute de una cálida bienvenida. Nuestro equipo estará esperando para ayudarle con los trámites de visa y aduanas. Traslado a su hotel de lujo."], 
                    en: ["Upon your arrival at Cairo International Airport, enjoy a warm welcome. Our team will be waiting to assist you with visa and customs procedures. Transfer to your luxury hotel."],
                    ar: ["عند وصولك إلى مطار القاهرة الدولي، استمتع بترحيب حار. سيكون فريقنا في انتظارك لمساعدتك في إجراءات التأشيرة والجمارك. الانتقال إلى فندقك الفاخر."]
                } 
            },
            { 
                day: 2, 
                title: { es: "Las Majestuosas Pirámides y Saqqara", en: "The Majestic Pyramids and Saqqara", ar: "الأهرامات المهيبة وسقارة" }, 
                activities: { 
                    es: ["Desayuno. Visita privada a las Pirámides de Giza, la Esfinge y el Templo del Valle. Almuerzo. Por la tarde, explore la Necrópolis de Saqqara y la Pirámide Escalonada de Djoser. Regreso al hotel."], 
                    en: ["Breakfast. Private visit to the Giza Pyramids, the Sphinx, and the Valley Temple. Lunch. In the afternoon, explore the Saqqara Necropolis and the Step Pyramid of Djoser. Return to the hotel."],
                    ar: ["إفطار. زيارة خاصة لأهرامات الجيزة وأبو الهول ومعبد الوادي. غداء. بعد الظهر، استكشف مقبرة سقارة وهرم زوسر المدرج. العودة إلى الفندق."]
                } 
            },
            { 
                day: 3, 
                title: { es: "Historia, Cultura y Bazar", en: "History, Culture, and Bazaar", ar: "التاريخ والثقافة والبازار" }, 
                activities: { 
                    es: ["Desayuno. Visita al Gran Museo Egipcio (GEM). Luego, la Mezquita de Alabastro en la Ciudadela de Saladino. Almuerzo. Termine el día en el vibrante Bazar Khan el-Khalili. Regreso al hotel."], 
                    en: ["Breakfast. Visit the Grand Egyptian Museum (GEM). Then, the Alabaster Mosque at the Citadel of Saladin. Lunch. End the day at the vibrant Khan el-Khalili Bazaar. Return to the hotel."],
                    ar: ["إفطار. زيارة المتحف المصري الكبير. ثم مسجد الألبستر في قلعة صلاح الدين. غداء. اختتم اليوم في بازار خان الخليلي النابض بالحياة. العودة إلى الفندق."]
                } 
            },
            { 
                day: 4, 
                title: { es: "Un Día para Explorar o Relajarse", en: "A Day to Explore or Relax", ar: "يوم للاستكشاف أو الاسترخاء" }, 
                activities: { 
                    es: ["Desayuno. Día libre para disfrutar de El Cairo a su ritmo. Opciones sugeridas: visitar Menfis, el Cairo Copto, o dar un paseo en faluca por el Nilo. Alojamiento en El Cairo."], 
                    en: ["Breakfast. Free day to enjoy Cairo at your own pace. Suggested options: visit Memphis, Coptic Cairo, or take a felucca ride on the Nile. Accommodation in Cairo."],
                    ar: ["إفطار. يوم حر للاستمتاع بالقاهرة على طريقتك. الخيارات المقترحة: زيارة ممفيس، القاهرة القبطية، أو القيام برحلة بالفلوكة على النيل. الإقامة في القاهرة."]
                } 
            },
            { 
                day: 5, 
                title: { es: "Despedida de El Cairo", en: "Farewell to Cairo", ar: "وداع القاهرة" }, 
                activities: { 
                    es: ["Desayuno. A la hora indicada, traslado privado al Aeropuerto Internacional de El Cairo para su partida. Fin de nuestros servicios."], 
                    en: ["Breakfast. At the indicated time, private transfer to Cairo International Airport for your departure. End of our services."],
                    ar: ["إفطار. في الوقت المحدد، نقل خاص إلى مطار القاهرة الدولي للمغادرة. نهاية خدماتنا."]
                } 
            }
        ],
        servicesIncluded: {
            es: ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo para los trámites de visado y aduana.", "4 noches de alojamiento en El Cairo con desayuno.", "2 almuerzos gourmet en restaurantes locales seleccionados.", "Traslados privados de lujo entre todos los destinos y aeropuertos.", "Visitas según lo mencionado en el itinerario."],
            en: ["Arrival assistance at Cairo International Airport for visa and customs procedures.", "4 nights accommodation in Cairo with breakfast.", "2 gourmet lunches at selected local restaurants.", "Private luxury transfers between all destinations and airports.", "Visits as mentioned in the itinerary."],
            ar: ["المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.", "4 ليالٍ إقامة في القاهرة مع وجبة الإفطار.", "وجبتا غداء فاخرتان في مطاعم محلية مختارة.", "انتقالات خاصة فاخرة بين جميع الوجهات والمطارات.", "الزيارات كما هو مذكور في خط سير الرحلة."]
        },
        servicesExcluded: {
            es: ["Vuelos internacionales.", "Visado 25 $ (pagadero a la llegada).", "Propinas para conductores y personal del hotel 25 $ por persona.", "Entradas al interior de las Pirámides.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
            en: ["International flights.", "Visa $25 (payable upon arrival).", "Tips for drivers and hotel staff $25 per person.", "Entrance fees to the interior of the Pyramids.", "Optional excursions and any visits not mentioned in the program.", "Drinks and personal expenses."],
            ar: ["الرحلات الدولية.", "تأشيرة الدخول 25 دولارًا (تُدفع عند الوصول).", "إكراميات للسائقين وموظفي الفندق 25 دولارًا للشخص الواحد.", "رسوم الدخول إلى داخل الأهرامات.", "الرحلات الاختيارية وأي زيارات غير مذكورة في البرنامج.", "المشروبات والمصروفات الشخصية."]
        },
        importantNotes: {
            es: ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles pueden ser sustituidos por otros de la misma categoría con previo aviso.", "Los precios finales pueden variar debido a cambios en tarifas, impuestos y/o recargos por combustible.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Las habitaciones triples son habitaciones dobles con una cama adicional."],
            en: ["Guaranteed daily departure with a minimum of 2 people.", "Hotels may be substituted for others of the same category with prior notice.", "Final prices may vary due to changes in rates, taxes, and/or fuel surcharges.", "The order of visits may be modified without affecting the content of the trip.", "Triple rooms are double rooms with an extra bed."],
            ar: ["مغادرة يومية مضمونة بحد أدنى شخصين.", "يمكن استبدال الفنادق بأخرى من نفس الفئة مع إشعار مسبق.", "قد تختلف الأسعار النهائية بسبب التغييرات في الأسعار والضرائب و/أو رسوم الوقود الإضافية.", "قد يتم تعديل ترتيب الزيارات دون التأثير على محتوى الرحلة.", "الغرف الثلاثية هي غرف مزدوجة مع سرير إضافي."]
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
            en: "The Pharaohs' Journey",
            ar: "رحلة الفراعنة"
        },
        icon: "🚂",
        duration: { days: 8, nights: 7 },
        priceFrom: 915,
        categories: ["Cultural", "Histórico", "Aventura"],
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
            { day: 1, title: { es: "Llegada a El Cairo", en: "Arrival in Cairo", ar: "الوصول إلى القاهرة" }, activities: { es: ["Asistencia a la llegada al aeropuerto y traslado a su hotel. Noche en El Cairo."], en: ["Assistance upon arrival at the airport and transfer to your hotel. Overnight in Cairo."], ar: ["المساعدة عند الوصول إلى المطار والانتقال إلى الفندق. المبيت في القاهرة."] } },
            { day: 2, title: { es: "Pirámides y Viaje a Asuán", en: "Pyramids & Journey to Aswan", ar: "الأهرامات والرحلة إلى أسوان" }, activities: { es: ["Desayuno. Visita a las Pirámides de Giza y la Esfinge. Por la noche, traslado a la estación para tomar el tren nocturno VIP a Asuán."], en: ["Breakfast. Visit the Giza Pyramids and the Sphinx. In the evening, transfer to the station to take the VIP overnight train to Aswan."], ar: ["إفطار. زيارة أهرامات الجيزة وأبو الهول. في المساء، الانتقال إلى المحطة لركوب قطار النوم لكبار الشخصيات إلى أسوان."] } },
            { day: 3, title: { es: "Asuán e Inicio del Crucero", en: "Aswan & Cruise Embarkation", ar: "أسوان وبدء الرحلة النيلية" }, activities: { es: ["Llegada a Asuán. Traslado al crucero. Almuerzo. Visita a la Alta Presa y paseo en faluca por el Nilo. Noche a bordo en Asuán."], en: ["Arrival in Aswan. Transfer to the cruise. Lunch. Visit the High Dam and a felucca ride on the Nile. Overnight on board in Aswan."], ar: ["الوصول إلى أسوان. الانتقال إلى السفينة. غداء. زيارة السد العالي وجولة بالفلوكة في النيل. المبيت على متن السفينة في أسوان."] } },
            { day: 4, title: { es: "Kom Ombo y Edfu", en: "Kom Ombo & Edfu", ar: "كوم أمبو وإدفو" }, activities: { es: ["Pensión completa. Opcional: Abu Simbel. Navegación a Kom Ombo para visitar su templo. Continuación a Edfu y visita a su templo. Noche a bordo."], en: ["Full board. Optional: Abu Simbel. Sail to Kom Ombo to visit its temple. Continue to Edfu and visit its temple. Overnight on board."], ar: ["إقامة كاملة. اختياري: أبو سمبل. الإبحار إلى كوم أمبو لزيارة معبدها. المتابعة إلى إدفو وزيارة معبدها. المبيت على متن السفينة."] } },
            { day: 5, title: { es: "Llegada a Luxor", en: "Arrival in Luxor", ar: "الوصول إلى الأقصر" }, activities: { es: ["Pensión completa. Navegación a Luxor. Visita a los Templos de Luxor y Karnak. Noche a bordo en Luxor."], en: ["Full board. Sail to Luxor. Visit the Temples of Luxor and Karnak. Overnight on board in Luxor."], ar: ["إقامة كاملة. الإبحار إلى الأقصر. زيارة معبدي الأقصر والكرنك. المبيت على متن السفينة في الأقصر."] } },
            { day: 6, title: { es: "Luxor y Regreso a El Cairo", en: "Luxor & Return to Cairo", ar: "الأقصر والعودة إلى القاهرة" }, activities: { es: ["Desayuno. Desembarque. Opcional: Visita al Valle de los Reyes, Templo de Hatshepsut y Colosos de Memnón. Traslado a la estación para tomar el tren nocturno VIP de regreso a El Cairo."], en: ["Breakfast. Disembarkation. Optional: Visit the Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon. Transfer to the station to take the VIP overnight train back to Cairo."], ar: ["إفطار. النزول من السفينة. اختياري: زيارة وادي الملوك ومعبد حتشبسوت وتمثالي ممنون. الانتقال إلى المحطة لركوب قطار النوم لكبار الشخصيات للعودة إلى القاهرة."] } },
            { day: 7, title: { es: "Día Libre en El Cairo", en: "Free Day in Cairo", ar: "يوم حر في القاهرة" }, activities: { es: ["Llegada a El Cairo. Traslado al hotel. Día libre para explorar la ciudad. Opcional: Visita al Gran Museo Egipcio (GEM) y el bazar de Khan el-Khalili."], en: ["Arrival in Cairo. Transfer to the hotel. Free day to explore the city. Optional: Visit the Grand Egyptian Museum (GEM) and the Khan el-Khalili bazaar."], ar: ["الوصول إلى القاهرة. الانتقال إلى الفندق. يوم حر لاستكشاف المدينة. اختياري: زيارة المتحف المصري الكبير وبازار خان الخليلي."] } },
            { day: 8, title: { es: "Salida Final", en: "Final Departure", ar: "المغادرة النهائية" }, activities: { es: ["Desayuno. Traslado al aeropuerto para su vuelo de regreso."], en: ["Breakfast. Transfer to the airport for your return flight."], ar: ["إفطار. الانتقال إلى المطار لرحلة العودة."] } }
        ],
        servicesIncluded: {
            es: ["Asistencia en aeropuertos y estaciones.", "3 noches en hotel en El Cairo con desayuno.", "3 noches en crucero por el Nilo con pensión completa.", "2 noches en tren nocturno VIP (cena y desayuno).", "Visitas mencionadas con guía de habla hispana.", "Todos los traslados en vehículo con A/C."],
            en: ["Assistance at airports and stations.", "3 nights in a hotel in Cairo with breakfast.", "3 nights on a Nile cruise with full board.", "2 nights on a VIP overnight train (dinner and breakfast).", "Mentioned visits with an English-speaking guide.", "All transfers in an A/C vehicle."],
            ar: ["المساعدة في المطارات والمحطات.", "3 ليالٍ في فندق بالقاهرة مع وجبة الإفطار.", "3 ليالٍ في رحلة نيلية مع إقامة كاملة.", "ليلتان في قطار نوم لكبار الشخصيات (عشاء وإفطار).", "الزيارات المذكورة مع مرشد يتحدث لغتك.", "جميع الانتقالات في سيارة مكيفة."]
        },
        servicesExcluded: {
            es: ["Vuelos internacionales.", "Visado (25 USD).", "Propinas (50 USD por persona).", "Excursiones opcionales.", "Bebidas y gastos personales."],
            en: ["International flights.", "Visa ($25).", "Tips ($50 per person).", "Optional excursions.", "Drinks and personal expenses."],
            ar: ["الرحلات الدولية.", "التأشيرة (25 دولارًا).", "الإكراميات (50 دولارًا للشخص الواحد).", "الرحلات الاختيارارية.", "المشروبات والمصروفات الشخصية."]
        },
        importantNotes: {
            es: ["El orden de las visitas puede ser alterado.", "Este programa opera con un mínimo de 2 personas.", "Los cruceros de Asuán a Luxor son de 3 noches."],
            en: ["The order of visits may be altered.", "This program operates with a minimum of 2 people.", "Cruises from Aswan to Luxor are 3 nights."],
            ar: ["قد يتم تغيير ترتيب الزيارات.", "يعمل هذا البرنامج بحد أدنى شخصين.", "الرحلات النيلية من أسوان إلى الأقصر تستغرق 3 ليالٍ."]
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
    categories: ["Cultural", "Histórico"],
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
        es: "Déjese llevar en una travesía de ensueño de 8 días, encantado por las maravillas eternas de Egipto a lo largo del Nilo. Comience con una cálida bienvenida en El Cairo, visite las Pirámides de Giza y el Museo Egipcio. Desde allí, vuele a Luxor para embarcarse en un crucero de 5 estrellas por el Nilo y explore los templos de Luxor, Karnak, Hatshepsut, Edfu, Kom Ombo y Philae, con una excursión exclusiva a Abu Simbel. Finalice con una última noche en El Cairo.",
        en: "Embark on an 8-day dream voyage, enchanted by Egypt’s timeless wonders along the Nile. Begin with a warm welcome in Cairo, visit the Giza Pyramids and Egyptian Museum. Fly to Luxor for a 5-star Nile cruise exploring Luxor, Karnak, Hatshepsut, Edfu, Kom Ombo, and Philae, with an exclusive Abu Simbel excursion. Conclude with a final night in Cairo.",
        ar: "انطلق في رحلة حالمة لمدة 8 أيام مفتونًا بعجائب مصر الأبدية على ضفاف النيل. ابدأ بترحيب دافئ في القاهرة وزيارة أهرامات الجيزة والمتحف المصري. ثم سافر إلى الأقصر لرحلة نيلية فاخرة من فئة 5 نجوم لاستكشاف معابد الأقصر والكرنك وحتشبسوت وإدفو وكوم أمبو وفيلاي، مع رحلة حصرية إلى أبو سمبل. اختتم الرحلة بليلة أخيرة في القاهرة."
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
        { day: 1, title: { es: "Llegada a El Cairo – Una Gran Bienvenida", en: "Arrival in Cairo – A Warm Welcome", ar: "الوصول إلى القاهرة – ترحيب حار" }, activities: { es: ["Asistencia en el aeropuerto, traslado privado y noche en El Cairo."], en: ["Airport assistance, private transfer, and overnight in Cairo."], ar: ["المساعدة في المطار، انتقال خاص، والمبيت في القاهرة."] } },
        { day: 2, title: { es: "El Cairo – Pirámides y Museo Egipcio", en: "Cairo – Pyramids and Egyptian Museum", ar: "القاهرة – الأهرامات والمتحف المصري" }, activities: { es: ["Visita a las Pirámides de Guiza, la Esfinge, el Templo del Valle, el Museo Egipcio y el Barrio Copto. Almuerzo gourmet y noche en El Cairo."], en: ["Visit the Giza Pyramids, Sphinx, Valley Temple, Egyptian Museum, and Coptic Cairo. Gourmet lunch and overnight in Cairo."], ar: ["زيارة أهرامات الجيزة وأبو الهول ومعبد الوادي والمتحف المصري والقاهرة القبطية. غداء فاخر والمبيت في القاهرة."] } },
        { day: 3, title: { es: "De El Cairo a Luxor – Inicio del Crucero", en: "From Cairo to Luxor – Cruise Embarkation", ar: "من القاهرة إلى الأقصر – بدء الرحلة النيلية" }, activities: { es: ["Vuelo a Luxor. Embarque en el crucero 5 estrellas. Visita a los Templos de Luxor y Karnak. Cena y noche a bordo."], en: ["Flight to Luxor. Embark on a 5-star cruise. Visit Luxor and Karnak Temples. Dinner and overnight onboard."], ar: ["رحلة إلى الأقصر. الصعود إلى السفينة الفاخرة. زيارة معبدي الأقصر والكرنك. عشاء ومبيت على متن السفينة."] } },
        { day: 4, title: { es: "Luxor – Valle de los Reyes y Hatshepsut", en: "Luxor – Valley of the Kings and Hatshepsut", ar: "الأقصر – وادي الملوك وحتشبسوت" }, activities: { es: ["Visita al Valle de los Reyes, Templo de Hatshepsut y Colosos de Memnón. Navegación hacia Esna. Noche a bordo."], en: ["Visit Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon. Sail to Esna. Overnight onboard."], ar: ["زيارة وادي الملوك ومعبد حتشبسوت وتمثالي ممنون. الإبحار إلى إسنا. المبيت على متن السفينة."] } },
        { day: 5, title: { es: "Esna – Edfu y Kom Ombo", en: "Esna – Edfu and Kom Ombo", ar: "إسنا – إدفو وكوم أمبو" }, activities: { es: ["Visita al Templo de Horus en Edfu y al templo dual de Kom Ombo. Navegación hacia Asuán. Noche a bordo."], en: ["Visit the Temple of Horus in Edfu and the dual temple of Kom Ombo. Sail to Aswan. Overnight onboard."], ar: ["زيارة معبد حورس في إدفو والمعبد المزدوج في كوم أمبو. الإبحار إلى أسوان. المبيت على متن السفينة."] } },
        { day: 6, title: { es: "Asuán – Templo de Filae y Navegación", en: "Aswan – Philae Temple and Sailing", ar: "أسوان – معبد فيلاي والإبحار" }, activities: { es: ["Visita a la Gran Presa y al Templo de Filae. Paseo en faluca y visita opcional a un pueblo nubio. Cena y noche a bordo."], en: ["Visit the High Dam and Philae Temple. Felucca ride and optional Nubian village visit. Dinner and overnight onboard."], ar: ["زيارة السد العالي ومعبد فيلاي. جولة بالفلوكة وزيارة اختيارية لقرية نوبية. عشاء ومبيت على متن السفينة."] } },
        { day: 7, title: { es: "Asuán – Abu Simbel y Regreso a El Cairo", en: "Aswan – Abu Simbel and Return to Cairo", ar: "أسوان – أبو سمبل والعودة إلى القاهرة" }, activities: { es: ["Excursión a Abu Simbel. Vuelo a El Cairo. Noche en El Cairo."], en: ["Excursion to Abu Simbel. Flight to Cairo. Overnight in Cairo."], ar: ["رحلة إلى أبو سمبل. طيران إلى القاهرة. المبيت في القاهرة."] } },
        { day: 8, title: { es: "Salida Final", en: "Final Departure", ar: "المغادرة النهائية" }, activities: { es: ["Traslado al aeropuerto para su vuelo de regreso."], en: ["Transfer to the airport for your return flight."], ar: ["الانتقال إلى المطار لرحلة العودة."] } }
    ],
    servicesIncluded: {
        es: ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo.", "Vuelos domésticos (Cairo-Luxor, Asuán-Cairo).", "3 noches de alojamiento en El Cairo con desayuno.", "4 noches de crucero 5 estrellas por el Nilo con pensión completa.", "1 almuerzo gourmet en restaurante local.", "Traslados privados de lujo.", "Visitas según el itinerario."],
        en: ["Assistance upon arrival at Cairo International Airport.", "Domestic flights (Cairo-Luxor, Aswan-Cairo).", "3 nights in Cairo with breakfast.", "4 nights on a 5-star Nile Cruise with full board.", "1 gourmet lunch in a selected local restaurant.", "Luxury private transfers.", "Visits as mentioned in the itinerary."],
        ar: ["المساعدة عند الوصول إلى مطار القاهرة الدولي.", "رحلات داخلية (القاهرة – الأقصر، أسوان – القاهرة).", "3 ليالٍ في القاهرة مع الإفطار.", "4 ليالٍ في رحلة نيلية فاخرة بخدمة كاملة.", "غداء فاخر في مطعم محلي مختار.", "انتقالات خاصة فاخرة.", "زيارات حسب البرنامج."]
    },
    servicesExcluded: {
        es: ["Vuelos internacionales.", "Visado (25 USD).", "Propinas (50 USD por persona).", "Entradas al interior de las Pirámides y la Tumba de Tutankamón.", "Excursiones opcionales.", "Bebidas y gastos personales."],
        en: ["International flights.", "Visa ($25).", "Tips ($50 per person).", "Entrance to inside the Pyramids and Tutankhamun’s tomb.", "Optional excursions.", "Drinks and personal expenses."],
        ar: ["الرحلات الدولية.", "التأشيرة (25 دولارًا).", "الإكراميات (50 دولارًا للشخص).", "الدخول إلى داخل الأهرامات وقبر توت عنخ آمون.", "الرحلات الاختيارية.", "المشروبات والمصروفات الشخصية."]
    },
    importantNotes: {
        es: ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Los cruceros desde Luxor salen cada sábado y lunes."],
        en: ["Daily departures guaranteed with a minimum of 2 people.", "Hotels and cruises may be replaced by others of the same category.", "The order of visits may change without affecting the program content.", "Cruises from Luxor depart every Saturday and Monday."],
        ar: ["رحلات يومية مضمونة بحد أدنى شخصين.", "قد يتم استبدال الفنادق والرحلات البحرية بأخرى من نفس الفئة.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "تغادر الرحلات النيلية من الأقصر كل سبت واثنين."]
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
    categories: ["Cultural", "Histórico", "City Tour"],
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
        es: "Descubra los Misterios del Nilo en un majestuoso viaje de 8 días a través de Egipto. Comience en El Cairo con las Pirámides de Giza, Saqqara, y el Museo Egipcio. Explore la Ciudadela, la Mezquita de Muhammad Ali y el Bazar de Khan el-Khalili. Luego, vuele a Asuán para visitar la Presa Alta y el Templo de Filae antes de embarcarse en un crucero de lujo por el Nilo. Navegue hacia Abu Simbel, Kom Ombo, Edfu y Luxor para descubrir los templos de Karnak, Luxor, y el Valle de los Reyes. Finalice con una última noche en El Cairo.",
        en: "Uncover the Mysteries of the Nile on an 8-day journey through Egypt. Begin in Cairo with visits to the Giza Pyramids, Saqqara, and the Egyptian Museum. Explore the Citadel, the Mosque of Muhammad Ali, and Khan el-Khalili Bazaar. Fly to Aswan to see the High Dam and Philae Temple before boarding a luxury Nile Cruise. Sail to Abu Simbel, Kom Ombo, Edfu, and Luxor to explore Karnak, Luxor, and the Valley of the Kings. Conclude with a final night in Cairo.",
        ar: "اكتشف ألغاز النيل في رحلة لمدة 8 أيام عبر مصر. ابدأ في القاهرة بزيارة أهرامات الجيزة وسقارة والمتحف المصري. استكشف القلعة ومسجد محمد علي وخان الخليلي. ثم سافر إلى أسوان لزيارة السد العالي ومعبد فيلاي قبل الإبحار في رحلة نيلية فاخرة. أبحر إلى أبو سمبل وكوم أمبو وإدفو والأقصر لاستكشاف معابد الكرنك والأقصر ووادي الملوك. اختتم بليلة أخيرة في القاهرة."
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
        { day: 1, title: { es: "Llegada a El Cairo – Una Gran Bienvenida", en: "Arrival in Cairo – A Warm Welcome", ar: "الوصول إلى القاهرة – ترحيب حار" }, activities: { es: ["Asistencia en el aeropuerto, traslado privado y noche en El Cairo."], en: ["Assistance at the airport, private transfer, and overnight in Cairo."], ar: ["المساعدة في المطار، انتقال خاص، والمبيت في القاهرة."] } },
        { day: 2, title: { es: "El Cairo – Pirámides y Saqqara", en: "Cairo – Pyramids and Saqqara", ar: "القاهرة – الأهرامات وسقارة" }, activities: { es: ["Visita a las Pirámides de Giza, la Esfinge y la necrópolis de Saqqara. Almuerzo gourmet y noche en El Cairo."], en: ["Visit the Giza Pyramids, Sphinx, and Saqqara necropolis. Gourmet lunch and overnight in Cairo."], ar: ["زيارة أهرامات الجيزة وأبو الهول وسقارة. غداء فاخر والمبيت في القاهرة."] } },
        { day: 3, title: { es: "El Cairo – Museo Egipcio y Khan el-Khalili", en: "Cairo – Egyptian Museum and Khan el-Khalili", ar: "القاهرة – المتحف المصري وخان الخليلي" }, activities: { es: ["Visita al Museo Egipcio, la Ciudadela, la Mezquita de Muhammad Ali y el Bazar de Khan el-Khalili. Almuerzo gourmet. Noche en El Cairo."], en: ["Visit the Egyptian Museum, Citadel, Mosque of Muhammad Ali, and Khan el-Khalili Bazaar. Gourmet lunch. Overnight in Cairo."], ar: ["زيارة المتحف المصري والقلعة ومسجد محمد علي وخان الخليلي. غداء فاخر والمبيت في القاهرة."] } },
        { day: 4, title: { es: "De El Cairo a Asuán – Templo de Filae", en: "From Cairo to Aswan – Philae Temple", ar: "من القاهرة إلى أسوان – معبد فيلاي" }, activities: { es: ["Vuelo a Asuán. Visita a la Presa Alta y al Templo de Filae. Paseo en faluca y embarque en el crucero. Cena y noche a bordo."], en: ["Flight to Aswan. Visit the High Dam and Philae Temple. Felucca ride and embarkation. Dinner and overnight onboard."], ar: ["رحلة إلى أسوان. زيارة السد العالي ومعبد فيلاي. جولة بالفلوكة والصعود إلى السفينة. عشاء ومبيت على متن السفينة."] } },
        { day: 5, title: { es: "Asuán – Abu Simbel y Kom Ombo", en: "Aswan – Abu Simbel and Kom Ombo", ar: "أسوان – أبو سمبل وكوم أمبو" }, activities: { es: ["Excursión a Abu Simbel. Visita al templo dual de Kom Ombo. Navegación hacia Edfu. Noche a bordo."], en: ["Excursion to Abu Simbel. Visit the dual temple of Kom Ombo. Sail to Edfu. Overnight onboard."], ar: ["رحلة إلى أبو سمبل. زيارة المعبد المزدوج في كوم أمبو. الإبحار إلى إدفو. المبيت على متن السفينة."] } },
        { day: 6, title: { es: "Edfu – Luxor", en: "Edfu – Luxor", ar: "إدفو – الأقصر" }, activities: { es: ["Visita al Templo de Horus en Edfu y al Templo de Luxor. Cena y noche a bordo."], en: ["Visit the Temple of Horus in Edfu and the Temple of Luxor. Dinner and overnight onboard."], ar: ["زيارة معبد حورس في إدفو ومعبد الأقصر. عشاء ومبيت على متن السفينة."] } },
        { day: 7, title: { es: "Luxor – Valle de los Reyes y Karnak", en: "Luxor – Valley of the Kings and Karnak", ar: "الأقصر – وادي الملوك والكرنك" }, activities: { es: ["Visita a los templos de Karnak, el Valle de los Reyes, el Templo de Hatshepsut y los Colosos de Memnón. Vuelo a El Cairo. Noche en El Cairo."], en: ["Visit Karnak Temples, Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon. Flight to Cairo. Overnight in Cairo."], ar: ["زيارة معابد الكرنك ووادي الملوك ومعبد حتشبسوت وتمثالي ممنون. طيران إلى القاهرة. المبيت في القاهرة."] } },
        { day: 8, title: { es: "Salida de El Cairo", en: "Departure from Cairo", ar: "مغادرة القاهرة" }, activities: { es: ["Traslado al aeropuerto para su vuelo de regreso."], en: ["Transfer to the airport for your return flight."], ar: ["الانتقال إلى المطار لرحلة العودة."] } }
    ],
    servicesIncluded: {
        es: ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo.", "Vuelos domésticos (Cairo-Asuán, Luxor-Cairo).", "4 noches de alojamiento en El Cairo con desayuno.", "3 noches de crucero 5 estrellas por el Nilo con pensión completa.", "2 almuerzos gourmet en restaurantes locales.", "Traslados privados de lujo.", "Visitas según el itinerario."],
        en: ["Assistance upon arrival at Cairo International Airport.", "Domestic flights (Cairo-Aswan, Luxor-Cairo).", "4 nights in Cairo with breakfast.", "3 nights on a 5-star Nile Cruise with full board.", "2 gourmet lunches in local restaurants.", "Luxury private transfers.", "Visits as per itinerary."],
        ar: ["المساعدة عند الوصول إلى مطار القاهرة الدولي.", "رحلات داخلية (القاهرة – أسوان، الأقصر – القاهرة).", "4 ليالٍ في القاهرة مع الإفطار.", "3 ليالٍ في رحلة نيلية فاخرة بخدمة كاملة.", "غداءان فاخران في مطاعم محلية.", "انتقالات خاصة فاخرة.", "زيارات حسب البرنامج."]
    },
    servicesExcluded: {
        es: ["Vuelos internacionales.", "Visado (25 USD).", "Propinas (50 USD por persona).", "Entradas al interior de las Pirámides y Tumba de Tutankamón.", "Excursiones opcionales.", "Bebidas y gastos personales."],
        en: ["International flights.", "Visa ($25).", "Tips ($50 per person).", "Entrance to inside the Pyramids and Tutankhamun’s Tomb.", "Optional excursions.", "Drinks and personal expenses."],
        ar: ["الرحلات الدولية.", "التأشيرة (25 دولارًا).", "الإكراميات (50 دولارًا للشخص).", "الدخول إلى داخل الأهرامات وقبر توت عنخ آمون.", "الرحلات الاختيارية.", "المشروبات والمصروفات الشخصية."]
    },
    importantNotes: {
        es: ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Los cruceros desde Asuán salen cada miércoles y viernes."],
        en: ["Daily departures guaranteed with a minimum of 2 people.", "Hotels and cruises may be replaced by others of the same category.", "The order of visits may change without affecting the program content.", "Cruises from Aswan depart every Wednesday and Friday."],
        ar: ["رحلات يومية مضمونة بحد أدنى شخصين.", "قد يتم استبدال الفنادق والرحلات البحرية بأخرى من نفس الفئة.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "تغادر الرحلات النيلية من أسوان كل أربعاء وجمعة."]
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
    categories: ["Cultural", "Histórico"],
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
        es: "Explore Egipto durante 9 días llenos de historia y cultura. Desde las Pirámides de Giza y el Museo Egipcio en El Cairo hasta los templos de Luxor, Karnak, Dendera y Abydos. Navegue en un crucero de lujo por el Nilo visitando Edfu, Kom Ombo, Asuán, Filae y Abu Simbel. Finalice con una última noche en El Cairo, rodeado de los esplendores de Egipto.",
        en: "Explore Egypt for 9 days filled with history and culture. From the Pyramids of Giza and the Egyptian Museum in Cairo to the temples of Luxor, Karnak, Dendera, and Abydos. Cruise along the Nile in luxury visiting Edfu, Kom Ombo, Aswan, Philae, and Abu Simbel. Conclude with a final night in Cairo surrounded by Egypt’s splendors.",
        ar: "استكشف مصر خلال 9 أيام مليئة بالتاريخ والثقافة. من أهرامات الجيزة والمتحف المصري في القاهرة إلى معابد الأقصر والكرنك ودندرة وأبيدوس. أبحر في رحلة نيلية فاخرة تشمل إدفو وكوم أمبو وأسوان وفيلة وأبو سمبل. اختتم بليلة أخيرة في القاهرة وسط روائع مصر."
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
    itinerary: [
        { day: 1, title: { es: "Llegada a El Cairo – Una Gran Bienvenida", en: "Arrival in Cairo – A Warm Welcome", ar: "الوصول إلى القاهرة – ترحيب حار" }, activities: { es: ["Asistencia en el aeropuerto y traslado privado al hotel."], en: ["Assistance at the airport and private transfer to the hotel."], ar: ["المساعدة في المطار والانتقال الخاص إلى الفندق."] } },
        { day: 2, title: { es: "El Cairo – Pirámides y Museo Egipcio", en: "Cairo – Pyramids and Egyptian Museum", ar: "القاهرة – الأهرامات والمتحف المصري" }, activities: { es: ["Visita a las Pirámides de Giza, la Esfinge, el Templo del Valle, el Museo Egipcio y el Cairo Copto."], en: ["Visit the Giza Pyramids, Sphinx, Valley Temple, Egyptian Museum, and Coptic Cairo."], ar: ["زيارة أهرامات الجيزة وأبو الهول ومعبد الوادي والمتحف المصري والقاهرة القبطية."] } },
        { day: 3, title: { es: "El Cairo a Luxor – Templos de Luxor y Karnak", en: "Cairo to Luxor – Luxor and Karnak Temples", ar: "من القاهرة إلى الأقصر – معابدا الأقصر والكرنك" }, activities: { es: ["Vuelo a Luxor y visita a los templos de Luxor y Karnak. Cena y noche en Luxor."], en: ["Flight to Luxor and visit Luxor and Karnak temples. Dinner and overnight in Luxor."], ar: ["رحلة إلى الأقصر وزيارة معابد الأقصر والكرنك. عشاء ومبيت في الأقصر."] } },
        { day: 4, title: { es: "Templos de Dendera y Abydos", en: "Dendera and Abydos Temples", ar: "معابد دندرة وأبيدوس" }, activities: { es: ["Visita a los templos de Seti I en Abydos y Hathor en Dendera. Almuerzo gourmet. Embarque en el crucero y cena a bordo."], en: ["Visit Seti I Temple in Abydos and Hathor Temple in Dendera. Gourmet lunch. Embark on the cruise and dinner onboard."], ar: ["زيارة معبد سيتي الأول في أبيدوس ومعبد حتحور في دندرة. غداء فاخر. الصعود إلى السفينة وعشاء على متنها."] } },
        { day: 5, title: { es: "Luxor – Valle de los Reyes y Hatshepsut", en: "Luxor – Valley of the Kings and Hatshepsut", ar: "الأقصر – وادي الملوك وحتشبسوت" }, activities: { es: ["Visita al Valle de los Reyes, al Templo de Hatshepsut y a los Colosos de Memnón. Navegación hacia Esna."], en: ["Visit the Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon. Sail to Esna."], ar: ["زيارة وادي الملوك ومعبد حتشبسوت وتمثالي ممنون. الإبحار إلى إسنا."] } },
        { day: 6, title: { es: "Esna – Edfu – Kom Ombo", en: "Esna – Edfu – Kom Ombo", ar: "إسنا – إدفو – كوم أمبو" }, activities: { es: ["Visita al Templo de Horus en Edfu y al Templo dual de Kom Ombo. Cena y noche a bordo."], en: ["Visit the Temple of Horus in Edfu and the dual Temple of Kom Ombo. Dinner and overnight onboard."], ar: ["زيارة معبد حورس في إدفو والمعبد المزدوج في كوم أمبو. عشاء ومبيت على متن السفينة."] } },
        { day: 7, title: { es: "Kom Ombo – Asuán – Templo de Filae", en: "Kom Ombo – Aswan – Philae Temple", ar: "كوم أمبو – أسوان – معبد فيلاي" }, activities: { es: ["Visita a la Alta Presa y al Templo de Filae. Paseo en faluca por la Isla Elefantina. Noche en Asuán."], en: ["Visit the High Dam and Philae Temple. Felucca ride around Elephantine Island. Overnight in Aswan."], ar: ["زيارة السد العالي ومعبد فيلاي. جولة فلوكة حول جزيرة الفيلة. المبيت في أسوان."] } },
        { day: 8, title: { es: "Asuán – Abu Simbel – Regreso a El Cairo", en: "Aswan – Abu Simbel – Return to Cairo", ar: "أسوان – أبو سمبل – العودة إلى القاهرة" }, activities: { es: ["Excursión a Abu Simbel. Vuelo a El Cairo. Noche en El Cairo."], en: ["Excursion to Abu Simbel. Flight to Cairo. Overnight in Cairo."], ar: ["رحلة إلى أبو سمبل. طيران إلى القاهرة. المبيت في القاهرة."] } },
        { day: 9, title: { es: "Despedida de El Cairo", en: "Farewell from Cairo", ar: "وداع القاهرة" }, activities: { es: ["Traslado al aeropuerto internacional para su vuelo de regreso."], en: ["Transfer to the international airport for your return flight."], ar: ["الانتقال إلى المطار الدولي لرحلة العودة."] } }
    ],
    servicesIncluded: {
        es: ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo.", "Vuelos domésticos (Cairo–Luxor, Asuán–Cairo).", "3 noches de alojamiento en El Cairo con desayuno.", "1 noche en Luxor con media pensión.", "4 noches de crucero 5 estrellas con pensión completa.", "2 almuerzos gourmet.", "Traslados privados de lujo.", "Visitas según el itinerario."],
        en: ["Assistance upon arrival at Cairo International Airport.", "Domestic flights (Cairo–Luxor, Aswan–Cairo).", "3 nights in Cairo with breakfast.", "1 night in Luxor with half board.", "4 nights on a 5-star Nile Cruise with full board.", "2 gourmet lunches.", "Luxury private transfers.", "Visits as per itinerary."],
        ar: ["المساعدة عند الوصول إلى مطار القاهرة الدولي.", "رحلات داخلية (القاهرة – الأقصر، أسوان – القاهرة).", "3 ليالٍ في القاهرة مع الإفطار.", "ليلة واحدة في الأقصر بنظام نصف الإقامة.", "4 ليالٍ في رحلة نيلية فاخرة بخدمة كاملة.", "غداءان فاخران.", "انتقالات خاصة فاخرة.", "زيارات حسب البرنامج."]
    },
    servicesExcluded: {
        es: ["Vuelos internacionales.", "Visado (25 USD).", "Propinas (50 USD por persona).", "Entradas al interior de las Pirámides y Tumba de Tutankamón.", "Excursiones opcionales.", "Bebidas y gastos personales."],
        en: ["International flights.", "Visa ($25).", "Tips ($50 per person).", "Entrance to inside the Pyramids and Tutankhamun’s Tomb.", "Optional excursions.", "Drinks and personal expenses."],
        ar: ["الرحلات الدولية.", "التأشيرة (25 دولارًا).", "الإكراميات (50 دولارًا للشخص).", "الدخول إلى داخل الأهرامات وقبر توت عنخ آمون.", "الرحلات الاختيارية.", "المشروبات والمصروفات الشخصية."]
    },
    importantNotes: {
        es: ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje."],
        en: ["Daily departures guaranteed with a minimum of 2 people.", "Hotels and cruises may be replaced by others of the same category.", "The order of visits may change without affecting the program content."],
        ar: ["رحلات يومية مضمونة بحد أدنى شخصين.", "قد يتم استبدال الفنادق والرحلات البحرية بأخرى من نفس الفئة.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة."]
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
    "id": 7,
    "name": { 
        "es": "La Majestad del Nilo", 
        "en": "The Majesty of the Nile",
        "ar": "عظمة النيل"
    },
    "icon": "🏺",
    "duration": { "days": 10, "nights": 9 },
    "priceFrom": 1720,
    "categories": ["Cultural", "Histórico"],
    "startCity": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" },
    "cruiseNights": 4,
    "runDays": { 
        "es": "Martes, Miércoles, Jueves, Viernes, Domingo",
        "en": "Tuesday, Wednesday, Thursday, Friday, Sunday",
        "ar": "الثلاثاء، الأربعاء، الخميس، الجمعة، الأحد"
    },
    "briefDescription": {
        "es": "Embárquese en una odisea de 10 días a través de Egipto, explorando las Pirámides, Luxor, Asuán y Abu Simbel en un viaje lleno de historia y majestuosidad.",
        "en": "Embark on a 10-day odyssey through Egypt, exploring the Pyramids, Luxor, Aswan, and Abu Simbel in a journey filled with history and majesty.",
        "ar": "انطلق في رحلة مدتها 10 أيام عبر مصر، تستكشف خلالها الأهرامات والأقصر وأسوان وأبو سمبل في رحلة مليئة بالتاريخ والعظمة."
    },
    "generalDescription": {
        "es": "Descubra la grandeza de Egipto en un recorrido de 10 días que combina historia, cultura y lujo. Desde las Pirámides de Giza y el Museo Egipcio hasta los templos de Luxor, Karnak, Dendera y Abydos. Navegue por el Nilo visitando Edfu, Kom Ombo, Asuán, Filae y Abu Simbel. Finalice su experiencia con una noche final en El Cairo, llevándose consigo la esencia eterna del Nilo.",
        "en": "Discover Egypt’s grandeur in a 10-day tour blending history, culture, and luxury. From the Pyramids of Giza and the Egyptian Museum to the temples of Luxor, Karnak, Dendera, and Abydos. Cruise along the Nile visiting Edfu, Kom Ombo, Aswan, Philae, and Abu Simbel. End your experience with a final night in Cairo, carrying with you the eternal essence of the Nile.",
        "ar": "اكتشف روعة مصر في جولة لمدة 10 أيام تجمع بين التاريخ والثقافة والفخامة. من أهرامات الجيزة والمتحف المصري إلى معابد الأقصر والكرنك ودندرة وأبيدوس. أبحر في النيل لزيارة إدفو وكوم أمبو وأسوان وفيلة وأبو سمبل. اختتم رحلتك بليلة أخيرة في القاهرة محملاً بجوهر النيل الخالد."
    },
    "accommodations": {
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
    "itinerary": [
        { "day": 1, "title": { "es": "Llegada a El Cairo – Una Gran Bienvenida", "en": "Arrival in Cairo – A Warm Welcome", "ar": "الوصول إلى القاهرة – ترحيب حار" }, "activities": { "es": ["Asistencia en el aeropuerto y traslado privado al hotel. Check-in y alojamiento."], "en": ["Assistance at the airport and private transfer to the hotel. Check-in and accommodation."], "ar": ["المساعدة في المطار والانتقال الخاص إلى الفندق. تسجيل الوصول والإقامة."] } },
        { "day": 2, "title": { "es": "El Cairo – Pirámides, Esfinge y Museo Egipcio", "en": "Cairo – Pyramids, Sphinx and Egyptian Museum", "ar": "القاهرة – الأهرامات وأبو الهول والمتحف المصري" }, "activities": { "es": ["Visita a las Pirámides de Giza, la Esfinge, el Templo del Valle y el Museo Egipcio. Almuerzo gourmet y visita al Barrio Copto."], "en": ["Visit the Giza Pyramids, Sphinx, Valley Temple, and Egyptian Museum. Gourmet lunch and visit to Coptic Cairo."], "ar": ["زيارة أهرامات الجيزة وأبو الهول ومعبد الوادي والمتحف المصري. غداء فاخر وزيارة القاهرة القبطية."] } },
        { "day": 3, "title": { "es": "El Cairo a Luxor – Templos de Luxor y Karnak", "en": "Cairo to Luxor – Luxor and Karnak Temples", "ar": "من القاهرة إلى الأقصر – معابد الأقصر والكرنك" }, "activities": { "es": ["Vuelo a Luxor y visita a los templos de Luxor y Karnak al atardecer. Cena y noche en Luxor."], "en": ["Flight to Luxor and visit Luxor and Karnak temples at sunset. Dinner and overnight in Luxor."], "ar": ["رحلة إلى الأقصر وزيارة معابد الأقصر والكرنك وقت الغروب. عشاء ومبيت في الأقصر."] } },
        { "day": 4, "title": { "es": "Templos de Dendera y Abydos", "en": "Dendera and Abydos Temples", "ar": "معابد دندرة وأبيدوس" }, "activities": { "es": ["Visita al Templo de Seti I en Abydos y al Templo de Hathor en Dendera. Almuerzo gourmet. Embarque en el crucero y cena a bordo."], "en": ["Visit Seti I Temple in Abydos and Hathor Temple in Dendera. Gourmet lunch. Embark on the cruise and dinner onboard."], "ar": ["زيارة معبد سيتي الأول في أبيدوس ومعبد حتحور في دندرة. غداء فاخر. الصعود إلى السفينة وعشاء على متنها."] } },
        { "day": 5, "title": { "es": "Luxor – Valle de los Reyes y Hatshepsut", "en": "Luxor – Valley of the Kings and Hatshepsut", "ar": "الأقصر – وادي الملوك وحتشبسوت" }, "activities": { "es": ["Visita al Valle de los Reyes, al Templo de Hatshepsut y a los Colosos de Memnón. Navegación hacia Esna."], "en": ["Visit the Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon. Sail to Esna."], "ar": ["زيارة وادي الملوك ومعبد حتشبسوت وتمثالي ممنون. الإبحار إلى إسنا."] } },
        { "day": 6, "title": { "es": "Esna – Edfu – Kom Ombo", "en": "Esna – Edfu – Kom Ombo", "ar": "إسنا – إدفو – كوم أمبو" }, "activities": { "es": ["Visita al Templo de Horus en Edfu y al Templo dual de Kom Ombo. Cena y noche a bordo."], "en": ["Visit the Temple of Horus in Edfu and the dual Temple of Kom Ombo. Dinner and overnight onboard."], "ar": ["زيارة معبد حورس في إدفو والمعبد المزدوج في كوم أمبو. عشاء ومبيت على متن السفينة."] } },
        { "day": 7, "title": { "es": "Asuán – Templo de Filae y Paseo en Faluca", "en": "Aswan – Philae Temple and Felucca Ride", "ar": "أسوان – معبد فيلاي وجولة فلوكة" }, "activities": { "es": ["Visita a la Alta Presa y al Templo de Filae. Paseo en faluca por la Isla Elefantina. Noche a bordo."], "en": ["Visit the High Dam and Philae Temple. Felucca ride around Elephantine Island. Overnight onboard."], "ar": ["زيارة السد العالي ومعبد فيلاي. جولة فلوكة حول جزيرة الفيلة. المبيت على متن السفينة."] } },
        { "day": 8, "title": { "es": "Asuán – Abu Simbel", "en": "Aswan – Abu Simbel", "ar": "أسوان – أبو سمبل" }, "activities": { "es": ["Traslado por carretera a Abu Simbel y visita a los templos de Ramsés II y Nefertari. Espectáculo de luz y sonido por la noche. Cena y noche en Abu Simbel."], "en": ["Drive to Abu Simbel and visit the temples of Ramses II and Nefertari. Sound and light show at night. Dinner and overnight in Abu Simbel."], "ar": ["الانتقال براً إلى أبو سمبل وزيارة معبدي رمسيس الثاني ونفرتاري. عرض الصوت والضوء ليلاً. عشاء ومبيت في أبو سمبل."] } },
        { "day": 9, "title": { "es": "Abu Simbel – Asuán – El Cairo", "en": "Abu Simbel – Aswan – Cairo", "ar": "أبو سمبل – أسوان – القاهرة" }, "activities": { "es": ["Regreso a Asuán y vuelo a El Cairo. Noche en El Cairo."], "en": ["Return to Aswan and flight to Cairo. Overnight in Cairo."], "ar": ["العودة إلى أسوان والطيران إلى القاهرة. المبيت في القاهرة."] } },
        { "day": 10, "title": { "es": "Despedida de Egipto", "en": "Farewell to Egypt", "ar": "وداع مصر" }, "activities": { "es": ["Traslado al aeropuerto internacional para su vuelo de regreso."], "en": ["Transfer to the international airport for your return flight."], "ar": ["الانتقال إلى المطار الدولي لرحلة العودة."] } }
    ],
    "servicesIncluded": {
        "es": ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo.", "Vuelos domésticos (Cairo–Luxor, Asuán–Cairo).", "3 noches en El Cairo con desayuno.", "1 noche en Luxor con media pensión.", "4 noches en crucero 5 estrellas con pensión completa.", "1 noche en Abu Simbel con media pensión.", "2 almuerzos gourmet.", "Traslados privados de lujo.", "Visitas según el itinerario."],
        "en": ["Assistance upon arrival at Cairo International Airport.", "Domestic flights (Cairo–Luxor, Aswan–Cairo).", "3 nights in Cairo with breakfast.", "1 night in Luxor with half board.", "4 nights on a 5-star Nile Cruise with full board.", "1 night in Abu Simbel with half board.", "2 gourmet lunches.", "Luxury private transfers.", "Visits as per itinerary."],
        "ar": ["المساعدة عند الوصول إلى مطار القاهرة الدولي.", "رحلات داخلية (القاهرة – الأقصر، أسوان – القاهرة).", "3 ليالٍ في القاهرة مع الإفطار.", "ليلة واحدة في الأقصر بنظام نصف الإقامة.", "4 ليالٍ في رحلة نيلية فاخرة بخدمة كاملة.", "ليلة واحدة في أبو سمبل بنظام نصف الإقامة.", "غداءان فاخران.", "انتقالات خاصة فاخرة.", "زيارات حسب البرنامج."]
    },
    "servicesExcluded": {
        "es": ["Vuelos internacionales.", "Visado (25 USD).", "Propinas (60 USD por persona).", "Entradas al interior de las Pirámides y a la Tumba de Tutankamón.", "Excursiones opcionales y visitas no mencionadas.", "Bebidas y gastos personales."],
        "en": ["International flights.", "Visa ($25).", "Tips ($60 per person).", "Entrance to inside the Pyramids and Tutankhamun’s Tomb.", "Optional excursions and unlisted visits.", "Drinks and personal expenses."],
        "ar": ["الرحلات الدولية.", "التأشيرة (25 دولارًا).", "الإكراميات (60 دولارًا للشخص).", "الدخول إلى داخل الأهرامات وقبر توت عنخ آمون.", "الرحلات الاختيارية والزيارات غير المذكورة.", "المشروبات والمصروفات الشخصية."]
    },
    "importantNotes": {
        "es": ["Salida diaria garantizada con un mínimo de 2 personas.", "Hoteles y cruceros pueden ser sustituidos por otros de la misma categoría.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Los precios pueden variar por cambios en tarifas o impuestos.", "Habitaciones triples pueden incluir cama adicional."],
        "en": ["Daily departure guaranteed with a minimum of 2 people.", "Hotels and cruises may be replaced by others of the same category.", "The order of visits may change without affecting the trip content.", "Prices may vary due to taxes or rate changes.", "Triple rooms may include an extra bed."],
        "ar": ["انطلاق يومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "قد تتغير الأسعار بسبب الضرائب أو تغير الأسعار.", "قد تحتوي الغرف الثلاثية على سرير إضافي."]
    },
    "seasonalPricing": {
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
    "id": 8,
    "name": { 
        "es": "Maravillas de Egipto", 
        "en": "Wonders of Egypt",
        "ar": "عجائب مصر"
    },
    "icon": "🌅",
    "duration": { "days": 10, "nights": 9 },
    "priceFrom": 1475,
    "categories": ["Aventura", "Cultural", "Histórico", "Naturaleza", "Playa"],
    "startCity": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" },
    "cruiseNights": 3,
    "runDays": { 
        "es": "Lunes, Martes, Jueves, Sábado, Domingo",
        "en": "Monday, Tuesday, Thursday, Saturday, Sunday",
        "ar": "الاثنين، الثلاثاء، الخميس، السبت، الأحد"
    },
    "briefDescription": {
        "es": "Adéntrese en un viaje de 10 días por Egipto, donde los misterios antiguos, los templos majestuosos y las playas del Mar Rojo lo esperan.",
        "en": "Embark on a 10-day journey through Egypt, where ancient mysteries, majestic temples, and the Red Sea’s golden shores await.",
        "ar": "انطلق في رحلة مدتها 10 أيام عبر مصر، حيث تنتظرك الأسرار القديمة والمعابد المهيبة وسواحل البحر الأحمر الخلابة."
    },
    "generalDescription": {
        "es": "Comience en El Cairo explorando las Pirámides y el Museo Egipcio, navegue por el Nilo desde Asuán a Luxor y concluya con un retiro junto al Mar Rojo en Hurghada. Este viaje combina historia, cultura y descanso en una experiencia inolvidable por las maravillas eternas de Egipto.",
        "en": "Start in Cairo exploring the Pyramids and Egyptian Museum, cruise along the Nile from Aswan to Luxor, and end with a seaside retreat in Hurghada. This journey blends history, culture, and relaxation into an unforgettable experience across Egypt’s timeless wonders.",
        "ar": "ابدأ من القاهرة مستكشفًا الأهرامات والمتحف المصري، ثم أبحر في النيل من أسوان إلى الأقصر، واختتم رحلتك بالاسترخاء على شواطئ الغردقة. تجمع هذه الرحلة بين التاريخ والثقافة والاستجمام في تجربة لا تُنسى بين عجائب مصر الخالدة."
    },
    "accommodations": {
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
    "itinerary": [
        { "day": 1, "title": { "es": "Llegada a El Cairo – Una Gran Bienvenida", "en": "Arrival in Cairo – A Warm Welcome", "ar": "الوصول إلى القاهرة – ترحيب حار" }, "activities": { "es": ["Asistencia en el aeropuerto, trámites de visado y traslado privado al hotel. Noche libre en El Cairo."], "en": ["Assistance at the airport, visa procedures, and private transfer to the hotel. Free evening in Cairo."], "ar": ["المساعدة في المطار وإنهاء إجراءات التأشيرة، والانتقال الخاص إلى الفندق. مساء حر في القاهرة."] } },
        { "day": 2, "title": { "es": "El Cairo – Pirámides, Esfinge y Museo Egipcio", "en": "Cairo – Pyramids, Sphinx and Egyptian Museum", "ar": "القاهرة – الأهرامات وأبو الهول والمتحف المصري" }, "activities": { "es": ["Visita a las Pirámides, la Esfinge, el Templo del Valle, el Museo Egipcio y el Barrio Copto. Almuerzo gourmet incluido."], "en": ["Visit the Pyramids, Sphinx, Valley Temple, Egyptian Museum, and Coptic Cairo. Gourmet lunch included."], "ar": ["زيارة الأهرامات وأبو الهول ومعبد الوادي والمتحف المصري والقاهرة القبطية. يشمل غداء فاخر."] } },
        { "day": 3, "title": { "es": "El Cairo a Asuán – Crucero por el Nilo", "en": "Cairo to Aswan – Nile Cruise", "ar": "من القاهرة إلى أسوان – رحلة نيلية" }, "activities": { "es": ["Vuelo a Asuán, embarque en el crucero y visita a la Alta Presa y paseo en faluca por la Isla Elefantina."], "en": ["Flight to Aswan, embarkation on the cruise, visit to the High Dam, and felucca ride around Elephantine Island."], "ar": ["رحلة إلى أسوان، الصعود إلى السفينة، زيارة السد العالي وجولة فلوكة حول جزيرة الفيلة."] } },
        { "day": 4, "title": { "es": "Asuán – Abu Simbel y Kom Ombo", "en": "Aswan – Abu Simbel and Kom Ombo", "ar": "أسوان – أبو سمبل وكوم أمبو" }, "activities": { "es": ["Excursión a Abu Simbel y visita al Templo de Kom Ombo durante la navegación."], "en": ["Excursion to Abu Simbel and visit to Kom Ombo Temple during sailing."], "ar": ["رحلة إلى أبو سمبل وزيارة معبد كوم أمبو أثناء الإبحار."] } },
        { "day": 5, "title": { "es": "Edfu – Luxor", "en": "Edfu – Luxor", "ar": "إدفو – الأقصر" }, "activities": { "es": ["Visita al Templo de Horus en Edfu y llegada a Luxor. Visita nocturna opcional al Templo de Luxor."], "en": ["Visit Horus Temple in Edfu and arrive in Luxor. Optional evening visit to Luxor Temple."], "ar": ["زيارة معبد حورس في إدفو والوصول إلى الأقصر. زيارة اختيارية ليلية لمعبد الأقصر."] } },
        { "day": 6, "title": { "es": "Luxor – Karnak, Valle de los Reyes y Hatshepsut – Traslado a Hurghada", "en": "Luxor – Karnak, Valley of the Kings and Hatshepsut – Transfer to Hurghada", "ar": "الأقصر – الكرنك ووادي الملوك وحتشبسوت – الانتقال إلى الغردقة" }, "activities": { "es": ["Visita a Karnak, Valle de los Reyes, Templo de Hatshepsut y Colosos de Memnón. Traslado privado a Hurghada."], "en": ["Visit Karnak, Valley of the Kings, Temple of Hatshepsut, and Colossi of Memnon. Private transfer to Hurghada."], "ar": ["زيارة الكرنك ووادي الملوك ومعبد حتشبسوت وتمثالي ممنون. الانتقال الخاص إلى الغردقة."] } },
        { "day": 7, "title": { "es": "Hurghada – Relajación y Aventura", "en": "Hurghada – Relaxation and Adventure", "ar": "الغردقة – استرخاء ومغامرة" }, "activities": { "es": ["Día libre con todo incluido. Posibilidad de actividades opcionales: buceo, snorkel o paseo en barco."], "en": ["Free day with all-inclusive stay. Optional activities: diving, snorkeling or boat trip."], "ar": ["يوم حر بنظام الإقامة الكاملة. أنشطة اختيارية مثل الغوص أو السنوركل أو رحلة بالقارب."] } },
        { "day": 8, "title": { "es": "Hurghada – Día Libre", "en": "Hurghada – Free Day", "ar": "الغردقة – يوم حر" }, "activities": { "es": ["Día libre para disfrutar de las playas o realizar excursiones opcionales."], "en": ["Free day to enjoy beaches or take optional excursions."], "ar": ["يوم حر للاستمتاع بالشواطئ أو القيام برحلات اختيارية."] } },
        { "day": 9, "title": { "es": "Hurghada a El Cairo – Regreso a la Capital", "en": "Hurghada to Cairo – Return to the Capital", "ar": "من الغردقة إلى القاهرة – العودة إلى العاصمة" }, "activities": { "es": ["Vuelo a El Cairo y traslado al hotel. Noche libre."], "en": ["Flight to Cairo and transfer to the hotel. Free evening."], "ar": ["رحلة إلى القاهرة والانتقال إلى الفندق. مساء حر."] } },
        { "day": 10, "title": { "es": "El Cairo – Despedida de Egipto", "en": "Cairo – Farewell to Egypt", "ar": "القاهرة – وداع مصر" }, "activities": { "es": ["Desayuno y traslado al aeropuerto para vuelo internacional."], "en": ["Breakfast and transfer to the airport for international departure."], "ar": ["إفطار ثم الانتقال إلى المطار للمغادرة الدولية."] } }
    ],
    "servicesIncluded": {
        "es": ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo.", "Vuelos domésticos (Cairo–Asuán, Hurghada–Cairo).", "3 noches en El Cairo con desayuno.", "3 noches en crucero 5★ con pensión completa.", "3 noches en Hurghada con todo incluido.", "1 almuerzo gourmet.", "Traslados privados de lujo.", "Visitas según el itinerario."],
        "en": ["Assistance upon arrival at Cairo International Airport.", "Domestic flights (Cairo–Aswan, Hurghada–Cairo).", "3 nights in Cairo with breakfast.", "3 nights on a 5★ Nile Cruise with full board.", "3 nights in Hurghada all-inclusive.", "1 gourmet lunch.", "Luxury private transfers.", "Visits as per itinerary."],
        "ar": ["المساعدة عند الوصول إلى مطار القاهرة الدولي.", "رحلات داخلية (القاهرة – أسوان، الغردقة – القاهرة).", "3 ليالٍ في القاهرة مع الإفطار.", "3 ليالٍ في رحلة نيلية بخدمة كاملة.", "3 ليالٍ في الغردقة بنظام شامل.", "غداء فاخر واحد.", "انتقالات خاصة فاخرة.", "زيارات حسب البرنامج."]
    },
    "servicesExcluded": {
        "es": ["Vuelos internacionales.", "Visado (25 USD).", "Propinas (60 USD por persona).", "Entradas al interior de las Pirámides y la Tumba de Tutankamón.", "Excursiones opcionales.", "Bebidas y gastos personales."],
        "en": ["International flights.", "Visa ($25).", "Tips ($60 per person).", "Entrance inside the Pyramids and Tutankhamun’s Tomb.", "Optional excursions.", "Drinks and personal expenses."],
        "ar": ["الرحلات الدولية.", "التأشيرة (25 دولارًا).", "الإكراميات (60 دولارًا للشخص).", "الدخول إلى داخل الأهرامات وقبر توت عنخ آمون.", "الرحلات الاختيارية.", "المشروبات والمصروفات الشخصية."]
    },
    "importantNotes": {
        "es": ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Los precios pueden variar por cambios en tarifas o impuestos.", "Habitaciones triples pueden incluir cama adicional.", "Los cruceros desde Luxor salen cada sábado y lunes."],
        "en": ["Daily departure guaranteed with a minimum of 2 people.", "Hotels and cruises may be replaced by others of the same category.", "The order of visits may change without affecting the itinerary.", "Prices may vary due to taxes or rate changes.", "Triple rooms may include an extra bed.", "Cruises from Luxor depart every Saturday and Monday."],
        "ar": ["انطلاق يومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق أو الرحلات البحرية بأخرى من نفس الفئة.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "قد تتغير الأسعار بسبب الضرائب أو تغير الأسعار.", "قد تحتوي الغرف الثلاثية على سرير إضافي.", "تغادر الرحلات النيلية من الأقصر كل سبت واثنين."]
    },
    "seasonalPricing": {
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
    "id": 9,
    "name": { 
        "es": "Ecos de la Eternidad", 
        "en": "Echoes of Eternity",
        "ar": "أصداء الأبدية"
    },
    "icon": "🌅",
    "duration": { "days": 8, "nights": 7 },
    "priceFrom": 1145,
    "categories": ["Cultural", "Histórico"],
    "startCity": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" },
    "runDays": { 
        "es": "Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
        "en": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
        "ar": "الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت، الأحد"
    },
    "briefDescription": {
        "es": "Embárquese en un viaje de 8 días a través de los ecos del antiguo Egipto, explorando El Cairo, Matrouh y el místico oasis de Siwa en una experiencia llena de historia, cultura y serenidad.",
        "en": "Embark on an 8-day journey through the echoes of ancient Egypt, exploring Cairo, Matrouh, and the mystical Siwa Oasis in an experience filled with history, culture, and serenity.",
        "ar": "انطلق في رحلة لمدة 8 أيام عبر أصداء مصر القديمة، تستكشف خلالها القاهرة ومطروح وواحة سيوة في تجربة مليئة بالتاريخ والثقافة والسكينة."
    },
    "generalDescription": {
        "es": "Descubra los ecos eternos del antiguo Egipto en un recorrido de 8 días que combina historia, cultura y descanso. Explore las Pirámides de Giza, el Museo Egipcio y el Bazar Khan El Khalili. Disfrute de las playas vírgenes de Matrouh y adéntrese en el místico Oasis de Siwa, un refugio de belleza natural y tradiciones ancestrales. Termine con una noche final en El Cairo, llevando consigo la esencia eterna de Egipto.",
        "en": "Discover the eternal echoes of ancient Egypt in an 8-day tour blending history, culture, and relaxation. Explore the Giza Pyramids, the Egyptian Museum, and Khan El Khalili Bazaar. Enjoy the pristine beaches of Matrouh and journey into the mystical Siwa Oasis, a haven of natural beauty and ancient traditions. Conclude with a final night in Cairo, carrying the timeless essence of Egypt with you.",
        "ar": "اكتشف أصداء مصر القديمة في جولة لمدة 8 أيام تجمع بين التاريخ والثقافة والاسترخاء. استكشف أهرامات الجيزة والمتحف المصري وبازار خان الخليلي. استمتع بشواطئ مطروح البكر وانطلق نحو واحة سيوة الساحرة، ملاذ الجمال الطبيعي والتقاليد القديمة. اختتم رحلتك بليلة أخيرة في القاهرة، محملاً بجوهر مصر الخالد."
    },
    "accommodations": {
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
    "itinerary": [
        { "day": 1, "title": { "es": "Llegada a El Cairo – Una Gran Bienvenida", "en": "Arrival in Cairo – A Warm Welcome", "ar": "الوصول إلى القاهرة – ترحيب حار" }, "activities": { "es": ["Asistencia en el aeropuerto y traslado privado al hotel. Check-in y alojamiento."], "en": ["Assistance at the airport and private transfer to the hotel. Check-in and accommodation."], "ar": ["المساعدة في المطار والانتقال الخاص إلى الفندق. تسجيل الوصول والإقامة."] } },
        { "day": 2, "title": { "es": "El Cairo – Pirámides y Maravillas Antiguas", "en": "Cairo – Pyramids and Ancient Wonders", "ar": "القاهرة – الأهرامات وعجائب العصور القديمة" }, "activities": { "es": ["Visita a las Pirámides de Giza, la Esfinge, el Templo del Valle y Saqqara. Almuerzo gourmet. Alojamiento en El Cairo."], "en": ["Visit the Giza Pyramids, the Sphinx, Valley Temple, and Saqqara. Gourmet lunch. Overnight in Cairo."], "ar": ["زيارة أهرامات الجيزة وأبو الهول ومعبد الوادي وسقارة. غداء فاخر. المبيت في القاهرة."] } },
        { "day": 3, "title": { "es": "El Cairo – Tesoros Culturales y el Bazar", "en": "Cairo – Cultural Treasures and Bazaar", "ar": "القاهرة – الكنوز الثقافية والبازار" }, "activities": { "es": ["Visita al Museo Egipcio, la Mezquita de Alabastro y el Bazar Khan El-Khalili. Almuerzo gourmet. Alojamiento en El Cairo."], "en": ["Visit the Egyptian Museum, Alabaster Mosque, and Khan El-Khalili Bazaar. Gourmet lunch. Overnight in Cairo."], "ar": ["زيارة المتحف المصري، ومسجد الألباستر، وبازار خان الخليلي. غداء فاخر. المبيت في القاهرة."] } },
        { "day": 4, "title": { "es": "El Cairo a Matrouh – Costas Doradas", "en": "Cairo to Matrouh – Golden Coasts", "ar": "من القاهرة إلى مطروح – السواحل الذهبية" }, "activities": { "es": ["Traslado privado a Matrouh. Tarde libre y cena en el hotel."], "en": ["Private transfer to Matrouh. Free afternoon and dinner at the hotel."], "ar": ["الانتقال الخاص إلى مطروح. فترة حرة وعشاء في الفندق."] } },
        { "day": 5, "title": { "es": "Matrouh a Siwa – Aventura en el Oasis", "en": "Matrouh to Siwa – Oasis Adventure", "ar": "من مطروح إلى سيوة – مغامرة في الواحة" }, "activities": { "es": ["Traslado al Oasis de Siwa. Cena y alojamiento en el hotel."], "en": ["Transfer to Siwa Oasis. Dinner and overnight at the hotel."], "ar": ["الانتقال إلى واحة سيوة. عشاء ومبيت في الفندق."] } },
        { "day": 6, "title": { "es": "Siwa – Historia y Relajación", "en": "Siwa – History and Relaxation", "ar": "سيوة – التاريخ والاستجمام" }, "activities": { "es": ["Visita al Manantial de Cleopatra, la Montaña de los Muertos y el Templo del Oráculo. Cena en el hotel."], "en": ["Visit Cleopatra’s Spring, Mountain of the Dead, and Oracle Temple. Dinner at the hotel."], "ar": ["زيارة عين كليوباترا وجبل الموتى ومعبد الوحي. عشاء في الفندق."] } },
        { "day": 7, "title": { "es": "Siwa a El Cairo – Regreso", "en": "Siwa to Cairo – Return", "ar": "من سيوة إلى القاهرة – العودة" }, "activities": { "es": ["Viaje panorámico de regreso a El Cairo. Noche en El Cairo."], "en": ["Panoramic drive back to Cairo. Overnight in Cairo."], "ar": ["العودة إلى القاهرة عبر رحلة بانورامية. المبيت في القاهرة."] } },
        { "day": 8, "title": { "es": "Despedida de Egipto", "en": "Farewell to Egypt", "ar": "وداع مصر" }, "activities": { "es": ["Desayuno y traslado al aeropuerto internacional."], "en": ["Breakfast and transfer to the international airport."], "ar": ["الإفطار والانتقال إلى المطار الدولي."] } }
    ],
    "servicesIncluded": {
        "es": ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo.", "4 noches en El Cairo con desayuno.", "1 noche en Matrouh con media pensión.", "2 noches en Siwa con media pensión.", "2 almuerzos gourmet.", "Traslados privados de lujo.", "Visitas según el itinerario."],
        "en": ["Assistance upon arrival at Cairo International Airport.", "4 nights in Cairo with breakfast.", "1 night in Matrouh with half board.", "2 nights in Siwa with half board.", "2 gourmet lunches.", "Luxury private transfers.", "Visits as per itinerary."],
        "ar": ["المساعدة عند الوصول إلى مطار القاهرة الدولي.", "4 ليالٍ في القاهرة مع الإفطار.", "ليلة واحدة في مطروح بنظام نصف الإقامة.", "ليلتان في سيوة بنظام نصف الإقامة.", "غداءان فاخران.", "انتقالات خاصة فاخرة.", "زيارات حسب البرنامج."]
    },
    "servicesExcluded": {
        "es": ["Vuelos internacionales.", "Visado (25 USD).", "Propinas (40 USD por persona).", "Entradas al interior de las Pirámides.", "Excursiones opcionales y visitas no mencionadas.", "Bebidas y gastos personales."],
        "en": ["International flights.", "Visa ($25).", "Tips ($40 per person).", "Entrance to inside the Pyramids.", "Optional excursions and unlisted visits.", "Drinks and personal expenses."],
        "ar": ["الرحلات الدولية.", "التأشيرة (25 دولارًا).", "الإكراميات (40 دولارًا للشخص).", "الدخول إلى داخل الأهرامات.", "الرحلات الاختيارية والزيارات غير المذكورة.", "المشروبات والمصروفات الشخصية."]
    },
    "importantNotes": {
        "es": ["Salida diaria garantizada con un mínimo de 2 personas.", "Hoteles pueden ser sustituidos por otros de la misma categoría.", "El orden de las visitas puede modificarse sin afectar el contenido.", "Los precios pueden variar por cambios en tarifas o impuestos.", "Habitaciones triples pueden incluir cama adicional."],
        "en": ["Daily departure guaranteed with a minimum of 2 people.", "Hotels may be replaced by others of the same category.", "The order of visits may change without affecting the trip content.", "Prices may vary due to taxes or rate changes.", "Triple rooms may include an extra bed."],
        "ar": ["انطلاق يومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق بأخرى من نفس الفئة.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "قد تتغير الأسعار بسبب الضرائب أو تغير الأسعار.", "قد تحتوي الغرف الثلاثية على سرير إضافي."]
    },
    "seasonalPricing": {
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
    "id": 10,
    "name": {
        "es": "Leyendas del Nilo",
        "en": "Legends of the Nile",
        "ar": "أساطير النيل"
    },
    "icon": "🌊",
    "duration": { "days": 6, "nights": 5 },
    "priceFrom": 735,
    "categories": ["Adventure", "Cultural", "Historical", "Beach", "Honeymoon"],
    "startCity": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" },
    "runDays": {
        "es": "Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo",
        "en": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
        "ar": "الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت، الأحد"
    },
    "briefDescription": {
        "es": "Embárquese en un cautivador viaje de 6 días por Egipto, donde las antiguas leyendas y el encanto costero se entrelazan.",
        "en": "Embark on a captivating 6-day journey through Egypt, where ancient legends and coastal charm intertwine.",
        "ar": "انطلق في رحلة ساحرة لمدة 6 أيام عبر مصر، حيث تتشابك الأساطير القديمة مع سحر السواحل."
    },
    "generalDescription": {
        "es": "Explore las icónicas Pirámides de Giza, la Esfinge, Saqqara y el Museo Egipcio en El Cairo, seguido de una aventura mediterránea en Alejandría visitando la Biblioteca, la Ciudadela de Qaitbay, las Catacumbas y la Columna de Pompeyo. Una experiencia única que combina historia, cultura y relajación costera.",
        "en": "Explore the iconic Giza Pyramids, the Sphinx, Saqqara, and the Egyptian Museum in Cairo, followed by a Mediterranean adventure in Alexandria visiting the Library, Qaitbay Citadel, Catacombs, and Pompey’s Pillar. A unique experience blending history, culture, and coastal relaxation.",
        "ar": "استكشف أهرامات الجيزة وأبو الهول وسقارة والمتحف المصري في القاهرة، تليها مغامرة على البحر المتوسط في الإسكندرية بزيارة المكتبة وقلعة قايتباي والسراديب وعمود بومبي. تجربة فريدة تجمع بين التاريخ والثقافة والاسترخاء الساحلي."
    },
    "servicesIncluded": {
        "es": ["Asistencia a la llegada al Aeropuerto Internacional de El Cairo para los trámites de visado y aduana.", "4 noches de alojamiento en El Cairo con desayuno.", "1 noche de alojamiento en Alejandría con media pensión (desayuno y cena incluidos).", "3 almuerzos gourmet en restaurantes locales seleccionados.", "Traslados privados de lujo entre todos los destinos y aeropuertos.", "Visitas según lo mencionado en el itinerario."],
        "en": ["Assistance upon arrival at Cairo International Airport for visa and customs procedures.", "4 nights accommodation in Cairo with breakfast.", "1 night accommodation in Alexandria with half board (breakfast and dinner included).", "3 gourmet lunches at selected local restaurants.", "Luxury private transfers between all destinations and airports.", "Sightseeing as per itinerary."],
        "ar": ["المساعدة عند الوصول إلى مطار القاهرة الدولي لإجراءات التأشيرة والجمارك.", "4 ليالٍ في القاهرة مع الإفطار.", "ليلة واحدة في الإسكندرية بنظام نصف الإقامة (الإفطار والعشاء مشمولان).", "3 وجبات غداء فاخرة في مطاعم محلية مختارة.", "تنقلات خاصة فاخرة بين جميع الوجهات والمطارات.", "الزيارات حسب البرنامج."]
    },
    "servicesExcluded": {
        "es": ["Vuelos internacionales.", "Visado 25 $ (pagadero a la llegada).", "Propinas para conductores y personal del hotel 30 $ por persona.", "Entradas al interior de las Pirámides.", "Excursiones opcionales y cualquier visita no mencionada en el programa.", "Bebidas y gastos personales."],
        "en": ["International flights.", "Visa $25 (payable on arrival).", "Tips for drivers and hotel staff $30 per person.", "Entrance fees inside the Pyramids.", "Optional excursions and any visits not mentioned in the program.", "Drinks and personal expenses."],
        "ar": ["الرحلات الدولية.", "التأشيرة 25 دولارًا (تدفع عند الوصول).", "البقشيش للسائقين وموظفي الفندق 30 دولارًا للشخص.", "رسوم دخول الأهرامات.", "الرحلات الاختيارية وأي زيارات غير مذكورة في البرنامج.", "المشروبات والمصروفات الشخصية."]
    },
    "itinerary": [
        { "day": 1, "title": { "es": "Llegada a El Cairo – Una Gran Bienvenida", "en": "Arrival in Cairo – A Warm Welcome", "ar": "الوصول إلى القاهرة – ترحيب حار" }, "activities": { "es": ["Asistencia con trámites de visado y aduana.", "Traslado privado al hotel.", "Instalación en el hotel y noche libre."], "en": ["Assistance with visa and customs procedures.", "Private transfer to hotel.", "Check-in and free evening."], "ar": ["المساعدة في إجراءات التأشيرة والجمارك.", "انتقال خاص إلى الفندق.", "تسجيل الوصول ووقت حر في المساء."] } },
        { "day": 2, "title": { "es": "El Cairo – Pirámides y Tesoros de la Antigüedad", "en": "Cairo – Pyramids and Ancient Treasures", "ar": "القاهرة – الأهرامات وكنوز العصور القديمة" }, "activities": { "es": ["Visita a las Pirámides de Giza (Keops, Kefrén y Micerino) y la Esfinge.", "Exploración del Templo del Valle de Kefrén y Necrópolis de Saqqara.", "Almuerzo gourmet.", "Regreso al hotel y tarde libre."], "en": ["Visit the Giza Pyramids (Khufu, Khafre, and Menkaure) and the Sphinx.", "Explore the Valley Temple of Khafre and Saqqara Necropolis.", "Gourmet lunch.", "Return to hotel and free afternoon."], "ar": ["زيارة أهرامات الجيزة (خوفو، خفرع، ومنقرع) وأبو الهول.", "استكشاف معبد وادي خفرع وسقارة.", "غداء فاخر.", "العودة إلى الفندق ووقت حر بعد الظهر."] } },
        { "day": 3, "title": { "es": "El Cairo – Historia y Cultura", "en": "Cairo – History and Culture", "ar": "القاهرة – التاريخ والثقافة" }, "activities": { "es": ["Visita al Museo Egipcio.", "Recorrido por la Mezquita de Mohamed Ali y la Ciudadela.", "Exploración del Bazar de Khan El-Khalili.", "Almuerzo gourmet y tarde libre."], "en": ["Visit the Egyptian Museum.", "Tour Mohamed Ali Mosque and the Citadel.", "Explore Khan El-Khalili Bazaar.", "Gourmet lunch and free afternoon."], "ar": ["زيارة المتحف المصري.", "جولة في مسجد محمد علي والقلعة.", "استكشاف بازار خان الخليلي.", "غداء فاخر ووقت حر بعد الظهر."] } },
        { "day": 4, "title": { "es": "De El Cairo a Alejandría – La Joya del Mediterráneo", "en": "Cairo to Alexandria – The Mediterranean Jewel", "ar": "من القاهرة إلى الإسكندرية – جوهرة البحر المتوسط" }, "activities": { "es": ["Traslado a Alejandría.", "Visita a la Biblioteca de Alejandría, Ciudadela de Qaitbay, Catacumbas y Columna de Pompeyo.", "Almuerzo gourmet.", "Check-in y cena en el hotel."], "en": ["Transfer to Alexandria.", "Visit the Library of Alexandria, Qaitbay Citadel, Catacombs, and Pompey’s Pillar.", "Gourmet lunch.", "Check-in and dinner at hotel."], "ar": ["الانتقال إلى الإسكندرية.", "زيارة مكتبة الإسكندرية، قلعة قايتباي، السراديب، وعمود بومبي.", "غداء فاخر.", "تسجيل الوصول والعشاء في الفندق."] } },
        { "day": 5, "title": { "es": "Alejandría – Día Libre y Regreso a El Cairo", "en": "Alexandria – Free Day and Return to Cairo", "ar": "الإسكندرية – يوم حر والعودة إلى القاهرة" }, "activities": { "es": ["Día libre para explorar Alejandría.", "Traslado privado de regreso a El Cairo.", "Alojamiento en El Cairo."], "en": ["Free day to explore Alexandria.", "Private transfer back to Cairo.", "Overnight in Cairo."], "ar": ["يوم حر لاستكشاف الإسكندرية.", "انتقال خاص للعودة إلى القاهرة.", "الإقامة في القاهرة."] } },
        { "day": 6, "title": { "es": "El Cairo – Despedida de Egipto", "en": "Cairo – Farewell to Egypt", "ar": "القاهرة – وداع مصر" }, "activities": { "es": ["Traslado privado al Aeropuerto Internacional de El Cairo para vuelo de salida."], "en": ["Private transfer to Cairo International Airport for departure flight."], "ar": ["انتقال خاص إلى مطار القاهرة الدولي لرحلة المغادرة."] } }
    ],
    "accommodations": {
        "gold": [
            { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Helnan Dreamland", "en": "Helnan Dreamland", "ar": "هيلنان دريم لاند" } },
            { "city": { "es": "Alejandría", "en": "Alexandria", "ar": "الإسكندرية" }, "hotel": { "es": "Helnan Mamoura", "en": "Helnan Mamoura", "ar": "هيلنان مامورا" } }
        ],
        "diamond": [
            { "city": { "es": "El Cairo", "en": "Cairo", "ar": "القاهرة" }, "hotel": { "es": "Fairmont Nile City", "en": "Fairmont Nile City", "ar": "فيرمونت نايل سيتي" } },
            { "city": { "es": "Alejandría", "en": "Alexandria", "ar": "الإسكندرية" }, "hotel": { "es": "Helnan Mamoura", "en": "Helnan Mamoura", "ar": "هيلنان مامورا" } }
        ]
    },
    "seasonalPricing": {
        "summer": { 
            "gold": { "single": 865, "double": 775, "triple": 735 },
            "diamond": { "single": 1275, "double": 1015, "triple": 975 } 
        },
        "winter": { 
            "gold": { "single": 985, "double": 845, "triple": 805 },
            "diamond": { "single": 1390, "double": 1085, "triple": 1045 } 
        }
    },
    "importantNotes": {
        "es": ["Salida diaria garantizada con un mínimo de 2 personas.", "Los hoteles y cruceros pueden ser sustituidos por otros de la misma categoría con previo aviso al cliente.", "Los precios finales pueden variar debido a cambios en tarifas, impuestos y/o recargos por combustible.", "El orden de las visitas puede modificarse sin afectar el contenido del viaje.", "Las habitaciones triples en cruceros y en varios hoteles son habitaciones dobles con una cama adicional."],
        "en": ["Daily departure guaranteed with minimum 2 people.", "Hotels and cruises may be replaced by others of the same category with prior notice.", "Final prices may vary due to rate, tax, and fuel surcharge changes.", "Order of visits may be changed without affecting trip content.", "Triple rooms on cruises and some hotels are double rooms with an extra bed."],
        "ar": ["الانطلاق اليومي مضمون بحد أدنى شخصين.", "قد يتم استبدال الفنادق والسفن بأخرى من نفس الفئة بعد إشعار مسبق.", "قد تتغير الأسعار النهائية بسبب تغييرات الرسوم أو الضرائب أو الوقود.", "قد يتغير ترتيب الزيارات دون التأثير على محتوى الرحلة.", "الغرف الثلاثية في بعض الفنادق والسفن هي غرف مزدوجة مع سرير إضافي."]
    }   
} 
];