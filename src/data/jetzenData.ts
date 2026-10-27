export type AircraftCategory = 'light' | 'super-midsize' | 'heavy' | 'ultra-long-range';

export interface AircraftSpec {
  id: string;
  model: string;
  category: AircraftCategory;
  categoryLabel: string;
  maxPax: number;
  maxRangeNm: number;
  cruiseKnots: number;
  hourlyRateUsd: number;
  cabinHeightFt: number;
  baggageCuFt: number;
  amenities: string[];
  part135Safety: string;
  description: string;
}

export interface CharterRoute {
  id: string;
  originCode: string;
  originCity: string;
  originFbo: string;
  destCode: string;
  destCity: string;
  destFbo: string;
  distanceNm: number;
  typicalDemandNote: string;
}

export interface CrmCharterDeal {
  id: string;
  clientCode: string;
  clientType: 'UHNW Principal' | 'Corporate Roadshow' | 'Family Office' | 'Entertainment Tour';
  routeSummary: string;
  distanceNm: number;
  paxCount: number;
  preferredAircraft: string;
  departureDate: string;
  wholesaleCost: number;
  quotedRetailPrice: number;
  brokerMarginPct: number;
  stage: 'ML Sourcing' | 'Quote Dispatched' | 'Contract & Compliance' | 'Flight Confirmed';
  mlMatchScore: string;
  mlAutoTasksCompleted: string[];
  confidentialityTier: 'NDA Strict · Tail Masked' | 'Corporate Standard';
}

export interface JobQualificationItem {
  id: string;
  title: string;
  category: 'qualification' | 'duty';
  summary: string;
  donnaEvidence: string;
  substantiatingAuthor: string;
  crmIntegrationNote: string;
}

export type LorFilterCategory =
  | 'all'
  | 'sales-consultancy'
  | 'discretion-global'
  | 'finance-strategy'
  | 'outreach-execution';

export interface RecommendationLetter {
  id: string;
  authorName: string;
  authorTitle: string;
  institution: string;
  date: string;
  contactInfo: string;
  fileName: string;
  pdfUrl: string;
  previewImageUrl: string;
  filterCategory: Exclude<LorFilterCategory, 'all'>;
  categoryLabel: string;
  headlineQuote: string;
  jetzenQualificationsProved: string[];
  fullTranscriptParagraphs: string[];
}

export interface ResumeEntry {
  id: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  location: string;
  period: string;
  periodLines?: string[];
  highlightTag: string;
  bullets: string[];
  jetzenRelevance: string;
  externalLink?: {
    label: string;
    url: string;
  };
}

