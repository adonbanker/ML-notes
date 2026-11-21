import { useEffect, useState } from 'react'
import useReveal from './useReveal'
import useDrag from './useDrag'
import Boot from './Boot'
import ShapeWaves from './ShapeWaves'
import {
  FolderIcon,
  ProfileIcon,
  LinkedInIcon,
  GitHubIcon,
  MailIcon,
  ArrowIcon,
  DownloadIcon,
} from './icons'

/* ------------------------------------------------------------------ */
/*  Your details                                                       */
/* ------------------------------------------------------------------ */
const ME = {
  name: 'Adon S. Banker',
  role: 'ECONOMICS & ENTREPRENEURSHIP · DATA SCIENCE',
  greeting: "hi! i'm",
  quote: '"Applying technology for real-world impact."',
  summary:
    'Currently studying Economics & Entrepreneurship with Data Science at Reichman University. I build AI-focused research projects and community-driven sustainability initiatives, with a track record across social impact, heritage preservation, and STEM innovation.',
  university: 'Reichman University',
  major: 'Economics & Entrepreneurship with Data Science',
  email: 'bankeradon@gmail.com',
  linkedin: 'https://www.linkedin.com/in/adon-s-banker-3517162b6/',
  github: 'https://github.com/adonbanker',
  resume: './Adon_Banker_Resume.pdf',
  photo: './profile.jpg', // drop your photo here in /public/profile.jpg
}

const SOCIALS = [
  { name: 'LinkedIn', href: ME.linkedin, Icon: LinkedInIcon, bg: '#2f6fb0' },
  { name: 'GitHub', href: ME.github, Icon: GitHubIcon, bg: '#1a1622' },
  { name: 'Email', href: `mailto:${ME.email}`, Icon: MailIcon, bg: '#b85b8a' },
]

const SKILLS = [
  'Python', 'Java', 'Machine Learning', 'NLP & GenAI',
  'Deep Learning', 'EDA', 'Data Structures', 'OOP',
]

const EXPERIENCE = [
  {
    title: 'Web Developer — IJHC, Israel',
    tag: 'Web Dev',
    when: 'Sep 2025 – Present',
    desc: 'Build & maintain the Israeli Jewish Heritage Center website to promote heritage and community engagement.',
  },
  {
    title: 'Model Analysis Researcher — NY Academy of Sciences',
    tag: 'AI Research',
    when: 'Aug 2025 – Present',
    desc: 'Designing salt-based energy-storage AI models to improve solar energy storage and distribution.',
  },
  {
    title: 'AI Program — Veritas AI',
    tag: 'Deep Learning',
    when: 'Nov – Dec 2024',
    desc: 'Built AI-driven brain-tumor segmentation on 4,715 T1 MRI images from 152 patients.',
  },
  {
    title: 'Founder/Editor — Project NavJeevan',
    tag: 'Sustainability',
    when: 'Oct 2024 – Present',
    desc: 'Turned 300kg waste into compost, boosted 150-tree survival; selected to present at the 1M1B UN summit.',
  },
  {
    title: 'Java Development Intern — Code Clause',
    tag: 'Java',
    when: 'Jun 2024',
    desc: 'Built an Online Banking System and Calculator in Java, published to GitHub.',
  },
  {
    title: 'Founder — Jewish Heritage Virtual Museum',
    tag: 'Heritage',
    when: 'Jun 2024 – Present',
    desc: "Online museum preserving India's Bene Israel community via digital archives and oral histories.",
  },
]

const AWARDS = [
  'Top 100 Changemaker — 1M1B UN Summit, Geneva (2025)',
  'Best Project — UC Berkeley Sutardja Center (2025)',
  'Youth Ambassador — HundrED Global Program (2025)',
  'Awarded $3,500 Grant — EV Capital Fund (2024)',
  'Silver Star Medallion — Bribooks (2024)',
]

/* ------------------------------------------------------------------ */
/*  Reusable dark-glass window                                         */
/* ------------------------------------------------------------------ */
function Win({ path, children, className = '', accent = false, delay = 0 }) {
  const [ref, shown] = useReveal()
  const { handleRef, style, dragging } = useDrag()
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms`, zIndex: style.zIndex }}
      className={`relative ${shown ? 'animate-win-open' : 'opacity-0'} ${className}`}
    >
      <div
        style={{ transform: style.transform, transition: style.transition }}
        className={`win-border overflow-hidden rounded-xl shadow-win-lg ${dragging ? 'select-none' : ''}`}
      >
        <div
          ref={handleRef}
          className={`flex touch-none items-center justify-between gap-2 border-b px-3 py-2 md:cursor-grab md:active:cursor-grabbing ${
            accent
              ? 'border-lime/30 bg-lime/15'
              : 'border-edge bg-white/[0.03]'
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="h-2.5 w-2.5 rounded-full bg-lime shadow-lime-glow" aria-hidden="true" />
            <p className="truncate font-mono text-sm tracking-wide text-mist">{path}</p>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  )
}

