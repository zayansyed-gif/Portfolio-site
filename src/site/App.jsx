import React, { useEffect, useRef, useState } from 'react'
import { contactLinks, education, experience, profileLinks, projects, skillGroups } from './content.js'

const navigation = [['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Experience', '#experience'], ['Education', '#education'], ['Contact', '#contact']]
const commandItems = [
  { label: 'Projects', hint: 'View selected work', href: '#projects' },
  { label: 'About', hint: 'A little about me', href: '#about' },
  { label: 'Experience', hint: 'Work and community', href: '#experience' },
  { label: 'Resume', hint: 'Open PDF', href: profileLinks.resume, external: true },
  { label: 'GitHub', hint: 'Visit profile', href: profileLinks.github, external: true },
  { label: 'LinkedIn', hint: 'Visit profile', href: profileLinks.linkedin, external: true },
  { label: 'Contact', hint: 'Get in touch', href: '#contact' },
]

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
  return <header className="topbar"><div className="nav-inner">
    <a className="brand" href="#home">Zayan Syed<span>.</span></a>
    <nav aria-label="Main navigation">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
    <div className="nav-actions">
      <a className="social-icon" href={profileLinks.github} target="_blank" rel="noreferrer" aria-label="Visit Zayan’s GitHub"><Icon name="github" /></a>
      <a className="social-icon" href={profileLinks.linkedin} target="_blank" rel="noreferrer" aria-label="Visit Zayan’s LinkedIn"><Icon name="linkedin" /></a>
      <a className="resume-button" href={profileLinks.resume} target="_blank" rel="noreferrer"><Icon name="file" />Resume</a>
    </div>
  </div></header>
}

function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const previousFocusRef = useRef(null)
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        previousFocusRef.current = document.activeElement
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      previousFocusRef.current?.focus?.()
    }
  }, [open])
  const filtered = commandItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' && filtered.length) {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % filtered.length)
    } else if (event.key === 'ArrowUp' && filtered.length) {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + filtered.length) % filtered.length)
    } else if (event.key === 'Enter' && filtered[activeIndex]) {
      event.preventDefault()
      document.getElementById(`palette-option-${activeIndex}`)?.click()
    }
  }
  if (!open) return null
  return <div className="palette-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
    <section className="command-palette" role="dialog" aria-modal="true" aria-label="Quick navigation">
      <label className="sr-only" htmlFor="command-search">Search portfolio actions</label>
      <input ref={inputRef} id="command-search" value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} onKeyDown={handleKeyDown} placeholder="Where would you like to go?" />
      <p className="palette-label">QUICK LINKS</p>
      <div className="palette-options">{filtered.map((item, index) => <a id={`palette-option-${index}`} className={index === activeIndex ? 'active' : ''} key={item.label} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined} tabIndex={index === activeIndex ? 0 : -1} onMouseEnter={() => setActiveIndex(index)} onClick={() => setOpen(false)}><span>{item.label}</span><small>{item.hint}</small><kbd>↵</kbd></a>)}{filtered.length === 0 && <p className="no-results">No matching links.</p>}</div>
      <div className="palette-footer"><span><kbd>esc</kbd> to close</span><span>Navigate Zayan’s portfolio</span></div>
    </section>
  </div>
}

