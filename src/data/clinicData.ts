export type TreatmentCategory = 'all' | 'laser-hair' | 'injectables' | 'skin-rejuvenation' | 'body-contouring' | 'skincare';

export interface TreatmentItem {
  id: string;
  title: string;
  category: Exclude<TreatmentCategory, 'all'>;
  categoryLabel: string;
  subtitle: string;
  singlePrice: number;
  packagePrice: number;
  packageSessions: number;
  pointsEarned: number;
  durationMinutes: number;
  downtime: string;
  wavelengthOrTech: string;
  fitzpatrickSafe: string;
  clinicalSummary: string;
  protocolSteps: string[];
  targetZones: string[];
  artworkType: 'laser-hair' | 'botox-injectable' | 'clear-brilliant' | 'coolsculpting' | 'thermage' | 'skincare-serum';
  tagText?: string;
}

export interface ClinicLocation {
  id: string;
  name: string;
  cityState: string;
  address: string;
  nextAvailableLabel: string;
  medicalDirector: string;
}

export interface NurseSpecialist {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  clinicId: string;
  yearsExperience: number;
}

export interface RewardPerk {
  id: string;
  title: string;
  pointsCost: number;
  dollarValue: number;
  description: string;
  category: 'credit' | 'upgrade' | 'skincare';
}

export interface PatientAppointment {
  id: string;
  treatmentId: string;
  treatmentTitle: string;
  clinicName: string;
  nurseName: string;
  date: string;
  timeSlot: string;
  visitType: 'In-Clinic Treatment' | 'Virtual Nurse Consultation';
  status: 'Confirmed' | 'Completed';
  pointsAwarded: number;
  patientName: string;
  clinicalNotes?: string;
}

