interface Props {
   num: string,
   title: string, 
}

const HeroFact = ({num, title}: Props) => {
    return (
        <div className="flex flex-col items-center w-40 h-28">
            <h2 className="text-[2rem] font-semibold text-fg-primary">{num}</h2>
            <h3 className="text-center text-[1rem] font-medium text-fg-secondary">{title}</h3>
        </div>
    );
};

export default HeroFact;