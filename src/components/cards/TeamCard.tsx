import Image, { StaticImageData } from "next/image"
import linkedInIcon from "../../../public/icons/about/linkedin.svg"
import Link from "next/link"

interface Props {
  name: string
  position: string
  image: StaticImageData
  linkedIn: string
}

// Estructura tomada de la grilla de equipo de imk.ca: retrato vertical 4:5 sin textos encima,
// y debajo el nombre y el cargo en un tono mas suave. Toda la tarjeta lleva al LinkedIn de la persona.
const TeamCard = ({ name, position, image, linkedIn }: Props) => {
  return (
    <Link
      href={linkedIn}
      target="_blank"
      rel="noopener noreferrer"
      title={`${name} · LinkedIn`}
      className="group block font-poppins focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-surface-sunken">
        {/* Las fotos vienen con fondos y encuadres distintos: en blanco y negro se leen como un conjunto.
            Al pasar el mouse vuelve el color. */}
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover object-top grayscale group-hover:grayscale-0 motion-safe:transition-[filter] duration-300"
        />
      </div>
      {/* El icono de LinkedIn queda siempre a la vista: es la senal de que la tarjeta lleva al perfil. */}
      <div className="mt-2 flex items-start justify-between gap-3">
        <h3 className="text-[1.05rem] leading-snug text-fg-primary group-hover:underline underline-offset-4">
          {name}
        </h3>
        <Image
          src={linkedInIcon}
          alt="LinkedIn"
          className="w-5 h-5 shrink-0 mt-0.5 motion-safe:transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      <p className="text-[0.95rem] leading-snug text-fg-muted">{position}</p>
    </Link>
  )
}

export default TeamCard
