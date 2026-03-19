"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { 
    LayoutDashboard, 
    Package, 
    BookOpen, 
    Tag, 
    LayoutGrid,
    Settings, 
    Users, 
    LogOut,
    Plus,
    Search,
    Filter,
    ArrowRight,
    Activity,
    Trash2,
    FileText,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Bell,
    Mail,
    Lock,
    Shield,
    Globe,
    ShieldCheck,
    Calendar,
    Server,
    CheckCircle2,
    Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import AdminSidebar from '@/components/admin/AdminSidebar';
import StatCard from '@/components/admin/StatCard';
import Toast, { ToastType } from '@/components/ui/Toast';

interface Product {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    category?: string;
    tags?: Tag[];
}

interface Article {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    imageUrl: string;
    author: string;
    tags: string[];
    isPublished: boolean;
    createdAt: string;
}

interface SiteContentData {
    hero: { title: string; subtitle: string; bgImage: string };
    about: { title: string; heading: string; description: string; imageUrl: string; bulletPoints: string[] };
    features: { title: string; description: string; imageUrl: string; linkUrl: string }[];
    socialLinks: { facebook: string; twitter: string; linkedin: string; instagram: string; youtube: string };
    companyProfileUrl: string;
    faviconUrl: string;
    homeCTA: { title: string; subtitle: string; buttonText: string; buttonLink: string; bgImage: string };
    aboutPage: { missionTitle: string; missionText: string; visionTitle: string; visionText: string };
    processPage: { steps: { title: string; description: string; imageUrl: string }[] };
    infrastructure: { videoUrl: string; companyImages: string[]; certificates: string[] };
    subscription: {
        domainName: string;
        domainRenewalDate: string;
        hostName: string;
        hostRenewalDate: string;
        supportPhoneNumber: string;
    };
    footer: {
        officeAddress: string;
        worksAddress: string;
        contactPhone: string;
        contactEmail: string;
        copyrightText: string;
    };
}

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface Tag {
    _id: string;
    name: string;
    slug: string;
}

interface User {
    _id: string;
    email: string;
    role: string;
}

interface Feature {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
}

interface ProcessStep {
    title: string;
    description: string;
    imageUrl: string;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "users" | "content" | "categories" | "tags" | "journal" | "subscription">("dashboard");
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [stats, setStats] = useState({
        products: 0,
        articles: 0,
        users: 0,
        categories: 0
    });
    
