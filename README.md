# Common Grounds — Café Website Demo

A responsive café website demo built with React, TypeScript, Tailwind CSS, Lucide, Framer Motion, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## Before using for a real café

- Replace the sample café name, story, menu items, rupee prices, photographs, opening hours, address, and contact details in `src/App.tsx`.
- Replace Unsplash image URLs with owner-provided or appropriately licensed, optimized café photography.
- Configure the verified international WhatsApp number in `orderOnWhatsApp` (`https://wa.me/<number>?text=...`). The current link opens WhatsApp with the prepared message but has no recipient configured.
- The contact form currently validates required fields in the browser and displays a demo acknowledgement. Connect its submit handler to a real form service or backend before accepting customer enquiries.
- Online card checkout and payment are not enabled. Add a server-backed Razorpay (or other payment provider) order flow and confirm the provider response before showing any paid/success state.
- There is no admin dashboard, authentication, or persistent data store. Add a secured backend and database if the café needs owner-managed content.
- Replace the generic map search and sample hours with verified details. Add LocalBusiness structured data only after accurate business details are available.
- Update the sample brand's title, description, Open Graph metadata, social links, privacy notice, and terms before deployment.

The menu, gallery, responsive mobile navigation, category filtering/search, cart quantity controls and subtotal, WhatsApp message composition, and gallery lightbox are implemented on the client.
