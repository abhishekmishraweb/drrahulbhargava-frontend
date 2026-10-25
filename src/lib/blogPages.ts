import type { TreatFaq, TreatSection } from "@/lib/treatmentPages";

export type BlogPageData = {
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  intro: string[];
  sections: TreatSection[];
  faqs: TreatFaq[];
};

export const blogPages: BlogPageData[] = [
  {
    slug: "anemia-beyond-iron-deficiency",
    title: "Anemia Beyond Iron Deficiency: Causes, Symptoms & Treatment",
    date: "08 August, 2026",
    author: "Admin",
    image: "/blogs/anemia-beyond-iron-deficiency.png",
    excerpt: "Anemia is often misinterpreted as simply low iron, but the real issue may be different.",
    intro: [
      "Anemia is often misinterpreted as simply “low iron,” but the real issue may be different. Fatigue, shortness of breath, dizziness, pale skin and low energy lead many people to start iron tablets after a low hemoglobin report — which can be appropriate, but is not always the solution.",
      "Vitamin B12 or folate deficiency, chronic inflammation, kidney disease, blood loss, inherited disorders, infections and bone marrow problems can all cause anemia. Persistent or unexplained anemia should be evaluated by a hematologist rather than treated with self-prescribed iron.",
    ],
    sections: [
      {
        heading: "What is anemia?",
        paragraphs: [
          "Anemia means the blood does not have enough healthy red cells or hemoglobin to carry oxygen. The World Health Organization emphasises that anemia is not a single disease — nutritional deficiency, infection, inflammation, blood loss and inherited red-cell disorders can all be responsible.",
        ],
      },
      {
        heading: "Is all anemia caused by iron deficiency?",
        paragraphs: ["No. Iron deficiency is common, but a person may be anemic with normal iron. Giving iron without finding the cause may not raise hemoglobin."],
        bullets: [
          "Vitamin B12 or folate deficiency",
          "Chronic infection or inflammation",
          "Hidden blood loss",
          "Thalassemia and other inherited disorders",
          "Increased red-cell destruction",
          "Bone marrow disorders and some cancers",
        ],
      },
      {
        heading: "When to see a hematologist",
        bullets: [
          "Anemia that does not improve with iron",
          "Neurological symptoms (tingling, imbalance, memory change)",
          "Abnormal white cells or platelets",
          "Family history of blood disorders",
        ],
      },
    ],
    faqs: [
      { q: "Can I just take iron if my hemoglobin is low?", a: "Not always. Repeated or unexplained low hemoglobin needs a proper workup — iron studies, B12, folate, smear and, if needed, marrow tests — before long-term tablets." },
      { q: "Does B12 deficiency always look like iron deficiency?", a: "No. B12 deficiency can cause large red cells and neurological symptoms even when anemia is mild." },
    ],
  },
  {
    slug: "mrd-testing-explained",
    title: "Minimal Residual Disease (MRD) Testing Explained",
    date: "02 July, 2026",
    author: "Admin",
    image: "/blogs/mrd-testing-explained.png",
    excerpt: "Remission does not always mean every cancer cell has gone. MRD testing finds disease the microscope can miss.",
    intro: [
      "When a patient hears “your cancer is in remission,” it often brings relief. Remission does not always mean all cancer cells have disappeared. A very small number can remain hidden — too few for routine blood tests or microscopy — and later cause relapse.",
      "Minimal Residual Disease (MRD) testing has changed how doctors monitor blood cancers. Dr. Rahul Bhargava uses MRD to judge treatment depth, relapse risk and whether transplant or extra therapy is needed.",
    ],
    sections: [
      {
        heading: "What is MRD?",
        paragraphs: [
          "MRD (also called measurable residual disease) is the tiny number of cancer cells left after treatment. Sensitive tests can find one cancer cell among hundreds of thousands or millions of healthy cells.",
          "MRD-negative does not always mean a permanent cure. MRD-positive does not always mean treatment has failed. It guides the next step.",
        ],
      },
      {
        heading: "Which cancers use MRD?",
        bullets: [
          "ALL — standard after induction; guides chemo, immunotherapy and transplant.",
          "AML — flags high relapse risk so doctors can act before symptoms.",
          "Myeloma — depth of response after chemo, targeted therapy or transplant.",
          "CLL — whether targeted therapy can be stopped.",
          "Selected lymphomas, depending on subtype.",
        ],
      },
      {
        heading: "How is it tested?",
        groups: [
          { title: "Flow cytometry", bullets: ["Fast, widely available", "About 1 in 10,000–100,000 cells"] },
          { title: "PCR", bullets: ["Tracks unique genetic changes", "About 1 in 100,000–1 million"] },
          { title: "Next-generation sequencing", bullets: ["Highest sensitivity for long-term monitoring"] },
        ],
      },
    ],
    faqs: [
      { q: "Is MRD needed for every blood-cancer patient?", a: "Not always. It depends on the disease, the treatment given and current guidelines." },
      { q: "Does MRD-negative mean I am cured?", a: "It means no disease was found with that method. Regular follow-up is still essential." },
    ],
  },
  {
    slug: "how-blood-cancer-is-diagnosed-early",
    title: "How Blood Cancer Is Diagnosed Early: Symptoms, Tests and Timely Evaluation",
    date: "18 March, 2026",
    author: "Admin",
    image: "/blogs/how-blood-cancer-is-diagnosed-early.png",
    excerpt: "Blood cancers often begin silently. Early tests and specialist review change outcomes.",
    intro: [
      "Blood cancer develops when abnormal cells grow in the blood, marrow or lymphatic system. Unlike solid tumours, there is often no lump — so early diagnosis depends on symptoms, CBC findings and specialised tests.",
      "Modern hematology uses smear, marrow studies, flow cytometry and molecular tests so treatment can start before the disease is advanced.",
    ],
    sections: [
      {
        heading: "Early warning signs",
        bullets: [
          "Fatigue that does not improve with rest or iron",
          "Recurrent fever or infections",
          "Unexplained bruising, gum bleeds or petechiae",
          "Painless nodes in the neck, armpit or groin",
          "Bone or back pain, night sweats, weight loss",
        ],
      },
      {
        heading: "How diagnosis proceeds",
        bullets: [
          "CBC — first and most important screen.",
          "Peripheral smear — blasts or immature cells.",
          "Bone marrow aspiration and biopsy.",
          "Flow cytometry for exact subtype.",
          "Cytogenetics and molecular tests (e.g. BCR-ABL, FLT3, NPM1).",
          "CT/PET/MRI and myeloma protein studies when needed.",
        ],
      },
    ],
    faqs: [
      { q: "What is usually the first test?", a: "A complete blood count. Abnormal hemoglobin, white cells or platelets often trigger the rest of the workup." },
      { q: "Can a routine checkup find blood cancer?", a: "Yes. Many cases are first suspected on a yearly CBC before severe symptoms appear." },
      { q: "Is marrow biopsy always needed?", a: "In many suspected cases it is the confirmatory test that types the disease and guides therapy." },
    ],
  },
  {
    slug: "repeated-low-hemoglobin",
    title: "Why Repeated Low Hemoglobin Should Never Be Ignored",
    date: "09 March, 2026",
    author: "Admin",
    image: "/blogs/repeated-low-hemoglobin.png",
    excerpt: "A second low CBC is a pattern. Find the cause — do not only restart iron.",
    intro: [
      "Hemoglobin carries oxygen. Repeated low readings are not a diagnosis — they are a warning. Fatigue, pallor and breathlessness are often blamed on stress or diet, while the real issue may be hidden blood loss, kidney disease, marrow failure or blood cancer.",
    ],
    sections: [
      {
        heading: "Why it keeps dropping",
        bullets: [
          "Ongoing iron, B12 or folate deficiency",
          "Slow GI or menstrual blood loss",
          "Low erythropoietin in kidney disease",
          "Chronic inflammation blocking iron use",
          "Aplastic anemia, MDS or marrow infiltration",
          "Leukemia, lymphoma or myeloma",
        ],
      },
      {
        heading: "Tests that find the cause",
        bullets: ["CBC and smear", "Iron studies and ferritin", "B12 and folate", "Reticulocyte count", "Kidney and liver tests", "Stool occult blood", "Marrow exam when counts stay abnormal"],
      },
    ],
    faqs: [
      { q: "Why does hemoglobin fall again after iron?", a: "The root cause is still there — bleeding, poor absorption, inflammation or a marrow problem." },
      { q: "Can it be a sign of blood cancer?", a: "Sometimes, especially with infections, weight loss, bone pain or abnormal white cells or platelets." },
    ],
  },
  {
    slug: "small-molecule-therapies-2026",
    title: "How Targeted Small Molecule Therapies Are Changing Blood Cancer Treatment in 2026",
    date: "25 February, 2026",
    author: "Admin",
    image: "/blogs/small-molecule-therapies-2026.png",
    excerpt: "Mutation-driven oral drugs are replacing one-size-fits-all high-dose chemo for many blood cancers.",
    intro: [
      "In 2026, targeted small molecules sit at the centre of hematology: better survival, fewer side effects, and treatment chosen by mutation — FLT3, IDH, BCL-2, BTK, JAK2, menin — not only by disease name.",
    ],
    sections: [
      {
        heading: "Key drug classes",
        bullets: [
          "BCL-2 inhibitors (venetoclax) — frontline AML combinations, including older patients.",
          "FLT3 and IDH inhibitors in AML — remission, bridge to transplant.",
          "BTK inhibitors in CLL and lymphoma — oral, long-term control.",
          "JAK inhibitors in myelofibrosis and PV.",
          "Menin inhibitors for KMT2A-rearranged and NPM1-mutated AML.",
        ],
      },
      {
        heading: "What this means for patients",
        bullets: ["Often oral therapy", "Less hair loss and fewer long hospital stays", "MRD-guided duration", "Chemo is integrated, not always eliminated"],
      },
    ],
    faqs: [
      { q: "How is this different from chemotherapy?", a: "Chemo hits all rapidly dividing cells. Small molecules block specific cancer pathways and are usually better tolerated." },
      { q: "Which cancers use them?", a: "AML, CLL, myeloma, lymphomas, myelofibrosis, PV and selected high-risk genetic subtypes — after molecular testing." },
    ],
  },
  {
    slug: "gene-therapy-blood-disorders",
    title: "Gene Therapy for Blood Disorders — Future of Hematology Treatment",
    date: "16 February, 2026",
    author: "Admin",
    image: "/blogs/gene-therapy-blood-disorders.jpg",
    excerpt: "Correct the gene, not only the symptoms — thalassemia, sickle cell and hemophilia are moving toward one-time genetic care.",
    intro: [
      "Thalassemia, sickle cell disease, hemophilia and inherited marrow-failure syndromes are DNA problems. Transfusions, factor injections and even transplant manage or replace the blood system — gene therapy aims to fix the mutation itself.",
    ],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "Collect the patient’s hematopoietic stem cells.",
          "Insert or edit the gene in a specialised lab (viral vector or precision editing).",
          "Conditioning to make space in the marrow.",
          "Reinfuse corrected cells so they produce healthy blood for years.",
        ],
      },
      {
        heading: "Conditions in focus",
        bullets: ["Thalassemia — many patients become transfusion-free", "Sickle cell — fewer crises; some functionally cured", "Hemophilia — lasting factor production", "Selected immune deficiencies and inherited marrow failure"],
      },
    ],
    faqs: [
      { q: "Is it a permanent cure?", a: "Many patients get long-lasting or potentially permanent results after one treatment. It depends on disease, mutation and response." },
      { q: "How is it different from BMT?", a: "Gene therapy usually uses the patient’s own cells, so there is no donor search and much less GVHD risk." },
    ],
  },
  {
    slug: "myeloma-relapse",
    title: "Why Does Multiple Myeloma Come Back After Treatment?",
    date: "09 February, 2026",
    author: "Admin",
    image: "/blogs/myeloma-relapse.jpg",
    excerpt: "Hidden residual cells, clonal evolution and the marrow niche explain why myeloma often returns — and what we do next.",
    intro: [
      "Modern myeloma therapy achieves deep remissions, yet the disease is usually chronic and relapsing. Relapse is biology — residual cells, resistant clones, drug adaptation and a protective marrow environment — not simply “treatment failed.”",
    ],
    sections: [
      {
        heading: "Why it returns",
        bullets: [
          "MRD cells below routine tests",
          "Clonal evolution of resistant cells",
          "Drug-resistance pathways",
          "Marrow niche protection",
          "Weaker immune surveillance",
          "High-risk genetics",
        ],
      },
      {
        heading: "Options after relapse",
        bullets: ["New targeted combinations", "Monoclonal and bispecific antibodies", "CAR-T", "Selected second autologous transplant", "Maintenance to delay the next relapse"],
      },
    ],
    faqs: [
      { q: "Can relapsed myeloma be treated again?", a: "Yes. Sequential lines including immunotherapy and CAR-T often restore control and quality of life." },
      { q: "How is relapse found?", a: "Protein studies, free light chains, marrow, PET/MRI and MRD — often before symptoms." },
    ],
  },
  {
    slug: "hemophilia-knee-bleeds",
    title: "Bleeding Joints in Hemophilia: Why the Knee Is Most Commonly Affected",
    date: "28 January, 2026",
    author: "Admin",
    image: "/blogs/hemophilia-knee-bleeds.jpg",
    excerpt: "The knee takes load, shear and micro-trauma — which is why it becomes the classic target joint.",
    intro: [
      "Hemophilia is a clotting-factor deficiency (usually VIII or IX). Joint bleeds (hemarthrosis) are among the most disabling complications. The knee is hit most often, then ankle and elbow.",
    ],
    sections: [
      {
        heading: "Why the knee?",
        bullets: [
          "It bears full body weight.",
          "Daily walking creates micro-trauma in the synovium.",
          "Hinge joints have less bony protection than hips.",
          "Once it becomes a “target joint,” bleeds recur more easily.",
        ],
      },
      {
        heading: "Treatment and prevention",
        bullets: [
          "Urgent factor replacement",
          "RICE in the first hours",
          "Physiotherapy after the bleed settles",
          "Prophylaxis to stop the cycle",
          "Low-impact exercise, weight control, early treatment of even small bleeds",
        ],
      },
    ],
    faqs: [
      { q: "What is hemarthrosis?", a: "Bleeding inside a joint. Blood stretches the capsule, causing pain, warmth, swelling and, if repeated, permanent arthropathy." },
      { q: "Early signs of a knee bleed?", a: "Sudden tightness, warmth, swelling over hours, pain, limited bend/straighten, or a limp." },
    ],
  },
];

export function getBlogPage(slug: string) {
  return blogPages.find((b) => b.slug === slug);
}
