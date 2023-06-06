import React, { useState } from "react";
import axios from "axios";

const PasswordForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                // Realizar la solicitud POST a la API
                const response = await axios.post(
                    "http://localhost:4000/auth/password/reset",
                    {
                        password: password,
                        confirmPassword: password,
                    }
                );

                // Procesar la respuesta de la API según sea necesario
                console.log(response.data);
            } catch (error) {
                // Manejar el error de la solicitud
                console.error(error);
            }
        } else {
            // Las contraseñas no coinciden, mostrar un mensaje de error o tomar alguna acción
            setPasswordMatch(false);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 400px)' }}>
            <h2 className="text-center mb-4">Password Reset</h2>
            <form onSubmit={handleSubmit} className="w-100 max-w-sm">
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        className={`form-control ${!passwordMatch && "is-invalid"}`}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {!passwordMatch && (
                        <div className="invalid-feedback">Las contraseñas no coinciden</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default PasswordForm;
