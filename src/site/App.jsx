import React, { useEffect, useState } from 'react'
import Artwork from './Artwork.jsx'
import { contactLinks, education, experience, profileLinks, projects, roles, skillGroups } from './content.js'

const navigation = [['About', '#about'], ['Projects', '#projects'], ['Experience', '#experience'], ['Skills', '#skills'], ['Contact', '#contact']]

function Icon({ name, size = 17 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'github') return <svg {...common} fill="currentColor" stroke="none"><path d="M12 .9a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 1.72 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.5-.28-5.14-1.25-5.14-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.16a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.16 3.08-1.16.61 1.55.23 2.7.12 2.98.72.79 1.15 1.8 1.15 3.03 0 4.32-2.64 5.28-5.16 5.56.4.35.76 1.02.76 2.06v3.11c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .9Z" /></svg>
  if (name === 'linkedin') return <svg {...common}><path d="M4.8 9.2v10M4.8 5.3v.1M9.3 19.2v-10h3.2v1.4c.7-1.1 1.7-1.6 3-1.6 2.4 0 3.7 1.5 3.7 4.3v5.9M9.3 13.1c0-2.6 1.4-4.1 3.7-4.1" /></svg>
  if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
  if (name === 'file') return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></svg>
  if (name === 'arrow') return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  return null
}

function Navigation() {
  return <header className="topbar"><div className="nav-inner"><a className="brand" href="#home">Zayan Syed<span>.</span></a><nav aria-label="Main navigation">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><div className="nav-actions"><a className="social-icon" href={profileLinks.github} target="_blank" rel="noreferrer" aria-label="Visit Zayan’s GitHub"><Icon name="github" /></a><a className="social-icon" href={profileLinks.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Zayan’s LinkedIn"><Icon name="linkedin" /></a><a className="resume-button" href={profileLinks.resume} target="_blank" rel="noreferrer" aria-label="Open Zayan’s resume PDF in a new tab"><Icon name="file" />Resume</a></div></div></header>
}

function Eyebrow({ children }) { return <div className="eyebrow"><span />{children}</div> }

function RoleRotator() {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches) return undefined
    const timer = window.setInterval(() => setCurrent((role) => (role + 1) % roles.length), 3200)
    return () => window.clearInterval(timer)
  }, [])
  return <div className="role-line" aria-label={roles[current]}><span key={current}>{roles[current]}</span></div>
}

function Hero() {
  return <section className="hero" id="home"><div className="hero-copy"><Eyebrow>MISSISSAUGA · ONTARIO</Eyebrow><h1>Hi! I’m <span>Zayan</span></h1><RoleRotator /><p className="hero-description">Computer Science student at Toronto Metropolitan University interested in software development, robotics, cloud computing, and building useful technology.</p><div className="hero-actions"><a className="button button-primary" href={profileLinks.email}>Let’s Chat <Icon name="arrow" size={16} /></a><a className="button button-outline" href={profileLinks.resume} target="_blank" rel="noreferrer" aria-label="Open Zayan’s resume PDF in a new tab">My Resume <Icon name="file" size={15} /></a></div><div className="hero-note"><span className="availability-dot" />BSc Computer Science · Expected May 2030</div></div><div className="portrait-column"><div className="portrait-glow" /><div className="portrait-ring"><div className="portrait-inner"><div className="portrait-moon" /><div className="portrait-stars"><i /><i /><i /><i /></div><div className="portrait-monogram">Z<span>.</span></div></div></div><div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" /><span className="portrait-side-note">CURIOUS BY NATURE · BUILDER BY CHOICE</span></div><a className="scroll-cue" href="#about"><span />Scroll to explore</a></section>
}

function About() {
  return <section className="section about-section" id="about"><div className="section-heading"><Eyebrow>01 / A LITTLE ABOUT ME</Eyebrow><h2>About <em>Me</em></h2></div><div className="about-grid"><div className="about-lede"><span className="quote-mark">“</span><p>I’m a Computer Science student at Toronto Metropolitan University interested in software development, robotics, cloud computing, and artificial intelligence.</p></div><div className="about-copy"><p>I enjoy learning through building projects and experimenting with new technologies. I’m drawn to ideas that turn into useful things, from software tools to systems that make everyday work a little easier.</p><div className="about-tags"><span>Mississauga, Ontario</span><span>BSc Computer Science</span><span>Expected May 2030</span></div></div></div></section>
}

