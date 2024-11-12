import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetCurrentDate from "./GetCurrentDate";

export default function NewApplicationForm(props){
    const navigate = useNavigate();
    // Holds state for license number, used for validation checking
    const [licenseNumber, setLicenseNumber] = useState('');
    // Holds state for form data, initialized with empty fields
    const [formData, setFormData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        licenseNumber: "",
        dob: "",
        sex: "",
        height: "",
        unitNumber: "",
        streetNumber: "",
        poBox: "",
        streetName: "",
        city: "",
        province: "",
        postalCode: "",
        started: GetCurrentDate(),
        submitted: ""
    });

    // Trigger API to save in-progress form attempts only if data exists
    function handleNavigation(data) {
        if (Object.keys(data).length > 0) {
            axios.post('/dashboard/new-application/', data)
                .then(response => {
                })
                .catch(error => {
                    // Error occurred during submission
                    console.error('Form submission error', error);
                });
        }
    }

    // Listen for navigation changes
    useEffect(() => {
        // Validate formData before submission
        const validatedData = validateFormData(formData);

        // Listen for specific navigation event
        const unlisten = navigate((location, action) => {
            if (action === 'PUSH' || action === 'POP') {
                // Handle page navigation (when user moves away)
                handleNavigation(validatedData);
            }
        });
        // Cleanup the navigation listener when the component unmounts
        return () => {
            // Unsubscribe from navigation events
            unlisten();
        }
    }, [formData, navigate])

    // Update license number input to check for desired length
    function handleLicenseNumberChange(e){
        setLicenseNumber(e.target.value);
    }

    // Define dynamic maxLength and minLength based on input
    let maxLength = !licenseNumber.includes('-') && licenseNumber.length < 15 ? 15 : 17;
    let minLength = licenseNumber.includes('-') && licenseNumber.length >= 16 ? 17 : 15;

    // Update form data on each input change
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    // Trim whitespace and Uppercase for each text input
    function validateFormData(data) {
        const sanitizedData = { ...data };
        for (const key in sanitizedData) {
            if (key === 'licenseNumber') {
                // Base Case: User did not include '-', form ensures minimum of 15 characters
                if (sanitizedData[key].trim().length === 15){
                    let formattedData = sanitizedData[key].trim()
                    sanitizedData[key] = formattedData.slice(0,5)+'-'+formattedData.slice(6,11)+'-'+formattedData.slice(12,15)
                }
            }
            if (typeof sanitizedData[key] === 'string') {
                sanitizedData[key] = sanitizedData[key].trim().toUpperCase();
            }
        }
        return sanitizedData;
    }

    // Handle form submission
    function submitForm(e) {
        e.preventDefault();
        // Validate and sanitize form data
        const validatedData = validateFormData(formData);
        // Update parent with submission data
        props.onSubmit(validatedData);
    }

    return (
        <form className="mx-auto mt-6 w-72 lg:w-5/12 flex flex-col items-start font-opensans" onSubmit={submitForm}>
            {/* First Name */}
            <label className="mt-3 mb-2 font-bold" htmlFor="firstname">
                First Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="on"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                placeholder="Enter your First Name"
                required
            />

            {/* Middle Name */}
            <label className="mt-3 mb-2 font-bold" htmlFor="middlename">
                Middle Name
            </label>
            <input
                type="text"
                name="middlename"
                id="middlename"
                autoComplete="on"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                placeholder="Enter your Middle Name"
            />

            {/* Last Name */}
            <label className="mt-3 mb-2 font-bold" htmlFor="lastname">
                Last Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="on"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                placeholder="Enter your Last Name"
                required
            />

            {/* Driver's License Number */}
            <label className="mt-3 mb-2 font-bold" htmlFor="licenseNumber">
                Ontario Driver's License Number <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="licenseNumber"
                id="licenseNumber"
                autoComplete="on"
                maxLength={maxLength}
                minLength={minLength}
                onBlur={handleChange}
                onChange={handleLicenseNumberChange}
                value={licenseNumber}
                className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                placeholder="e.g. G1234-45674-67890"
                required
            />
            {/* divider bar */}
            <div className="rounded-2xl h-0.5 w-56 lg:w-72 bg-gray-200 mt-8 mb-2 mx-auto" role="presentation"></div>

            {/* Date of Birth */}
            <label className="mt-3 mb-2 font-bold" htmlFor="dob">
                Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
                type="date"
                name="dob"
                id="dob"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                required
            />

            {/* Sex and Height */}
            <div className="flex justify-center mb-2 w-full">
                <div className="relative flex flex-col mr-auto ml-0">
                    <label className="mt-3 mb-2 font-bold" htmlFor="sex">
                        Sex <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="sex"
                        id="sex"
                        required
                        onChange={handleChange}
                        className="appearance-none border p-3 w-56 pr-3 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    >
                        <option value="" hidden>Not specified</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="not-specified">Not Specified</option>
                    </select>
                    <span className="absolute inset-y-0 top-11 right-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </span>
                </div>
                <div className="flex flex-col ml-auto mr-0">
                    <label className="mt-3 mb-2 font-bold" htmlFor="height">
                        Height (cm) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="height"
                        id="height"
                        required
                        onChange={handleChange}
                        className="border p-3 w-56 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                        placeholder="Enter height in cm"
                    />
                </div>
            </div>
            {/* divider bar */}
            <div className="rounded-2xl h-0.5 w-56 lg:w-72 bg-gray-200 mt-6 mb-2 mx-auto" role="presentation"></div>

            {/* Address Information */}
            <div className="flex justify-center mt-2 w-full">
                <div className="flex flex-col mr-auto ml-0">
                    <label className="mt-3 mb-2 font-bold" htmlFor="unitNumber">
                        Unit Number
                    </label>
                    <input
                        type="number"
                        name="unitNumber"
                        id="unitNumber"
                        autoComplete="on"
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-56 cursor-pointer focus:outline-1 focus:outline-light-purple"
                        placeholder="Enter unit number"
                    />
                </div>
                <div className="flex flex-col ml-auto mr-0">
                    <label className="mt-3 mb-2 font-bold" htmlFor="streetNumber">
                        Street Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="streetNumber"
                        id="streetNumber"
                        required
                        autoComplete="on"
                        onChange={handleChange}
                        className="border p-3 w-56 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                        placeholder="Enter street number"
                    />
                </div>
            </div>

            {/* PO Box */}
            <label className="mt-3 mb-2 font-bold" htmlFor="poBox">
                PO Box
            </label>
            <input
                type="text"
                name="poBox"
                id="poBox"
                autoComplete="on"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                placeholder="Enter PO Box"
            />

            {/* Street Name */}
            <label className="mt-3 mb-2 font-bold" htmlFor="streetName">
                Street Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="streetName"
                id="streetName"
                required
                autoComplete="on"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                placeholder="Enter street name"
            />

            {/* City */}
            <label className="mt-3 mb-2 font-bold" htmlFor="city">
                City <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="city"
                id="city"
                required
                autoComplete="on"
                onChange={handleChange}
                className="border p-3 w-full rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                placeholder="Enter city"
            />

            <div className="flex justify-center w-full">
                {/* Province */}
                <div className="relative flex flex-col mb-2 mr-auto ml-0">
                    <label className="mt-3 mb-2 font-bold" htmlFor="province">
                        Province <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="province"
                        id="province"
                        required
                        autoComplete="on"
                        onChange={handleChange}
                        className="appearance-none border p-3 w-56 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                    >
                        {/* Province options */}
                        <option value="" hidden>Not specified</option>
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
                    <span className="absolute inset-y-0 top-11 right-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </span>
                </div>

                {/* Postal Code */}
                <div className="flex flex-col mb-2 ml-auto mr-0">
                    <label className="mt-3 mb-2 font-bold" htmlFor="postalCode">
                        Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        maxLength="6"
                        minLength={6}
                        required
                        autoComplete="on"
                        onBlur={handleChange}
                        className="border p-3 w-56 rounded-lg cursor-pointer focus:outline-1 focus:outline-light-purple"
                        placeholder="e.g., A1A1A1"
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
    )
}