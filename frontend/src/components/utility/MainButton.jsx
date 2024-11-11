import React from "react";

export default function MainButton(props){
    return (
        <button 
            className="new-application-btn text-center flex"
            aria-label={`navigates ${props.type ==='new'? 'to new driver license application page' : 'back to landing page'}`}
        >
        {props.type ==='new' ?
            <>
                <span className="my-auto h-min font-opensans"> New Application </span>
                <span className="text-2xl my-auto ml-3 h-min font-opensans">+</span>
            </>
            :
            <>
                <span className="text-2xl my-auto mr-4 h-min font-opensans"> ← </span>
                <span className="my-auto h-min font-opensans"> Back </span>
            </>
        }
        </button>
    )
}