function ProjectArtwork({ kind }) {
  return <div className={`project-art art-${kind}`} aria-hidden="true"><div className="art-sky"><i className="art-star">✳</i><i className="art-moon" /><i className="art-swirl swirl-a" /><i className="art-swirl swirl-b" /><i className="art-horizon" /><i className="art-subject">{kind === 'python' ? 'Py' : 'QR'}</i></div></div>
}

function Projects() {
  return <section className="section projects-section" id="projects"><div className="section-heading section-heading-row"><div><Eyebrow>02 / SELECTED WORK</Eyebrow><h2>Projects</h2></div><p>Ideas made tangible—one experiment, one problem,<br />one line at a time.</p></div><div className="project-grid">{projects.map((project) => <article className="project-card" key={project.number}><ProjectArtwork kind={project.kind} /><div className="project-info"><div className="project-kicker"><span>{project.number}</span><span>PERSONAL PROJECT</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tech-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions"><a className="github-project" href={project.github} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} GitHub repository`} title={project.kind === 'donation' ? 'Replace this repository placeholder when the repository is available' : `Visit ${project.title} on GitHub`}><Icon name="github" size={17} />GitHub</a></div></div></article>)}</div><p className="edit-note">Replace the Smart Donation Kiosk repository placeholder in <code>src/site/content.js</code> when it is available.</p></section>
}

function Experience() {
  return <section className="section experience-section" id="experience"><div className="section-heading section-heading-row"><div><Eyebrow>03 / THE PATH SO FAR</Eyebrow><h2>Experience</h2></div><p>Work, learning, and communities<br />that have shaped my journey.</p></div><div className="timeline">{experience.map((item, index) => <article className="timeline-item" key={item.place}><div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div><div className="timeline-date">{item.date}</div><div className="timeline-main"><div className="timeline-title"><h3>{item.place}</h3><span className="timeline-role">{item.role}</span></div><div className="timeline-location">{item.location}</div><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div></article>)}</div></section>
}

function Skills() {
  return <section className="section skills-section" id="skills"><div className="section-heading section-heading-row"><div><Eyebrow>04 / THINGS IN MY TOOLKIT</Eyebrow><h2>Skills</h2></div><p>Tools I use today, and a few I’m<br />excited to keep exploring.</p></div><div className="skills-wrap"><div className="skill-feature"><span className="skill-spark">✳</span><h3>Built with<br /><em>curiosity.</em></h3><p>Learning through hands-on projects and steady practice.</p></div><div className="skill-cloud">{skillGroups.map((group, groupIndex) => <div className="skill-group" key={group.label}><h3>{group.label}</h3><div>{group.items.map((skill, index) => <span className={`skill-chip skill-chip-${(index + groupIndex) % 4}`} key={skill}><i />{skill}</span>)}</div></div>)}</div></div></section>
}

function Education() {
  return <section className="section education-section" id="education"><div className="section-heading section-heading-row"><div><Eyebrow>05 / EDUCATION</Eyebrow><h2>Education</h2></div><p>Building a foundation<br />for what comes next.</p></div><article className="education-card"><span className="education-star" aria-hidden="true">✳</span><div><h3>{education.school}</h3><p>{education.program}</p><div className="education-details"><span>{education.graduation}</span><span>{education.location}</span></div></div></article></section>
}

function Contact() {
  return <section className="section contact-section" id="contact"><div className="contact-panel"><div className="contact-decoration" aria-hidden="true">✳</div><Eyebrow>06 / SAY HELLO</Eyebrow><h2>Let’s Build<br /><em>Something</em></h2><p>I’m always interested in learning, building new things, and connecting with people working on interesting technology.</p><a className="button button-primary" href={profileLinks.email}>Get in touch <Icon name="arrow" size={16} /></a><div className="contact-links">{contactLinks.map((link) => <a key={link.label} href={link.href} target={link.label === 'Email' ? undefined : '_blank'} rel="noreferrer" aria-label={link.label === 'Email' ? 'Email Zayan' : `Visit Zayan’s ${link.label}`}><Icon name={link.label === 'Email' ? 'mail' : link.label.toLowerCase()} size={17} /><span>{link.label}</span><strong>{link.value}</strong></a>)}</div></div></section>
}

function Footer() {
  return <footer className="footer"><a className="footer-brand" href="#home">Zayan Syed<span>.</span></a><span>© 2026 Zayan Syed</span><span>Made with curiosity <b>✳</b></span><a href="#home" className="to-top">Back to top ↑</a></footer>
}

export default function App() {
  return <><Artwork /><Navigation /><main><Hero /><About /><Projects /><Experience /><Skills /><Education /><Contact /><Footer /></main></>
}
