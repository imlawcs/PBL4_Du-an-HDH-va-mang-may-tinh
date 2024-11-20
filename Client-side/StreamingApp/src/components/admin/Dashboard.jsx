export default function DashBoard(){
    const defaultHeight = "10em";
    const renderSampleDiv = (heightValue, flexData) => {
        return (
            <div className="rr__bg-secondary fill__container" style={{height: heightValue? heightValue : defaultHeight, flex: flexData && flexData}}></div>
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
                    {renderSampleDiv()}
                    {renderSampleDiv()}
                    {renderSampleDiv()}
                </div>
            </div>
        </>
    )
}