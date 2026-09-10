import ServiceCard from "@/components/cards/ServiceCard";
import Heading from "@/components/text/Heading";
import serviceData from "@/utils/service-data";
import serviceDataEng from "@/utils/service-data-eng";

import {useTranslations, useLocale} from 'next-intl';

const Services = () => {

    const t = useTranslations("ServiceLand");

    return (
        <div className="flex flex-col items-center justify-center gap-20 pt-20 mb-24 2xl:px-44 lg:px-28 px-5 dark:text-fg-primary">
            <Heading title={t("title")} subtitle={t("subtitle")}></Heading>
            <div className="flex flex-wrap justify-center max-w-7xl">
                {useLocale() === "es" ?
                serviceData.map((object, index) => (
                    <ServiceCard 
                        key={index}
                        title={object.title}
                        icon={object.icon}
                        redirect={'/es' + object.redirect}
                        tBorder={object.tBorder}
                        bBorder={object.bBorder}
                        lBorder={object.lBorder}
                        rBorder={object.rBorder}
                />)) :
                serviceDataEng.map((object, index) => (
                    <ServiceCard 
                        key={index}
                        title={object.title}
                        icon={object.icon}
                        redirect={'/en' + object.redirect}
                        tBorder={object.tBorder}
                        bBorder={object.bBorder}
                        lBorder={object.lBorder}
                        rBorder={object.rBorder}
                    />))
                }
            </div>
        </div>
    );
};

export default Services;