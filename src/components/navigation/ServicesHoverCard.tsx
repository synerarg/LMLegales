import Link from "next/link";
import serviceData from "@/utils/service-data";
import serviceDataEng from "@/utils/service-data-eng";
import { useLocale } from "next-intl";

const ServicesHoverCard = () => {
    return (
        <>
            { useLocale() === "es" ?
                serviceData.map((service, index) => (
                    <Link href={"/es" + service.redirect} key={index}>
                        <h3 
                            className="text-base duration-200 font-medium whitespace-nowrap text-fg-secondary hover:text-fg-primary hover:underline transition-all">
                            {service.title}
                        </h3>
                    </Link> 
                ))
                :
                serviceDataEng.map((service, index) => (
                    <Link href={"/en" +service.redirect} key={index}>
                        <h3 
                            className="text-base duration-200 font-medium whitespace-nowrap text-fg-secondary hover:text-fg-primary hover:underline transition-all">
                            {service.title}
                        </h3>
                    </Link> 
                ))
            }
        </>
    );
};

export default ServicesHoverCard;