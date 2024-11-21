export default function DashBoard(){
    const defaultHeight = "10em";
    const getRandomColorHex = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const renderSampleDiv = (heightValue, flexData) => {
        return (
            <div className="fill__container" 
            style={{
                height: heightValue? heightValue : defaultHeight, 
                flex: flexData && flexData,
                backgroundColor: getRandomColorHex(),
            }}></div>
        )
    }
    return (
        <>
            <h1 className="league-spartan-bold citizenship fill__container ta__center">
                Dashboard
            </h1>
            <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb">
                {renderSampleDiv()}
                {renderSampleDiv()}
                {renderSampleDiv()}
            </div>
            <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb">
                {renderSampleDiv("20em")}
                {renderSampleDiv("20em")}
                {renderSampleDiv("20em")}
                {renderSampleDiv("20em")}
            </div>
            <div className="rr__flex-row rrf__col-small def-pad-1 no__padding-tb">
                {renderSampleDiv("20em", 6)}
                <div className="rr__flex-col rrf__row-small fill__container fill__y" style={{
                    flex: 7,
                }}>
                    {renderSampleDiv("auto", 1)}
                    {renderSampleDiv("auto", 1)}
                    {renderSampleDiv("auto", 1)}
                </div>
            </div>
        </>
    )
}