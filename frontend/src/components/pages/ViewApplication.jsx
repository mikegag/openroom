import React from "react";
import axios from "axios";
import { useEffect, useState, Suspense} from "react";
import { useParams } from "react-router-dom";
import Header from "../utility/Header";
import MainButton from "../utility/MainButton";
import ApplicationDetails from "../utility/ApplicationDetails";
import NewApplicationForm from "../utility/NewApplicationForm";
import Footer from "../utility/Footer";

// Lazy-load the LoadingAnimation component
const LoadingAnimation = React.lazy(() => import("../utility/LoadingAnimation"));

export default function ViewApplication(){
    // Application id taken from url
    const { id } = useParams();
    const [applicationDetails, setApplicationDetails] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(true);

    useEffect(() => {
        document.title = "Openroom - View Application"
    }, []);

    // Prop passed to ApplicationForm child to confirm submission
    function handleSubmit(data){
        setTimeout(() => {
            setIsSubmitting(true);
        }, 500);
        // Include `id` if available to update existing application, otherwise leave it out
        const applicationData = {
            ...data,
            id: parseInt(id) || null 
        };
        axios.post('http://127.0.0.1:8000/dashboard/new-application', 
            applicationData, 
            {withCredentials: true}
        )
            // Successfully submitted form
            .then(response => {
                setIsSubmitted(true);
            })
            // Error occurred during submission
            .catch(error => {
                console.error("Form submission error", error);
            });
    }

    // Fetch application details using the applicationId from the URL
    useEffect(() => {
        if (id) {
          axios.get(`http://127.0.0.1:8000/dashboard/view-application/${id}`)
            .then(response => {
                setApplicationDetails(response.data);
            })
            .catch(error => {
                console.error('error retrieving application', error);
            })
            .finally(() => {
                // Stop loading once data is fetched
                setTimeout(() => {
                    setLoadingDetails(false);
                }, 500);
            });
        }
      }, [id]);

    return (
        <div className="flex flex-col">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-14 mb-6 flex">
                <h1 className="main-title">
                    {applicationDetails && applicationDetails.submitted ? "View Application" : "Edit Application"}
                </h1>
                <MainButton type="back"/>
            </section>
            {/* Conditionally render loading animation or main content */}
            <Suspense fallback={<div>Loading...</div>}>
                {loadingDetails ? 
                    (
                        <LoadingAnimation />
                    ) 
                : 
                    isSubmitting ? (
                        isSubmitted ? 
                            (
                                <div className="min-h-96 text-center">
                                    <p className="mt-20 p-4 rounded-xl text-green-700 text-xl mx-auto font-bold">
                                        Application Saved Successfully!
                                    </p>
                                </div>
                            ) 
                            : 
                            (
                                <div className="min-h-96 text-center">
                                    <p className="mt-20 p-4 rounded-xl text-red-600 text-xl mx-auto font-bold">
                                        Error! Please reload the page or try again.
                                    </p>
                                </div>
                            )
                        ) 
                    : 
                        (
                        <>
                            {applicationDetails && applicationDetails.submitted !=="" ? (
                                <ApplicationDetails
                                    id={applicationDetails.id}
                                    firstname={applicationDetails.firstname}
                                    middlename={applicationDetails.middlename}
                                    lastname={applicationDetails.lastname}
                                    submitted={applicationDetails.submitted}
                                    licenseNumber={applicationDetails.licenseNumber}
                                    dob={applicationDetails.dob}
                                    sex={applicationDetails.sex}
                                    height={applicationDetails.height}
                                    poBox={applicationDetails.poBox}
                                    unitNumber={applicationDetails.unitNumber}
                                    streetNumber={applicationDetails.streetNumber}
                                    streetName={applicationDetails.streetName}
                                    city={applicationDetails.city}
                                    province={applicationDetails.province}
                                    postalCode={applicationDetails.postalCode}
                                />
                            ) : (
                                <>
                                    <h2 className="text-xl font-medium text-center mx-auto">
                                        We've saved your application progress.
                                    </h2>
                                    <p className="text-sm text-center mx-auto">
                                        <span className="text-red-500">*</span> indicates a required field.
                                    </p>
                                    <NewApplicationForm onSubmit={handleSubmit} savedData={applicationDetails} />
                                </>
                            )}
                            </>
                        )
                }
            </Suspense>
            
            <Footer />
        </div>
    )
}