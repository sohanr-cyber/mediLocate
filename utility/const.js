import BASE_URL from '@/config'
// const companyName = 'StyleHive '
const companyName = "MediLocate";

const footerP =
  'Healthcare should be simple and accessible. MedLocate connects patients with nearby doctors quickly and efficiently using location-based search technology.With just one click, you can find the right doctor at the right place'
const Inside_Dhaka = 70
const Outside_Dhaka = 145
const Dhaka_Subburb = 150

const delivery_charge = {
  'Inside Dhaka': 70,
  'Outside Dhaka': 145,
  'Dhaka Subburb': 150
}
const statusMessages = {
  pending:
    'Your appointment request has been received and is waiting for doctor confirmation.',

  confirmed:
    'Your appointment has been confirmed. Please arrive on time.',

  completed:
    'Your appointment has been completed. We hope you had a good consultation.',

  cancelled:
    'Your appointment has been cancelled. You may book another appointment if needed.',

  "no-show":
    'You missed your appointment. Please contact the clinic to reschedule.'
};

const support_number = '8801776863395'
const support_mail = 'Khalidarif031@gmail.com'
const delivery_positions = ['Inside Dhaka', 'Outside Dhaka', 'Dhaka Subburb']
const feacebook_page = 'https://www.facebook.com/'
const messenger = 'https://www.facebook.com/'
const whatsapp = `8801776863395`
const instagram = 'https://www.instagram.com/'


const colors = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Gray', code: '#808080' },
  { name: 'Red', code: '#FF0000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Green', code: '#008000' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Purple', code: '#800080' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Brown', code: '#A52A2A' },
  { name: 'Beige', code: '#F5F5DC' },
  { name: 'Navy', code: '#000080' },
  { name: 'Teal', code: '#008080' },
  { name: 'Maroon', code: '#800000' },
  { name: 'Olive', code: '#808000' },
  { name: 'Cyan', code: '#00FFFF' },
  { name: 'Magenta', code: '#FF00FF' },
  { name: 'Turquoise', code: '#40E0D0' },
  { name: 'Lime', code: '#00FF00' },
  { name: 'Indigo', code: '#4B0082' },
  { name: 'Violet', code: '#8A2BE2' },
  { name: 'Aqua', code: '#00FFFF' },
  { name: 'Silver', code: '#C0C0C0' },
  { name: 'Gold', code: '#FFD700' }
]

const seoData = {
  title: `${companyName} - Find Trusted Healthcare Services Nearby`,
  description:
    "Easily locate hospitals, clinics, pharmacies, and healthcare providers with MediLocate. Your trusted platform for finding quality medical services near you.",
  canonical: BASE_URL,
  openGraph: {
    url: BASE_URL,
    title: `${companyName} - Find Trusted Healthcare Services Nearby`,
    description:
      "Discover hospitals, clinics, and pharmacies with ease using MediLocate. We connect you to trusted healthcare providers in your area.",
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        alt: `${companyName} - Find Trusted Healthcare Services`,
        width: 1200,
        height: 630
      }
    ],
    site_name: companyName
  },
  twitter: {
    handle: `@${companyName}`,
    site: `@${companyName}`,
    cardType: "summary_large_image"
  }
};

