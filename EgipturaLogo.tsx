import React from 'react';

// Base64 representation of the user-provided logo image.
const logoSrc = "logo (1).png";

const EgipturaLogo: React.FC<{ className?: string }> = ({ className }) => (
    <img src={logoSrc} alt="Egiptura Logo" className={`w-40 h-auto ${className || ''}`} />
);

export default EgipturaLogo;
