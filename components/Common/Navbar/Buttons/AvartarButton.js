import Image from 'next/image';
import defaultAvartar from 'public/image/icon/happiness.png';

export function AvartarImage({ isDropdown = false, avartar }) {
  return (
    <Image
      className={
        isDropdown
          ? 'flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9'
          : 'avatar w-7 h-8 ro8nded-md '
      }
      src={avartar ?? defaultAvartar}
      width={32}
      height={32}
      alt="avartar"
    />
  )
}

export default function AvartarButton({ onclick, avartar }) {
  return (
    <button
      className="ml-[12px]"
      onClick={onclick}
    >
      <AvartarImage avartar={avartar} />
    </button>
  )
}
