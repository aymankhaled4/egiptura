// نظام جديد لاختيار المدينة والأماكن المحددة
import type { Program, SupportedCity, SupportedSite, LocalizedString, AccommodationInfo, ItineraryItem } from './types';
import { packages } from './packages';
import type { Language } from './contexts/LanguageContext';

export class CityBasedExtractor {
    private programs: Program[];

    constructor() {
        this.programs = packages;
    }

    // 🏙️ الحصول على المدن المتاحة
    getAvailableCities(): SupportedCity[] {
        return [
            'cairo', 'luxor', 'aswan', 'alexandria', 'abuSimbel',
            'hurghada', 'sharmElSheikh', 'saintCatherine', 'siwa', 'matrouh'
        ];
    }

    // 🗺️ الحصول على الأماكن المتاحة لمدينة معينة
    getSitesForCity(city: SupportedCity): SupportedSite[] {
        const sitesByCity: Record<SupportedCity, SupportedSite[]> = {
            cairo: [
                'citadelOfSaladin', 'sultanHassanMosque', 'elSeheimyHouse', 'mohamedAliPalace',
                'marysTree', 'senusretIObelisk', 'egyptianMuseum', 'egyptianMuseumAudioGuide',
                'islamicArtMuseum', 'copticMuseum', 'royalCarriagesMuseum', 'gayerAndersonMuseum',
                'baronEmpainPalace', 'alMuizzStreet', 'manialPalace', 'nilometer',
                'gizaPyramidsAndSphinx', 'pyramidOfKeopsInterior', 'pyramidOfKhafrenInterior',
                'pyramidOfMicerinoInterior', 'tombOfMeresankh', 'saqqaraComplexAndImhotepMuseum',
                'nobleTombsOfTheNewKingdom', 'southTombSaqqara', 'saqqaraCombinedTicket',
                'citadelAndAlabasterMosque', 'khanElKhalili', 'saqqara', 'stepPyramidOfZoser',
                'serapeum', 'tombOfMereruka', 'dashurArchaeologicalZone', 'memphisMitRahina',
                'egyptianCivilizationMuseum', 'grandEgyptianMuseum'
            ],
            luxor: [
                'karnakTemple', 'mutTemple', 'luxorTemple', 'valleyOfTheKings', 'tombOfSetiI',
                'tombOfAy', 'hatshepsutTemple', 'deirElMedina', 'tombOfPashed', 'tombOfRamose',
                'ramesseumTemple', 'abdelQurnaHill', 'carterHouse', 'tombOfMennaAndNakht',
                'tombsOfUserhatAndKhaemwaset', 'alAsasif', 'esnaTemple', 'tombOfRamsesVI',
                'valleyOfTheQueens', 'tombOfNefertari', 'elKhokhaNecropolis', 'tombsOfRoyAndShuroy',
                'qurnaMerai', 'sheikhAbdelQurna', 'mummificationMuseum', 'luxorMuseum'
            ],
            aswan: [
                'philaeTemple', 'edfuTemple', 'komOmboTemple', 'qubbetElHawa', 'unfinishedObelisk',
                'kalabshaTemple', 'elKab', 'nubianMuseum', 'highDam'
            ],
            alexandria: [
                'qaitbayCitadel', 'komElShoqafaCatacombs', 'komElDikkaRomanTheater', 'pompeysPillar',
                'alexandriaNationalMuseum', 'royalJewelryMuseum', 'graecoRomanMuseum', 'rosettaRuins'
            ],
            abuSimbel: [
                'abuSimbelTemples', 'sunFestivalAbuSimbel'
            ],
            hurghada: [],
            sharmElSheikh: [],
            saintCatherine: [],
            siwa: [],
            matrouh: []
        };

        return sitesByCity[city] || [];
    }

