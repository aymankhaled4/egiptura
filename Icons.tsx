import React from 'react';

type IconProps = {
    className?: string;
};

export const AnubisIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M14.28 2.36C13.04 1.83 11.66 2.4 11.14 3.65L9.66 7.23C9.43 7.74 8.89 8.07 8.35 8.07H4.37C3.92 8.07 3.52 8.4 3.43 8.85L2.03 15.05C1.86 15.86 2.47 16.63 3.3 16.63H3.69C5.88 16.22 8.24 16.2 10.37 16.59C10.74 16.65 11.1 16.4 11.22 16.05L12.56 11.75C12.72 11.27 13.25 10.95 13.78 11.01L14.86 11.14C15.42 11.2 15.93 10.78 15.99 10.22L16.47 6.07C16.53 5.51 16.1 5 15.53 4.9L14.45 4.69C15.42 4.03 15.86 2.89 15.28 1.91C15.02 1.48 14.59 1.17 14.12 1.05L18.43 3.34C18.99 3.62 19.26 4.3 18.98 4.86L18.43 5.89C18.15 6.45 18.43 7.14 18.98 7.41L21.14 8.49C21.69 8.76 22.38 8.49 22.66 7.93L22.84 7.57C23.12 7.01 22.84 6.32 22.29 6.05L14.28 2.36Z" />
  </svg>
);


export const SendIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

// Thematic Icons
export const PapyrusScrollIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2" />
        <path d="M5 7h14" />
        <path d="M19 7v10" />
        <path d="M5 7v10" />
        <path d="M9 11h6" />
        <path d="M9 14h4" />
    </svg>
);

export const ObeliskIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 21h6v-11.5l-3 -1.5l-3 1.5v11.5" />
        <path d="M10 21v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2" />
        <path d="M12 3l1.5 3h-3z" />
    </svg>
);

export const EyeOfHorusIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M16.5 12c0 2.485 -2.015 4.5 -4.5 4.5s-4.5 -2.015 -4.5 -4.5c0 -2.485 2.015 -4.5 4.5 -4.5s4.5 2.015 4.5 4.5z" />
    <path d="M7.5 12h-5.5" />
    <path d="M16.5 12h5.5" />
    <path d="M12 7.5v-5.5" />
    <path d="M12 16.5v5.5" />
    <path d="m8.929 8.929 -4.429 -4.429" />
    <path d="m19.071 19.071 -4.429 -4.429" />
    <path d="m19.071 4.929 -4.429 4.429" />
    <path d="m8.929 15.071 -4.429 4.429" />
  </svg>
);

export const FeluccaIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 3l8 11.5h-16z" />
        <path d="M12 3v13" />
        <path d="M3.5 16a8.5 8.5 0 0 0 17 0" />
    </svg>
);

export const LotusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 17a2.5 2.5 0 0 1 2.5 2.5c0 1.4 -1.1 2.5 -2.5 2.5c-1.4 0 -2.5 -1.1 -2.5 -2.5a2.5 2.5 0 0 1 2.5 -2.5z" />
        <path d="M12 17c-2.5 0 -5 -1.5 -5 -6c0 -3 2 -6 5 -6s5 3 5 6c0 4.5 -2.5 6 -5 6" />
        <path d="M8 11c0 2 1 4 4 4s4 -2 4 -4" />
    </svg>
);

export const CrossedSceptersIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M19.95 18.006a3 3 0 0 0 -2.95 2a3 3 0 0 0 -2.95 -2a3 3 0 0 0 -2.95 2a3 3 0 0 0 -2.95 -2a3 3 0 0 0 -2.95 2a3 3 0 0 0 -2.15 -1.98" />
        <path d="M4 4l16 16" />
        <path d="M17 7l-1.5 1.5" />
        <path d="M13 11l-1.5 1.5" />
        <path d="M9 15l-1.5 1.5" />
        <path d="M3 3l1 1" />
    </svg>
);

export const HieroglyphArrowDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 5v14" />
        <path d="M16 15l-4 4" />
        <path d="M8 15l4 4" />
    </svg>
);

export const RaSunIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M12 3v-1" />
        <path d="M12 20v2" />
        <path d="M20 12h2" />
        <path d="M2 12h2" />
        <path d="M17.657 6.343l1.414 -1.414" />
        <path d="M4.929 19.071l1.414 -1.414" />
        <path d="M19.071 19.071l-1.414 -1.414" />
        <path d="M6.343 6.343l-1.414 -1.414" />
    </svg>
);

export const CrescentMoonIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 1.992a10 10 0 1 0 10 10a10 10 0 0 0 -10 -10z" />
        <path d="M12 4a8 8 0 0 0 0 16" />
    </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M4 11h16" />
        <path d="M11 15h1" />
        <path d="M12 15v3" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </svg>
);

export const ShipIcon: React.FC<IconProps> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" />
        <path d="M4 18l-1 -5h18l-2 5" />
        <path d="M5 13v-6h8l4 6" />
        <path d="M7 7v-4h-1" />
    </svg>
);

export const DiamondIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" />
        <path d="M10 12l-2 -2.2l.6 -1" />
    </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15c-1.49 0-2.96-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.28-1.26-2.79-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42s2.41 3.63 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.28.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.76 2.67 4.25 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.28z"/>
    </svg>
);
