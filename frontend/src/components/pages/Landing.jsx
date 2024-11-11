import React from "react";
import Header from "../Header";

export default function Landing(){
    return (
        <div>
            <Header />
            <div className="border-b-2 border-black pb-5 mt-20 flex">
                <h1 className="font-opensans text-2xl font-bold ml-0 mr-auto">
                    Ontario Driver's License Applications
                </h1>
                <button 
                    className="new-application-btn"
                >
                    New Application +
                </button>
            </div>
        </div>
    )
}