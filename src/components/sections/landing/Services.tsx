import serviceData from "@/utils/service-data";
import serviceDataEng from "@/utils/service-data-eng";
import Image from "next/image";
import Link from "next/link";

import {useTranslations, useLocale} from 'next-intl';

// Estructura tomada de la seccion de practicas de imk.ca: titulo grande, una columna angosta con la
// bajada y la lista en dos columnas de filas con linea fina. Donde IMK pone una flecha va el icono del servicio.
// A diferencia de IMK, el titulo arranca en el borde izquierdo (pedido del cliente), no alineado con la lista.
const Services = () => {

    const t = useTranslations("ServiceLand");
    const locale = useLocale();
    const services = locale === "es" ? serviceData : serviceDataEng;

    // Dos columnas: la primera se lleva la fila de mas cuando la cantidad es impar.
    const half = Math.ceil(services.length / 2);
    const columns = [services.slice(0, half), services.slice(half)];

    return (
        <section className="main-padding py-20 lg:py-28 text-fg-primary">
            <div className="grid gap-x-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_minmax(0,2.4fr)]">
                <h2 className="lg:col-span-3 font-dmSerif font-normal text-[2.25rem] sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
                    {t("title")}
                </h2>

                <div className="mt-8 lg:mt-20 lg:col-start-1 lg:row-start-2 lg:border-t lg:border-border-control/40 lg:pt-10">
                    <p className="text-base lg:text-[0.95rem] leading-relaxed max-w-xl">{t("subtitle")}</p>
                </div>

                {columns.map((column, columnIndex) => (
                    <ul
                        key={columnIndex}
                        className={`lg:row-start-2 lg:mt-20 lg:self-start border-border-control/40 ${
                            columnIndex === 0 ? "mt-12 lg:border-b" : "border-b"
                        }`}
                    >
                        {column.map((service) => (
                            <li key={service.redirect} className="border-t border-border-control/40">
                                <Link
                                    href={'/' + locale + service.redirect}
                                    className="group grid grid-cols-[3.25rem_minmax(0,1fr)] lg:grid-cols-[4.75rem_minmax(0,1fr)] items-center min-h-24 lg:min-h-[6.5rem] py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                                >
                                    <Image
                                        src={service.icon}
                                        alt=""
                                        aria-hidden="true"
                                        className="w-7 h-7 ml-1 lg:ml-3 motion-safe:transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                    <span className="text-xl lg:text-[1.45rem] leading-snug motion-safe:transition-colors duration-200 group-hover:text-fg-muted">
                                        {service.title}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </section>
    );
};

export default Services;