    // 🏨 الحصول على معلومات الإقامة لمدينة معينة
    getAccommodationForCity(city: SupportedCity, category: 'gold' | 'diamond'): AccommodationInfo[] {
        // البحث في البرامج الجاهزة عن معلومات الإقامة للمدينة
        for (const program of this.programs) {
            if (program.accommodations && program.accommodations[category]) {
                const cityAccommodations = program.accommodations[category].filter(acc => 
                    acc.city.en.toLowerCase().includes(city) || 
                    acc.city.ar?.toLowerCase().includes(city) ||
                    acc.city.es?.toLowerCase().includes(city)
                );
                if (cityAccommodations.length > 0) {
                    return cityAccommodations;
                }
            }
        }

        // إرجاع معلومات افتراضية إذا لم توجد
        const defaultAccommodations: Record<SupportedCity, AccommodationInfo[]> = {
            cairo: [
                {
                    city: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' },
                    hotel: { 
                        es: category === 'gold' ? 'Helnan Dreamland o similar' : 'Fairmont Nile City o similar',
                        en: category === 'gold' ? 'Helnan Dreamland or similar' : 'Fairmont Nile City or similar',
                        ar: category === 'gold' ? 'هيلنان دريم لاند أو ما يعادله' : 'فيرمونت نايل سيتي أو ما يعادله'
                    }
                }
            ],
            luxor: [
                {
                    city: { es: 'Luxor', en: 'Luxor', ar: 'الأقصر' },
                    hotel: { 
                        es: category === 'gold' ? 'Steigenberger Nile Palace o similar' : 'Sofitel Winter Palace o similar',
                        en: category === 'gold' ? 'Steigenberger Nile Palace or similar' : 'Sofitel Winter Palace or similar',
                        ar: category === 'gold' ? 'ستيجنبرجر نايل بالاس أو ما يعادله' : 'سوفيتيل وينتر بالاس أو ما يعادله'
                    }
                }
            ],
            aswan: [
                {
                    city: { es: 'Asuán', en: 'Aswan', ar: 'أسوان' },
                    hotel: { 
                        es: category === 'gold' ? 'Mövenpick Resort Aswan o similar' : 'Sofitel Legend Old Cataract o similar',
                        en: category === 'gold' ? 'Mövenpick Resort Aswan or similar' : 'Sofitel Legend Old Cataract or similar',
                        ar: category === 'gold' ? 'موفنبيك ريزورت أسوان أو ما يعادله' : 'سوفيتيل ليجند أولد كاتاراكت أو ما يعادله'
                    }
                }
            ],
            alexandria: [
                {
                    city: { es: 'Alejandría', en: 'Alexandria', ar: 'الإسكندرية' },
                    hotel: { 
                        es: category === 'gold' ? 'Hilton Alexandria Corniche o similar' : 'Four Seasons Alexandria o similar',
                        en: category === 'gold' ? 'Hilton Alexandria Corniche or similar' : 'Four Seasons Alexandria or similar',
                        ar: category === 'gold' ? 'هيلتون الإسكندرية الكورنيش أو ما يعادله' : 'فور سيزونز الإسكندرية أو ما يعادله'
                    }
                }
            ],
            abuSimbel: [
                {
                    city: { es: 'Abu Simbel', en: 'Abu Simbel', ar: 'أبو سمبل' },
                    hotel: { 
                        es: 'Seti Abu Simbel o similar',
                        en: 'Seti Abu Simbel or similar',
                        ar: 'ستي أبو سمبل أو ما يعادله'
                    }
                }
            ],
            hurghada: [
                {
                    city: { es: 'Hurghada', en: 'Hurghada', ar: 'الغردقة' },
                    hotel: { 
                        es: category === 'gold' ? 'Grand Resort Hurghada o similar' : 'Four Seasons Resort Sharm El Sheikh o similar',
                        en: category === 'gold' ? 'Grand Resort Hurghada or similar' : 'Four Seasons Resort Sharm El Sheikh or similar',
                        ar: category === 'gold' ? 'جراند ريزورت الغردقة أو ما يعادله' : 'فور سيزونز ريزورت شرم الشيخ أو ما يعادله'
                    }
                }
            ],
            sharmElSheikh: [
                {
                    city: { es: 'Sharm El Sheikh', en: 'Sharm El Sheikh', ar: 'شرم الشيخ' },
                    hotel: { 
                        es: category === 'gold' ? 'Grand Resort Sharm El Sheikh o similar' : 'Four Seasons Resort Sharm El Sheikh o similar',
                        en: category === 'gold' ? 'Grand Resort Sharm El Sheikh or similar' : 'Four Seasons Resort Sharm El Sheikh or similar',
                        ar: category === 'gold' ? 'جراند ريزورت شرم الشيخ أو ما يعادله' : 'فور سيزونز ريزورت شرم الشيخ أو ما يعادله'
                    }
                }
            ],
            saintCatherine: [
                {
                    city: { es: 'Santa Catalina', en: 'Saint Catherine', ar: 'سانت كاترين' },
                    hotel: { 
                        es: 'Karm Ecolodge o similar',
                        en: 'Karm Ecolodge or similar',
                        ar: 'كرم إيكولودج أو ما يعادله'
                    }
                }
            ],
            siwa: [
                {
                    city: { es: 'Siwa', en: 'Siwa', ar: 'سيوة' },
                    hotel: { 
                        es: 'Adrère Amellal o similar',
                        en: 'Adrère Amellal or similar',
                        ar: 'أدري أملال أو ما يعادله'
                    }
                }
            ],
            matrouh: [
                {
                    city: { es: 'Marsa Matrouh', en: 'Marsa Matrouh', ar: 'مرسى مطروح' },
                    hotel: { 
                        es: 'Marassi Resort o similar',
                        en: 'Marassi Resort or similar',
                        ar: 'مراسي ريزورت أو ما يعادله'
                    }
                }
            ]
        };

        return defaultAccommodations[city] || [];
    }

