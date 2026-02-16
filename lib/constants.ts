import { Category, SubCategory, Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  // --- SNACKS ---
  {
    id: 's1',
    name: 'Oatmeal Choco Muffin',
    category: Category.SNACKS,
    subCategory: SubCategory.MUFFIN,
    price: 25,
    description: 'Sugar-free oatmeal muffins with dark chocolate chips.',
    fullDescription: 'Nos muffins à l\'avoine et pépites de chocolat noir sont le goûter idéal pour satisfaire vos envies sucrées sans culpabilité. Préparés sans sucre raffiné, ils utilisent la douceur naturelle des fruits et le croquant du chocolat noir à 70%. Parfait pour un petit-déjeuner sur le pouce ou une collation saine.',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 180, protein: '5g', fiber: '4g', carbs: '22g', fats: '8g' },
    ingredients: [
      { name: 'Flocons d\'avoine', amount: '40g', benefit: 'Riche en fibres et énergie lente' },
      { name: 'Chocolat Noir 70%', amount: '10g', benefit: 'Antioxydants naturels' },
      { name: 'Huile de Coco', amount: '5ml', benefit: 'Graisses saines pour le métabolisme' },
      { name: 'Œufs Bio', amount: '1/2', benefit: 'Protéines de haute qualité' }
    ]
  },
  {
    id: 's2',
    name: 'Almond Energy Balls',
    category: Category.SNACKS,
    subCategory: SubCategory.ENERGY_BALLS,
    price: 45,
    description: 'Pack of 6 energy balls made with dates, almonds, and cocoa.',
    fullDescription: 'Un concentré d\'énergie pure dans une petite boule savoureuse. Nos Energy Balls sont pressées à froid pour conserver toutes les vitamines. Sans cuisson, sans gluten et véganes, elles sont le partenaire idéal de vos séances de sport ou de vos journées bien remplies.',
    image: 'https://images.unsplash.com/photo-1604423043492-4130f94c1629?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 120, protein: '3g', fiber: '2g', carbs: '15g', fats: '6g' },
    ingredients: [
      { name: 'Dattes Medjool', amount: '20g', benefit: 'Énergie rapide naturelle' },
      { name: 'Amandes effilées', amount: '15g', benefit: 'Magnésium et vitamine E' },
      { name: 'Cacao pur', amount: '5g', benefit: 'Booster de sérotonine' },
      { name: 'Graines de Chia', amount: '2g', benefit: 'Omega-3 essentiels' }
    ]
  },
  {
    id: 's3',
    name: 'Honey Nut Granola Bar',
    category: Category.SNACKS,
    subCategory: SubCategory.GRANOLA_BAR,
    price: 15,
    description: 'Crunchy granola bar with organic honey and mixed nuts.',
    fullDescription: 'Nos barres de granola artisanales sont cuites lentement au four avec du miel de l\'Atlas pour obtenir ce croquant parfait. Contrairement aux barres industrielles, nous n\'utilisons aucun sirop de glucose, seulement des ingrédients nobles.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 150, protein: '4g', fiber: '3g', carbs: '18g', fats: '7g' },
    ingredients: [
      { name: 'Avoine entière', amount: '35g', benefit: 'Satiété durable' },
      { name: 'Miel d\'Eucalyptus', amount: '10g', benefit: 'Antibactérien naturel' },
      { name: 'Noix de Grenoble', amount: '8g', benefit: 'Santé cérébrale' },
      { name: 'Graines de Courge', amount: '5g', benefit: 'Riche en Zinc' }
    ]
  },
  {
    id: 'b1',
    name: 'Green Detox Juice',
    category: Category.BEVERAGES,
    subCategory: SubCategory.JUICE,
    price: 35,
    description: 'Freshly pressed kale, spinach, green apple, and ginger.',
    fullDescription: 'Pressé à froid chaque matin, notre jus Green Detox est une véritable bombe de nutriments. Le gingembre apporte une note épicée qui réveille le métabolisme tandis que les épinards et le chou kale purifient votre système digestif.',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 95, protein: '2g', fiber: '1g', carbs: '12g', fats: '0g' },
    ingredients: [
      { name: 'Pomme Verte', amount: '150ml', benefit: 'Vitamines et fraîcheur' },
      { name: 'Épinards Bio', amount: '1 poignée', benefit: 'Fer et chlorophylle' },
      { name: 'Gingembre frais', amount: '5g', benefit: 'Anti-inflammatoire' },
      { name: 'Citron', amount: '1/2', benefit: 'Alcalinisant et Vitamine C' }
    ]
  },
  {
    id: 's4',
    name: 'Keto Walnut Cake',
    category: Category.SNACKS,
    subCategory: SubCategory.CAKE,
    price: 120,
    description: 'Gluten-free, sugar-free cake made with almond flour and walnuts.',
    fullDescription: 'Le plaisir du gâteau sans les glucides. Notre Keto Walnut Cake est spécialement conçu pour ceux qui suivent un régime cétogène ou surveillent leur glycémie. Une texture fondante et un goût riche en noix.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 320, protein: '10g', fiber: '6g', carbs: '4g', fats: '28g' },
    ingredients: [
      { name: 'Farine d\'Amande', amount: '60g', benefit: 'Faible indice glycémique' },
      { name: 'Noix de Grenoble', amount: '30g', benefit: 'Omega-3' },
      { name: 'Érythritol', amount: '15g', benefit: 'Édulcorant naturel 0 calorie' },
      { name: 'Beurre de pâturage', amount: '20g', benefit: 'Vitamines liposolubles' }
    ]
  },
  {
    id: 's5',
    name: 'Peanut Butter Cookies',
    category: Category.SNACKS,
    subCategory: SubCategory.COOKIES,
    price: 30,
    description: 'Soft-baked cookies made with 100% natural peanut butter.',
    fullDescription: 'Pour les amoureux du beurre de cacahuète. Ces cookies sont riches en protéines végétales et offrent une texture à la fois croquante et fondante.',
    image: 'https://images.unsplash.com/photo-1499636138143-bd630f5cf38a?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 160, protein: '6g', fiber: '2g', carbs: '14g', fats: '9g' },
    ingredients: [
      { name: 'Beurre de cacahuète pur', amount: '25g', benefit: 'Protéines et bonnes graisses' },
      { name: 'Farine d\'avoine', amount: '20g', benefit: 'Fibres' },
      { name: 'Pépites de choco', amount: '5g', benefit: 'Antioxydants' }
    ]
  },
  {
    id: 's6',
    name: 'Super Seed Granola',
    category: Category.SNACKS,
    subCategory: SubCategory.GRANOLA,
    price: 65,
    description: 'Large bag of toasted oats with pumpkin seeds, chia, and flax.',
    fullDescription: 'Le mélange parfait pour vos bowls. Notre Super Seed Granola regroupe les meilleures graines pour un apport complet en minéraux et vitamines dès le matin.',
    image: 'https://images.unsplash.com/photo-1517093720242-0e01e96cb6f6?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 240, protein: '7g', fiber: '9g', carbs: '28g', fats: '12g' },
    ingredients: [
      { name: 'Graines de courge', amount: '10g', benefit: 'Riche en Zinc' },
      { name: 'Graines de Lin', amount: '5g', benefit: 'Digestion' },
      { name: 'Avoine Bio', amount: '40g', benefit: 'Énergie longue durée' }
    ]
  },
  {
    id: 'b2',
    name: 'Berry Blast Smoothie',
    category: Category.BEVERAGES,
    subCategory: SubCategory.SMOOTHIE,
    price: 40,
    description: 'Mixed berries, Greek yogurt, and chia seeds.',
    fullDescription: 'Un smoothie onctueux et rafraîchissant. Le Berry Blast est riche en antioxydants et en probiotiques grâce au yaourt grec, idéal pour la récupération après l\'effort.',
    image: 'https://images.unsplash.com/photo-1623065422902-305ed54e8f8a?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 210, protein: '8g', fiber: '5g', carbs: '24g', fats: '4g' },
    ingredients: [
      { name: 'Framboises & Myrtilles', amount: '100g', benefit: 'Antioxydants' },
      { name: 'Yaourt Grec 0%', amount: '120g', benefit: 'Protéines et Calcium' },
      { name: 'Graines de Chia', amount: '5g', benefit: 'Hydratation' }
    ]
  },
  {
    id: 'c1',
    name: 'Organic Eucalyptus Honey',
    category: Category.COMPLIMENTS,
    subCategory: SubCategory.HONEY,
    price: 85,
    description: 'Pure, raw honey from the Middle Atlas mountains.',
    fullDescription: 'Récolté de manière traditionnelle, ce miel d\'eucalyptus est réputé pour ses vertus respiratoires et son goût boisé unique. Un complément santé indispensable dans votre cuisine.',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e8918dcf1?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 60, protein: '0g', fiber: '0g', carbs: '17g', fats: '0g' },
    ingredients: [
      { name: 'Miel pur d\'Eucalyptus', amount: '100%', benefit: 'Santé respiratoire' }
    ]
  },
  {
    id: 'c2',
    name: 'Raw Chia Seeds',
    category: Category.COMPLIMENTS,
    subCategory: SubCategory.SUPERFOOD,
    price: 50,
    description: 'High-quality organic chia seeds, perfect for puddings.',
    fullDescription: 'Ces petites graines sont l\'un des superaliments les plus puissants au monde. Riches en fibres et en omega-3, elles se transforment en gel au contact de l\'eau, parfait pour des puddings healthy.',
    image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 130, protein: '5g', fiber: '10g', carbs: '12g', fats: '9g' },
    ingredients: [
      { name: 'Graines de Chia Bio', amount: '100%', benefit: 'Santé cardiaque et digestive' }
    ]
  },
  {
    id: 'p1',
    name: 'Programme Perte de Poids',
    category: Category.PROGRAM,
    subCategory: SubCategory.WEIGHT_LOSS,
    price: 119,
    description: 'Repas hypocaloriques équilibrés pour mincir durablement.',
    fullDescription: 'Notre programme minceur est conçu pour créer un déficit calorique sain tout en vous apportant tous les micronutriments nécessaires. Oubliez la fatigue des régimes classiques.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 1400, protein: '120g', fiber: '35g', carbs: '130g', fats: '45g' },
    ingredients: [
      { name: 'Légumes de saison', amount: 'Abondant', benefit: 'Vitamines et satiété' },
      { name: 'Protéines maigres', amount: 'Variable', benefit: 'Maintien musculaire' }
    ]
  },
  {
    id: 'p2',
    name: 'Programme Prise de Masse',
    category: Category.PROGRAM,
    subCategory: SubCategory.MUSCLE_GAIN,
    price: 119,
    description: 'Riche en protéines et glucides complexes pour le muscle.',
    fullDescription: 'Pour ceux qui s\'entraînent dur. Ce programme apporte le surplus calorique nécessaire à la construction musculaire sans ajout de mauvaises graisses.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 2800, protein: '180g', fiber: '25g', carbs: '350g', fats: '75g' },
    ingredients: [
      { name: 'Glucides complexes', amount: 'Elevé', benefit: 'Carburant pour l\'effort' },
      { name: 'Viande/Poisson/Tofu', amount: 'Elevé', benefit: 'Synthèse protéique' }
    ]
  },
  {
    id: 'p3',
    name: 'Programme Vitalité',
    category: Category.PROGRAM,
    subCategory: SubCategory.HEALTHY_LIVING,
    price: 119,
    description: 'L\'équilibre parfait pour garder la forme au quotidien.',
    fullDescription: 'Le programme standard pour ceux qui veulent simplement manger mieux sans se soucier du calcul des calories. Équilibré, varié et délicieux.',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=800',
    nutrition: { calories: 2000, protein: '100g', fiber: '30g', carbs: '250g', fats: '65g' },
    ingredients: [
      { name: 'Ingrédients variés', amount: 'Équilibré', benefit: 'Santé globale' }
    ]
  }
];

