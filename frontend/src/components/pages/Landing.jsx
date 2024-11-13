import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../utility/Header";
import Footer from "../utility/Footer";
import MainButton from "../utility/MainButton";
import ApplicationPreview from "../utility/ApplicationPreview";
import axios from "axios";

export default function Landing(){
    const [savedApplications, setSavedApplications] = useState([])
    useEffect(() => {
        document.title = "Openroom - Dashboard"

        axios.get('http://127.0.0.1:8000/dashboard/', {
            withCredentials: true
        })
            .then(response=>{
                setSavedApplications(response.data)
            })
            // Error occurred during submission
            .catch(error => {
                console.error("Error retrieving applications", error);
            });
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
                {savedApplications.length > 0 ?
                    savedApplications.map((app,index)=>(
                        <div key={index}>
                            <ApplicationPreview 
                                firstname={app.firstname}
                                middelname={app.middelname}
                                lastname={app.lastname}
                                licenseNumber={app.licenseNumber}
                                id={app.id}
                                started={app.started}
                                submitted={app.submitted}
                            />
                        </div>
                    ))
                :
                    <p className="font-opensans font-medium text-sm mx-auto text-center mt-20">
                        Saved applications will be displayed here.
                    </p>
                }
            </section>
            <Footer />
        </div>
    )
}