/* Circular framed photo — falls back to initials. */
function Avatar() {
  const [ok, setOk] = useState(true)
  return (
    <div className="relative mx-auto">
      <div
        className="absolute -inset-1 rounded-full opacity-60 blur-md"
        style={{ background: 'radial-gradient(circle, rgba(219,255,0,0.5), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative grid h-44 w-44 place-items-center overflow-hidden rounded-full border-2 border-lime/60 bg-panel">
        {ok ? (
          <img
            src={ME.photo}
            alt={`Portrait of ${ME.name}`}
            onError={() => setOk(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-6xl font-black text-lime">AB</span>
        )}
      </div>
    </div>
  )
}

function Folder({ label, target, Icon = FolderIcon }) {
  return (
    <a
      href={`#${target}`}
      className="group flex w-20 cursor-pointer flex-col items-center gap-1.5 rounded-sm p-2 outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      <span className="transition-transform duration-200 group-hover:rotate-[-3deg]">
        <Icon className="h-14 w-14 drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]" />
      </span>
      <span className="rounded border border-transparent px-1.5 text-xs font-semibold tracking-wide text-mist group-hover:border-lime/40 group-hover:bg-lime/10 group-hover:text-chalk">
        {label}
      </span>
    </a>
  )
}

function SocialBar() {
  return (
    <div className="win-border rounded-xl shadow-win">
      <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-3">
        {SOCIALS.map(({ name, href, Icon, bg }) => (
          <a
            key={name}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={name}
            style={{ backgroundColor: bg }}
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-chalk shadow-icon transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/50 hover:shadow-lime-glow cursor-pointer"
          >
            <Icon className="h-6 w-6" />
          </a>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
export default function App() {
  const [clock, setClock] = useState('')
  const [booting, setBooting] = useState(true)
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative min-h-screen pb-24">
      {/* Animated ShapeWaves background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <ShapeWaves
          text="</>"
          fontFamily='Geist, "Geist Sans", system-ui, sans-serif'
          fontWeight={500}
          textSize={0.6}
          shapes="mixed"
          cellSize={10}
          dotSize={0.75}
          color="#5a5a62"
          hoverColor="#DBFF00"
          backgroundColor="#120f17"
          speed={1}
          scale={1}
          contrast={1}
          brightness={0.45}
          flow={0.4}
          direction={25}
          fade={0.25}
          interactive={true}
          splashRadius={120}
          splashStrength={0.55}
          glow={0.4}
          intro={true}
          introDuration={1.6}
          paused={false}
        />
        {/* Readability veil so content sits above the field */}
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/60 to-night/85" />
      </div>

      {booting && <Boot onDone={() => setBooting(false)} />}

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* HERO */}
        <header className="animate-fade-up">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-6">
              <Folder label="profile" target="profile" Icon={ProfileIcon} />
              <Folder label="works" target="works" />
            </div>
            <h1
              className="select-none pt-2 text-center font-display text-5xl font-black uppercase leading-none tracking-tight text-transparent sm:text-7xl md:text-8xl"
              style={{ WebkitTextStroke: '2px #DBFF00' }}
            >
              Portfolio
            </h1>
            <div className="flex flex-col gap-6">
              <Folder label="contact" target="contact" />
              <Folder label="resume" target="resume" />
            </div>
          </div>
          <div className="mt-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <SocialBar />
          </div>
          <p className="mt-3 hidden text-center font-mono text-xs text-mist/70 md:block">
            tip: grab a window's title bar to drag it around ✦
          </p>
        </header>

        {/* PROFILE */}
        <section id="profile" className="mt-12 scroll-mt-6">
          <Win path="~/adon/profile">
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
              <Avatar />
              <div>
                <p className="font-mono text-2xl text-mist">{ME.greeting}</p>
                <h2 className="font-display text-4xl font-black leading-tight text-lime sm:text-5xl">
                  {ME.name}
                </h2>
                <p className="mt-1 text-xs font-bold tracking-[0.2em] text-mist">{ME.role}</p>
                <p className="mt-4 max-w-prose border-l-2 border-lime pl-3 italic text-chalk/80">
                  {ME.quote}
                </p>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-chalk/70">{ME.summary}</p>

                {/* Education highlight */}
                <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-lg border border-lime/20 bg-lime/5 px-3 py-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-lime">Studying</span>
                  <span className="text-sm text-chalk">
                    {ME.major} <span className="text-mist">@ {ME.university}</span>
                  </span>
                </div>
              </div>
            </div>
          </Win>
        </section>

        {/* WORKS */}
        <section id="works" className="mt-10 scroll-mt-6">
          <Win path="~/adon/works" delay={60}>
            <h3 className="mb-4 text-center font-display text-2xl font-black uppercase tracking-wide text-chalk">
              Skills
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SKILLS.map((t) => (
                <div
                  key={t}
                  className="flex items-center justify-center rounded-lg border border-edge bg-white/[0.03] px-2 py-3 text-center text-sm font-semibold text-chalk/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/50 hover:text-lime"
                >
                  {t}
                </div>
              ))}
            </div>

            <h3 className="mb-4 mt-8 text-center font-display text-2xl font-black uppercase tracking-wide text-chalk">
              Experience
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {EXPERIENCE.map((p) => (
                <div
                  key={p.title}
                  className="group block rounded-lg border border-edge bg-white/[0.03] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-lime/40 hover:bg-white/[0.06] hover:shadow-lime-glow"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded border border-lime/30 bg-lime/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lime">
                      {p.tag}
                    </span>
                    <span className="font-mono text-xs text-mist">{p.when}</span>
                  </div>
                  <h4 className="mt-3 font-display text-base font-bold leading-snug text-chalk">{p.title}</h4>
                  <p className="mt-1 text-sm text-chalk/65">{p.desc}</p>
                </div>
              ))}
            </div>
          </Win>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-10 scroll-mt-6">
          <Win path="~/adon/contact" accent delay={60}>
            <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-display text-3xl font-black uppercase text-chalk">Let's talk</h3>
                <p className="mt-2 max-w-prose text-sm text-chalk/70">
                  Have a project, an opportunity, or want to chat about AI & sustainability? Reach out.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`mailto:${ME.email}`}
                    className="inline-flex w-fit items-center gap-2 rounded-lg border border-lime bg-lime px-4 py-2 font-mono text-base font-semibold text-night transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lime-glow cursor-pointer"
                  >
                    <MailIcon className="h-5 w-5" />
                    {ME.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3 sm:flex-col">
                {SOCIALS.map(({ name, href, Icon, bg }) => (
                  <a
                    key={name}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={name}
                    style={{ backgroundColor: bg }}
                    className="grid h-12 w-12 place-items-center rounded-lg border border-white/10 text-chalk shadow-icon transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/50 hover:shadow-lime-glow cursor-pointer"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </Win>
        </section>

        {/* RESUME */}
        <section id="resume" className="mt-10 scroll-mt-6">
          <Win path="~/adon/resume" delay={60}>
            <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-chalk">Awards & Highlights</h3>
                <ul className="mt-3 space-y-2">
                  {AWARDS.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-chalk/80">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-lime" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center gap-3 text-center">
                <FolderIcon className="h-16 w-16 animate-float drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)]" />
                <p className="font-mono text-sm text-mist">Adon_Banker_Resume.pdf</p>
                <a
                  href={ME.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-lime bg-lime px-5 py-2.5 font-semibold text-night transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lime-glow cursor-pointer"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download CV
                </a>
              </div>
            </div>
          </Win>
        </section>
      </main>

      {/* TASKBAR */}
      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-edge bg-night/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2">
          <a
            href="#profile"
            className="inline-flex items-center gap-2 rounded-lg border border-lime bg-lime px-3 py-1.5 text-sm font-bold text-night transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowIcon className="h-4 w-4" />
            Visit site
          </a>
          <div className="hidden gap-2 sm:flex">
            {SOCIALS.map(({ name, href, Icon, bg }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={name}
                style={{ backgroundColor: bg }}
                className="grid h-8 w-8 place-items-center rounded-md border border-white/10 text-chalk transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <span className="rounded-md border border-edge bg-white/[0.04] px-3 py-1 font-mono text-sm text-lime">{clock}</span>
        </div>
      </footer>
    </div>
  )
}
