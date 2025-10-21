import type { CostData } from '../types';

export const internalCosts: CostData = {
    // Corrected accommodation prices as per the official PDF
    accommodation: { // Per person per night, based on double occupancy
      cairo: {
        gold: { summer: 65, winter: 75 },
        diamond: { summer: 120, winter: 135 },
      },
      luxor: { // Steigenberger Resort Achti (Ambos)
        gold: { summer: 75, winter: 75 },
        diamond: { summer: 75, winter: 75 },
      },
      aswan: { // Tolip Hotel Aswan (Ambos)
        gold: { summer: 100, winter: 100 },
        diamond: { summer: 100, winter: 100 },
      },
      cruise: { // PC - Pensión Completa
        gold: { summer: 75, winter: 95 },
        diamond: { summer: 85, winter: 120 },
      },
      hurghada: { // Hilton Hurghada Plaza (Ambos) HB - Media Pensión
        gold: { summer: 100, winter: 100 },
        diamond: { summer: 100, winter: 100 },
      },
      sharmElSheikh: { // Renaissance (Ambos) HB
        gold: { summer: 100, winter: 100 },
        diamond: { summer: 100, winter: 100 },
      },
      // Other hotels from the PDF price table
      morganlandVillage: { gold: { summer: 70, winter: 70 }, diamond: { summer: 70, winter: 70 } },
      setiAbuSimbelResort: { gold: { summer: 200, winter: 200 }, diamond: { summer: 200, winter: 200 } },
    },
    transport: {
      vehicleCapacities: {
        limousine: { min: 1, max: 2 },
        microbus: { min: 1, max: 16 },
        minibus: { min: 1, max: 25 },
        bus: { min: 1, max: 50 }
      },
      // New, more accurate service-based pricing structure
      pricelist: {
        cairo: {
          airport: { limousine: 0, microbus: 40.44, minibus: 63.56, bus: 127.11 }, // Based on 'aeropuerto-octubre-helwan'
          halfDay: { limousine: 0, microbus: 50.56, minibus: 79.67, bus: 166.11 }, // Based on 'medio-dia'
          fullDay: { limousine: 0, microbus: 57.78, minibus: 89.78, bus: 180.56 }, // Based on 'dia-completo'
          intercity: {
            alexandria: { limousine: 0, microbus: 98.22, minibus: 172.11, bus: 268.67 },
            luxor: { limousine: 0, microbus: 318.89, minibus: 491.11, bus: 765.56 },
            aswan: { limousine: 0, microbus: 430.00, minibus: 577.78, bus: 981.11 },
          }
        },
        luxor: {
          airport: { limousine: 6.00, microbus: 7.78, minibus: 10.78, bus: 26.33 }, // Proxy from 'estacion-hotel'
          halfDay: { limousine: 21.34, microbus: 35.45, minibus: 50.95, bus: 132.95 }, // Calculated as 50% of fullDay
          fullDay: { limousine: 42.67, microbus: 70.89, minibus: 101.89, bus: 265.89 }, // Based on 'dia-completo-oeste'
          intercity: {
            aswan: { limousine: 59.33, microbus: 74.89, minibus: 118.44, bus: 288.11 },
            hurghada: { limousine: 73.89, microbus: 92.22, minibus: 147.56, bus: 318.22 },
          }
        },
        aswan: {
          airport: { limousine: 15.33, microbus: 21.11, minibus: 42.56, bus: 71.44 }, // Based on 'aeropuerto-barco'
          halfDay: { limousine: 16.89, microbus: 23.67, minibus: 50.67, bus: 80.89 }, // Proxy from 'templo-philae'
          fullDay: { limousine: 33.78, microbus: 47.34, minibus: 97.78, bus: 158.45 }, // Sum of 'philae' and 'presa-obelisco'
          intercity: {
            abuSimbel: { limousine: 111.33, microbus: 138.00, minibus: 212.56, bus: 394.67 },
            luxor: { limousine: 59.33, microbus: 74.89, minibus: 118.44, bus: 288.11 }, // Symmetrical to luxor->aswan
          }
        }
      },
      // Kept for fallback logic in pricing engine
      representativeDailyRates: {
          cairo: { limousine: 0, microbus: 57.78, minibus: 89.78, bus: 180.56 }, // From "Día completo"
          luxor: { limousine: 42.67, microbus: 70.89, minibus: 101.89, bus: 265.89 }, // From "Día completo oeste"
          aswan: { limousine: 33.78, microbus: 47.34, minibus: 97.78, bus: 158.45 }, // From sum of tours
      },
    },
    // Corrected ticket prices with Adult/Student structure as per the PDF
    tickets: {
      // Cairo & Giza
      saqqara: { adult: 13.3, student: 6.7 },
      citadelAndAlabasterMosque: { adult: 12.2, student: 6.1 },
      khanElKhalili: { adult: 0, student: 0 },
      citadelOfSaladin: { adult: 12.2, student: 6.1 },
      sultanHassanMosque: { adult: 4.9, student: 2.4 },
      elSeheimyHouse: { adult: 4.9, student: 2.4 },
      mohamedAliPalace: { adult: 6.7, student: 3.3 },
      marysTree: { adult: 4.9, student: 2.4 },
      senusretIObelisk: { adult: 4.4, student: 2.2 },
      egyptianMuseum: { adult: 12.2, student: 6.1 },
      egyptianMuseumAudioGuide: { adult: 1.7, student: 1.7 },
      islamicArtMuseum: { adult: 7.6, student: 3.8 },
      copticMuseum: { adult: 6.2, student: 3.1 },
      royalCarriagesMuseum: { adult: 6.7, student: 3.3 },
      gayerAndersonMuseum: { adult: 2.2, student: 1.1 },
      baronEmpainPalace: { adult: 4.9, student: 2.4 },
      alMuizzStreet: { adult: 4.9, student: 2.4 },
      manialPalace: { adult: 4.9, student: 2.4 },
      nilometer: { adult: 2.7, student: 1.3 },
      gizaPyramidsAndSphinx: { adult: 15.6, student: 7.8 }, // Entrada general
      pyramidOfKeopsInterior: { adult: 22.2, student: 11.1 },
      pyramidOfKhafrenInterior: { adult: 6.2, student: 3.1 },
      pyramidOfMicerinoInterior: { adult: 6.2, student: 3.1 },
      tombOfMeresankh: { adult: 4.4, student: 2.2 },
      saqqaraComplexAndImhotepMuseum: { adult: 13.3, student: 6.7 },
      nobleTombsOfTheNewKingdom: { adult: 8.9, student: 4.4 },
      southTombSaqqara: { adult: 6.7, student: 3.3 },
      saqqaraCombinedTicket: { adult: 22.2, student: 11.1 },
      // Saqqara, Dashur, Memphis
      stepPyramidOfZoser: { adult: 6.2, student: 3.1 },
      serapeum: { adult: 7.6, student: 3.8 },
      tombOfMereruka: { adult: 4.4, student: 2.2 },
      dashurArchaeologicalZone: { adult: 4.4, student: 2.2 },
      memphisMitRahina: { adult: 4.4, student: 2.2 },
      egyptianCivilizationMuseum: { adult: 11.1, student: 5.6 },
      grandEgyptianMuseum: { adult: 26.7, student: 13.3 },
      // Alexandria
      qaitbayCitadel: { adult: 4.4, student: 2.2 },
      komElShoqafaCatacombs: { adult: 4.4, student: 2.2 },
      komElDikkaRomanTheater: { adult: 4.4, student: 2.2 },
      pompeysPillar: { adult: 4.4, student: 2.2 },
      alexandriaNationalMuseum: { adult: 4.9, student: 2.4 },
      royalJewelryMuseum: { adult: 4.9, student: 2.4 },
      graecoRomanMuseum: { adult: 8.9, student: 4.4 },
      rosettaRuins: { adult: 2.7, student: 1.3 },
      // Other Governorates
      kafrElSheikhMuseum: { adult: 4.9, student: 2.4 },
      sanElHagarRuins: { adult: 2.7, student: 1.3 },
      mallawiMuseum: { adult: 2.7, student: 1.3 },
      tunaElGebel: { adult: 4.4, student: 2.2 },
      beniHassanTombs: { adult: 4.4, student: 2.2 },
      tellElAmarna: { adult: 4.4, student: 2.2 },
      royalNecropolisAmarna: { adult: 2.7, student: 1.3 },
      statueOfMeritAmun: { adult: 2.7, student: 1.3 },
      abydosTemple: { adult: 5.8, student: 2.9 },
      denderaTemple: { adult: 6.7, student: 3.3 },
      // Luxor
      karnakTemple: { adult: 13.3, student: 6.7 },
      mutTemple: { adult: 4.4, student: 2.2 },
      luxorTemple: { adult: 11.1, student: 5.6 },
      valleyOfTheKings: { adult: 16.7, student: 8.3 },
      tombOfSetiI: { adult: 44.4, student: 22.2 },
      tombOfAy: { adult: 4.4, student: 2.2 },
      hatshepsutTemple: { adult: 8.9, student: 4.9 },
      deirElMedina: { adult: 4.9, student: 2.4 },
      tombOfPashed: { adult: 2.7, student: 1.3 },
      tombOfRamose: { adult: 4.4, student: 2.2 },
      ramesseumTemple: { adult: 4.9, student: 2.4 },
      abdelQurnaHill: { adult: 2.7, student: 1.3 },
      carterHouse: { adult: 4.9, student: 2.4 },
      tombOfMennaAndNakht: { adult: 4.4, student: 2.2 },
      tombsOfUserhatAndKhaemwaset: { adult: 2.7, student: 1.3 },
      alAsasif: { adult: 4.4, student: 2.2 },
      esnaTemple: { adult: 4.4, student: 2.2 },
      tombOfRamsesVI: { adult: 4.9, student: 2.4 },
      valleyOfTheQueens: { adult: 4.9, student: 2.4 },
      tombOfNefertari: { adult: 55.6, student: null }, // Fijo / no student price
      elKhokhaNecropolis: { adult: 2.7, student: 1.3 },
      tombsOfRoyAndShuroy: { adult: 2.7, student: 1.3 },
      qurnaMerai: { adult: 2.7, student: 1.3 },
      sheikhAbdelQurna: { adult: 2.7, student: 1.3 },
      mummificationMuseum: { adult: 4.9, student: 2.4 },
      luxorMuseum: { adult: 8.9, student: 4.4 },
      // Aswan & Abu Simbel
      abuSimbelTemples: { adult: 16.7, student: 8.3 },
      sunFestivalAbuSimbel: { adult: 26.7, student: 13.3 },
      philaeTemple: { adult: 12.2, student: 6.1 },
      edfuTemple: { adult: 12.2, student: 6.1 },
      komOmboTemple: { adult: 10.0, student: 5.0 },
      qubbetElHawa: { adult: 4.4, student: 2.2 },
      unfinishedObelisk: { adult: 4.9, student: 2.4 },
      kalabshaTemple: { adult: 4.4, student: 2.2 },
      elKab: { adult: 4.4, student: 2.2 },
      nubianMuseum: { adult: 8.9, student: 4.4 },
      highDam: { adult: 4.9, student: 2.4 }

    },
};