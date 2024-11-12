import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../utility/Header";
import Footer from "../utility/Footer";
import MainButton from "../utility/MainButton";
import ApplicationPreview from "../utility/ApplicationPreview";

export default function Landing(){
    const [savedApplications, setSavedApplications] = useState([])
    useEffect(() => {
        document.title = "Openroom - Dashboard"

        //axios call to load saved applications
    }, [])

    return (
        <div className="flex flex-col">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-14 mb-6 flex">
                <h1 className="font-opensans text-2xl font-bold ml-0 mr-auto my-auto">
                    Ontario Driver's License Applications
                </h1>
                <MainButton type="new"/>
            </section>

            <section className={`${savedApplications.length > 0 ? "results-section": ""} min-h-96`}>
                {/* <ApplicationPreview type='completed' /> */}
                <p className="font-opensans font-medium text-sm mx-auto text-center mt-20">Saved applications will be displayed here.</p>
            </section>
            <Footer />
        </div>
    )
}