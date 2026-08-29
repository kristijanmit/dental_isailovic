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
      clinicName: "Dr Isailović Dental Clinic",
      phoneRaw: "+381656603871",
      phoneDisplay: "065 660 3871",
      address: "Pop Lukina 17a, Šabac",
      openingHours: [
        "Tuesday – Friday: 12:00 – 20:00",
        "Saturday: 13:00 – 21:00",
        "Monday: Closed",
        "Weekend on-call (Sat – Sun): 09:00 – 23:00, by phone"
      ],
      whatsappNumber: "381656603871",
      googleMapsUrl: "https://www.google.com/maps?q=Pop+Lukina+17a,+%C5%A0abac&output=embed",
      socials: {}
    },

    seo: {
      title: "Dr Isailović | Dental practice in Šabac",
      titleTemplate: "%s | Dr Isailović Dental Clinic",
      description: "Dental practice of Dr Nemanja Isailović in Šabac. Personalized dental care with weekend on-call availability. Schedule your appointment quickly and easily.",
      ogImage: "/images/nemanja.jpg"
    },

    nav: [
      { label: "Home", href: "#home" },
      { label: "Services", href: "#services" },
      { label: "Gallery", href: "#gallery" },
      { label: "About the Doctor", href: "#team" },
      { label: "Contact", href: "#contact" }
    ],

    topBarCtaLabel: "Schedule appointment",

    hero: {
      headline: "Your smile, our care.",
      subheadline: "Dr Nemanja Isailović's dental practice in Šabac, dedicated to the health and aesthetics of your teeth.",
      supportingText: "We provide complete dental care – from routine checkups and professional cleaning to aesthetic treatments and restorative dentistry. Every patient gets the doctor's personal, direct attention.",
      requestCtaLabel: "Free consultation",
      callCtaLabel: "Call us",
      ctaReassurance: "Free consultation • Appointment this week • No obligation",
      trustBadges: [
        "Weekend on-call availability",
        "Direct communication with your dentist",
        "Modern dental equipment"
      ],

      image: {
        src: "/images/gallery2.jpg",
        alt: "Modern dental treatment room"
      }
    },

    highlights: {
      title: "Why patients choose this practice",
      items: [
        {
          title: "Modern technology",
          description: "We use digital diagnostics and modern dental equipment for precise and safe treatments.",
          icon: "sparkles"
        },
        {
          title: "A dentist you can trust",
          description: "Dr Isailović personally handles your case from the first visit through follow-up care.",
          icon: "shield"
        },
        {
          title: "Individual approach",
          description: "Every patient receives a treatment plan tailored to their needs and goals.",
          icon: "heart"
        },
        {
          title: "Weekend on-call service",
          description: "For urgent cases, we're available Saturday and Sunday, 09:00–23:00, by phone.",
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
        image: { src: "/images/gallery2.jpg", alt: "Dental treatment room for checkups" }
      },
      {
        id: "cosmetic-dentistry",
        title: "Cosmetic dentistry",
        short: "Teeth whitening, aesthetic fillings, and smile correction.",
        long: "Cosmetic treatments help your smile look natural, healthy, and balanced. We use modern materials and techniques for long-lasting aesthetic results.",
        image: { src: "/images/gallery3.jpg", alt: "Modern dental equipment for aesthetic treatments" }
      },
      {
        id: "restorative",
        title: "Restorative dentistry",
        short: "Fillings, crowns, bridges, and implants.",
        long: "When teeth are damaged or missing, restorative treatments restore both function and aesthetics with durable and high-quality solutions.",
        image: { src: "/images/gallery6.jpg", alt: "Dental chair and equipment for restorative procedures" }
      },
      {
        id: "emergency",
        title: "Emergency dental care",
        short: "Fast help for pain, swelling, and dental injuries.",
        long: "In case of pain or urgent dental problems, we provide quick diagnostics and treatment to resolve the issue as soon as possible – including weekend on-call hours.",
        image: { src: "/images/gallery8.jpg", alt: "Dental clinic interior for emergency care" }
      }
    ],

    whyChooseUs: {
      title: "Why choose this practice",
      subtitle: "A new practice dedicated to high-quality dental care and personal attention for every patient.",

      bullets: [
        "Clearly explained treatment options and transparent pricing",
        "Modern diagnostics and high-quality dental materials",
        "A comfortable approach for patients with dental anxiety",
        "Detailed patient care even after treatment is completed"
      ],

      stats: [
        { label: "Working days", value: "Tue–Sat" },
        { label: "Weekend on-call", value: "Sat–Sun" },
        { label: "Patient approach", value: "Personal" }
      ]
    },

    reviewsSection: {
      title: "Patient experiences",
      subtitle: "The trust of our patients is the best confirmation of the quality of our work."
    },

    reviews: [],

    gallerySection: {
      title: "Clinic gallery",
      subtitle: "Take a look at our modern dental clinic."
    },

    gallery: [
      { src: "/images/nemanja-office.jpg", alt: "Dr Isailović with a young patient in the clinic" },
      { src: "/images/gallery2.jpg", alt: "Dental treatment room" },
      { src: "/images/gallery3.jpg", alt: "Modern dental equipment" },
      { src: "/images/gallery4.jpg", alt: "Consultation area" },
      { src: "/images/gallery5.jpg", alt: "Patient waiting area" },
      { src: "/images/gallery6.jpg", alt: "Dental chair and equipment" },
      { src: "/images/gallery7.jpg", alt: "Instrument sterilization area" },
      { src: "/images/gallery8.jpg", alt: "Interior of the dental clinic" }
    ],

    teamSection: {
      title: "Meet Dr Isailović",
      subtitle: "A dentist who's personally involved in every step of your care."
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
      subtitle: "Book a time online, or send us your details and we will respond quickly.",

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
      aboutTitle: "Dr Isailović Dental Clinic",

      aboutText: "Dr Nemanja Isailović's dental practice in Šabac, dedicated to the health, function, and aesthetics of your teeth.",

      quickLinksTitle: "Quick links",

      legalTitle: "Legal",

      legalLinks: [
        { label: "Privacy policy", href: "#" },
        { label: "Terms of use", href: "#" },
        { label: "Website accessibility", href: "#" }
      ],

      copyright: "© 2026 Dr Isailović Dental Clinic. All rights reserved."
    },

    team: [
      {
        name: "Dr Nemanja Isailović",
        role: "Dentist",
        bio: "Dr Nemanja Isailović runs his own dental practice in Šabac, providing complete dental care from routine checkups to restorative and cosmetic treatments. He's personally involved in every patient's treatment from the first visit through follow-up care – and available for urgent cases on weekends.",
        specialties: [
          "General dentistry",
          "Cosmetic dentistry",
          "Restorative dentistry",
          "Emergency care"
        ],
        image: {
          src: "/images/nemanja.jpg",
          alt: "Dr Nemanja Isailović in his dental clinic"
        }
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
      clinicName: "Dr Isailović",
      phoneRaw: "+381656603871",
      phoneDisplay: "065 660 3871",
      address: "Pop Lukina 17a, Šabac",
      openingHours: [
        "Utorak – Petak: 12:00 – 20:00",
        "Subota: 13:00 – 21:00",
        "Ponedeljak: Ne radimo",
        "Vikend dežurstvo (Subota – Nedelja): 09:00 – 23:00, po pozivu"
      ],
      whatsappNumber: "381656603871",
      googleMapsUrl: "https://www.google.com/maps?q=Pop+Lukina+17a,+%C5%A0abac&output=embed",
      socials: {}
    },

    seo: {
      title: "Dr Isailović | Stomatološka ordinacija Šabac",
      titleTemplate: "%s | Dr Isailović",
      description: "Stomatološka ordinacija dr Nemanje Isailovića u Šapcu. Lična posvećenost pacijentu i dežurstvo vikendom. Zakažite termin brzo i jednostavno.",
      ogImage: "/images/nemanja.jpg"
    },

    nav: [
      { label: "Početna", href: "#home" },
      { label: "Usluge", href: "#services" },
      { label: "Galerija", href: "#gallery" },
      { label: "O doktoru", href: "#team" },
      { label: "Kontakt", href: "#contact" }
    ],

    topBarCtaLabel: "Zakažite pregled",

    hero: {
      headline: "Vaš osmeh, naša briga.",
      subheadline: "Stomatološka ordinacija dr Nemanje Isailovića u Šapcu, posvećena zdravlju i estetici vaših zuba.",
      supportingText: "Pružamo kompletnu stomatološku negu – od redovnih pregleda i čišćenja kamenca do estetskih i restaurativnih zahvata. Svakom pacijentu posvećujemo ličnu pažnju doktora.",
      requestCtaLabel: "Besplatna konsultacija",
      callCtaLabel: "Pozovite nas",
      ctaReassurance: "Besplatna konsultacija • Pregled u istoj nedelji • Bez obaveze",
      trustBadges: [
        "Dežurstvo vikendom",
        "Direktna komunikacija sa doktorom",
        "Savremena stomatološka oprema"
      ],

      image: {
        src: "/images/gallery2.jpg",
        alt: "Savremena stomatološka ordinacija"
      }
    },

    highlights: {
      title: "Zašto pacijenti biraju ovu ordinaciju",
      items: [
        {
          title: "Savremena tehnologija",
          description: "Koristimo digitalnu dijagnostiku i modernu stomatološku opremu za precizne i bezbedne tretmane.",
          icon: "sparkles"
        },
        {
          title: "Doktor kome možete verovati",
          description: "Dr Isailović lično vodi vaš slučaj od prvog pregleda do kontrole nakon terapije.",
          icon: "shield"
        },
        {
          title: "Individualni pristup",
          description: "Svaki pacijent dobija plan terapije prilagođen njegovim potrebama i željama.",
          icon: "heart"
        },
        {
          title: "Dežurstvo vikendom",
          description: "Za hitne slučajeve dostupni smo subotom i nedeljom od 09:00 do 23:00, po pozivu.",
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
        long: "U slučaju bola ili hitnog problema sa zubima, pružamo brzu dijagnostiku i terapiju kako bi se problem rešio što pre – uključujući dežurstvo vikendom.",
        image: { src: "/images/gallery8.jpg", alt: "Unutrašnjost stomatološke ordinacije za hitnu pomoć" }
      }
    ],

    whyChooseUs: {
      title: "Zašto izabrati ovu ordinaciju",
      subtitle: "Nova ordinacija posvećena kvalitetnoj stomatološkoj nezi i ličnoj pažnji prema svakom pacijentu.",

      bullets: [
        "Jasno objašnjene opcije lečenja i transparentne cene",
        "Savremena dijagnostika i kvalitetni stomatološki materijali",
        "Prijatan pristup pacijentima koji imaju strah od stomatologa",
        "Detaljna briga o pacijentima i nakon završenog tretmana"
      ],

      stats: [
        { label: "Radni dani", value: "Ut–Sub" },
        { label: "Dežurstvo vikendom", value: "Sub–Ned" },
        { label: "Pristup pacijentu", value: "Ličan" }
      ]
    },

    reviewsSection: {
      title: "Iskustva naših pacijenata",
      subtitle: "Poverenje pacijenata je najbolja potvrda kvaliteta našeg rada."
    },

    reviews: [],

    gallerySection: {
      title: "Galerija ordinacije",
      subtitle: "Pogledajte kako izgleda naša moderna stomatološka ordinacija."
    },

    gallery: [
      { src: "/images/nemanja-office.jpg", alt: "Dr Isailović sa malim pacijentom u ordinaciji" },
      { src: "/images/gallery2.jpg", alt: "Stomatološka ordinacija" },
      { src: "/images/gallery3.jpg", alt: "Savremena stomatološka oprema" },
      { src: "/images/gallery4.jpg", alt: "Prostor za konsultacije" },
      { src: "/images/gallery5.jpg", alt: "Čekaonica za pacijente" },
      { src: "/images/gallery6.jpg", alt: "Stomatološka stolica i oprema" },
      { src: "/images/gallery7.jpg", alt: "Prostor za sterilizaciju instrumenata" },
      { src: "/images/gallery8.jpg", alt: "Unutrašnjost stomatološke ordinacije" }
    ],

    teamSection: {
      title: "Upoznajte dr Isailovića",
      subtitle: "Doktor koji je lično uključen u svaki korak vaše nege."
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
      subtitle: "Zakažite termin onlajn, ili nam pošaljite upit i brzo ćemo vam odgovoriti.",

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
      aboutTitle: "Dr Isailović",

      aboutText: "Stomatološka ordinacija dr Nemanje Isailovića u Šapcu, posvećena zdravlju, funkciji i estetici vaših zuba.",

      quickLinksTitle: "Brzi linkovi",

      legalTitle: "Pravno",

      legalLinks: [
        { label: "Politika privatnosti", href: "#" },
        { label: "Uslovi korišćenja", href: "#" },
        { label: "Pristupačnost sajta", href: "#" }
      ],

      copyright: "© 2026 Dr Isailović. Sva prava zadržana."
    },
    team: [
      {
        name: "Dr Nemanja Isailović",
        role: "Stomatolog",
        bio: "Dr Nemanja Isailović vodi sopstvenu stomatološku ordinaciju u Šapcu i pruža kompletnu stomatološku negu – od redovnih pregleda do restaurativnih i estetskih zahvata. Lično je uključen u terapiju svakog pacijenta od prvog pregleda do kontrole, a za hitne slučajeve dostupan je i vikendom.",
        specialties: [
          "Opšta stomatologija",
          "Estetska stomatologija",
          "Restaurativna stomatologija",
          "Hitna pomoć"
        ],
        image: {
          src: "/images/nemanja.jpg",
          alt: "Dr Nemanja Isailović u svojoj ordinaciji"
        }
      }
    ]
  }
};

export function getSiteData(locale: Locale): SiteData {
  return translations[locale];
}
