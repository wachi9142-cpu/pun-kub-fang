/* ไอคอนแบรนด์โซเชียลแบบ SVG (lucide เวอร์ชันที่ใช้ไม่มีไอคอนแบรนด์) */

type IconProps = { size?: number; className?: string };

export function FacebookIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34v7A9.99 9.99 0 0 0 22 12.06Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function LineIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 3C6.48 3 2 6.69 2 11.23c0 4.07 3.55 7.48 8.35 8.13.32.07.77.22.88.5.1.26.07.66.03.92l-.14.85c-.04.25-.2.98.86.54 1.06-.45 5.7-3.36 7.78-5.75C21.1 15.13 22 13.28 22 11.23 22 6.69 17.52 3 12 3ZM8.09 13.6h-2c-.29 0-.53-.24-.53-.53V9.09c0-.29.24-.53.53-.53.3 0 .54.24.54.53v3.44h1.46c.3 0 .54.24.54.54 0 .29-.24.53-.54.53Zm2.06-.53c0 .29-.24.53-.54.53a.53.53 0 0 1-.53-.53V9.09c0-.29.24-.53.53-.53.3 0 .54.24.54.53v3.98Zm4.71 0c0 .23-.15.43-.37.5a.6.6 0 0 1-.17.03.53.53 0 0 1-.43-.21l-2.04-2.78v2.46c0 .29-.24.53-.54.53a.53.53 0 0 1-.53-.53V9.09c0-.23.15-.43.37-.5a.53.53 0 0 1 .6.18l2.05 2.78V9.09c0-.29.24-.53.53-.53.3 0 .54.24.54.53v3.98Zm3.17-2.52c.3 0 .54.24.54.54 0 .29-.24.53-.54.53h-1.46v.94h1.46c.3 0 .54.24.54.54 0 .29-.24.53-.54.53h-2c-.29 0-.53-.24-.53-.53V9.09c0-.29.24-.53.53-.53h2c.3 0 .54.24.54.53 0 .3-.24.54-.54.54h-1.46v.94h1.46Z" />
    </svg>
  );
}

export function TiktokIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.5 3c.3 2.03 1.46 3.24 3.5 3.5v2.5c-1.2.12-2.24-.27-3.46-1v5.86c0 4.6-5 6.03-7 2.72-1.29-2.13-.49-5.87 3.7-6.02v2.63c-.32.05-.66.13-.97.24-.93.31-1.46 1.13-1.31 2.05.28 1.76 3.53 2.28 3.26-1.15V3h2.28Z" />
    </svg>
  );
}
