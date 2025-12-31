// Medical Equipment Devices Data - Bilingual (EN/FR)
const devicesData = [
    {
        id: 1,
        name: {
            en: "Digital X-Ray System",
            fr: "Système de Radiographie Numérique"
        },
        description: {
            en: "Advanced digital radiography with high-resolution imaging",
            fr: "Radiographie numérique avancée avec imagerie haute résolution"
        },
        category: "imaging",
        image: "images/devices/1-photo.jpg",
        number: "MED-101",
        featured: true
    },
    {
        id: 2,
        name: {
            en: "Ultrasound Machine Pro",
            fr: "Échographe Professionnel"
        },
        description: {
            en: "Multi-frequency diagnostic ultrasound with 3D/4D capabilities",
            fr: "Échographie diagnostique multi-fréquences avec capacités 3D/4D"
        },
        category: "imaging",
        image: "images/devices/2-photo.jpg",
        number: "MED-102",
        featured: true
    },
    {
        id: 3,
        name: {
            en: "Patient Monitor Elite",
            fr: "Moniteur Patient Elite"
        },
        description: {
            en: "12-parameter vital signs monitoring with wireless connectivity",
            fr: "Surveillance des signes vitaux à 12 paramètres avec connectivité sans fil"
        },
        category: "monitoring",
        image: "images/devices/3-photo.jpg",
        number: "MED-201",
        featured: true
    },
    {
        id: 4,
        name: {
            en: "Surgical Microscope",
            fr: "Microscope Chirurgical"
        },
        description: {
            en: "High-precision optical system for microsurgery procedures",
            fr: "Système optique haute précision pour procédures de microchirurgie"
        },
        category: "surgical",
        image: "images/devices/4-photo.jpg",
        number: "MED-301",
        featured: false
    },
    {
        id: 5,
        name: {
            en: "ECG Machine 12-Lead",
            fr: "Électrocardiographe 12 Dérivations"
        },
        description: {
            en: "Professional cardiac monitoring with advanced analysis",
            fr: "Surveillance cardiaque professionnelle avec analyse avancée"
        },
        category: "diagnostic",
        image: "images/devices/5-photo.jpg",
        number: "MED-401",
        featured: true
    },
    {
        id: 6,
        name: {
            en: "MRI Scanner 3T",
            fr: "Scanner IRM 3T"
        },
        description: {
            en: "High-field MRI system with advanced imaging sequences",
            fr: "Système IRM haut champ avec séquences d'imagerie avancées"
        },
        category: "imaging",
        image: "images/devices/6-photo.jpg",
        number: "MED-103",
        featured: true
    },
    {
        id: 7,
        name: {
            en: "Ventilator ICU",
            fr: "Ventilateur de Réanimation"
        },
        description: {
            en: "Advanced mechanical ventilation for critical care",
            fr: "Ventilation mécanique avancée pour soins intensifs"
        },
        category: "respiratory",
        image: "images/devices/7-photo.jpg",
        number: "MED-501",
        featured: false
    },
    {
        id: 8,
        name: {
            en: "Anesthesia Workstation",
            fr: "Station d'Anesthésie"
        },
        description: {
            en: "Integrated anesthesia delivery and patient monitoring",
            fr: "Administration d'anesthésie intégrée et surveillance patient"
        },
        category: "surgical",
        image: "images/devices/8-photo.jpg",
        number: "MED-302",
        featured: false
    },
    {
        id: 9,
        name: {
            en: "Infusion Pump Smart",
            fr: "Pompe à Perfusion Intelligente"
        },
        description: {
            en: "Programmable drug infusion with safety protocols",
            fr: "Perfusion médicamenteuse programmable avec protocoles de sécurité"
        },
        category: "infusion",
        image: "images/devices/9-photo.jpg",
        number: "MED-601",
        featured: false
    },
    {
        id: 10,
        name: {
            en: "Defibrillator AED",
            fr: "Défibrillateur DAE"
        },
        description: {
            en: "Automated external defibrillator with voice guidance",
            fr: "Défibrillateur externe automatisé avec guidage vocal"
        },
        category: "emergency",
        image: "images/devices/10-photo.jpg",
        number: "MED-701",
        featured: true
    },
    {
        id: 11,
        name: {
            en: "CT Scanner 128-Slice",
            fr: "Scanner CT 128 Coupes"
        },
        description: {
            en: "Multi-slice computed tomography with dose reduction",
            fr: "Tomodensitométrie multi-coupes avec réduction de dose"
        },
        category: "imaging",
        image: "images/devices/1-photo.jpg",
        number: "MED-104",
        featured: true
    },
    {
        id: 12,
        name: {
            en: "Laboratory Analyzer",
            fr: "Analyseur de Laboratoire"
        },
        description: {
            en: "Automated clinical chemistry and immunoassay system",
            fr: "Système automatisé de chimie clinique et immunoessais"
        },
        category: "laboratory",
        image: "images/devices/2-photo.jpg",
        number: "MED-801",
        featured: false
    },
    {
        id: 13,
        name: {
            en: "Surgical Laser System",
            fr: "Système Laser Chirurgical"
        },
        description: {
            en: "Multi-wavelength laser for various surgical applications",
            fr: "Laser multi-longueurs d'onde pour applications chirurgicales variées"
        },
        category: "surgical",
        image: "images/devices/3-photo.jpg",
        number: "MED-303",
        featured: false
    },
    {
        id: 14,
        name: {
            en: "Dialysis Machine",
            fr: "Machine de Dialyse"
        },
        description: {
            en: "Hemodialysis system with advanced safety features",
            fr: "Système d'hémodialyse avec fonctions de sécurité avancées"
        },
        category: "renal",
        image: "images/devices/4-photo.jpg",
        number: "MED-901",
        featured: false
    },
    {
        id: 15,
        name: {
            en: "Endoscopy Tower",
            fr: "Tour d'Endoscopie"
        },
        description: {
            en: "HD video endoscopy system with recording capabilities",
            fr: "Système d'endoscopie vidéo HD avec capacités d'enregistrement"
        },
        category: "diagnostic",
        image: "images/devices/5-photo.jpg",
        number: "MED-402",
        featured: true
    },
    {
        id: 16,
        name: {
            en: "Pulse Oximeter Pro",
            fr: "Oxymètre de Pouls Pro"
        },
        description: {
            en: "Continuous SpO2 and pulse rate monitoring device",
            fr: "Dispositif de surveillance continue SpO2 et fréquence cardiaque"
        },
        category: "monitoring",
        image: "images/devices/6-photo.jpg",
        number: "MED-202",
        featured: false
    },
    {
        id: 17,
        name: {
            en: "Mammography System",
            fr: "Système de Mammographie"
        },
        description: {
            en: "Digital breast imaging with 3D tomosynthesis",
            fr: "Imagerie mammaire numérique avec tomosynthèse 3D"
        },
        category: "imaging",
        image: "images/devices/7-photo.jpg",
        number: "MED-105",
        featured: false
    },
    {
        id: 18,
        name: {
            en: "Electrosurgical Unit",
            fr: "Unité Électrochirurgicale"
        },
        description: {
            en: "Radiofrequency generator for cutting and coagulation",
            fr: "Générateur radiofréquence pour coupe et coagulation"
        },
        category: "surgical",
        image: "images/devices/8-photo.jpg",
        number: "MED-304",
        featured: false
    },
    {
        id: 19,
        name: {
            en: "Blood Gas Analyzer",
            fr: "Analyseur de Gaz du Sang"
        },
        description: {
            en: "Point-of-care testing for blood gases and electrolytes",
            fr: "Tests au point de soins pour gaz sanguins et électrolytes"
        },
        category: "laboratory",
        image: "images/devices/9-photo.jpg",
        number: "MED-802",
        featured: false
    },
    {
        id: 20,
        name: {
            en: "Fetal Monitor",
            fr: "Moniteur Fœtal"
        },
        description: {
            en: "Continuous fetal heart rate and uterine activity monitoring",
            fr: "Surveillance continue du rythme cardiaque fœtal et activité utérine"
        },
        category: "monitoring",
        image: "images/devices/10-photo.jpg",
        number: "MED-203",
        featured: false
    },
    {
        id: 21,
        name: {
            en: "C-Arm Fluoroscopy",
            fr: "Arceau de Fluoroscopie"
        },
        description: {
            en: "Mobile imaging system for surgical guidance",
            fr: "Système d'imagerie mobile pour guidage chirurgical"
        },
        category: "imaging",
        image: "images/devices/1-photo.jpg",
        number: "MED-106",
        featured: false
    },
    {
        id: 22,
        name: {
            en: "CPAP Machine",
            fr: "Machine CPAP"
        },
        description: {
            en: "Continuous positive airway pressure therapy device",
            fr: "Dispositif de thérapie par pression positive continue"
        },
        category: "respiratory",
        image: "images/devices/2-photo.jpg",
        number: "MED-502",
        featured: false
    },
    {
        id: 23,
        name: {
            en: "Autoclave Sterilizer",
            fr: "Stérilisateur Autoclave"
        },
        description: {
            en: "Steam sterilization system for medical instruments",
            fr: "Système de stérilisation vapeur pour instruments médicaux"
        },
        category: "sterilization",
        image: "images/devices/3-photo.jpg",
        number: "MED-1001",
        featured: false
    },
    {
        id: 24,
        name: {
            en: "Holter Monitor",
            fr: "Moniteur Holter"
        },
        description: {
            en: "24-hour ambulatory ECG recording system",
            fr: "Système d'enregistrement ECG ambulatoire 24 heures"
        },
        category: "diagnostic",
        image: "images/devices/4-photo.jpg",
        number: "MED-403",
        featured: false
    },
    {
        id: 25,
        name: {
            en: "Phototherapy Unit",
            fr: "Unité de Photothérapie"
        },
        description: {
            en: "LED-based treatment for neonatal jaundice",
            fr: "Traitement LED pour ictère néonatal"
        },
        category: "neonatal",
        image: "images/devices/5-photo.jpg",
        number: "MED-1101",
        featured: false
    }
];

// Categories for filtering
const categories = {
    all: { en: "All Equipment", fr: "Tous les Équipements" },
    imaging: { en: "Imaging", fr: "Imagerie" },
    monitoring: { en: "Monitoring", fr: "Surveillance" },
    surgical: { en: "Surgical", fr: "Chirurgical" },
    diagnostic: { en: "Diagnostic", fr: "Diagnostique" },
    respiratory: { en: "Respiratory", fr: "Respiratoire" },
    emergency: { en: "Emergency", fr: "Urgence" },
    laboratory: { en: "Laboratory", fr: "Laboratoire" },
    infusion: { en: "Infusion", fr: "Perfusion" },
    renal: { en: "Renal", fr: "Rénal" },
    sterilization: { en: "Sterilization", fr: "Stérilisation" },
    neonatal: { en: "Neonatal", fr: "Néonatal" }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { devicesData, categories };
}