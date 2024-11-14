import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainButton(props){
    const navigate = useNavigate()
    return (
        <button 
            className="new-application-btn text-center flex"
            aria-label={`navigates ${props.type ==='new'? 'to new driver license application page' : 'back to landing page'}`}
            onClick={()=>navigate(`${props.type ==='new'? "./new-application":"/dashboard"}`)}
        >
        {props.type ==='new' ?
            <>
                <span className="my-auto h-min font-opensans"> New Application </span>
                <span className="text-xl md:text-2xl my-auto ml-3 h-min font-opensans">+</span>
            </>
            :
            <>
                <span className="text-xl md:text-2xl my-auto mr-3 h-min font-opensans"> ← </span>
                <span className="my-auto h-min font-opensans"> Back </span>
            </>
        }
        </button>
    )
}