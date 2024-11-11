import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate()
    return (
        <header>
            <img 
                src={require('../../assets/openroom-logo-lg.png')} 
                alt="openroom official logo" 
                className="w-36 cursor-pointer" 
                onClick={()=>navigate('/dashboard')}
            />
        </header>
    )
}