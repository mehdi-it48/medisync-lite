export const antecedentsTemplates = [
  { label: "Diabète Type 1", value: "Diabète de type 1" },
  { label: "Diabète Type 2", value: "Diabète de type 2" },
  { label: "Hypertension", value: "Hypertension artérielle" },
  { label: "Asthme", value: "Asthme bronchique" },
  { label: "Allergie", value: "Terrain allergique" },
  { label: "Chirurgie Cardiaque", value: "Antécédent de chirurgie cardiaque" },
  { label: "Accident Vasculaire", value: "Antécédent d'accident vasculaire cérébral (AVC)" },
  { label: "Cancer", value: "Antécédent de cancer (néoplasie)" },
  { label: "Tuberculose", value: "Antécédent de tuberculose" },
  { label: "Hépatite", value: "Antécédent d'hépatite virale" },
  { label: "Insuffisance Rénale", value: "Insuffisance rénale chronique" },
  { label: "Thyroïde", value: "Troubles thyroïdiens" },
  { label: "Chirurgie Abdominale", value: "Antécédent de chirurgie abdominale" },
  { label: "Fracture", value: "Antécédent de fracture" },
];

export const allergiesCommon = [
  "Pénicilline",
  "Amoxicilline",
  "Aspirine",
  "Ibuprofène",
  "Sulfamides",
  "Latex",
  "Iode",
  "Anesthésiques locaux",
  "Paracétamol",
  "Codéine",
  "Morphine",
  "Arachides",
  "Fruits de mer",
  "Produits laitiers",
  "Gluten",
  "Œufs",
  "Pollen",
  "Acariens",
  "Animaux domestiques",
  "Poussière",
];

