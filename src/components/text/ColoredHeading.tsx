interface Props {
    title: string,
    notCentered?: boolean,
    poppins?: boolean,
}

const ColoredHeading = ({title, notCentered, poppins}: Props) => {
    return (
        <div className="relative">
            <div className={`relative font-bold text-transparent bg-no-repeat animate-moveBg text-wipe-brand bg-clip-text flex z-30 flex-col gap-5 max-w-176 ${notCentered ? 'md:text-left text-center' : 'text-center'}`}>
                <h2 className={`sm:text-[42px] text-[2rem] ${!poppins ? 'font-dmSerif font-normal' : 'font-poppins font-medium'}`}>{title}</h2>
            </div>
        </div>
    );
};

export default ColoredHeading;