    const [products, setProducts] = useState<Product[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [siteContent, setSiteContent] = useState<SiteContentData | null>(null);

    const showToast = (message: string, type: ToastType = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    };

    // Product Form State
    interface ProductFormData {
        title: string;
        slug: string;
        imageUrl: string;
        description: string;
        category: string;
        tags: string[];
    }

    const [formData, setFormData] = useState<ProductFormData>({
        title: "",
        slug: "",
        imageUrl: "",
        description: "",
        category: "",
        tags: []
    });
    interface ArticleFormData {
        title: string;
        slug: string;
        description: string;
        content: string;
        imageUrl: string;
        author: string;
        tags: string;
        isPublished: boolean;
    }

    const [articleForm, setArticleForm] = useState<ArticleFormData>({
        title: "",
        slug: "",
        description: "",
        content: "",
        imageUrl: "",
        author: "",
        tags: "",
        isPublished: false
    });
    const [isEditingArticle, setIsEditingArticle] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<string | null>(null);

    interface UserFormData {
        email: string;
        password?: string;
    }

    // User Form State
    const [userForm, setUserForm] = useState<UserFormData>({ email: "", password: "" });

    // Category Form State
    const [categoryForm, setCategoryForm] = useState({ name: "" });

    // Tag Form State
    const [tagForm, setTagForm] = useState({ name: "" });

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

    const fetchArticles = async () => {
        const res = await fetch("/api/articles");
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) setArticles(data);
        }
    };

    const fetchContent = async () => {
        const res = await fetch("/api/content");
        if (res.ok) {
            const data = await res.json();
            // Initialize possibly missing fields for older documents
            if (!data.socialLinks) data.socialLinks = { facebook: "", twitter: "", linkedin: "", instagram: "", youtube: "" };
            if (!data.companyProfileUrl) data.companyProfileUrl = "";
            if (!data.infrastructure) data.infrastructure = { videoUrl: "", companyImages: [], certificates: [] };
            if (!data.about) data.about = { title: "", heading: "", description: "", imageUrl: "", bulletPoints: [] };
            if (!data.about.bulletPoints) data.about.bulletPoints = [];
            if (!data.homeCTA) data.homeCTA = { title: "", subtitle: "", buttonText: "", buttonLink: "", bgImage: "" };
            if (!data.aboutPage) data.aboutPage = { missionTitle: "", missionText: "", visionTitle: "", visionText: "" };
            if (!data.processPage) data.processPage = { steps: [] };
            if (!data.subscription) data.subscription = { domainName: "atlasfoundries.com", domainRenewalDate: "28th May 2026", hostName: "Dreamline Cloud", hostRenewalDate: "28th May 2026", supportPhoneNumber: "82400 54002" };
            if (!data.footer) data.footer = { 
                officeAddress: "225/2 CIT Road, Scheme VII M, Kolkata - 700054, India",
                worksAddress: "Works: Howrah - 711410",
                contactPhone: "+91 98307 35480",
                contactEmail: "enquiry@atlasfoundries.com",
                copyrightText: "Atlas Foundries. All Rights Reserved."
            };
            if (!data.faviconUrl) data.faviconUrl = "/favicon.svg";
            setSiteContent(data);
        }
    };

    const fetchCategories = async () => {
        const res = await fetch("/api/categories");
        if (res.ok) {
            const data = await res.json();
            setCategories(data);
        }
    };

    const fetchStats = async () => {
        try {
            const [pRes, aRes, uRes, cRes] = await Promise.all([
                fetch("/api/products"),
                fetch("/api/articles"),
                fetch("/api/users"),
                fetch("/api/categories")
            ]);

            const getSafeData = async (res: Response) => {
                try {
                    if (!res.ok) return [];
                    const data = await res.json();
                    return Array.isArray(data) ? data : (data.products || data.articles || data.users || data.categories || []);
                } catch {
                    return [];
                }
            };

            const products = await getSafeData(pRes);
            const articles = await getSafeData(aRes);
            const users = await getSafeData(uRes);
            const categories = await getSafeData(cRes);

            setStats({
                products: Array.isArray(products) ? products.length : 0,
                articles: Array.isArray(articles) ? articles.length : 0,
                users: Array.isArray(users) ? users.length : 0,
                categories: Array.isArray(categories) ? categories.length : 0
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const fetchTags = async () => {
        const res = await fetch("/api/tags");
        if (res.ok) {
            const data = await res.json();
            setTags(data);
        }
    };

    useEffect(() => {
        if (activeTab === "dashboard") fetchStats();
        if (activeTab === "products") { fetchProducts(); fetchCategories(); fetchTags(); }
        if (activeTab === "users") fetchUsers();
        if (activeTab === "content") fetchContent();
        if (activeTab === "categories") fetchCategories();
        if (activeTab === "tags") fetchTags();
        if (activeTab === "journal") fetchArticles();
    }, [activeTab]);

    // --- Tag Handlers ---
    const handleTagSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/tags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tagForm)
        });
        if (res.ok) {
            setTagForm({ name: "" });
            fetchTags();
            showToast("Tag created!", "success");
        } else {
            showToast("Error creating tag", "error");
        }
        setLoading(false);
    };

    const handleDeleteTag = async (id: string) => {
        if (!confirm("Delete this tag?")) return;
        const res = await fetch(`/api/tags/${id}`, { method: "DELETE" });
        if (res.ok) fetchTags();
    };

    // --- Product Handlers ---
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: ProductFormData) => ({ ...prev, [name]: value }));
        if (name === "title") {
            setFormData((prev: ProductFormData) => ({
                ...prev,
                slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
            }));
        }
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            setFormData((prev: ProductFormData) => ({ ...prev, imageUrl: data.url }));
        } catch (error) {
            console.error("Error uploading image:", error);
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
            showToast("Product saved successfully!");
            setFormData({ title: "", slug: "", imageUrl: "", description: "", category: "", tags: [] });
            setIsEditing(null);
            fetchProducts();
        } else {
            const errorData = await res.json();
            const message = errorData.details
                ? `Error: ${errorData.error}. ${errorData.details}`
                : errorData.error || "Error saving product";
            showToast(message, "error");
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
            category: product.category || "",
            tags: product.tags ? product.tags.map((t: { _id: string }) => t._id) : []
        });
        setIsEditing(product._id);
        window.scrollTo(0, 0);
    };

    // --- User Handlers ---
    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm((prev: UserFormData) => ({ ...prev, [name]: value }));
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
            showToast("Admin user created successfully!");
            setUserForm({ email: "", password: "" });
            fetchUsers();
        } else {
            const data = await res.json();
            showToast(data.error || "Error creating user", "error");
        }
        setLoading(false);
    };

    const handleDeleteUser = async (id: string, email: string) => {
        if (email === "santrarony9@gmail.com") {
            showToast("Super admin cannot be deleted!", "error");
            return;
        }
        if (!confirm(`Delete admin user ${email}?`)) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
            if (res.ok) {
                showToast("User deleted successfully!");
                fetchUsers();
            } else {
                const data = await res.json();
                showToast(data.error || "Error deleting user", "error");
            }
        } catch (error) {
            showToast("An error occurred while deleting the user", "error");
        }
        setLoading(false);
    };

    // --- Content Handlers ---
    const handleContentChange = (section: keyof SiteContentData, field: string, value: string | string[] | Feature[] | ProcessStep[], index?: number) => {
        setSiteContent((prev: SiteContentData | null) => {
            if (!prev) return null;
            const newData = { ...prev };

            if (section === 'features' && typeof index === 'number') {
                const newFeatures = [...newData.features];
                newFeatures[index] = { ...newFeatures[index], [field as keyof Feature]: value as string };
                newData.features = newFeatures;
            } else if (section === 'processPage' && field === 'steps' && Array.isArray(value)) {
                newData.processPage = { ...newData.processPage, steps: value as ProcessStep[] };
            } else if (section === 'about' && field === 'bulletPoints' && Array.isArray(value)) {
                newData.about = { ...newData.about, bulletPoints: value as string[] };
            } else if (section === 'socialLinks') {
                (newData.socialLinks as any)[field] = value as string;
            } else if (section === 'infrastructure') {
                if (field === 'videoUrl') {
                    newData.infrastructure.videoUrl = value as string;
                } else if (field === 'companyImages' || field === 'certificates') {
                    (newData.infrastructure as any)[field] = value as string[];
                }
            } else if (section === 'footer') {
                (newData.footer as any)[field] = value as string;
            } else if (section === 'hero' || section === 'about' || section === 'homeCTA' || section === 'aboutPage') {
                (newData[section] as any)[field] = value as string;
            }
            return newData;
        });
    };

    // Handler for direct root level fields like companyProfileUrl
    const handleRootContentChange = (field: keyof SiteContentData, value: string) => {
        setSiteContent((prev: SiteContentData | null) => {
            if (!prev) return null;
            return { ...prev, [field]: value };
        });
    };


    const handleContentImageUpload = async (e: ChangeEvent<HTMLInputElement>, section: keyof SiteContentData | 'companyProfile' | 'favicon', index?: number, arrayField?: 'companyImages' | 'certificates') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            const result = data.url;

            if (section === 'companyProfile') {
                handleRootContentChange('companyProfileUrl', result);
            } else if (section === 'favicon') {
                handleRootContentChange('faviconUrl', result);
            } else if (section === 'infrastructure' && arrayField) {
                if (!siteContent) return;
                const currentArray = siteContent.infrastructure[arrayField] || [];
                handleContentChange('infrastructure', arrayField, [...currentArray, result]);
            } else if (section === 'processPage' && typeof index === 'number') {
                if (!siteContent) return;
                const newSteps = [...siteContent.processPage.steps];
                newSteps[index] = { ...newSteps[index], imageUrl: result };
                handleContentChange('processPage', 'steps', newSteps);
            } else {
                const fieldMap: Record<string, string> = {
                    hero: 'bgImage',
                    about: 'imageUrl',
                    features: 'imageUrl',
                    homeCTA: 'bgImage',
                    aboutPage: 'imageUrl' 
                };
                handleContentChange(section as keyof SiteContentData, fieldMap[section] || 'imageUrl', result, index);
            }
        } catch (error) {
            console.error("Error uploading content image:", error);
        }
    };

    const removeInfrastructureImage = (arrayField: 'companyImages' | 'certificates', imgIndex: number) => {
        if (!siteContent) return;
        const currentArray = siteContent.infrastructure[arrayField] || [];
        const newArray = currentArray.filter((_: string, i: number) => i !== imgIndex);
        handleContentChange('infrastructure', arrayField, newArray);
    };

    const removeFeature = (index: number) => {
        if (!siteContent) return;
        const newFeatures = siteContent.features.filter((_: Feature, i: number) => i !== index);
        setSiteContent({ ...siteContent, features: newFeatures });
    };

    const addFeature = () => {
        if (!siteContent) return;
        const newFeature = { title: "New Service", description: "Description", imageUrl: "", linkUrl: "/products" };
        setSiteContent({ ...siteContent, features: [...siteContent.features, newFeature] });
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
            showToast("Site content updated successfully!");
        } else {
            showToast("Error updating content", "error");
        }
        setLoading(false);
    };

    // --- Journal Handlers ---
    const handleArticleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setArticleForm((prev: ArticleFormData) => ({ ...prev, [name]: val }));

        if (name === "title") {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setArticleForm((prev: ArticleFormData) => ({ ...prev, slug }));
        }
    };

    const handleArticleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const url = "/api/articles";
        const method = isEditingArticle ? "PUT" : "POST";
        const body = isEditingArticle ? { ...articleForm, _id: isEditingArticle } : articleForm;

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            showToast(isEditingArticle ? "Article updated!" : "Article created!");
            setArticleForm({ title: "", slug: "", description: "", content: "", imageUrl: "", author: "", tags: "", isPublished: false });
            setIsEditingArticle(null);
            fetchArticles();
        } else {
            showToast("Error saving article", "error");
        }
        setLoading(false);
    };

    const handleArticleEdit = (article: Article) => {
        setArticleForm({
            title: article.title,
            slug: article.slug,
            description: article.description,
            content: article.content,
            imageUrl: article.imageUrl,
            author: article.author,
            tags: article.tags.join(', '),
            isPublished: article.isPublished
        });
        setIsEditingArticle(article._id);
        window.scrollTo(0, 0);
    };

    const handleDeleteArticle = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        setLoading(true);
        const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
        if (res.ok) {
            showToast("Article deleted!");
            fetchArticles();
        } else {
            showToast("Error deleting article", "error");
        }
        setLoading(false);
    };

    const handleArticleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            setArticleForm((prev: ArticleFormData) => ({ ...prev, imageUrl: data.url }));
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // --- Category Handlers ---
    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoryForm)
        });
        if (res.ok) {
            setCategoryForm({ name: "" });
            fetchCategories();
            showToast("Category created!");
        } else {
            showToast("Error creating category", "error");
        }
        setLoading(false);
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Delete this category?")) return;
        const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
        if (res.ok) fetchCategories();
    };

    // SHARED STYLES (Dark Mode)
    const cardClass = "bg-slate-800 p-8 rounded-xl shadow-lg mb-12 border border-slate-700";
    const inputClass = "w-full p-3 border border-slate-600 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all";
    const labelClass = "block text-sm font-bold mb-2 text-slate-300 uppercase tracking-wide";
    const buttonClass = "bg-brand-blue text-white px-8 py-3 rounded-lg hover:bg-brand-orange transition-colors font-bold shadow-md";

    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isCollapsed={isSidebarCollapsed} 
                setIsCollapsed={setIsSidebarCollapsed}
                onLogout={() => window.location.href = "/api/auth/signout"}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-slate-800/50 backdrop-blur-md border-b border-slate-700 flex items-center justify-between px-8 z-30 shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-white capitalize flex items-center gap-3">
                            {activeTab === 'dashboard' && <LayoutDashboard className="w-6 h-6 text-brand-orange" />}
                            {activeTab === 'products' && <Package className="w-6 h-6 text-brand-orange" />}
                            {activeTab === 'journal' && <BookOpen className="w-6 h-6 text-brand-orange" />}
                            {activeTab === 'categories' && <LayoutGrid className="w-6 h-6 text-brand-orange" />}
                            {activeTab === 'users' && <Users className="w-6 h-6 text-brand-orange" />}
                            {activeTab === 'content' && <Settings className="w-6 h-6 text-brand-orange" />}
                            {activeTab === 'tags' && <Tag className="w-6 h-6 text-brand-orange" />}
                            {activeTab === 'content' ? 'Site Content' : activeTab}
                        </h1>
                    </div>
                </header>

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === "dashboard" && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <StatCard title="Total Products" value={stats.products} icon={Package} color="blue" />
                                        <StatCard title="Journal Articles" value={stats.articles} icon={BookOpen} color="orange" />
                                        <StatCard title="Total Users" value={stats.users} icon={Users} color="green" />
                                        <StatCard title="Categories" value={stats.categories} icon={LayoutGrid} color="purple" />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className={cardClass + " !mb-0"}>
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <Plus className="w-5 h-5 text-brand-orange" />
                                                Quick Actions
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button onClick={() => setActiveTab('products')} className="p-4 bg-slate-900/50 hover:bg-slate-700 rounded-xl border border-slate-700 text-left transition-all group">
                                                    <p className="font-bold text-slate-200 group-hover:text-brand-orange">Add Product</p>
                                                    <p className="text-xs text-slate-500 mt-1">Insert new foundry item</p>
                                                </button>
                                                <button onClick={() => setActiveTab('journal')} className="p-4 bg-slate-900/50 hover:bg-slate-700 rounded-xl border border-slate-700 text-left transition-all group">
                                                    <p className="font-bold text-slate-200 group-hover:text-brand-orange">Write Article</p>
                                                    <p className="text-xs text-slate-500 mt-1">New journal entry</p>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className={cardClass + " !mb-0"}>
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-brand-orange" />
                                                System Status
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                                    <span className="text-sm font-medium">Database Connection</span>
                                                    <span className="flex items-center gap-2 text-xs text-green-500 font-bold uppercase tracking-widest">
                                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                        Connected
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                                    <span className="text-sm font-medium">Media Storage</span>
                                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Available</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- PRODUCTS TAB --- */}
                            {activeTab === "products" && (
                                <div className="space-y-12">
                                    <div className={cardClass}>
                                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                            <Plus className="w-6 h-6 text-brand-orange" />
                                            {isEditing ? "Edit Product" : "Add New Product"}
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
                                                        <option value="">No Category</option>
                                                        {categories.map((cat: Category) => (
                                                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Tags</label>
                                                    <div className="grid grid-cols-2 gap-2 bg-slate-900 p-3 rounded-lg border border-slate-600 max-h-40 overflow-y-auto">
                                                        {tags.map((tag: Tag) => (
                                                            <label key={tag._id} className="flex items-center gap-2 cursor-pointer hover:text-brand-orange">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={formData.tags.includes(tag._id)}
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        const checked = e.target.checked;
                                                                        setFormData((prev: ProductFormData) => ({
                                                                            ...prev,
                                                                            tags: checked
                                                                                ? [...prev.tags, tag._id]
                                                                                : prev.tags.filter((id: string) => id !== tag._id)
                                                                        }));
                                                                    }}
                                                                    className="accent-brand-orange"
                                                                />
                                                                <span className="text-sm">{tag.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Image</label>
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-24 w-24 relative bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                                                                {formData.imageUrl ? (
                                                                    <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-full text-slate-600 text-xs text-center p-2">No Preview</div>
                                                                )}
                                                            </div>
                                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 transition-all cursor-pointer" />
                                                        </div>
                                                    </div>
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
                                                {isEditing && <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: "", slug: "", imageUrl: "", description: "", category: "", tags: [] }); }} className="text-slate-400 hover:text-white font-bold px-4">Cancel</button>}
                                            </div>
                                        </form>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-bold text-white">Existing Products</h2>
                                        <div className="grid gap-4">
                                            {products.map((product: Product) => (
                                                <div key={product._id} className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-brand-orange transition-colors group">
                                                    <div className="h-20 w-20 relative bg-slate-900 rounded-lg overflow-hidden shrink-0 border border-slate-700 group-hover:border-brand-orange/50 transition-colors">
                                                        {product.imageUrl && <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-xl text-white group-hover:text-brand-orange transition-colors">{product.title}</h3>
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            <span className="inline-block bg-brand-blue/20 text-brand-blue px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                                                {product.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
                                                        <button onClick={() => handleEdit(product)} className="flex-1 md:flex-none px-5 py-2.5 bg-slate-700 hover:bg-white hover:text-slate-900 rounded-lg text-sm font-bold transition-all text-center">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDelete(product._id)} className="flex-1 md:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all text-center">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- TAGS TAB --- */}
                            {activeTab === "tags" && (
                                <div className="max-w-4xl mx-auto space-y-8">
                                    <div className={cardClass}>
                                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                            <Tag className="w-6 h-6 text-brand-orange" />
                                            Add New Tag
                                        </h2>
                                        <form onSubmit={handleTagSubmit} className="flex gap-4">
                                            <div className="flex-1">
                                                <input
                                                    value={tagForm.name}
                                                    onChange={(e) => setTagForm({ name: e.target.value })}
                                                    className={inputClass}
                                                    placeholder="Tag Name (e.g. High Strength)"
                                                    required
                                                />
                                            </div>
                                            <button type="submit" disabled={loading} className={buttonClass}>
                                                {loading ? "Adding..." : "Add Tag"}
                                            </button>
                                        </form>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {tags.map((tag: Tag) => (
                                            <div key={tag._id} className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700 flex items-center justify-between group hover:border-brand-orange transition-colors">
                                                <h3 className="font-bold text-lg text-white">{tag.name}</h3>
                                                <button onClick={() => handleDeleteTag(tag._id)} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        {tags.length === 0 && <p className="text-slate-500 text-center py-8 col-span-2">No tags found.</p>}
                                    </div>
                                </div>
                            )}

                            {/* --- CATEGORIES TAB --- */}
                            {activeTab === "categories" && (
                                <div className="max-w-4xl mx-auto space-y-8">
                                    <div className={cardClass}>
                                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                            <LayoutGrid className="w-6 h-6 text-brand-orange" />
                                            Add New Category
                                        </h2>
                                        <form onSubmit={handleCategorySubmit} className="flex gap-4">
                                            <div className="flex-1">
                                                <input
                                                    value={categoryForm.name}
                                                    onChange={(e) => setCategoryForm({ name: e.target.value })}
                                                    className={inputClass}
                                                    placeholder="Category Name"
                                                    required
                                                />
                                            </div>
                                            <button type="submit" disabled={loading} className={buttonClass}>
                                                {loading ? "Adding..." : "Add Category"}
                                            </button>
                                        </form>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {categories.map((cat: Category) => (
                                            <div key={cat._id} className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700 flex items-center justify-between group hover:border-brand-orange transition-colors">
                                                <h3 className="font-bold text-lg text-white">{cat.name}</h3>
                                                <button onClick={() => handleDeleteCategory(cat._id)} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        {categories.length === 0 && <p className="text-slate-500 text-center py-8 col-span-2">No categories found.</p>}
                                    </div>
                                </div>
                            )}

                            {/* --- USERS TAB --- */}
                            {activeTab === "users" && (
                                <div className="max-w-4xl mx-auto space-y-8">
                                    <div className={cardClass}>
                                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                            <Users className="w-6 h-6 text-brand-orange" />
                                            Add New Admin User
                                        </h2>
                                        <form onSubmit={handleUserSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={labelClass}>Email Address</label>
                                                    <input name="email" type="email" value={userForm.email} onChange={handleUserChange} className={inputClass} required />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Password</label>
                                                    <input name="password" type="password" value={userForm.password} onChange={handleUserChange} className={inputClass} required />
                                                </div>
                                            </div>
                                            <button type="submit" disabled={loading} className={buttonClass}>
                                                {loading ? "Creating..." : "Create Admin User"}
                                            </button>
                                        </form>
                                    </div>
                                    <div className="grid gap-4">
                                        {users.map((user: User) => (
                                            <div key={user._id} className="bg-slate-800 p-4 rounded-xl shadow border border-slate-700 flex items-center justify-between group hover:border-brand-orange transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold uppercase shrink-0">
                                                        {user.email.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-white group-hover:text-brand-orange transition-colors">{user.email}</h3>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded uppercase font-bold">{user.role}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteUser(user._id, user.email)}
                                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* --- JOURNAL TAB --- */}
                            {activeTab === "journal" && (
                                <div className="max-w-6xl mx-auto space-y-12">
                                    <div className={cardClass}>
                                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                            <BookOpen className="w-6 h-6 text-brand-orange" />
                                            {isEditingArticle ? "Edit Article" : "Write New Article"}
                                        </h2>
                                        <form onSubmit={handleArticleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={labelClass}>Article Title</label>
                                                    <input name="title" value={articleForm.title} onChange={handleArticleChange} className={inputClass} placeholder="e.g. The Future of Lost Foam" required />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Slug</label>
                                                    <input name="slug" value={articleForm.slug} readOnly className={`${inputClass} bg-slate-950 text-slate-500 cursor-not-allowed`} title="Generated from title" />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Author</label>
                                                    <input name="author" value={articleForm.author} onChange={handleArticleChange} className={inputClass} placeholder="Author name" required />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Tags (comma separated)</label>
                                                    <input name="tags" value={articleForm.tags} onChange={handleArticleChange} className={inputClass} placeholder="e.g. Technical, Innovation" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Short Description</label>
                                                <textarea name="description" value={articleForm.description} onChange={handleArticleChange} rows={2} className={inputClass} placeholder="Summarize the article..." required></textarea>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Content (HTML/Text)</label>
                                                <textarea name="content" value={articleForm.content} onChange={handleArticleChange} rows={10} className={`${inputClass} font-mono text-sm`} placeholder="Write your article content here..." required></textarea>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className={labelClass}>Cover Image</label>
                                                    <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-slate-700">
                                                        <div className="h-16 w-16 relative bg-slate-800 rounded overflow-hidden shrink-0 border border-slate-700">
                                                            {articleForm.imageUrl && <Image src={articleForm.imageUrl} alt="Article Preview" fill className="object-cover" />}
                                                        </div>
                                                        <input type="file" accept="image/*" onChange={handleArticleImageUpload} className="w-full text-xs text-slate-400" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <label className="flex items-center gap-3 cursor-pointer group">
                                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${articleForm.isPublished ? 'bg-brand-orange border-brand-orange' : 'border-slate-600'}`}>
                                                            {articleForm.isPublished && <Activity className="w-4 h-4 text-white" />}
                                                            <input type="checkbox" name="isPublished" checked={articleForm.isPublished} onChange={handleArticleChange} className="hidden" />
                                                        </div>
                                                        <span className="font-bold text-slate-300 group-hover:text-white transition-colors">Publish Article</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button type="submit" disabled={loading} className={buttonClass}>
                                                    {loading ? "Saving..." : isEditingArticle ? "Update Article" : "Publish Article"}
                                                </button>
                                                {isEditingArticle && (
                                                    <button type="button" onClick={() => { setIsEditingArticle(null); setArticleForm({ title: "", slug: "", description: "", content: "", imageUrl: "", author: "", tags: "", isPublished: false }); }} className="text-slate-400 hover:text-white font-bold px-4 transition-colors">
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                            <FileText className="w-6 h-6 text-brand-orange" />
                                            Manage Articles
                                        </h3>
                                        <div className="grid gap-4">
                                            {articles.map((article: Article) => (
                                                <div key={article._id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-6 group hover:border-brand-orange transition-all">
                                                    <div className="h-16 w-24 relative bg-slate-900 rounded overflow-hidden shrink-0">
                                                        {article.imageUrl && <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-white group-hover:text-brand-orange transition-colors truncate">{article.title}</h4>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${article.isPublished ? 'bg-green-600/20 text-green-500' : 'bg-slate-900 text-slate-500'}`}>
                                                                {article.isPublished ? 'Published' : 'Draft'}
                                                            </span>
                                                            <span className="text-xs text-slate-500">{new Date(article.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 shrink-0">
                                                        <button onClick={() => handleArticleEdit(article)} className="p-2 bg-slate-700 hover:bg-white hover:text-slate-900 rounded-lg text-xs font-bold transition-all transition-colors">
                                                            Edit
                                                        </button>
                                                        <button onClick={() => handleDeleteArticle(article._id)} className="p-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg text-xs font-bold transition-all border border-red-600/30">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {articles.length === 0 && <p className="text-slate-500 text-center py-12 border border-dashed border-slate-700 rounded-xl">No articles found.</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- SITE CONTENT TAB --- */}
                            {activeTab === "content" && siteContent && (
                                <div className="max-w-6xl mx-auto space-y-12 pb-24">
                                    {/* Tab Header - Sticky */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sticky top-[-2rem] z-40 bg-slate-900/90 backdrop-blur-xl py-6 border-b border-slate-800/50 mb-10 gap-4">
                                        <div>
                                            <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                                                <div className="p-2 bg-brand-orange/10 rounded-lg">
                                                    <Settings className="w-6 h-6 text-brand-orange" />
                                                </div>
                                                Site Content Editor
                                            </h2>
                                            <p className="text-sm text-slate-500 mt-1 font-medium">Global configuration and section management</p>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <button 
                                                onClick={handleContentSubmit} 
                                                disabled={loading} 
                                                className="flex-1 sm:flex-none bg-gradient-to-r from-brand-orange to-orange-600 text-white px-10 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] transition-all duration-300 font-bold text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed group"
                                            >
                                                {loading ? (
                                                    <span className="flex items-center gap-2">
                                                        <Activity className="w-4 h-4 animate-spin" />
                                                        Saving...
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-2">
                                                        Save Changes
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-10">
                                        {/* HERO SECTION */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-brand-orange/30 transition-all duration-500`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-orange shadow-[0_0_15px_rgba(255,107,0,0.5)]"></div>
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-2xl font-black flex items-center gap-3 text-white">
                                                    <LayoutGrid className="w-6 h-6 text-brand-orange" />
                                                    Home Hero Section
                                                </h3>
                                                <div className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-widest rounded-full">Primary Content</div>
                                            </div>
                                            
                                            <div className="grid lg:grid-cols-2 gap-10">
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Main Headline</label>
                                                        <input 
                                                            value={siteContent.hero.title} 
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentChange('hero', 'title', e.target.value)} 
                                                            className={inputClass} 
                                                            placeholder="e.g. Precision Engineering for Modern Foundry" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Supporting Subtitle</label>
                                                        <textarea 
                                                            value={siteContent.hero.subtitle} 
                                                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleContentChange('hero', 'subtitle', e.target.value)} 
                                                            className={`${inputClass} min-h-[100px]`} 
                                                            placeholder="Tell your brand story in a few words..." 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className={labelClass}>Hero Background Image</label>
                                                    <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-700/50 bg-slate-900 group/image">
                                                        {siteContent.hero.bgImage ? (
                                                            <Image src={siteContent.hero.bgImage} alt="Hero PREVIEW" fill className="object-cover transition-transform duration-700 group-hover/image:scale-110" />
                                                        ) : (
                                                            <div className="absolute inset-0 flex items-center justify-center text-slate-600">No Image Uploaded</div>
                                                        )}
                                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                            <label className="cursor-pointer bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                                                                <Plus className="w-4 h-4" />
                                                                Replace Image
                                                                <input type="file" accept="image/*" onChange={(e) => handleContentImageUpload(e, 'hero')} className="hidden" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-center">Recommended size: 1920x1080px (Lossless WEBP/JPG)</p>
                                                </div>
                                            </div>
                                        </section>

                                        {/* ABOUT SECTION (HOME) */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white">
                                                <Activity className="w-6 h-6 text-blue-500" />
                                                Company Introduction (Home)
                                            </h3>
                                            <div className="grid lg:grid-cols-2 gap-10">
                                                <div className="space-y-6">
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className={labelClass}>Small Label</label>
                                                            <input value={siteContent.about.title} onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentChange('about', 'title', e.target.value)} className={inputClass} placeholder="WHO WE ARE" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className={labelClass}>Main Section Title</label>
                                                            <input value={siteContent.about.heading} onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentChange('about', 'heading', e.target.value)} className={inputClass} placeholder="Excellence in Engineering" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Introduction Text</label>
                                                        <textarea value={siteContent.about.description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleContentChange('about', 'description', e.target.value)} rows={6} className={inputClass} placeholder="Full company introduction..." />
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Key Highlight Points (JSON or New line)</label>
                                                        <textarea 
                                                            value={siteContent.about.bulletPoints.join('\n')} 
                                                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleContentChange('about', 'bulletPoints', e.target.value.split('\n').filter(p => p.trim()))} 
                                                            rows={4} 
                                                            className={inputClass} 
                                                            placeholder="Point 1&#10;Point 2&#10;Point 3" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>About Image</label>
                                                        <div className="relative h-44 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group/item">
                                                            {siteContent.about.imageUrl && <Image src={siteContent.about.imageUrl} alt="About" fill className="object-cover" />}
                                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/item:opacity-100 flex items-center justify-center transition-opacity">
                                                                <label className="cursor-pointer p-3 bg-white rounded-full text-slate-900 shadow-xl hover:scale-110 transition-transform">
                                                                    <Plus className="w-5 h-5" />
                                                                    <input type="file" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentImageUpload(e, 'about')} className="hidden" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* SOCIAL LINKS & COMPANY PROFILE */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white">
                                                <Users className="w-6 h-6 text-emerald-500" />
                                                Connections & Resources
                                            </h3>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                <div className="space-y-6 lg:col-span-2">
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        {(['facebook', 'linkedin', 'instagram', 'twitter', 'youtube'] as const).map(platform => (
                                                            <div key={platform} className="space-y-1">
                                                                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                                                    {platform}
                                                                </label>
                                                                <input value={siteContent.socialLinks[platform]} onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentChange('socialLinks', platform, e.target.value)} className={inputClass} placeholder={`https://${platform}.com/...`} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-center gap-6">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                                                <FileText className="w-5 h-5 text-emerald-500" />
                                                            </div>
                                                            <h4 className="font-bold text-white text-sm">Company Profile PDF</h4>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <input 
                                                                value={siteContent.companyProfileUrl} 
                                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleRootContentChange('companyProfileUrl', e.target.value)} 
                                                                className={inputClass} 
                                                                placeholder="Paste PDF Link here..." 
                                                            />
                                                            <label className="cursor-pointer bg-brand-blue text-white px-3 flex items-center justify-center rounded-xl font-bold text-[10px] uppercase hover:bg-brand-orange transition-colors min-w-fit shadow-lg shadow-brand-blue/20">
                                                                <Plus className="w-4 h-4 mr-1" />
                                                                PDF
                                                                <input type="file" accept="application/pdf" onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentImageUpload(e, 'companyProfile')} className="hidden" />
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4 pt-4 border-t border-slate-700/50">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-brand-blue/10 rounded-lg">
                                                                <Globe className="w-5 h-5 text-brand-blue" />
                                                            </div>
                                                            <h4 className="font-bold text-white text-sm">Website Favicon</h4>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-xl border border-slate-700 bg-slate-950 flex items-center justify-center overflow-hidden shrink-0">
                                                                {siteContent.faviconUrl && <img src={siteContent.faviconUrl} alt="Favicon" className="w-8 h-8 object-contain" />}
                                                            </div>
                                                            <label className="flex-1 cursor-pointer bg-slate-800 text-slate-300 px-4 py-3 rounded-xl font-bold text-[10px] uppercase hover:bg-slate-700 transition-colors text-center border border-slate-700">
                                                                Change Favicon
                                                                <input type="file" accept="image/x-icon,image/png,image/svg+xml" onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentImageUpload(e, 'favicon')} className="hidden" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* INFRASTRUCTURE & GALLERIES */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white">
                                                <Activity className="w-6 h-6 text-purple-500" />
                                                Infrastructure & Visual Assets
                                            </h3>
                                            <div className="space-y-10">
                                                <div className="space-y-2">
                                                    <label className={labelClass}>Infrastructure Overview Video (YouTube URL)</label>
                                                    <input value={siteContent.infrastructure.videoUrl} onChange={(e) => handleContentChange('infrastructure', 'videoUrl', e.target.value)} className={inputClass} placeholder="https://www.youtube.com/watch?v=..." />
                                                </div>
                                                
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                                                        <h4 className="font-bold text-slate-300 uppercase text-xs tracking-widest flex items-center gap-2">
                                                            <LayoutGrid className="w-4 h-4" />
                                                            Company Facility Gallery
                                                        </h4>
                                                        <span className="text-[10px] text-slate-500 font-bold">{siteContent.infrastructure.companyImages.length} IMAGES</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                                                        {siteContent.infrastructure.companyImages.map((img: string, idx: number) => (
                                                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group/gal">
                                                                <Image src={img} alt="Facility" fill className="object-cover" />
                                                                <button 
                                                                    onClick={() => removeInfrastructureImage('companyImages', idx)} 
                                                                    className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-lg text-white opacity-0 group-hover/gal:opacity-100 transition-all hover:scale-110 shadow-lg"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl hover:border-brand-orange hover:bg-brand-orange/5 transition-all cursor-pointer aspect-square bg-slate-900/30 group/upload">
                                                            <Plus className="w-8 h-8 text-slate-600 group-hover/upload:text-brand-orange transition-colors" />
                                                            <span className="text-[10px] text-slate-500 mt-2 font-black uppercase">Add Photo</span>
                                                            <input type="file" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentImageUpload(e, 'infrastructure', undefined, 'companyImages')} className="hidden" />
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                                                        <h4 className="font-bold text-slate-300 uppercase text-xs tracking-widest flex items-center gap-2">
                                                            <Shield className="w-4 h-4 text-brand-orange" />
                                                            Certificates & Licensing
                                                        </h4>
                                                        <span className="text-[10px] text-slate-500 font-bold">{siteContent.infrastructure.certificates.length} DOCUMENTS</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                                                        {siteContent.infrastructure.certificates.map((img: string, idx: number) => (
                                                            <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group/cert">
                                                                <Image src={img} alt="Certificate" fill className="object-cover" />
                                                                <button 
                                                                    onClick={() => removeInfrastructureImage('certificates', idx)} 
                                                                    className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-lg text-white opacity-0 group-hover/cert:opacity-100 transition-all hover:scale-110 shadow-lg"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl hover:border-brand-orange hover:bg-brand-orange/5 transition-all cursor-pointer aspect-[3/4] bg-slate-900/30 group/upload">
                                                            <Plus className="w-8 h-8 text-slate-600 group-hover/upload:text-brand-orange transition-colors" />
                                                            <span className="text-[10px] text-slate-500 mt-2 font-black uppercase text-center px-2">Upload Certificate</span>
                                                            <input type="file" accept="image/*" onChange={(e) => handleContentImageUpload(e, 'infrastructure', undefined, 'certificates')} className="hidden" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* ABOUT PAGE SECTIONS (MISSION/VISION) */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-sky-500/30 transition-all duration-500`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
                                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white">
                                                <Activity className="w-6 h-6 text-sky-500" />
                                                About Us Page Strategy
                                            </h3>
                                            <div className="grid lg:grid-cols-2 gap-8">
                                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 space-y-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="p-2 bg-sky-500/10 rounded-lg">
                                                            <ArrowRight className="w-5 h-5 text-sky-500" />
                                                        </div>
                                                        <h4 className="font-bold text-white uppercase text-sm tracking-wider">Mission Statement</h4>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className={labelClass}>Mission Title</label>
                                                            <input value={siteContent.aboutPage.missionTitle} onChange={(e) => handleContentChange('aboutPage', 'missionTitle', e.target.value)} className={inputClass} placeholder="Our Mission" />
                                                        </div>
                                                        <div>
                                                            <label className={labelClass}>Mission Description</label>
                                                            <textarea value={siteContent.aboutPage.missionText} onChange={(e) => handleContentChange('aboutPage', 'missionText', e.target.value)} rows={4} className={inputClass} placeholder="We strive to..." />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 space-y-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="p-2 bg-brand-orange/10 rounded-lg">
                                                            <Activity className="w-5 h-5 text-brand-orange" />
                                                        </div>
                                                        <h4 className="font-bold text-white uppercase text-sm tracking-wider">Vision Statement</h4>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className={labelClass}>Vision Title</label>
                                                            <input value={siteContent.aboutPage.visionTitle} onChange={(e) => handleContentChange('aboutPage', 'visionTitle', e.target.value)} className={inputClass} placeholder="Our Vision" />
                                                        </div>
                                                        <div>
                                                            <label className={labelClass}>Vision Description</label>
                                                            <textarea value={siteContent.aboutPage.visionText} onChange={(e) => handleContentChange('aboutPage', 'visionText', e.target.value)} rows={4} className={inputClass} placeholder="To become the benchmark..." />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* PROCESS STEPS */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-500`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-2xl font-black flex items-center gap-3 text-white">
                                                    <Activity className="w-6 h-6 text-yellow-500" />
                                                    Production Workflow Steps
                                                </h3>
                                                <button 
                                                    onClick={() => {
                                                        const newSteps = [...siteContent.processPage.steps, { title: "New Step", description: "Step detail", imageUrl: "" }];
                                                        handleContentChange('processPage', 'steps', newSteps);
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg font-black text-[10px] uppercase transition-transform hover:scale-105"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add Step
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-6">
                                                {siteContent.processPage.steps.map((step: ProcessStep, idx: number) => (
                                                    <div key={idx} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 flex flex-col md:flex-row gap-6 relative group/step h-fit transition-colors hover:border-slate-500/50">
                                                        <div className="absolute top-[-0.75rem] left-[-0.75rem] w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black z-10 shadow-lg select-none">
                                                            {idx + 1}
                                                        </div>
                                                        <div className="w-full md:w-1/3 space-y-4">
                                                            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group/img">
                                                                {step.imageUrl && <Image src={step.imageUrl} alt={step.title} fill className="object-cover" />}
                                                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                                                    <label className="cursor-pointer bg-white text-slate-900 p-2 rounded-full font-bold shadow-xl hover:scale-110 transition-transform">
                                                                        <Plus className="w-4 h-4" />
                                                                        <input type="file" accept="image/*" onChange={(e) => handleContentImageUpload(e, 'processPage', idx)} className="hidden" />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 space-y-4">
                                                            <div>
                                                                <label className={labelClass}>Step Title</label>
                                                                <input 
                                                                    value={step.title} 
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        const newSteps = [...siteContent.processPage.steps];
                                                                        newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                                                                        handleContentChange('processPage', 'steps', newSteps);
                                                                    }} 
                                                                    className={inputClass} 
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className={labelClass}>Step Description</label>
                                                                <textarea 
                                                                    value={step.description} 
                                                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                                                        const newSteps = [...siteContent.processPage.steps];
                                                                        newSteps[idx] = { ...newSteps[idx], description: e.target.value };
                                                                        handleContentChange('processPage', 'steps', newSteps);
                                                                    }} 
                                                                    rows={2} 
                                                                    className={inputClass} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                const newSteps = siteContent.processPage.steps.filter((_, i) => i !== idx);
                                                                handleContentChange('processPage', 'steps', newSteps);
                                                            }}
                                                            className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                            title="Delete Step"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {siteContent.processPage.steps.length === 0 && (
                                                    <div className="text-center py-20 border border-dashed border-slate-700 rounded-3xl">
                                                        <div className="p-4 bg-slate-800 rounded-2xl w-fit mx-auto mb-4 border border-slate-700">
                                                            <Activity className="w-8 h-8 text-slate-600" />
                                                        </div>
                                                        <h4 className="font-bold text-slate-500 mb-1 tracking-tight">Workflow is Empty</h4>
                                                        <p className="text-xs text-slate-600">Click "Add Step" to begin building your production process section.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        {/* FEATURES / SERVICES */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-brand-blue/30 transition-all duration-500`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue shadow-[0_0_15px_rgba(0,113,255,0.5)]"></div>
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-2xl font-black flex items-center gap-3 text-white">
                                                    <LayoutGrid className="w-6 h-6 text-brand-blue" />
                                                    Service Features & Capabilities
                                                </h3>
                                                <button 
                                                    onClick={addFeature}
                                                    className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg font-black text-[10px] uppercase transition-transform hover:scale-105"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add Feature
                                                </button>
                                            </div>
                                            
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {siteContent.features.map((feature: Feature, idx: number) => (
                                                    <div key={idx} className="bg-slate-900/80 p-6 rounded-2xl border border-slate-700/50 space-y-4 relative group/feat overflow-hidden h-fit transition-all hover:border-brand-blue/50">
                                                        <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group/img">
                                                            {feature.imageUrl && <Image src={feature.imageUrl} alt={feature.title} fill className="object-cover" />}
                                                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                                                <label className="cursor-pointer bg-white text-slate-900 p-2 rounded-full font-bold shadow-xl hover:scale-110 transition-transform">
                                                                    <Plus className="w-4 h-4" />
                                                                    <input type="file" accept="image/*" onChange={(e) => handleContentImageUpload(e, 'features', idx)} className="hidden" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <input 
                                                                value={feature.title} 
                                                                onChange={(e) => handleContentChange('features', 'title', e.target.value, idx)} 
                                                                className="w-full bg-transparent border-none text-white font-black text-lg p-0 focus:ring-0 placeholder:text-slate-700" 
                                                                placeholder="Feature Name"
                                                            />
                                                        </div>
                                                        <div>
                                                            <textarea 
                                                                value={feature.description} 
                                                                onChange={(e) => handleContentChange('features', 'description', e.target.value, idx)} 
                                                                rows={3} 
                                                                className="w-full bg-transparent border-none text-slate-400 text-sm p-0 focus:ring-0 resize-none placeholder:text-slate-700" 
                                                                placeholder="Short description of the service..."
                                                            />
                                                        </div>
                                                        <div className="pt-2 border-t border-slate-800">
                                                            <label className="text-[10px] font-black text-slate-600 uppercase mb-1 block tracking-wider">Internal Link URL</label>
                                                            <input 
                                                                value={feature.linkUrl} 
                                                                onChange={(e) => handleContentChange('features', 'linkUrl', e.target.value, idx)} 
                                                                className="w-full bg-transparent border-none text-brand-blue text-xs p-0 focus:ring-0 placeholder:text-slate-700 font-bold" 
                                                                placeholder="/products"
                                                            />
                                                        </div>
                                                        <button 
                                                            onClick={() => removeFeature(idx)}
                                                            className="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover/feat:opacity-100"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* FOOTER SETTINGS */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-brand-orange/30 transition-all duration-500 mb-10`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-orange shadow-[0_0_15px_rgba(255,102,0,0.5)]"></div>
                                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white">
                                                <LayoutDashboard className="w-6 h-6 text-brand-orange" />
                                                Footer Configuration
                                            </h3>
                                            <div className="grid lg:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Office Address (Headquarters)</label>
                                                        <textarea 
                                                            value={siteContent.footer.officeAddress} 
                                                            onChange={(e) => handleContentChange('footer', 'officeAddress', e.target.value)} 
                                                            className={inputClass} 
                                                            rows={2}
                                                            placeholder="225/2 CIT Road, Scheme VII M, Kolkata - 700054, India" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Works Address (Factory/Warehouse)</label>
                                                        <textarea 
                                                            value={siteContent.footer.worksAddress} 
                                                            onChange={(e) => handleContentChange('footer', 'worksAddress', e.target.value)} 
                                                            className={inputClass} 
                                                            rows={2}
                                                            placeholder="Works: Howrah - 711410" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Copyright Text</label>
                                                        <input 
                                                            value={siteContent.footer.copyrightText} 
                                                            onChange={(e) => handleContentChange('footer', 'copyrightText', e.target.value)} 
                                                            className={inputClass} 
                                                            placeholder="Atlas Foundries. All Rights Reserved." 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Contact Phone (Footer)</label>
                                                        <input 
                                                            value={siteContent.footer.contactPhone} 
                                                            onChange={(e) => handleContentChange('footer', 'contactPhone', e.target.value)} 
                                                            className={inputClass} 
                                                            placeholder="+91 98307 35480" 
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Contact Email (Footer)</label>
                                                        <input 
                                                            value={siteContent.footer.contactEmail} 
                                                            onChange={(e) => handleContentChange('footer', 'contactEmail', e.target.value)} 
                                                            className={inputClass} 
                                                            placeholder="enquiry@atlasfoundries.com" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* CTA SECTION (HOME) */}
                                        <section className={`${cardClass} relative overflow-hidden group hover:border-red-500/30 transition-all duration-500 mb-20`}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
                                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white">
                                                <ArrowRight className="w-6 h-6 text-red-500" />
                                                Action Incentive (Bottom CTA)
                                            </h3>
                                            <div className="grid lg:grid-cols-2 gap-10">
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>CTA Headline</label>
                                                        <input value={siteContent.homeCTA.title} onChange={(e) => handleContentChange('homeCTA', 'title', e.target.value)} className={inputClass} placeholder="Let's build together" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className={labelClass}>Supporting Message</label>
                                                        <input value={siteContent.homeCTA.subtitle} onChange={(e) => handleContentChange('homeCTA', 'subtitle', e.target.value)} className={inputClass} placeholder="Contact us for a quote" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className={labelClass}>Button Text</label>
                                                            <input value={siteContent.homeCTA.buttonText} onChange={(e) => handleContentChange('homeCTA', 'buttonText', e.target.value)} className={inputClass} placeholder="Get Started" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className={labelClass}>Target Link</label>
                                                            <input value={siteContent.homeCTA.buttonLink} onChange={(e) => handleContentChange('homeCTA', 'buttonLink', e.target.value)} className={inputClass} placeholder="/contact-us" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className={labelClass}>CTA Background / Side Image</label>
                                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 group/cta">
                                                        {siteContent.homeCTA.bgImage && <Image src={siteContent.homeCTA.bgImage} alt="CTA" fill className="object-cover" />}
                                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/cta:opacity-100 flex items-center justify-center transition-opacity">
                                                            <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-lg font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                                                                <Plus className="w-4 h-4" />
                                                                Change Image
                                                                <input type="file" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => handleContentImageUpload(e, 'homeCTA')} className="hidden" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'subscription' && siteContent && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-10 pb-20"
                                >
                                    {/* Epic Header Section */}
                                    <header className="relative p-12 rounded-[50px] overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-xl group">
                                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-blue/10 transition-all duration-700"></div>
                                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-orange/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                        
                                        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl w-fit">
                                                    <ShieldCheck className="w-5 h-5 text-brand-blue" />
                                                    <span className="text-[11px] font-black text-brand-blue uppercase tracking-[0.2em]">Secure Infrastructure</span>
                                                </div>
                                                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                                                    Digital Asset <br />
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-orange">Status & Legal</span>
                                                </h1>
                                                <p className="text-slate-400 font-bold max-w-xl text-lg leading-relaxed">
                                                    Comprehensive oversight of Atlas Foundries' digital footprint, renewal monitoring, and legal compliance.
                                                </p>
                                            </div>
                                            
                                            <div className="bg-slate-950/50 backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] flex items-center gap-6 shadow-2xl">
                                                <div className="relative">
                                                    <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl border border-brand-blue/30 flex items-center justify-center">
                                                        <Activity className="w-8 h-8 text-brand-blue animate-pulse" />
                                                    </div>
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-slate-950"></div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">System Health</div>
                                                    <div className="text-xl font-black text-white tracking-tighter uppercase">All Systems Normal</div>
                                                </div>
                                            </div>
                                        </div>
                                    </header>

                                    {/* Asset Intelligence Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Primary Domain', value: siteContent.subscription.domainName, icon: Globe, accent: 'brand-blue' },
                                            { label: 'Domain Renewal', value: "28th May 2026", icon: Calendar, accent: 'brand-orange' },
                                            { label: 'Cloud Hosting', value: siteContent.subscription.hostName, icon: Server, accent: 'brand-blue' },
                                            { label: 'Host Renewal', value: "28th May 2026", icon: Calendar, accent: 'brand-orange' }
                                        ].map((asset, i) => (
                                            <motion.div 
                                                key={asset.label}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-slate-900/30 border border-white/10 p-8 rounded-[40px] backdrop-blur-2xl relative overflow-hidden group hover:border-brand-blue/30 transition-all duration-500 cursor-default shadow-xl"
                                            >
                                                <div className="relative z-10">
                                                    <div className={`w-12 h-12 rounded-2xl bg-${asset.accent}/10 border border-${asset.accent}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                        <asset.icon className={`w-6 h-6 text-${asset.accent}`} />
                                                    </div>
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">{asset.label}</h4>
                                                    <div className="text-xl font-black text-white tracking-tight leading-tight">
                                                        {asset.value}
                                                    </div>
                                                </div>
                                                <div className={`absolute top-0 right-0 w-24 h-24 bg-${asset.accent}/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-${asset.accent}/10 transition-all`}></div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Main Content Blueprint */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                        {/* Infrastructure Blueprint Section */}
                                        <div className="lg:col-span-8">
                                            <div className="bg-slate-900/50 border border-white/10 rounded-[60px] p-10 relative overflow-hidden h-full">
                                                <div className="absolute top-0 right-0 p-8">
                                                    <div className="w-48 h-48 bg-brand-blue/5 blur-[80px] rounded-full"></div>
                                                </div>
                                                
                                                <div className="relative">
                                                    <div className="flex items-center gap-6 mb-12">
                                                        <div className="p-6 bg-slate-950 border border-white/10 rounded-3xl shadow-inner">
                                                            <Activity className="w-12 h-12 text-brand-blue" />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-1">Architecture Blueprint</h2>
                                                            <p className="text-brand-blue font-black tracking-widest text-[11px] uppercase opacity-70">Custom Tailored by Dreamline Production</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                        <div className="space-y-6">
                                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Ecosystem Summary</h3>
                                                            <p className="text-slate-400 font-bold leading-relaxed text-lg">
                                                                The Atlas Foundries digital infrastructure is built on a <span className="text-white italic underline decoration-brand-blue decoration-2">cutting-edge reactive framework</span> designed for extreme scalability and real-time content management.
                                                            </p>
                                                            <div className="p-6 bg-brand-blue/10 border border-brand-blue/20 rounded-[32px] space-y-3">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full"></div>
                                                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Core Engine</span>
                                                                </div>
                                                                <p className="text-sm font-bold text-slate-300 leading-relaxed">
                                                                    Next.js 14 utilizing App Router and Server Components for optimal SEO performance and instantaneous load times.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-8">
                                                            <div className="space-y-6">
                                                                {[
                                                                    { title: 'Data Layer', desc: 'Secure MongoDB aggregation with Mongoose ORM for structured industrial data.', icon: Server },
                                                                    { title: 'Visual System', desc: 'Tailwind CSS v3 for ultra-responsive layouts and high-fidelity aesthetics.', icon: LayoutGrid },
                                                                    { title: 'Security Matrix', desc: 'NextAuth.js authentication with military-grade JWT encryption.', icon: Lock }
                                                                ].map((feat, i) => (
                                                                    <div key={feat.title} className="flex gap-5 group/item">
                                                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-center group-hover/item:border-brand-blue/30 transition-all">
                                                                            <feat.icon className="w-5 h-5 text-brand-blue" />
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">{feat.title}</h4>
                                                                            <p className="text-xs text-slate-500 font-bold leading-relaxed">{feat.desc}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Compliance & Support Column */}
                                        <div className="lg:col-span-4 space-y-8">
                                            {/* Legal Compliance Exhibit */}
                                            <div className="bg-slate-900/50 border border-white/10 p-10 rounded-[50px] relative overflow-hidden group border-t-brand-orange border-t-4 shadow-2xl">
                                                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                                
                                                <div className="flex items-center gap-5 mb-10">
                                                    <div className="p-4 bg-brand-orange/10 rounded-2xl border border-brand-orange/20">
                                                        <Shield className="w-8 h-8 text-brand-orange" />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">Compliance</h2>
                                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Legal Status: Certified</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-5">
                                                    {[
                                                        { title: 'Jurisdiction Monitoring', desc: 'Subject to exclusive jurisdiction of Indian courts in compliance with IT Act 2000.' },
                                                        { title: 'Digital Data Protocols', desc: 'Adherence to SPDI Rules (2011) for high-tier data protection and encryption.' },
                                                        { title: 'Intermediary Terms', desc: 'Strict compliance with Section 79 of IT Act regarding industrial platform liability.' }
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="p-5 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all">
                                                            <h4 className="text-xs font-black text-slate-300 uppercase tracking-tighter mb-2">{item.title}</h4>
                                                            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Technical Helpdesk Section */}
                                            <div className="bg-brand-blue/10 border border-brand-blue/30 p-10 rounded-[50px] relative overflow-hidden group shadow-2xl">
                                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/20 blur-3xl rounded-full"></div>
                                                <div className="relative">
                                                    <div className="flex items-center gap-5 mb-8">
                                                        <div className="p-4 bg-slate-950 border border-brand-blue/20 rounded-2xl shadow-xl">
                                                            <Phone className="w-8 h-8 text-brand-blue animate-pulse" />
                                                        </div>
                                                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-tight">Technical <br /> Support</h3>
                                                    </div>
                                                    <p className="text-slate-400 text-sm font-bold leading-relaxed mb-8">
                                                        Direct access to industrial infrastructure support for Atlas Foundries mission-critical systems.
                                                    </p>
                                                    <div className="bg-slate-950/80 border border-white/10 p-6 rounded-[32px] text-center group-hover:border-brand-blue/50 transition-all shadow-inner">
                                                        <div className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-2">Priority Helpline</div>
                                                        <div className="text-3xl font-black text-white tracking-tighter hover:text-brand-blue transition-colors cursor-pointer">
                                                            82400 54002
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Toast Notifications */}
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
        </div>
    );
}