function Hero() {
  const shapeRef = useRef(null)
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reduceMotion || !finePointer || !shapeRef.current) return undefined
    let frame = 0
    const onPointerMove = (event) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - .5) * 13
        const y = (event.clientY / window.innerHeight - .5) * 10
        shapeRef.current?.style.setProperty('--shape-x', `${x.toFixed(1)}px`)
        shapeRef.current?.style.setProperty('--shape-y', `${y.toFixed(1)}px`)
        frame = 0
      })
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onPointerMove); if (frame) cancelAnimationFrame(frame) }
  }, [])
  return <section className="hero page-width" id="home">
    <div className="hero-copy">
      <p className="eyebrow">COMPUTER SCIENCE · TORONTO METROPOLITAN UNIVERSITY</p>
      <h1><span>HEY, I’M</span><strong>ZAYAN<span>.</span></strong></h1>
      <p className="hero-description">Computer Science student building software, exploring new technologies, and learning by making things.</p>
      <div className="hero-actions">
        <a className="button button-primary" href="#projects">View projects <Icon name="arrow" size={16} /></a>
        <a className="button button-outline" href={profileLinks.resume} target="_blank" rel="noreferrer">Resume <Icon name="file" size={15} /></a>
        <a className="button button-text" href={profileLinks.github} target="_blank" rel="noreferrer">GitHub <Icon name="arrow" size={14} /></a>
        <a className="button button-text" href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <Icon name="arrow" size={14} /></a>
      </div>
      <p className="hero-note">BSc Computer Science <span>·</span> Expected May 2030 <button className="palette-shortcut" type="button" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>⌘K / Ctrl K</button></p>
    </div>
    <div className="currently" aria-label="Currently">
      <div><span>Featured concept</span><strong>Space Mission Dashboard</strong></div>
      <div><span>Currently learning</span><strong>Python</strong></div>
      <div><span>Based in</span><strong>Mississauga · GTA</strong></div>
    </div>
    <div className="hero-object" ref={shapeRef} aria-hidden="true"><i /><b /><span /></div>
  </section>
}

function SectionHeading({ label, title, description, mark }) {
  return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}{mark && <span className="section-heading-mark" aria-hidden="true">{mark}</span>}</h2></div>{description && <p className="section-description">{description}</p>}</div>
}