    // 🎯 إنشاء برنامج مخصص بناءً على المدينة والأماكن المختارة
    createCityBasedProgram(request: {
        city: SupportedCity;
        selectedSites: SupportedSite[];
        duration: number;
        travelers: number;
        season: 'summer' | 'winter';
        category: 'gold' | 'diamond';
        language: Language;
    }): Program {
        const { city, selectedSites, duration, travelers, season, category, language } = request;
        const totalNights = duration - 1;

        // إنشاء اسم البرنامج
        const cityName = this.getCityLocalizedName(city);
        const programName = {
            en: `Custom ${duration}-Day ${cityName.en} Experience`,
            es: `Experiencia Personalizada de ${duration} Días en ${cityName.es}`,
            ar: `تجربة مخصصة لمدة ${duration} أيام في ${cityName.ar}`
        };

        // إنشاء وصف مختصر
        const briefDescription = this.createCityBriefDescription(city, selectedSites, duration, language);

        // إنشاء وصف عام
        const generalDescription = this.createCityGeneralDescription(city, selectedSites, duration, language);

        // إنشاء البرنامج
        const customProgram: Program = {
            id: `custom-${city}-${Date.now()}`,
            name: programName,
            icon: this.getCityIcon(city),
            duration: { days: duration, nights: totalNights },
            priceFrom: 0,
            categories: [category],
            startCity: cityName,
            briefDescription,
            generalDescription,
            itinerary: this.createCityItinerary(city, selectedSites, duration, language),
            servicesIncluded: this.getCityServicesIncluded(city, language),
            servicesExcluded: this.getCityServicesExcluded(city, language),
            importantNotes: this.getCityImportantNotes(city, language),
            accommodations: {
                [category]: this.getAccommodationForCity(city, category)
            },
            isCustom: true,
            quoteParams: {
                travelers,
                duration,
                season,
                category,
                itineraryPlan: {
                    nights: { [city]: totalNights },
                    sites: selectedSites,
                    flightSectors: 0,
                    guidedDays: duration
                }
            }
        };

        return customProgram;
    }

