import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Eventos() {
  const events = [
    {
      id: 1,
      image: "/media/media1.png",
      date: "22 MAYO",
      name: "Ben Elsztain - Fireside chat on Corporate VC with Rodrigo Benzaquen",
      description:
        "Regulation Day surge en el marco de Aleph, la Pop Up City de Crecimiento, una comunidad global de desarrolladores y emprendedores de Web3 en colaboración con la Cámara Argentina Fintech con el objetivo de utilizar la tecnología blockchain para impulsar el desarrollo económico.",
    },
    {
      id: 2,
      image: "/media/media1.png",
      date: "23 MAYO",
      name: "Regulation day: Jornada de regulación público privada en web3",
      description:
        "Regulation Day surge en el marco de Aleph, la Pop Up City de Crecimiento, una comunidad global de desarrolladores y emprendedores de Web3 en colaboración con la Cámara Argentina Fintech con el objetivo de utilizar la tecnología blockchain para impulsar el desarrollo económico.",
    },
    {
      id: 3,
      image: "/media/media1.png",
      date: "23 MAYO",
      name: "Experiencia Endeavor Bs As | 2024",
      description:
        "Formulario de confirmacion de asistencia al Cocktail, Experiencia Endeavor Buenos Aires y VIP Launch.",
    },
    {
      id: 4,
      image: "/media/media1.png",
      date: "23 MAYO",
      name: "Inernacional Trademark Association (INTA) Annual Meeting",
      description:
        "Regulation Day surge en el marco de Aleph, la Pop Up City de Crecimiento, una comunidad global de desarrolladores y emprendedores de Web3 en colaboración con la Cámara Argentina Fintech con el objetivo de utilizar la tecnología blockchain para impulsar el desarrollo económico.",
    },
    {
      id: 5,
      image: "/media/media1.png",
      date: "23 MAYO",
      name: "2024 Leadership Metting - International Trademark Association (INTA)",
      description:
        "Unetenos a la reunión de liderazgo de la Asociación Internacional de Marcas (INTA) para discutir los desafíos y oportunidades que enfrentan los profesionales de marcas en todo el mundo.",
    },
    {
      id: 6,
      image: "/media/media1.png",
      date: "23 MAYO",
      name: "Luxury Law Summit",
      description:
        "Regulation Day surge en el marco de Aleph, la Pop Up City de Crecimiento, una comunidad global de desarrolladores y emprendedores de Web3 en colaboración con la Cámara Argentina Fintech con el objetivo de utilizar la tecnología blockchain para impulsar el desarrollo económico.",
    },
    {
      id: 7,
      image: "/media/media1.png",
      date: "23 MAYO",
      name: "WLA PROMINENT INTERNATIONAL WOMAN LAWYER AWARD - NOMINEES",
      description: "Nuestras abogadas nominadas al premio WLA Prom.",
    },
  ]

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
      <h2 className={`sm:text-[42px] text-[2rem] font-dmSerif font-normal`}>
        Eventos
      </h2>
      <p className="text-center max-w-2xl mx-auto">
        Participamos activamente en conferencias y seminarios clave,
        compartiendo nuestro conocimiento y fortaleciendo nuestra red.
      </p>
      <div className="flex items-center justify-center">
        <Carousel className="flex-1 justify-center items-center">
          <CarouselContent>
            {events.map((event) => (
              <CarouselItem
                key={event.id}
                className="flex items-center justify-center"
              >
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.name}
                    width={400}
                    height={400}
                    className=""
                  />
                  <main className="flex-1 flex justify-start items-start text-start flex-col space-y-3">
                    <small className="text-xs mt-3">
                      <span className="text-fg-secondary font-poppins">
                        Tipo de evento
                      </span>{" "}
                      / {event.date}
                    </small>
                    <h4 className="max-w-5xl text-fg-primary font-medium text-xl">
                      {event.name}
                    </h4>
                    <p className="max-w-5xl text-sm font-thin">
                      {event.description}
                    </p>
                    <button className="bg-action-bg text-action-fg hover:bg-action-bg-hover active:bg-action-bg-active motion-safe:transition-colors text-sm w-36 h-10 rounded-md">
                      Ver más
                    </button>
                  </main>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