export const TREATMENTS: TreatmentItem[] = [
  {
    id: 'lhr-full-leg-brazilian',
    title: 'Precision Dual-Wavelength Laser Hair Removal',
    category: 'laser-hair',
    categoryLabel: 'Laser Hair Removal',
    subtitle: 'Cynosure Apogee+ & Elite iQ · 755nm Alexandrite / 1064nm Nd:YAG',
    singlePrice: 295,
    packagePrice: 1390,
    packageSessions: 6,
    pointsEarned: 1390,
    durationMinutes: 35,
    downtime: 'Zero downtime',
    wavelengthOrTech: '755nm Alexandrite & 1064nm Nd:YAG w/ Skintel Melanin Reader',
    fitzpatrickSafe: 'Fitzpatrick I–VI Verified',
    clinicalSummary:
      'Selective photothermolysis targets follicular melanin while continuous Zimmer cryo-air cooling preserves epidermal integrity across all skin tones.',
    protocolSteps: [
      'Real-time Skintel melanin optical reading to calibrate fluence (J/cm²)',
      'Cryo-chilled sapphire air flow at -20°C for epidermal comfort',
      'Post-laser botanical hydrocortisone & broad-spectrum SPF 50+ application',
    ],
    targetZones: ['Brazilian & Bikini', 'Full Legs', 'Underarms', 'Upper Lip & Chin', 'Full Back & Shoulders'],
    artworkType: 'laser-hair',
    tagText: 'Most Booked',
  },
  {
    id: 'injectable-botox-xeomin',
    title: 'Neuromodulator Precision Architecture (Botox / Xeomin)',
    category: 'injectables',
    categoryLabel: 'Injectables',
    subtitle: '40-Unit Custom Facial Balancing · Glabella, Frontalis & Orbicularis Oculi',
    singlePrice: 520,
    packagePrice: 1410,
    packageSessions: 3,
    pointsEarned: 1410,
    durationMinutes: 30,
    downtime: 'Minimal (24h post-care)',
    wavelengthOrTech: 'Purified Botulinum Toxin Type A · 32G Ultra-Fine Micro-Needle',
    fitzpatrickSafe: 'All Skin Types',
    clinicalSummary:
      'Anatomical micro-dosing softens hyperdynamic expression lines while preserving natural brow elevation and expressive symmetry.',
    protocolSteps: [
      'Dynamic facial muscle mapping at rest and full contraction',
      'Sub-millimeter intradermal & intramuscular micro-droplet placement',
      '14-day complimentary clinical symmetry follow-up assessment',
    ],
    targetZones: ['Glabellar 11s & Forehead', 'Crow’s Feet & Brow Lift', 'Masseter Jawline Slimming', 'Lip Flip & Platysmal Bands'],
    artworkType: 'botox-injectable',
    tagText: 'Premiere Eligible',
  },
  {
    id: 'skin-clear-brilliant',
    title: 'Clear + Brilliant® Perméa Fractional Laser Facial',
    category: 'skin-rejuvenation',
    categoryLabel: 'Skin Rejuvenation',
    subtitle: '1927nm Thulium Fractional Diode · Melasma, Pore Refinement & Radiance',
    singlePrice: 450,
    packagePrice: 1950,
    packageSessions: 5,
    pointsEarned: 1950,
    durationMinutes: 45,
    downtime: '12–24h mild erythema',
    wavelengthOrTech: '1927nm Perméa Handpiece + Intelligent Optical Tracking',
    fitzpatrickSafe: 'Fitzpatrick I–VI Safe',
    clinicalSummary:
      'Creates millions of microscopic thermal treatment zones in the upper dermis, increasing skin permeability 17-fold for antioxidant serum infusion.',
    protocolSteps: [
      'Topical BLT anesthetic numbing for 20 minutes prior to passes',
      'Dual-pass Intelligent Optical Tracking across cheeks, forehead, and perioral zone',
      'Immediate topical infusion of Vitamin C+E Ferulic & Biocellulose cooling mask',
    ],
    targetZones: ['Full Face & Periorbital', 'Neck & Décolletage', 'Dorsal Hands'],
    artworkType: 'clear-brilliant',
    tagText: 'Clinical Favorite',
  },
  {
    id: 'injectable-juvederm-galderma',
    title: 'Hyaluronic Structural Dermal Sculpting (Juvéderm / Restylane)',
    category: 'injectables',
    categoryLabel: 'Injectables',
    subtitle: '1.0mL Cross-Linked Hyaluronic Acid · Lip Couture, Zygomatic Cheek & Chin',
    singlePrice: 750,
    packagePrice: 1980,
    packageSessions: 3,
    pointsEarned: 1980,
    durationMinutes: 45,
    downtime: '24–48h subtle swelling',
    wavelengthOrTech: 'Vycross & XpresHAn Cross-Linked Hyaluronic Acid Gel',
    fitzpatrickSafe: 'All Skin Types',
    clinicalSummary:
      'Restores structural mid-face volume, refines vermilion border definition, and harmonizes profile proportions using blunt micro-cannula technique.',
    protocolSteps: [
      'Golden-ratio caliper proportion assessment & multi-angle clinical photography',
      'Atraumatic 25G micro-cannula placement with integrated lidocaine comfort',
      'Arnica montana cooling compress & structured post-sculpting guidance',
    ],
    targetZones: ['Lip Couture & Vermilion Border', 'Zygomatic Cheekbone Lift', 'Chin Projection & Jawline', 'Tear Trough Hollowing'],
    artworkType: 'botox-injectable',
  },
  {
    id: 'body-coolsculpting-elite',
    title: 'CoolSculpting® Elite Dual-Applicator Cryolipolysis',
    category: 'body-contouring',
    categoryLabel: 'Body Contouring',
    subtitle: 'Controlled Subcutaneous Adipose Cooling · 20–25% Fat Layer Reduction',
    singlePrice: 800,
    packagePrice: 2800,
    packageSessions: 4,
    pointsEarned: 2800,
    durationMinutes: 60,
    downtime: 'Zero surgical downtime',
    wavelengthOrTech: 'C-Shaped Dual Cryolipolysis Applicators (-11°C Regulated)',
    fitzpatrickSafe: 'All Skin Types',
    clinicalSummary:
      'Crystallizes stubborn subcutaneous fat cells without affecting overlying dermis; crystallized lipids are naturally metabolized over 8–12 weeks.',
    protocolSteps: [
      '360-degree anatomical template marking across target adipose pocket',
      'Gel pad barrier placement and 35-minute dual-applicator thermal extraction',
      '2-minute manual tissue reperfusion massage for enhanced clearance',
    ],
    targetZones: ['Lower Abdomen & Flanks', 'Submental Chin & Jawline', 'Inner & Outer Thighs', 'Distal Bra & Back Roll'],
    artworkType: 'coolsculpting',
  },
  {
    id: 'skincare-drenched-kit',
    title: 'LaserAway Beauty® Clinical Recovery & Peptide Regimen',
    category: 'skincare',
    categoryLabel: 'Clinical Skincare',
    subtitle: 'Wake Me Up Vitamin C + Drenched Peptide Hydration + BFF Mineral SPF 50+',
    singlePrice: 148,
    packagePrice: 380,
    packageSessions: 3,
    pointsEarned: 450,
    durationMinutes: 15,
    downtime: 'Daily At-Home Regimen',
    wavelengthOrTech: 'Dermatologist-Formulated Hexapeptide-8, 15% L-Ascorbic Acid & Zinc Oxide',
    fitzpatrickSafe: 'Non-Comedogenic · I–VI',
    clinicalSummary:
      'Medical-grade post-procedure formulation engineered to accelerate barrier repair, lock in hyaluronic moisture, and prevent UV-induced hyperpigmentation.',
    protocolSteps: [
      'AM Step 1: 4 drops Wake Me Up L-Ascorbic Acid Antioxidant Serum',
      'AM/PM Step 2: Drenched Ultra-Lightweight Ceramide & Peptide Moisturizer',
      'AM Step 3: BFF Tinted Broad-Spectrum Mineral SPF 50+ PA++++',
    ],
    targetZones: ['Daily Post-Laser Barrier Care', 'Melasma Prevention', 'Microbiome Support'],
    artworkType: 'skincare-serum',
    tagText: 'In Stock',
  },
];

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    id: 'beverly-hills',
    name: 'Beverly Hills — Wilshire Flagship',
    cityState: 'Beverly Hills, CA',
    address: '8950 W Olympic Blvd, Suite 104',
    nextAvailableLabel: 'Today · 2:30 PM',
    medicalDirector: 'Dr. Roy Winston, MD · Board-Certified Dermatologist',
  },
  {
    id: 'soho-nyc',
    name: 'SoHo — Mercer Street Studio',
    cityState: 'New York, NY',
    address: '151 Mercer St, Ground Floor',
    nextAvailableLabel: 'Tomorrow · 10:00 AM',
    medicalDirector: 'Dr. Elena Vance, MD · FAAD Clinical Fellow',
  },
  {
    id: 'scottsdale-quarter',
    name: 'Scottsdale Quarter MedSpa',
    cityState: 'Scottsdale, AZ',
    address: '15279 N Scottsdale Rd, Suite 115',
    nextAvailableLabel: 'Tomorrow · 1:15 PM',
    medicalDirector: 'Dr. Marcus Sterling, MD · Aesthetic Dermatology',
  },
  {
    id: 'miami-brickell',
    name: 'Miami — Brickell City Centre',
    cityState: 'Miami, FL',
    address: '701 S Miami Ave, Level 2',
    nextAvailableLabel: 'Thu · 11:30 AM',
    medicalDirector: 'Dr. Sofia Mendoza, MD · Laser & Cosmetic Surgery',
  },
];

