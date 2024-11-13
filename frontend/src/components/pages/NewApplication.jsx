import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Header from "../utility/Header";
import MainButton from "../utility/MainButton";
import NewApplicationForm from "../utility/NewApplicationForm";
import Footer from "../utility/Footer";

// Lazy-load the LoadingAnimation component
const LoadingAnimation = React.lazy(() => import("../utility/LoadingAnimation"));

export default function NewApplication() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingConfirmation, setLoadingConfirmation] = useState(true);

    useEffect(() => {
        document.title = "Openroom - New Application";
    }, []);

    // Prop passed to ApplicationForm child to confirm submission
    function handleSubmit(data) {
        setIsSubmitting(true);
        axios.post('http://127.0.0.1:8000/dashboard/new-application', data)
            .then(response => {
                setIsSubmitted(true);
                setLoadingConfirmation(false);
            })
            .catch(error => {
                console.error("Form submission error", error);
            });
    }

    // Save partially filled forms
    function saveProgress() {
        // Get form data from localStorage
        const savedData = localStorage.getItem("formData");
      
        if (savedData) {
          // Parse the stored JSON string into an object
          const data = JSON.parse(savedData);
      
          // Trigger API to save in-progress form attempts
          axios
            .post('http://127.0.0.1:8000/dashboard/partial-application', data, { withCredentials: true })
            .then(response => {})
            .catch(error => {
              // Handle error during submission
              console.error('Form submission error:', error);
            });
        } else {
          console.log('No form data found in localStorage.');
        }
      }
    

    return (
        <div className="flex flex-col font-opensans">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-14 mb-8 flex">
                <h1 className="font-opensans text-2xl font-bold ml-0 mr-auto my-auto">
                    New Application
                </h1>
                <MainButton type="back" />
                {!isSubmitting ? 
                    <button className="new-application-btn ml-2" onClick={saveProgress}>Save </button>
                : 
                    <></>
                }
            </section>
            
            {isSubmitting ? (
                <Suspense fallback={<div>Loading...</div>}>
                    {loadingConfirmation ? (
                        <LoadingAnimation />
                    ) : (
                        isSubmitted ? (
                            <div className="min-h-96 text-center">
                                <p className="mt-20 p-4 rounded-xl text-green-700 text-xl mx-auto font-bold">
                                    Application Saved Successfully!
                                </p>
                            </div>
                        ) : (
                            <div className="min-h-96 text-center">
                                <p className="mt-20 p-4 rounded-xl text-red-600 text-xl mx-auto font-bold">
                                    Error! Please reload the page or try again.
                                </p>
                            </div>
                        )
                    )}
                </Suspense>
            ) : (
                <>
                    <h2 className="text-xl font-medium text-center mx-auto">
                        Start a new Ontario Driver's License Application.
                    </h2>
                    <p className="text-sm text-center mx-auto">
                        <span className="text-red-500">*</span> indicates a required field.
                    </p>
                    <NewApplicationForm onSubmit={handleSubmit} />
                </>
            )}
            <Footer />
        </div>
    );
}
