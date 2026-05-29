// SVG icon set — brand logos from Simple Icons paths + UI glyphs.
// All use a 24x24 viewBox for consistent sizing.

export const FolderIcon = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
    <path
      d="M2 6a3 3 0 0 1 3-3h12l4 5h22a3 3 0 0 1 3 3v23a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6Z"
      fill="#e8c25a"
      stroke="#2b2b25"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M2 13h44v20a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V13Z"
      fill="#f3d77a"
      stroke="#2b2b25"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

export const ProfileIcon = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
    <rect x="6" y="3" width="36" height="34" rx="4" fill="#3f513f" stroke="#2b2b25" strokeWidth="2" />
    <text
      x="24"
      y="29"
      textAnchor="middle"
      fontFamily="Archivo, sans-serif"
      fontWeight="800"
      fontSize="24"
      fill="#f3f1e2"
    >
      h
    </text>
  </svg>
)

export const LinkedInIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)

export const GitHubIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
)

export const MailIcon = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6 9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ArrowIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const DownloadIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
