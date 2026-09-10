const MapSection = () => {
    return (
        <div className="main-padding mb-24 flex flex-col gap-9">
            <span className="w-full h-px bg-border-hairline"></span>
            <div className="flex sm:flex-row flex-col gap-8 justify-between items-center">
                <div className="3xl:w-96 w-76 3xl:h-96 h-76">
                    <iframe width="100%" height="100%" loading="lazy" src="https://maps.google.com/maps?width=100%25&amp;height=100%&amp;hl=en&amp;q=Libertador%205990,%20Ciudad%20Aut%C3%B3noma%20de%20Buenos%20Aires+(LML%20Legales)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
                <div className="3xl:w-96 w-76 3xl:h-96 h-76">
                    <iframe width="100%" height="100%" loading="lazy" src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=San%20Luis%202198,%20Posadas,%20provincia%20de%20Misiones+(LML%20Legales)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
                <div className="3xl:w-96 w-76 3xl:h-96 h-76">
                    <iframe width="100%" height="100%" loading="lazy" src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=833%20Edinburgh,%20Los%20%C3%81ngeles,%20CA+(LML%20Legales)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
            </div>
        </div>
    );
};

export default MapSection;