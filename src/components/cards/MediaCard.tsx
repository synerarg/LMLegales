import Image, { StaticImageData } from "next/image";

interface Props {
    image: StaticImageData,
}

// Ficha blanca con la pagina adentro, como las tarjetas de noticias de imk.ca.
// Las paginas traen colores muy distintos: en blanco y negro se leen como un conjunto (igual que el equipo)
// y al pasar el mouse vuelve el color.
const MediaCard = ({image}: Props) => {
    return (
        <div className="group bg-surface-raised p-3 sm:p-4">
            <Image
                src={image}
                alt="media image"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 75vw"
                className="w-full h-auto grayscale group-hover:grayscale-0 motion-safe:transition-[filter] duration-300"
            ></Image>
        </div>
    );
};

export default MediaCard;
