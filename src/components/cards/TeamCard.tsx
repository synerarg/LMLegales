import Image, { StaticImageData } from "next/image"
import linkedInIcon from "../../../public/icons/about/linkedin.svg"
import Link from "next/link"

interface Props {
  name: string
  position: string
  image: StaticImageData
  linkedIn: string
}

const TeamCard = ({ name, position, image, linkedIn }: Props) => {
  return (
    <div className="sm:w-[22.88rem] sm:h-[22.97rem] w-[20rem] h-80 text-fg-on-dark overflow-hidden relative group font-poppins cursor-pointer">
      <div className="absolute w-full h-full bg-overlay-scrim opacity-0 group-hover:opacity-100 duration-300"></div>
      <Image src={image} alt={name} fill className="object-cover" />
      <div className="absolute sm:top-60 top-52 right-0 w-full">
        <div className="relative right-3 group-hover:right-12 duration-300">
          <h1 className="absolute whitespace-nowrap right-0 z-10 text-[1.35rem] font-medium">
            {name}
            <div className="absolute -inset-x-3 -inset-y-1 bg-surface-inverse -z-10 opacity-70"></div>
          </h1>
        </div>
        <Link href={linkedIn} target="_blank" className="focus-visible:outline-focus-ring-on-dark">
          <Image
            src={linkedInIcon}
            alt="linkedin"
            className="absolute -right-8 group-hover:right-2 duration-300 top-2"
          />
        </Link>
      </div>
      <div className="absolute sm:top-72 top-64 right-0 sm:w-[65%] w-[75%]">
        <div className="relative -right-64 group-hover:right-3 duration-500 text-right">
          <h2 className="absolute whitespace-normal right-0 z-10 text-base text-fg-on-dark-2">
            {position}
            <div className="absolute -inset-x-3 -inset-y-1 bg-surface-inverse -z-10 opacity-70"></div>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default TeamCard
