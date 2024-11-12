import React from "react";
import { useEffect } from "react";
import Header from "../utility/Header";
import MainButton from "../utility/MainButton";
import NewApplicationForm from "../utility/NewApplicationForm";
import Footer from "../utility/Footer";

export default function NewApplication(){
    useEffect(() => {
        document.title = "Openroom - New Application"
    }, [])

    return (
        <div className="flex flex-col font-opensans">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-14 mb-8 flex">
                <h1 className="font-opensans text-2xl font-bold ml-0 mr-auto my-auto">
                    New Application
                </h1>
                <MainButton type="back"/>
            </section>
            <h2 className="text-xl font-medium text-center mx-auto">
                Start a new Ontario Driver's License Application.
            </h2>
            <p className="text-sm text-center mx-auto">
                <span className="text-red-500">*</span> indicates a required field.
            </p>
            
            <NewApplicationForm />
            <Footer />
        </div>
    )
}