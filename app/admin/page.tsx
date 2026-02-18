'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Category, SubCategory } from '@/lib/types';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

// Map each category to its valid subcategories
const CATEGORY_SUBCATEGORIES: Record<string, SubCategory[]> = {
  [Category.SNACKS]: [
    SubCategory.MUFFIN,
    SubCategory.CAKE,
    SubCategory.COOKIES,
    SubCategory.ENERGY_BALLS,
    SubCategory.GRANOLA_BAR,
    SubCategory.GRANOLA,
  ],
  [Category.BEVERAGES]: [
    SubCategory.JUICE,
    SubCategory.SMOOTHIE,
  ],
  [Category.COMPLIMENTS]: [
    SubCategory.HONEY,
    SubCategory.SUPERFOOD,
    SubCategory.SPREAD,
    SubCategory.SUPPLEMENT,
  ],
  [Category.PROGRAM]: [
    SubCategory.WEIGHT_LOSS,
    SubCategory.MUSCLE_GAIN,
    SubCategory.HEALTHY_LIVING,
  ],
};

// Helper to generate slug
const slugify = (text: string) => {
  return text.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

interface DbProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  sub_category: string;
  price: number;
  description: string;
  full_description: string;
  image: string;
  cal: number;
  protein: string;
  fiber: string;
  carbs: string;
  fats: string;
  ingredients: { name: string; amount: string; benefit: string }[];
  created_at: string;
}

const MEAL_TYPES = ['Petit-déjeuner', 'Déjeuner', 'Collation', 'Dîner'];

const PROGRAM_SUBCATEGORIES = ['Perte de poids', 'Prise de masse', 'Alimentation saine'];

interface MealItem { product_id?: string; label: string; }
interface Meal { repas: string; items: MealItem[]; }
interface DaySchedule { day: number; meals: Meal[]; }

interface DbProgram {
  id: string;
  slug: string;
  name: string;
  sub_category: string;
  price: number;
  description: string;
  full_description: string;
  image: string;
  duration: number;
  schedule: DaySchedule[];
  ingredients: { name: string; amount: string; benefit: string }[];
  cal: number;
  protein: string;
  fiber: string;
  carbs: string;
  fats: string;
  features: string[];
  created_at: string;
}

const emptyProgramForm = {
  name: '',
  slug: '',
  sub_category: 'Perte de poids',
  price: '',
  description: '',
  full_description: '',
  image: '',
  duration: '7',
  schedule: [] as DaySchedule[],
  ingredients: [{ name: '', amount: '', benefit: '' }] as { name: string; amount: string; benefit: string }[],
  cal: '',
  protein: '',
  fiber: '',
  carbs: '',
  fats: '',
  features: [
    "Barquettes micro-ondables",
    "Zéro produit congelé",
    "Option végétarienne incluse"
  ] as string[],
};

const emptyForm = {
  name: '',
  slug: '',
  category: Category.SNACKS as string,
  sub_category: SubCategory.MUFFIN as string,
  price: '',
  description: '',
  full_description: '',
  image: '',
  cal: '',
  protein: '',
  fiber: '',
  carbs: '',
  fats: '',
  ingredients: [
    { name: '', amount: '', benefit: '' },
  ],
};

