import React, { useState, useEffect, Suspense } from "react";
import Header from "../utility/Header";
import Footer from "../utility/Footer";
import MainButton from "../utility/MainButton";
import ApplicationPreview from "../utility/ApplicationPreview";
import axios from "axios";

// Lazy-load the LoadingAnimation component
const LoadingAnimation = React.lazy(() => import("../utility/LoadingAnimation"));

export default function Landing() {
    const [savedApplications, setSavedApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Openroom - Dashboard";

        // Start loading when making the API request
        axios.get('http://127.0.0.1:8000/dashboard', { withCredentials: true })
            .then(response => {
                setSavedApplications(response.data);
            })
            .catch(error => {
                console.error("Error retrieving applications", error);
            })
            .finally(() => {
                // Stop loading once data is fetched
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-14 mb-6 flex">
                <h1 className="font-opensans text-2xl font-bold ml-0 mr-auto my-auto">
                    Ontario Driver's License Applications
                </h1>
                <MainButton type="new" />
            </section>

            <section className={`${savedApplications.length > 0 ? "results-section" : ""} min-h-96`}>
                {/* Conditionally render LoadingAnimation or applications */}
                <Suspense fallback={<div>Loading...</div>}>
                    {loading ? (
                        <LoadingAnimation />
                    ) : (
                        savedApplications.length > 0 ? (
                            savedApplications.map((app, index) => (
                                <div key={index}>
                                    <ApplicationPreview 
                                        id={app.id}
                                        firstname={app.firstname}
                                        middlename={app.middlename}
                                        lastname={app.lastname}
                                        licenseNumber={app.licenseNumber}
                                        started={app.started}
                                        submitted={app.submitted}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="font-opensans font-medium text-sm mx-auto text-center mt-20">
                                Saved applications will be displayed here.
                            </p>
                        )
                    )}
                </Suspense>
            </section>
            <Footer />
        </div>
    );
}
