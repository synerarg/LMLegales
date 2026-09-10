import Image from "next/image";
import arrow from "../../../public/icons/arrow-right.svg";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Props {
    icon: string,
    title: string,
    redirect: string,
    tBorder?: boolean,
    bBorder?: boolean,
    rBorder?: boolean,
    lBorder?: boolean,
}

const ServiceCard = ({title, icon, redirect, tBorder, bBorder, lBorder, rBorder}: Props) => {
    const t = useTranslations('ServiceLand');
    return (
        <Link href={redirect}>
            <div className={`sm:w-[23.8rem] w-[20rem] sm:h-[17.6rem] h-fit p-4 sm:py-4 py-6 bg-transparent text-fg-primary border-border-strong flex flex-col sm:gap-8 gap-4 group hover:cursor-pointer ${tBorder && 'service:border-t'} ${bBorder ? 'border-b' : 'border-b service:border-b-0'} ${rBorder && 'service:border-r'} ${lBorder && 'service:border-l'}`}>
                <div className="flex flex-col gap-6 w-76">
                    <Image src={icon} alt={title} className="duration-150 group-hover:rotate-12 sm:w-fit w-10"></Image>
                    <h2 className="sm:text-[1.5rem] text-[1.25rem]">{title}</h2>
                </div>
                <div className="flex items-center gap-1 group-hover:gap-3 duration-150">
                    <h3 className="sm:text-base text-sm text-fg-secondary group-hover:underline">{t('learn')}</h3>
                    <Image src={arrow} alt="arrow icon"></Image>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;