    // 🏷️ الحصول على اسم المدينة باللغات المختلفة
    private getCityLocalizedName(city: SupportedCity): LocalizedString {
        const cityNames: Record<SupportedCity, LocalizedString> = {
            cairo: { es: 'El Cairo', en: 'Cairo', ar: 'القاهرة' },
            luxor: { es: 'Luxor', en: 'Luxor', ar: 'الأقصر' },
            aswan: { es: 'Asuán', en: 'Aswan', ar: 'أسوان' },
            alexandria: { es: 'Alejandría', en: 'Alexandria', ar: 'الإسكندرية' },
            abuSimbel: { es: 'Abu Simbel', en: 'Abu Simbel', ar: 'أبو سمبل' },
            hurghada: { es: 'Hurghada', en: 'Hurghada', ar: 'الغردقة' },
            sharmElSheikh: { es: 'Sharm El Sheikh', en: 'Sharm El Sheikh', ar: 'شرم الشيخ' },
            saintCatherine: { es: 'Santa Catalina', en: 'Saint Catherine', ar: 'سانت كاترين' },
            siwa: { es: 'Siwa', en: 'Siwa', ar: 'سيوة' },
            matrouh: { es: 'Marsa Matrouh', en: 'Marsa Matrouh', ar: 'مرسى مطروح' }
        };

        return cityNames[city] || { es: city, en: city, ar: city };
    }

    // 🎨 الحصول على أيقونة المدينة
    private getCityIcon(city: SupportedCity): string {
        const cityIcons: Record<SupportedCity, string> = {
            cairo: '🏛️',
            luxor: '🏺',
            aswan: '⛵',
            alexandria: '🏛️',
            abuSimbel: '🗿',
            hurghada: '🏖️',
            sharmElSheikh: '🐠',
            saintCatherine: '⛰️',
            siwa: '🌴',
            matrouh: '🏖️'
        };

        return cityIcons[city] || '🗺️';
    }

