import Nav from "@/components/Nav";
import ServiceBody from "@/components/sections/servicios/ServiceBody";
import ServiceHero from "@/components/sections/servicios/ServiceHero";

import { generalData, generalDataEng } from "@/utils/servicePages-data";
import { useLocale, useTranslations } from "next-intl";

export default function General() {
    const tNav = useTranslations('Nav');
    const t = useTranslations('ServiceGeneral');

    const heroData = {
        title: t('title'),
        subtitle: t('subtitle'),
    }

    return (
        <>
            <div className="absolute -top-16 bg-no-repeat bg-center bg-[url('/assets/generalBg.png')] w-full h-[124vh] -z-50">
                <div className="w-full absolute bottom-0 h-12 bg-linear-to-t from-surface-page"></div>
            </div>
            <Nav white={true} locale={useLocale()} tInicio={tNav("inicio")} tAbout={tNav("sobreNos")} tContacto={tNav("contacto")} tServicios={tNav("servicios")}></Nav>
            <div className="z-10">
                <ServiceHero title={heroData.title} subtitle={heroData.subtitle}></ServiceHero>
                <ServiceBody data={useLocale() === 'es' ? generalData : generalDataEng}/>
            </div>
        </>
    );
};