export const RECOMMENDATION_LETTERS: RecommendationLetter[] = [
  {
    id: 'lor-carey-danis',
    authorName: 'James J. Rosemergy',
    authorTitle: 'Partner / Attorney at Law',
    institution: 'Carey & Danis LLC',
    date: 'August 12, 2026',
    contactInfo: '(314) 725-7700 · (800) 721-2519 · St. Louis, MO',
    fileName: 'Carey_Danis_LLC_LOR_August_12_2026.pdf',
    pdfUrl: '/assets/aistudio/Carey___Danis_LLC_LOR__2026___1__b3aedf68.pdf',
    previewImageUrl: '/assets/aistudio/Carey___Danis_LLC_LOR__2026___1__b3aedf68.png',
    filterCategory: 'outreach-execution',
    categoryLabel: 'Outbound Expansion, CRM Logging & Compliance',
    headlineQuote:
      'We particularly appreciated that Donna showed initiative and creativity in expanding the reach of our program beyond obvious channels. Donna was one of the strongest coordinators we worked with.',
    jetzenQualificationsProved: [
      'Sales and Business Development (Channel Expansion)',
      'CRM Utilization & Regular Activity Logs',
      'Compliance, Confidentiality & Documentation',
    ],
    fullTranscriptParagraphs: [
      'August 12, 2026 — Re: Donna Aseret Rivas — To whom it may concern,',
      'I am writing to recommend Donna Aseret Rivas, who worked with Carey & Danis, LLC as an intake and community outreach coordinator with respect to our social media addiction litigation campaign. It is a pleasure to provide this letter on her behalf.',
      'Throughout her time with our firm, Donna was diligent and reliable. She consistently kept us informed of her progress, sent us regular activity logs, and followed through on every assignment she took on. Her communication was clear and professional at all times.',
      'We particularly appreciated that Donna showed initiative and creativity in expanding the reach of our program beyond obvious channels. Donna was one of the strongest coordinators we worked with, and her efforts reflected real care and professionalism.',
      'I recommend Donna without reservation and am confident she will bring the same diligence, initiative, and professionalism to any future opportunity. Please feel free to contact our office if further information would be helpful.',
      'Very truly yours, James J. Rosemergy — Carey & Danis LLC, Attorneys at Law',
    ],
  },
  {
    id: 'lor-georgetown-corso',
    authorName: 'John A. Corso, D.P.A.',
    authorTitle: 'Faculty Member, School of Continuing Studies',
    institution: 'Georgetown University',
    date: 'March 16, 2026',
    contactInfo: 'John.Corso@georgetown.edu · (301) 529-9446 · Washington, DC',
    fileName: 'John_A_Corso_Georgetown_LOR_March_16_2026.pdf',
    pdfUrl: '/assets/aistudio/Letter_of_Recommendation_-_Rivas_75580758.pdf',
    previewImageUrl: '/assets/aistudio/Letter_of_Recommendation_-_Rivas_75580758.png',
    filterCategory: 'sales-consultancy',
    categoryLabel: 'Sales Consultancy & Executive Strategy',
    headlineQuote:
      'It is with great pleasure that I endorse Ms. Donna Rivas for a sales consultant position... especially showing persuasive analytical and communication skills in presenting her portion of the American Express capstone project.',
    jetzenQualificationsProved: [
      'Customized Solution Selling',
      'High-Level Communication Skills',
      'Client Relationship Management (AmEx Capstone)',
    ],
    fullTranscriptParagraphs: [
      'March 16, 2026 — To Whom it May Concern,',
      'It is with great pleasure that I endorse Ms. Donna Rivas for a sales consultant position.',
      'Donna is my former strategic management student at Georgetown University’s School of Continuing Studies in Washington, DC. She was my student in the Professional Certificate in Strategic Management program at Georgetown, especially showing persuasive analytical and communication skills in presenting her portion of the American Express capstone project. Her insight and thoughtful classroom contributions were consistently edifying to the class as a whole and enriching to the general program at the school. Donna is a person of character and intellect with a high sense of personal responsibility. I have no doubt she will prove to be an asset to any position to which she accedes.',
      'If I can assist you or Ms. Rivas at any time, please don’t hesitate to reach out to me.',
      'Very Truly Yours, John A. Corso, DPA — Georgetown University School of Continuing Studies',
    ],
  },
  {
    id: 'lor-harvard-taieb',
    authorName: 'Anne Taieb',
    authorTitle: 'Senior Lecturer',
    institution: 'Harvard Extension School',
    date: 'March 5, 2026',
    contactInfo: 'ataieb@g.harvard.edu · Cambridge, MA',
    fileName: 'Anne_Taieb_Harvard_LOR_March_5_2026.pdf',
    pdfUrl: '/assets/aistudio/Anne_Taieb_-_Letter_of_Recommendation___2025____34d74f2f.pdf',
    previewImageUrl: '/assets/aistudio/Anne_Taieb_-_Letter_of_Recommendation___2025____34d74f2f.png',
    filterCategory: 'discretion-global',
    categoryLabel: 'Client Discretion & Global Aviation Readiness',
    headlineQuote:
      'She is self-assured and attentive — traits that are especially valuable in the business and marketing industry sector, where client interaction, discretion, and professionalism are essential.',
    jetzenQualificationsProved: [
      'Confidentiality and Discretion',
      'High-Level Communication Skills',
      'International & Cross-Cultural Client Consultation',
    ],
    fullTranscriptParagraphs: [
      'March 5, 2026 — To Whom It May Concern,',
      'I am pleased to recommend Donna Rivas, whom I had the opportunity to teach in Elementary French E1b during the Spring 2025 at Harvard Extension School. From the very beginning of the course, she distinguished herself as a motivated, engaged, and reliable student—qualities that I believe will make her an excellent addition to your team.',
      'In my class, she consistently demonstrated a strong work ethic and a genuine enthusiasm for learning. She approached each assignment thoughtfully, actively participated in discussions, and regularly sought feedback to improve her skills. Her ability to communicate clearly, collaborate effectively with classmates, and maintain a positive and professional attitude was evident throughout the semester.',
      'What sets her apart is her dedication to personal growth and her natural interpersonal skills. She is self-assured and attentive - traits that are especially valuable in the business and marketing industry sector, where client interaction, discretion, and professionalism are essential. She is also culturally curious and open-minded, showing a real interest in languages and international contexts, which I believe will serve her well in a global-facing role.',
      'I am confident that Donna Rivas will bring enthusiasm and a strong sense of responsibility to any professional setting. She contributed positively to our classroom environment, and I have no doubt that she will bring the same energy and commitment to her work with your company.',
      'Sincerely, Anne Taieb — Senior Lecturer, Harvard Extension School',
    ],
  },
  {
    id: 'lor-georgetown-steinberg',
    authorName: 'Garv Steinberg',
    authorTitle: 'Adjunct Professor, Strategic Management',
    institution: 'Georgetown University',
    date: '2026',
    contactInfo: 'gas34@georgetown.edu · School of Continuing Studies',
    fileName: 'Garv_Steinberg_Georgetown_LOR_2026.pdf',
    pdfUrl: '/assets/aistudio/Letter_of_Recommendation_c12d9768.pdf',
    previewImageUrl: '/assets/aistudio/Letter_of_Recommendation_c12d9768.png',
    filterCategory: 'finance-strategy',
    categoryLabel: 'Financial Acumen & Business Intelligence',
    headlineQuote:
      'Her class exercises also demonstrated her ability to leverage her background in finance and strategic planning to provide disciplined, data-driven support to a forward-thinking leadership team.',
    jetzenQualificationsProved: [
      'Financial Acumen & Cost-Benefit Analysis',
      'Market Research & Actionable Business Intelligence',
      'Evaluating Complex Corporate Structures',
    ],
    fullTranscriptParagraphs: [
      'To Whom it may concern,',
      'Donna Rivas excelled as a member of our Georgetown University, School of Continuing Studies, Certificate Program in Strategic Management. Ms. Rivas demonstrated an outstanding understanding of business management and strategic management concepts and approaches. She also demonstrated excellent analytical and communications skills and the ability to work in a team environment during group exercises.',
      'As she progressed through the program, she cultivated a professional philosophy centered on analytical precision and strategic foresight. Her academic tenure, highlighted by intensive research in Strategic Management, has equipped her with the frameworks necessary to evaluate complex corporate structures and drive operational excellence. During our program, Ms. Rivas’ in-depth case study evaluations of industry leaders underscored her ability to synthesize high-level data into actionable business intelligence. Her class exercises also demonstrated her ability to leverage her background in finance and strategic planning to provide disciplined, data-driven support to a forward-thinking leadership team.',
      'Based on her outstanding performance in our program, I would strongly recommend Ms. Rivas for a position in your organization.',
      'Garv Steinberg — Adjunct Professor, Georgetown University (gas34@georgetown.edu)',
    ],
  },
  {
    id: 'lor-cpp-good',
    authorName: 'Dr. Megan C. Good, PhD',
    authorTitle: 'Assistant Professor, Dept. of International Business & Marketing',
    institution: 'Cal Poly Pomona (Singelyn Graduate School of Business)',
    date: 'March 22, 2024',
    contactInfo: 'mcgood@cpp.edu · (909) 869-2400 · Pomona, CA',
    fileName: 'Megan_C_Good_Cal_Poly_Pomona_LOR_March_22_2024.pdf',
    pdfUrl: '/assets/aistudio/Megan_C._Good_Letter_of_Recommendation__1__39a0b795.pdf',
    previewImageUrl: '/assets/aistudio/Megan_C._Good_Letter_of_Recommendation__1__39a0b795.png',
    filterCategory: 'sales-consultancy',
    categoryLabel: 'Professional Selling & Tenacity Under Pressure',
    headlineQuote:
      'Donna completed my Professional Selling course, which provided her a thorough introduction to various strategic revenue generating tactics... I was impressed with her tenacity and ability to perform and communicate under pressure.',
    jetzenQualificationsProved: [
      'Strategic Revenue-Generating Sales Tactics',
      'Unsupervised Problem-Solving (100% Remote Readiness)',
      'Performing & Communicating Under High Pressure',
    ],
    fullTranscriptParagraphs: [
      'Date: March 22, 2024 — From: Dr. Megan C. Good — Subject: Letter of Recommendation – Donna Rivas',
      'This letter will serve as a recommendation for Donna Rivas. I have known Donna since 2022 while she pursued a Bachelor of Science in Business Administration (BSBA) degree at Cal Poly Pomona, with a major focus in Marketing Management.',
      'Donna completed my Professional Selling course, which provided her a thorough introduction to various strategic revenue generating tactics that apply to her interests in business management and sales. I worked closely with her while I supervised a rigorous real-world project and was impressed with her tenacity and ability to perform and communicate under pressure.',
      'Donna’s class performance reflected a mature individual who was committed to learning and maximizing her classroom experience. While interacting with others, she was always prepared to discuss and share her ideas with those around her. These excellent communication skills not only indicated her strengths in effectively collaborating with others, but also reflected her strengths in her preparation (which I found to be excellent). Importantly, her peers were receptive to Donna’s insights, and it is clear that they respected both her perspectives and her professional methods of delivery in and out of the classroom.',
      'Moreover, many of the assignments and exams required extensive critical thinking and the ability to project outcomes that individuals and/or organizations would experience based on decisions made in the framework of professional business-to-business sales. As a result, skills such as strategic critical thinking and unsupervised problem-solving were premium tools honed within this dynamic environment. Donna performed very well in these areas and will be a great fit for the Sales Consultancy position with your organization, to which she applied.',
      'In conclusion, I have confidence she is a trustworthy person of the highest integrity and I highly recommend Donna Rivas.',
      'Megan C. Good, PhD — Assistant Professor, California State Polytechnic University, Pomona',
    ],
  },
  {
    id: 'lor-cpp-sarmas',
    authorName: 'Dr. Paul Sarmas, Ph.D.',
    authorTitle: 'Professor of Finance, Finance, Real Estate and Law',
    institution: 'Cal Poly Pomona (College of Business Administration)',
    date: 'May 11, 2023',
    contactInfo: 'psarmas@cpp.edu · (909) 869-2405 · Pomona, CA',
    fileName: 'Paul_Sarmas_Cal_Poly_Pomona_LOR_May_11_2023.pdf',
    pdfUrl: '/assets/aistudio/Paul_Sarmas_-_Letter_of_Recommendation___2023___0db8c2f3.pdf',
    previewImageUrl: '/assets/aistudio/Paul_Sarmas_-_Letter_of_Recommendation___2023___0db8c2f3.png',
    filterCategory: 'finance-strategy',
    categoryLabel: 'Managerial Finance & Luxury Retail Sales',
    headlineQuote:
      'Donna’s sales experience as a Fine Jewelry Sales Professional at JCPenney, alongside her roles at Chevrolet is evidence of her dedication and work ethic... she continuously seeks to explore the use of financial tools in marketing management.',
    jetzenQualificationsProved: [
      'Luxury & High-Ticket Sales Track Record (Fine Jewelry & Automotive)',
      'Managerial Finance (FRL 3000) & Pricing Acumen',
      'Project Ownership & High Initiative',
    ],
    fullTranscriptParagraphs: [
      'May 11, 2023 — Dear General Manager:',
      'Miss Donna Rivas has been my student and advisee for about a year. Miss Rivas’s performance in the managerial Finance (FRL 3000) course has been good. I find her to be a good student with strong abilities and academic aptitude. She has the initiative and motivation that exceeds most requirements.',
      'Miss Rivas is often a leader in class discussions, and her comments are insightful and well-thought-out. Donna has shown great enthusiasm and willingness to learn new concepts in the field of finance. Even though her primary academic focus is marketing, she continuously seeks to explore the use of financial tools in marketing management.',
      'Miss Rivas has proved to be diligent, conscientious, and very personable. Donna’s sales experience as a Fine Jewelry Sales Professional at JCPenney, alongside her roles at Chevrolet is evidence of her dedication and work ethic. Donna’s ability to manage projects, handle responsibility, and dedicate time and energy to the assignments at hand distinguishes her from other young candidates. She will add diversity and will be a valuable asset to your operation.',
      'Taking into consideration her dedication, determination, and motivation, I have no reservations concerning her success in the field of marketing and sales. I believe that Miss Donna Rivas will be a successful member of your team.',
      'Respectfully, Paul Sarmas, Ph.D. — Professor of Finance, California State Polytechnic University, Pomona',
    ],
  },
  {
    id: 'lor-best-friends-melville',
    authorName: 'KylieRose Melville',
    authorTitle: 'Senior Manager, Lifesaving Programs',
    institution: 'Best Friends Animal Society — Los Angeles',
    date: 'April 4, 2022',
    contactInfo: 'kylierosem@bestfriends.org · (818) 643-3989 ext. 114 · Los Angeles, CA',
    fileName: 'KylieRose_Melville_Best_Friends_LOR_April_4_2022.pdf',
    pdfUrl: '/assets/aistudio/KylieRose_Melville_-_Letter_of_Recommendation___2022___114b4c04.pdf',
    previewImageUrl: '/assets/aistudio/KylieRose_Melville_-_Letter_of_Recommendation___2022___114b4c04.png',
    filterCategory: 'outreach-execution',
    categoryLabel: 'High-Stakes Frontline Poise & Rapid Systems Mastery',
    headlineQuote:
      'Donna proved to be a quick study and picked up our policies and procedures with ease. Over the past year she has helped us provide exceptional customer service to all members of the public.',
    jetzenQualificationsProved: [
      'Problem-Solving in High-Emotion, Fast-Changing Environments',
      'Rapid Mastery of Complex Operational Policies & Systems',
      'Exceptional Frontline Client Service & Patience',
    ],
    fullTranscriptParagraphs: [
      'April 4, 2022 — To whom it may concern: It is my pleasure to recommend Donna Rivas to you.',
      'I am KylieRose Melville, Senior Manager of Lifesaving Programs with Best Friends Animal Society – Los Angeles. I have ten years of experience in animal welfare and have worked with a large number of volunteers during that time. Donna is one who stands out for her hard work and dedication.',
      'As a volunteer with Best Friends, Donna has taken on the challenging role of serving as a receptionist for us, starting during the global pandemic. This position is one that presented a challenge on many levels and Donna rose to the occasion easily.',
      'Animal welfare is an industry where emotions are often running high and our receptionists are at the frontlines of it. Compassion and patience are integral to the work we do as an organization and Donna has exemplified that even in the face of all of the challenges that the changing landscape of the pandemic presented. Donna proved to be a quick study and picked up our policies and procedures with ease. Over the past year she has helped us provide exceptional customer service to all members of the public who reach out to us looking for help or information.',
      'Sincerely, KylieRose Melville — Senior Manager, Lifesaving Programs, Best Friends Animal Society – Los Angeles',
    ],
  },
];