    // 📝 إنشاء وصف مختصر للمدينة
    private createCityBriefDescription(city: SupportedCity, selectedSites: SupportedSite[], duration: number, language: Language): LocalizedString {
        const cityName = this.getCityLocalizedName(city);
        const siteCount = selectedSites.length;

        const descriptions = {
            cairo: {
                en: `A ${duration}-day immersive journey through Cairo's ancient wonders. Explore ${siteCount} carefully selected sites including the Great Pyramids, Egyptian Museum, and historic Islamic Cairo.`,
                es: `Un viaje inmersivo de ${duration} días por las maravillas antiguas de El Cairo. Explora ${siteCount} sitios cuidadosamente seleccionados incluyendo las Grandes Pirámides, el Museo Egipcio y el histórico Cairo Islámico.`,
                ar: `رحلة غامرة لمدة ${duration} أيام عبر عجائب القاهرة القديمة. استكشف ${siteCount} مواقع مختارة بعناية تشمل الأهرامات العظيمة والمتحف المصري والقاهرة الإسلامية التاريخية.`
            },
            luxor: {
                en: `Discover the treasures of ancient Thebes in this ${duration}-day Luxor adventure. Visit ${siteCount} magnificent temples, tombs, and monuments that tell the story of pharaonic Egypt.`,
                es: `Descubre los tesoros de la antigua Tebas en esta aventura de ${duration} días en Luxor. Visita ${siteCount} magníficos templos, tumbas y monumentos que cuentan la historia del Egipto faraónico.`,
                ar: `اكتشف كنوز طيبة القديمة في مغامرة الأقصر هذه لمدة ${duration} أيام. زر ${siteCount} معابد ومقابر وآثار رائعة تحكي قصة مصر الفرعونية.`
            },
            aswan: {
                en: `Experience the beauty of Upper Egypt in this ${duration}-day Aswan journey. Explore ${siteCount} ancient temples and monuments along the Nile, including the magnificent Philae Temple.`,
                es: `Experimenta la belleza del Alto Egipto en este viaje de ${duration} días a Asuán. Explora ${siteCount} templos y monumentos antiguos a lo largo del Nilo, incluyendo el magnífico Templo de Filae.`,
                ar: `اختبر جمال مصر العليا في رحلة أسوان هذه لمدة ${duration} أيام. استكشف ${siteCount} معابد وآثار قديمة على طول النيل، بما في ذلك معبد فيلة الرائع.`
            },
            alexandria: {
                en: `Discover the Mediterranean charm of Alexandria in this ${duration}-day coastal adventure. Explore ${siteCount} historic sites that blend Greek, Roman, and Egyptian cultures.`,
                es: `Descubre el encanto mediterráneo de Alejandría en esta aventura costera de ${duration} días. Explora ${siteCount} sitios históricos que combinan las culturas griega, romana y egipcia.`,
                ar: `اكتشف سحر الإسكندرية المتوسطي في مغامرة ساحلية لمدة ${duration} أيام. استكشف ${siteCount} مواقع تاريخية تدمج الثقافات اليونانية والرومانية والمصرية.`
            },
            abuSimbel: {
                en: `Witness the grandeur of Ramses II's masterpiece in this ${duration}-day Abu Simbel experience. Marvel at the colossal temples carved into the mountainside.`,
                es: `Presencia la grandeza de la obra maestra de Ramsés II en esta experiencia de ${duration} días en Abu Simbel. Maravíllate con los colosales templos tallados en la montaña.`,
                ar: `شاهد عظمة تحفة رمسيس الثاني في تجربة أبو سمبل هذه لمدة ${duration} أيام. تعجب بالمعابد الضخمة المنحوتة في الجبل.`
            }
        };

        const cityDescriptions = descriptions[city] || {
            en: `A ${duration}-day customized experience in ${cityName.en}. Explore ${siteCount} carefully selected sites and immerse yourself in the local culture.`,
            es: `Una experiencia personalizada de ${duration} días en ${cityName.es}. Explora ${siteCount} sitios cuidadosamente seleccionados y sumérgete en la cultura local.`,
            ar: `تجربة مخصصة لمدة ${duration} أيام في ${cityName.ar}. استكشف ${siteCount} مواقع مختارة بعناية واغمر نفسك في الثقافة المحلية.`
        };

        return {
            en: cityDescriptions.en,
            es: cityDescriptions.es,
            ar: cityDescriptions.ar
        };
    }

