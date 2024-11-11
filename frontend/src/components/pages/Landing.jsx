import React from "react";
import Header from "../Header";

export default function Landing(){
    return (
        <div>
            <Header />
            <div className="border-b-2 border-black pb-5 mt-16 flex">
                <h1 className="font-opensans text-3xl font-bold ml-0 mr-auto my-auto">
                    Ontario Driver's License Applications
                </h1>
                <button 
                    className="new-application-btn text-center flex"
                >
                    <span className="my-auto h-min">
                        New Application 
                    </span>
                    <span className="text-2xl my-auto ml-4 h-min">
                        +
                    </span>
                </button>
            </div>
        </div>
    )
}