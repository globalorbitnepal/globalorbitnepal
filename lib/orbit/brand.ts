export const ORBIT_BRAND = {
  name: "Global Orbit Pvt Ltd",
  phones: [
    { label: "+977-9823631899", href: "tel:+9779823631899" },
    { label: "+977-9812322339", href: "tel:+9779812322339" },
  ],
  email: "support@theglobalorbit.com",
  salesEmail: "sales@theglobalorbit.com",
  webmail: "https://webmail.globalorbitmail.cloud/",
  whatsapp: "https://wa.me/9779812322339",
  address: "Kathmandu · India · United States",
  offices: [
    { name: "Kathmandu", country: "Nepal", code: "np", role: "Headquarters & engineering" },
    { name: "India", country: "India", code: "in", role: "Delivery studio" },
    { name: "United States", country: "USA", code: "us", role: "Client office" },
  ],
  salesOffices: [
    {
      code: "np",
      country: "Nepal",
      city: "Kathmandu",
      landmark: "Sales office · Kathmandu",
      image: "/brand/offices/nepal.jpg",
      phone: "+977-9823631899",
      phoneHref: "tel:+9779823631899",
      email: "sales@theglobalorbit.com",
    },
    {
      code: "in",
      country: "India",
      city: "Delhi (NCR)",
      landmark: "Sales office · India",
      image: "/brand/offices/india.jpg",
      phone: "+91 11 3500 7890",
      phoneHref: "tel:+911135007890",
      email: "india@theglobalorbit.com",
    },
    {
      code: "us",
      country: "USA",
      city: "United States",
      landmark: "Sales office · USA",
      image: "/brand/offices/usa.jpg",
      phone: "+1 (646) 907-4410",
      phoneHref: "tel:+16469074410",
      email: "usa@theglobalorbit.com",
    },
  ],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/globalorbit" },
    { label: "Instagram", href: "https://www.instagram.com/globalorbit" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/globalorbit" },
    { label: "YouTube", href: "https://www.youtube.com" },
    { label: "TikTok", href: "https://www.tiktok.com" },
  ],
} as const;

export const ORBIT_HEADER_NAV = [
  { label: "Overview", href: "/", location: "HEADER" as const },
  { label: "ERP Software", href: "/orbit-software", location: "HEADER" as const },
  { label: "Solutions", href: "/services", location: "HEADER" as const },
  { label: "Our Work", href: "/projects", location: "HEADER" as const },
  { label: "About Us", href: "/about", location: "HEADER" as const },
  { label: "Contact", href: "/contact", location: "HEADER" as const },
];

export const ORBIT_FOOTER_STATS = [
  { label: "500+ Projects", icon: "rocket" as const },
  { label: "300+ Clients", icon: "clients" as const },
  { label: "4.9/5 Ratings", icon: "star" as const },
];

export const ORBIT_FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export const ORBIT_FOOTER_QUICK = [
  { label: "Home", href: "/", icon: "home" as const },
  { label: "Website Development", href: "/service/website-development-nepal", icon: "website" as const },
  { label: "Hotel Websites", href: "/hotel-website-development-nepal", icon: "hotel" as const },
  { label: "Trekking Websites", href: "/trekking-website-development-nepal", icon: "trek" as const },
  { label: "Restaurant Websites", href: "/restaurant-website-development-nepal", icon: "restaurant" as const },
  { label: "E-commerce", href: "/ecommerce-website-development-nepal", icon: "ecommerce" as const },
  { label: "About Us", href: "/about", icon: "about" as const },
  { label: "Contact", href: "/contact", icon: "contact" as const },
];

export const ORBIT_FOOTER_SERVICES = [
  { label: "Website Development", href: "/service/website-development-nepal", icon: "website" as const },
  { label: "Custom Software Development", href: "/custom-software-development-nepal", icon: "custom" as const },
  { label: "Web Development", href: "/web-development-nepal", icon: "web" as const },
  { label: "ERP Software Nepal", href: "/erp-software-nepal", icon: "erp" as const },
  { label: "SEO Services Nepal", href: "/seo-services-nepal", icon: "seo" as const },
  { label: "Local SEO Nepal", href: "/local-seo-nepal", icon: "local" as const },
  { label: "Software Products", href: "/orbit-software", icon: "products" as const },
];