function ProjectShowcase({ project, index }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const isPlaceholder = !project.github || project.github.includes('REPLACE_WITH_')
  return <section id={index === 0 ? 'projects' : `project-${project.kind}`} className={`project-showcase project-theme-${project.kind} ${index % 2 ? 'project-reverse' : ''} scroll-reveal`}>
    <span className="project-background-number" aria-hidden="true">{project.number}</span>
    <div className="project-inner editorial-width">
      <div className="project-copy">
        <p className="project-kicker">{project.number} <span>/</span> PROJECT CONCEPT</p>
        <h2 className="project-title">{project.displayTitle.map((line) => <span key={line}>{line}</span>)}</h2>
        <p className="project-description">{project.description}</p>
        <ul className="tech-list" aria-label="Technologies">{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        <div className="project-actions">
          <button className="project-details-toggle text-link" type="button" onClick={() => setDetailsOpen((value) => !value)} aria-expanded={detailsOpen} aria-controls={`details-${project.kind}`}>
            {detailsOpen ? 'Close details' : 'Explore concept'} <Icon name="arrow" size={15} />
          </button>
          {isPlaceholder
            ? <span className="github-project unavailable" title="Add the repository URL in src/site/content.js when it is available"><Icon name="github" size={16} />GitHub link coming soon</span>
            : <a className="github-project" href={project.github} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} on GitHub`}><Icon name="github" size={16} />GitHub <Icon name="arrow" size={13} /></a>}
        </div>
        <div className="detail-content" id={`details-${project.kind}`} hidden={!detailsOpen}>
          <div><h3>Overview</h3><p>{project.description}</p></div>
          <div><h3>Problem</h3><p>{project.problem}</p></div>
          <div><h3>Concept and planning</h3><p>{project.contribution}</p></div>
          <div><h3>Planned scope</h3><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
          <div><h3>Tools and integrations</h3><p>{project.technologies.join(' · ')}</p></div>
        </div>
      </div>
      <button className="project-visual" type="button" data-project-visual aria-label={`View details for ${project.title}`} aria-expanded={detailsOpen} aria-controls={`details-${project.kind}`} onClick={() => setDetailsOpen((value) => !value)}>
        {project.image ? <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" /> : <div className={`preview-placeholder preview-${project.kind}`}>
          <span className="preview-placeholder-note">PROJECT CONCEPT · PREVIEW TO COME</span>
          <span className="preview-wordmark">{project.previewWord}</span>
          <span className="preview-bottom">{project.previewCaption}</span>
          <span className="preview-orbit" />
          <span className="preview-shape" />
        </div>}
      </button>
    </div>
  </section>
}

function Projects() {
  return <>{projects.map((project, index) => <ProjectShowcase key={project.number} project={project} index={index} />)}</>
}

function TechStrip() {
  const technologies = ['Python', 'JavaScript', 'React', 'Node.js', 'Git', 'GitHub', 'Firebase', 'MySQL', 'REST APIs', 'Software development']
  const items = [...technologies, ...technologies]
  return <div className="tech-strip" aria-label={`Technologies: ${technologies.join(', ')}`}><div className="tech-track" aria-hidden="true">{items.map((tech, index) => <span key={`${tech}-${index}`}>{tech}<i>✦</i></span>)}</div></div>
}

function Experience() {
  return <section className="experience-section scroll-reveal" id="experience">
    <div className="section-inner editorial-width">
      <SectionHeading label="EXPERIENCE" title="Learning by doing" description="Work and community experience." />
      <div className="experience-list">{experience.map((item, index) => <article className="experience-item" key={item.place}>
        <div className="experience-year">{item.date}</div>
        <div className="experience-body"><div className="experience-title"><h3>{item.role}</h3><span>{item.place}</span></div><p className="experience-location">{item.location}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
        <span className="experience-index" aria-hidden="true">0{index + 1}</span>
      </article>)}</div>
    </div>
  </section>
}

function About() {
  return <section className="about-section scroll-reveal" id="about">
    <div className="section-inner about-layout editorial-width">
      <div><p className="eyebrow">A LITTLE ABOUT ME</p><h2>I’M A COMPUTER SCIENCE STUDENT WHO LIKES FIGURING OUT HOW THINGS WORK.</h2></div>
      <div className="about-copy"><p>I’m studying Computer Science at Toronto Metropolitan University. I enjoy learning by building projects and exploring software, robotics, cloud computing, and how technology can solve useful problems.</p><p>Currently learning Python and based in Mississauga, Ontario.</p><p>Interested in software development and building thoughtful, useful technology.</p></div>
    </div>
  </section>
}

function SkillIcon({ name }) {
  if (name === 'GitHub') return <Icon name="github" size={18} />

  const svg = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'Python': return <svg {...svg} viewBox="0 0 24 24" stroke="none"><path fill="currentColor" d="M11.9 2C7.2 2 7.5 4 7.5 4v2.1h4.6v.8H5.7S2.5 6.5 2.5 12s2.8 5.5 2.8 5.5h1.7v-2.4s-.1-2.9 2.8-2.9h4.7s2.6 0 2.6-2.5V4.5S17.5 2 11.9 2Zm-2.6 2.1a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z"/><path fill="currentColor" d="M12.1 22c4.7 0 4.4-2 4.4-2v-2.1h-4.6v-.8h6.4s3.2.4 3.2-5.1-2.8-5.5-2.8-5.5H17v2.4s.1 2.9-2.8 2.9H9.5s-2.6 0-2.6 2.5v5.2S6.5 22 12.1 22Zm2.6-2.1a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z"/></svg>
    case 'JavaScript': return <svg {...svg} stroke="none"><rect x="2.5" y="2.5" width="19" height="19" rx="2" fill="currentColor"/><path d="M12.5 17.4c.4.7.9 1 1.7 1 .7 0 1.1-.3 1.1-.8 0-.6-.5-.8-1.4-1.2-1.3-.6-2.2-1.2-2.2-2.7 0-1.4 1.1-2.4 2.8-2.4 1.2 0 2.1.4 2.7 1.5l-1.5 1c-.3-.6-.6-.8-1.1-.8s-.8.3-.8.7c0 .5.3.7 1.2 1.1 1.5.7 2.4 1.3 2.4 2.8 0 1.6-1.3 2.5-3.1 2.5-1.7 0-2.8-.8-3.3-1.9l1.5-.8ZM8.3 11.5H6.4v5.1c0 .9-.3 1.2-.9 1.2-.5 0-.9-.3-1.2-.7l-1.3 1c.6 1 1.4 1.4 2.7 1.4 1.8 0 2.6-.9 2.6-2.8v-5.2Z" fill="var(--skill-icon-cutout, #dce6d7)"/></svg>
    case 'HTML': case 'CSS': {
      const digit = name === 'HTML' ? '5' : '3'
      return <svg {...svg} stroke="none"><path fill="currentColor" d="M4 2h16l-1.5 17L12 22l-6.5-3L4 2Z"/><path fill="var(--skill-icon-cutout, #dce6d7)" d="M8 6h8l-.2 2H10l.2 2h5.4l-.7 6L12 17.5 9 16.2l-.2-2h2l.1.8 1.1.5 1.1-.5.2-2H8.3L8 6Z"/><text x="17.3" y="18.8" fill="var(--skill-icon-cutout, #dce6d7)" fontSize="5" fontWeight="700">{digit}</text></svg>
    }
    case 'React': return <svg {...svg}><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/></svg>
    case 'Node.js': return <svg {...svg}><path d="m12 2.6 8.2 4.7v9.4L12 21.4l-8.2-4.7V7.3L12 2.6Z"/><text x="7.1" y="14.7" fill="currentColor" stroke="none" fontSize="6.2" fontWeight="700">JS</text></svg>
    case 'Firebase': return <svg {...svg} stroke="none"><path fill="currentColor" d="m6.2 21 2-18.1c.1-.8 1.1-1 1.5-.3l2 3.7 1.7-3.2c.4-.7 1.4-.5 1.5.3L18 21l-5.7-3.2L6.2 21Z"/><path fill="var(--skill-icon-cutout, #dce6d7)" d="m8.2 17.8 4.2-7.9 1 1.9 3.2 5.9-4.3-2.4-4.1 2.5Z" opacity=".78"/></svg>
    case 'MySQL': return <svg {...svg}><path d="M3.5 7.5c1.8-2 4.5-2.2 6.6-.8 1.5 1 2.6 2.8 3.7 4.1 1.2 1.4 2.5 2.1 4.4 1.9-1.4 1.6-3.7 1.8-5.4.6-1.5-1.1-2.3-2.7-3.7-3.9-1.6-1.4-3.6-1.8-5.6-.8Z"/><path d="M15.5 11.9c.3-2.7 2.3-4.8 5-5.4-.8 1.6-.8 3.2-.1 4.3M17.9 13.1c.8 1.4 1.1 3.1.6 4.7M4 13.5c1.7 1.7 3.7 2.4 6.1 2.2"/><circle cx="19.1" cy="5" r=".7" fill="currentColor" stroke="none"/></svg>
    case 'Git': case 'Version Control': return <svg {...svg}><circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M6 7v7a5 5 0 0 0 5 5h5M13 9l3-3-3-3"/></svg>
    case 'VS Code': return <svg {...svg} stroke="none"><path fill="currentColor" d="M17.5 2.4 7.6 11.1 4.2 8.5 2 10.2v3.6l2.2 1.7 3.4-2.6 9.9 8.7 4.5-1.8V4.2l-4.5-1.8ZM17 7v10l-5.8-5 5.8-5Z"/></svg>
    case 'REST APIs': return <svg {...svg}><circle cx="5" cy="12" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="m7 11 9.8-4M7 13l9.8 4"/></svg>
    case 'System Architecture': return <svg {...svg}><rect x="8" y="3" width="8" height="5" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><path d="M12 8v4M6.5 12h11M6.5 12v4M17.5 12v4"/></svg>
    default: return <svg {...svg}><circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M6 7v7a5 5 0 0 0 5 5h5M13 9l3-3-3-3"/></svg>
  }
}

function Skills() {
  return <section className="skills-section scroll-reveal" id="skills">
    <div className="section-inner editorial-width">
      <SectionHeading label="SKILLS" title="Tools I work with" mark="</>" />
      <div className="skills-list">{skillGroups.map((group) => <div className="skill-group" key={group.label}><h3>{group.label}</h3><ul>{group.items.map((skill) => <li key={skill} className="skill-chip" style={{ '--skill-icon-cutout': '#dce6d7' }}><SkillIcon name={skill} /><span>{skill}</span></li>)}</ul></div>)}</div>
    </div>
  </section>
}

function Education() {
  return <section className="education-section scroll-reveal" id="education">
    <div className="section-inner editorial-width">
      <SectionHeading label="EDUCATION" title="Education" />
      <article className="education-row"><h3>{education.school}</h3><p>{education.program}</p><div><span>{education.graduation}</span><span>{education.location}</span></div></article>
    </div>
  </section>
}

function Contact() {
  return <section className="contact-section" id="contact">
    <div className="section-inner editorial-width">
      <p className="eyebrow">GET IN TOUCH</p><h2>HAVE AN IDEA?<br /><span>LET’S TALK.</span><a href={profileLinks.email} aria-label="Email Zayan"><Icon name="arrow" size={32} /></a></h2>
      <div className="contact-links">{contactLinks.map((link) => <a key={link.label} href={link.href} target={link.label === 'Email' ? undefined : '_blank'} rel="noreferrer" aria-label={link.label === 'Email' ? 'Email Zayan' : `Visit Zayan’s ${link.label}`}><Icon name={link.label === 'Email' ? 'mail' : link.label.toLowerCase()} size={17} /><span>{link.label}</span><strong>{link.value}</strong><Icon name="arrow" size={14} /></a>)}</div>
    </div>
  </section>
}

function Footer() {
  return <footer className="footer"><div className="footer-inner editorial-width"><a className="footer-brand" href="#home">Zayan Syed<span>.</span></a><span>© {new Date().getFullYear()} Zayan Syed</span><a href="#home">Back to top ↑</a></div></footer>
}

function ProjectCursor() {
  const cursorRef = useRef(null)
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined
    let frame = 0
    let x = 0
    let y = 0
    let visible = false
    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      visible = Boolean(event.target.closest?.('[data-project-visual]'))
      if (frame) return
      frame = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
          cursorRef.current.classList.toggle('is-visible', visible)
        }
        frame = 0
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { window.removeEventListener('pointermove', onMove); if (frame) cancelAnimationFrame(frame) }
  }, [])
  return <div className="project-cursor" ref={cursorRef} aria-hidden="true"><span>VIEW</span><i>↗</i></div>
}

function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const revealTargets = document.querySelectorAll('.scroll-reveal')
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    }), { threshold: 0.08 })
    revealTargets.forEach((target) => revealObserver.observe(target))

    const navLinks = [...document.querySelectorAll('.topbar nav a')]
    const activeObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      navLinks.forEach((link) => {
        const isProjectSection = entry.target.classList.contains('project-showcase')
        const active = link.hash === `#${entry.target.id}` || (isProjectSection && link.hash === '#projects')
        link.classList.toggle('active', active)
        if (active) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
    }), { rootMargin: '-38% 0px -52% 0px', threshold: 0 })
    document.querySelectorAll('main [id]').forEach((section) => activeObserver.observe(section))

    let frame = 0
    const onScroll = () => {
      if (reduceMotion || !finePointer || frame) return
      frame = requestAnimationFrame(() => {
        document.querySelectorAll('.project-visual').forEach((visual) => {
          const bounds = visual.getBoundingClientRect()
          if (bounds.bottom < -100 || bounds.top > window.innerHeight + 100) return
          const amount = Math.max(-7, Math.min(7, (bounds.top + bounds.height / 2 - window.innerHeight / 2) * -.012))
          visual.style.setProperty('--scroll-y', `${amount.toFixed(1)}px`)
        })
        frame = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      revealObserver.disconnect()
      activeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return null
}

export default function App() {
  return <><Navigation /><main><Hero /><About /><Skills /><Projects /><TechStrip /><Experience /><Education /><Contact /><Footer /></main><CommandPalette /><ProjectCursor /><ScrollEffects /></>
}
