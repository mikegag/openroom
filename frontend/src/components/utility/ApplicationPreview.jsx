import React from "react";

export default function ApplicationPreview(props){
    return (
        <a className="my-2 cursor-pointer">
            <article className="py-4 px-8 rounded-lg border bg-white font-opensans hover:bg-light-grey">
                <div className="flex my-3">
                    <p className="font-bold ml-0 mr-auto">
                        Full Name:
                        <span className="font-normal ml-2">
                            John Doe
                        </span>
                    </p>
                    {props.type === 'completed' ?
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
                            D1234 - 56789 - 11123
                        </span>
                    </p>
                    <p className="font-bold ml-auto mr-0">
                        {props.type === 'completed' ? 'Submitted:' : 'Started:'}
                        <span className="font-normal ml-2">
                            04/11/24
                        </span>
                    </p>
                </div>
            </article>
        </a>
    )
}