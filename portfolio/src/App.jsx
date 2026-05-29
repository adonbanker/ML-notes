import { useEffect, useState } from 'react'
import useReveal from './useReveal'
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
/*  Edit your details here                                             */
/* ------------------------------------------------------------------ */
const ME = {
  name: 'Adon S. Banker',
  role: "I'M A DEVELOPER & ML ENTHUSIAST",
  greeting: "hi! i'm",
  quote: '"Turning data and ideas into things that work."',
  email: 'bankeradon@gmail.com',
  linkedin: 'https://www.linkedin.com/in/adon-s-banker-3517162b6/',
  github: 'https://github.com/adonbanker',
}

const SOCIALS = [
  { name: 'LinkedIn', href: ME.linkedin, Icon: LinkedInIcon, bg: '#2f6fb0' },
  { name: 'GitHub', href: ME.github, Icon: GitHubIcon, bg: '#2b2b25' },
  { name: 'Email', href: `mailto:${ME.email}`, Icon: MailIcon, bg: '#b85b8a' },
]

const TOOLS = [
  'Python', 'PyTorch', 'scikit-learn', 'Pandas',
  'NumPy', 'OpenCV', 'Jupyter', 'Git',
]

const PROJECTS = [
  {
    title: 'Alonso Podium Predictor',
    tag: 'Machine Learning',
    desc: 'Predicts F1 podium finishes from historical race telemetry & form.',
    href: ME.github,
  },
  {
    title: 'KNN From Scratch',
    tag: 'Algorithms',
    desc: 'A clean, dependency-light implementation of K-Nearest Neighbors.',
    href: ME.github,
  },
  {
    title: 'Linear Regression Lab',
    tag: 'Notebooks',
    desc: 'Per-capita income modeling with diagnostics and visualizations.',
    href: ME.github,
  },
  {
    title: 'Image · OpenCV',
    tag: 'Computer Vision',
    desc: 'Classic image-processing pipelines and feature experiments.',
    href: ME.github,
  },
]

/* ------------------------------------------------------------------ */
/*  Reusable retro window                                              */
/* ------------------------------------------------------------------ */
function Win({ path, children, className = '', accent = false, delay = 0 }) {
  const [ref, shown] = useReveal()
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`win-border bg-cream shadow-win-lg ${
        shown ? 'animate-win-open' : 'opacity-0'
      } ${className}`}
    >
      {/* Title bar */}
      <div
        className={`flex items-center justify-between gap-2 border-b-2 border-ink px-2.5 py-1.5 ${
          accent ? 'bg-accent text-cream' : 'bg-olive text-cream'
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-3 w-3 border-2 border-ink bg-cream/90" />
          </span>
          <p className="truncate font-mono text-base leading-none tracking-wide">{path}</p>
        </div>
        <div className="flex gap-1" aria-hidden="true">
          <span className="grid h-4 w-4 place-items-center border-2 border-ink bg-cream text-[10px] font-black text-ink">
            _
          </span>
          <span className="grid h-4 w-4 place-items-center border-2 border-ink bg-cream text-[10px] font-black text-ink">
            ×
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  )
}

/* Folder shortcut (desktop icon) */
function Folder({ label, target, Icon = FolderIcon }) {
  return (
    <a
      href={`#${target}`}
      className="group flex w-20 cursor-pointer flex-col items-center gap-1.5 rounded-sm p-2 outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1"
    >
      <span className="transition-transform duration-200 group-hover:rotate-[-3deg]">
        <Icon className="h-14 w-14 drop-shadow-[3px_3px_0_rgba(43,43,37,0.55)]" />
      </span>
      <span className="border border-transparent px-1.5 text-xs font-semibold tracking-wide text-ink group-hover:border-ink group-hover:bg-cream">
        {label}
      </span>
    </a>
  )
}

