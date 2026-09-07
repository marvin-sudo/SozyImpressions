import React from 'react';

export const WHATSAPP_ICON_URL = 'https://www.image2url.com/r2/default/images/1788778555859-9cfbf16d-5574-4e39-bcc2-cc48f55de4ce.png';

interface WhatsAppIconProps {
  className?: string;
  size?: number | string;
  alt?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  className = '',
  size = 18,
  alt = 'WhatsApp',
}) => {
  const inlineStyle: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  };

  return (
    <img
      src={WHATSAPP_ICON_URL}
      alt={alt}
      style={inlineStyle}
      className={`inline-block shrink-0 object-contain aspect-square select-none ${className}`}
      referrerPolicy="no-referrer"
      loading="eager"
      draggable={false}
    />
  );
};
