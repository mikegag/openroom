import React from "react";
import Header from "../Header";
import MainButton from "../utility/MainButton";
import ApplicationPreview from "../utility/ApplicationPreview";

export default function Landing(){
    return (
        <div className="flex flex-col">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-16 mb-4 flex">
                <h1 className="font-opensans text-3xl font-bold ml-0 mr-auto my-auto">
                    Ontario Driver's License Applications
                </h1>
                <MainButton type="new"/>
            </section>
            <section>
                <ApplicationPreview type='incomplete'/>
            </section>
        </div>
    )
}