export const DONNA_RESUME_ENTRIES: ResumeEntry[] = [
  {
    id: 'edu-pepperdine',
    type: 'education',
    title: 'Master of Legal Studies (M.L.S.)',
    organization: 'Pepperdine University — Caruso School of Law',
    location: 'Malibu, CA',
    period: '2026',
    highlightTag: 'Contract Law, Negotiation & Regulatory Compliance',
    bullets: [
      'Earned Master of Legal Studies (M.L.S.) at Pepperdine University, Rick J. Caruso School of Law, focusing on contract negotiation, regulatory compliance, and dispute resolution.',
      'Applied advanced legal frameworks to complex contract terms, risk allocation, confidentiality protocols, and statutory compliance.',
    ],
    jetzenRelevance:
      'Directly empowers high-stakes private jet charter contract negotiation, Part 135 operator agreement review, cabotage/regulatory compliance, and NDA protection for UHNW principals.',
    externalLink: {
      label: 'Pepperdine Caruso School of Law — Master of Legal Studies Program',
      url: 'https://online.law.pepperdine.edu/master-of-legal-studies/',
    },
  },
  {
    id: 'edu-georgetown',
    type: 'education',
    title: 'Professional Certificate in Strategic Management',
    organization: 'Georgetown University — School of Continuing Studies',
    location: 'Washington, DC',
    period: '2026',
    highlightTag: 'American Express Capstone',
    bullets: [
      'Selected for the American Express strategic management capstone presentation, commended by faculty for persuasive analytical and executive communication skills.',
      'Evaluated complex corporate structures, luxury service positioning, and executive decision frameworks.',
      'Synthesized high-level financial and market data into actionable business intelligence for executive stakeholders.',
    ],
    jetzenRelevance:
      'Equips Donna to advise corporate flight departments, family offices, and C-suite principals on charter cost-benefit analysis and fleet strategy.',
  },
  {
    id: 'edu-harvard',
    type: 'education',
    title: 'French Language & International Cultural Studies (Elementary French E1b)',
    organization: 'Harvard University Extension School',
    location: 'Cambridge, MA',
    period: '2025',
    highlightTag: 'Global Discretion Endorsed',
    bullets: [
      'Distinguished for self-assured interpersonal poise, client discretion, and international cultural fluency.',
      'Actively sought continuous performance feedback while collaborating across diverse global cohorts.',
    ],
    jetzenRelevance:
      'Directly supports international charter coordination across European FBOs (Paris Le Bourget, Geneva, Nice) and high-discretion UHNW principals.',
  },
  {
    id: 'edu-cpp',
    type: 'education',
    title: 'Bachelor of Science in Business Administration (BSBA) — Marketing Management & Finance',
    organization: 'California State Polytechnic University, Pomona (Cal Poly Pomona)',
    location: 'Pomona, CA',
    period: '2022 – 2024',
    highlightTag: 'Professional Selling & FRL 3000 Finance',
    bullets: [
      'Completed rigorous B2B Professional Selling curriculum and supervised real-world revenue-generation consulting project under Dr. Megan C. Good.',
      'Excelled in Managerial Finance (FRL 3000) under Dr. Paul Sarmas, applying quantitative financial modeling to marketing and sales management.',
      'Honed strategic critical thinking and unsupervised problem-solving in high-pressure B2B sales simulations.',
    ],
    jetzenRelevance:
      'Combines formal B2B consultative sales methodology with quantitative margin, ROI, and pricing acumen.',
  },
  {
    id: 'exp-carey-danis',
    type: 'experience',
    title: 'Intake & Community Outreach Coordinator',
    organization: 'Carey & Danis, LLC (Attorneys at Law)',
    location: 'St. Louis, MO / Remote National Campaign',
    period: '2026',
    highlightTag: 'Outbound Channel Expansion & CRM Rigor',
    bullets: [
      'Spearheaded client intake and outbound community outreach for high-profile national litigation campaigns, recognized as one of the firm’s strongest coordinators.',
      'Expanded client acquisition beyond obvious channels through creative outbound prospecting and relationship building.',
      'Maintained meticulous daily CRM activity logs, compliance documentation, and strict client confidentiality (deployed at carey-danis-llc-claimant-tracking-s.vercel.app).',
    ],
    jetzenRelevance:
      'Proves disciplined remote CRM utilization, creative outbound lead generation, and strict regulatory/NDA confidentiality.',
    externalLink: {
      label: 'Carey & Danis LLC Claimant Tracking & CRM System',
      url: 'https://carey-danis-llc-claimant-tracking-s.vercel.app/',
    },
  },
  {
    id: 'exp-chevrolet',
    type: 'experience',
    title: 'Luxury & Performance Automotive Sales & Client Experience Specialist',
    organization: 'Maserati & Chevrolet Dealership Operations',
    location: 'Southern California',
    period: 'Maserati (2024 – 2025) · Chevrolet (2022)',
    periodLines: [
      'Maserati Dealership · 2024 – 2025',
      'Chevrolet Dealership · 2022',
    ],
    highlightTag: 'Luxury & High-Ticket Consultative Sales (Maserati & Chevrolet)',
    bullets: [
      'Guided discerning buyers and high-net-worth clients through luxury and high-value automotive acquisitions across Maserati (2024 – 2025) and Chevrolet (2022) dealership operations, matching technical performance specifications, bespoke trim configurations, and financing structures to buyer requirements.',
      'Negotiated pricing terms and structured trade-in, lease, and financing packages while maintaining strong dealer gross margin.',
      'Cultivated repeat and referral client relationships through white-glove delivery and proactive post-sale follow-up.',
    ],
    jetzenRelevance:
      'Directly parallels private jet charter brokerage: matching technical cabin/performance specs to luxury client missions and negotiating profitable deals.',
  },
  {
    id: 'exp-jcpenney-jewelry',
    type: 'experience',
    title: 'Fine Jewelry Sales Professional',
    organization: 'Jared The Galleria of Jewelry & JCPenney Fine Jewelry',
    location: 'Southern California',
    period: 'Jared (2023 – 2024) · JCPenney (2021)',
    periodLines: [
      'Jared The Galleria of Jewelry · 2023 – 2024',
      'JCPenney Fine Jewelry · 2021',
    ],
    highlightTag: 'Luxury Client Consultation',
    bullets: [
      'Consulted discerning clientele at Jared The Galleria of Jewelry (2023 – 2024) and JCPenney Fine Jewelry (2021) on high-ticket fine jewelry, certified diamonds, precious metals, and bespoke milestone purchases.',
      'Consistently met and exceeded individual sales targets through consultative relationship selling and trust-building.',
    ],
    jetzenRelevance:
      'Demonstrates natural poise in luxury consultative selling where trust, presentation, and emotional intelligence drive conversion.',
  },
  {
    id: 'exp-best-friends',
    type: 'experience',
    title: 'Frontline Public Relations, Reception Coordinator & Pro-Bono Legal Services',
    organization: 'Best Friends Animal Society — Los Angeles',
    location: 'Mission Hills / Los Angeles, CA',
    period: '2021 – Present',
    highlightTag: 'Pro-Bono Legal Services · High-Pressure Poise & Rapid Policy Mastery',
    bullets: [
      'Provided Pro-Bono Legal Services and municipal animal welfare ordinance analysis supporting organizational compliance and public policy advocacy (published at bfas-animal-welfare-ordinances-2026.vercel.app).',
      'Managed high-emotion frontline communications and complex scheduling logistics during fast-changing pandemic operations.',
      'Mastered organizational compliance policies and intake software rapidly, delivering calm, compassionate problem-solving.',
    ],
    jetzenRelevance:
      'Proves composure during high-stakes operational disruptions (weather diversions, AOG recovery, urgent manifest changes) alongside regulatory and legal compliance rigor.',
    externalLink: {
      label: 'Pro-Bono Legal Services: BFAS Animal Welfare Ordinances Portal (2026)',
      url: 'https://bfas-animal-welfare-ordinances-2026.vercel.app/',
    },
  },
];

