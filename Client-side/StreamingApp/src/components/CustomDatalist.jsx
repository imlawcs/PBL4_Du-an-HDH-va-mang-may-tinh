import { useEffect } from "react";
import CategoryComp from "./CategoryComp";

export default function CustomDatalist(props) {
    useEffect(() => {
        console.log(props.inputValue);
    }, [])
    return(
        <>
            <div id={props.id} 
            datalist="true"
            role="listbox" 
            className="rr__flex-col" 
            style={{
                border: "2px solid #434C4E",
                backgroundColor: "#3E4547",
                listStyleType: "none",
                display: "none",
                borderTopColor: "#47FFD3",
                borderBottomRightRadius: "0.5em",
                borderBottomLeftRadius: "0.5em",
                // rowGap: "1em",
                // zIndex: 1000,
                zIndex: 1000,
                ...props.styles,
            }}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            >
                {
                props.type === "category"?
                props.data
                .filter((item) => item.categoryName.toLowerCase().includes(props.inputValue.toLowerCase()))
                .slice(0, 5)
                .map((item, index) => (
                    
                        <CategoryComp
                            key={index}
                            categoryName={item.categoryName}
                            categoryId={item.categoryId}
                            type="datalist"
                            onClick={() => props.onClick(item.categoryName, item.categoryId)}
                        />
                    
                ))
                :
                props.data
                    .filter((item) => item.tagName.toLowerCase().includes(props.inputValue.toLowerCase()))
                    .slice(0, 5)
                    .map((item, index) => (
                        
                            <CategoryComp
                                key={index}
                                categoryName={item.tagName}
                                categoryId={item.tagId}
                                type="datalist"
                                onClick={() => props.onClick(item.tagName, item.tagId)}
                            />
                        
                ))
                }
            </div>
        </>
    )
    
}