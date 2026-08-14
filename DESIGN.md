---
name: Kinetic Axis
colors:
  surface: '#fff8f2'
  surface-dim: '#e4d8c8'
  surface-bright: '#fff8f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fef2e1'
  surface-container: '#f9ecdb'
  surface-container-high: '#f3e6d6'
  surface-container-highest: '#ede1d0'
  on-surface: '#201b11'
  on-surface-variant: '#514532'
  inverse-surface: '#363024'
  inverse-on-surface: '#fbefde'
  outline: '#837560'
  outline-variant: '#d5c4ab'
  surface-tint: '#7c5800'
  primary: '#7c5800'
  on-primary: '#ffffff'
  primary-container: '#ffb804'
  on-primary-container: '#6c4b00'
  inverse-primary: '#ffba22'
  secondary: '#775a20'
  on-secondary: '#ffffff'
  secondary-container: '#fdd48e'
  on-secondary-container: '#785a20'
  tertiary: '#00687b'
  on-tertiary: '#ffffff'
  tertiary-container: '#00d7fe'
  on-tertiary-container: '#005a6b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#ffba22'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#e8c17d'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5d4208'
  tertiary-fixed: '#b0ecff'
  tertiary-fixed-dim: '#17d8ff'
  on-tertiary-fixed: '#001f27'
  on-tertiary-fixed-variant: '#004e5d'
  background: '#fff8f2'
  on-background: '#201b11'
  surface-variant: '#ede1d0'
typography:
  display-xl:
    fontFamily: Syne
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-desktop: 5rem
  margin-mobile: 1.5rem
  gutter: 1.5rem
  section-gap: 10rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

# DESIGN SYSTEM & ARCHITECTURE SPECIFICATION (design.md)
**Project:** Axípeto — Website Institucional Interativo
**Target Engine/Platform:** Stitch / Webflow / Next.js + Tailwind CSS + Framer Motion
**Style Concept:** Light/Kinetic Minimalism, Centripetal Motion Design, Swiss Typography, Ultra-Interactive.

---

## 1. VISION & CORE CONCEPT

Axípeto derives from the physical concept of *centripetal force*—the force that pulls moving objects toward a central axis. In an era of fragmented marketing channels and chaotic agency setups ("centrifugal dispersion"), Axípeto acts as the central unifying axis.

### Design Metaphor: "The Centripetal Axis"
- **Visuals:** Concentric circles, spiral grids, smooth orbital motion, clean whitespace, precise typography, and a luminous light-mode foundation with high-contrast accent gold/amber highlights (`#FEB700`).
- **User Experience:** Fluid transitions, subtle parallax scroll, interactive service hubs, magnetic cursor feedback, and dynamic filter/tab interactions.

---

## 2. COLOR PALETTE & DESIGN TOKENS

### Primary Palette
- **Background Main (Light Theme):** `#FFF9EF` (Warm Paper / Bone)
- **Background Secondary / Cards:** `#F6EDDC` (Tonal Container)
- **Background Light Accent:** `#FAFAFA` (Off-white for clean contrast sections)
- **Primary Brand Accent (Asterisk / Centripetal Energy):** `#FEB700` (Axípeto Amber Gold)
- **Secondary Brand Tone:** `#927236` (Bronze Earth)
- **Tertiary Highlight:** `#00D7FE` (Cyan Spark)
- **Text Primary (Light Theme):** `#1F1B13` (Deep Charcoal Ink)
- **Text Secondary:** `#7F7668` (Muted Slate)
- **Borders & Dividers:** `rgba(0, 0, 0, 0.08)`

---

## 3. TYPOGRAPHY SYSTEM

- **Primary Sans Font (UI & Body):** `Plus Jakarta Sans`
- **Display / Heading Font:** `Syne` (Modern, bold geometric sans-serif)
- **Monospace Accent (Data & Clusters):** `JetBrains Mono`

---

## 4. SITE STRUCTURE & PAGE ARCHITECTURE

### Section 1: Hero Section ("The Centripetal Force")
- **Manifesto Header:** Large bold typography. Quote by Byung-Chul Han gracefully fading in.
- **Headline:** "Da dispersão ao eixo. Do ruído ao resultado."
- **Interactive Component:** Interactive Canvas background with concentric subtle rings reacting to cursor movements, rendered in soft gold and cyan gradients.

### Section 2: Cases & Proof ("Marcas no Nosso Eixo")
- **Infinite Logo Marquee:** Smooth scrolling client list.
- **Interactive Case Cards:** InPeace & UpCities with tab/toggle view, utilizing the new 0.5rem rounded corners.

### Section 3: The Bases / Service Wheel (Interactive Index)
- **Interactive 6-Block Grid / Wheel:** Marketing, Conteúdo, Planejamento, IA, Ads, Dados.
- Clicking a block smooth-scrolls or reveals deep details.

### Section 4-11: Specialized Service Modules
Detailed breakdown of CMO by Demand, Go-To-Market (GTM), UGC Content, Social Media, Planning, AI Integration, Media/Impulsionamento, and Data Architecture.

### Section 12: Delivery Framework ("Como Funciona a Entrega")
- **5-Step Interactive Timeline / Accordion:** Diagnóstico → Plano → Execução → Acompanhamento → Evolução.

### Section 13: High-Conversion Footer & CTA
- **Primary CTA:** "Vamos concentrar o marketing da sua marca?"
- Interactive booking button with primary gold fill and a subtle glow effect.

---

## 5. STITCH IMPLEMENTATION PROMPTS & GUIDELINES

For building in Stitch, use clean semantic HTML structure, Framer Motion animations, custom CSS grid layouts, and responsive breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).