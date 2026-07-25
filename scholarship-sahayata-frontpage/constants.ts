import { Language, NavItem, Scheme, LanguageCode } from './types';

// List of all supported languages for the application
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'as', name: 'অসমীয়া (Assamese)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ks', name: 'कश्मीरी (Kashmiri)' },
  { code: 'kok', name: 'कोंकणी (Konkani)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'ne', name: 'नेपाली (Nepali)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'sa', name: 'संस्कृतम् (Sanskrit)' },
  { code: 'sd', name: 'सिंधी (Sindhi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'ur', name: 'اردو (Urdu)' },
  { code: 'mai', name: 'मैथिली (Maithili)' },
  { code: 'doi', name: 'डोगरी (Dogri)' },
  { code: 'brx', name: 'बड़ो (Bodo)' },
  { code: 'sat', name: 'संताली (Santali)' },
];

// Navigation structure including nested dropdowns
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { 
    label: 'About Us', 
    children: [
      { label: 'About the Ministry', path: '/about/ministry' },
      { label: 'Vision & Mission', path: '/about/vision' },
      { label: 'Organizational Structure', path: '/about/structure' },
      { label: 'Key Schemes & Initiatives', path: '/about/schemes' },
      { label: 'Legislative & Policy Framework', path: '/about/legislation' },
      { label: 'Core Focus Groups', path: '/about/focus-groups' },
    ] 
  },
  {
    label: 'Associated Organisations',
    children: [
      { label: 'NIC (National Informatics Centre)', path: '/associated/nic' },
      { label: 'State Nodal Offices', path: '/associated/state-nodal-offices' },
      // Help Centres moved to top-level nav below
    ]
  },
  { label: 'Events', path: '/events' },
  // ✅ New top-level item to the right of Events
  { label: 'Help Centres', path: '/associated/help-centres' },
];

// Important helpline numbers displayed in the header
export const HELPLINES = [
  { label: 'National Scholarship Portal Helpline', number: '0120-6619540 (8 AM - 8 PM)' },
  { label: 'NSP Support', number: '011-26172917 / 011-26172949' },
  { label: 'National Helpline Against Atrocities (SC/ST)', number: '18002621980 / 14566' },
];

// List of major schemes displayed on the home page
export const SCHEMES = [
  {
    id: 1,
    title: "Pre-Matric Scholarship Scheme (SC/ST/OBC/Minority)",
    description:
      "School-level (Classes 1–10) — supports economically weaker students to continue schooling.",
    link: "https://scholarships.gov.in",
  },
  {
    id: 2,
    title: "Post-Matric Scholarship Scheme (SC/ST/OBC/Minority/EBC/DNT)",
    description:
      "For Class 11 to PhD — financial help for college, university, and professional education.",
    link: "https://scholarships.gov.in",
  },
  {
    id: 3,
    title: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    description:
      "For Class 8 to 12 — helps meritorious students from poor families continue education.",
    link: "https://scholarships.gov.in",
  },
  {
    id: 4,
    title: "Central Sector Scholarship Scheme (CSSS)",
    description:
      "After Class 12 — financial support for meritorious students from low-income families.",
    link: "https://www.education.gov.in",
  },
  {
    id: 5,
    title: "Prime Minister’s Scholarship Scheme (PMSS)",
    description:
      "For wards of ex-servicemen and defense personnel — for technical and postgraduate studies.",
    link: "https://www.desw.gov.in",
  },
  {
    id: 6,
    title: "National Scholarship for Post-Graduate Studies (NSPG)",
    description:
      "For postgraduate students — scholarship to pursue higher education in India.",
    link: "https://www.myscheme.gov.in",
  },
  {
    id: 7,
    title: "Top Class Education Scheme for SC/ST/Disabled Students",
    description:
      "Full financial support for SC/ST and disabled students in top institutions.",
    link: "https://scholarships.gov.in",
  },
  {
    id: 8,
    title: "Minority Affairs Pre & Post Matric Scholarships",
    description:
      "For minority community students — supports school to higher education through NSP.",
    link: "https://www.minorityaffairs.gov.in",
  },
];

// News and Events data
export const NEWS_ITEMS = [
  { id: 1, title: 'Applications open for Post-Matric Scholarship 2025-26', date: '12 Dec 2025' },
  { id: 2, title: 'New DBT guidelines released for associated banks', date: '10 Dec 2025' },
  { id: 3, title: 'Awareness camp scheduled in Varanasi regarding PM-AJAY', date: '08 Dec 2025' },
  { id: 4, title: 'Last date extended for National Overseas Scholarship', date: '07 Dec 2025' },
  { id: 5, title: 'SMILE scheme beneficiaries reach new milestone', date: '07 Dec 2025' },
];

