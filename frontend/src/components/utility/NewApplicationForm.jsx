import React, { useState, useEffect } from "react";
import validateFormData from "./ValidateFormData";
import GetCurrentDate from "./GetCurrentDate";

export default function NewApplicationForm(props){
    // Determines if form has been submitted enables/disables submit btn functionality
    const [isSubmitting, setIsSubmitting] = useState(false)
    // Initialize formData with either savedData (if provided) or default values
    const [formData, setFormData] = useState({
        firstname: props.savedData?.firstname || "",
        middlename: props.savedData?.middlename || "",
        lastname: props.savedData?.lastname || "",
        licenseNumber: props.savedData?.licenseNumber || "",
        dob: props.savedData?.dob || "",
        sex: props.savedData?.sex || "",
        height: props.savedData?.height || "",
        unitNumber: props.savedData?.unitNumber || undefined,
        streetNumber: props.savedData?.streetNumber || undefined,
        poBox: props.savedData?.poBox || "",
        streetName: props.savedData?.streetName || "",
        city: props.savedData?.city || "",
        province: props.savedData?.province || "",
        postalCode: props.savedData?.postalCode || "",
        started: props.savedData?.started || GetCurrentDate(),
        submitted: ""
    });

    // Retrieve previously stored data from local storage
    useEffect(() => {
        // Check localStorage for existing form data when the component mounts
        const savedData = JSON.parse(localStorage.getItem("formData"));
        if (savedData) {
          setFormData(savedData);
        }
    }, [])

    // Define dynamic maxLength and minLength based on input
    let maxLength = formData.licenseNumber.includes('-') ? 17 : 15;
    let minLength = formData.licenseNumber.includes('-')===true ? 17 : 15;

    // Validates postal code input based on required format
    function validatePostalCode(){
        // Regex for LNLNLN format
        const regex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/; 
        if (!regex.test(formData.postalCode)) {
            alert("Invalid Postal Code format! Please use the format: LNLNLN. N=number, L=letter");
        }
    };

    // Update form data on each input change
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        const updatedFormData = { ...formData, [name]: value };
        localStorage.setItem("formData", JSON.stringify(updatedFormData));
    }

    // Handle form submission
    function submitForm(e) {
        e.preventDefault();
        // Validate and sanitize form data
        const validatedData = validateFormData(formData);
        // Update parent (NewApplication) with submission data
        props.onSubmit(validatedData);
        // Clear localStorage after submission
        localStorage.removeItem("formData");
        // Disable submit button to prevent unnecessary API calls
        setIsSubmitting(true)
    }

    return (
        <form className="mx-auto mt-6 w-80 md:w-6/12 flex flex-col items-start font-opensans" onSubmit={submitForm}>
            {/* First Name */}
            <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="firstname">
                First Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="on"
                value={formData.firstname}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your First Name"
                required
                aria-required="true"
            />

            {/* Middle Name */}
            <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="middlename">
                Middle Name
            </label>
            <input
                type="text"
                name="middlename"
                id="middlename"
                autoComplete="on"
                onChange={handleChange}
                value={formData.middlename}
                className="form-input"
                placeholder="Enter your Middle Name"
            />

            {/* Last Name */}
            <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="lastname">
                Last Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="on"
                onChange={handleChange}
                value={formData.lastname}
                className="form-input"
                placeholder="Enter your Last Name"
                required
                aria-required="true"
            />

            {/* Driver's License Number */}
            <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="licenseNumber">
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
                onChange={handleChange}
                value={formData.licenseNumber}
                className="form-input"
                placeholder="e.g. G1234-45674-67890"
                required
                aria-required="true"
            />
            {/* divider bar */}
            <div className="rounded-2xl h-0.5 w-56 lg:w-72 bg-gray-200 mt-8 mb-2 mx-auto" role="presentation"></div>

            {/* Date of Birth */}
            <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="dob">
                Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
                type="date"
                name="dob"
                id="dob"
                onChange={handleChange}
                value={formData.dob}
                className="form-input"
                required
                aria-required="true"
            />

            {/* Sex and Height */}
            <div className="flex justify-center mb-2 w-full">
                <div className="relative flex flex-col mr-auto ml-0">
                    <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="sex">
                        Sex <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="sex"
                        id="sex"
                        required
                        aria-required="true"
                        onChange={handleChange}
                        value={formData.sex}
                        className="appearance-none w-36 lg:w-56 pr-3 form-input"
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
                    <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="height">
                        Height (cm) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="height"
                        id="height"
                        required
                        aria-required="true"
                        onChange={handleChange}
                        value={formData.height}
                        className="border p-3 w-36 lg:w-56 form-input"
                        placeholder="Enter height in cm"
                    />
                </div>
            </div>
            {/* divider bar */}
            <div className="rounded-2xl h-0.5 w-56 lg:w-72 bg-gray-200 mt-6 mb-2 mx-auto" role="presentation"></div>

            {/* Address Information */}
            <div className="flex justify-center mt-2 w-full">
                <div className="flex flex-col mr-auto ml-0">
                    <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="unitNumber">
                        Unit Number
                    </label>
                    <input
                        type="number"
                        name="unitNumber"
                        id="unitNumber"
                        autoComplete="on"
                        onChange={handleChange}
                        value={formData.unitNumber}
                        className="w-36 lg:w-56 form-input"
                        placeholder="Enter unit number"
                    />
                </div>
                <div className="flex flex-col ml-auto mr-0">
                    <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="streetNumber">
                        Street Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="streetNumber"
                        id="streetNumber"
                        required
                        aria-required="true"
                        autoComplete="on"
                        onChange={handleChange}
                        value={formData.streetNumber}
                        className="w-36 lg:w-56 form-input"
                        placeholder="Enter street number"
                    />
                </div>
            </div>

            {/* PO Box */}
            <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="poBox">
                PO Box
            </label>
            <input
                type="text"
                name="poBox"
                id="poBox"
                autoComplete="on"
                onChange={handleChange}
                value={formData.poBox}
                className="form-input"
                placeholder="Enter PO Box"
            />

            {/* Street Name */}
            <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="streetName">
                Street Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="streetName"
                id="streetName"
                required
                aria-required="true"
                autoComplete="on"
                onChange={handleChange}
                value={formData.streetName}
                className="form-input"
                placeholder="Enter street name"
            />

            {/* City */}
            <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="city">
                City <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="city"
                id="city"
                required
                aria-required="true"
                autoComplete="on"
                onChange={handleChange}
                value={formData.city}
                className="form-input"
                placeholder="Enter city"
            />

            <div className="flex justify-center w-full">
                {/* Province */}
                <div className="relative flex flex-col mb-2 mr-auto ml-0">
                    <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="province">
                        Province <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="province"
                        id="province"
                        required
                        aria-required="true"
                        autoComplete="on"
                        onChange={handleChange}
                        value={formData.province}
                        className="appearance-none w-36 lg:w-56 form-input"
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
                    <label className="mt-3 mb-2 font-bold text-sm lg:text-base" htmlFor="postalCode">
                        Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        maxLength="6"
                        minLength={6}
                        required
                        aria-required="true"
                        autoComplete="on"
                        onBlur={validatePostalCode}
                        onChange={handleChange}
                        value={formData.postalCode}
                        className="w-36 lg:w-56 form-input"
                        placeholder="e.g., A1A1A1"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="p-3.5 w-full rounded-lg tracking-wide cursor-pointer bg-main-purple text-white font-bold mt-8 hover:bg-dark-purple"
                aria-label="submission for driver license application form"
                disabled={isSubmitting}
            >
                Submit
            </button>
        </form>
    )
}