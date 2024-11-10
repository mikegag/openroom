import React from "react";

export default function Header(){
    return (
        <header>
            <img 
                src={require('../assets/openroom-logo-lg.png')} 
                alt="openroom official logo" 
                className="h-7 border-2" 
            />
            <p className="text-amber-300">ddd</p>
        </header>
    )
}