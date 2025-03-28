import Link from "next/link";
import Image from "next/image";

interface LogoProps {
    variant?: "invert" | "default";
}

export default function Logo({variant = "default"}: LogoProps) {
  return (
    <ul>
      <li>
        <Link href="/">
          <Image
            src={`/logo-${variant}.svg`}
            alt=""
            width={175}
            height={70}
            priority={true}
            className="w-30 xl:w-full"
          />
        </Link>
      </li>
    </ul>
  );
}