import logoSrc from '../assets/Logo.webp'

export default function Logo({ height = 40 }) {
  const ratio = 392 / 180
  const w = height * ratio

  return (
    <img src={logoSrc} alt="Air Astana" width={w} height={height} style={{ display: 'block' }} />
  )
}
