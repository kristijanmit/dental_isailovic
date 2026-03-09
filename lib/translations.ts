import type { SiteData } from "./siteData";

export type Locale = "en" | "sr";

export const locales: Locale[] = ["en", "sr"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  sr: "Српски"
};

const translations: Record<Locale, SiteData> = {
  en: {
    common: {
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
      previousReviewLabel: "Previous review",
      nextReviewLabel: "Next review",
      reviewPaginationLabel: "Review pagination",
      previousImageLabel: "Previous image",
      nextImageLabel: "Next image",
      closeLightboxLabel: "Close preview",
      openGalleryImageLabelPrefix: "Open gallery image",
      whatsappLabel: "WhatsApp",
      selectServicePlaceholder: "Select service",
      starsOutOfFiveSuffix: "out of 5 stars"
    },

    clinic: {
      clinicName: "Dental Studio Smile",
      phoneRaw: "+381601234567",
      phoneDisplay: "+381 60 123 4567",
      address: "Kralja Petra 12, Belgrade",
      email: "kontakt@dentalstudio.rs",
      openingHours: [
        "Monday – Friday: 08:00 – 20:00",
        "Saturday: 09:00 – 15:00",
        "Sunday: Closed"
      ],
      whatsappNumber: "381601234567",
      googleMapsUrl: "https://www.google.com/maps?q=Kralja+Petra+12,+Beograd&output=embed",
      socials: {
        instagram: "https://instagram.com/dentalstudio",
        facebook: "https://facebook.com/dentalstudio"
      }
    },

    seo: {
      title: "Dental Studio Smile | Modern pain-free dentistry",
      titleTemplate: "%s | Dental Studio Smile",
      description: "Modern dental clinic in Belgrade. Implantology, cosmetic dentistry, teeth whitening, and preventive checkups. Schedule your appointment quickly and easily.",
      ogImage: "/images/smile.jpg"
    },

    nav: [
      { label: "Home", href: "#home" },
      { label: "Services", href: "#services" },
      { label: "Patient Experiences", href: "#reviews" },
      { label: "Gallery", href: "#gallery" },
      { label: "Our Team", href: "#team" },
      { label: "Contact", href: "#contact" }
    ],

    topBarCtaLabel: "Schedule appointment",

    hero: {
      headline: "A healthy and beautiful smile starts here",
      subheadline: "A modern dental clinic dedicated to the health and aesthetics of your teeth.",
      supportingText: "We provide complete dental care – from routine checkups and professional cleaning to aesthetic treatments and implantology. Our goal is a healthy, functional, and natural smile for every patient.",
      requestCtaLabel: "Free consultation",
      callCtaLabel: "Call us",
      ctaReassurance: "Free consultation • Appointment this week • No obligation",
      trustBadges: [
        "4.9/5 patient rating",
        "Modern dental equipment",
        "Friendly and professional team"
      ],

      image: {
        src: "/images/smile.jpg",
        alt: "Dentist talking with a patient in a modern clinic"
      }
    },

    highlights: {
      title: "Why patients choose our clinic",
      items: [
        {
          title: "Modern technology",
          description: "We use digital diagnostics and modern dental equipment for precise and safe treatments.",
          icon: "sparkles"
        },
        {
          title: "Experienced dental team",
          description: "Our doctors have years of experience and continuously improve their skills in modern dentistry.",
          icon: "shield"
        },
        {
          title: "Individual approach",
          description: "Every patient receives a treatment plan tailored to their needs and goals.",
          icon: "heart"
        },
        {
          title: "Pleasant atmosphere",
          description: "We make sure every visit is comfortable and stress-free for our patients.",
          icon: "clock"
        }
      ]
    },

    servicesSection: {
      title: "Dental services",
      subtitle: "Complete dental care in one place – health, function, and aesthetics of your smile.",
      learnMoreLabel: "Read more",
      showLessLabel: "Show less"
    },

    services: [
      {
        id: "preventive-care",
        title: "Preventive dentistry",
        short: "Regular checkups, tartar removal, and dental health monitoring.",
        long: "Preventive checkups and professional teeth cleaning help prevent cavities and gum disease. Regular visits allow early detection of problems and simpler treatment.",
        image: { src: "/images/care.jpg", alt: "Dental treatment room for checkups" }
      },
      {
        id: "cosmetic-dentistry",
        title: "Cosmetic dentistry",
        short: "Teeth whitening, aesthetic fillings, and smile correction.",
        long: "Cosmetic treatments help your smile look natural, healthy, and balanced. We use modern materials and techniques for long-lasting aesthetic results.",
        image: { src: "/images/smile.jpg", alt: "Modern dental equipment for aesthetic treatments" }
      },
      {
        id: "restorative",
        title: "Restorative dentistry",
        short: "Fillings, crowns, bridges, and implants.",
        long: "When teeth are damaged or missing, restorative treatments restore both function and aesthetics with durable and high-quality solutions.",
        image: { src: "/images/implant.jpg", alt: "Dental chair and equipment for restorative procedures" }
      },
      {
        id: "emergency",
        title: "Emergency dental care",
        short: "Fast help for pain, swelling, and dental injuries.",
        long: "In case of pain or urgent dental problems, our team provides quick diagnostics and treatment to resolve the issue as soon as possible.",
        image: { src: "/images/pain.jpg", alt: "Dental clinic interior for emergency care" }
      }
    ],

    whyChooseUs: {
      title: "Why choose our clinic",
      subtitle: "We are dedicated to high-quality dental care, long-term oral health, and patient satisfaction.",

      bullets: [
        "Clearly explained treatment options and transparent pricing",
        "Modern diagnostics and high-quality dental materials",
        "A comfortable approach for patients with dental anxiety",
        "Detailed patient care even after treatment is completed"
      ],

      stats: [
        { label: "Years of experience", value: "10+" },
        { label: "Satisfied patients", value: "7000+" },
        { label: "Average rating", value: "4.9/5" }
      ]
    },

    reviewsSection: {
      title: "Patient experiences",
      subtitle: "The trust of our patients is the best confirmation of the quality of our work."
    },

    reviews: [
      {
        name: "Milica Petrović",
        rating: 5,
        text: "An extremely professional team and a very pleasant atmosphere. Everything was explained in detail and the treatment was painless."
      },
      {
        name: "Marko Jovanović",
        rating: 5,
        text: "Very friendly staff and modern equipment. I got an appointment quickly and the result is excellent."
      },
      {
        name: "Jelena Nikolić",
        rating: 5,
        text: "The best experience at a dentist so far. The clinic is clean, modern, and the staff are very dedicated to patients."
      }
    ],

    gallerySection: {
      title: "Clinic gallery",
      subtitle: "Take a look at our modern dental clinic."
    },

    gallery: [
      { src: "/images/gallery1.jpg", alt: "Dental clinic reception" },
      { src: "/images/gallery2.jpg", alt: "Dental treatment room" },
      { src: "/images/gallery3.jpg", alt: "Modern dental equipment" },
      { src: "/images/gallery4.jpg", alt: "Consultation area" },
      { src: "/images/gallery5.jpg", alt: "Patient waiting area" },
      { src: "/images/gallery6.jpg", alt: "Dental chair and equipment" },
      { src: "/images/gallery7.jpg", alt: "Instrument sterilization area" },
      { src: "/images/gallery8.jpg", alt: "Interior of the dental clinic" }
    ],

    teamSection: {
      title: "Our dental team",
      subtitle: "Skilled and dedicated professionals who care about your smile."
    },

    processSection: {
      title: "What your visit looks like",
      subtitle: "A simple and transparent process from the first contact to the completion of treatment."
    },

    process: [
      {
        title: "1. Contact",
        description: "Call us, send a message, or fill out the appointment form."
      },
      {
        title: "2. Examination and consultation",
        description: "The doctor evaluates the condition of your teeth and recommends the best treatment option."
      },
      {
        title: "3. Treatment",
        description: "Treatment is performed using modern equipment and maximum comfort for the patient."
      },
      {
        title: "4. Follow-up and maintenance",
        description: "We provide dental care advice and schedule regular checkups."
      }
    ],

    contactSection: {
      title: "Schedule a dental appointment",
      subtitle: "Fill out the form or contact us by phone and we will respond quickly.",

      privacyNote: "Your data is used solely to respond to your inquiry.",

      submitLabel: "Send request",

      successTitle: "Your request has been prepared successfully",

      successDescription: "The data was not sent automatically. You can copy it or send it directly via email.",

      copyButtonLabel: "Copy message",
      copiedButtonLabel: "Copied",
      emailButtonLabel: "Send email",
      resetButtonLabel: "New request",

      quickActionsTitle: "Quick contact",

      form: {
        fullNameLabel: "Full name *",
        phoneLabel: "Phone *",
        emailLabel: "Email",
        serviceInterestLabel: "Service of interest *",
        messageLabel: "Message *",
        consentLabel: "I agree that the clinic may contact me regarding my inquiry. *"
      }
    },

    mapSection: {
      title: "Where to find us",
      subtitle: "Our clinic is located in an easily accessible area.",
      embedTitle: "Dental clinic location"
    },

    footer: {
      aboutTitle: "Dental Studio Smile",

      aboutText: "A modern dental clinic dedicated to the health, function, and aesthetics of your teeth.",

      quickLinksTitle: "Quick links",

      legalTitle: "Legal",

      legalLinks: [
        { label: "Privacy policy", href: "#" },
        { label: "Terms of use", href: "#" },
        { label: "Website accessibility", href: "#" }
      ],

      copyright: "© 2026 Dental Studio Smile. All rights reserved."
    },

    team: [
      {
        name: "Dr Ana Petrović",
        role: "Dental specialist",
        bio: "Dr Ana Petrović has more than 12 years of experience in preventive and restorative dentistry. She is especially dedicated to working with patients who have dental anxiety.",
        specialties: [
          "Preventive dentistry",
          "Aesthetic fillings",
          "Crowns and bridges"
        ]
      },
      {
        name: "Dr Marko Jovanović",
        role: "Doctor of dentistry",
        bio: "Dr Marko Jovanović focuses on cosmetic dentistry and modern smile enhancement techniques. His goal is a natural and functional result for every patient.",
        specialties: [
          "Teeth whitening",
          "Cosmetic dentistry",
          "Smile design"
        ]
      },
      {
        name: "Ivana Nikolić",
        role: "Dental assistant",
        bio: "Ivana assists during dental procedures and helps organize the clinic workflow, ensuring each treatment runs efficiently and comfortably for patients.",
        specialties: [
          "Treatment assistance",
          "Patient preparation",
          "Instrument sterilization"
        ]
      },
      {
        name: "Milan Stanković",
        role: "Patient coordinator",
        bio: "Milan is responsible for patient communication, appointment scheduling, and explaining treatment plans so every patient has a clear and smooth experience.",
        specialties: [
          "Appointment scheduling",
          "Treatment information",
          "Patient support"
        ]
      }
    ]
  },
  sr: {
    common: {
      openMenuLabel: "Otvori meni",
      closeMenuLabel: "Zatvori meni",
      previousReviewLabel: "Prethodna recenzija",
      nextReviewLabel: "Sledeća recenzija",
      reviewPaginationLabel: "Paginacija recenzija",
      previousImageLabel: "Prethodna slika",
      nextImageLabel: "Sledeća slika",
      closeLightboxLabel: "Zatvori prikaz",
      openGalleryImageLabelPrefix: "Otvori sliku iz galerije",
      whatsappLabel: "WhatsApp",
      selectServicePlaceholder: "Izaberite uslugu",
      starsOutOfFiveSuffix: "od 5 zvezdica"
    },

    clinic: {
      clinicName: "Dental Studio Smile",
      phoneRaw: "+381601234567",
      phoneDisplay: "+381 60 123 4567",
      address: "Kralja Petra 12, Beograd",
      email: "kontakt@dentalstudio.rs",
      openingHours: [
        "Ponedeljak – Petak: 08:00 – 20:00",
        "Subota: 09:00 – 15:00",
        "Nedelja: Ne radimo"
      ],
      whatsappNumber: "381601234567",
      googleMapsUrl: "https://www.google.com/maps?q=Kralja+Petra+12,+Beograd&output=embed",
      socials: {
        instagram: "https://instagram.com/dentalstudio",
        facebook: "https://facebook.com/dentalstudio"
      }
    },

    seo: {
      title: "Dental Studio Smile | Savremena stomatologija bez bola",
      titleTemplate: "%s | Dental Studio Smile",
      description: "Savremena stomatološka ordinacija u Beogradu. Implantologija, estetska stomatologija, beljenje zuba i preventivni pregledi. Zakažite termin brzo i jednostavno.",
      ogImage: "/images/smile.jpg"
    },

    nav: [
      { label: "Početna", href: "#home" },
      { label: "Usluge", href: "#services" },
      { label: "Iskustva pacijenata", href: "#reviews" },
      { label: "Galerija", href: "#gallery" },
      { label: "Naš tim", href: "#team" },
      { label: "Kontakt", href: "#contact" }
    ],

    topBarCtaLabel: "Zakažite pregled",

    hero: {
      headline: "Zdrav i lep osmeh počinje ovde",
      subheadline: "Savremena stomatološka ordinacija posvećena zdravlju i estetici vaših zuba.",
      supportingText: "Pružamo kompletnu stomatološku negu – od redovnih pregleda i čišćenja kamenca do estetskih zahvata i implantologije. Naš cilj je zdrav, funkcionalan i prirodan osmeh svakog pacijenta.",
      requestCtaLabel: "Besplatna konsultacija",
      callCtaLabel: "Pozovite nas",
      ctaReassurance: "Besplatna konsultacija • Pregled u istoj nedelji • Bez obaveze",
      trustBadges: [
        "4.9/5 ocena pacijenata",
        "Savremena stomatološka oprema",
        "Prijatan i stručan tim"
      ],

      image: {
        src: "/images/smile.jpg",
        alt: "Stomatolog razgovara sa pacijentom u modernoj ordinaciji"
      }
    },

    highlights: {
      title: "Zašto pacijenti biraju našu ordinaciju",
      items: [
        {
          title: "Savremena tehnologija",
          description: "Koristimo digitalnu dijagnostiku i modernu stomatološku opremu za precizne i bezbedne tretmane.",
          icon: "sparkles"
        },
        {
          title: "Iskusan stomatološki tim",
          description: "Naši doktori imaju dugogodišnje iskustvo i stalno se usavršavaju u oblasti savremene stomatologije.",
          icon: "shield"
        },
        {
          title: "Individualni pristup",
          description: "Svaki pacijent dobija plan terapije prilagođen njegovim potrebama i željama.",
          icon: "heart"
        },
        {
          title: "Prijatna atmosfera",
          description: "Trudimo se da svaka poseta bude opuštena i bez neprijatnosti za pacijenta.",
          icon: "clock"
        }
      ]
    },

    servicesSection: {
      title: "Stomatološke usluge",
      subtitle: "Kompletna stomatološka nega na jednom mestu – zdravlje, funkcija i estetika osmeha.",
      learnMoreLabel: "Pročitaj više",
      showLessLabel: "Prikaži manje"
    },

    services: [
      {
        id: "preventive-care",
        title: "Preventivna stomatologija",
        short: "Redovni pregledi, čišćenje kamenca i kontrola zdravlja zuba.",
        long: "Preventivni pregledi i profesionalno čišćenje zuba pomažu u sprečavanju karijesa i bolesti desni. Redovne kontrole omogućavaju rano otkrivanje problema i jednostavnije lečenje.",
        image: { src: "/images/gallery2.jpg", alt: "Stomatološka ordinacija za preglede" }
      },
      {
        id: "cosmetic-dentistry",
        title: "Estetska stomatologija",
        short: "Beljenje zuba, estetske plombe i korekcija osmeha.",
        long: "Estetski tretmani pomažu da vaš osmeh izgleda prirodno, zdravo i skladno. Koristimo savremene materijale i tehnike za dugotrajan estetski rezultat.",
        image: { src: "/images/gallery3.jpg", alt: "Savremena stomatološka oprema za estetske tretmane" }
      },
      {
        id: "restorative",
        title: "Restaurativna stomatologija",
        short: "Plombe, krunice, mostovi i implantati.",
        long: "Kada su zubi oštećeni ili nedostaju, restaurativni tretmani vraćaju funkciju i estetiku zubnog niza uz dugotrajna i kvalitetna rešenja.",
        image: { src: "/images/gallery6.jpg", alt: "Stomatološka stolica i oprema za restaurativne procedure" }
      },
      {
        id: "emergency",
        title: "Hitna stomatološka pomoć",
        short: "Brza pomoć kod bola, otoka i povreda zuba.",
        long: "U slučaju bola ili hitnog problema sa zubima, naš tim pruža brzu dijagnostiku i terapiju kako bi se problem rešio što pre.",
        image: { src: "/images/gallery8.jpg", alt: "Unutrašnjost stomatološke ordinacije za hitnu pomoć" }
      }
    ],

    whyChooseUs: {
      title: "Zašto izabrati našu ordinaciju",
      subtitle: "Posvećeni smo kvalitetnoj stomatološkoj nezi, dugoročnom zdravlju zuba i zadovoljstvu pacijenata.",

      bullets: [
        "Jasno objašnjene opcije lečenja i transparentne cene",
        "Savremena dijagnostika i kvalitetni stomatološki materijali",
        "Prijatan pristup pacijentima koji imaju strah od stomatologa",
        "Detaljna briga o pacijentima i nakon završenog tretmana"
      ],

      stats: [
        { label: "Godina iskustva", value: "10+" },
        { label: "Zadovoljnih pacijenata", value: "7000+" },
        { label: "Prosečna ocena", value: "4.9/5" }
      ]
    },

    reviewsSection: {
      title: "Iskustva naših pacijenata",
      subtitle: "Poverenje pacijenata je najbolja potvrda kvaliteta našeg rada."
    },

    reviews: [
      {
        name: "Milica Petrović",
        rating: 5,
        text: "Izuzetno profesionalan tim i veoma prijatna atmosfera. Sve je detaljno objašnjeno i tretman je prošao bez bola."
      },
      {
        name: "Marko Jovanović",
        rating: 5,
        text: "Vrlo ljubazno osoblje i savremena oprema. Termin sam dobio brzo, a rezultat je odličan."
      },
      {
        name: "Jelena Nikolić",
        rating: 5,
        text: "Najbolje iskustvo kod stomatologa do sada. Ordinacija je čista, moderna i osoblje je veoma posvećeno pacijentima."
      }
    ],

    gallerySection: {
      title: "Galerija ordinacije",
      subtitle: "Pogledajte kako izgleda naša moderna stomatološka ordinacija."
    },

    gallery: [
      { src: "/images/gallery1.jpg", alt: "Recepcija stomatološke ordinacije" },
      { src: "/images/gallery2.jpg", alt: "Stomatološka ordinacija" },
      { src: "/images/gallery3.jpg", alt: "Savremena stomatološka oprema" },
      { src: "/images/gallery4.jpg", alt: "Prostor za konsultacije" },
      { src: "/images/gallery5.jpg", alt: "Čekaonica za pacijente" },
      { src: "/images/gallery6.jpg", alt: "Stomatološka stolica i oprema" },
      { src: "/images/gallery7.jpg", alt: "Prostor za sterilizaciju instrumenata" },
      { src: "/images/gallery8.jpg", alt: "Unutrašnjost stomatološke ordinacije" }
    ],

    teamSection: {
      title: "Naš stomatološki tim",
      subtitle: "Stručni i posvećeni profesionalci koji brinu o vašem osmehu."
    },

    processSection: {
      title: "Kako izgleda vaša poseta",
      subtitle: "Jednostavan i transparentan proces od prvog kontakta do završetka terapije."
    },

    process: [
      {
        title: "1. Kontakt",
        description: "Pozovite nas, pošaljite poruku ili popunite formular za zakazivanje pregleda."
      },
      {
        title: "2. Pregled i konsultacija",
        description: "Doktor procenjuje stanje zuba i predlaže najbolju opciju terapije."
      },
      {
        title: "3. Tretman",
        description: "Terapija se sprovodi uz savremenu opremu i maksimalan komfor za pacijenta."
      },
      {
        title: "4. Kontrola i održavanje",
        description: "Dajemo savete za negu zuba i zakazujemo redovne kontrolne preglede."
      }
    ],

    contactSection: {
      title: "Zakažite stomatološki pregled",
      subtitle: "Popunite formular ili nas kontaktirajte telefonom i brzo ćemo vam odgovoriti.",

      privacyNote: "Vaši podaci se koriste isključivo za odgovor na vaš upit.",

      submitLabel: "Pošalji zahtev",

      successTitle: "Vaš zahtev je uspešno pripremljen",

      successDescription: "Podaci nisu poslati automatski. Možete ih kopirati ili poslati direktno putem e-pošte.",

      copyButtonLabel: "Kopiraj poruku",
      copiedButtonLabel: "Kopirano",
      emailButtonLabel: "Pošalji e-poštom",
      resetButtonLabel: "Novi zahtev",

      quickActionsTitle: "Brzi kontakt",

      form: {
        fullNameLabel: "Ime i prezime *",
        phoneLabel: "Telefon *",
        emailLabel: "E-pošta",
        serviceInterestLabel: "Usluga koja vas interesuje *",
        messageLabel: "Poruka *",
        consentLabel: "Saglasan/na sam da me ordinacija kontaktira u vezi mog upita. *"
      }
    },

    mapSection: {
      title: "Gde se nalazimo",
      subtitle: "Naša ordinacija nalazi se na lako dostupnoj lokaciji.",
      embedTitle: "Lokacija stomatološke ordinacije"
    },

    footer: {
      aboutTitle: "Dental Studio Smile",

      aboutText: "Savremena stomatološka ordinacija posvećena zdravlju, funkciji i estetici vaših zuba.",

      quickLinksTitle: "Brzi linkovi",

      legalTitle: "Pravno",

      legalLinks: [
        { label: "Politika privatnosti", href: "#" },
        { label: "Uslovi korišćenja", href: "#" },
        { label: "Pristupačnost sajta", href: "#" }
      ],

      copyright: "© 2026 Dental Studio Smile. Sva prava zadržana."
    },
    team: [
      {
        name: "Dr Ana Petrović",
        role: "Specijalista stomatologije",
        bio: "Dr Ana Petrović ima više od 12 godina iskustva u oblasti preventivne i restaurativne stomatologije. Posebno je posvećena radu sa pacijentima koji imaju strah od stomatoloških intervencija.",
        specialties: [
          "Preventivna stomatologija",
          "Estetske plombe",
          "Krunice i mostovi"
        ]
      },
      {
        name: "Dr Marko Jovanović",
        role: "Doktor stomatologije",
        bio: "Dr Marko Jovanović bavi se estetskom stomatologijom i savremenim tehnikama poboljšanja osmeha. Njegov cilj je prirodan i funkcionalan rezultat za svakog pacijenta.",
        specialties: [
          "Beljenje zuba",
          "Estetska stomatologija",
          "Smile design"
        ]
      },
      {
        name: "Ivana Nikolić",
        role: "Stomatološki asistent",
        bio: "Ivana pomaže u organizaciji rada ordinacije i asistira tokom stomatoloških intervencija, obezbeđujući da svaki tretman protekne efikasno i prijatno za pacijente.",
        specialties: [
          "Asistencija u terapiji",
          "Priprema pacijenata",
          "Sterilizacija instrumenata"
        ]
      },
      {
        name: "Milan Stanković",
        role: "Koordinator pacijenata",
        bio: "Milan je zadužen za komunikaciju sa pacijentima, zakazivanje termina i informisanje o planu terapije kako bi svaki pacijent imao jasno i jednostavno iskustvo.",
        specialties: [
          "Zakazivanje termina",
          "Informacije o terapiji",
          "Podrška pacijentima"
        ]
      }
    ],
  }
};

export function getSiteData(locale: Locale): SiteData {
  return translations[locale];
}