// Content Dictionary for Pages (Key = Route Path, Value = Object by Language Code)
// Structure: Path -> Language Code -> { title: string; content: string[] }
export const PAGE_CONTENT: Record<string, Record<string, { title: string; content: string[] }>> = {
    '/about/ministry': {
    en: {
      title: 'About the Ministry',
      content: [
        "The Ministry of Social Justice & Empowerment (MoSJE) is the Government of India’s premier institution mandated with the formulation of policies, programmes, and legislative frameworks aimed at ensuring the holistic development, security, and empowerment of marginalized and vulnerable sections of society. The Ministry works relentlessly to uphold the values of justice, equality, and dignity as enshrined in the Constitution of India.",
        "MoSJE functions with the objective of creating an inclusive and equitable social order by addressing long-standing socio-economic disparities faced by Scheduled Castes (SCs), Other Backward Classes (OBCs), De-Notified Tribes (DNTs), Persons with Disabilities (PwDs), Senior Citizens, victims of substance abuse, and other disadvantaged communities. The Ministry ensures that every citizen, irrespective of socio-economic background, gets equal access to education, livelihood, social protection, and opportunities for self-reliance.",
        "Over the years, MoSJE has emerged as a leading institution in promoting welfare-driven governance. It collaborates with State Governments, autonomous bodies, national institutes, civil society organizations, and community groups to ensure last-mile delivery of welfare initiatives. With a strong emphasis on transparency, digital transformation, and evidence-based policymaking, MoSJE continues to contribute to national development by empowering millions of individuals and families across the country."
      ]
    },
    hi: {
      title: 'मंत्रालय के बारे में',
      content: [
        "सामाजिक न्याय और अधिकारिता मंत्रालय (MoSJE) भारत सरकार की वह प्रमुख संस्था है जिसे समाज के वंचित और कमजोर वर्गों के समग्र विकास, सुरक्षा और सशक्तिकरण के लिए नीतियाँ, कार्यक्रम तथा विधायी ढाँचे तैयार करने का दायित्व सौंपा गया है। यह मंत्रालय भारतीय संविधान में निहित न्याय, समानता और गरिमा के मूल्यों को धरातल पर उतारने के लिए सतत प्रयासरत है।",
        "मंत्रालय का उद्देश्य एक ऐसे समावेशी और न्यायपूर्ण सामाजिक व्यवस्था का निर्माण करना है जिसमें अनुसूचित जाति (SC), अन्य पिछड़ा वर्ग (OBC), विमुक्त एवं घुमंतू जनजातियाँ (DNTs), दिव्यांगजन (PwDs), वरिष्ठ नागरिक, नशे के दुरुपयोग से पीड़ित व्यक्ति तथा अन्य वंचित समुदायों द्वारा झेली जा रही दीर्घकालिक सामाजिक–आर्थिक विषमताओं को दूर किया जा सके। मंत्रालय यह सुनिश्चित करता है कि प्रत्येक नागरिक को, उसके सामाजिक या आर्थिक पृष्ठभूमि की परवाह किए बिना, शिक्षा, आजीविका, सामाजिक सुरक्षा और आत्मनिर्भरता के अवसर समान रूप से उपलब्ध हों।",
        "वर्षों के दौरान सामाजिक न्याय और अधिकारिता मंत्रालय कल्याण उन्मुख सुशासन को बढ़ावा देने वाली अग्रणी संस्था के रूप में उभरा है। यह राज्य सरकारों, स्वायत्त निकायों, राष्ट्रीय संस्थानों, स्वैच्छिक संगठनों और समुदाय-आधारित समूहों के साथ मिलकर योजनाओं के लाभ को अंतिम व्यक्ति तक पहुँचाने के लिए कार्य करता है। पारदर्शिता, डिजिटलीकरण और साक्ष्य-आधारित नीतिनिर्माण पर विशेष बल देते हुए यह मंत्रालय देश भर में लाखों व्यक्तियों और परिवारों को सशक्त बनाकर राष्ट्रीय विकास में महत्वपूर्ण योगदान दे रहा है।"
      ]
    }
  },
    '/about/vision': {
    en: {
      title: 'Vision & Mission',
      content: [
        "Vision:",
        "To build an inclusive, equitable, and socially just nation where every individual—especially those who have been historically marginalized—can live with dignity, access equal opportunities, and participate fully in the nation’s socio-economic life.",
        "Mission:",
        "1. Strengthening Social Justice – To eliminate discrimination, promote equality, and safeguard the constitutional rights of marginalized communities through effective laws, policies, and institutional systems.",
        "2. Educational Empowerment – To expand access to quality education through scholarships, hostels, coaching assistance, and higher education opportunities for SCs, OBCs, DNTs, and PwDs.",
        "3. Economic & Livelihood Development – To enhance employability and entrepreneurship by providing concessional loans, skill development programmes, and capacity-building initiatives through dedicated finance corporations.",
        "4. Social Protection & Security – To provide welfare and protection services for senior citizens, victims of drug abuse, children in need of care, and individuals facing social vulnerabilities.",
        "5. Full Inclusion of Persons with Disabilities – To ensure accessible infrastructure, assistive devices, rehabilitation services, and equal participation for Persons with Disabilities in all spheres of life.",
        "6. Governance Excellence – To strengthen monitoring, improve transparency, promote digitization, and ensure timely, efficient implementation of welfare programmes."
      ]
    },
    hi: {
      title: 'दृष्टि और मिशन',
      content: [
        "दृष्टि (Vision):",
        "एक ऐसा समावेशी, समानतापूर्ण और सामाजिक रूप से न्यायसंगत राष्ट्र का निर्माण करना जहाँ प्रत्येक व्यक्ति — विशेष रूप से ऐतिहासिक रूप से वंचित समुदायों से संबंधित लोग — गरिमा के साथ जीवन जी सकें, समान अवसर प्राप्त कर सकें और राष्ट्र के सामाजिक–आर्थिक जीवन में पूर्ण सहभागिता निभा सकें।",
        "मिशन (Mission):",
        "1. सामाजिक न्याय को सुदृढ़ करना – भेदभाव को समाप्त करना, समानता को बढ़ावा देना और प्रभावी कानूनों, नीतियों तथा संस्थागत तंत्र के माध्यम से वंचित समुदायों के संवैधानिक अधिकारों की रक्षा करना।",
        "2. शैक्षिक सशक्तिकरण – अनुसूचित जाति, अन्य पिछड़ा वर्ग, विमुक्त एवं घुमंतू जनजातियाँ तथा दिव्यांगजन के लिए छात्रवृत्तियों, छात्रावासों, कोचिंग सहायता और उच्च शिक्षा अवसरों के माध्यम से गुणवत्तापूर्ण शिक्षा तक पहुँच का विस्तार करना।",
        "3. आर्थिक एवं आजीविका विकास – रियायती दरों पर ऋण, कौशल विकास कार्यक्रमों और क्षमता निर्माण पहलों के माध्यम से रोजगारयोग्यता और उद्यमिता को बढ़ावा देना, विशेष वित्तीय निगमों के सहयोग से।",
        "4. सामाजिक सुरक्षा एवं संरक्षण – वरिष्ठ नागरिकों, नशा पीड़ितों, देखभाल की आवश्यकता वाले बच्चों और सामाजिक रूप से कमजोर व्यक्तियों के लिए कल्याण एवं संरक्षण सेवाएँ प्रदान करना।",
        "5. दिव्यांगजनों का पूर्ण समावेशन – दिव्यांग व्यक्तियों के लिए सुगम अवसंरचना, सहायक उपकरण, पुनर्वास सेवाएँ और जीवन के सभी क्षेत्रों में समान भागीदारी सुनिश्चित करना।",
        "6. उत्कृष्ट प्रशासन – निगरानी को मजबूत करना, पारदर्शिता में सुधार करना, डिजिटलीकरण को बढ़ावा देना और कल्याणकारी कार्यक्रमों के समयबद्ध एवं प्रभावी क्रियान्वयन को सुनिश्चित करना।"
      ]
    }
  },
    '/about/structure': {
    en: {
      title: 'Organizational Structure',
      content: [
        "The Ministry operates through two major departments, each responsible for specific welfare domains and programme implementation.",
        "1. Department of Social Justice & Empowerment (DSJE): This department addresses the needs of Scheduled Castes, Other Backward Classes, De-Notified, Nomadic and Semi-Nomadic Tribes, Senior Citizens, Transgender Persons, victims of drug and substance abuse, and economically weaker sections requiring social defence.",
        "Key divisions under DSJE include:",
        "• Scheduled Castes Development Bureau",
        "• OBC, EBC & DNT Welfare Division",
        "• Senior Citizens Division",
        "• Social Defence Division",
        "• National Scholarships Division",
        "• Economic Empowerment Division",
        "2. Department of Empowerment of Persons with Disabilities (DEPwD): This department is responsible for disability rights and legislation, accessibility standards, national institutes and rehabilitation centres, assistive devices and technology, and the inclusion of Persons with Disabilities in education, employment, and public life.",
        "Major institutions under DEPwD include:",
        "• National Institute for the Empowerment of Persons with Visual Disabilities",
        "• National Institute for Locomotor Disabilities",
        "• National Institute for Empowerment of Persons with Intellectual Disabilities",
        "• Rehabilitation Council of India",
        "• Office of the Chief Commissioner for Persons with Disabilities",
        "• District Disability Rehabilitation Centres (DDRCs)",
        "Autonomous bodies under MoSJE include:",
        "• National Scheduled Castes Finance & Development Corporation (NSFDC)",
        "• National Backward Classes Finance & Development Corporation (NBCFDC)",
        "• National Safai Karamcharis Finance & Development Corporation (NSKFDC)",
        "• National Institute of Social Defence (NISD)",
        "• National Commission for Scheduled Castes (NCSC)",
        "These departments, institutions, and corporations together ensure targeted planning, implementation, monitoring, and regulatory support for the diverse focus groups served by the Ministry."
      ]
    },
    hi: {
      title: 'संगठनात्मक संरचना',
      content: [
        "मंत्रालय प्रमुख रूप से दो बड़े विभागों के माध्यम से कार्य करता है, जिनमें से प्रत्येक विशिष्ट कल्याण क्षेत्रों और कार्यक्रमों के क्रियान्वयन के लिए उत्तरदायी है।",
        "1. सामाजिक न्याय और अधिकारिता विभाग (DSJE): यह विभाग अनुसूचित जाति, अन्य पिछड़ा वर्ग, विमुक्त, घुमंतू एवं अर्ध-घुमंतू जनजातियाँ, वरिष्ठ नागरिक, ट्रांसजेंडर व्यक्ति, मादक द्रव्यों के दुरुपयोग से पीड़ित व्यक्ति तथा सामाजिक रक्षा की आवश्यकता वाले आर्थिक रूप से कमजोर वर्गों की आवश्यकताओं को संबोधित करता है।",
        "DSJE के अंतर्गत प्रमुख प्रभाग निम्नलिखित हैं:",
        "• अनुसूचित जाति विकास प्रकोष्ठ",
        "• ओबीसी, ईबीसी और डीएनटी कल्याण प्रभाग",
        "• वरिष्ठ नागरिक प्रभाग",
        "• सामाजिक रक्षा प्रभाग",
        "• राष्ट्रीय छात्रवृत्ति प्रभाग",
        "• आर्थिक सशक्तिकरण प्रभाग",
        "2. दिव्यांगजन सशक्तिकरण विभाग (DEPwD): यह विभाग दिव्यांगजन से संबंधित अधिकारों एवं विधानों, सुगम्यता मानकों, राष्ट्रीय संस्थानों और पुनर्वास केंद्रों, सहायक उपकरणों एवं प्रौद्योगिकी तथा शिक्षा, रोजगार और सार्वजनिक जीवन में दिव्यांगजनों के समावेशन के लिए जिम्मेदार है।",
        "DEPwD के अंतर्गत प्रमुख संस्थान:",
        "• दृष्टिबाधित व्यक्तियों के सशक्तिकरण के लिए राष्ट्रीय संस्थान",
        "• लोकमोٽر दिव्यांगों के लिए राष्ट्रीय संस्थान",
        "• बौद्धिक दिव्यांगजनों के सशक्तिकरण के लिए राष्ट्रीय संस्थान",
        "• पुनर्वास परिषद, भारत",
        "• मुख्य आयुक्त, दिव्यांगजन अधिकार कार्यालय",
        "• ज़िला दिव्यांगजन पुनर्वास केंद्र (DDRCs)",
        "मंत्रालय के अंतर्गत कुछ प्रमुख स्वायत्त निकाय भी कार्यरत हैं:",
        "• राष्ट्रीय अनुसूचित जाति वित्त एवं विकास निगम (NSFDC)",
        "• राष्ट्रीय पिछड़ा वर्ग वित्त एवं विकास निगम (NBCFDC)",
        "• राष्ट्रीय सफाई कर्मचारी वित्त एवं विकास निगम (NSKFDC)",
        "• राष्ट्रीय सामाजिक रक्षा संस्थान (NISD)",
        "• राष्ट्रीय अनुसूचित जाति आयोग (NCSC)",
        "ये विभाग, संस्थान और निगम मिलकर मंत्रालय के विभिन्न लक्षित समूहों के लिए योजनाओं की योजना, क्रियान्वयन, निगरानी और नियामक समर्थन सुनिश्चित करते हैं।"
      ]
    }
  },
    '/about/schemes': {
    en: {
      title: 'Key Schemes & Initiatives',
      content: [
        "MoSJE implements several flagship schemes aimed at providing education, livelihood, protection, and empowerment to marginalized communities. These initiatives benefit millions of individuals every year.",
        "1. Educational Empowerment:",
        "• Post-Matric Scholarship (PMS) for SCs, OBCs & DNTs – A flagship initiative providing financial support for higher studies, covering tuition fees, academic expenses, examination charges, and maintenance allowance.",
        "• Pre-Matric Scholarship – Designed to prevent drop-outs and encourage school education among students from OBC, EBC, SC, and DNT communities.",
        "• National Overseas Scholarship (NOS) – Provides financial assistance for Master’s and Ph.D. programmes in reputed foreign universities.",
        "• Top Class Education Scheme – Supports meritorious SC and OBC students pursuing professional courses in premier institutions such as IITs, IIMs, AIIMS, NITs and others.",
        "2. Economic & Skill Development:",
        "• National Action Plan for Skill Training of Persons with Disabilities – Provides industry-relevant skill training, job placements, and entrepreneurship support for Persons with Disabilities.",
        "• Concessional Loans – Through NSFDC, NBCFDC and NSKFDC, the Ministry offers low-interest loans for startup ventures, micro and small enterprises, skill training and income-generating activities.",
        "• Livelihood & Entrepreneurship Assistance – Special programmes for DNTs, Safai Karamcharis and economically weaker sections to promote sustainable self-employment and financial independence.",
        "3. Social Defence & Rehabilitation:",
        "• Integrated Programme for Senior Citizens (IPSC) – Supports Old Age Homes, Day Care Centres, physiotherapy units and senior citizen helplines.",
        "• Drug Demand Reduction Programme – Funds de-addiction centres, counselling services, community awareness campaigns and rehabilitation units under NAPDDR.",
        "• Protection from Atrocities – Ensures strict implementation of the Protection of Civil Rights Act, 1955 and the Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989 to safeguard SC communities from violence, discrimination and exploitation.",
        "4. Disability Empowerment:",
        "• Accessible India Campaign – A nationwide initiative to make government buildings, public transportation and digital systems accessible to Persons with Disabilities.",
        "• ADIP Scheme – Provides free or subsidised assistive devices such as wheelchairs, hearing aids, prosthetics and mobility aids.",
        "• UDID (Unique Disability ID Card) – A national digital identity for PwDs ensuring easy verification, seamless access to schemes and nationwide portability of benefits."
      ]
    },
    hi: {
      title: 'प्रमुख योजनाएँ एवं पहल',
      content: [
        "सामाजिक न्याय और अधिकारिता मंत्रालय शिक्षा, आजीविका, संरक्षण और सशक्तिकरण के लिए अनेक प्रमुख योजनाएँ लागू करता है, जिनसे हर वर्ष लाखों लाभार्थी लाभान्वित होते हैं।",
        "1. शैक्षिक सशक्तिकरण:",
        "• अनुसूचित जाति, ओबीसी और डीएनटी के लिए पोस्ट-मैट्रिक छात्रवृत्ति (PMS) – उच्च शिक्षा हेतु ट्यूशन फीस, शैक्षिक व्यय, परीक्षा शुल्क और मेंटेनेंस भत्ता सहित व्यापक वित्तीय सहायता प्रदान करने वाली प्रमुख योजना।",
        "• प्री-मैट्रिक छात्रवृत्ति – ओबीसी, ईबीसी, एससी और डीएनटी समुदायों के छात्रों में ड्रॉप-आउट को रोकने और विद्यालयी शिक्षा को प्रोत्साहित करने के लिए।",
        "• नेशनल ओवरसीज़ स्कॉलरशिप (NOS) – प्रतिष्ठित विदेशी विश्वविद्यालयों में मास्टर्स और पीएच.डी. कार्यक्रमों के लिए वित्तीय सहायता।",
        "• टॉप क्लास एजुकेशन योजना – आईआईटी, आईआईएम, एआईआईएमएस, एनआईटी आदि जैसे प्रमुख संस्थानों में व्यावसायिक पाठ्यक्रमों का अध्ययन कर रहे मेधावी एससी और ओबीसी छात्रों को पूर्ण सहायता प्रदान करती है।",
        "2. आर्थिक एवं कौशल विकास:",
        "• दिव्यांगजनों के कौशल प्रशिक्षण के लिए राष्ट्रीय कार्ययोजना – उद्योगोन्मुख कौशल प्रशिक्षण, रोजगार अवसर और उद्यमिता समर्थन प्रदान करती है।",
        "• रियायती ऋण – NSFDC, NBCFDC और NSKFDC के माध्यम से स्टार्टअप उद्यमों, सूक्ष्म एवं लघु उद्यमों, कौशल विकास कार्यक्रमों और आय–सृजन गतिविधियों के लिए कम ब्याज दर पर ऋण उपलब्ध कराया जाता है।",
        "• आजीविका एवं उद्यमिता सहायता – डीएनटी, सफाई कर्मचारी और आर्थिक रूप से कमजोर वर्गों के लिए विशेष कार्यक्रम, जो स्थायी स्वरोजगार और वित्तीय स्वतंत्रता को बढ़ावा देते हैं।",
        "3. सामाजिक रक्षा एवं पुनर्वास:",
        "• वरिष्ठ नागरिकों के लिए एकीकृत कार्यक्रम (IPSC) – वृद्धाश्रम, डे-केयर सेंटर, फिजियोथेरेपी इकाइयाँ और वरिष्ठ नागरिक हेल्पलाइन का समर्थन करता है।",
        "• मादक द्रव्य मांग घटाने का कार्यक्रम – NAPDDR के तहत नशामुक्ति केंद्रों, परामर्श सेवाओं, सामुदायिक जागरूकता अभियान और पुनर्वास इकाइयों को समर्थन।",
        "• अत्याचारों से संरक्षण – अनुसूचित जाति और जनजाति (अत्याचार निवारण) अधिनियम, 1989 तथा सिविल अधिकार संरक्षण अधिनियम, 1955 के कड़ाई से अनुपालन के माध्यम से अनुसूचित जातियों को हिंसा, भेदभाव और शोषण से सुरक्षा प्रदान करना।",
        "4. दिव्यांगजन सशक्तिकरण:",
        "• सुगम्य भारत अभियान – सरकारी भवनों, सार्वजनिक परिवहन और डिजिटल प्रणालियों को दिव्यांगजनों के लिए सुलभ बनाने की राष्ट्रव्यापी पहल।",
        "• ADIP योजना – व्हीलचेयर, श्रवण यंत्र, कृत्रिम अंग और अन्य सहायक उपकरण निःशुल्क या रियायती दर पर प्रदान करती है।",
        "• UDID (यूनिक डिसेबिलिटी आईडी कार्ड) – दिव्यांगजनों के लिए राष्ट्रीय डिजिटल पहचान, जो आसान सत्यापन, योजनाओं तक सुगम पहुँच और लाभों की अखिल भारतीय पोर्टेबिलिटी सुनिश्चित करती है।"
      ]
    }
  },
    '/about/legislation': {
    en: {
      title: 'Legislative & Policy Framework',
      content: [
        "MoSJE upholds a strong legal and policy framework to safeguard the rights and dignity of vulnerable and marginalized groups.",
        "Major Legislations:",
        "• Rights of Persons with Disabilities Act, 2016",
        "• Scheduled Castes & Scheduled Tribes (Prevention of Atrocities) Act, 1989",
        "• Protection of Civil Rights Act, 1955",
        "• Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
        "Key Policy Frameworks:",
        "• National Policy on Disability",
        "• National Policy for Senior Citizens",
        "• Social Defence Policy",
        "• National Action Plan for Skill Development and related guidelines",
        "• Scheduled Castes Sub Plan (SCSP) guidelines and related instructions"
      ]
    },
    hi: {
      title: 'विधायी एवं नीतिगत ढाँचा',
      content: [
        "सामाजिक न्याय और अधिकारिता मंत्रालय वंचित व कमजोर वर्गों के अधिकारों और गरिमा की रक्षा के लिए सशक्त विधायी और नीतिगत ढाँचे को लागू करता है।",
        "प्रमुख विधेयक:",
        "• दिव्यांगजन अधिकार अधिनियम, 2016",
        "• अनुसूचित जाति एवं अनुसूचित जनजाति (अत्याचार निवारण) अधिनियम, 1989",
        "• नागरिक अधिकार संरक्षण अधिनियम, 1955",
        "• माता-पिता और वरिष्ठ नागरिकों का भरण-पोषण एवं कल्याण अधिनियम, 2007",
        "मुख्य नीतिगत ढाँचे:",
        "• दिव्यांगजन पर राष्ट्रीय नीति",
        "• वरिष्ठ नागरिकों पर राष्ट्रीय नीति",
        "• सामाजिक रक्षा नीति",
        "• कौशल विकास के लिए राष्ट्रीय कार्ययोजना एवं संबंधित दिशा-निर्देश",
        "• अनुसूचित जाति उप-योजना (SCSP) के दिशा-निर्देश और संबंधित प्रावधान"
      ]
    }
  },
    '/about/focus-groups': {
    en: {
      title: 'Core Focus Groups',
      content: [
        "MoSJE works for a wide spectrum of communities that require targeted support and dedicated policy attention.",
        "1. Scheduled Castes – Ensuring social justice, protection from atrocities, access to quality education, and livelihood opportunities for sustainable development.",
        "2. Other Backward Classes – Providing scholarships, hostels, skill development, economic support and development opportunities to reduce socio-economic gaps.",
        "3. De-Notified & Nomadic Tribes – Delivering education, rehabilitation, social security and financial inclusion programmes for historically excluded communities.",
        "4. Persons with Disabilities – Ensuring rights, accessibility, assistive devices, rehabilitation services and full inclusion in education, employment and public life.",
        "5. Senior Citizens – Promoting dignity, care services, legal protection, social security and support structures including old age homes and day-care centres.",
        "6. Victims of Substance Abuse – Offering counselling, rehabilitation, community outreach and reintegration support under the National Action Plan for Drug Demand Reduction.",
        "These core focus groups form the heart of the Ministry’s mandate, guiding the design and implementation of schemes and policies."
      ]
    },
    hi: {
      title: 'मुख्य लक्षित समूह',
      content: [
        "सामाजिक न्याय और अधिकारिता मंत्रालय विभिन्न ऐसे समुदायों के लिए कार्य करता है जिन्हें विशेष समर्थन और नीतिगत ध्यान की आवश्यकता है।",
        "1. अनुसूचित जातियाँ – सामाजिक न्याय सुनिश्चित करना, अत्याचारों से संरक्षण, गुणवत्तापूर्ण शिक्षा और स्थायी आजीविका के अवसर उपलब्ध कराना।",
        "2. अन्य पिछड़ा वर्ग – छात्रवृत्तियाँ, छात्रावास, कौशल विकास, आर्थिक सहायता और विकास के अवसर प्रदान कर सामाजिक–आर्थिक अंतर को कम करना।",
        "3. विमुक्त एवं घुमंतू जनजातियाँ – ऐतिहासिक रूप से वंचित समुदायों के लिए शिक्षा, पुनर्वास, सामाजिक सुरक्षा और वित्तीय समावेशन से जुड़ी योजनाएँ लागू करना।",
        "4. दिव्यांगजन – अधिकारों की रक्षा, सुगम्यता, सहायक उपकरण, पुनर्वास सेवाएँ और शिक्षा, रोजगार तथा सार्वजनिक जीवन में पूर्ण समावेशन सुनिश्चित करना।",
        "5. वरिष्ठ नागरिक – गरिमा, देखभाल सेवाओं, कानूनी सुरक्षा, सामाजिक सुरक्षा तथा वृद्धाश्रमों और डे-केयर केंद्रों जैसी संरचनाओं को बढ़ावा देना।",
        "6. नशा पीड़ित व्यक्ति – परामर्श, पुनर्वास, सामुदायिक जागरूकता और पुनर्समावेशन समर्थन प्रदान करना, विशेष रूप से नशा मुक्ति के राष्ट्रीय कार्ययोजना के अंतर्गत।",
        "ये मुख्य लक्षित समूह मंत्रालय के जनादेश का केंद्र हैं और योजनाओं एवं नीतियों के निर्माण तथा क्रियान्वयन का मार्गदर्शन करते हैं।"
      ]
    }
  },
     '/associated/nic': {
    en: {
      title: 'NIC (National Informatics Centre)',
      content: [
        "The National Informatics Centre (NIC) serves as the premier technology organisation of the Government of India under the Ministry of Electronics & Information Technology (MeitY). It provides the digital foundation on which modern governance systems, national portals, and public service platforms are built.",
        "NIC enables smooth interaction between citizens and government departments by offering secure, scalable and advanced ICT solutions. Through its nationwide presence across all States and Districts, NIC ensures that digital services reach every part of the country reliably.",
        "Major Functions of NIC:",
        "• Nationwide Digital Infrastructure – NIC manages government data centres, cloud platforms, high-speed networks and secure communication systems, ensuring uninterrupted and efficient functioning of various government portals and digital services.",
        "• Development of Mission-Critical Applications – NIC designs and maintains portals, mobile applications, large-scale databases, monitoring dashboards, grievance systems and e-governance platforms for Central and State departments.",
        "• Cyber Security and Data Protection – NIC provides multi-layered security for government information systems, continuously monitoring digital platforms to safeguard against cyber threats and to protect the confidentiality, integrity and availability of government data.",
        "• Technical Consultancy and Implementation Support – NIC offers end-to-end guidance on digital transformation, system design, ICT planning and modernisation of administrative processes, supporting departments in adopting standardised digital frameworks.",
        "• Capacity Building for Government Officials – NIC regularly conducts training programmes, workshops and awareness sessions to help government staff effectively use portals, data systems and e-governance applications.",
        "NIC’s Role in Strengthening Governance:",
        "• Enhances transparency by enabling digital tracking and real-time monitoring.",
        "• Supports faster decision-making with accurate data and analytics.",
        "• Facilitates seamless coordination between Central and State systems.",
        "• Helps departments transition from manual procedures to digitally integrated governance.",
        "NIC remains the technological backbone of the nation, continuously empowering governmental institutions to deliver citizen services efficiently and securely."
      ]
    },
    hi: {
      title: 'एनआईसी (राष्ट्रीय सूचना विज्ञान केंद्र)',
      content: [
        "राष्ट्रीय सूचना विज्ञान केंद्र (NIC) इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय (MeitY) के अंतर्गत भारत सरकार का प्रमुख प्रौद्योगिकी संगठन है। यह आधुनिक शासन प्रणालियों, राष्ट्रीय पोर्टलों और सार्वजनिक सेवा प्लेटफॉर्मों के लिए आवश्यक डिजिटल आधारभूत संरचना प्रदान करता है।",
        "NIC सुरक्षित, स्केलेबल और उन्नत आईसीटी समाधान प्रदान करके नागरिकों और सरकारी विभागों के बीच सुगम संवाद सुनिश्चित करता है। इसकी राज्य और जिला स्तर तक फैली उपस्थिति के माध्यम से डिजिटल सेवाएँ देश के प्रत्येक भाग में विश्वसनीय रूप से पहुँचती हैं।",
        "NIC के प्रमुख कार्य:",
        "• राष्ट्रव्यापी डिजिटल अवसंरचना – NIC सरकारी डेटा सेंटर, क्लाउड प्लेटफॉर्म, हाई-स्पीड नेटवर्क और सुरक्षित संचार प्रणालियों का प्रबंधन करता है, जिससे विभिन्न सरकारी पोर्टलों और डिजिटल सेवाओं का निर्बाध और कुशल संचालन सुनिश्चित होता है।",
        "• मिशन-क्रिटिकल अनुप्रयोगों का विकास – NIC केंद्रीय और राज्य विभागों के लिए पोर्टल, मोबाइल एप्लीकेशन, बड़े डेटाबेस, मॉनिटरिंग डैशबोर्ड, शिकायत निवारण प्रणाली और ई-गवर्नेंस प्लेटफॉर्म विकसित एवं अनुरक्षित करता है।",
        "• साइबर सुरक्षा और डेटा संरक्षण – NIC सरकारी सूचना प्रणालियों के लिए बहु-स्तरीय सुरक्षा प्रदान करता है, डिजिटल प्लेटफॉर्मों की निरंतर निगरानी कर साइबर खतरों से सुरक्षा सुनिश्चित करता है और सरकारी डेटा की गोपनीयता, अखंडता तथा उपलब्धता की रक्षा करता है।",
        "• तकनीकी परामर्श और क्रियान्वयन सहयोग – NIC डिजिटल परिवर्तन, सिस्टम डिजाइन, आईसीटी योजना और प्रशासनिक प्रक्रियाओं के आधुनिकीकरण पर पूर्ण तकनीकी मार्गदर्शन देता है तथा विभागों को मानकीकृत डिजिटल ढाँचे अपनाने में सहायता करता है।",
        "• सरकारी अधिकारियों के लिए क्षमता निर्माण – NIC नियमित रूप से प्रशिक्षण कार्यक्रम, कार्यशालाएँ और जागरूकता सत्र आयोजित करता है, ताकि सरकारी कर्मी पोर्टलों, डेटा प्रणालियों और ई-गवर्नेंस अनुप्रयोगों का प्रभावी उपयोग कर सकें।",
        "शासन को सुदृढ़ करने में NIC की भूमिका:",
        "• डिजिटल ट्रैकिंग और रियल-टाइम मॉनिटरिंग के माध्यम से पारदर्शिता बढ़ाता है।",
        "• सटीक डेटा और विश्लेषण के माध्यम से त्वरित निर्णय लेने में सहायता करता है।",
        "• केंद्र और राज्यों की प्रणालियों के बीच सुगम समन्वय को सक्षम बनाता है।",
        "• विभागों को मैनुअल प्रक्रियाओं से डिजिटल रूप से एकीकृत शासन की ओर अग्रसर करता है।",
        "NIC राष्ट्र की तकनीकी रीढ़ के रूप में कार्य करते हुए सरकारी संस्थानों को कुशल, सुरक्षित और नागरिक-केंद्रित सेवाएँ प्रदान करने में लगातार सक्षम बना रहा है।"
      ]
    }
  },
    '/associated/state-nodal-offices': {
    en: {
      title: 'State Nodal Offices',
      content: [
        "State Nodal Offices (SNOs) are the primary administrative units at the State/UT level responsible for coordinating the implementation of Central Government schemes, policies and initiatives. They act as the central linkage point between State departments, District authorities and the concerned Ministry.",
        "Mandate and Core Responsibilities:",
        "• Coordination with Central Authorities – SNOs communicate updated guidelines, operational instructions, timelines and policy changes from the Ministry to all relevant State and District departments.",
        "• Supervision of Scheme Execution – They oversee the correct and uniform implementation of programmes, ensuring compliance with established standards, procedures and reporting formats.",
        "• Monitoring and Review – SNOs maintain progress records, compile periodic performance reports and submit detailed updates to the Ministry for evaluation and policymaking.",
        "• Data Verification and Documentation – They supervise State-level data collection, cross-verification of records, documentation accuracy and overall administrative integrity.",
        "• Capacity Building & Knowledge Support – SNOs organise training sessions and awareness programmes for District officials to support smooth adoption of digital systems, proper documentation and efficient scheme execution.",
        "• Issue Escalation & Administrative Support – They act as the primary escalation point for addressing implementation challenges, administrative bottlenecks or coordination issues reported by District authorities.",
        "Role in Strengthening Governance:",
        "• Ensures transparency and accountability in State-level functioning.",
        "• Facilitates smooth communication between Central Ministries and local departments.",
        "• Helps maintain consistency in rollout of national policies across all districts.",
        "• Enhances the overall efficiency of public service delivery and scheme outcomes.",
        "State Nodal Offices thus uphold the Government of India’s commitment to efficient governance, coordinated administration and transparent service delivery."
      ]
    },
    hi: {
      title: 'राज्य नोडल कार्यालय',
      content: [
        "राज्य नोडल कार्यालय (SNOs) राज्य / केन्द्र शासित प्रदेश स्तर पर वे प्रमुख प्रशासनिक इकाइयाँ हैं जो केंद्र प्रायोजित योजनाओं, नीतियों और पहलों के क्रियान्वयन के समन्वय के लिए उत्तरदायी होती हैं। ये कार्यालय राज्य विभागों, जिला प्राधिकरणों और संबंधित मंत्रालय के बीच केंद्रीय कड़ी के रूप में कार्य करते हैं।",
        "मंडेट और मुख्य दायित्व:",
        "• केंद्रीय प्राधिकरणों के साथ समन्वय – SNOs मंत्रालय से प्राप्त अद्यतन दिशा-निर्देश, कार्यान्वयन संबंधी निर्देश, समयसीमाएँ और नीतिगत बदलावों को संबंधित राज्य एवं जिला स्तर के विभागों तक पहुँचाते हैं।",
        "• योजनाओं के क्रियान्वयन की निगरानी – ये कार्यालय विभिन्न कार्यक्रमों के सही और समान क्रियान्वयन की देखरेख करते हैं और यह सुनिश्चित करते हैं कि निर्धारित मानकों, प्रक्रियाओं और रिपोर्टिंग प्रारूपों का पालन हो।",
        "• मॉनिटरिंग और समीक्षा – SNOs प्रगति अभिलेखों का संधारण करते हैं, समय-समय पर प्रदर्शन रिपोर्ट तैयार करते हैं और मंत्रालय को विस्तृत अपडेट भेजते हैं ताकि नीति निर्धारण और मूल्यांकन सही तथ्यों पर आधारित हो।",
        "• डेटा सत्यापन और प्रलेखन – वे राज्य स्तर पर डेटा संग्रह, अभिलेखों की क्रॉस-चेकिंग, दस्तावेजों की शुद्धता और समग्र प्रशासनिक ईमानदारी की निगरानी करते हैं।",
        "• क्षमता निर्माण एवं ज्ञान समर्थन – SNOs जिला अधिकारियों के लिए प्रशिक्षण सत्र और जागरूकता कार्यक्रम आयोजित करते हैं, जिससे डिजिटल प्रणालियों को अपनाना, उचित दस्तावेजीकरण और योजनाओं का प्रभावी क्रियान्वयन सुचारू रूप से हो सके।",
        "• मुद्दों का निपटान एवं प्रशासनिक सहायता – ये कार्यालय क्रियान्वयन से जुड़े चुनौतियों, प्रशासनिक बाधाओं और समन्वय संबंधी समस्याओं के समाधान के लिए मुख्य एस्केलेशन बिंदु के रूप में कार्य करते हैं।",
        "शासन को मजबूत करने में भूमिका:",
        "• राज्य स्तर पर कार्य प्रणाली में पारदर्शिता और जवाबदेही सुनिश्चित करते हैं।",
        "• केंद्रीय मंत्रालयों और स्थानीय विभागों के बीच सुचारू संवाद को सक्षम बनाते हैं।",
        "• सभी जिलों में राष्ट्रीय नीतियों के समान रूप से क्रियान्वयन में मदद करते हैं।",
        "• सार्वजनिक सेवा वितरण और योजनाओं के परिणामों की समग्र दक्षता बढ़ाते हैं।",
        "इस प्रकार राज्य नोडल कार्यालय, भारत सरकार की कुशल शासन, समन्वित प्रशासन और पारदर्शी सेवा वितरण के प्रति प्रतिबद्धता को मजबूती प्रदान करते हैं।"
      ]
    }
  },
  // --- Schemes Content ---
  '/scheme/1': {
    en: {
      title: 'Post-Matric Scholarship for SC',
      content: [
        "The Post-Matric Scholarship for Scheduled Caste students is a Centrally Sponsored Scheme. The objective of the scheme is to appreciably increase the Gross Enrolment Ratio of SC students in higher education with a focus on those from the poorest households.",
        "Eligibility: Scholarships will be paid to the students whose parents'/guardians' income from all sources does not exceed Rs. 2,50,000/- (Rupees Two Lakh Fifty Thousand only) per annum.",
        "Scope: The scholarship includes maintenance allowance, reimbursement of compulsory non-refundable fees, study tour charges, thesis typing/printing charges for research scholars, book allowance for students pursuing correspondence courses, book bank facility for specified courses, and additional allowance for students with disabilities.",
        "How to Apply: Students should apply through the National Scholarship Portal (NSP). It is mandatory to have the bank account seeded with Aadhaar for Direct Benefit Transfer (DBT) of the scholarship amount."
      ]
    },
    hi: {
      title: 'अनुसूचित जाति के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
      content: [
        "अनुसूचित जाति के छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति एक केंद्र प्रायोजित योजना है। योजना का उद्देश्य उच्च शिक्षा में अनुसूचित जाति के छात्रों के सकल नामांकन अनुपात में उल्लेखनीय वृद्धि करना है, जिसमें सबसे गरीब परिवारों के छात्रों पर विशेष ध्यान दिया गया है।",
        "पात्रता: उन छात्रों को छात्रवृत्ति का भुगतान किया जाएगा जिनके माता-पिता/अभिभावकों की सभी स्रोतों से आय 2,50,000/- रुपये (दो लाख पचास हजार रुपये मात्र) प्रति वर्ष से अधिक नहीं है।",
        "दायरा: छात्रवृत्ति में रखरखाव भत्ता, अनिवार्य गैर-वापसी योग्य शुल्क की प्रतिपूर्ति, अध्ययन दौरा शुल्क, शोधार्थियों के लिए थीसिस टाइपिंग/प्रिंटिंग शुल्क, पत्राचार पाठ्यक्रमों का पीछा करने वाले छात्रों के लिए पुस्तक भत्ता, और विकलांग छात्रों के लिए अतिरिक्त भत्ता शामिल है।",
        "आवेदन कैसे करें: छात्रों को राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) के माध्यम से आवेदन करना चाहिए। छात्रवृत्ति राशि के प्रत्यक्ष लाभ हस्तांतरण (DBT) के लिए बैंक खाते का आधार से जुड़ा होना अनिवार्य है।"
      ]
    }
  },
  '/scheme/2': {
    en: {
      title: 'Pre-Matric Scholarship for SC',
      content: [
        "The Pre-Matric Scholarship Scheme for Scheduled Castes & Others is aimed at reducing the dropout rate and promoting the education of SC children in classes IX and X.",
        "Objective: To support parents of SC children for education of their wards studying in classes IX and X so that the incidence of drop-out, especially in the transition from the elementary to the secondary stage is minimized.",
        "Benefits: The scheme provides a monthly academic allowance and an annual ad-hoc grant to cover incidental expenses.",
        "Eligibility: Student should belong to Scheduled Caste. Parent/Guardian's income should not exceed Rs. 2.50 Lakh per annum. The student should not be getting any other Centrally-funded Pre-Matric Scholarship."
      ]
    },
    hi: {
      title: 'अनुसूचित जाति के लिए प्री-मैट्रिक छात्रवृत्ति',
      content: [
        "अनुसूचित जाति और अन्य के लिए प्री-मैट्रिक छात्रवृत्ति योजना का उद्देश्य ड्रॉपआउट दर को कम करना और कक्षा IX और X में अनुसूचित जाति के बच्चों की शिक्षा को बढ़ावा देना है।",
        "उद्देश्य: अनुसूचित जाति के बच्चों के माता-पिता को उनके बच्चों की शिक्षा के लिए सहायता प्रदान करना जो कक्षा IX और X में पढ़ रहे हैं ताकि ड्रॉप-आउट की घटनाओं को कम किया जा सके।",
        "लाभ: योजना आकस्मिक खर्चों को कवर करने के लिए एक मासिक शैक्षणिक भत्ता और एक वार्षिक तदर्थ अनुदान प्रदान करती है।",
        "पात्रता: छात्र अनुसूचित जाति का होना चाहिए। माता-पिता/अभिभावक की आय 2.50 लाख रुपये प्रति वर्ष से अधिक नहीं होनी चाहिए।"
      ]
    }
  },
  '/scheme/3': {
    en: {
      title: 'National Overseas Scholarship',
      content: [
        "The National Overseas Scholarship (NOS) is a Central Sector Scheme to facilitate the low-income students belonging to the Scheduled Castes, Denotified Nomadic and Semi-Nomadic Tribes, Landless Agricultural Labourers and Traditional Artisans category to obtain higher education via Master degree or Ph.D. courses by studying abroad.",
        "Financial Assistance: The scheme covers tuition fees, maintenance allowance, contingency allowance, visa fees, equipment allowance, poll tax, medical insurance premium, and air passage.",
        "Selection: 125 slots are available annually. Selection is based on the unconditional offer of admission from a ranked foreign university.",
        "Income Ceiling: Total family income from all sources shall not exceed Rs. 8.00 lakh per annum."
      ]
    },
    hi: {
      title: 'राष्ट्रीय प्रवासी छात्रवृत्ति',
      content: [
        "राष्ट्रीय प्रवासी छात्रवृत्ति (NOS) अनुसूचित जातियों, विमुक्त घुमंतू और अर्ध-घुमंतू जनजातियों, भूमिहीन खेतिहर मजदूरों और पारंपरिक कारीगरों की श्रेणी के कम आय वाले छात्रों को विदेश में अध्ययन करके मास्टर डिग्री या पीएचडी पाठ्यक्रम के माध्यम से उच्च शिक्षा प्राप्त करने की सुविधा प्रदान करने के लिए एक केंद्रीय क्षेत्र की योजना है।",
        "वित्तीय सहायता: योजना में शिक्षण शुल्क, रखरखाव भत्ता, आकस्मिकता भत्ता, वीजा शुल्क, उपकरण भत्ता, और हवाई यात्रा शामिल है।",
        "चयन: प्रतिवर्ष 125 स्लॉट उपलब्ध हैं। चयन रैंक वाले विदेशी विश्वविद्यालय से प्रवेश के बिना शर्त प्रस्ताव पर आधारित है।",
        "आय सीमा: सभी स्रोतों से कुल पारिवारिक आय 8.00 लाख रुपये प्रति वर्ष से अधिक नहीं होनी चाहिए।"
      ]
    }
  },
  '/scheme/4': {
    en: {
      title: 'SMILE: Support for Marginalized Individuals',
      content: [
        "SMILE (Support for Marginalized Individuals for Livelihood and Enterprise) is a comprehensive umbrella scheme for the welfare of Transgender persons and persons engaged in the act of begging.",
        "Sub-scheme for Transgender Persons: Provides scholarships for students, skill development under PM-DAKSH, composite medical health packages, and shelter homes ('Garima Greh').",
        "Sub-scheme for Persons engaged in Begging: Focuses on survey and identification, mobilization, rescue/shelter home and comprehensive rehabilitation through medical care, education, and skill development.",
        "Goal: To provide social security and necessary support to bring these marginalized groups into the mainstream society."
      ]
    },
    hi: {
      title: 'स्माइल (SMILE): सीमांत व्यक्तियों के लिए सहायता',
      content: [
        "स्माइल (आजीविका और उद्यम के लिए सीमांत व्यक्तियों के लिए सहायता) ट्रांसजेंडर व्यक्तियों और भीख मांगने के कार्य में लगे व्यक्तियों के कल्याण के लिए एक व्यापक योजना है।",
        "ट्रांसजेंडर व्यक्तियों के लिए उप-योजना: छात्रों के लिए छात्रवृत्ति, PM-DAKSH के तहत कौशल विकास, चिकित्सा स्वास्थ्य पैकेज और आश्रय गृह ('गरिमा गृह') प्रदान करता है।",
        "भीख मांगने में लगे व्यक्तियों के लिए उप-योजना: सर्वेक्षण और पहचान, लामबंदी, बचाव/आश्रय गृह और चिकित्सा देखभाल, शिक्षा और कौशल विकास के माध्यम से व्यापक पुनर्वास पर केंद्रित है।",
        "लक्ष्य: इन सीमांत समूहों को मुख्यधारा के समाज में लाने के लिए सामाजिक सुरक्षा और आवश्यक सहायता प्रदान करना।"
      ]
    }
  },
  '/scheme/5': {
    en: {
      title: 'National Portal for Transgender Persons',
      content: [
        "This portal allows Transgender persons to apply online for a Certificate of Identity and Identity Card without physical interface.",
        "Key Features: Applicants can track the status of their application. The certificate is issued by the District Magistrate.",
        "Benefits: The Identity Card is a critical document for accessing various welfare schemes of the government, including scholarships and medical benefits under the SMILE scheme.",
        "Process: Register on the portal, fill out the application form, upload a photograph and affidavit. Once approved, download the ID card digitally."
      ]
    },
    hi: {
      title: 'ट्रांसजेंडर व्यक्तियों के लिए राष्ट्रीय पोर्टल',
      content: [
        "यह पोर्टल ट्रांसजेंडर व्यक्तियों को भौतिक इंटरफ़ेस के बिना पहचान प्रमाण पत्र और पहचान पत्र के लिए ऑनलाइन आवेदन करने की अनुमति देता है।",
        "मुख्य विशेषताएं: आवेदक अपने आवेदन की स्थिति को ट्रैक कर सकते हैं। प्रमाण पत्र जिला मजिस्ट्रेट द्वारा जारी किया जाता है।",
        "लाभ: पहचान पत्र सरकार की विभिन्न कल्याणकारी योजनाओं, जिसमें स्माइल योजना के तहत छात्रवृत्ति और चिकित्सा लाभ शामिल हैं, तक पहुंचने के लिए एक महत्वपूर्ण दस्तावेज है।",
        "प्रक्रिया: पोर्टल पर पंजीकरण करें, आवेदन पत्र भरें, एक तस्वीर और हलफनामा अपलोड करें। स्वीकृत होने के बाद, आईडी कार्ड को डिजिटल रूप से डाउनलोड करें।"
      ]
    }
  },
  '/scheme/6': {
    en: {
      title: 'Senior Citizens Welfare',
      content: [
        "The Ministry implements the Atal Vayo Abhyuday Yojana (AVYAY) for the welfare of Senior Citizens.",
        "Components: It includes the Integrated Programme for Senior Citizens (IPSrC) which funds NGOs for running Old Age Homes, and the Rashtriya Vayoshri Yojana (RVY) which provides physical aids and assisted-living devices to BPL senior citizens.",
        "Elderline: A National Helpline for Senior Citizens (14567) has been established to provide information, guidance, and emotional support.",
        "Objective: To improve the quality of life of the Senior Citizens by providing basic amenities like shelter, food, medical care and entertainment opportunities."
      ]
    },
    hi: {
      title: 'वरिष्ठ नागरिक कल्याण',
      content: [
        "मंत्रालय वरिष्ठ नागरिकों के कल्याण के लिए अटल वयो अभ्युदय योजना (AVYAY) लागू करता है।",
        "घटक: इसमें वरिष्ठ नागरिकों के लिए एकीकृत कार्यक्रम (IPSrC) शामिल है जो वृद्धाश्रम चलाने के लिए गैर सरकारी संगठनों को वित्तपोषित करता है, और राष्ट्रीय वयोश्री योजना (RVY) जो BPL वरिष्ठ नागरिकों को शारीरिक सहायता और जीवन सहायक उपकरण प्रदान करती है।",
        "एल्डरलाइन: जानकारी, मार्गदर्शन और भावनात्मक समर्थन प्रदान करने के लिए वरिष्ठ नागरिकों (14567) के लिए एक राष्ट्रीय हेल्पलाइन स्थापित की गई है।",
        "उद्देश्य: आश्रय, भोजन, चिकित्सा देखभाल और मनोरंजन के अवसर जैसी बुनियादी सुविधाएं प्रदान करके वरिष्ठ नागरिकों के जीवन की गुणवत्ता में सुधार करना।"
      ]
    }
  },
  // --- News Content ---
  '/news/1': {
    en: {
  title: "Applications open for Post-Matric Scholarship 2025–26 (12 December)",
  content: [
    "The Government hereby announces that the application process for the Post-Matric Scholarship Scheme for the academic year 2025–26 is now officially open. Students pursuing studies at the post-matriculation level in recognized educational institutions across the country are invited to submit their applications within the notified time frame. This scheme forms a key component of the Government’s broader educational development agenda and aims to ensure that every eligible learner receives adequate support to continue their academic pursuits without interruption.",
    "The opening of the application window reflects the Government’s consistent commitment to promoting inclusive education and expanding opportunities for learners belonging to scheduled, backward, minority, and economically weaker communities. Each year, the scheme reaches millions of students nationwide, helping reduce the financial burden associated with continued education. The Government emphasizes the importance of timely submission of applications so that the verification and approval processes can be undertaken smoothly by the respective institutions and authorities.",
    "Furthermore, institutions have been instructed to carry out verification of academic and community-related credentials strictly as per the guidelines. This step ensures transparency and helps maintain the integrity of the scheme. Students are advised to carefully review their academic records and institutional details before applying, as the verification process depends heavily on accurate information being furnished. The Government expects full cooperation from both institutions and students to ensure that the benefits of the scheme reach the intended candidates in a fair and efficient manner.",
    "Eligibility Criteria:",
    "• Applicants must belong to the SC / ST / OBC / Minority / EWS categories as per Government norms.",
    "• Must be enrolled in Class 11, Class 12, Undergraduate, Postgraduate, or higher-level programmes.",
    "• Annual family income must fall within the category-specific limits prescribed by the Government.",
    "• Must be pursuing studies in a recognized educational institution."
  ]
},
    hi: {
  title: "पोस्ट-मैट्रिक छात्रवृत्ति 2025–26 के लिए आवेदन शुरू (12 दिसंबर)",
  content: [
    "सरकार द्वारा यह घोषणा की जाती है कि शैक्षणिक वर्ष 2025–26 के लिए पोस्ट-मैट्रिक छात्रवृत्ति योजना की आवेदन प्रक्रिया आधिकारिक रूप से आरंभ हो गई है। देशभर के मान्यता प्राप्त शैक्षणिक संस्थानों में पोस्ट-मैट्रिक स्तर पर अध्ययनरत छात्र और छात्राएँ निर्धारित समय सीमा के भीतर अपने आवेदन प्रस्तुत कर सकते हैं। यह योजना सरकार के व्यापक शैक्षिक विकास एजेंडा का एक प्रमुख हिस्सा है और इसका उद्देश्य प्रत्येक पात्र विद्यार्थी को बिना आर्थिक बाधाओं के अपनी शिक्षा जारी रखने में सहायता प्रदान करना है।",
    "आवेदन प्रक्रिया की शुरुआत सरकार की सतत प्रतिबद्धता को दर्शाती है, जो अनुसूचित जाति, पिछड़ा वर्ग, अल्पसंख्यक एवं आर्थिक रूप से कमजोर वर्गों के विद्यार्थियों के लिए शिक्षा के अवसरों को बढ़ाने की दिशा में कार्य कर रही है। हर वर्ष लाखों विद्यार्थी इस योजना का लाभ उठाते हैं, जिससे उनकी उच्च शिक्षा से संबंधित आर्थिक चुनौतियाँ काफी हद तक कम हो जाती हैं। सरकार इस बात पर जोर देती है कि आवेदन समय पर जमा किए जाएँ ताकि सत्यापन और अनुमोदन प्रक्रिया सुचारू रूप से की जा सके।",
    "साथ ही, सभी शैक्षणिक संस्थानों को निर्देशित किया गया है कि वे शैक्षणिक और सामुदायिक प्रमाण-पत्रों का सत्यापन निर्धारित दिशा-निर्देशों के अनुसार करें। यह कदम योजना की पारदर्शिता और विश्वसनीयता बनाए रखने के लिए महत्वपूर्ण है। छात्रों को सलाह दी जाती है कि वे आवेदन करने से पहले अपने सभी अभिलेखों की सावधानीपूर्वक जाँच करें, क्योंकि सत्यापन का आधार सही जानकारी पर निर्भर करता है। सरकार को संस्थानों और विद्यार्थियों दोनों से पूर्ण सहयोग की अपेक्षा है, ताकि योजना का लाभ पात्र विद्यार्थियों तक निष्पक्ष और प्रभावी ढंग से पहुँच सके।",
    "पात्रता मानदंड:",
    "• आवेदक SC / ST / OBC / Minority / EWS श्रेणी से संबंधित होना चाहिए।",
    "• आवेदक कक्षा 11, कक्षा 12, स्नातक, परास्नातक या उच्च स्तरीय कार्यक्रमों में अध्ययनरत होना चाहिए।",
    "• परिवार की वार्षिक आय, सरकार द्वारा निर्धारित सीमा के भीतर होनी चाहिए।",
    "• आवेदक किसी मान्यता प्राप्त शैक्षणिक संस्थान में अध्ययनरत होना चाहिए।"
  ]
}
  },
  '/news/2': {
    en: {
  title: "New DBT guidelines released for associated banks (10 December)",
  content: [
    "The Government has issued comprehensive revised guidelines pertaining to the Direct Benefit Transfer (DBT) system to all associated banks and financial institutions. These updated guidelines have been formulated after extensive review and assessment of existing DBT processes, with the objective of enhancing efficiency, accountability, and transparency across all beneficiary-related financial transactions. The DBT system plays a pivotal role in ensuring that funds under Government schemes are transferred directly to the bank accounts of eligible recipients in a timely and error-free manner.",
    "The revised guidelines underscore the necessity of strengthening account authentication processes. Banks have been directed to ensure accurate seeding of Aadhaar numbers with beneficiary accounts, proper validation of account status, and prompt resolution of discrepancies. The Government has emphasized that even minor lapses in account verification can lead to delays or rejections, affecting the beneficiaries.",
    "Additionally, the Government has highlighted the importance of coordination between banks, national payment gateways, and scheme-implementing agencies to minimize transaction failures. Banks are required to submit periodic reports indicating compliance with the revised guidelines and to ensure timely completion of all technical and operational updates.",
    "Key Points:",
    "• Strengthened procedures for Aadhaar authentication and account validation.",
    "• Updated mechanisms to ensure timely credit of Government-provided funds.",
    "• Improved coordination between banks and national-level payment systems.",
    "• Enhanced accountability and reporting requirements for associated institutions."
  ]
},
    hi: {
  title: "संबद्ध बैंकों के लिए नए DBT दिशानिर्देश जारी (10 दिसंबर)",
  content: [
    "सरकार ने डायरेक्ट बेनिफिट ट्रांसफर (DBT) प्रणाली से संबंधित व्यापक संशोधित दिशानिर्देश सभी संबद्ध बैंकों और वित्तीय संस्थानों को जारी किए हैं। इन अद्यतन दिशानिर्देशों का उद्देश्य डीबीटी प्रणाली में दक्षता, जवाबदेही और पारदर्शिता को बढ़ाना है, ताकि पात्र लाभार्थियों को समय पर और त्रुटिरहित तरीके से धनराशि हस्तांतरित की जा सके।",
    "संशोधित दिशानिर्देशों में आधार सीडिंग, खाते की स्थिति की पुष्टि और किसी भी प्रकार की विसंगति के शीघ्र समाधान पर विशेष जोर दिया गया है। सरकार ने स्पष्ट किया है कि खाते के सत्यापन में छोटी-सी चूक भी लाभार्थियों को मिलने वाले भुगतान में देरी या अस्वीकृति का कारण बन सकती है।",
    "सरकार ने बैंकों, राष्ट्रीय भुगतान गेटवे और योजना क्रियान्वयन एजेंसियों के बीच समन्वय बढ़ाने के महत्व को भी रेखांकित किया है, ताकि लेनदेन विफलताओं को कम किया जा सके। बैंकों को संशोधित दिशानिर्देशों के अनुपालन की रिपोर्ट प्रस्तुत करने और सभी तकनीकी एवं परिचालन अद्यतनों को समय पर पूरा करने का निर्देश दिया गया है।",
    "मुख्य बिंदु:",
    "• आधार प्रमाणीकरण और खाते के सत्यापन की प्रक्रियाओं को सुदृढ़ किया गया।",
    "• सरकारी धनराशि के समयबद्ध हस्तांतरण के लिए उन्नत तंत्र लागू किए गए।",
    "• बैंकों और राष्ट्रीय भुगतान प्रणालियों के बीच बेहतर समन्वय।",
    "• संबद्ध संस्थानों के लिए जवाबदेही और रिपोर्टिंग मानकों को मजबूत किया गया।"
  ]
}
  },
  '/news/3': {
    en: {
  title: "Awareness camp scheduled in Varanasi regarding PM-AJAY (08 December)",
  content: [
    "The Government hereby informs that an official awareness camp under the Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY) will be held in Varanasi to provide in-depth information and guidance to members of the eligible communities. The awareness camp is being organized with the objective of ensuring that citizens have access to authentic, accurate, and comprehensive information regarding the scheme’s components.",
    "During the event, trained resource personnel and Government representatives will interact with stakeholders, explain the operational framework of the scheme, and respond to queries raised by the participants. Discussions will focus on socio-economic development and the role of community engagement in welfare initiatives.",
    "The programme is expected to attract students, parents, community leaders, and local representatives. By providing direct access to officials and creating a platform for open communication, the camp aims to strengthen public trust and improve implementation of the scheme.",
    "Key Points:",
    "• Government-organized awareness camp on PM-AJAY.",
    "• Interaction with officials for clarification of queries.",
    "• Focus on community outreach and engagement.",
    "• Designed to improve awareness and accessibility of PM-AJAY provisions."
  ]
},
    hi: {
  title: "PM-AJAY योजना के संबंध में वाराणसी में जागरूकता शिविर आयोजित (08 दिसंबर)",
  content: [
    "सरकार द्वारा यह सूचित किया जाता है कि प्रधानमंत्री अनुसूचित जाति अभ्युदय योजना (PM-AJAY) के अंतर्गत वाराणसी में आधिकारिक जागरूकता शिविर आयोजित किया जाएगा। इस शिविर का उद्देश्य पात्र समुदायों के सदस्यों को योजना के प्रावधानों के बारे में सटीक, प्रमाणिक और विस्तृत जानकारी प्रदान करना है।",
    "कार्यक्रम के दौरान सरकारी प्रतिनिधि और प्रशिक्षित विशेषज्ञ प्रतिभागियों से संवाद करेंगे, योजना के क्रियान्वयन ढांचे की जानकारी देंगे और उनके द्वारा पूछे गए प्रश्नों का समाधान करेंगे। चर्चा में सामाजिक-आर्थिक विकास और सामुदायिक सहभागिता की भूमिका पर भी जोर दिया जाएगा।",
    "इस कार्यक्रम में विद्यार्थियों, अभिभावकों, समुदाय के नेताओं और स्थानीय प्रतिनिधियों की उपस्थिति अपेक्षित है। अधिकारियों के साथ सीधे संवाद का यह अवसर योजनाओं की पारदर्शिता बढ़ाने और क्रियान्वयन को सुदृढ़ करने में सहायक होगा।",
    "मुख्य बिंदु:",
    "• PM-AJAY योजना पर सरकार द्वारा आयोजित जागरूकता शिविर।",
    "• अधिकारियों के साथ प्रत्यक्ष संवाद और जानकारी साझा करना।",
    "• सामुदायिक पहुंच और भागीदारी पर विशेष जोर।",
    "• योजना की जागरूकता और लाभ तक पहुंच को बेहतर बनाने के लिए डिज़ाइन किया गया।"
  ]
}
  },
  '/news/4': {
    en: {
  title: "Last date extended for National Overseas Scholarship (07 December)",
  content: [
    "The Government hereby announces the extension of the last date for submission of applications under the National Overseas Scholarship Scheme. This decision has been taken in consideration of the large number of applicants seeking additional time for university admission and documentation.",
    "The National Overseas Scholarship allows eligible students to pursue postgraduate, doctoral, and research-based studies at internationally recognized institutions. The extension ensures that no deserving applicant is deprived due to administrative or documentation delays.",
    "Institutions responsible for application verification have been directed to continue operations without interruption during the extended period. Applicants should complete submissions within the revised timeline.",
    "Eligibility Criteria:",
    "• Applicant must belong to SC, EBC, DNT, or other notified categories.",
    "• Must have a confirmed admission offer from a recognized foreign university.",
    "• Must meet minimum academic requirements as per scheme norms.",
    "• Family income must not exceed the limit prescribed by the Government."
  ]
},
    hi: {
  title: "नेशनल ओवरसीज़ स्कॉलरशिप की अंतिम तिथि बढ़ाई गई (07 दिसंबर)",
  content: [
    "सरकार द्वारा यह घोषणा की गई है कि नेशनल ओवरसीज़ स्कॉलरशिप योजना के अंतर्गत आवेदन प्रस्तुत करने की अंतिम तिथि बढ़ा दी गई है। यह निर्णय उन अनेक अभ्यर्थियों के अनुरोधों को ध्यान में रखते हुए लिया गया है जिन्हें विश्वविद्यालय प्रवेश प्रक्रिया और दस्तावेज़ तैयार करने हेतु अतिरिक्त समय की आवश्यकता थी।",
    "नेशनल ओवरसीज़ स्कॉलरशिप पात्र छात्रों को अंतरराष्ट्रीय स्तर पर मान्यता प्राप्त विदेशी संस्थानों में स्नातकोत्तर, डॉक्टरेट और शोध आधारित अध्ययन करने का अवसर प्रदान करती है। अंतिम तिथि में विस्तार से यह सुनिश्चित होगा कि कोई भी योग्य अभ्यर्थी केवल प्रशासनिक कारणों से अवसर से वंचित न हो।",
    "सत्यापन से संबंधित संस्थानों को निर्देश दिया गया है कि वे विस्तारित अवधि के दौरान अपना कार्य बिना रुकावट जारी रखें। अभ्यर्थियों को सलाह दी जाती है कि वे संशोधित समयसीमा के भीतर अपने आवेदन पूर्ण करें।",
    "पात्रता मानदंड:",
    "• आवेदक SC, EBC, DNT या अन्य अधिसूचित श्रेणियों से संबंधित होना चाहिए।",
    "• आवेदक के पास किसी मान्यता प्राप्त विदेशी विश्वविद्यालय से प्रवेश-पत्र होना चाहिए।",
    "• शैक्षणिक अर्हताएँ योजना के मानदंडों के अनुसार पूरी होनी चाहिए।",
    "• पारिवारिक वार्षिक आय सरकार द्वारा निर्धारित सीमा से अधिक नहीं होनी चाहिए।"
  ]
}
  },
    '/news/5': {
    en: {
      title: 'SMILE Scheme beneficiaries reach new milestone',
      content: [
        "The Government announces that the SMILE Scheme (Support for Marginalized Individuals for Livelihood and Enterprise) has achieved a significant new milestone in its implementation. Under this initiative, a substantial number of persons engaged in begging and transgender persons have been successfully identified, rehabilitated, and connected to various welfare and livelihood-oriented services.",
        "The SMILE Scheme, implemented by the Ministry of Social Justice and Empowerment, focuses on providing a comprehensive package of support including shelter, healthcare, counselling, documentation, skill development, and assistance for self-employment. Through coordinated efforts of State Governments, local bodies, and partner organisations, beneficiaries are being gradually integrated into mainstream society with dignity and security.",
        "This new milestone reflects the Government’s continued commitment to protecting the rights of marginalized communities and ensuring that no individual is left behind due to social stigma or economic vulnerability. The Ministry has emphasized the importance of sustained follow-up, community awareness, and convergence with other schemes so that the positive outcomes achieved under SMILE can be strengthened and expanded further.",
        "Key Focus Areas:",
        "• Identification and rescue of persons engaged in begging through field surveys and outreach drives.",
        "• Provision of temporary and long-term shelter facilities along with food, clothing, and basic amenities.",
        "• Access to healthcare, psycho-social counselling, and support for mental well-being.",
        "• Skill development, vocational training, and linkage with suitable livelihood opportunities.",
        "• Legal aid, documentation support, and steps to reduce stigma and discrimination at the community level."
      ]
    },
    hi: {
      title: 'स्माइल (SMILE) योजना के लाभार्थियों ने नया मील का पत्थर हासिल किया',
      content: [
        "सरकार द्वारा यह सूचित किया जाता है कि स्माइल योजना (Support for Marginalized Individuals for Livelihood and Enterprise – SMILE) के कार्यान्वयन में एक महत्वपूर्ण नया मील का पत्थर प्राप्त किया गया है। इस पहल के अंतर्गत बड़ी संख्या में भीख मांगने के कार्य में लगे व्यक्तियों तथा ट्रांसजेंडर व्यक्तियों की पहचान कर उन्हें सफलतापूर्वक पुनर्वास, सहायता सेवाओं और आजीविका से संबंधित विभिन्न प्रावधानों से जोड़ा गया है।",
        "सामाजिक न्याय एवं अधिकारिता मंत्रालय द्वारा संचालित स्माइल योजना का उद्देश्य लाभार्थियों को आश्रय, स्वास्थ्य सुविधाएँ, परामर्श, दस्तावेज़ीकरण, कौशल विकास और स्व-रोजगार सहायता जैसे समग्र सहयोग पैकेज के माध्यम से मुख्यधारा से जोड़ना है। राज्य सरकारों, स्थानीय निकायों और भागीदार संगठनों के समन्वित प्रयासों से लाभार्थियों को सम्मान और सुरक्षा के साथ समाज की मुख्यधारा में लाने की दिशा में ठोस प्रगति हो रही है।",
        "यह नया मील का पत्थर दर्शाता है कि सरकार हाशिए पर रहने वाले समुदायों के अधिकारों की रक्षा करने और सामाजिक कलंक या आर्थिक कमजोरी के कारण पीछे रह गए किसी भी व्यक्ति को छोड़कर न जाने के लिए निरंतर प्रतिबद्ध है। मंत्रालय ने यह भी रेखांकित किया है कि स्माइल योजना के तहत प्राप्त सकारात्मक परिणामों को स्थायी बनाने के लिए नियमित फॉलो-अप, सामुदायिक जागरूकता और अन्य योजनाओं के साथ समन्वय अत्यंत आवश्यक है।",
        "मुख्य फोकस क्षेत्र:",
        "• सर्वेक्षण और आउटरीच ड्राइव के माध्यम से भीख मांगने के कार्य में लगे व्यक्तियों की पहचान और बचाव।",
        "• अस्थायी तथा दीर्घकालिक आश्रय गृहों की व्यवस्था, जिसमें भोजन, वस्त्र और मूलभूत सुविधाएँ उपलब्ध कराई जाती हैं।",
        "• स्वास्थ्य सेवाओं, मनो–सामाजिक परामर्श और मानसिक स्वास्थ्य से संबंधित सहायता तक पहुंच।",
        "• कौशल विकास, व्यावसायिक प्रशिक्षण और उपयुक्त आजीविका के अवसरों से जोड़ना।",
        "• कानूनी सहायता, दस्तावेज़ प्राप्त करने में सहयोग तथा समुदाय स्तर पर कलंक और भेदभाव को कम करने के प्रयास।"
      ]
    }
  },
};

