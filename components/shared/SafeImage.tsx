'use client';

import { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  fallback = '/placeholder.png', 
  className, 
  ...props 
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      {...props}
      src={hasError ? fallback : src}
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
        }
      }}
    />
  );
}
