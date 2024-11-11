import React from "react";
import ApplicationDetailsData from "../../../data.json";

export default function ApplicationDetails(props){
    const dataSchema = ApplicationDetailsData.ApplicationDetails
    return (
        <section className="mt-6 bg-light-grey rounded-lg w-full p-4">
            <div className="flex">
                <p className="ml-0 mr-auto">
                    Submitted: {props.datesubmitted}
                </p>
                <p className="ml-auto mr-0 rounded-xl bg-light-purple px-6 py-2 text-sm font-bold">
                    Completed
                </p>
            </div>

            <div className="flex flex-wrap justify-start mt-10">
                {Object.entries(dataSchema.ApplicationDetails).map(([sectionName, section]) => (
                    <div key={sectionName} className="flex flex-col items-start">
                        {section.map((item) => (
                            <p className="font-bold" key={item.label}>
                                {item.label + ": "}
                                <span className="ml-1 font-normal">
                                    {item.fields.map((field) => (
                                        <span key={field} className="ml-1">{props[field]}</span>
                                    ))}
                                </span>
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}