
export enum Category {
  SNACKS = 'Healthy Snacks',
  BEVERAGES = 'Juice & Smoothies',
  COMPLIMENTS = 'Healthy Compliments',
  PROGRAM = 'Nutrition Programs'
}

export enum SubCategory {
  MUFFIN = 'Muffin',
  CAKE = 'Cake',
  COOKIES = 'Cookies',
  ENERGY_BALLS = 'Energetic balls',
  GRANOLA_BAR = 'Granola Bar',
  GRANOLA = 'Granola',
  JUICE = 'Juice',
  SMOOTHIE = 'Smoothie',
  HONEY = 'Pure Honey',
  SUPERFOOD = 'Superfood',
  SPREAD = 'Healthy Spread',
  SUPPLEMENT = 'Natural Supplement',
  WEIGHT_LOSS = 'Perte de poids',
  MUSCLE_GAIN = 'Prise de masse',
  HEALTHY_LIVING = 'Alimentation saine'
}

export interface Ingredient {
  name: string;
  amount: string;
  benefit: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  subCategory: SubCategory;
  price: number;
  description: string;
  fullDescription: string;
  image: string;
  ingredients: Ingredient[];
  nutrition: {
    calories: number;
    protein: string;
    fiber: string;
    carbs?: string;
    fats?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
}

export type Page = 'home' | 'shop' | 'blog' | 'contact' | 'policies' | 'terms' | 'programs' | 'about' | 'product-details';
