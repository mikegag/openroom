import React from "react";
import Header from "../Header";
import MainButton from "../utility/MainButton";
import Footer from "../Footer";

export default function ViewApplication(){
    return (
        <div className="flex flex-col">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-16 mb-6 flex">
                <h1 className="font-opensans text-3xl font-bold ml-0 mr-auto my-auto">
                    View Application
                </h1>
                <MainButton type="back"/>
            </section>
            
            <Footer />
        </div>
    )
}