// Fallback logic for UI Elements text
const DEFAULT_EN = {
  ministryName: 'Department of Social Justice & Empowerment',
  ministryParent: 'Ministry of Social Justice & Empowerment',
  govt: 'Government of India',
  searchPlaceholder: 'Search...',
  login: 'Login',
  newsTitle: 'News / Events (What\'s New)',
  schemesTitle: 'Major Schemes',
  viewAll: 'View All',
  footerContent: 'Content owned by Department of Social Justice and Empowerment. Designed, Developed, and Hosted by National Informatics Centre (NIC).',
};

// Translations for static UI elements
export const DICTIONARY: Record<string, Record<string, string>> = {
  en: DEFAULT_EN,
  hi: {
    ministryName: 'सामाजिक न्याय और अधिकारिता विभाग',
    ministryParent: 'सामाजिक न्याय और अधिकारिता मंत्रालय',
    govt: 'भारत सरकार',
    searchPlaceholder: 'खोजें...',
    login: 'लॉग इन करें',
    newsTitle: 'समाचार / कार्यक्रम (नया क्या है)',
    schemesTitle: 'प्रमुख योजनाएं',
    viewAll: 'सभी देखें',
    footerContent: 'सामग्री का स्वामित्व सामाजिक न्याय और अधिकारिता विभाग के पास है। राष्ट्रीय सूचना विज्ञान केंद्र (एनआईसी) द्वारा डिज़ाइन, विकसित और होस्ट किया गया।',
  },
  // Basic fallbacks for other languages to prevent crashes.
  // In a real app, these would be fully populated.
  as: { ...DEFAULT_EN, ministryName: 'সামাজিক ন্যায় আৰু সৱলীকৰণ বিভাগ', govt: 'ভাৰত চৰকাৰ' },
  bn: {
    ...DEFAULT_EN,
    ministryName: 'সামাজিক ন্যায় ও ক্ষমতায়ন বিভাগ',
    ministryParent: 'সামাজিক ন্যায় ও ক্ষমতায়ন মন্ত্রক',
    govt: 'ভারত সরকার',
    searchPlaceholder: 'অনুসন্ধান...',
    login: 'লগ ইন',
    newsTitle: 'খবর / ইভেন্ট (নতুন কি)',
    schemesTitle: 'প্রধান প্রকল্পসমূহ',
    viewAll: 'সব দেখুন'
  },
  gu: {
    ...DEFAULT_EN,
    ministryName: 'સામાજિક ન્યાય અને અધિકારિતા વિભાગ',
    ministryParent: 'સામાજિક ન્યાય અને અધિકારિતા મંત્રાલય',
    govt: 'ભારત સરકાર',
    searchPlaceholder: 'શોધ...',
    login: 'લૉગિન',
    newsTitle: 'સમાચાર / ઇવેન્ટ્સ',
    schemesTitle: 'મુખ્ય યોજનાઓ',
    viewAll: 'બધું જુઓ'
  },
  kn: {
    ...DEFAULT_EN,
    ministryName: 'ಸಾಮಾಜಿಕ ನ್ಯಾಯ ಮತ್ತು ಸಬಲೀಕರಣ ಇಲಾಖೆ',
    ministryParent: 'ಸಾಮಾಜಿಕ ನ್ಯಾಯ ಮತ್ತು ಸಬಲೀಕರಣ ಸಚಿವಾಲಯ',
    govt: 'ಭಾರತ ಸರ್ಕಾರ',
    searchPlaceholder: 'ಹುಡುಕಿ...',
    login: 'ಲಾಗಿನ್',
    newsTitle: 'ಸುದ್ದಿ / ಘಟನೆಗಳು',
    schemesTitle: 'ಪ್ರಮುಖ ಯೋಜನೆಗಳು',
    viewAll: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ'
  },
  ks: { ...DEFAULT_EN, ministryName: 'محکمہ سماجی انصاف اور بااختیار بنانا' }, 
  kok: { ...DEFAULT_EN, ministryName: 'सामाजीक न्याय आनी सक्षमीकरण विभाग' },
  ml: {
    ...DEFAULT_EN,
    ministryName: 'സാമൂഹ്യനീതി ശാക്തീകരണ വകുപ്പ്',
    ministryParent: 'സാമൂഹ്യനീതി ശാക്തീകരണ മന്ത്രാലയം',
    govt: 'ഇന്ത്യൻ സർക്കാർ',
    searchPlaceholder: 'തിരയുക...',
    login: 'ലോഗിൻ',
    newsTitle: 'വാർത്തകൾ / ഇവന്റുകൾ',
    schemesTitle: 'പ്രധാന പദ്ധതികൾ',
    viewAll: 'എല്ലാം കാണുക'
  },
  mr: {
    ...DEFAULT_EN,
    ministryName: 'सामाजिक न्याय व सक्षमीकरण विभाग',
    ministryParent: 'सामाजिक न्याय व सक्षमीकरण मंत्रालय',
    govt: 'भारत सरकार',
    searchPlaceholder: 'शोधा...',
    login: 'लॉगिन',
    newsTitle: 'बातम्या / कार्यक्रम',
    schemesTitle: 'प्रमुख योजना',
    viewAll: 'सर्व पहा'
  },
  ne: { ...DEFAULT_EN, ministryName: 'सामाजिक न्याय र अधिकारिता विभाग' },
  or: {
    ...DEFAULT_EN,
    ministryName: 'ସାମାଜିକ ନ୍ୟାୟ ଏବଂ ସଶକ୍ତିକରଣ ବିଭାଗ',
    govt: 'ଭାରତ ସରକାର',
    searchPlaceholder: 'ସନ୍ଧାନ...',
    newsTitle: 'ଖବର / ଘଟଣା',
    schemesTitle: 'ମୁଖ୍ୟ ଯୋଜନା',
    viewAll: 'ସମସ୍ତ ଦେଖନ୍ତୁ'
  },
  pa: {
    ...DEFAULT_EN,
    ministryName: 'ਸਮਾਜਿਕ ਨਿਆਂ ਅਤੇ ਅਧਿਕਾਰਤਾ ਵਿਭਾਗ',
    ministryParent: 'ਸਮਾਜਿਕ ਨਿਆਂ ਅਤੇ ਅਧਿਕਾਰਤਾ ਮੰਤਰਾਲੇ',
    govt: 'ਭਾਰਤ ਸਰਕਾਰ',
    searchPlaceholder: 'ਖੋਜ...',
    login: 'ਲਾਗਿਨ',
    newsTitle: 'ਖ਼ਬਰਾਂ / ਸਮਾਗਮ',
    schemesTitle: 'ਮੁੱਖ ਸਕੀਮਾਂ',
    viewAll: 'ਸਭ ਦੇਖੋ'
  },
  sa: { ...DEFAULT_EN, ministryName: 'सामाजिकन्याय-सशक्तीकरणविभागः', govt: 'भारतसर्वकारः' },
  sd: { ...DEFAULT_EN, ministryName: 'سماجي انصاف ۽ بااختيار بڻائڻ وارو کاتو' },
  ta: {
    ...DEFAULT_EN,
    ministryName: 'சமூக நீதி மற்றும் அதிகாரமளித்தல் துறை',
    ministryParent: 'சமூக நீதி மற்றும் அதிகாரமளித்தல் அமைச்சகம்',
    govt: 'இந்திய அரசு',
    searchPlaceholder: 'தேடு...',
    login: 'உள்நுழைக',
    newsTitle: 'செய்திகள் / நிகழ்வுகள்',
    schemesTitle: 'முக்கிய திட்டங்கள்',
    viewAll: 'அனைத்தையும் காண்க'
  },
  te: {
    ...DEFAULT_EN,
    ministryName: 'సామాజిక న్యాయం మరియు సాధికారత శాఖ',
    ministryParent: 'సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ',
    govt: 'భారత ప్రభుత్వం',
    searchPlaceholder: 'శోధించండి...',
    login: 'లాగిన్',
    newsTitle: 'వార్తలు / ఈవెంట్‌లు',
    schemesTitle: 'ప్రధాన పథకాలు',
    viewAll: 'అన్నీ వీక్షించండి'
  },
  ur: { ...DEFAULT_EN, ministryName: 'محکمہ سماجی انصاف اور تفویض اختیارات', govt: 'حکومت ہند', login: 'لاگ ان' },
  mai: { ...DEFAULT_EN, ministryName: 'सामाजिक न्याय आर अधिकारिता विभाग' },
  doi: { ...DEFAULT_EN },
  brx: { ...DEFAULT_EN },
  sat: { ...DEFAULT_EN }
};

