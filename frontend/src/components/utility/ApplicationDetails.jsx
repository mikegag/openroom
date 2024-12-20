import React from "react";
import Data from "../../data.json";

export default function ApplicationDetails(props){
    const dataSchema = Data;
    return (
        <section className="mt-6 bg-light-grey rounded-lg w-full p-8 text-sm lg:text-base">
            <div className="flex">
                <p className="ml-0 mr-auto my-auto font-bold">
                    Submitted: 
                    <span className="font-normal ml-2">{props.submitted}</span>
                </p>
                <p className="ml-auto mr-0 my-auto rounded-2xl bg-light-purple px-4 py-1 text-sm font-semibold tracking-wide text-white">
                    Completed
                </p>
            </div>

            <div className="flex flex-wrap mt-10 lg:mt-20">
                {Object.entries(dataSchema.ApplicationDetails).map(([sectionName, section]) => (
                    <div key={sectionName} className="flex flex-col justify-start items-start pr-11 lg:pr-6 mr-auto">
                        {section.map((item) => (
                            <p className="text-sm lg:text-base font-bold my-2" key={item.label}>
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
    );
}