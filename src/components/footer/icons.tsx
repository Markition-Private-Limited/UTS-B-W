import type { SVGProps } from "react";

export function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.47A21 21 0 0 0 14.6 4.3c-2.1 0-3.54 1.28-3.54 3.63v2.5H8.5v2.97h2.56V21h2.44Z" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H4.56V19.4h2.38Zm-1.19-3.8a1.38 1.38 0 1 0 0 2.76 1.38 1.38 0 0 0 0-2.76ZM19.44 19.4h-2.37v-5.4c0-1.29-.46-2.17-1.6-2.17-.87 0-1.39.59-1.62 1.15-.08.2-.1.48-.1.76v5.66H11.4s.03-9.19 0-10.9h2.37v1.54a2.35 2.35 0 0 1 2.14-1.18c1.56 0 2.73 1.02 2.73 3.2Z" />
    </svg>
  );
}

export function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.9 7.03c.01.17.01.35.01.52 0 5.3-4.03 11.4-11.4 11.4-2.27 0-4.38-.66-6.15-1.8.31.04.63.05.96.05a8.07 8.07 0 0 0 5-1.72 4.03 4.03 0 0 1-3.76-2.8c.25.04.5.07.76.07.37 0 .73-.05 1.07-.14a4.02 4.02 0 0 1-3.23-3.95v-.05c.55.3 1.18.49 1.84.51a4.02 4.02 0 0 1-1.25-5.37A11.43 11.43 0 0 0 12.86 8c-.07-.3-.1-.6-.1-.92a4.02 4.02 0 0 1 6.95-2.75 7.9 7.9 0 0 0 2.55-.97 4.02 4.02 0 0 1-1.77 2.22 8.06 8.06 0 0 0 2.31-.63 8.3 8.3 0 0 1-2 2.08Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
