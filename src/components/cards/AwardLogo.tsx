import Image, { StaticImageData } from "next/image";

interface Props {
    src: StaticImageData,
}

const AwardLogo = ({src}: Props) => {
    return (
        <div className="w-40 h-24 sm:mx-8 mx-4 flex items-center justify-center">
            <Image src={src} alt="award" className="h-auto w-auto max-h-20 max-w-40"></Image>
        </div>
    );
};

export default AwardLogo;