export const NURSE_SPECIALISTS: NurseSpecialist[] = [
  {
    id: 'rn-claire',
    name: 'Claire Beaumont, BSN, RN',
    credentials: 'Master Aesthetic Nurse Injector',
    specialty: 'Facial Balancing & Clear + Brilliant®',
    clinicId: 'beverly-hills',
    yearsExperience: 9,
  },
  {
    id: 'rn-sienna',
    name: 'Sienna Park, NP-C',
    credentials: 'Board-Certified Nurse Practitioner',
    specialty: 'Dual-Wavelength Laser & Fitzpatrick IV–VI Protocols',
    clinicId: 'beverly-hills',
    yearsExperience: 7,
  },
  {
    id: 'rn-julian',
    name: 'Julian Vance, BSN, RN',
    credentials: 'Senior Laser & Cryolipolysis Specialist',
    specialty: 'CoolSculpting® Elite & Neuromodulators',
    clinicId: 'soho-nyc',
    yearsExperience: 8,
  },
  {
    id: 'rn-maya',
    name: 'Maya Lin, MSN, APRN',
    credentials: 'Lead Clinical Aesthetic Specialist',
    specialty: 'Structural Lip Couture & Fractional Resurfacing',
    clinicId: 'scottsdale-quarter',
    yearsExperience: 11,
  },
];

