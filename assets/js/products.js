const PRODUCTS = [
    {
        id: "gem-001",
        name: "Royal Kashmir Blue Sapphire",
        category: "sapphires",
        metal: "Loose Gemstone",
        gemstone: "Sapphire",
        price: 18500,
        weight: "3.45 Carats",
        purity: "Unheated & Untreated (100% Natural)",
        images: [
            "assets/images/sapphire.png",
            "assets/images/sapphire.png",
            "assets/images/hero_gems.png"
        ],
        description: "An exceptional royal blue sapphire sourced from the legendary high-altitude mines of Kashmir. Highly coveted for its rich 'cornflower' blue hue, soft velvety texture, and unique crystal transparency. Fully certified by GIA for origin and treatment status.",
        rating: 4.9,
        featured: true,
        bestSeller: true,
        specs: {
            "Gemstone Type": "Natural Blue Sapphire (Neelam)",
            "Carat Weight": "3.45 Carats",
            "Color Grade": "Royal Blue / Cornflower",
            "Origin": "Kashmir, India",
            "Clarity": "Eye Clean",
            "Treatment": "No Heat / No Treatment",
            "Certification": "GIA Certified (Origin Report included)"
        }
    },
    {
        id: "gem-002",
        name: "Vivid Green Colombian Emerald",
        category: "emeralds",
        metal: "Loose Gemstone",
        gemstone: "Emerald",
        price: 15200,
        weight: "2.80 Carats",
        purity: "Minor Oil Treatment (Standard)",
        images: [
            "assets/images/emerald.png",
            "assets/images/emerald.png"
        ],
        description: "A high-clarity green emerald showcasing the legendary vivid green hue specific to classic Colombian mines. Displays excellent crystal structure and brilliant transparency, producing outstanding fire. Certified by IGI.",
        rating: 4.8,
        featured: false,
        bestSeller: true,
        specs: {
            "Gemstone Type": "Natural Emerald (Panna)",
            "Carat Weight": "2.80 Carats",
            "Color Grade": "Vivid Green",
            "Origin": "Muzo Mines, Colombia",
            "Clarity": "VVS",
            "Treatment": "Insignificant/Minor Oil",
            "Certification": "IGI Certified"
        }
    },
    {
        id: "gem-003",
        name: "Pigeon Blood Burmese Ruby",
        category: "rubies",
        metal: "Loose Gemstone",
        gemstone: "Ruby",
        price: 19800,
        weight: "2.15 Carats",
        purity: "Unheated Natural Gemstone",
        images: [
            "assets/images/ruby.png",
            "assets/images/ruby.png",
            "assets/images/hero_gems.png"
        ],
        description: "A rare collector-grade ruby from the Mogok valley of Myanmar, presenting the famous 'pigeon blood' red color with natural strong red fluorescence. Unheated rubies of this clarity and deep red saturation represent outstanding investment value.",
        rating: 5.0,
        featured: true,
        bestSeller: true,
        specs: {
            "Gemstone Type": "Natural Ruby (Manik)",
            "Carat Weight": "2.15 Carats",
            "Color Grade": "Vivid Red (Pigeon Blood)",
            "Origin": "Mogok, Myanmar (Burma)",
            "Clarity": "Eye Clean",
            "Treatment": "No Heat / Untreated",
            "Certification": "GIA Certified"
        }
    },
    {
        id: "gem-004",
        name: "Imperial Ceylon Yellow Sapphire",
        category: "yellow-sapphires",
        metal: "Loose Gemstone",
        gemstone: "Yellow Sapphire",
        price: 13500,
        weight: "4.10 Carats",
        purity: "Natural Heat Only (Standard)",
        images: [
            "assets/images/yellow_sapphire.png",
            "assets/images/yellow_sapphire.png"
        ],
        description: "A dazzling golden-yellow sapphire from Sri Lanka (Ceylon). Excellent emerald-cut displaying superior brilliance, high clarity, and uniform golden light distribution. Believed to bring positive astrological alignment.",
        rating: 4.8,
        featured: false,
        bestSeller: true,
        specs: {
            "Gemstone Type": "Natural Yellow Sapphire (Pukhraj)",
            "Carat Weight": "4.10 Carats",
            "Color Grade": "Vivid Golden Yellow",
            "Origin": "Ratnapura, Sri Lanka",
            "Clarity": "IF (Internally Flawless)",
            "Treatment": "Thermal Heat Only",
            "Certification": "SGL Certified"
        }
    },
    {
        id: "gem-005",
        name: "GIA Solitaire Cushion Diamond",
        category: "diamonds",
        metal: "Loose Gemstone",
        gemstone: "Diamond",
        price: 21000,
        weight: "1.05 Carats",
        purity: "VVS1 Clarity / E Color (GIA)",
        images: [
            "assets/images/ring1.png",
            "assets/images/ring1.png"
        ],
        description: "A breathtaking cushion-cut loose diamond representing GIA certified E-color and VVS1 clarity. Cut to ideal proportions to produce maximum fire, brilliance, and scintillation. Perfect for bespoke ring mounts.",
        rating: 4.9,
        featured: true,
        bestSeller: false,
        specs: {
            "Gemstone Type": "Natural Solitaire Diamond",
            "Carat Weight": "1.05 Carats",
            "Color Grade": "E (Colorless)",
            "Clarity Grade": "VVS1",
            "Cut Grade": "Excellent",
            "Fluorescence": "None",
            "Certification": "GIA Certified"
        }
    },
    {
        id: "gem-006",
        name: "Vivid Pink Mogok Sapphire",
        category: "sapphires",
        metal: "Loose Gemstone",
        gemstone: "Sapphire",
        price: 12800,
        weight: "2.50 Carats",
        purity: "Unheated Natural Gemstone",
        images: [
            "assets/images/sapphire.png",
            "assets/images/sapphire.png"
        ],
        description: "A highly saturated, natural pink sapphire exhibiting sweet pastel reflections and sparkling facets. High clarity with tiny natural silk inclusions that verify its authentic Mogok origin without heat treatments.",
        rating: 4.7,
        featured: false,
        bestSeller: false,
        specs: {
            "Gemstone Type": "Natural Pink Sapphire",
            "Carat Weight": "2.50 Carats",
            "Color Grade": "Vivid Pink",
            "Origin": "Mogok, Myanmar",
            "Clarity": "VVS2",
            "Treatment": "No Heat / Untreated",
            "Certification": "GIA Certified"
        }
    },
    {
        id: "gem-007",
        name: "Deep Forest Zambian Emerald",
        category: "emeralds",
        metal: "Loose Gemstone",
        gemstone: "Emerald",
        price: 11500,
        weight: "3.10 Carats",
        purity: "Minor Oil Treatment",
        images: [
            "assets/images/emerald.png",
            "assets/images/emerald.png"
        ],
        description: "A rich forest-green Zambian emerald. Known for its strong bluish-green tone, robust crystal texture, and remarkable transparency. Offers an attractive balance of weight and deep color saturation.",
        rating: 4.8,
        featured: false,
        bestSeller: true,
        specs: {
            "Gemstone Type": "Natural Emerald (Panna)",
            "Carat Weight": "3.10 Carats",
            "Color Grade": "Vivid Greenish Blue",
            "Origin": "Zambia",
            "Clarity": "Slight Inclusions (Typical)",
            "Treatment": "Minor Oil",
            "Certification": "IGI Certified"
        }
    },
    {
        id: "gem-008",
        name: "Vivid Red Mozambique Ruby",
        category: "rubies",
        metal: "Loose Gemstone",
        gemstone: "Ruby",
        price: 16400,
        weight: "2.40 Carats",
        purity: "Standard Heat Treatment",
        images: [
            "assets/images/ruby.png",
            "assets/images/ruby.png"
        ],
        description: "A vibrant, clear red ruby mined in Mozambique. Features a brilliant cushion cut and exceptional clarity with rich secondary pinkish-red undertones. Fully hallmarked and certified.",
        rating: 4.9,
        featured: true,
        bestSeller: false,
        specs: {
            "Gemstone Type": "Natural Ruby (Manik)",
            "Carat Weight": "2.40 Carats",
            "Color Grade": "Vivid Red",
            "Origin": "Montepuez, Mozambique",
            "Clarity": "Eye Clean",
            "Treatment": "Low-Temperature Heat",
            "Certification": "SGL Certified"
        }
    }
];

// Helper functions for accessing database
const getProductById = (id) => PRODUCTS.find(p => p.id === id);
const getProductsByCategory = (cat) => PRODUCTS.filter(p => p.category === cat);
const getFeaturedProducts = () => PRODUCTS.filter(p => p.featured);
const getBestSellers = () => PRODUCTS.filter(p => p.bestSeller);
const getRelatedProducts = (id, limit = 4) => {
    const target = getProductById(id);
    if (!target) return [];
    return PRODUCTS
        .filter(p => p.category === target.category && p.id !== id)
        .slice(0, limit);
};