export const DONNA_APPLICATION_LETTER = {
  recipient: 'JetZen Hiring Leadership & Senior Charter Brokerage Team',
  subject: 'Application for Private Jet Charter Broker — Donna Aseret Rivas, MLS, BSBA',
  salutation: 'Dear JetZen Hiring Team,',
  paragraphs: [
    'At JetZen, you are redefining private aviation brokerage by pairing relationship-first dealmakers with a custom-built, machine-learning CRM that eliminates administrative drag. I am writing to apply for the Private Jet Charter Broker role—bringing a proven track record in consultative luxury and high-ticket sales, a Master of Legal Studies (MLS) from Pepperdine University’s Caruso School of Law, formal training in Strategic Management at Georgetown University and Managerial Finance at Cal Poly Pomona, and seven independent faculty and executive endorsements attesting to my sales tenacity, financial acumen, and discretion.',
    'Throughout my sales and outreach career—spanning luxury and high-ticket consultative roles at Maserati, Chevrolet, Jared The Galleria of Jewelry, and JCPenney Fine Jewelry, to leading client intake and outbound channel expansion for Carey & Danis LLC—I have thrived where relationship cultivation meets disciplined pipeline execution. At Carey & Danis, Partner James J. Rosemergy noted that I "showed initiative and creativity in expanding the reach of our program beyond obvious channels" while maintaining rigorous activity logs and follow-through. At Cal Poly Pomona, where I earned my BSBA in Marketing Management and completed Professional Selling and Managerial Finance (FRL 3000), Dr. Megan C. Good highlighted my "tenacity and ability to perform and communicate under pressure" and "unsupervised problem-solving" in B2B sales frameworks.',
    'Private aviation demands three qualities above all: technical & financial precision when matching aircraft range and cabin economics to a principal’s mission, unshakeable poise when coordinating complex logistics, and absolute confidentiality. My Master of Legal Studies from Pepperdine University Caruso School of Law, Strategic Management certification at Georgetown University (where I presented the American Express capstone), and studies at Harvard Extension School (where Senior Lecturer Anne Taieb specifically commended my attentiveness where "client interaction, discretion, and professionalism are essential") have prepared me to negotiate complex charter contracts and serve ultra-high-net-worth principals, family offices, and corporate travel desks from day one.',
    'Because your job description welcomes feedback and new ideas on how to improve, I built this interactive Candidate & Broker CRM Portal specifically for JetZen—complete with a live Part 135 Aircraft & Margin Configurator and an actionable proposal to integrate automated Empty-Leg Principal Proximity Alerts into JetZen’s ML CRM. I am eager to take full ownership of my desk, grow a high-margin book of business remotely, and help JetZen change the game in private aviation.',
  ],
  signOff: 'Warm regards,',
  signatureName: 'Donna Aseret Rivas',
  signatureCredentials:
    'MLS (Pepperdine University, Caruso School of Law) · BSBA (Cal Poly Pomona) · Strategic Management Certificate (Georgetown University) · Harvard Extension School',
  signatureContact: 'donnaarivas10@gmail.com · Los Angeles, CA (100% Remote Ready)',
};

