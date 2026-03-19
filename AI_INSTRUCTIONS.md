# AI Memory & Business Rules for Atlas Foundries Dashboard

**Repository**: `https://github.com/santrarony9/atlas.git`  
**Build Platform**: Vercel (Production)  
**Build Command**: `npm run build`

These instructions MUST be followed by any AI agent working on this codebase to maintain project integrity and follow specific client requirements.

## 1. Digital Asset Status & Renewal Dates
- **Fixed Renewal Dates**: All domain and hosting renewal dates MUST be set to **28th May 2026**. Do NOT change these dates unless explicitly requested by the user.
- **Read-Only Interface**: The "Digital Asset Status" section in the Admin Dashboard is strictly **read-only** for the client. NEVER replace these text displays with input fields.
- **Status Badges**: Always maintain the "Active/Optimized" visual badges next to asset cards.

## 2. Technical Support Contact
- **Support Hotline**: The dedicated support phone number is **82400 54002**.
- **Display**: This number should always be prominently visible in the infrastructure summary or support cards.

## 3. Security & Account Protection
- **Super Admin Protection**: The user account `santrarony9@gmail.com` is the developer/super admin. 
- **NO DELETION**: NEVER provide or implement an option to delete this specific user account. Ensure both frontend (UI buttons) and backend (API routes) have hardcoded protections for this email address.

## 4. Design Guidelines (Premium Aesthetic)
- **Glassmorphism**: Use frosted glass effects (backdrop-blur, semi-transparent backgrounds, subtle borders) for cards and sections.
- **Animations**: Use **Framer Motion** for smooth, sequential entry animations (opacity, y-offset, scale) on all new segments of the dashboard.
- **Glow Effects**: Use subtle box-shadows and blurred background gradients (brand-blue/orange) to create a glowing ecosystem feel.

## 5. Metadata & Assets
- **Favicon**: The project uses a dynamic favicon system managed through the "Branding" tab. Ensure the `faviconUrl` is correctly fetched in the main `layout.tsx`.
- **Company Profile**: Use the direct PDF upload feature in the "Connections & Resources" tab for profile management.

---
*Created by Antigravity on 2026-03-19*