export const REWARD_PERKS: RewardPerk[] = [
  {
    id: 'perk-50-credit',
    title: '$50 Instant Injectable or Laser Credit',
    pointsCost: 2500,
    dollarValue: 50,
    description: 'Applies directly toward any Botox®, dermal filler, or single-session laser package in your bag.',
    category: 'credit',
  },
  {
    id: 'perk-hydrojelly-upgrade',
    title: 'Complimentary Post-Laser Cooling Peptide Mask ($95 Value)',
    pointsCost: 4000,
    dollarValue: 95,
    description: 'Adds a medical-grade electrolyte biocellulose recovery infusion to your next in-clinic session.',
    category: 'upgrade',
  },
  {
    id: 'perk-150-vip-voucher',
    title: '$150 LA Premiere Package Voucher',
    pointsCost: 6500,
    dollarValue: 150,
    description: 'High-value clinical voucher valid on any multi-session Laser Hair Removal or Clear + Brilliant® bundle.',
    category: 'credit',
  },
  {
    id: 'perk-full-size-serum',
    title: 'Full-Size Wake Me Up Vitamin C Serum ($148 Value)',
    pointsCost: 7000,
    dollarValue: 148,
    description: 'Redeemable for immediate shipment or pickup at your next scheduled clinic appointment.',
    category: 'skincare',
  },
];

export const INITIAL_APPOINTMENTS: PatientAppointment[] = [
  {
    id: 'apt-1001',
    treatmentId: 'skin-clear-brilliant',
    treatmentTitle: 'Clear + Brilliant® Perméa Fractional Laser Facial',
    clinicName: 'Beverly Hills — Wilshire Flagship',
    nurseName: 'Claire Beaumont, BSN, RN',
    date: '2026-11-04',
    timeSlot: '11:00 AM',
    visitType: 'In-Clinic Treatment',
    status: 'Confirmed',
    pointsAwarded: 450,
    patientName: 'Donna Rivas',
    clinicalNotes: 'Session 2 of 5 · Pre-treatment: pause retinoids 5 days prior.',
  },
  {
    id: 'apt-0984',
    treatmentId: 'lhr-full-leg-brazilian',
    treatmentTitle: 'Precision Dual-Wavelength Laser Hair Removal',
    clinicName: 'Beverly Hills — Wilshire Flagship',
    nurseName: 'Sienna Park, NP-C',
    date: '2026-09-18',
    timeSlot: '2:30 PM',
    visitType: 'In-Clinic Treatment',
    status: 'Completed',
    pointsAwarded: 1390,
    patientName: 'Donna Rivas',
    clinicalNotes: '1064nm Nd:YAG · 18 J/cm² · 15mm spot size · Zero adverse reaction.',
  },
];
