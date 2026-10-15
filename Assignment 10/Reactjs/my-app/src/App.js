
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "./Input";
import Display from "./Display";
import "./App.css";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        phone: "",
        city: ""
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Input
                            formData={formData}
                            setFormData={setFormData}
                        />
                    }
                />

                <Route
                    path="/display"
                    element={<Display formData={formData} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
