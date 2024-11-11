import React from "react";
import Header from "../utility/Header";
import MainButton from "../utility/MainButton";
import Footer from "../utility/Footer";

export default function NewApplication(){
    return (
        <div className="flex flex-col font-opensans">
            <Header />
            <section className="border-b-2 border-black pb-5 mt-14 mb-8 flex">
                <h1 className="font-opensans text-2xl font-bold ml-0 mr-auto my-auto">
                    New Application
                </h1>
                <MainButton type="back"/>
            </section>
            <h2 className="text-xl font-medium text-center mx-auto">
                Start a new Ontario Driver's License Application.
            </h2>
            <p className="text-sm text-center mx-auto">
                <span className="text-red-500">*</span> indicates a required field.
            </p>
            <form className="mx-auto mt-6 w-72 lg:w-5/12 flex flex-col items-start font-opensans">
                {/* First Name */}
                <label className="my-2 font-bold" htmlFor="firstname">
                    First Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    placeholder="Enter your First Name"
                    required
                />

                {/* Middle Name */}
                <label className="my-2 font-bold" htmlFor="middlename">
                    Middle Name
                </label>
                <input
                    type="text"
                    name="middlename"
                    id="middlename"
                    className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    placeholder="Enter your Middle Name"
                />

                {/* Last Name */}
                <label className="my-2 font-bold" htmlFor="lastname">
                    Last Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    placeholder="Enter your Last Name"
                    required
                />

                {/* Driver's License Number */}
                <label className="my-2 font-bold" htmlFor="licenseNumber">
                    Ontario Driver's License Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="licenseNumber"
                    id="licenseNumber"
                    className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    placeholder="e.g. G1234-45674-67890"
                    required
                />

                <div className="rounded-2xl h-0.5 w-56 lg:w-72 bg-gray-200 mt-9 mb-5 mx-auto"></div>

                {/* Date of Birth */}
                <label className="my-2 font-bold" htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    required
                />

                {/* Sex and Height */}
                <div className="flex justify-center w-full">
                    <div className="relative flex flex-col my-2 mr-auto ml-0">
                        <label className="my-2 font-bold" htmlFor="sex">
                            Sex <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="sex"
                            id="sex"
                            required
                            className="appearance-none border p-3 w-56 pr-3 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                        >
                            <option value="" disabled selected hidden>Not specified</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="not-specified">Not Specified</option>
                        </select>
                        <span className="absolute inset-y-0 top-10 right-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </span>
                    </div>
                    <div className="flex flex-col my-2 ml-auto mr-0">
                        <label className="my-2 font-bold" htmlFor="height">
                            Height (cm) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="height"
                            id="height"
                            required
                            className="border p-3 w-56 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                            placeholder="Enter height in cm"
                        />
                    </div>
                </div>

                <div className="rounded-2xl h-0.5 w-56 lg:w-72 bg-gray-200 mt-7 mb-3 mx-auto"></div>

                {/* Address Information */}
                <div className="flex justify-center w-full">
                    <div className="flex flex-col my-2 mr-auto ml-0">
                        <label className="my-2 font-bold" htmlFor="unitNumber">
                            Unit Number
                        </label>
                        <input
                            type="number"
                            name="unitNumber"
                            id="unitNumber"
                            className="border p-3 rounded-lg w-56 cursor-pointer focus:outline-1 focus:outline-light-purple"
                            placeholder="Enter unit number"
                        />
                    </div>
                    <div className="flex flex-col my-2 ml-auto mr-0">
                        <label className="my-2 font-bold" htmlFor="streetNumber">
                            Street Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="streetNumber"
                            id="streetNumber"
                            required
                            className="border p-3 w-56 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                            placeholder="Enter street number"
                        />
                    </div>
                </div>

                {/* PO Box */}
                <label className="my-2 font-bold" htmlFor="poBox">
                    PO Box
                </label>
                <input
                    type="number"
                    name="poBox"
                    id="poBox"
                    className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    placeholder="Enter PO Box number"
                />

                {/* Street Name */}
                <label className="my-2 font-bold" htmlFor="streetName">
                    Street Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="streetName"
                    id="streetName"
                    required
                    className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    placeholder="Enter street name"
                />

                {/* City */}
                <label className="my-2 font-bold" htmlFor="city">
                    City <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    placeholder="Enter city"
                />

                <div className="flex justify-center w-full">
                    {/* Province */}
                    <div className="relative flex flex-col my-2 mr-auto ml-0">
                        <label className="my-2 font-bold" htmlFor="province">
                            Province <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="province"
                            id="province"
                            required
                            className="appearance-none border p-3 w-56 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                        >
                            {/* Province options */}
                            <option value="" disabled selected hidden>Not specified</option>
                            <option value="ontario">Ontario</option>
                            <option value="quebec">Quebec</option>
                            <option value="manitoba">Manitoba</option>
                            <option value="new-brunswick">New Brunswick</option>
                            <option value="british-columbia">British Columbia</option>
                            <option value="alberta">Alberta</option>
                            <option value="saskatchewan">Saskatchewan</option>
                            <option value="prince-edward-island">Prince Edward Island</option>
                            <option value="newfoundland-and-labrador">Newfoundland and Labrador</option>
                            <option value="northwest-territories">Northwest Territories</option>
                            <option value="yukon">Yukon</option>
                            <option value="nunavut">Nunavut</option>
                        </select>
                        <span className="absolute inset-y-0 top-10 right-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </span>
                    </div>

                    {/* Postal Code */}
                    <div className="flex flex-col my-2 ml-auto mr-0">
                        <label className="my-2 font-bold" htmlFor="postalCode">
                            Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            maxLength="7"
                            required
                            className="border p-3 w-56 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                            placeholder="e.g., A1A 1A1"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="p-3.5 w-full rounded-lg tracking-wide cursor-pointer bg-main-purple text-white font-bold mt-8 hover:bg-dark-purple"
                    aria-label="submission for driver license application form"
                >
                    Submit
                </button>
            </form>

            <Footer />
        </div>
    )
}