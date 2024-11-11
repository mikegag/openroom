import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import MainButton from "../utility/MainButton";
import ApplicationPreview from "../utility/ApplicationPreview";

export default function Landing(){
    return (
        <div className="flex flex-col">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-16 mb-6 flex">
                <h1 className="font-opensans text-3xl font-bold ml-0 mr-auto my-auto">
                    Ontario Driver's License Applications
                </h1>
                <MainButton type="new"/>
            </section>
            {/* results section only applies when a child is present else 'no applications to display' */}
            <section className="results-section">
                <ApplicationPreview type='completed' />
            </section>
            <Footer />
        </div>
    )
}