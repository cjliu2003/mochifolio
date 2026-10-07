// Illustrations are exported to WebP by scripts/optimize-images.py at full
// size plus an 800px variant for phones.
export default function Art({ name, alt, width, height, sizes = '(max-width: 900px) 100vw, 560px', priority = false }) {
  return (
    <img
      src={`assets/${name}.webp`}
      srcSet={`assets/${name}-800.webp 800w, assets/${name}.webp ${width}w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