const orderCartSeoData = {
  title: `Your Cart - ${companyName}`,
  description: `Review and manage your selected healthcare services and products at ${companyName}.`,
  canonical: `${BASE_URL}/cart`,
  openGraph: {
    title: `Your Cart - ${companyName}`,
    description: `Review and manage your selected healthcare services and products at ${companyName}.`,
    url: `${BASE_URL}/cart`,
    images: [
      {
        url: `${BASE_URL}/images/cart.png`,
        width: 1200,
        height: 630,
        alt: `Your Cart - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const TermsAndConditionSeoData = {
  title: `Terms and Conditions - ${companyName}`,
  description: `Review the terms and conditions for using ${companyName} to find healthcare services and providers.`,
  canonical: `${BASE_URL}/terms-and-conditions`,
  openGraph: {
    title: `Terms and Conditions - ${companyName}`,
    description: `Understand the guidelines and responsibilities when using ${companyName} for healthcare searches.`,
    url: `${BASE_URL}/terms-and-conditions`,
    images: [
      {
        url: `${BASE_URL}/images/terms-and-conditions.png`,
        width: 1200,
        height: 630,
        alt: `Terms and Conditions - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const privacyPolicySeoData = {
  title: `Privacy Policy - ${companyName}`,
  description: `Learn how ${companyName} protects your personal data while helping you find trusted healthcare providers.`,
  canonical: `${BASE_URL}/privacy-policy`,
  openGraph: {
    title: `Privacy Policy - ${companyName}`,
    description: `Find out how ${companyName} ensures your data privacy and security while providing healthcare location services.`,
    url: `${BASE_URL}/privacy-policy`,
    images: [
      {
        url: `${BASE_URL}/images/privacy-policy.png`,
        width: 1200,
        height: 630,
        alt: `Privacy Policy - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const orderDetailSeoData = {
  title: `Order Details - ${companyName}`,
  description: `View and track your healthcare service orders with ${companyName}.`,
  canonical: `${BASE_URL}/order-details`,
  openGraph: {
    title: `Order Details - ${companyName}`,
    description: `View and track your healthcare service orders with ${companyName}.`,
    url: `${BASE_URL}/order-details`,
    images: [
      {
        url: `${BASE_URL}/images/order-details.png`,
        width: 1200,
        height: 630,
        alt: `Order Details - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const reviewSeoData = {
  title: `Review Your Booking - ${companyName}`,
  description: `Confirm your selected healthcare services and provider details before booking with ${companyName}.`,
  canonical: `${BASE_URL}/review`,
  openGraph: {
    title: `Review Your Booking - ${companyName}`,
    description: `Confirm your selected healthcare services and provider details before booking with ${companyName}.`,
    url: `${BASE_URL}/review`,
    images: [
      {
        url: `${BASE_URL}/images/review-order.png`,
        width: 1200,
        height: 630,
        alt: `Review Your Booking - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const addressSeoData = {
  title: `Add Your Address - ${companyName}`,
  description: `Enter your location details to find healthcare services near you on ${companyName}.`,
  canonical: `${BASE_URL}/address`,
  openGraph: {
    title: `Add Your Address - ${companyName}`,
    description: `Enter your location details to find healthcare services near you on ${companyName}.`,
    url: `${BASE_URL}/address`,
    images: [
      {
        url: `${BASE_URL}/images/shipping-address.png`,
        width: 1200,
        height: 630,
        alt: `Add Your Address - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const loginSeoData = {
  title: `Login - ${companyName}`,
  description: `Log in to your account at ${companyName} to access your healthcare profile and appointments.`,
  canonical: `${BASE_URL}/login`,
  openGraph: {
    title: `Login - ${companyName}`,
    description: `Log in to your account at ${companyName} to access your healthcare profile and appointments.`,
    url: `${BASE_URL}/login`,
    images: [
      {
        url: `${BASE_URL}/images/login.png`,
        width: 1200,
        height: 630,
        alt: `Login - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const registerSeoData = {
  title: `Register - ${companyName}`,
  description: `Create an account at ${companyName} to start booking healthcare services and appointments.`,
  canonical: `${BASE_URL}/register`,
  openGraph: {
    title: `Register - ${companyName}`,
    description: `Create an account at ${companyName} to start booking healthcare services and appointments.`,
    url: `${BASE_URL}/register`,
    images: [
      {
        url: `${BASE_URL}/images/register.png`,
        width: 1200,
        height: 630,
        alt: `Register - ${companyName}`
      }
    ],
    type: "website"
  },
  twitter: seoData.twitter
};

const base64Img = "/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAApACkDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAEDBAX/xAAnEAACAgECBQQDAQAAAAAAAAABAgADEQQhEiIxQXETQlFhMjPB0f/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABERJB/9oADAMBAAIRAxEAPwDYiJA6mB6SjqrmWwIpzY34jpj6lk1m3F7jX5EMg95ii2zhsdnwUwyHHKRnEtUX5uFTMSwbGRuAf8MvKdX1oxQHSEjYmRrX9DVKxBbBzg+4HYibB6SjrG01pNdythT+we1viJcZsZgrDW8KOWrIAXA5j9Y/vST0o1rqhPpVBtlQ9vPmStTWlhr9dK1bYhU4c+TLGlbToVCWBrXHcYz9AdhLpYuDpCOKRTkFmkqscOy83ffY+ZPCBANLQFI4MgjfJO/mNNNUjq6rzKMAk5k0IAIo4QP/2Q=="


const themeBg = 'linear-gradient(45deg, rgb(36, 178, 255), rgb(18, 117, 255))'
const themeTransparent = 'rgba(7, 121, 214,0.1)'
const themeC = 'rgb(56, 162, 244)'
const buttonC = 'white'
const buttonBg = 'linear-gradient(45deg, rgb(50, 138, 246), rgb(84, 172, 244))'
const bg = 'white'
const outerBg = 'rgb(232, 241, 247)'
const borderColor = 'rgba(109, 125, 126, 0.5)'




const orderStatusColors = {
  pending: 'rgb(255, 165, 0)', // Orange
  processing: 'rgb(0, 0, 255)', // Blue
  confirmed: 'rgb(0, 128, 0)', // Green
  completed: 'rgb(0, 128, 0)', // Green
  packing: 'rgb(255, 215, 0)', // Gold
  packed: 'rgb(255, 140, 0)', // Dark Orange
  delivering: 'rgb(30, 144, 255)', // Dodger Blue
  delivered: 'rgb(50, 205, 50)', // Lime Green
  cancelled: 'rgb(255, 0, 0)', // Red
  failed: 'rgb(139, 0, 0)', // Dark Red
  "no-show": 'rgb(139, 0, 0)',
  none: `${themeC}`
}

export {
  delivery_charge,
  delivery_positions,
  statusMessages,
  themeTransparent,
  themeBg,
  themeC,
  outerBg,
  bg,
  colors,
  buttonC,
  buttonBg,
  borderColor,
  seoData,
  base64Img,
  orderCartSeoData,
  orderDetailSeoData,
  reviewSeoData,
  TermsAndConditionSeoData,
  privacyPolicySeoData,
  addressSeoData,
  registerSeoData,
  loginSeoData,
  companyName,
  support_mail,
  support_number,
  orderStatusColors,
  feacebook_page,
  whatsapp,
  messenger,
  instagram,
  footerP
}