export const AIRCRAFT_FLEET: AircraftSpec[] = [
  {
    id: 'phenom-300e',
    model: 'Embraer Phenom 300E',
    category: 'light',
    categoryLabel: 'Light Jet',
    maxPax: 7,
    maxRangeNm: 2010,
    cruiseKnots: 464,
    hourlyRateUsd: 4650,
    cabinHeightFt: 4.9,
    baggageCuFt: 84,
    amenities: ['High-Speed Ka-Band Wi-Fi', 'Refreshment Galley', 'Enclosed Lavatory'],
    part135Safety: 'ARGUS Platinum · Wyvern Wingman',
    description:
      'Best-in-class short-field performance and speed for regional executive hops and high-altitude airports.',
  },
  {
    id: 'challenger-3500',
    model: 'Bombardier Challenger 3500',
    category: 'super-midsize',
    categoryLabel: 'Super-Midsize Jet',
    maxPax: 9,
    maxRangeNm: 3400,
    cruiseKnots: 470,
    hourlyRateUsd: 6850,
    cabinHeightFt: 6.0,
    baggageCuFt: 106,
    amenities: ['Flat-Floor Stand-Up Cabin', 'Nuage Zero-Gravity Seats', '4,850 ft Cabin Altitude'],
    part135Safety: 'ARGUS Platinum · IS-BAO Stage 3',
    description:
      'Coast-to-coast nonstop reliability with wide-body stand-up comfort and in-flight accessible baggage.',
  },
  {
    id: 'gulfstream-g550',
    model: 'Gulfstream G550',
    category: 'heavy',
    categoryLabel: 'Heavy Jet',
    maxPax: 14,
    maxRangeNm: 6750,
    cruiseKnots: 488,
    hourlyRateUsd: 9800,
    cabinHeightFt: 6.2,
    baggageCuFt: 170,
    amenities: ['3 Distinct Living Zones', 'Full Hot Galley & Flight Attendant', '6 Berthing Beds'],
    part135Safety: 'Wyvern Wingman · Dual Captain Crew',
    description:
      'Intercontinental workhorse linking New York to London, Tokyo, or Dubai nonstop with full cabin service.',
  },
  {
    id: 'global-7500',
    model: 'Bombardier Global 7500',
    category: 'ultra-long-range',
    categoryLabel: 'Ultra-Long-Range',
    maxPax: 16,
    maxRangeNm: 7700,
    cruiseKnots: 516,
    hourlyRateUsd: 13400,
    cabinHeightFt: 6.2,
    baggageCuFt: 195,
    amenities: ['4 True Cabin Zones + Private Stateroom', 'Dedicated Crew Rest Suite', 'Starlink Aviation High-Throughput'],
    part135Safety: 'ARGUS Platinum Elite · IS-BAO Stage 3',
    description:
      'Flagship ultra-long-range performance at Mach 0.925 for ultra-high-net-worth principals and global roadshows.',
  },
];