export const PARTNERS = [
  "Moroccan Throwdown", "Inno Fashion", "Millenium", "Green Challenge", "Urbanbox", "Les Maisons Indigo"
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: '5 Benefits of Switching to Healthy Snacks',
    excerpt: 'Discover why choosing natural snacks over processed ones can change your energy levels...',
    content: 'Full content about energy, digestion, and long-term health benefits.',
    date: 'Oct 12, 2025',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    author: 'Dr. Sarah Wellness'
  },
  {
    id: 'b2',
    title: 'The Best Time to Drink Your Smoothie',
    excerpt: 'Is it better in the morning or post-workout? We dive into the science of nutrient absorption.',
    content: 'Full content about metabolism and insulin sensitivity.',
    date: 'Oct 15, 2025',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=800',
    author: 'Chef Healthy'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Yassine Alami",
    city: "Casablanca",
    text: "Les muffins au chocolat sont incroyables ! On ne sent même pas l'absence de sucre. Livraison rapide et soignée.",
    stars: 5
  },
  {
    id: 2,
    name: "Sanaa Mansouri",
    city: "Rabat",
    text: "Le pack detox m'a aidé à retrouver mon énergie après une semaine chargée. Les jus arrivent bien frais !",
    stars: 5
  },
  {
    id: 3,
    name: "Omar Berrada",
    city: "Marrakech",
    text: "Enfin un service de snacks healthy sérieux au Maroc. Les barres de granola sont parfaites pour mes randonnées.",
    stars: 4
  }
];
