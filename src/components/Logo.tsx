import Image from "next/image"

interface LogoProps {
  className?: string
  size?: number
}

// Designed this logo myself using K and E letters on Inkscape. Can be found on the public folder.
export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/ke.svg"
        alt="KE Logo"
        width={size}
        height={size}
        className="h-auto w-auto"
      />
    </div>
  )
}
