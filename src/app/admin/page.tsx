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

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"products" | "users">("products");
    const [products, setProducts] = useState<Product[]>([]);
    const [users, setUsers] = useState<{ _id: string, email: string, role: string }[]>([]);

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

    // Fetch Products
    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
    };

    // Fetch Users
    const fetchUsers = async () => {
        // We'll use a new endpoint /api/users (which we can alias to /api/register for now or creating a new one)
        // For now, let's assume we implement GET /api/users
        // Check if we created /api/users? No, we created /api/register (POST only).
        // Let's use /api/register for creation and add GET support there or make a new one.
        // For simplicity, I'll update the component to fetch from a hypothetically created /api/users.
        // Wait, I haven't created GET /api/users yet. I should do that.
        // I will assume I will create it.
        const res = await fetch("/api/users");
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) setUsers(data);
        }
    };

    useEffect(() => {
        if (activeTab === "products") fetchProducts();
        if (activeTab === "users") fetchUsers();
    }, [activeTab]);

    // Handle Product Form Input
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

    // Handle User Form Input
    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle Image Upload (Base64)
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("File size too large! Please upload an image smaller than 10MB.");
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

    // Submit Product Form
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

    // Submit User Form
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

    // Delete Product
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) fetchProducts();
    };

    // Edit Product
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

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-brand-blue">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`px-4 py-2 rounded-lg font-bold ${activeTab === "products" ? "bg-brand-blue text-white" : "bg-white text-gray-600"}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`px-4 py-2 rounded-lg font-bold ${activeTab === "users" ? "bg-brand-blue text-white" : "bg-white text-gray-600"}`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => window.location.href = "/api/auth/signout"}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {activeTab === "products" && (
                <>
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
                        <h2 className="text-2xl font-bold mb-6">{isEditing ? "Edit Product" : "Add New Product"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Product Title</label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Railway Coupler"
                                        className="w-full p-3 border rounded-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Slug (Auto-generated)</label>
                                    <input
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg bg-gray-100"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-lg"
                                    >
                                        <option value="Railway">Railway</option>
                                        <option value="Industrial">Industrial</option>
                                        <option value="Marine">Marine</option>
                                        <option value="Automotive">Automotive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Image</label>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
                                    {formData.imageUrl && (
                                        <div className="mt-2 h-20 w-20 relative border rounded overflow-hidden">
                                            <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-brand-blue text-white px-8 py-3 rounded-lg hover:bg-brand-orange transition-colors font-bold"
                                >
                                    {loading ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
                                </button>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditing(null); setFormData({ title: "", slug: "", imageUrl: "", description: "", category: "Industrial" }); }}
                                        className="text-gray-500 hover:text-red-500 font-bold px-4"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">Existing Products</h2>
                        <div className="grid gap-4">
                            {products.map((product) => (
                                <div key={product._id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                                    <div className="h-16 w-16 relative bg-gray-100 rounded overflow-hidden shrink-0">
                                        {product.imageUrl && <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{product.title}</h3>
                                        <p className="text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(product)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-bold">Edit</button>
                                        <button onClick={() => handleDelete(product._id)} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded text-sm font-bold">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {activeTab === "users" && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
                        <h2 className="text-2xl font-bold mb-6">Add New Admin User</h2>
                        <form onSubmit={handleUserSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={userForm.email}
                                    onChange={handleUserChange}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={userForm.password}
                                    onChange={handleUserChange}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-brand-blue text-white px-8 py-3 rounded-lg hover:bg-brand-orange transition-colors font-bold"
                            >
                                {loading ? "Creating..." : "Create Admin User"}
                            </button>
                        </form>
                    </div>

                    <h2 className="text-2xl font-bold mb-6">Existing Admins</h2>
                    <div className="grid gap-4">
                        {users.map((user) => (
                            <div key={user._id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{user.email}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                                </div>
                                <div className="text-sm text-gray-400">
                                    {/* No delete for now to prevent lockout */}
                                    ID: {user._id}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