export default function AdminPage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState('');
  const [customSubCategory, setCustomSubCategory] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [uploadError, setUploadError] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'programs'>('add');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Program state ──
  const [programs, setPrograms] = useState<DbProgram[]>([]);
  const [programForm, setProgramForm] = useState(emptyProgramForm);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [programUploadStatus, setProgramUploadStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [programSubmitStatus, setProgramSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeScheduleDay, setActiveScheduleDay] = useState(1);
  const programFileRef = useRef<HTMLInputElement>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  const fetchPrograms = useCallback(async () => {
    const res = await fetch('/api/programs');
    const data = await res.json();
    setPrograms(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
      } else {
        setUser(user);
        fetchProducts();
        fetchPrograms();
      }
    };
    checkUser();
  }, [fetchProducts, fetchPrograms, supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const handleIngredientChange = (idx: number, field: string, value: string) => {
    const updated = form.ingredients.map((ing, i) =>
      i === idx ? { ...ing, [field]: value } : ing
    );
    setForm({ ...form, ingredients: updated });
  };

  const addIngredient = () => {
    setForm({ ...form, ingredients: [...form.ingredients, { name: '', amount: '', benefit: '' }] });
  };

  const removeIngredient = (idx: number) => {
    if (form.ingredients.length <= 1) return;
    setForm({ ...form, ingredients: form.ingredients.filter((_, i) => i !== idx) });
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploadStatus('uploading');
    setUploadError('');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setForm(f => ({ ...f, image: data.url }));
        setUploadStatus('done');
      } else {
        setUploadError(data.error ?? 'Erreur inconnue');
        setUploadStatus('error');
        setTimeout(() => setUploadStatus('idle'), 5000);
      }
    } catch (e) {
      setUploadError(String(e));
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 5000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    // Generate slug
    const paramSlug = (form as any).slug || slugify(form.name);

    const ingredients = form.ingredients.filter(i => i.name.trim() !== '');
    // Use custom values if selected
    const finalCategory = form.category === '__custom__' ? customCategory.trim() : form.category;
    const finalSubCategory = form.sub_category === '__custom__' ? customSubCategory.trim() : form.sub_category;

    if (!finalCategory || !finalSubCategory) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    const res = await fetch(
      editingId ? `/api/products/${editingId}` : '/api/products',
      {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug: paramSlug, category: finalCategory, sub_category: finalSubCategory, ingredients }),
      }
    );

    if (res.ok) {
      setSubmitStatus('success');
      setForm(emptyForm);
      setCustomCategory('');
      setCustomSubCategory('');
      setEditingId(null);
      setUploadStatus('idle');
      fetchProducts();
      setTimeout(() => {
        setSubmitStatus('idle');
        setActiveTab('list');
      }, 1500);
    } else {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const startEdit = (p: DbProduct) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug || '',
      category: p.category,
      sub_category: p.sub_category,
      price: String(p.price),
      description: p.description,
      full_description: p.full_description,
      image: p.image,
      cal: String(p.cal ?? ''),
      protein: p.protein ?? '',
      fiber: p.fiber ?? '',
      carbs: p.carbs ?? '',
      fats: p.fats ?? '',
      ingredients: p.ingredients?.length ? p.ingredients : [{ name: '', amount: '', benefit: '' }],
    });
    setCustomCategory('');
    setCustomSubCategory('');
    setUploadStatus(p.image ? 'done' : 'idle');
    setActiveTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setCustomCategory('');
    setCustomSubCategory('');
    setUploadStatus('idle');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  // ── Program functions ──────────────────────────────────────────────────────


  const handleProgramImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setProgramUploadStatus('uploading');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setProgramForm(f => ({ ...f, image: data.url }));
        setProgramUploadStatus('done');
      } else {
        setProgramUploadStatus('error');
        setTimeout(() => setProgramUploadStatus('idle'), 4000);
      }
    } catch {
      setProgramUploadStatus('error');
      setTimeout(() => setProgramUploadStatus('idle'), 4000);
    }
  };

  // Build an empty schedule for N days
  const initSchedule = (days: number): DaySchedule[] =>
    Array.from({ length: days }, (_, i) => ({ day: i + 1, meals: [] }));

  const addMealToDay = (dayNum: number) => {
    setProgramForm(f => ({
      ...f,
      schedule: f.schedule.map(d =>
        d.day === dayNum
          ? { ...d, meals: [...d.meals, { repas: MEAL_TYPES[0], items: [{ label: '' }] }] }
          : d
      ),
    }));
  };

  const removeMealFromDay = (dayNum: number, mealIdx: number) => {
    setProgramForm(f => ({
      ...f,
      schedule: f.schedule.map(d =>
        d.day === dayNum
          ? { ...d, meals: d.meals.filter((_, i) => i !== mealIdx) }
          : d
      ),
    }));
  };

  const updateMealType = (dayNum: number, mealIdx: number, repas: string) => {
    setProgramForm(f => ({
      ...f,
      schedule: f.schedule.map(d =>
        d.day === dayNum
          ? { ...d, meals: d.meals.map((m, i) => i === mealIdx ? { ...m, repas } : m) }
          : d
      ),
    }));
  };

  const addItemToMeal = (dayNum: number, mealIdx: number) => {
    setProgramForm(f => ({
      ...f,
      schedule: f.schedule.map(d =>
        d.day === dayNum
          ? { ...d, meals: d.meals.map((m, i) => i === mealIdx ? { ...m, items: [...m.items, { label: '' }] } : m) }
          : d
      ),
    }));
  };

  const removeItemFromMeal = (dayNum: number, mealIdx: number, itemIdx: number) => {
    setProgramForm(f => ({
      ...f,
      schedule: f.schedule.map(d =>
        d.day === dayNum
          ? { ...d, meals: d.meals.map((m, i) => i === mealIdx ? { ...m, items: m.items.filter((_, ii) => ii !== itemIdx) } : m) }
          : d
      ),
    }));
  };

  const updateItemLabel = (dayNum: number, mealIdx: number, itemIdx: number, label: string, productId?: string) => {
    setProgramForm(f => ({
      ...f,
      schedule: f.schedule.map(d =>
        d.day === dayNum
          ? { ...d, meals: d.meals.map((m, i) => i === mealIdx ? {
              ...m,
              items: m.items.map((it, ii) => ii === itemIdx ? { label, product_id: productId } : it)
            } : m) }
          : d
      ),
    }));
  };

  const handleProgramSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProgramSubmitStatus('loading');
    
    // Simple slug generation if empty
    const paramSlug = (programForm as any).slug || slugify(programForm.name);

    const res = await fetch(
      editingProgramId ? `/api/programs/${editingProgramId}` : '/api/programs',
      {
        method: editingProgramId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...programForm,
          slug: paramSlug,
          price: Number(programForm.price),
          duration: Number(programForm.duration),
          cal: Number(programForm.cal),
        }),
      }
    );
    if (res.ok) {
      setProgramSubmitStatus('success');
      setProgramForm(emptyProgramForm);
      setEditingProgramId(null);
      setProgramUploadStatus('idle');
      fetchPrograms();
      setTimeout(() => setProgramSubmitStatus('idle'), 2000);
    } else {
      setProgramSubmitStatus('error');
      setTimeout(() => setProgramSubmitStatus('idle'), 3000);
    }
  };



  const handleProgramIngredientChange = (index: number, field: 'name' | 'amount' | 'benefit', value: string) => {
    const newIngredients = [...programForm.ingredients];
    newIngredients[index][field] = value;
    setProgramForm({ ...programForm, ingredients: newIngredients });
  };

  const addProgramIngredient = () => {
    setProgramForm({ ...programForm, ingredients: [...programForm.ingredients, { name: '', amount: '', benefit: '' }] });
  };

  const removeProgramIngredient = (index: number) => {
    const newIngredients = programForm.ingredients.filter((_, i) => i !== index);
    setProgramForm({ ...programForm, ingredients: newIngredients });
  };

  const startEditProgram = (p: DbProgram) => {
    setEditingProgramId(p.id);
    setProgramForm({
      name: p.name,
      slug: p.slug || '',
      sub_category: p.sub_category,
      price: String(p.price),
      description: p.description,
      full_description: p.full_description || '',
      image: p.image,
      duration: String(p.duration),
      schedule: p.schedule || [],
      ingredients: p.ingredients?.length ? p.ingredients : [{ name: '', amount: '', benefit: '' }],
      cal: String(p.cal || ''),
      protein: p.protein || '',
      fiber: p.fiber || '',
      carbs: p.carbs || '',
      fats: p.fats || '',
      features: p.features || [],
    });
    setProgramUploadStatus(p.image ? 'done' : 'idle');
    setActiveScheduleDay(1);
    setActiveTab('programs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditProgram = () => {
    setEditingProgramId(null);
    setProgramForm(emptyProgramForm);
    setProgramUploadStatus('idle');
  };

  const deleteProgram = async (id: string) => {
    if (!confirm('Supprimer ce programme ?')) return;
    await fetch(`/api/programs/${id}`, { method: 'DELETE' });
    fetchPrograms();
  };

  // ─── PIN Screen ───────────────────────────────────────────────────────────

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fcfaf8] flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </div>
    );
  }

  // ─── Admin Dashboard ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-serif font-bold text-emerald-800">HealthyBite</span>
            <span className="text-stone-300">|</span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              {products.length} produit{products.length !== 1 ? 's' : ''} en base
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-stone-400 hover:text-red-500 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-2 mb-10 bg-white p-1.5 rounded-2xl border border-stone-100 shadow-sm w-fit flex-wrap">
          <button onClick={() => setActiveTab('add')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'add' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-stone-400 hover:text-stone-700'}`}>
            + Produit
          </button>
          <button onClick={() => setActiveTab('list')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'list' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-stone-400 hover:text-stone-700'}`}>
            📦 Produits ({products.length})
          </button>
          <button onClick={() => setActiveTab('programs')} className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'programs' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-stone-400 hover:text-stone-700'}`}>
            🗓️ Programmes ({programs.length})
          </button>
        </div>

        {/* ── ADD PRODUCT FORM ── */}
        {activeTab === 'add' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 space-y-6">
                  <h2 className="text-lg font-serif font-bold text-stone-800 border-b border-stone-50 pb-4">Informations générales</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nom du produit *</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="Ex: Almond Energy Balls" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Prix (DH) *</label>
                      <input required type="number" min="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="45" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Catégorie *</label>
                      <select
                        required={form.category !== '__custom__'}
                        value={form.category}
                        onChange={e => {
                          const newCat = e.target.value;
                          const firstSub = newCat === '__custom__' ? '__custom__' : (CATEGORY_SUBCATEGORIES[newCat]?.[0] ?? '');
                          setForm({ ...form, category: newCat, sub_category: firstSub });
                          if (newCat !== '__custom__') setCustomCategory('');
                          if (firstSub !== '__custom__') setCustomSubCategory('');
                        }}
                        className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
                      >
                        {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                        <option value="__custom__">➕ Nouvelle catégorie...</option>
                      </select>
                      {form.category === '__custom__' && (
                        <input
                          required
                          value={customCategory}
                          onChange={e => setCustomCategory(e.target.value)}
                          className="w-full px-5 py-3 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all mt-2"
                          placeholder="Ex: Superfoods Bio"
                          autoFocus
                        />
                      )}
                    </div>

                    {/* Subcategory */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Sous-catégorie *</label>
                      <select
                        required={form.sub_category !== '__custom__'}
                        value={form.sub_category}
                        onChange={e => {
                          const val = e.target.value;
                          setForm({ ...form, sub_category: val });
                          if (val !== '__custom__') setCustomSubCategory('');
                        }}
                        className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
                      >
                        {(form.category === '__custom__'
                          ? Object.values(SubCategory)
                          : (CATEGORY_SUBCATEGORIES[form.category] ?? Object.values(SubCategory))
                        ).map(s => <option key={s} value={s}>{s}</option>)}
                        <option value="__custom__">➕ Nouvelle sous-catégorie...</option>
                      </select>
                      {form.sub_category === '__custom__' && (
                        <input
                          required
                          value={customSubCategory}
                          onChange={e => setCustomSubCategory(e.target.value)}
                          className="w-full px-5 py-3 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all mt-2"
                          placeholder="Ex: Barres protéinées"
                          autoFocus
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Description courte *</label>
                    <input required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      placeholder="Ex: Snack énergétique aux amandes et dattes" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Description complète</label>
                    <textarea value={form.full_description} onChange={e => setForm({ ...form, full_description: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all h-28 resize-none"
                      placeholder="Description détaillée du produit, bienfaits, mode de préparation..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Image du produit *</label>

                    {/* Upload zone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) handleImageUpload(file);
                      }}
                      className={`relative w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 py-8 ${
                        uploadStatus === 'uploading'
                          ? 'border-emerald-300 bg-emerald-50/50'
                          : uploadStatus === 'done'
                          ? 'border-emerald-400 bg-emerald-50'
                          : uploadStatus === 'error'
                          ? 'border-red-300 bg-red-50'
                          : 'border-stone-200 bg-stone-50 hover:border-emerald-300 hover:bg-emerald-50/30'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                      />
                      {uploadStatus === 'uploading' ? (
                        <>
                          <svg className="animate-spin h-7 w-7 text-emerald-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          <span className="text-xs font-bold text-emerald-600">Envoi en cours...</span>
                        </>
                      ) : uploadStatus === 'done' && form.image ? (
                        <>
                          <div className="relative w-28 h-28 rounded-2xl overflow-hidden shadow-md">
                            <Image src={form.image} alt="preview" fill className="object-cover" />
                          </div>
                          <span className="text-xs font-bold text-emerald-600">✅ Image téléchargée</span>
                          <span className="text-[10px] text-stone-400">Cliquer pour changer</span>
                        </>
                      ) : uploadStatus === 'error' ? (
                        <>
                          <span className="text-2xl">❌</span>
                          <span className="text-xs font-bold text-red-500">Erreur d&apos;upload</span>
                          {uploadError && (
                            <span className="text-[10px] text-red-400 text-center px-4 max-w-xs">{uploadError}</span>
                          )}
                          <span className="text-[10px] text-stone-400">Cliquer pour réessayer</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div className="text-center">
                            <p className="text-xs font-bold text-stone-500">Glisser une image ici</p>
                            <p className="text-[10px] text-stone-400 mt-0.5">ou <span className="text-emerald-600 font-bold">cliquer pour parcourir</span></p>
                            <p className="text-[9px] text-stone-300 mt-1">JPG, PNG, WebP — max 5 Mo</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* URL fallback */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-stone-100" />
                      <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">ou coller une URL</span>
                      <div className="flex-1 h-px bg-stone-100" />
                    </div>
                    <input
                      value={uploadStatus === 'done' ? '' : form.image}
                      onChange={e => {
                        setForm({ ...form, image: e.target.value });
                        setUploadStatus('idle');
                      }}
                      className="w-full px-5 py-3 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-stone-500"
                      placeholder="https://..."
                    />
                    {/* Hidden required input to enforce validation */}
                    <input type="text" required readOnly value={form.image} className="sr-only" tabIndex={-1} />
                  </div>
                </div>

                {/* Ingredients */}
                <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-50 pb-4">
                    <h2 className="text-lg font-serif font-bold text-stone-800">Ingrédients</h2>
                    <span className="text-xs font-bold text-stone-400 bg-stone-50 px-3 py-1 rounded-full">
                      {form.ingredients.length} ingrédient{form.ingredients.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {form.ingredients.map((ing, idx) => (
                      <div key={idx} className="grid grid-cols-3 gap-3 p-4 bg-stone-50 rounded-2xl relative group/ing">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Ingrédient {idx + 1}</label>
                          <input value={ing.name} onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400 transition-all border border-stone-100"
                            placeholder="Ex: Amandes" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Quantité</label>
                          <input value={ing.amount} onChange={e => handleIngredientChange(idx, 'amount', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400 transition-all border border-stone-100"
                            placeholder="Ex: 15g" />
                        </div>
                        <div className="space-y-1 pr-8">
                          <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Bénéfice</label>
                          <input value={ing.benefit} onChange={e => handleIngredientChange(idx, 'benefit', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400 transition-all border border-stone-100"
                            placeholder="Ex: Riche en Magnésium" />
                        </div>
                        {form.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(idx)}
                            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover/ing:opacity-100"
                            title="Supprimer"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addIngredient}
                    className="w-full py-3 rounded-2xl border-2 border-dashed border-stone-200 text-stone-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter un ingrédient
                  </button>
                </div>
              </div>

              {/* Right column — Nutrition */}
              <div className="space-y-6">
                <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 space-y-5 sticky top-24">
                  <h2 className="text-lg font-serif font-bold text-stone-800 border-b border-stone-50 pb-4">Valeurs nutritionnelles</h2>
                  {[
                    { key: 'cal', label: 'Calories (kcal)', placeholder: '180' },
                    { key: 'protein', label: 'Protéines', placeholder: '5g' },
                    { key: 'fiber', label: 'Fibres', placeholder: '4g' },
                    { key: 'carbs', label: 'Glucides', placeholder: '22g' },
                    { key: 'fats', label: 'Lipides', placeholder: '8g' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</label>
                      <input
                        value={(form as any)[key]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-5 py-3 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}


                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full mt-4 bg-emerald-700 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-700/20 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {submitStatus === 'loading' ? (
                      <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Enregistrement...</>
                    ) : submitStatus === 'success' ? (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>{editingId ? 'Modifié !' : 'Produit ajouté !'}</>
                    ) : (
                      editingId ? '✏️ Enregistrer les modifications' : '+ Publier le produit'
                    )}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="w-full mt-2 py-3 rounded-2xl border-2 border-stone-200 text-stone-500 font-bold hover:border-stone-300 hover:bg-stone-50 transition-all text-sm"
                    >
                      Annuler les modifications
                    </button>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-500 text-xs font-bold text-center">Erreur lors de l&apos;enregistrement.</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ── PRODUCT LIST ── */}
        {activeTab === 'list' && (
          <div>
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="animate-spin h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <p className="text-5xl mb-4">📦</p>
                <p className="font-bold">Aucun produit en base de données.</p>
                <button onClick={() => setActiveTab('add')} className="mt-4 text-emerald-600 font-bold hover:underline text-sm">
                  + Ajouter le premier produit
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map(p => (
                  <div key={p.id} className="bg-white rounded-[1.5rem] border border-stone-100 shadow-sm p-5 flex items-center gap-5 group hover:shadow-md transition-all">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-50 flex-shrink-0">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{p.category}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 bg-stone-50 px-2 py-0.5 rounded-full">{p.sub_category}</span>
                      </div>
                      <h3 className="font-bold text-stone-800 truncate">{p.name}</h3>
                      <p className="text-xs text-stone-400 truncate mt-0.5">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-lg font-bold text-emerald-800">{p.price} DH</span>
                      <button
                        onClick={() => startEdit(p)}
                        className="p-2 text-stone-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                        title="Modifier"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Supprimer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROGRAMS TAB ── */}
        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Program Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleProgramSubmit} className="space-y-6">
                <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 space-y-6">
                  <h2 className="text-lg font-serif font-bold text-stone-800 border-b border-stone-50 pb-4">
                    {editingProgramId ? '✏️ Modifier le programme' : '+ Nouveau programme'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nom du programme *</label>
                      <input required value={programForm.name} onChange={e => setProgramForm({...programForm, name: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="Ex: Programme Perte de Poids 7j" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Prix (DH/jour) *</label>
                      <input required type="number" min="0" value={programForm.price} onChange={e => setProgramForm({...programForm, price: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="150" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Type de programme *</label>
                      <select value={programForm.sub_category} onChange={e => setProgramForm({...programForm, sub_category: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
                        {PROGRAM_SUBCATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Durée (jours) *</label>
                      <input required type="number" min="1" max="30" value={programForm.duration}
                        onChange={e => {
                          const d = Number(e.target.value);
                          setProgramForm({...programForm, duration: e.target.value, schedule: initSchedule(d)});
                          setActiveScheduleDay(1);
                        }}
                        className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="7" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Description courte *</label>
                    <input required value={programForm.description} onChange={e => setProgramForm({...programForm, description: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      placeholder="Programme équilibré pour perdre du poids sainement..." />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Description complète</label>
                    <textarea rows={3} value={programForm.full_description} onChange={e => setProgramForm({...programForm, full_description: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                      placeholder="Détails du programme, objectifs, conseils..." />
                  </div>

                  {/* Image upload */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Image du programme *</label>
                    <div
                      onClick={() => programFileRef.current?.click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleProgramImageUpload(f); }}
                      className={`relative w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 py-8 ${
                        programUploadStatus === 'uploading' ? 'border-emerald-300 bg-emerald-50/50'
                        : programUploadStatus === 'done' ? 'border-emerald-400 bg-emerald-50'
                        : 'border-stone-200 bg-stone-50 hover:border-emerald-300 hover:bg-emerald-50/30'
                      }`}
                    >
                      <input ref={programFileRef} type="file" accept="image/*" className="hidden"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleProgramImageUpload(f); }} />
                      {programUploadStatus === 'uploading' ? (
                        <><svg className="animate-spin h-7 w-7 text-emerald-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg><span className="text-xs font-bold text-emerald-600">Envoi en cours...</span></>
                      ) : programUploadStatus === 'done' && programForm.image ? (
                        <><div className="relative w-28 h-20 rounded-2xl overflow-hidden shadow-md"><Image src={programForm.image} alt="preview" fill className="object-cover" /></div><span className="text-xs font-bold text-emerald-600">✅ Image téléchargée</span><span className="text-[10px] text-stone-400">Cliquer pour changer</span></>
                      ) : (
                        <><svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <div className="text-center"><p className="text-xs font-bold text-stone-500">Glisser une image ici</p><p className="text-[10px] text-stone-400 mt-0.5">ou <span className="text-emerald-600 font-bold">cliquer pour parcourir</span></p></div></>
                      )}
                    </div>
                    <input value={programUploadStatus === 'done' ? '' : programForm.image}
                      onChange={e => { setProgramForm({...programForm, image: e.target.value}); setProgramUploadStatus('idle'); }}
                      className="w-full px-5 py-3 rounded-xl bg-stone-50 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-stone-500"
                      placeholder="ou coller une URL..." />
                    <input type="text" required readOnly value={programForm.image} className="sr-only" tabIndex={-1} />
                  </div>
                </div>

                  {/* Ingredients */}
                  <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-50 pb-4">
                      <h2 className="text-lg font-serif font-bold text-stone-800">Ingrédients</h2>
                      <span className="text-xs font-bold text-stone-400 bg-stone-50 px-3 py-1 rounded-full">
                        {programForm.ingredients?.length || 0} ingrédient{(programForm.ingredients?.length || 0) !== 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {programForm.ingredients?.map((ing, idx) => (
                        <div key={idx} className="grid grid-cols-3 gap-3 p-4 bg-stone-50 rounded-2xl relative group/ing">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Ingrédient {idx + 1}</label>
                            <input value={ing.name} onChange={e => handleProgramIngredientChange(idx, 'name', e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl bg-white text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400 transition-all border border-stone-100"
                              placeholder="Ex: Amandes" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Quantité</label>
                            <input value={ing.amount} onChange={e => handleProgramIngredientChange(idx, 'amount', e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl bg-white text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400 transition-all border border-stone-100"
                              placeholder="Ex: 15g" />
                          </div>
                          <div className="space-y-1 pr-8">
                            <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Bénéfice</label>
                            <input value={ing.benefit} onChange={e => handleProgramIngredientChange(idx, 'benefit', e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl bg-white text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400 transition-all border border-stone-100"
                              placeholder="Ex: Riche en Magnésium" />
                          </div>
                          {programForm.ingredients.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeProgramIngredient(idx)}
                              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover/ing:opacity-100"
                              title="Supprimer"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addProgramIngredient}
                      className="w-full py-3 rounded-xl border-2 border-dashed border-stone-200 text-stone-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all text-xs font-bold uppercase tracking-widest"
                    >
                      + Ajouter un ingrédient
                    </button>
                  </div>

                  {/* Nutrition */}
                  <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 space-y-5">
                    <h2 className="text-lg font-serif font-bold text-stone-800 border-b border-stone-50 pb-4">Valeurs nutritionnelles (moyenne journalière)</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      {[
                        { key: 'cal', label: 'Calories (kcal)', placeholder: '1200' },
                        { key: 'protein', label: 'Protéines', placeholder: '90g' },
                        { key: 'fiber', label: 'Fibres', placeholder: '25g' },
                        { key: 'carbs', label: 'Glucides', placeholder: '110g' },
                        { key: 'fats', label: 'Lipides', placeholder: '45g' },
                      ].map(({ key, label, placeholder }) => (
                        <div key={key} className="space-y-1.5">
                          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</label>
                          <input
                            value={(programForm as any)[key]}
                            onChange={e => setProgramForm({ ...programForm, [key]: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-stone-50 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-500 transition-all border border-stone-100"
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features Builder */}
                  <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-50 pb-4">
                      <h2 className="text-lg font-serif font-bold text-stone-800">Points Forts (Features)</h2>
                      <span className="text-xs font-bold text-stone-400 bg-stone-50 px-3 py-1 rounded-full">{programForm.features?.length || 0}</span>
                    </div>
                    <div className="space-y-3">
                      {(programForm.features?.length > 0 ? programForm.features : [
                        "Barquettes micro-ondables",
                        "Zéro produit congelé",
                        "Option végétarienne incluse"
                      ]).map((feat, idx) => (
                        <div key={idx} className="flex gap-2 relative group/feat">
                          <input
                            value={feat}
                            onChange={e => {
                              const currentFeatures = programForm.features?.length > 0 ? programForm.features : ["Barquettes micro-ondables", "Zéro produit congelé", "Option végétarienne incluse"];
                              const newFeatures = [...currentFeatures];
                              newFeatures[idx] = e.target.value;
                              setProgramForm({ ...programForm, features: newFeatures });
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-stone-50 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400 transition-all border border-stone-100"
                            placeholder="Ex: Barquettes micro-ondables"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const currentFeatures = programForm.features?.length > 0 ? programForm.features : ["Barquettes micro-ondables", "Zéro produit congelé", "Option végétarienne incluse"];
                              const newFeatures = currentFeatures.filter((_, i) => i !== idx);
                              setProgramForm({ ...programForm, features: newFeatures });
                            }}
                            className="w-10 flex items-center justify-center rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-all"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const currentFeatures = programForm.features?.length > 0 ? programForm.features : ["Barquettes micro-ondables", "Zéro produit congelé", "Option végétarienne incluse"];
                          setProgramForm({ ...programForm, features: [...currentFeatures, ''] });
                        }}
                        className="w-full py-3 rounded-2xl border-2 border-dashed border-stone-200 text-stone-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                        + Ajouter un point fort
                      </button>
                    </div>
                  </div>

                {/* Schedule Builder */}
                {programForm.schedule.length > 0 && (
                  <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-8 space-y-6">
                    <h2 className="text-lg font-serif font-bold text-stone-800 border-b border-stone-50 pb-4">🗓️ Planning des repas</h2>

                    {/* Day tabs */}
                    <div className="flex gap-2 flex-wrap">
                      {programForm.schedule.map(d => (
                        <button key={d.day} type="button" onClick={() => setActiveScheduleDay(d.day)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                            activeScheduleDay === d.day ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-50 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}>
                          Jour {d.day}
                        </button>
                      ))}
                    </div>

                    {/* Meals for active day */}
                    {programForm.schedule.filter(d => d.day === activeScheduleDay).map(dayData => (
                      <div key={dayData.day} className="space-y-4">
                        {dayData.meals.map((meal, mi) => (
                          <div key={mi} className="border border-stone-100 rounded-2xl p-5 space-y-3 bg-stone-50/50">
                            <div className="flex items-center gap-3">
                              <select value={meal.repas} onChange={e => updateMealType(dayData.day, mi, e.target.value)}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-stone-100 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500">
                                {MEAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                              </select>
                              <button type="button" onClick={() => removeMealFromDay(dayData.day, mi)}
                                className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                            </div>
                            {/* Items */}
                            <div className="space-y-2 pl-2">
                              {meal.items.map((item, ii) => (
                                <div key={ii} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                  <select
                                    value={item.product_id || ''}
                                    onChange={e => {
                                      const prod = products.find(p => p.id === e.target.value);
                                      updateItemLabel(dayData.day, mi, ii, prod ? prod.name : '', prod?.id);
                                    }}
                                    className="px-3 py-2 rounded-lg bg-white border border-stone-100 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400 text-stone-500"
                                  >
                                    <option value="">— Produit (optionnel)</option>
                                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                  </select>
                                  <input value={item.label} onChange={e => updateItemLabel(dayData.day, mi, ii, e.target.value, item.product_id)}
                                    className="flex-1 px-3 py-2 rounded-lg bg-white border border-stone-100 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-400"
                                    placeholder="Ex: Smoothie banane-épinards" />
                                  <button type="button" onClick={() => removeItemFromMeal(dayData.day, mi, ii)}
                                    className="text-stone-300 hover:text-red-400 transition-colors text-lg leading-none">✕</button>
                                </div>
                              ))}
                              <button type="button" onClick={() => addItemToMeal(dayData.day, mi)}
                                className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest ml-3">
                                + Ajouter un item
                              </button>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => addMealToDay(dayData.day)}
                          className="w-full py-3 rounded-2xl border-2 border-dashed border-stone-200 text-stone-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all text-xs font-bold uppercase tracking-widest">
                          + Ajouter un repas
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={programSubmitStatus === 'loading'}
                  className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-700/20 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2">
                  {programSubmitStatus === 'loading' ? (
                    <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Enregistrement...</>
                  ) : programSubmitStatus === 'success' ? (
                    <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>{editingProgramId ? 'Modifié !' : 'Programme publié !'}</>
                  ) : (
                    editingProgramId ? '✏️ Enregistrer les modifications' : '+ Publier le programme'
                  )}
                </button>
                {editingProgramId && (
                  <button type="button" onClick={cancelEditProgram}
                    className="w-full py-3 rounded-2xl border-2 border-stone-200 text-stone-500 font-bold hover:bg-stone-50 transition-all text-sm">
                    Annuler les modifications
                  </button>
                )}
              </form>
            </div>

            {/* Right: Program List */}
            <div className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-stone-800">Programmes publiés</h2>
              {programs.length === 0 ? (
                <div className="text-center py-12 text-stone-400 bg-white rounded-[2rem] border border-stone-100">
                  <p className="text-4xl mb-3">🗓️</p>
                  <p className="text-sm font-bold">Aucun programme</p>
                </div>
              ) : (
                programs.map(p => (
                  <div key={p.id} className="bg-white rounded-[1.5rem] border border-stone-100 shadow-sm p-5 group hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-50 flex-shrink-0">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{p.sub_category}</span>
                        <h3 className="font-bold text-stone-800 truncate mt-1">{p.name}</h3>
                        <p className="text-xs text-stone-400 mt-0.5">📅 {p.duration} jours · {p.price} DH/j</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => startEditProgram(p)}
                        className="flex-1 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all">
                        ✏️ Modifier
                      </button>
                      <button onClick={() => deleteProgram(p.id)}
                        className="flex-1 py-2 text-xs font-bold text-red-400 bg-red-50 hover:bg-red-100 rounded-xl transition-all">
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