    // 📖 إنشاء وصف عام للمدينة
    private createCityGeneralDescription(city: SupportedCity, selectedSites: SupportedSite[], duration: number, language: Language): LocalizedString {
        const cityName = this.getCityLocalizedName(city);
        
        const descriptions = {
            cairo: {
                en: `Embark on an unforgettable ${duration}-day journey through the heart of ancient Egypt. Cairo, the city of a thousand minarets, offers an incredible blend of pharaonic grandeur and Islamic heritage. Your adventure begins with the iconic Great Pyramids of Giza, where you'll stand in awe of the last remaining wonder of the ancient world. Explore the mysterious Sphinx and discover the secrets of the pharaohs at the Grand Egyptian Museum, home to the treasures of Tutankhamun. Wander through the historic streets of Islamic Cairo, where ancient mosques and bustling bazaars tell stories of centuries past. Each day brings new discoveries as you immerse yourself in the rich tapestry of Egyptian history and culture.`,
                es: `Embárcate en un viaje inolvidable de ${duration} días por el corazón del antiguo Egipto. El Cairo, la ciudad de los mil minaretes, ofrece una increíble mezcla de grandeza faraónica y herencia islámica. Tu aventura comienza con las icónicas Grandes Pirámides de Giza, donde quedarás asombrado ante la última maravilla del mundo antiguo. Explora la misteriosa Esfinge y descubre los secretos de los faraones en el Gran Museo Egipcio, hogar de los tesoros de Tutankamón. Pasea por las calles históricas del Cairo Islámico, donde antiguas mezquitas y bulliciosos bazares cuentan historias de siglos pasados. Cada día trae nuevos descubrimientos mientras te sumerges en el rico tapiz de la historia y cultura egipcia.`,
                ar: `انطلق في رحلة لا تُنسى لمدة ${duration} أيام عبر قلب مصر القديمة. القاهرة، مدينة الألف مئذنة، تقدم مزيجًا رائعًا من العظمة الفرعونية والتراث الإسلامي. تبدأ مغامرتك بالأهرامات العظيمة الشهيرة في الجيزة، حيث ستقف مذهولاً أمام آخر عجائب الدنيا السبع. استكشف أبو الهول الغامض واكتشف أسرار الفراعنة في المتحف المصري الكبير، موطن كنوز توت عنخ آمون. تجول في شوارع القاهرة الإسلامية التاريخية، حيث تروي المساجد القديمة والأسواق المزدحمة قصص القرون الماضية. كل يوم يجلب اكتشافات جديدة بينما تغمر نفسك في النسيج الغني للتاريخ والثقافة المصرية.`
            },
            luxor: {
                en: `Step into the world of pharaohs with this ${duration}-day Luxor adventure. Known as the world's greatest open-air museum, Luxor offers an unparalleled journey through ancient Egyptian civilization. Begin your exploration at the magnificent Karnak Temple complex, where towering columns and intricate hieroglyphs tell stories of divine power. Cross the Nile to discover the Valley of the Kings, where pharaohs rest in their eternal tombs. Marvel at the Temple of Hatshepsut, dramatically carved into the cliffs, and explore the colorful tombs of nobles and artisans. Each site reveals another layer of Egypt's fascinating history, from the grandeur of royal temples to the intimate details of daily life in ancient times.`,
                es: `Adéntrate en el mundo de los faraones con esta aventura de ${duration} días en Luxor. Conocido como el museo al aire libre más grande del mundo, Luxor ofrece un viaje incomparable a través de la civilización del antiguo Egipto. Comienza tu exploración en el magnífico complejo del Templo de Karnak, donde columnas imponentes y jeroglíficos intrincados cuentan historias de poder divino. Cruza el Nilo para descubrir el Valle de los Reyes, donde los faraones descansan en sus tumbas eternas. Maravíllate con el Templo de Hatshepsut, dramáticamente tallado en los acantilados, y explora las coloridas tumbas de nobles y artesanos. Cada sitio revela otra capa de la fascinante historia de Egipto, desde la grandeza de los templos reales hasta los detalles íntimos de la vida cotidiana en la antigüedad.`,
                ar: `ادخل عالم الفراعنة مع مغامرة الأقصر هذه لمدة ${duration} أيام. المعروف باسم أكبر متحف في الهواء الطلق في العالم، يقدم الأقصر رحلة لا مثيل لها عبر حضارة مصر القديمة. ابدأ استكشافك في مجمع معبد الكرنك الرائع، حيث تروي الأعمدة الشاهقة والهيروغليفية المعقدة قصص القوة الإلهية. اعبر النيل لاكتشاف وادي الملوك، حيث يرقد الفراعنة في مقابرهم الأبدية. تعجب بمعبد حتشبسوت، المنحوت بشكل درامي في المنحدرات، واستكشف مقابر النبلاء والحرفيين الملونة. كل موقع يكشف عن طبقة أخرى من التاريخ المصري الرائع، من عظمة المعابد الملكية إلى التفاصيل الحميمة للحياة اليومية في العصور القديمة.`
            }
        };

        const cityDescriptions = descriptions[city] || {
            en: `Experience the unique charm of ${cityName.en} in this ${duration}-day customized journey. Discover the rich history, culture, and natural beauty that make this destination truly special.`,
            es: `Experimenta el encanto único de ${cityName.es} en este viaje personalizado de ${duration} días. Descubre la rica historia, cultura y belleza natural que hacen de este destino algo verdaderamente especial.`,
            ar: `اختبر السحر الفريد لـ ${cityName.ar} في هذه الرحلة المخصصة لمدة ${duration} أيام. اكتشف التاريخ الغني والثقافة والجمال الطبيعي الذي يجعل هذا الوجهة مميزة حقًا.`
        };

        return {
            en: cityDescriptions.en,
            es: cityDescriptions.es,
            ar: cityDescriptions.ar
        };
    }