export const CHARTER_ROUTES: CharterRoute[] = [
  {
    id: 'kteb-eggw',
    originCode: 'KTEB',
    originCity: 'Teterboro, NJ',
    originFbo: 'Signature Flight Support South',
    destCode: 'EGGW',
    destCity: 'London Luton, UK',
    destFbo: 'Harrods Aviation VIP Terminal',
    distanceNm: 3010,
    typicalDemandNote: 'Transatlantic financial roadshow & UHNW transatlantic crossing',
  },
  {
    id: 'kvny-kopf',
    originCode: 'KVNY',
    originCity: 'Van Nuys, CA',
    originFbo: 'Clay Lacy Aviation',
    destCode: 'KOPF',
    destCity: 'Miami Opa-locka, FL',
    destFbo: 'Fontainebleau Aviation',
    distanceNm: 2035,
    typicalDemandNote: 'Cross-country entertainment & family office coastal shuttle',
  },
  {
    id: 'khpn-kase',
    originCode: 'KHPN',
    originCity: 'White Plains, NY',
    originFbo: 'Million Air Westchester',
    destCode: 'KASE',
    destCity: 'Aspen, CO',
    destFbo: 'Atlantic Aviation (High-Elevation Special Cert)',
    distanceNm: 1490,
    typicalDemandNote: 'High-elevation mountain approach requiring steep-approach certified crew',
  },
  {
    id: 'kdal-mmsd',
    originCode: 'KDAL',
    originCity: 'Dallas Love Field, TX',
    originFbo: 'Jet Aviation Dallas',
    destCode: 'MMSD',
    destCity: 'Los Cabos, Mexico',
    destFbo: 'Cabo San Lucas International FBO',
    distanceNm: 910,
    typicalDemandNote: 'Quick international customs turnaround & leisure principal retreat',
  },
];

export const INITIAL_CRM_DEALS: CrmCharterDeal[] = [
  {
    id: 'JZ-4091',
    clientCode: 'Principal Account #VH-88 (Apex Capital)',
    clientType: 'UHNW Principal',
    routeSummary: 'KTEB (Teterboro) → EGGW (London Luton)',
    distanceNm: 3010,
    paxCount: 10,
    preferredAircraft: 'Gulfstream G550',
    departureDate: '2026-11-06 · 21:00 EST',
    wholesaleCost: 78500,
    quotedRetailPrice: 89490,
    brokerMarginPct: 14,
    stage: 'Quote Dispatched',
    mlMatchScore: '3 Empty-Leg Repositioning Matches Found',
    mlAutoTasksCompleted: [
      'ARGUS Platinum Part 135 Certificate Auto-Verified',
      'UK Border Force GAR Customs Manifest Pre-Populated',
      'Harrods Aviation Slot & Ramp Parking Reserved',
    ],
    confidentialityTier: 'NDA Strict · Tail Masked',
  },
  {
    id: 'JZ-4088',
    clientCode: 'Meridian Biotech Executive Board',
    clientType: 'Corporate Roadshow',
    routeSummary: 'KVNY (Van Nuys) → KOPF (Miami Opa-locka)',
    distanceNm: 2035,
    paxCount: 8,
    preferredAircraft: 'Bombardier Challenger 3500',
    departureDate: '2026-11-09 · 08:30 PST',
    wholesaleCost: 34200,
    quotedRetailPrice: 39330,
    brokerMarginPct: 15,
    stage: 'ML Sourcing',
    mlMatchScore: '5 Wyvern Wingman Operators Ranked by Cost',
    mlAutoTasksCompleted: [
      'ML Historical Pricing Benchmark Applied ($6,850/hr)',
      'Crew Duty & FAR Part 135.267 Rest Legality Checked',
    ],
    confidentialityTier: 'Corporate Standard',
  },
  {
    id: 'JZ-4074',
    clientCode: 'Sovereign Family Office (Discreet)',
    clientType: 'Family Office',
    routeSummary: 'KHPN (White Plains) → KASE (Aspen)',
    distanceNm: 1490,
    paxCount: 6,
    preferredAircraft: 'Bombardier Challenger 3500',
    departureDate: '2026-11-14 · 10:00 EST',
    wholesaleCost: 27900,
    quotedRetailPrice: 31806,
    brokerMarginPct: 14,
    stage: 'Flight Confirmed',
    mlMatchScore: 'KASE Special Mountain Crew Verified',
    mlAutoTasksCompleted: [
      'Signed Charter Agreement & Wire Escrow Cleared',
      'Catering & Private Ramp SUV Transfer Dispatched',
      'Alternate Weather Diversion (KRIL) Pre-Briefed',
    ],
    confidentialityTier: 'NDA Strict · Tail Masked',
  },
];

