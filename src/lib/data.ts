export const site = {
  name: "Dr. Rahul Bhargava",
  title: "Principal Director & Chief — Hematology, Hemato-Oncology & Bone Marrow Transplant",
  hospital: "Fortis Memorial Research Institute, Gurugram",
  phone: "+91 99997 36555",
  phoneHref: "tel:+919999736555",
  whatsapp: "https://wa.me/919999736555?text=Hello%2C%20I%20would%20like%20a%20consultation.",
  email: "drrahulbhargava@yahoo.com",
  address: "Fortis Memorial Research Institute, Near Millennium Metro Station, Gurugram, Haryana 122002",
  hours: "Mon–Sat · 9:00 AM – 6:00 PM",
  rating: "4.7",
  youtube: "https://www.youtube.com/@DrRahulBhargava1",
  socials: [
    { name: "YouTube", href: "https://www.youtube.com/@DrRahulBhargava1" },
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export const navTreatments = [
  { slug: "thalassemia", title: "Thalassemia" },
  { slug: "leukemia", title: "Leukemia" },
  { slug: "sickle-cell-anemia", title: "Sickle Cell Anemia (SCA)" },
  { slug: "bone-marrow-transplant", title: "Bone Marrow Transplant" },
  { slug: "multiple-myeloma", title: "Multiple Myeloma" },
  { slug: "car-t-cell-therapy", title: "CAR-T cell therapy" },
  { slug: "lymphoma", title: "Lymphoma" },
];

export const treatments = [
  {
    slug: "thalassemia",
    title: "Thalassemia",
    image: "/images/blood.webp",
    short: "From lifelong transfusions to a curative sibling or haploidentical transplant.",
    body: "Thalassemia is an inherited blood disorder that reduces hemoglobin production. Dr. Bhargava’s programme covers diagnosis, iron chelation, fertility-preserving counselling, matched and haploidentical transplant, and long-term survivorship — aligned with the vision of a thalassemia-free India.",
  },
  {
    slug: "leukemia",
    title: "Leukemia",
    image: "/images/blood.webp",
    short: "Acute and chronic leukemia with MRD-guided therapy and transplant when needed.",
    body: "Leukemia treatment is timed to biology. The team uses molecular diagnostics, targeted small-molecule therapies, immunotherapy, and allogeneic transplant for high-risk disease, with close infection and nutrition support throughout induction.",
  },
  {
    slug: "sickle-cell-anemia",
    title: "Sickle Cell Anemia (SCA)",
    image: "/images/bleeding-disorders.webp",
    short: "Crisis prevention, disease-modifying therapy, and transplant for selected patients.",
    body: "Sickle cell disease needs emergency excellence and a long-term plan: hydroxyurea optimisation, transfusion strategy, stroke-risk screening, and curative transplant for patients who meet criteria.",
  },
  {
    slug: "bone-marrow-transplant",
    title: "Bone Marrow Transplant",
    image: "/images/boneMarrow.webp",
    short: "Autologous, allogeneic, haploidentical and paediatric BMT — 1,500+ transplants completed.",
    body: "A bone marrow transplant replaces unhealthy blood-forming cells with healthy ones. Dr. Bhargava pioneered Medanta’s first stem cell transplant centre (2011–13) and has helped establish ten low-cost BMT centres so more families can access curative therapy.",
  },
  {
    slug: "multiple-myeloma",
    title: "Multiple Myeloma",
    image: "/images/cart-t-cell.webp",
    short: "Induction, autologous transplant, maintenance, and relapse strategies including CAR-T.",
    body: "Myeloma is increasingly a chronic, treatable cancer. Pathways include proteasome inhibitors, IMiDs, anti-CD38 antibodies, autologous stem cell transplant, and next-line options when disease returns.",
  },
  {
    slug: "car-t-cell-therapy",
    title: "CAR-T Cell Therapy",
    image: "/images/cart-t-cell.webp",
    short: "Personalised immunotherapy that reprograms a patient’s T cells against blood cancers.",
    body: "CAR T-cell therapy is used for selected relapsed/refractory lymphomas, leukemias and myeloma. Patients are evaluated for fitness, product access, CRS/ICANS monitoring, and a structured recovery plan after infusion.",
  },
  {
    slug: "lymphoma",
    title: "Lymphoma",
    image: "/images/blood.webp",
    short: "Hodgkin and non-Hodgkin lymphoma — chemo-immunotherapy, PET-adapted care, CAR-T and transplant.",
    body: "Lymphomas behave very differently by subtype. Staging, PET-CT, fertility counselling, and risk-adapted therapy (including autologous transplant and CAR-T) are coordinated so intensity matches the disease.",
  },
  {
    slug: "bleeding-disorders",
    title: "Bleeding Disorders",
    image: "/images/bleeding-disorders.webp",
    short: "Hemophilia, von Willebrand disease and platelet disorders with joint-preserving care.",
    body: "When blood cannot clot properly, joints and daily life suffer. The clinic focuses on factor replacement or non-factor therapies, inhibitor management, and preventing target-joint bleeds.",
  },
];

export const specs = [
  {
    slug: "bone-marrow-transplant",
    title: "Bone Marrow Transplant",
    tagline: "Autologous, allogeneic & haploidentical",
    desc: "One of India's highest-volume transplant programmes — pairing HEPA-filtered units with rigorous infection protocols and outcomes that match leading global centres.",
    points: [
      "Matched sibling, MUD & haploidentical transplants",
      "Dedicated HEPA-filtered BMT suites with 24×7 nursing",
      "Conditioning regimens tailored to age & disease risk",
    ],
    conditions: ["AML", "Aplastic Anemia", "Relapsed Lymphoma", "Multiple Myeloma"],
  },
  {
    slug: "leukemia",
    title: "Leukemia & Lymphoma Care",
    tagline: "Risk-stratified, MRD-guided protocols",
    desc: "From newly diagnosed AML to relapsed Hodgkin's — modern chemotherapy, targeted agents and immunotherapy, monitored with MRD testing at every milestone.",
    points: ["MRD-guided therapy", "Chemo, targeted & antibody combinations", "Coordinated transfusion care"],
    conditions: ["AML", "CLL", "Hodgkin Lymphoma", "DLBCL"],
  },
  {
    slug: "car-t-cell-therapy",
    title: "CAR-T Cell Therapy",
    tagline: "Re-engineered immune cells, real cures",
    desc: "A breakthrough immunotherapy for relapsed or refractory blood cancers — T-cells are collected, re-programmed to hunt cancer, and re-infused.",
    points: ["Complete workup & eligibility mapping", "Coordination with certified CAR-T labs", "CRS / ICANS trained team"],
    conditions: ["r/r B-ALL", "r/r DLBCL", "r/r Follicular", "Multiple Myeloma"],
  },
  {
    slug: "thalassemia",
    title: "Paediatric Hematology",
    tagline: "Gentle care for little fighters",
    desc: "Children are not small adults. Dedicated paediatric protocols, child-friendly dosing and parents involved at every step.",
    points: ["Paediatric-specific chemo protocols", "Schooling & play therapy during long stays", "Growth and nutrition monitoring"],
    conditions: ["Paediatric ALL", "ITP", "Thalassemia", "Hemophilia"],
  },
  {
    slug: "bleeding-disorders",
    title: "Anemia & Platelet Disorders",
    tagline: "Precise diagnosis, lasting relief",
    desc: "Advanced workups for anemias, ITP, TTP and clotting disorders — finding the root cause instead of endlessly patching counts.",
    points: ["Iron-study & B12 workups", "Transfusion & iron-chelation programmes", "Bleeding-disorder clinics"],
    conditions: ["Iron Deficiency", "ITP", "TTP", "Hemophilia"],
  },
  {
    slug: "thalassemia",
    title: "Thalassemia Management",
    tagline: "From lifelong care to complete cure",
    desc: "Optimised transfusion schedules, modern iron-chelation and — for eligible children — a genuine cure through matched sibling stem-cell transplant.",
    points: ["Leuco-depleted custom-matched transfusions", "Ferritin & MRI-based iron monitoring", "Curative BMT pathway"],
    conditions: ["Thalassemia Major", "Sickle Cell Disease", "Bart's Hydrops", "HbE Syndromes"],
  },
];

export const expertise = [
  {
    title: "CAR T-cell Therapy",
    href: "/treatments/car-t-cell-therapy",
    image: "/images/cart-t-cell.webp",
    text: "Chimeric antigen receptor (CAR) T-cell therapy is a type of immunotherapy that uses a patient’s T cells to treat certain blood cancers.",
  },
  {
    title: "Bone Marrow Transplant",
    href: "/treatments/bone-marrow-transplant",
    image: "/images/boneMarrow.webp",
    text: "A bone marrow transplant (BMT) is a procedure that replaces unhealthy blood-forming cells in the bone marrow with healthy ones.",
  },
  {
    title: "Bleeding Disorders",
    href: "/treatments/bleeding-disorders",
    image: "/images/bleeding-disorders.webp",
    text: "Bleeding disorders are a group of conditions that result when the blood cannot clot properly.",
  },
  {
    title: "Blood Cancers",
    href: "/treatments/leukemia",
    image: "/images/blood.webp",
    text: "Blood cancer refers to cancers affecting the blood, bone marrow, or lymphatic system, and may grow rapidly or slowly based on the type.",
  },
];

export const awards = [
  { title: "MedAchievers Healthcare Icon Award", detail: "For significant contributions in hematology and stem cell transplantation." },
  { title: "Award for Excellence in Hematology", detail: "Presented by Hon. Union Health Minister J.P. Nadda for excellence in stem cell transplantation." },
  { title: "Best Doctor Award", detail: "For achievements and diligence in healthcare (BMT Clinic)." },
  { title: "Lifetime Achievement Award", detail: "In recognition of 20+ years of leadership in oncology across India." },
  { title: "Global Health Leader Award", detail: "Awarded by WHO India for cancer care and patient advocacy." },
  { title: "National Oncology Research Medal", detail: "For clinical research and oncology publications." },
  { title: "Healthcare Visionary Award", detail: "Recognised for healthcare innovation by IMA." },
  { title: "Outstanding Educator Award", detail: "For mentoring young oncologists in India." },
  { title: "Community Oncology Award", detail: "For outreach and rural cancer awareness drives." },
];

export const blogs = [
  {
    slug: "anemia-beyond-iron-deficiency",
    date: "08 August, 2026",
    author: "Admin",
    title: "Anemia Beyond Iron Deficiency: Causes, Symptoms & Treatment",
    excerpt: "Anemia is often misinterpreted as simply low iron, but the real issue may be different.",
    image: "/blogs/anemia-beyond-iron-deficiency.png",
  },
  {
    slug: "mrd-testing-explained",
    date: "02 July, 2026",
    author: "Admin",
    title: "Minimal Residual Disease (MRD) Testing Explained",
    excerpt: "Remission does not always mean every cancer cell has gone. MRD testing finds disease the microscope can miss.",
    image: "/blogs/mrd-testing-explained.png",
  },
  {
    slug: "how-blood-cancer-is-diagnosed-early",
    date: "18 March, 2026",
    author: "Admin",
    title: "How Blood Cancer Is Diagnosed Early: Symptoms, Tests and Timely Evaluation",
    excerpt: "A detailed guide to recognising symptoms, choosing the right tests, and knowing when evaluation should not wait.",
    image: "/blogs/how-blood-cancer-is-diagnosed-early.png",
  },
  {
    slug: "repeated-low-hemoglobin",
    date: "09 March, 2026",
    author: "Admin",
    title: "Why Repeated Low Hemoglobin Should Never Be Ignored",
    excerpt: "A second low CBC is a pattern. Investigating it early can change the entire treatment window.",
    image: "/blogs/repeated-low-hemoglobin.png",
  },
  {
    slug: "small-molecule-therapies-2026",
    date: "25 February, 2026",
    author: "Admin",
    title: "How Targeted Small Molecule Therapies Are Changing Blood Cancer Treatment in 2026",
    excerpt: "TKIs, BCL-2 inhibitors and BTK blockers have rewritten what standard of care means for several blood cancers.",
    image: "/blogs/small-molecule-therapies-2026.png",
  },
  {
    slug: "gene-therapy-blood-disorders",
    date: "16 February, 2026",
    author: "Admin",
    title: "Gene Therapy for Blood Disorders — Future of Hematology Treatment",
    excerpt: "From hemoglobinopathies to hemophilia, gene therapy is moving from trials toward real clinical pathways.",
    image: "/blogs/gene-therapy-blood-disorders.jpg",
  },
  {
    slug: "myeloma-relapse",
    date: "09 February, 2026",
    author: "Admin",
    title: "Why Does Multiple Myeloma Come Back After Treatment?",
    excerpt: "Clonal evolution, residual disease and the marrow niche — and what we do when myeloma returns.",
    image: "/blogs/myeloma-relapse.jpg",
  },
  {
    slug: "hemophilia-knee-bleeds",
    date: "28 January, 2026",
    author: "Admin",
    title: "Bleeding Joints in Hemophilia: Why the Knee Is Most Commonly Affected",
    excerpt: "The knee takes load, shear and micro-trauma — which is why it becomes the classic target joint.",
    image: "/blogs/hemophilia-knee-bleeds.jpg",
  },
];

export const stories = [
  {
    initials: "MS",
    color: "#8BC34A",
    quote: "After relapsing twice in Delhi, we had almost given up. Dr. Bhargava's haploidentical transplant gave our son his childhood back.",
    name: "Meera Sharma",
    rel: "Mother of Aarav (7)",
    city: "Jaipur",
    treat: "Aplastic Anemia · Haploidentical BMT",
  },
  {
    initials: "RI",
    color: "#156F9F",
    quote: "Diagnosed with AML at 58, I was back on my morning walks within 90 days of my transplant.",
    name: "Ramesh Iyer",
    rel: "BMT survivor, 2 years",
    city: "Chennai",
    treat: "AML · Allogeneic BMT",
  },
  {
    initials: "PN",
    color: "#689F38",
    quote: "Two hospitals said I needed a transplant. Dr. Bhargava honestly said I didn't. That honesty saved me years of suffering.",
    name: "Priya Nair",
    rel: "Hodgkin survivor",
    city: "Kochi",
    treat: "Hodgkin Lymphoma",
  },
  {
    initials: "OK",
    color: "#8BC34A",
    quote: "From Lagos to Gurugram — the team handled everything. Our daughter's thalassemia is cured.",
    name: "The Okonkwo Family",
    rel: "Parents",
    city: "Lagos, Nigeria",
    treat: "Thalassemia · Sibling BMT",
  },
  {
    initials: "SB",
    color: "#156F9F",
    quote: "Yearly follow-ups, WhatsApp replies within hours. This care didn't end when I left the hospital.",
    name: "Col. S. Bedi (Retd.)",
    rel: "Myeloma follow-up, 5 years",
    city: "New Delhi",
    treat: "Multiple Myeloma",
  },
  {
    initials: "AK",
    color: "#689F38",
    quote: "After CAR-T, my lymphoma scans were clear. The team explained every side-effect before it happened — that calm made the difference.",
    name: "Ananya Kapoor",
    rel: "CAR-T survivor, 18 months",
    city: "Lucknow",
    treat: "r/r DLBCL · CAR-T Cell Therapy",
  },
];

export const videos = [
  { id: "kAxJcPwVpNM", title: "Patient story 1" },
  { id: "amWShdV4IRg", title: "Patient story 2" },
  { id: "2B8FwUIczPw", title: "Patient story 3" },
];

export const faqs = [
  {
    q: "What is a bone marrow transplant, and when is it needed?",
    a: "It's a procedure that replaces damaged marrow with healthy blood-forming stem cells. It offers a genuine cure for leukemias, aplastic anemia, thalassemia and certain immune disorders — but not every case needs one.",
  },
  {
    q: "How successful is a BMT in India?",
    a: "At good centres, matched-sibling transplants succeed in 85–90% of cases; haploidentical transplants in 70–80%. Exact odds depend on the disease, age and condition.",
  },
  {
    q: "How long will I need to stay in Gurugram?",
    a: "Allogeneic transplants typically mean 6–8 weeks in hospital plus 4–6 weeks in monitored accommodation nearby. Autologous transplants are shorter. International families receive a full logistics plan upfront.",
  },
  {
    q: "Can a relative be my donor?",
    a: "Siblings have a 1-in-4 chance of a full HLA match. Even without one, haploidentical transplant lets a parent or child donate — a technique Dr. Bhargava has performed extensively.",
  },
  {
    q: "What does a transplant cost?",
    a: "Autologous transplants typically run ₹12–18 lakh and allogeneic ₹20–30 lakh, including hospital stay. Coordinators assist with insurance pre-authorisation before you commit.",
  },
  {
    q: "Is the second opinion really free?",
    a: "Yes. Report review and the follow-up call or video consult are completely free. If your case doesn't need aggressive treatment, we will tell you exactly that.",
  },
];

export const journey = [
  {
    week: "Week 0",
    title: "Consultation & Diagnosis",
    text: "A detailed review of your reports, history and bone-marrow findings. We confirm the diagnosis and stage before anything else.",
    points: ["Full blood work & bone marrow review", "Second radiology opinion where needed", "Candid conversation about options"],
  },
  {
    week: "Week 1–3",
    title: "Planning & Donor Match",
    text: "We build your personalised protocol and identify the best donor — sibling, matched unrelated, or haploidentical.",
    points: ["HLA typing & donor registry search", "Pre-transplant fitness workup", "Financial & psychological counselling"],
  },
  {
    week: "Week 4–5",
    title: "Transplant & Conditioning",
    text: "Chemotherapy conditioning clears the marrow, then healthy stem cells are infused — like a simple transfusion.",
    points: ["7–10 day conditioning regimen", "Stem-cell infusion day (Day 0)", "Protective isolation in HEPA suite"],
  },
  {
    week: "Week 6–12",
    title: "Engraftment & Recovery",
    text: "The new marrow takes over in 2–4 weeks. Close monitoring, then a structured plan for the trip back home.",
    points: ["Daily blood counts & infection watch", "Careful immunosuppression taper", "Lifetime survivorship follow-up"],
  },
];

export const marquee = [
  "Leukemia",
  "Lymphoma",
  "Bone Marrow Transplant",
  "CAR-T Cell Therapy",
  "Thalassemia",
  "Aplastic Anemia",
  "Multiple Myeloma",
  "Platelet Disorders",
  "Hemophilia",
  "Sickle Cell Disease",
];

export const about = `Dr. Rahul Bhargava is a highly respected hematologist with over 23 years of experience in the field of hematology. He has completed more than 1,500 stem cell transplants to date. Between 2011 and 2013, Dr. Bhargava pioneered the establishment of the first stem cell transplant center at Medanta The Medicity in Gurgaon. He became the first Indian doctor in 2016 to perform and popularize stem cell transplants for multiple sclerosis.

Dr. Bhargava has played a significant role in setting up ten low-cost centers across India, including locations at Batra Hospital, Sarvodaya Hospital, and Action Balaji Hospital, among others. Driven by his vision of anemia- and thalassemia-free India, he actively partners with various government initiatives to offer affordable bone marrow transplant (BMT) treatments to a broader population.

Dr. Bhargava completed his MBBS from Barkatullah University, Bhopal, in 2001, followed by an MD in Medicine from the same institution in 2004. He later earned a DM in Clinical Hematology in 2009 from AIIMS, New Delhi.

In 2018, he took a proactive approach to community hematology by screening over 500 children in schools across Haryana and nearby areas. Furthermore, Dr. Bhargava has participated in over 1,000 Continuing Medical Education (CME) programs. He is widely regarded as one of the top hematologists in Delhi and Gurgaon and is an active member of the Delhi Hematology Society.`;

export const education = [
  "MBBS, Barkatullah University, Bhopal, 2001",
  "MD (Medicine), Barkatullah University, Bhopal, 2004",
  "DM (Clinical Hematology), AIIMS, New Delhi, 2009",
];

export const experience = [
  "Principal Director & Chief Hematology, Fortis Memorial Research Institute, Gurugram",
  "Head of Department, Artemis Hospital, Gurgaon – 2016",
  "Consultant, Medanta The Medicity, Gurgaon – 2013",
  "Senior Resident, Christian Medical College (CMC), Vellore – 2006",
];

export const memberships = [
  "American Society of Hematology (ASH)",
  "European Hematology Association (EHA)",
  "Indian Society of Hematology and Blood Transfusion (ISHBT)",
  "International Society for Stem Cell Research (ISSCR)",
  "Delhi Hematology Society",
];
