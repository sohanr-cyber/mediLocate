

const locations = [
  {
    name: "Central Dhaka",
    location: {
      type: "Point",
      coordinates: [90.4125, 23.8103] // [longitude, latitude]
    }
  },
  {
    name: "Gulshan",
    location: {
      type: "Point",
      coordinates: [90.3956, 23.7937]
    }
  },
  {
    name: "Dhanmondi",
    location: {
      type: "Point",
      coordinates: [90.3948, 23.7509]
    }
  },
  {
    name: "Mirpur",
    location: {
      type: "Point",
      coordinates: [90.3548, 23.8103]
    }
  },
  {
    name: "Uttara",
    location: {
      type: "Point",
      coordinates: [90.3935, 23.8608]
    }
  }
];

const users = [
  {
    email: "user1@example.com",
    firstName: "Aminul",
    lastName: "Islam",
    role: "user",
    fee: 500,
    departments: ["Cardiology"],
    location: { type: "Point", coordinates: [23.8200, 90.4150] } // Near Dhaka
  },
  {
    email: "user2@example.com",
    firstName: "Rahman",
    lastName: "Hossain",
    role: "doctor",
    fee: 700,
    departments: ["Dermatology"],
    location: { type: "Point", coordinates: [23.8050, 90.4000] } // Near Dhaka
  },
  {
    email: "user3@example.com",
    firstName: "Sadia",
    lastName: "Karim",
    role: "admin",
    fee: 0,
    departments: ["Administration"],
    location: { type: "Point", coordinates: [23.8150, 90.4200] } // Near Dhaka
  },
  {
    email: "user4@example.com",
    firstName: "Mahbub",
    lastName: "Alam",
    role: "doctor",
    fee: 600,
    departments: ["Neurology"],
    location: { type: "Point", coordinates: [23.8250, 90.4100] } // Near Dhaka
  },
  {
    email: "user5@example.com",
    firstName: "Nasrin",
    lastName: "Jahan",
    role: "user",
    fee: 550,
    departments: ["Orthopedics"],
    location: { type: "Point", coordinates: [23.8180, 90.4050] } // Near Dhaka
  },
  {
    email: "user6@example.com",
    firstName: "Kamrul",
    lastName: "Hasan",
    role: "doctor",
    fee: 800,
    departments: ["Gastroenterology"],
    location: { type: "Point", coordinates: [23.8120, 90.4250] } // Near Dhaka
  },
  {
    email: "user7@example.com",
    firstName: "Mariam",
    lastName: "Akter",
    role: "doctor",
    fee: 750,
    departments: ["Pediatrics"],
    location: { type: "Point", coordinates: [23.8190, 90.4070] } // Near Dhaka
  },
  {
    email: "user8@example.com",
    firstName: "Jamil",
    lastName: "Ahmed",
    role: "user",
    fee: 450,
    departments: ["ENT"],
    location: { type: "Point", coordinates: [23.8135, 90.4185] } // Near Dhaka
  },
  {
    email: "user9@example.com",
    firstName: "Fahim",
    lastName: "Uddin",
    role: "doctor",
    fee: 720,
    departments: ["Ophthalmology"],
    location: { type: "Point", coordinates: [23.8070, 90.4160] } // Near Dhaka
  },
  {
    email: "user10@example.com",
    firstName: "Tasnim",
    lastName: "Chowdhury",
    role: "user",
    fee: 500,
    departments: ["Gynecology"],
    location: { type: "Point", coordinates: [23.8215, 90.4080] } // Near Dhaka
  }
];


