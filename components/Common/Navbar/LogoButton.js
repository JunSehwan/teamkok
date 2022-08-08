import Link from 'next/link';
import Image from 'next/image';
import logo from 'public/logo/teamkok.png';

export function LogoImage({ size }) {
  return (
    <Image src={logo} width={size} height={size} alt="TEAMKOK_LOGO" />
  )
}

export default function LogoButton({ size = 32 }) {
  return (
    <div className="flex justify-start lg:w-0 lg:flex-1">
      <Link href="/">
        <a>
          <span className="sr-only">TEAMKOK</span>
          <LogoImage size={size} />
        </a>
      </Link>
    </div>
  )
}
