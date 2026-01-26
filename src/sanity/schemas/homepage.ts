import { defineField, defineType } from "sanity";

export default defineType({
    name: "homepage",
    title: "Homepage",
    type: "document",
    fields: [
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "text",
        }),
        defineField({
            name: "heroImage",
            title: "Hero Background Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "aboutTitle",
            title: "About Section Title",
            type: "string",
        }),
        defineField({
            name: "aboutText",
            title: "About Text",
            type: "array",
            of: [{ type: "block" }],
        }),
    ],
});
