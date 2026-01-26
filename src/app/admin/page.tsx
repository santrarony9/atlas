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
    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        imageUrl: "",
        description: "",
        category: "Industrial"
    });
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch Products
    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle Form Input
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-generate slug from title
        if (name === "title") {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
            }));
        }
    };

    // Handle Image Upload (Base64)
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Submit Form (Create or Update)
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
        window.scrollTo(0, 0); // Scroll to form
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-brand-blue">Admin Dashboard</h1>

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
        </div>
    );
}
