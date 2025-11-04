"use client";
import { useState } from "react";
import { sendForm } from "@/app/services/FormService/form.service";

export const ConditionsPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        agree: false,
    });

    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        agree: "",
    });

    const [showForm, setShowForm] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = { name: "", phone: "", email: "", agree: "" };
        let valid = true;

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
            valid = false;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "El teléfono es obligatorio";
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido";
            valid = false;
        }
        if (!formData.agree) {
            newErrors.agree = "Debes aceptar recibir información";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const response = await sendForm({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                formType: "sellers",
                info: true
            });

            if (response.status === 200) {
                setShowForm(false);
                setSuccessMessage(response.message || "¡Gracias! Nos pondremos en contacto contigo.");
                setTimeout(() => {
                    setShowForm(true);
                    setSuccessMessage("");
                    setFormData({ name: "", phone: "", email: "", agree: false });
                }, 4000);
            } else {
                setShowForm(false);
                setErrorMessage(response.message || "Hubo un error al enviar el formulario");
                setTimeout(() => {
                    setShowForm(true);
                    setErrorMessage("");
                }, 4000);
            }
        } catch (error) {
            console.error(error);
            setShowForm(false);
            setErrorMessage("Error al enviar el formulario");
            setTimeout(() => {
                setShowForm(true);
                setErrorMessage("");
            }, 4000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Texto */}
                <div className="bg-gray-50 p-10 rounded-2xl text-center md:text-left shadow-sm flex flex-col justify-between h-full">
                    <h3 className="text-2xl font-bold mb-4">
                        Solicitar más información sobre las <span className="text-blue-900">condiciones</span>
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Si gestionas un negocio o empresa del sector hostelero, contacta con nuestro equipo especializado para descubrir cómo optimizar el consumo energético, reducir costos y acceder a bonificaciones exclusivas.
                        <br />
                        Nuestro equipo te responderá en menos de 24 horas hábiles.
                    </p>
                </div>

                {/* Formulario */}
                <div className="bg-white p-10 rounded-2xl shadow-lg relative flex flex-col justify-center h-full">

                    {/* Mensaje de éxito */}
                    {!showForm && successMessage && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 mb-4">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-gray-800 text-lg font-semibold">{successMessage}</p>
                        </div>
                    )}

                    {/* Mensaje de error */}
                    {!showForm && errorMessage && (
                        <div className="flex flex-col items-center justify-center h-full text-center mb-4">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 mb-4">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <p className="text-gray-800 text-lg font-semibold">{errorMessage}</p>
                        </div>
                    )}

                    {/* Formulario */}
                    {showForm && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        className="border border-gray-300 rounded-4xl px-4 py-2 w-full"
                                        required
                                    />
                                    {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Teléfono
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Tu teléfono"
                                        className="border border-gray-300 rounded-4xl px-4 py-2 w-full"
                                        required
                                    />
                                    {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Tu correo electrónico"
                                    className="border border-gray-300 rounded-4xl px-4 py-2 w-full"
                                    required
                                />
                                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                            </div>

                            <label className="flex items-start text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="mt-1 mr-2 accent-[#0C1C7C]"
                                />
                                <span>Acepto recibir información comercial de Apolo Energies</span>
                            </label>
                            {errors.agree && <p className="text-red-600 text-sm">{errors.agree}</p>}

                            <div className="flex justify-center pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-[#0C1C7C] cursor-pointer text-white px-10 py-3 rounded-full font-semibold hover:bg-blue-800 transition flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    {isSubmitting ? "Enviando..." : "Enviar →"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