    // 📅 إنشاء برنامج يومي للمدينة
    private createCityItinerary(city: SupportedCity, selectedSites: SupportedSite[], duration: number, language: Language): ItineraryItem[] {
        const itinerary: ItineraryItem[] = [];
        const sitesPerDay = Math.ceil(selectedSites.length / duration);

        for (let day = 1; day <= duration; day++) {
            const startIndex = (day - 1) * sitesPerDay;
            const endIndex = Math.min(startIndex + sitesPerDay, selectedSites.length);
            const daySites = selectedSites.slice(startIndex, endIndex);

            const dayTitle = {
                en: `Day ${day}: Exploring ${this.getCityLocalizedName(city).en}`,
                es: `Día ${day}: Explorando ${this.getCityLocalizedName(city).es}`,
                ar: `اليوم ${day}: استكشاف ${this.getCityLocalizedName(city).ar}`
            };

            const activities = this.generateActivitiesForSites(daySites, language);

            itinerary.push({
                day,
                title: dayTitle,
                activities
            });
        }

        return itinerary;
    }

    // 🎯 توليد الأنشطة للمواقع المختارة
    private generateActivitiesForSites(sites: SupportedSite[], language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const activities: { es: string[]; en: string[]; ar?: string[] } = {
            es: [],
            en: [],
            ar: []
        };

        for (const site of sites) {
            const siteActivities = this.getSiteActivities(site, language);
            activities.es.push(...siteActivities.es);
            activities.en.push(...siteActivities.en);
            if (siteActivities.ar) {
                activities.ar!.push(...siteActivities.ar);
            }
        }

        return activities;
    }

    // 📋 الحصول على أنشطة موقع معين
    private getSiteActivities(site: SupportedSite, language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const siteActivities: Record<SupportedSite, { es: string[]; en: string[]; ar?: string[] }> = {
            'gizaPyramidsAndSphinx': {
                es: ['Visita a la Meseta de Giza', 'Exploración de las Grandes Pirámides', 'Contemplación de la Gran Esfinge'],
                en: ['Visit to Giza Plateau', 'Exploration of the Great Pyramids', 'Viewing the Great Sphinx'],
                ar: ['زيارة هضبة الجيزة', 'استكشاف الأهرامات العظيمة', 'مشاهدة أبو الهول العظيم']
            },
            'egyptianMuseum': {
                es: ['Visita al Museo Egipcio', 'Exploración de la colección de Tutankamón', 'Admiración de las momias reales'],
                en: ['Visit to Egyptian Museum', 'Exploration of Tutankhamun collection', 'Admiring the royal mummies'],
                ar: ['زيارة المتحف المصري', 'استكشاف مجموعة توت عنخ آمون', 'الإعجاب بالمومياوات الملكية']
            },
            'karnakTemple': {
                es: ['Visita al Templo de Karnak', 'Exploración de la Gran Sala Hipóstila', 'Admiración de los obeliscos'],
                en: ['Visit to Karnak Temple', 'Exploration of the Great Hypostyle Hall', 'Admiring the obelisks'],
                ar: ['زيارة معبد الكرنك', 'استكشاف قاعة الأعمدة العظيمة', 'الإعجاب بالأعمدة']
            },
            'valleyOfTheKings': {
                es: ['Descenso al Valle de los Reyes', 'Exploración de tumbas faraónicas', 'Descubrimiento de jeroglíficos'],
                en: ['Descent into Valley of the Kings', 'Exploration of pharaonic tombs', 'Discovery of hieroglyphs'],
                ar: ['النزول إلى وادي الملوك', 'استكشاف المقابر الفرعونية', 'اكتشاف الهيروغليفية']
            }
        };

        return siteActivities[site] || {
            es: [`Visita a ${site}`],
            en: [`Visit to ${site}`],
            ar: [`زيارة ${site}`]
        };
    }

