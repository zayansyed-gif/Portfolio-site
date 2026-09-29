// Centralized portfolio content and destinations for easy updates.
export const roles = ['Computer Science Student', 'Python Developer', 'Robotics Instructor', 'Building with Code']

export const profileLinks = {
  github: 'https://github.com/zayansyed-gif',
  linkedin: 'https://www.linkedin.com/in/zayan-syed0925',
  email: 'mailto:Zayansyed0925@gmail.com',
  // BASE_URL keeps the PDF link working both locally and under GitHub Pages.
  resume: `${import.meta.env.BASE_URL}Zayan_Syed_Resume_pdf.pdf`,
}

export const projects = [
  {
    number: '01', title: 'Smart Donation Kiosk System',
    description: 'A digital donation system designed to modernize donation tracking and support cash, card, QR code, and online donations.',
    technologies: ['JavaScript', 'React', 'Node.js / Python', 'Firebase / MySQL', 'Stripe / Square'],
    github: 'https://github.com/REPLACE_WITH_SMART_DONATION_KIOSK_REPOSITORY', kind: 'donation',
  },
  {
    number: '02', title: '30 Days of Python',
    description: 'A collection of Python exercises and small programs created while learning Python fundamentals and problem solving.',
    technologies: ['Python', 'Git', 'GitHub'],
    github: profileLinks.github, kind: 'python',
  },
]

export const experience = [
  {
    date: 'September 2026 — Present', place: 'SciXchange, Toronto Metropolitan University',
    role: 'Robotics Instructor', location: 'Toronto, Ontario',
    bullets: [
      'Support hands-on robotics activities and STEM outreach for youth.',
      'Help students learn robotics, engineering, and technology concepts.',
      'Explain technical ideas in a clear, engaging way.',
    ],
  },
  {
    date: 'May 2026 — August 2026', place: 'Rowdah Center',
    role: 'Developer', location: 'Mississauga, Ontario',
    bullets: [
      'Worked with a team on a Smart Donation Kiosk System for cash, card, and QR donations.',
      'Planned frontend, backend, payment, and database flows; helped define tracking, receipts, and anonymous giving.',
    ],
  },
  {
    date: 'April 2025 — May 2026', place: 'PetSmart',
    role: 'Pet Associate', location: 'Mississauga, Ontario',
    bullets: [
      'Helped customers find products and recommendations; restocked and organized displays.',
      'Worked with the team in a fast-paced customer service environment.',
    ],
  },
]

export const skillGroups = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'HTML', 'CSS'] },
  { label: 'Frameworks', items: ['React', 'Node.js'] },
  { label: 'Databases', items: ['Firebase', 'MySQL'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
  { label: 'Other', items: ['REST APIs', 'System Architecture', 'Version Control'] },
]

export const education = {
  school: 'Toronto Metropolitan University',
  program: 'Bachelor of Science in Computer Science',
  graduation: 'Expected graduation: May 2030',
  location: 'Toronto, Ontario',
  coursework: ['CPS 106: Python', 'CPS 213: Computer Organization'],
}

export const contactLinks = [
  { label: 'Email', value: 'Zayansyed0925@gmail.com', href: profileLinks.email },
  { label: 'LinkedIn', value: 'linkedin.com/in/zayan-syed0925', href: profileLinks.linkedin },
  { label: 'GitHub', value: 'github.com/zayansyed-gif', href: profileLinks.github },
]
