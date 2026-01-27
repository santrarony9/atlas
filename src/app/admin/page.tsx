"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";

interface Product {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    category: string;
}

interface SiteContentData {
    hero: { title: string; subtitle: string; bgImage: string };
    about: { title: string; heading: string; description: string; imageUrl: string };
    features: { title: string; description: string; imageUrl: string; linkUrl: string }[];
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"products" | "users" | "content">("products");
    const [products, setProducts] = useState<Product[]>([]);
    const [users, setUsers] = useState<{ _id: string, email: string, role: string }[]>([]);
    const [siteContent, setSiteContent] = useState<SiteContentData | null>(null);

    // Product Form State
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        imageUrl: "",
        description: "",
        category: "Industrial"
    });
    const [isEditing, setIsEditing] = useState<string | null>(null);

    // User Form State
    const [userForm, setUserForm] = useState({ email: "", password: "" });

    const [loading, setLoading] = useState(false);

    // Fetch Data
    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
    };

    const fetchUsers = async () => {
        const res = await fetch("/api/users");
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) setUsers(data);
        }
    };

    const fetchContent = async () => {
        const res = await fetch("/api/content");
        if (res.ok) {
            setSiteContent(await res.json());
        }
    };

    useEffect(() => {
        if (activeTab === "products") fetchProducts();
        if (activeTab === "users") fetchUsers();
        if (activeTab === "content") fetchContent();
    }, [activeTab]);

    // --- Product Handlers ---
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "title") {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
            }));
        }
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("File size too large! Please upload <= 10MB.");
                e.target.value = "";
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `/api/products/${isEditing}` : "/api/products";
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            alert("Product saved successfully!");
            setFormData({ title: "", slug: "", imageUrl: "", description: "", category: "Industrial" });
            setIsEditing(null);
            fetchProducts();
        } else {
            alert("Error saving product");
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product? THIS CANNOT BE UNDONE.")) return;
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) fetchProducts();
    };

    const handleEdit = (product: Product) => {
        setFormData({
            title: product.title,
            slug: product.slug,
            imageUrl: product.imageUrl,
            description: product.description,
            category: product.category || "Industrial"
        });
        setIsEditing(product._id);
        window.scrollTo(0, 0);
    };

    // --- User Handlers ---
    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userForm)
        });
        if (res.ok) {
            alert("Admin user created successfully!");
            setUserForm({ email: "", password: "" });
            fetchUsers();
        } else {
            const data = await res.json();
            alert(data.error || "Error creating user");
        }
        setLoading(false);
    };

    // --- Content Handlers ---
    const handleContentChange = (section: 'hero' | 'about' | 'features', field: string, value: string, index?: number) => {
        setSiteContent(prev => {
            if (!prev) return null;
            const newData = { ...prev };

            if (section === 'features' && typeof index === 'number') {
                const newFeatures = [...newData.features];
                newFeatures[index] = { ...newFeatures[index], [field]: value };
                newData.features = newFeatures;
            } else if (section !== 'features') {
                (newData as any)[section] = { ...(newData as any)[section], [field]: value };
            }
            return newData;
        });
    };

    const handleContentImageUpload = (e: ChangeEvent<HTMLInputElement>, section: 'hero' | 'about' | 'features', index?: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                handleContentChange(section, section === 'features' ? 'imageUrl' : (section === 'hero' ? 'bgImage' : 'imageUrl'), result, index);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleContentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!siteContent) return;
        setLoading(true);
        const res = await fetch("/api/content", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(siteContent)
        });
        if (res.ok) {
            alert("Site content updated successfully!");
        } else {
            alert("Error updating content");
        }
        setLoading(false);
    };

    // SHARED STYLES (Dark Mode)
    const cardClass = "bg-slate-800 p-8 rounded-xl shadow-lg mb-12 border border-slate-700";
    const inputClass = "w-full p-3 border border-slate-600 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all";
    const labelClass = "block text-sm font-bold mb-2 text-slate-300 uppercase tracking-wide";
    const buttonClass = "bg-brand-blue text-white px-8 py-3 rounded-lg hover:bg-brand-orange transition-colors font-bold shadow-md";

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Admin<span className="text-brand-orange">Console</span></h1>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {(['products', 'users', 'content'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full font-bold capitalize whitespace-nowrap transition-all ${activeTab === tab
                                    ? "bg-brand-orange text-white shadow-lg"
                                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                                }`}
                        >
                            {tab === 'content' ? 'Site Content' : tab}
                        </button>
                    ))}
                    <button
                        onClick={() => window.location.href = "/api/auth/signout"}
                        className="px-6 py-2 bg-red-600/20 text-red-500 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all ml-4 border border-red-600/50"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* --- PRODUCTS TAB --- */}
            {activeTab === "products" && (
                <>
                    <div className={cardClass}>
                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                            {isEditing ? "✏️ Edit Product" : "✨ Add New Product"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Product Title</label>
                                    <input name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="e.g. Heavy Duty Coupler" required />
                                </div>
                                <div>
                                    <label className={labelClass}>Slug</label>
                                    <input name="slug" value={formData.slug} onChange={handleChange} className={`${inputClass} bg-slate-950 text-slate-500 cursor-not-allowed`} readOnly />
                                </div>
                                <div>
                                    <label className={labelClass}>Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                                        <option value="Industrial">Industrial</option>
                                        <option value="Railway">Railway</option>
                                        <option value="Marine">Marine</option>
                                        <option value="Automotive">Automotive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Image</label>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={inputClass} required></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" disabled={loading} className={buttonClass}>
                                    {loading ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
                                </button>
                                {isEditing && <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: "", slug: "", imageUrl: "", description: "", category: "Industrial" }); }} className="text-slate-400 hover:text-white font-bold px-4">Cancel</button>}
                            </div>
                        </form>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-white">Existing Products</h2>
                        <div className="grid gap-4">
                            {products.map((product) => (
                                <div key={product._id} className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700 flex items-center gap-6 hover:border-brand-orange transition-colors">
                                    <div className="h-20 w-20 relative bg-slate-900 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                                        {product.imageUrl && <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl text-white">{product.title}</h3>
                                        <span className="inline-block mt-1 bg-brand-blue/20 text-brand-blue px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                            {product.category}
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => handleEdit(product)} className="px-5 py-2.5 bg-slate-700 hover:bg-white hover:text-slate-900 rounded-lg text-sm font-bold transition-all">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-red-900/20 transition-all transform hover:scale-105">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* --- USERS TAB --- */}
            {activeTab === "users" && (
                <div className="max-w-4xl mx-auto">
                    <div className={cardClass}>
                        <h2 className="text-2xl font-bold mb-6 text-white">Add New Admin User</h2>
                        <form onSubmit={handleUserSubmit} className="space-y-6">
                            <div>
                                <label className={labelClass}>Email Address</label>
                                <input name="email" type="email" value={userForm.email} onChange={handleUserChange} className={inputClass} required />
                            </div>
                            <div>
                                <label className={labelClass}>Password</label>
                                <input name="password" type="password" value={userForm.password} onChange={handleUserChange} className={inputClass} required />
                            </div>
                            <button type="submit" disabled={loading} className={buttonClass}>
                                {loading ? "Creating..." : "Create Admin User"}
                            </button>
                        </form>
                    </div>
                    <div className="grid gap-4">
                        {users.map((user) => (
                            <div key={user._id} className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700 flex items-center justify-between">
                                <div><h3 className="font-bold text-lg text-white">{user.email}</h3><p className="text-sm text-slate-500 capitalize">{user.role}</p></div>
                                <div className="text-sm text-slate-600 font-mono">ID: {user._id}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- SITE CONTENT TAB --- */}
            {activeTab === "content" && siteContent && (
                <div className="max-w-5xl mx-auto space-y-8">
                    <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 sticky top-4 z-20 shadow-2xl">
                        <h2 className="text-xl font-bold text-white">Site Content Editor</h2>
                        <button onClick={handleContentSubmit} disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition-colors font-bold shadow-lg">
                            {loading ? "Saving..." : "💾 Save Changes"}
                        </button>
                    </div>

                    {/* HERO SECTION */}
                    <section className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange"></div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                            🏠 Hero Section
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Main Title</label>
                                <input value={siteContent.hero.title} onChange={(e) => handleContentChange('hero', 'title', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Subtitle</label>
                                <input value={siteContent.hero.subtitle} onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)} className={inputClass} />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Background Image</label>
                                <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-700">
                                    <div className="relative h-24 w-40 bg-slate-800 rounded overflow-hidden border border-slate-600">
                                        {siteContent.hero.bgImage && <Image src={siteContent.hero.bgImage} alt="Hero" fill className="object-cover" />}
                                    </div>
                                    <input type="file" accept="image/*" onChange={(e) => handleContentImageUpload(e, 'hero')} className="flex-1 text-slate-300" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ABOUT SECTION */}
                    <section className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue"></div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                            📖 About Section
                        </h3>
                        <div className="grid gap-6">
                            <div>
                                <label className={labelClass}>Section Title (Small)</label>
                                <input value={siteContent.about.title} onChange={(e) => handleContentChange('about', 'title', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Main Heading</label>
                                <input value={siteContent.about.heading} onChange={(e) => handleContentChange('about', 'heading', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Description Text</label>
                                <textarea value={siteContent.about.description} onChange={(e) => handleContentChange('about', 'description', e.target.value)} rows={5} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Side Image</label>
                                <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-700">
                                    <div className="relative h-24 w-24 bg-slate-800 rounded overflow-hidden border border-slate-600">
                                        {siteContent.about.imageUrl && <Image src={siteContent.about.imageUrl} alt="About" fill className="object-cover" />}
                                    </div>
                                    <input type="file" accept="image/*" onChange={(e) => handleContentImageUpload(e, 'about')} className="flex-1 text-slate-300" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FEATURES SECTION */}
                    <section className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gray-500"></div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                            🛠️ Service Cards
                        </h3>
                        <div className="grid gap-8">
                            {siteContent.features.map((feature, index) => (
                                <div key={index} className="border border-slate-700 p-6 rounded-lg bg-slate-800/50 relative">
                                    <span className="absolute top-0 right-0 bg-slate-700 px-3 py-1 rounded-bl-lg font-bold text-xs text-slate-300 border-l border-b border-slate-600">
                                        Card #{index + 1}
                                    </span>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title</label>
                                            <input value={feature.title} onChange={(e) => handleContentChange('features', 'title', e.target.value, index)} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Link URL</label>
                                            <input value={feature.linkUrl} onChange={(e) => handleContentChange('features', 'linkUrl', e.target.value, index)} className={inputClass} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Description</label>
                                            <textarea value={feature.description} onChange={(e) => handleContentChange('features', 'description', e.target.value, index)} rows={2} className={inputClass} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Card Image</label>
                                            <div className="flex items-center gap-4 bg-slate-900 p-2 rounded border border-slate-700">
                                                <div className="relative h-16 w-24 bg-slate-800 rounded overflow-hidden border border-slate-600">
                                                    {feature.imageUrl && <Image src={feature.imageUrl} alt="Card" fill className="object-cover" />}
                                                </div>
                                                <input type="file" accept="image/*" onChange={(e) => handleContentImageUpload(e, 'features', index)} className="text-sm w-full text-slate-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
