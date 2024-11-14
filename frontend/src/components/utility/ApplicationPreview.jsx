import React from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicationPreview(props){
    const navigate = useNavigate()
    return (
        <a className="cursor-pointer" onClick={()=>navigate(`./view-application/${props.id}`)}>
            <article className="my-5 py-4 px-8 rounded-lg border bg-white font-opensans hover:bg-light-grey">
                <div className="flex my-3">
                    <p className="font-bold ml-0 mr-auto">
                        Full Name:
                        <span className="font-normal ml-2">
                        {
                            props.firstname || props.middlename || props.lastname
                                ? `${props.firstname || ""} ${props.middlename || ""} ${props.lastname || ""}`.trim() || "not given"
                                : "not given"
                        }
                        </span> 
                    </p>
                    {props.submitted !== "" ?
                        <p className="rounded-xl bg-light-purple py-1.5 px-6 mr-0 ml-auto text-sm font-bold font-opensans text-white">
                            Completed
                        </p>
                    :
                        <p className="rounded-xl bg-amber-400 py-1.5 px-6 mr-0 ml-auto text-sm font-bold font-opensans">
                            In Progress
                        </p>
                    }
                </div>
                <div className="flex my-3">
                    <p className="font-bold ml-0 mr-auto">
                        Driver's License Number:
                        <span className="font-normal ml-2">
                            {props.licenseNumber !== "" ? props.licenseNumber : "not given"}
                        </span>
                    </p>
                    <p className="font-bold ml-auto mr-0">
                        {props.submitted.length > 1 ? 'Submitted:' : 'Started:'}
                        <span className="font-normal ml-2">
                            {props.submitted !=="" ? props.submitted : props.started}
                        </span>
                    </p>
                </div>
            </article>
        </a>
    )
}