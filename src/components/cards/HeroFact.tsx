interface Props {
   num: string,
   title: string,
}

const HeroFact = ({num, title}: Props) => {
    return (
        <div className="flex flex-col items-start">
            <h2 className="text-2xl sm:text-[2rem] font-semibold text-fg-primary">{num}</h2>
            <h3 className="text-left text-sm sm:text-[1rem] font-medium text-fg-secondary">{title}</h3>
        </div>
    );
};

export default HeroFact;