export const QUALIFICATIONS_AND_DUTIES: JobQualificationItem[] = [
  {
    id: 'qual-1',
    title: 'Private Aviation & Luxury Sales Experience',
    category: 'qualification',
    summary:
      'Demonstrated success selling high-ticket or luxury services with a proven track record of meeting or exceeding targets.',
    donnaEvidence:
      'Proven consultative sales performance in Maserati & Chevrolet automotive sales and Jared / JCPenney Fine Jewelry, plus formal B2B Professional Selling training.',
    substantiatingAuthor: 'Dr. Paul Sarmas & Dr. Megan C. Good (Cal Poly Pomona)',
    crmIntegrationNote: 'JetZen CRM tracks real-time margin velocity and repeat principal conversion.',
  },
  {
    id: 'qual-2',
    title: 'In-Depth Understanding of Private Aviation',
    category: 'qualification',
    summary:
      'Comprehensive mastery of Light, Super-Midsize, Heavy, and Ultra-Long-Range aircraft range envelopes, cabin specs, and FBO operations.',
    donnaEvidence:
      'Built the interactive Part 135 Aircraft & Range Configurator in this portal calibrating Phenom 300E, Challenger 3500, G550, and Global 7500 missions.',
    substantiatingAuthor: 'Live JetZen Fleet Configurator Proof-of-Work',
    crmIntegrationNote: 'Integrated aircraft performance calculator validates mission range and baggage limits.',
  },
  {
    id: 'qual-3',
    title: 'Client Relationship Management',
    category: 'qualification',
    summary:
      'Ability to cultivate and maintain relationships with high-net-worth individuals, corporate clients, and aviation brokers.',
    donnaEvidence:
      'Led American Express strategic capstone at Georgetown and high-touch client intake/follow-through at Carey & Danis LLC.',
    substantiatingAuthor: 'Dr. John A. Corso (Georgetown) & James J. Rosemergy (Carey & Danis)',
    crmIntegrationNote: 'ML preference memory stores catering, tail exclusions, and FBO ramp preferences.',
  },
  {
    id: 'qual-4',
    title: 'Customized Solution Selling',
    category: 'qualification',
    summary:
      'Skill in tailoring personalized solutions for clients, understanding specific travel requirements, and providing bespoke services.',
    donnaEvidence:
      'Endorsed explicitly for "Sales Consultancy" after completing supervised B2B consultative selling projects.',
    substantiatingAuthor: 'Dr. Megan C. Good (Cal Poly Pomona) & Dr. John A. Corso (Georgetown)',
    crmIntegrationNote: '1-click multi-option side-by-side aircraft proposal generator.',
  },
  {
    id: 'qual-5',
    title: 'Network Building & Outbound Expansion',
    category: 'qualification',
    summary:
      'Expanding connections across operators, brokers, FBOs, and corporate/UHNW channels.',
    donnaEvidence:
      'Commended by Carey & Danis LLC Partner for "initiative and creativity in expanding the reach of our program beyond obvious channels."',
    substantiatingAuthor: 'James J. Rosemergy (Carey & Danis LLC)',
    crmIntegrationNote: 'Direct operator empty-leg feed and preferred wholesale margin history.',
  },
  {
    id: 'qual-6',
    title: 'High-Level Communication Skills',
    category: 'qualification',
    summary:
      'Communicating unique value propositions, negotiating complex contracts, and maintaining executive poise.',
    donnaEvidence:
      'Praised across all 7 letters for persuasive executive presentation, clarity under pressure, and French/international study at Harvard.',
    substantiatingAuthor: 'Dr. John A. Corso (Georgetown) & Anne Taieb (Harvard)',
    crmIntegrationNote: 'Automated contract redlining and digital e-signature tracking.',
  },
  {
    id: 'qual-7',
    title: 'Financial Acumen & Cost-Benefit Analysis',
    category: 'qualification',
    summary:
      'Understanding pricing structures, cost-benefit analysis, and conveying value in financial terms.',
    donnaEvidence:
      'Excelled in Managerial Finance (FRL 3000) and Strategic Management data synthesis, applying financial tools to sales strategy.',
    substantiatingAuthor: 'Dr. Paul Sarmas (Finance) & Prof. Garv Steinberg (Georgetown)',
    crmIntegrationNote: 'Real-time wholesale-to-retail margin & commission calculator.',
  },
  {
    id: 'qual-8',
    title: 'Adaptability to High-End Market Dynamics',
    category: 'qualification',
    summary:
      'Agility in adapting to dynamic luxury markets, staying updated on trends, and anticipating client needs.',
    donnaEvidence:
      'Evaluated industry leaders and complex corporate structures at Georgetown; adapted rapidly to high-pressure frontline shifts.',
    substantiatingAuthor: 'Prof. Garv Steinberg (Georgetown) & KylieRose Melville',
    crmIntegrationNote: 'Automated AOG backup tail alerts within 150 NM of origin.',
  },
  {
    id: 'qual-9',
    title: 'Confidentiality and Discretion',
    category: 'qualification',
    summary:
      'Maintaining strict confidentiality and exercising discretion with sensitive client identities and travel arrangements.',
    donnaEvidence:
      'Handled privileged legal intake at Carey & Danis LLC and explicitly commended by Harvard faculty for discretion in client-facing contexts.',
    substantiatingAuthor: 'Anne Taieb (Harvard) & James J. Rosemergy (Carey & Danis)',
    crmIntegrationNote: 'Zero-trust NDA passenger manifest encryption & tail masking.',
  },
  {
    id: 'duty-1',
    title: 'Client Consultation & Needs Discovery',
    category: 'duty',
    summary: 'Understand client needs, preferences, and travel requirements to suggest appropriate charter solutions.',
    donnaEvidence: 'Frontline consultative intake coordinator at Carey & Danis LLC and luxury retail specialist.',
    substantiatingAuthor: 'James J. Rosemergy (Carey & Danis LLC)',
    crmIntegrationNote: 'Guided mission intake brief.',
  },
  {
    id: 'duty-2',
    title: 'Precision Aircraft Selection',
    category: 'duty',
    summary: 'Advise clients on best-suited aircraft based on itinerary, group size, and specific preferences.',
    donnaEvidence: 'Demonstrated in Section 04 Fleet & Margin Desk matching PAX and range envelopes across 4 jet classes.',
    substantiatingAuthor: 'Interactive Fleet & Range Configurator',
    crmIntegrationNote: 'Automated range & performance filter.',
  },
  {
    id: 'duty-3',
    title: 'Flight Coordination & Logistics',
    category: 'duty',
    summary: 'Manage charter flight logistics, scheduling, operator coordination, and timely departures/arrivals.',
    donnaEvidence: 'Recognized for diligent project coordination, scheduling follow-through, and zero-drop execution.',
    substantiatingAuthor: 'James J. Rosemergy & Dr. Paul Sarmas',
    crmIntegrationNote: 'Automated flight-following & FBO dispatch checklist.',
  },
  {
    id: 'duty-4',
    title: 'Negotiation and Pricing',
    category: 'duty',
    summary: 'Negotiate terms, contracts, and pricing agreements with clients and operators while ensuring profitability.',
    donnaEvidence: 'Trained in B2B Professional Selling revenue tactics and Managerial Finance margin optimization.',
    substantiatingAuthor: 'Dr. Megan C. Good & Dr. Paul Sarmas',
    crmIntegrationNote: 'Historical lane clearing-price intelligence.',
  },
  {
    id: 'duty-5',
    title: 'Relationship Management',
    category: 'duty',
    summary: 'Foster and maintain strong relationships with existing clients, corporate accounts, and industry stakeholders.',
    donnaEvidence: 'Endorsed for warm, self-assured interpersonal skills and long-term client care.',
    substantiatingAuthor: 'Anne Taieb (Harvard) & KylieRose Melville',
    crmIntegrationNote: 'Automated post-landing touchpoint reminders.',
  },
  {
    id: 'duty-6',
    title: 'Market Research & Regulatory Tracking',
    category: 'duty',
    summary: 'Stay updated on market trends, competitor offerings, and aviation regulations to provide informed recommendations.',
    donnaEvidence: 'Synthesized industry case studies and competitive intelligence in Georgetown Strategic Management program.',
    substantiatingAuthor: 'Prof. Garv Steinberg (Georgetown University)',
    crmIntegrationNote: 'Live lane liquidity & transient tail radar.',
  },
  {
    id: 'duty-7',
    title: 'CRM Utilization & Workflow Optimization',
    category: 'duty',
    summary: 'Effectively use JetZen’s custom-built CRM system to manage client interactions, track sales, and optimize workflows.',
    donnaEvidence: 'Praised at Carey & Danis LLC for consistent CRM activity logs and proactive progress reporting.',
    substantiatingAuthor: 'James J. Rosemergy (Carey & Danis LLC)',
    crmIntegrationNote: 'Saves ~14.5 hours of manual admin per broker per week.',
  },
  {
    id: 'duty-8',
    title: 'Problem-Solving Under Pressure',
    category: 'duty',
    summary: 'Address client concerns or issues promptly and effectively, prioritizing client satisfaction.',
    donnaEvidence: 'Commended for "unsupervised problem-solving" and "ability to perform and communicate under pressure."',
    substantiatingAuthor: 'Dr. Megan C. Good & KylieRose Melville',
    crmIntegrationNote: 'Instant recovery tail sourcing.',
  },
  {
    id: 'duty-9',
    title: 'Compliance and Documentation',
    category: 'duty',
    summary: 'Ensure compliance with aviation regulations and handle necessary documentation for charter flights.',
    donnaEvidence: 'Managed strict legal intake documentation at Carey & Danis LLC and mastered organizational policies rapidly.',
    substantiatingAuthor: 'James J. Rosemergy & KylieRose Melville',
    crmIntegrationNote: '1-click compliance packet verification.',
  },
  {
    id: 'duty-10',
    title: 'Sales and Business Development',
    category: 'duty',
    summary: 'Actively seek new clients, generate leads, and contribute to expanding JetZen’s client base.',
    donnaEvidence: 'Proven outbound channel expansion at Carey & Danis LLC + high-ticket sales at Chevrolet & Fine Jewelry.',
    substantiatingAuthor: 'James J. Rosemergy & Dr. Paul Sarmas',
    crmIntegrationNote: 'ML lead-scoring & empty-leg client matching.',
  },
  {
    id: 'duty-11',
    title: 'Reporting, Analysis & Strategic Feedback',
    category: 'duty',
    summary: 'Generate reports on sales performance, market trends, and client feedback to inform strategies for improvement.',
    donnaEvidence: 'Leveraged finance and strategic planning to deliver disciplined, data-driven intelligence at Georgetown.',
    substantiatingAuthor: 'Prof. Garv Steinberg (Georgetown University)',
    crmIntegrationNote: 'Live broker P&L and product feedback channel.',
  },
];