const termsAndConditions = [
  {
    section: 1,
    title: 'General Terms',
    content:
      'By accessing and using MediLocate, you agree to comply with these Terms and Conditions. We reserve the right to update or modify these terms at any time without prior notice. Continued use of our services constitutes acceptance of the revised terms.'
  },
  {
    section: 2,
    title: 'Medical Disclaimer',
    content:
      'MediLocate provides information and connects users with healthcare services. However, we do not offer medical advice, diagnosis, or treatment. Users should consult a qualified healthcare professional for medical concerns. We are not responsible for any decisions made based on the information provided on our platform.'
  },
  {
    section: 3,
    title: 'User Accounts',
    content:
      'To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information. We reserve the right to suspend or terminate accounts that violate our terms or policies.'
  },
  {
    section: 4,
    title: 'Payments and Services',
    content:
      'Some services on MediLocate may require payment. By making a payment, you agree to provide accurate billing information. Payments are processed securely, and refunds are subject to our Refund Policy.'
  },
  {
    section: 5,
    title: 'Privacy and Data Protection',
    content:
      'Your privacy is important to us. Personal data collected by MediLocate is used in accordance with our Privacy Policy. By using our services, you consent to data processing as described in our policy.'
  },
  {
    section: 6,
    title: 'Prohibited Activities',
    content:
      'Users must not engage in fraudulent, abusive, or illegal activities on our platform. This includes misinformation, impersonation, spamming, or attempting to gain unauthorized access to other users’ accounts or our systems.'
  },
  {
    section: 7,
    title: 'Third-Party Services',
    content:
      'MediLocate may include links to third-party healthcare providers or services. We do not endorse or take responsibility for the quality, reliability, or accuracy of third-party services. Any transactions or interactions with third parties are at your own risk.'
  },
  {
    section: 8,
    title: 'Amendments to Terms',
    content:
      'MediLocate reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. It is your responsibility to review these terms regularly.'
  },
  {
    section: 9,
    title: 'Limitation of Liability',
    content:
      'MediLocate is not liable for any damages, losses, or issues resulting from the use of our platform or third-party services. Our services are provided "as is" without warranties of any kind.'
  },
  {
    section: 10,
    title: 'Contact Us',
    content:
      'If you have any questions regarding these Terms and Conditions, please contact us at support@medilocate.com.'
  }
];

const privacyPolicy = [
  {
    section: 1,
    title: 'Introduction',
    content:
      'MediLocate is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal data when you use our services. By accessing our platform, you agree to the terms outlined in this policy.'
  },
  {
    section: 2,
    title: 'Information We Collect',
    content:
      'We collect personal data, including but not limited to your name, email, phone number, medical preferences, and location. Additionally, we may collect non-personal data such as device information, cookies, and usage analytics to enhance our services.'
  },
  {
    section: 3,
    title: 'How We Use Your Information',
    content:
      'Your information is used to provide and improve our services, including appointment scheduling, connecting you with healthcare providers, processing payments, sending notifications, and ensuring platform security.'
  },
  {
    section: 4,
    title: 'Data Sharing and Third Parties',
    content:
      'MediLocate does not sell your personal data. However, we may share your information with healthcare providers, payment processors, or legal authorities when required by law. All third-party partners adhere to strict confidentiality agreements.'
  },
  {
    section: 5,
    title: 'Data Security',
    content:
      'We implement industry-standard security measures to protect your data from unauthorized access, breaches, or misuse. However, no system is completely secure, and we encourage users to take precautions when sharing sensitive information online.'
  },
  {
    section: 6,
    title: 'Cookies and Tracking Technologies',
    content:
      'We use cookies and tracking technologies to enhance user experience, analyze website traffic, and provide personalized content. You can manage cookie preferences through your browser settings.'
  },
  {
    section: 7,
    title: 'Your Rights and Choices',
    content:
      'You have the right to access, update, or delete your personal data. If you wish to modify your information or opt out of communications, please contact us at privacy@medilocate.com.'
  },
  {
    section: 8,
    title: 'Data Retention',
    content:
      'We retain personal data for as long as necessary to provide our services and comply with legal obligations. After this period, data is securely deleted or anonymized.'
  },
  {
    section: 9,
    title: 'Children’s Privacy',
    content:
      'MediLocate does not knowingly collect personal information from individuals under 18 years old. If we become aware of such data collection, we will take immediate steps to delete it.'
  },
  {
    section: 10,
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy periodically. Changes will be posted on this page, and significant updates will be communicated through email or platform notifications.'
  },
  {
    section: 11,
    title: 'Contact Us',
    content:
      'If you have any questions or concerns about this Privacy Policy, please contact us at privacy@medilocate.com.'
  }
];

export default users;









export { termsAndConditions, privacyPolicy, users }