// Translations for the main Navigation Bar Items
export const NAV_TRANSLATIONS: Record<string, Record<string, string>> = {
  'Home': { hi: 'मुखपृष्ठ', bn: 'হোম', mr: 'मुख्यपृष्ठ', ta: 'முகப்பு', te: 'హోమ్', kn: 'ಮುಖಪುಟ', ml: 'ഹോം', gu: 'ઘર' },
  'About Us': { hi: 'हमारे बारे में', bn: 'আমাদের সম্পর্কে', mr: 'आमच्याबद्दल', ta: 'எங்களைப் பற்றி', te: 'మా గురించి', kn: 'ನಮ್ಮ ಬಗ್ಗೆ', ml: 'ഞങ്ങളെക്കുറിച്ച്', gu: 'અમારા વિશે' },
  'Associated Organisations': { hi: 'संबद्ध संगठन', bn: 'সংশ্লিষ্ট সংস্থা', mr: 'संलग्न संस्था', ta: 'தொடர்புடைய நிறுவனங்கள்', te: 'అనుబంధ సంస్థలు', kn: 'ಸಂಯೋಜಿತ ಸಂಸ್ಥೆಗಳು', ml: 'ബന്ധപ്പെട്ട സ്ഥാപനങ്ങൾ', gu: 'સંલગ્ન સંસ્થાઓ' },
  'Events': { hi: 'कार्यक्रम', bn: 'ইভেন্ট', mr: 'कार्यक्रम', ta: 'நிகழ்வுகள்', te: 'ఈవెంట్‌లు', kn: 'ಕಾರ್ಯಕ್ರಮಗಳು', ml: 'ഇവന്റുകൾ', gu: 'ઇવેન્ટ્સ' },
  // ✅ Translation for new Help Centres nav item
  'Help Centres': {
    hi: 'हेल्प सेंटर',
    bn: 'হেল্প সেন্টার',
    mr: 'हेल्प सेंटर',
    ta: 'உதவி மையங்கள்',
    te: 'సహాయ కేంద్రాలు',
    kn: 'ಸಹಾಯ ಕೇಂದ್ರಗಳು',
    ml: 'ഹെൽപ്പ് സെന്റർ',
    gu: 'હેલ્પ સેન્ટર'
  },
};
