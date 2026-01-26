import { groq } from "next-sanity";

// Fetch all products with essential fields for the listing page
export const GET_ALL_PRODUCTS = groq`*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    category
}`;

// Fetch a single product by slug with all fields
export const GET_PRODUCT_BY_SLUG = groq`*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    description,
    category
}`;
