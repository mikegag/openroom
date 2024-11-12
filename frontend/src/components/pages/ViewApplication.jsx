import React from "react";
import { useEffect } from "react";
import Header from "../utility/Header";
import MainButton from "../utility/MainButton";
import ApplicationDetails from "../utility/ApplicationDetails";
import Footer from "../utility/Footer";

export default function ViewApplication(){
    useEffect(() => {
        document.title = "Openroom - View Application"
    }, [])

    return (
        <div className="flex flex-col">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-14 mb-6 flex">
                <h1 className="font-opensans text-2xl font-bold ml-0 mr-auto my-auto">
                    View Application
                </h1>
                <MainButton type="back"/>
            </section>
            <ApplicationDetails 
                firstname="john"
                middlename=""
                lastname="doe"
                submitted="11/11/23"
                started="11/11/23"
                licenseNumber="A1234567"
                dob="1990-05-15"
                sex="Male"
                height="6'0"
                poBox=""
                unitNumber=""
                streetNumber="456"
                streetName="Main Street"
                city="Toronto"
                province="Ontario"
                postalCode="M5A 1A1"
            />
            <Footer />
        </div>
    )
}