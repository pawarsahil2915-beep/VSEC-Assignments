
import React from "react";
import { useNavigate } from "react-router-dom";

function Display({ formData }) {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Registration Successful!</h1>

            <h2>Student Details</h2>

            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Phone Number:</strong> {formData.phone}</p>
            <p><strong>City:</strong> {formData.city}</p>

            <button onClick={() => navigate("/")}>
                Back to Form
            </button>
        </div>
    );
}

export default Display;
