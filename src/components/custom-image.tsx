'use client';

import clsx from 'clsx';
import Image, { ImageLoader } from 'next/image';

const microCMSLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?fm=webp&w=${width}&q=${quality || 75}`;
};

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
}) => {
  return (
    <Image
      className={clsx('', className)}
      loader={microCMSLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
    />
  );
};