/* Social pill in the olive task bar */
function SocialBar() {
  return (
    <div className="win-border bg-olive shadow-win">
      <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-3">
        {SOCIALS.map(({ name, href, Icon, bg }) => (
          <a
            key={name}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={name}
            style={{ backgroundColor: bg }}
            className="grid h-11 w-11 place-items-center border-2 border-ink text-cream shadow-icon transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_rgba(43,43,37,0.8)] cursor-pointer"
          >
            <Icon className="h-6 w-6" />
          </a>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                               */
/* ------------------------------------------------------------------ */
export default function App() {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      )
    tick()
    const id = setInterval(tick, 1000 * 30)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen pb-24">
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ============ HERO / DESKTOP ============ */}
        <header className="animate-fade-up">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-6">
              <Folder label="profile" target="profile" Icon={ProfileIcon} />
              <Folder label="works" target="works" />
            </div>

            <h1 className="select-none pt-2 text-center font-display text-5xl font-black uppercase leading-none tracking-tight text-transparent sm:text-7xl md:text-8xl"
                style={{ WebkitTextStroke: '2px #7c7f4e' }}>
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
        </header>

        {/* ============ PROFILE ============ */}
        <section id="profile" className="mt-12 scroll-mt-6">
          <Win path={`C:\\${ME.name.split(' ')[0]}\\profile`}>
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
              <div className="mx-auto">
                <div className="win-border grid h-36 w-36 place-items-center bg-[#3f513f] shadow-win">
                  <span className="font-display text-6xl font-black text-cream">
                    {ME.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-mono text-2xl text-ink/70">{ME.greeting}</p>
                <h2 className="font-display text-4xl font-black leading-tight text-accent sm:text-5xl">
                  {ME.name}
                </h2>
                <p className="mt-1 text-xs font-bold tracking-[0.2em] text-ink/60">
                  {ME.role}
                </p>
                <p className="mt-4 max-w-prose border-l-4 border-olive pl-3 italic text-ink/80">
                  {ME.quote}
                </p>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink/75">
                  I build machine-learning experiments and small, sturdy tools —
                  from F1 podium predictors to from-scratch algorithm notebooks.
                  I care about clean code, honest results, and interfaces that
                  feel good to use.
                </p>
              </div>
            </div>
          </Win>
        </section>

        {/* ============ WORKS ============ */}
        <section id="works" className="mt-10 scroll-mt-6">
          <Win path={`C:\\${ME.name.split(' ')[0]}\\works`} delay={60}>
            {/* Tools */}
            <h3 className="mb-4 text-center font-display text-2xl font-black uppercase tracking-wide">
              Tools
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TOOLS.map((t) => (
                <div
                  key={t}
                  className="win-border flex items-center justify-center bg-paper px-2 py-3 text-center text-sm font-semibold shadow-icon transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Projects */}
            <h3 className="mb-4 mt-8 text-center font-display text-2xl font-black uppercase tracking-wide">
              Projects
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {PROJECTS.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group win-border block cursor-pointer bg-paper p-4 shadow-icon transition-all duration-200 hover:-translate-y-1 hover:bg-cream hover:shadow-win"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block border-2 border-ink bg-olive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cream">
                      {p.tag}
                    </span>
                    <ArrowIcon className="h-4 w-4 text-ink/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </div>
                  <h4 className="mt-3 font-display text-lg font-bold">{p.title}</h4>
                  <p className="mt-1 text-sm text-ink/70">{p.desc}</p>
                </a>
              ))}
            </div>
          </Win>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="mt-10 scroll-mt-6">
          <Win path={`C:\\${ME.name.split(' ')[0]}\\contact`} accent delay={60}>
            <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-display text-3xl font-black uppercase">Let's talk</h3>
                <p className="mt-2 max-w-prose text-sm text-ink/75">
                  Have a project, a role, or just want to swap notes on ML?
                  My inbox is open.
                </p>
                <a
                  href={`mailto:${ME.email}`}
                  className="mt-4 inline-flex items-center gap-2 border-2 border-ink bg-accent px-4 py-2 font-mono text-lg text-cream shadow-icon transition-all duration-200 hover:-translate-y-0.5 hover:shadow-win cursor-pointer"
                >
                  <MailIcon className="h-5 w-5" />
                  {ME.email}
                </a>
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
                    className="grid h-12 w-12 place-items-center border-2 border-ink text-cream shadow-icon transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </Win>
        </section>

        {/* ============ RESUME ============ */}
        <section id="resume" className="mt-10 scroll-mt-6">
          <Win path={`C:\\${ME.name.split(' ')[0]}\\resume`} delay={60}>
            <div className="flex flex-col items-center gap-4 text-center">
              <FolderIcon className="h-16 w-16 animate-float drop-shadow-[3px_3px_0_rgba(43,43,37,0.5)]" />
              <h3 className="font-display text-2xl font-black uppercase">Resume.pdf</h3>
              <p className="max-w-md text-sm text-ink/70">
                Grab the full CV — experience, education, and the projects behind
                the icons above.
              </p>
              <a
                href={ME.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-2 border-ink bg-olive px-5 py-2.5 font-semibold text-cream shadow-icon transition-all duration-200 hover:-translate-y-0.5 hover:shadow-win cursor-pointer"
              >
                <DownloadIcon className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </Win>
        </section>
      </main>

      {/* ============ TASKBAR FOOTER ============ */}
      <footer className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-ink bg-olive-dark">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2">
          <a
            href="#profile"
            className="inline-flex items-center gap-2 border-2 border-ink bg-cream px-3 py-1.5 text-sm font-bold text-ink shadow-icon transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
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
                className="grid h-8 w-8 place-items-center border-2 border-ink text-cream transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <span className="border-2 border-ink bg-cream px-3 py-1 font-mono text-sm text-ink">
            {clock}
          </span>
        </div>
      </footer>
    </div>
  )
}
