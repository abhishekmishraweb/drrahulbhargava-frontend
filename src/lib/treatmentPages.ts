export type TreatGroup = { title: string; bullets: string[] };
export type TreatSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  groups?: TreatGroup[];
};
export type TreatFaq = { q: string; a: string };
export type TreatmentPageData = {
  slug: string;
  navTitle: string;
  pageTitle: string;
  stay?: string;
  cost: string;
  success?: string;
  intro: string[];
  sections: TreatSection[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  faqs: TreatFaq[];
};

export const treatmentPages: TreatmentPageData[] = [
  {
    slug: "thalassemia",
    navTitle: "Thalassemia",
    pageTitle: "Thalassemia Treatment in India",
    stay: "3 Months",
    cost: "$25,000 – $35,000",
    success: "80–90%",
    intro: [
      "Thalassemia is a severe genetic blood disorder that requires timely and ongoing medical care, often involving blood transfusions and potentially a bone marrow transplant for a cure. For international patients seeking effective treatment at a reasonable price, India has become a leading destination for medical care.",
      "The cost of thalassemia treatment in India ranges from as low as $1,200 for routine care to $35,000 for a bone marrow transplant, depending on severity, treatment type and the patient’s needs. Compared with the USA, UK or Thailand, India offers high-quality care at nearly one-third the cost, with advanced infrastructure, internationally trained doctors and full support for foreign families.",
    ],
    sections: [
      {
        heading: "What is Thalassemia?",
        paragraphs: [
          "Thalassemia is a genetic blood disorder that affects the body’s ability to produce normal hemoglobin — the protein in red blood cells that carries oxygen. Production is reduced or abnormal, causing anemia: fatigue, weakness and pale skin.",
          "It is inherited and more common in Mediterranean, South Asian, Middle Eastern and African populations. Severity ranges from silent carrier states to transfusion-dependent thalassemia major. Over time, delayed growth, bone changes, iron overload and organ damage can occur.",
          "Modern care lets most patients live active lives. In selected children, a bone marrow transplant can offer a genuine cure.",
        ],
      },
      {
        heading: "What are the Different Types of Thalassemia?",
        groups: [
          {
            title: "Alpha thalassemia",
            bullets: [
              "Silent carrier (1 gene): usually no symptoms; can pass the gene on.",
              "Alpha thalassemia trait (2 genes): mild anemia, rarely needs treatment.",
              "Hemoglobin H disease (3 genes): moderate–severe anemia, enlarged spleen, occasional transfusions.",
              "Alpha thalassemia major / hydrops fetalis (4 genes): often fatal without intervention.",
            ],
          },
          {
            title: "Beta thalassemia",
            bullets: [
              "Minor (trait): one gene mutated; mild or no anemia; genetic counselling is essential.",
              "Intermedia: both genes affected but milder mutations; occasional transfusions during illness.",
              "Major (Cooley’s anemia): severe mutations in both genes; lifelong transfusions; BMT is the only potential cure.",
            ],
          },
          {
            title: "Other rare forms",
            bullets: ["E-beta thalassemia (common in Southeast Asia).", "Doubly heterozygous states affecting both alpha and beta genes."],
          },
        ],
      },
      {
        heading: "What are the Symptoms of Thalassemia?",
        paragraphs: ["Symptoms vary from none (carriers) to signs in the first months of life in thalassemia major."],
        groups: [
          {
            title: "Anemia",
            bullets: ["Fatigue and weakness", "Pale or yellowish skin (jaundice)", "Shortness of breath", "Dizziness", "Cold hands and feet"],
          },
          {
            title: "Children and infants",
            bullets: ["Irritability", "Poor feeding", "Delayed growth", "Frequent infections", "Failure to thrive"],
          },
          {
            title: "Bones, organs and iron overload",
            bullets: [
              "Facial bone changes and frontal bossing",
              "Enlarged spleen or liver",
              "Joint pain, bronze skin, heart and hormone problems from iron overload",
            ],
          },
        ],
      },
      {
        heading: "How is Thalassemia Diagnosed?",
        bullets: [
          "Medical history and exam — family anemia, growth delay, enlarged spleen.",
          "CBC — low hemoglobin and low MCV.",
          "Peripheral smear — microcytic, hypochromic, target cells.",
          "Hemoglobin electrophoresis / HPLC — raised HbF and HbA2 in beta-thalassemia.",
          "Genetic testing — prenatal diagnosis, carrier mapping, transplant planning.",
          "Iron studies — to distinguish from iron-deficiency anemia.",
          "Prenatal screening — CVS at 10–12 weeks or amniocentesis at 15–20 weeks.",
        ],
      },
      {
        heading: "How is Thalassemia Treated in India?",
        groups: [
          {
            title: "Blood transfusions",
            bullets: ["Primary care for moderate–severe disease, often every 2–4 weeks.", "Leuco-depleted, screened blood with strict infection control."],
          },
          {
            title: "Iron chelation",
            bullets: ["Deferoxamine, deferasirox or deferiprone to protect heart, liver and glands."],
          },
          {
            title: "Bone marrow / stem-cell transplant",
            bullets: [
              "The only established cure, especially in children with thalassemia major.",
              "Conditioning, infusion from a sibling or haploidentical donor, HEPA isolation.",
              "Offered at Fortis Memorial Research Institute, Gurugram under Dr. Rahul Bhargava.",
            ],
          },
          {
            title: "Supportive care",
            bullets: ["Folic acid, vaccinations, hormone support and counselling."],
          },
        ],
      },
      {
        heading: "What is the Cost of Thalassemia Treatment in India?",
        paragraphs: [
          "Routine care can start around $1,200 a year. A matched-sibling bone marrow transplant typically costs $24,000–$28,000; haploidentical $28,000–$32,000; unrelated-donor pathways can reach about $45,000 including matching and a longer stay.",
        ],
        bullets: [
          "Transfusions: about $150–$250 per session, $1,200–$2,500 per year.",
          "Iron chelation: $300–$1,000 per month depending on the drug.",
          "Supportive care: $300–$800 per year.",
        ],
      },
      {
        heading: "Quality of Care & International Patients",
        bullets: [
          "WHO / ASH / EBMT-aligned protocols; NABH and JCI-accredited centres such as FMRI Gurugram.",
          "HEPA-filtered BMT suites, in-house HLA typing and genetic workup.",
          "Matched-sibling paediatric survival above 85% at leading centres.",
          "Visa letters, airport pickup, translators, nearby stay and tele-follow-up after you fly home.",
        ],
      },
    ],
    table: {
      caption: "Thalassemia treatment cost: India vs other countries",
      headers: ["Country", "Bone marrow transplant", "Iron chelation (yearly)", "Transfusions (yearly)"],
      rows: [
        ["India", "$25,000 – $35,000", "$4,000 – $10,000", "$1,200 – $2,500"],
        ["USA", "$150,000 – $250,000", "$25,000+", "$15,000 – $20,000+"],
        ["UK", "$120,000 – $180,000", "$20,000+", "$12,000 – $18,000"],
        ["Thailand", "$50,000 – $70,000", "$8,000 – $12,000", "$3,500 – $5,000"],
        ["Germany", "$130,000 – $200,000", "$25,000+", "$14,000 – $19,000"],
        ["Turkey", "$40,000 – $60,000", "$10,000 – $15,000", "$4,000 – $6,000"],
      ],
    },
    faqs: [
      { q: "Is thalassemia curable?", a: "Yes — in many children with thalassemia major, a bone marrow (stem-cell) transplant from a matched or haploidentical donor can be curative." },
      { q: "What is the cost of thalassemia treatment in India?", a: "From about $1,200 for routine transfusion care up to around $35,000 for a bone marrow transplant, depending on donor type and complications." },
      { q: "How long is the hospital stay for a bone marrow transplant?", a: "Typically 3–4 weeks in hospital, plus extra time for workup and nearby monitoring. International families often plan about 3 months in India." },
      { q: "Is treatment in India safe?", a: "Leading centres follow global infection-control and transplant protocols. Fortis Memorial Research Institute, Gurugram is trusted by families from many countries." },
      { q: "Can adults undergo BMT?", a: "Children have the best outcomes, but selected adults may be eligible after a fitness and donor review with a transplant specialist." },
      { q: "How do I get a donor?", a: "HLA typing of siblings first. If there is no full match, haploidentical (parent/child) or unrelated-donor options are discussed." },
      { q: "Can I send reports before travelling?", a: "Yes. Email records for a preliminary plan and cost estimate before you book flights." },
    ],
  },
  {
    slug: "leukemia",
    navTitle: "Leukemia",
    pageTitle: "Leukemia Treatment in India",
    stay: "4–6 weeks",
    cost: "$6,000 – $36,000",
    success: "70–90%",
    intro: [
      "Leukemia originates in the blood and bone marrow and can progress quickly (acute) or slowly (chronic). India offers internationally accredited hospitals, leading hematologists and comprehensive cancer care at a fraction of Western prices.",
      "Typical packages range from ₹5,00,000 to ₹30,00,000 ($6,000–$36,000), covering chemotherapy, targeted drugs, diagnostics, hospitalisation and — when needed — bone marrow transplant.",
    ],
    sections: [
      {
        heading: "What is Leukemia?",
        paragraphs: [
          "Leukemia begins in the marrow, where abnormal white cells crowd out healthy blood production. It can spread to blood, nodes, liver, spleen and the nervous system.",
          "Risk factors include radiation, smoking, prior chemotherapy, genetic mutations and some inherited syndromes. Many types are now treatable and, when found early, curable.",
        ],
      },
      {
        heading: "Types of Leukemia",
        bullets: [
          "ALL — most common in children; intensive chemo ± transplant in high-risk cases.",
          "AML — rapid myeloid leukemia; induction (“7+3”), consolidation, often transplant.",
          "CLL — slower, typically older adults; targeted therapy and immunotherapy.",
          "CML — controlled for years with TKIs such as imatinib; transplant if resistance or blast phase.",
        ],
      },
      {
        heading: "Treatment protocol",
        groups: [
          {
            title: "Diagnosis and workup",
            bullets: ["CBC and smear", "Bone-marrow aspiration and biopsy", "Flow cytometry", "Cytogenetics / molecular tests (BCR-ABL, FLT3, NPM1, TP53)", "HLA typing if transplant is likely"],
          },
          {
            title: "First-line care",
            bullets: [
              "ALL: induction, consolidation, 1.5–2 years of maintenance, CNS prophylaxis.",
              "AML: 7+3 induction then high-dose cytarabine ± targeted drugs.",
              "CML: oral TKIs with PCR monitoring every 3 months.",
              "CLL: watch-and-wait until needed, then BTK/BCL-2 inhibitors ± antibodies.",
            ],
          },
          {
            title: "Bone marrow transplant",
            bullets: ["High-risk or relapsed AML/ALL, TKI-resistant CML.", "Matched sibling, MUD or haploidentical donors.", "Conditioning, infusion, GVHD prevention and isolation care."],
          },
        ],
      },
    ],
    faqs: [
      { q: "What is the average cost for international patients?", a: "About $6,000–$36,000 including diagnostics, chemo, targeted therapy and transplant if required." },
      { q: "Why is it more affordable in India?", a: "Lower hospital overheads, quality generic cancer drugs, high-volume protocols and shorter waits." },
      { q: "Are there long wait times?", a: "At Fortis Gurugram treatment often starts within 2–3 days of arrival." },
      { q: "Is BMT available?", a: "Yes — autologous and allogeneic programmes. Transplant packages typically run $18,000–$36,000." },
      { q: "How long will I stay in India?", a: "Chemotherapy: often 4–8 weeks. Transplant: 8–12 weeks or more for recovery." },
    ],
  },
  {
    slug: "sickle-cell-anemia",
    navTitle: "Sickle Cell Anemia (SCA)",
    pageTitle: "Sickle Cell Anemia Treatment in India",
    stay: "4–8 weeks",
    cost: "$6,000 – $30,000",
    success: "70–90%",
    intro: [
      "Sickle cell anemia changes the shape of red cells, causing anemia, pain crises and organ damage. India is a leading destination for affordable advanced care, including disease-modifying therapy and curative bone marrow transplant.",
      "Packages typically range from ₹5,00,000 to ₹25,00,000 ($6,000–$30,000), depending on whether a stem-cell transplant is planned.",
    ],
    sections: [
      {
        heading: "What is Sickle Cell Anemia?",
        paragraphs: [
          "An inherited disorder of hemoglobin. Red cells become rigid and sickle-shaped, block vessels and die early. A child must inherit the gene from both parents to have disease; one gene is sickle-cell trait.",
          "WHO estimates 300,000 children are born with SCD each year. In India it is common in tribal belts of Maharashtra, Odisha, Chhattisgarh, Madhya Pradesh and Gujarat.",
        ],
        bullets: [
          "HbSS — most severe form.",
          "HbSC — often milder, still can harm vision and joints.",
          "HbS β-thalassemia — Sβ⁰ resembles HbSS; Sβ⁺ is milder.",
        ],
      },
      {
        heading: "Symptoms",
        bullets: [
          "Chronic fatigue from anemia",
          "Pain crises in chest, abdomen, joints or limbs",
          "Hand-foot swelling in infants",
          "Infections if the spleen is damaged",
          "Delayed growth, vision problems, acute chest syndrome, stroke risk",
        ],
      },
      {
        heading: "Diagnosis & treatment",
        bullets: [
          "Newborn screening, HPLC / electrophoresis, genetic confirmation, TCD stroke screening.",
          "Hydroxyurea, vaccinations, penicillin in children, transfusion programmes.",
          "Curative BMT for selected patients with a matched or haploidentical donor at FMRI Gurugram.",
        ],
      },
    ],
    faqs: [
      { q: "Can sickle cell disease be cured?", a: "Yes — allogeneic stem-cell transplant can be curative in selected children and young adults with a suitable donor." },
      { q: "What does treatment cost in India?", a: "About $6,000–$30,000 depending on medical therapy versus transplant." },
      { q: "Do you treat international patients?", a: "Yes — visa letters, stay planning and tele-follow-up after return home." },
    ],
  },
  {
    slug: "bone-marrow-transplant",
    navTitle: "Bone Marrow Transplant",
    pageTitle: "Bone Marrow Transplant in India",
    stay: "6–10 weeks",
    cost: "$18,000 – $36,000",
    success: "70–90%",
    intro: [
      "A bone marrow (stem-cell) transplant replaces damaged marrow with healthy blood-forming cells. Dr. Rahul Bhargava’s programme at Fortis Gurugram covers autologous, allogeneic, haploidentical and paediatric transplants — more than 1,500 procedures completed.",
      "India offers HEPA-filtered units, HLA labs and outcomes comparable to major global centres at a fraction of US/UK cost.",
    ],
    sections: [
      {
        heading: "When is BMT needed?",
        bullets: ["High-risk or relapsed leukemia and lymphoma", "Aplastic anemia", "Thalassemia major and selected sickle-cell disease", "Myeloma (usually autologous)", "Some immune deficiencies"],
      },
      {
        heading: "Types of transplant",
        bullets: [
          "Autologous — patient’s own cells (myeloma, some lymphomas).",
          "Matched sibling allogeneic.",
          "Matched unrelated donor (registry).",
          "Haploidentical — parent or child when no full match exists.",
        ],
      },
      {
        heading: "The journey",
        bullets: [
          "Workup, HLA typing and donor search.",
          "Conditioning chemotherapy (and sometimes radiation).",
          "Stem-cell infusion (Day 0).",
          "Engraftment over 2–4 weeks in protective isolation.",
          "Immunosuppression taper and long-term survivorship clinic.",
        ],
      },
    ],
    faqs: [
      { q: "How successful is BMT in India?", a: "Matched-sibling transplants often succeed in 85–90% of suitable cases; haploidentical in about 70–80%, depending on disease and age." },
      { q: "How long must I stay in Gurugram?", a: "Allogeneic: typically 6–8 weeks in hospital plus 4–6 weeks nearby. Autologous stays are shorter." },
      { q: "What does it cost?", a: "Autologous roughly ₹12–18 lakh; allogeneic ₹20–30 lakh / about $18,000–$36,000 including stay, depending on donor type." },
    ],
  },
  {
    slug: "multiple-myeloma",
    navTitle: "Multiple Myeloma",
    pageTitle: "Multiple Myeloma Treatment in India",
    stay: "4–6 weeks",
    cost: "$6,000 – $35,000",
    success: "60–90%",
    intro: [
      "Multiple myeloma is a plasma-cell cancer in the bone marrow causing weak bones, kidney problems, anemia and infections. It is treatable: chemotherapy, immunotherapy, targeted drugs, steroids and often autologous stem-cell transplant.",
      "Costs in India typically range from ₹5,00,000 to ₹25,00,000 ($6,000–$35,000) — far below the USA, UK or UAE.",
    ],
    sections: [
      {
        heading: "What is Multiple Myeloma?",
        bullets: [
          "Smoldering myeloma — watch closely, no immediate treatment.",
          "Active myeloma — CRAB features, needs therapy.",
          "Light-chain myeloma — often harder on the kidneys.",
          "Non-secretory myeloma — harder to monitor with blood tests.",
        ],
      },
      {
        heading: "Signs",
        bullets: ["Back, hip or rib pain", "Easy fractures", "Fatigue", "Infections", "Thirst and frequent urination (high calcium)", "Numbness, breathlessness, leg swelling"],
      },
      {
        heading: "Treatment options",
        bullets: [
          "Proteasome inhibitors, IMiDs and anti-CD38 antibodies.",
          "Induction then autologous transplant in fit patients.",
          "Maintenance therapy to delay relapse.",
          "CAR-T and next-line options when disease returns.",
        ],
      },
    ],
    faqs: [
      { q: "Is myeloma curable?", a: "It is usually a chronic, treatable cancer. Deep remissions are common; transplant and newer drugs have greatly extended survival." },
      { q: "What does treatment cost?", a: "About $6,000–$35,000 depending on drugs and whether an autologous transplant is included." },
    ],
  },
  {
    slug: "car-t-cell-therapy",
    navTitle: "CAR-T cell therapy",
    pageTitle: "CAR-T Cell Therapy in India",
    stay: "4–8 weeks",
    cost: "On evaluation",
    success: "Case-by-case",
    intro: [
      "CAR T-cell therapy reprogrammes a patient’s own T cells to recognise and kill blood-cancer cells. It is used for selected relapsed or refractory lymphomas, B-ALL and myeloma.",
      "Dr. Bhargava’s team maps eligibility, coordinates certified manufacturing, and monitors CRS and ICANS in a dedicated unit after infusion.",
    ],
    sections: [
      {
        heading: "Who may benefit?",
        bullets: ["Relapsed/refractory DLBCL and other B-cell lymphomas", "Relapsed B-ALL", "Selected multiple myeloma after several lines"],
      },
      {
        heading: "The process",
        bullets: ["Apheresis to collect T cells", "Genetic reprogramming in a certified lab", "Lymphodepleting chemotherapy", "Infusion and inpatient CRS/ICANS watch", "Structured recovery and scan follow-up"],
      },
    ],
    faqs: [
      { q: "Is CAR-T available in India?", a: "Selected products and trials are coordinated after a full eligibility workup. Share reports for a personalised opinion." },
      { q: "What are the main risks?", a: "Cytokine-release syndrome and neurotoxicity (ICANS). These are anticipated and treated in a trained unit." },
    ],
  },
  {
    slug: "lymphoma",
    navTitle: "Lymphoma",
    pageTitle: "Lymphoma Treatment in India",
    stay: "4–8 weeks",
    cost: "$3,000 – $30,000",
    success: "Up to 90%",
    intro: [
      "Lymphoma starts in lymphocytes of the immune system. Cancerous cells collect in nodes, spleen, marrow and other organs.",
      "Treatment in India typically costs ₹2,50,000–₹25,00,000 ($3,000–$30,000) depending on subtype, stage, chemo-immunotherapy, radiation, transplant or CAR-T.",
    ],
    sections: [
      {
        heading: "Hodgkin vs Non-Hodgkin",
        bullets: [
          "Hodgkin lymphoma — Reed-Sternberg cells; high cure rates, often >85% with ABVD and PET-adapted care.",
          "Non-Hodgkin lymphoma — 60+ subtypes from indolent follicular to aggressive DLBCL (R-CHOP and related regimens).",
        ],
      },
      {
        heading: "Treatment options",
        bullets: ["Chemotherapy (ABVD, R-CHOP)", "Targeted antibodies (rituximab) and oral BTK/IMiD drugs", "Radiation for localised disease", "Autologous transplant and CAR-T in relapse"],
      },
    ],
    faqs: [
      { q: "Is lymphoma curable?", a: "Many Hodgkin and aggressive NHL subtypes are curable. Indolent NHL is often a long-term, treatable condition." },
      { q: "What does it cost in India?", a: "About $3,000–$30,000 depending on protocol and whether transplant or CAR-T is needed." },
    ],
  },
  {
    slug: "bleeding-disorders",
    navTitle: "Bleeding Disorders",
    pageTitle: "Bleeding Disorders Treatment in India",
    stay: "Outpatient / as needed",
    cost: "On evaluation",
    intro: [
      "Hemophilia, von Willebrand disease and platelet disorders need precise diagnosis and joint-preserving care so bleeds do not destroy mobility.",
    ],
    sections: [
      {
        heading: "Care we offer",
        bullets: ["Factor replacement and non-factor therapies", "Inhibitor management", "Target-joint prevention", "Family counselling and emergency plans"],
      },
    ],
    faqs: [{ q: "Do you treat hemophilia?", a: "Yes — diagnosis, prophylaxis planning and bleed management with the hematology team at Fortis Gurugram." }],
  },
];

export function getTreatmentPage(slug: string) {
  return treatmentPages.find((t) => t.slug === slug);
}
