import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Header from "../utility/Header";
import MainButton from "../utility/MainButton";
import NewApplicationForm from "../utility/NewApplicationForm";
import Footer from "../utility/Footer";

export default function NewApplication(){
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Prop passed to ApplicationForm child to confirm submission
    function handleSubmit(data){
        setIsSubmitting(true);
        axios.post('/dashboard/new-application/', data)
            // Successfully submitted form
            .then(response => {
                setIsSubmitted(true)
            })
            // Error occurred during submission
            .catch(error => {
                console.error("Form submission error", error);
            });
    }

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
            {isSubmitting ? 
                (isSubmitted ?
                    <div className="min-h-96 text-center">
                        <p className="mt-20 p-4 rounded-xl text-green-700 text-xl mx-auto font-bold">
                            Application Saved Successfully!
                        </p>
                    </div>
                    :
                    <div className="min-h-96 text-center">
                        <p className="mt-20 p-4 rounded-xl text-red-600 text-xl mx-auto font-bold">
                            Error! Please reload the page or try again.
                        </p>
                    </div>
                )
            :
                <>
                    <h2 className="text-xl font-medium text-center mx-auto">
                        Start a new Ontario Driver's License Application.
                    </h2>
                    <p className="text-sm text-center mx-auto">
                        <span className="text-red-500">*</span> indicates a required field.
                    </p>
                    <NewApplicationForm onSubmit={handleSubmit}/>
                </>
            }
            <Footer />
        </div>
    )
}