    // ✅ الخدمات المشمولة
    private getCityServicesIncluded(city: SupportedCity, language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const baseServices = {
            es: [
                'Traslados privados de lujo',
                'Guía egiptólogo profesional',
                'Entradas a todos los sitios mencionados',
                'Alojamiento con desayuno',
                'Asistencia 24/7'
            ],
            en: [
                'Private luxury transfers',
                'Professional Egyptologist guide',
                'Entrance fees to all mentioned sites',
                'Accommodation with breakfast',
                '24/7 assistance'
            ],
            ar: [
                'نقل خاص فاخر',
                'دليل متخصص في علم المصريات',
                'رسوم دخول لجميع المواقع المذكورة',
                'إقامة مع الإفطار',
                'مساعدة على مدار الساعة'
            ]
        };

        return baseServices;
    }

    // ❌ الخدمات غير المشمولة
    private getCityServicesExcluded(city: SupportedCity, language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const baseServices = {
            es: [
                'Vuelos internacionales',
                'Almuerzos y cenas (excepto desayuno)',
                'Propinas y gastos personales',
                'Seguro de viaje',
                'Gastos de visa'
            ],
            en: [
                'International flights',
                'Lunches and dinners (except breakfast)',
                'Tips and personal expenses',
                'Travel insurance',
                'Visa fees'
            ],
            ar: [
                'الرحلات الجوية الدولية',
                'الغداء والعشاء (عدا الإفطار)',
                'البقشيش والمصروفات الشخصية',
                'تأمين السفر',
                'رسوم التأشيرة'
            ]
        };

        return baseServices;
    }

    // ⚠️ ملاحظات مهمة
    private getCityImportantNotes(city: SupportedCity, language: Language): { es: string[]; en: string[]; ar?: string[] } {
        const baseNotes = {
            es: [
                'Se requiere pasaporte válido',
                'Se recomienda ropa cómoda y zapatos para caminar',
                'Horarios de sitios pueden variar según temporada',
                'Fotografía permitida en la mayoría de sitios'
            ],
            en: [
                'Valid passport required',
                'Comfortable clothing and walking shoes recommended',
                'Site hours may vary by season',
                'Photography allowed at most sites'
            ],
            ar: [
                'مطلوب جواز سفر صالح',
                'يُنصح بملابس مريحة وأحذية للمشي',
                'أوقات المواقع قد تختلف حسب الموسم',
                'التصوير مسموح في معظم المواقع'
            ]
        };

        return baseNotes;
    }
}

// 🚀 تصدير الدوال
export function getAvailableCities(): SupportedCity[] {
    const extractor = new CityBasedExtractor();
    return extractor.getAvailableCities();
}

export function getSitesForCity(city: SupportedCity): SupportedSite[] {
    const extractor = new CityBasedExtractor();
    return extractor.getSitesForCity(city);
}

export function createCityBasedProgram(request: {
    city: SupportedCity;
    selectedSites: SupportedSite[];
    duration: number;
    travelers: number;
    season: 'summer' | 'winter';
    category: 'gold' | 'diamond';
    language: Language;
}): Program {
    const extractor = new CityBasedExtractor();
    return extractor.createCityBasedProgram(request);
}

export function getAccommodationForCity(city: SupportedCity, category: 'gold' | 'diamond'): AccommodationInfo[] {
    const extractor = new CityBasedExtractor();
    return extractor.getAccommodationForCity(city, category);
}