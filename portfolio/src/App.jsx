import { useState } from 'react'
import useReveal from './useReveal'
import ShapeWaves from './ShapeWaves'
import {
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
  role: 'Economics & Entrepreneurship · Data Science',
  quote: 'Applying technology for real-world impact.',
  summary:
    'Currently studying Economics & Entrepreneurship with Data Science at Reichman University. I build AI-focused research projects and community-driven sustainability initiatives, with a track record across social impact, heritage preservation, and STEM innovation.',
  university: 'Reichman University',
  major: 'Economics & Entrepreneurship with Data Science',
  email: 'bankeradon@gmail.com',
  linkedin: 'https://www.linkedin.com/in/adon-s-banker-3517162b6/',
  github: 'https://github.com/adonbanker',
  resume: './Adon_Banker_Resume.pdf',
  photo: './profile.jpg', // drop your photo in /public/profile.jpg
}

const SOCIALS = [
  { name: 'LinkedIn', href: ME.linkedin, Icon: LinkedInIcon },
  { name: 'GitHub', href: ME.github, Icon: GitHubIcon },
  { name: 'Email', href: `mailto:${ME.email}`, Icon: MailIcon },
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
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, shown] = useReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="h-px w-8 bg-lime" />
      <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-lime">{children}</h2>
    </div>
  )
}

function SocialLinks({ size = 'md' }) {
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <div className="flex gap-3">
      {SOCIALS.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          aria-label={name}
          className={`grid ${dim} place-items-center rounded-lg border border-edge bg-white/[0.03] text-chalk/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/60 hover:text-lime hover:shadow-lime-glow cursor-pointer`}
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  )
}

function Avatar() {
  const [ok, setOk] = useState(true)
  return (
    <div className="relative">
      <div
        className="absolute -inset-2 rounded-full opacity-50 blur-xl"
        style={{ background: 'radial-gradient(circle, rgba(219,255,0,0.45), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative grid h-40 w-40 place-items-center overflow-hidden rounded-full border-2 border-lime/60 bg-panel sm:h-48 sm:w-48">
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

/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="relative min-h-screen text-chalk">
      {/* ShapeWaves animated background (the only visual effect kept) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <ShapeWaves
          text="</>"
          fontFamily='Geist, "Geist Sans", system-ui, sans-serif'
          fontWeight={500}
          textSize={0.6}
          shapes="mixed"
          cellSize={10}
          dotSize={0.75}
          color="#8b8b95"
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
        <div className="absolute inset-0 bg-gradient-to-b from-night/10 via-night/35 to-night/70" />
      </div>

      {/* HERO */}
      <section className="mx-auto flex min-h-[92vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-lime">hi, i'm</p>
          <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-chalk sm:text-7xl md:text-8xl">
            {ME.name}
          </h1>
          <p className="mt-4 text-base font-medium tracking-wide text-mist sm:text-lg">{ME.role}</p>
          <p className="mx-auto mt-6 max-w-xl text-lg italic text-chalk/70">“{ME.quote}”</p>
        </Reveal>
        <Reveal delay={150} className="mt-8 flex flex-col items-center gap-6">
          <SocialLinks />
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full border border-lime bg-lime px-6 py-2.5 text-sm font-bold text-night transition-all duration-200 hover:shadow-lime-glow cursor-pointer"
          >
            Explore
            <ArrowIcon className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
          </a>
        </Reveal>
      </section>

      <main className="mx-auto w-full max-w-4xl px-6 pb-28">
        {/* ABOUT */}
        <section id="about" className="scroll-mt-20 py-16">
          <Reveal>
            <SectionLabel>About</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
              <div className="shrink-0">
                <Avatar />
              </div>
              <div>
                <p className="text-lg leading-relaxed text-chalk/85">{ME.summary}</p>
                <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-lg border border-lime/20 bg-lime/5 px-4 py-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime">
                    Studying
                  </span>
                  <span className="text-sm text-chalk">
                    {ME.major} <span className="text-mist">@ {ME.university}</span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-20 py-16">
          <Reveal>
            <SectionLabel>Skills</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SKILLS.map((t, i) => (
              <Reveal key={t} delay={i * 50}>
                <div className="flex items-center justify-center rounded-lg border border-edge bg-white/[0.03] px-3 py-4 text-center text-sm font-semibold text-chalk/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/60 hover:text-lime">
                  {t}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-20 py-16">
          <Reveal>
            <SectionLabel>Experience</SectionLabel>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {EXPERIENCE.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 80}>
                <div className="group h-full rounded-xl border border-edge bg-white/[0.03] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-lime/40 hover:bg-white/[0.06] hover:shadow-lime-glow">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block rounded border border-lime/30 bg-lime/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lime">
                      {p.tag}
                    </span>
                    <span className="font-mono text-xs text-mist">{p.when}</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-chalk">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-chalk/65">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* AWARDS + RESUME */}
        <section id="awards" className="scroll-mt-20 py-16">
          <Reveal>
            <SectionLabel>Awards & Resume</SectionLabel>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
            <Reveal>
              <ul className="space-y-3">
                {AWARDS.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-chalk/85">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-lime" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <a
                href={ME.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-lime bg-lime px-6 py-3 font-semibold text-night transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lime-glow cursor-pointer"
              >
                <DownloadIcon className="h-4 w-4" />
                Download CV
              </a>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-20 py-16">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-2xl border border-edge bg-white/[0.03] p-8 text-center sm:p-12">
              <h3 className="font-display text-3xl font-black text-chalk sm:text-4xl">Let's talk</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-chalk/70">
                Have a project, an opportunity, or want to chat about AI & sustainability? Reach out.
              </p>
              <a
                href={`mailto:${ME.email}`}
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-lime bg-lime px-6 py-3 font-mono font-semibold text-night transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lime-glow cursor-pointer"
              >
                <MailIcon className="h-5 w-5" />
                {ME.email}
              </a>
              <div className="mt-8 flex justify-center">
                <SocialLinks size="sm" />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-edge/60 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="font-mono text-xs text-mist">© {new Date().getFullYear()} {ME.name}</p>
          <SocialLinks size="sm" />
        </div>
      </footer>
    </div>
  )
}
