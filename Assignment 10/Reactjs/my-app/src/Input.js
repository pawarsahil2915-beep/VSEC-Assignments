
import React from "react";
import { useNavigate } from "react-router-dom";

function Input({ formData, setFormData }) {
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        navigate("/display");
    }

    return (
        <div className="container">
            <h1>Student Registration Form</h1>

            <form onSubmit={handleSubmit}>
                <label>Name:</label><br />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <label>Email:</label><br />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <label>Age:</label><br />
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    required
                />
                <br /><br />

                <label>Phone Number:</label><br />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                    required
                />
                <br /><br />

                <label>City:</label><br />
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Input;
