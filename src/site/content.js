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
    number: '01', title: 'Space Mission Dashboard',
    displayTitle: ['SPACE MISSION', 'DASHBOARD'],
    previewWord: 'MISSION', previewCaption: 'NASA · SPACEX · FLIGHT DATA',
    description: 'A searchable dashboard concept for past and upcoming NASA and SpaceX missions, with launch dates, rockets, and mission goals.',
    problem: 'Create a clear way to browse mission information and explore individual launches.',
    contribution: 'Designed the dashboard concept and outlined planned spaceflight API integration, Docker containerization, AWS deployment, and GitHub Actions CI/CD.',
    features: ['Searchable past and upcoming missions', 'Mission detail views with flight paths, weather, and outcomes', 'Planned API and deployment workflow'],
    technologies: ['Spaceflight APIs', 'Docker', 'AWS', 'GitHub Actions'],
    github: '', image: '', kind: 'space',
  },
  {
    number: '02', title: 'NHL Stats Analyzer',
    displayTitle: ['NHL STATS', 'ANALYZER'],
    previewWord: 'NHL', previewCaption: 'PLAYERS · TEAMS · SEASONS',
    description: 'A dashboard concept for comparing historical NHL team and player statistics across seasons.',
    problem: 'Plan clear filtering and comparison views for exploring player performance and team trends.',
    contribution: 'Outlined a Python data backend, interactive browser visualizations, planned NHL data integrations, and optional AI-powered stats Q&A.',
    features: ['Historical player and team statistics', 'Filtering and comparisons across seasons', 'Optional AI-powered stats Q&A concept'],
    technologies: ['Python', 'HTML', 'CSS', 'JavaScript'],
    github: '', image: '', kind: 'nhl',
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