export const medicamentsMaghreb = [
  // Antibiotiques
  { nom: "AMOXIL", categorie: "Antibiotique", composition: "Amoxicilline" },
  { nom: "AUGMENTIN", categorie: "Antibiotique", composition: "Amoxicilline + Acide clavulanique" },
  { nom: "CLAMOXYL", categorie: "Antibiotique", composition: "Amoxicilline" },
  { nom: "ZINNAT", categorie: "Antibiotique", composition: "Céfuroxime" },
  { nom: "CIFLOX", categorie: "Antibiotique", composition: "Ciprofloxacine" },
  { nom: "TAVANIC", categorie: "Antibiotique", composition: "Lévofloxacine" },
  { nom: "ZITHROMAX", categorie: "Antibiotique", composition: "Azithromycine" },
  { nom: "DALACINE", categorie: "Antibiotique", composition: "Clindamycine" },
  
  // Antidiabétiques
  { nom: "GLUCOPHAGE", categorie: "Antidiabétique", composition: "Metformine" },
  { nom: "DIAMICRON", categorie: "Antidiabétique", composition: "Gliclazide" },
  { nom: "AMARYL", categorie: "Antidiabétique", composition: "Glimépiride" },
  { nom: "JANUVIA", categorie: "Antidiabétique", composition: "Sitagliptine" },
  { nom: "LANTUS", categorie: "Antidiabétique", composition: "Insuline glargine" },
  { nom: "NOVORAPID", categorie: "Antidiabétique", composition: "Insuline aspart" },
  
  // Antihypertenseurs
  { nom: "COVERAM", categorie: "Antihypertenseur", composition: "Périndopril + Amlodipine" },
  { nom: "COVERSYL", categorie: "Antihypertenseur", composition: "Périndopril" },
  { nom: "AMLOR", categorie: "Antihypertenseur", composition: "Amlodipine" },
  { nom: "NORVASC", categorie: "Antihypertenseur", composition: "Amlodipine" },
  { nom: "ATACAND", categorie: "Antihypertenseur", composition: "Candésartan" },
  { nom: "COZAAR", categorie: "Antihypertenseur", composition: "Losartan" },
  { nom: "TENORMINE", categorie: "Antihypertenseur", composition: "Aténolol" },
  { nom: "SELOKEN", categorie: "Antihypertenseur", composition: "Métoprolol" },
  
  // Anticoagulants
  { nom: "SINTROM", categorie: "Anticoagulant", composition: "Acénocoumarol" },
  { nom: "PREVISCAN", categorie: "Anticoagulant", composition: "Fluindione" },
  { nom: "LOVENOX", categorie: "Anticoagulant", composition: "Énoxaparine" },
  { nom: "XARELTO", categorie: "Anticoagulant", composition: "Rivaroxaban" },
  { nom: "ELIQUIS", categorie: "Anticoagulant", composition: "Apixaban" },
  
  // Analgésiques / Anti-inflammatoires
  { nom: "DOLIPRANE", categorie: "Analgésique", composition: "Paracétamol" },
  { nom: "PANADOL", categorie: "Analgésique", composition: "Paracétamol" },
  { nom: "EFFERALGAN", categorie: "Analgésique", composition: "Paracétamol" },
  { nom: "ADVIL", categorie: "Anti-inflammatoire", composition: "Ibuprofène" },
  { nom: "NUROFEN", categorie: "Anti-inflammatoire", composition: "Ibuprofène" },
  { nom: "VOLTARENE", categorie: "Anti-inflammatoire", composition: "Diclofénac" },
  { nom: "PROFENID", categorie: "Anti-inflammatoire", composition: "Kétoprofène" },
  { nom: "CELEBREX", categorie: "Anti-inflammatoire", composition: "Célécoxib" },
  { nom: "TRAMADOL", categorie: "Analgésique", composition: "Tramadol" },
  
  // Gastro-intestinaux
  { nom: "MOPRAL", categorie: "IPP", composition: "Oméprazole" },
  { nom: "INEXIUM", categorie: "IPP", composition: "Ésoméprazole" },
  { nom: "GAVISCON", categorie: "Antacide", composition: "Alginate de sodium" },
  { nom: "MOTILIUM", categorie: "Antiémétique", composition: "Dompéridone" },
  { nom: "SMECTA", categorie: "Antidiarrhéique", composition: "Diosmectite" },
  { nom: "FORLAX", categorie: "Laxatif", composition: "Macrogol" },
  
  // Cardiologie
  { nom: "KARDEGIC", categorie: "Antiagrégant", composition: "Aspirine" },
  { nom: "PLAVIX", categorie: "Antiagrégant", composition: "Clopidogrel" },
  { nom: "CORDARONE", categorie: "Antiarythmique", composition: "Amiodarone" },
  { nom: "VASTAREL", categorie: "Antiangineuse", composition: "Trimétazidine" },
  
  // Respiratoire
  { nom: "VENTOLINE", categorie: "Bronchodilatateur", composition: "Salbutamol" },
  { nom: "SERETIDE", categorie: "Bronchodilatateur", composition: "Salmétérol + Fluticasone" },
  { nom: "CELESTENE", categorie: "Corticoïde", composition: "Bétaméthasone" },
  { nom: "SOLUPRED", categorie: "Corticoïde", composition: "Prednisolone" },
  { nom: "AERIUS", categorie: "Antihistaminique", composition: "Desloratadine" },
  { nom: "ZYRTEC", categorie: "Antihistaminique", composition: "Cétirizine" },
  
  // Psychiatrie
  { nom: "LEXOMIL", categorie: "Anxiolytique", composition: "Bromazépam" },
  { nom: "XANAX", categorie: "Anxiolytique", composition: "Alprazolam" },
  { nom: "VALIUM", categorie: "Anxiolytique", composition: "Diazépam" },
  { nom: "DEROXAT", categorie: "Antidépresseur", composition: "Paroxétine" },
  { nom: "SEROPLEX", categorie: "Antidépresseur", composition: "Escitalopram" },
  { nom: "STILNOX", categorie: "Hypnotique", composition: "Zolpidem" },
  
  // Autres
  { nom: "LEVOTHYROX", categorie: "Hormone thyroïdienne", composition: "Lévothyroxine" },
  { nom: "CALCIUM SANDOZ", categorie: "Supplément", composition: "Calcium" },
  { nom: "TARDYFERON", categorie: "Supplément", composition: "Fer" },
  { nom: "ZYMAD", categorie: "Vitamine", composition: "Vitamine D" },
  { nom: "OSTEOFORM", categorie: "Supplément", composition: "Calcium + Vitamine D" },
];
