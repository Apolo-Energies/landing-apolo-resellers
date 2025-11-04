"use client";
import { useState } from "react";
import { sendForm } from "@/app/services/FormService/form.service";

export const ServicesPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        agree: false,
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
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
        setErrors({ ...errors, [name]: "" }); // limpiar error al escribir
    };

    const validate = () => {
        const newErrors = { name: "", email: "", phone: "", agree: "" };
        let valid = true;

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido";
            valid = false;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "El teléfono es obligatorio";
            valid = false;
        }
        if (!formData.agree) {
            newErrors.agree = "Debes aceptar recibir información comercial";
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
                info: false
            });

            if (response.status === 200) {
                setShowForm(false);
                setSuccessMessage(response.message || "¡Gracias! Recibirás información pronto.");
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
        <div className="container mx-auto pt-0 pb-0">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">1. Servicios a medida</h3>
                            <p className="text-gray-700">
                                Ofrecemos soluciones adaptadas para satisfacer las necesidades de tus clientes.
                            </p>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">2. Transparencia total</h3>
                            <p className="text-gray-700">
                                Mantenemos una comunicación clara, respaldada por herramientas de ahorro energético.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">3. Soporte autónomo</h3>
                            <p className="text-gray-700">
                                Te proporcionamos los recursos necesarios para operar de forma independiente y eficaz.
                            </p>
                        </div>
                    </div>

                    <div
                        className="bg-gray-100 p-8 rounded-lg relative flex flex-col justify-center items-center"
                        style={{
                            backgroundImage: "url('/imgs/img-colaborator.webp')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >

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
                            <>
                                <h3 className="text-xl font-bold mb-6 text-blue-900 text-center">
                                    Trabaja con nosotros y amplía tu horizonte profesional
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-[#F4F4F4] border border-gray-300 rounded-4xl px-4 py-2 w-full text-gray-900 placeholder-gray-500"
                                        required
                                    />
                                    {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-[#F4F4F4] border border-gray-300 rounded-4xl px-4 py-2 w-full text-gray-900 placeholder-gray-500"
                                        required
                                    />
                                    {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Número de teléfono"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-[#F4F4F4] border border-gray-300 rounded-4xl px-4 py-2 w-full text-gray-900 placeholder-gray-500"
                                        required
                                    />
                                    {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}

                                    <label className="flex items-start text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            name="agree"
                                            checked={formData.agree}
                                            onChange={handleChange}
                                            className="mt-1 mr-2 accent-[#0C1C7C]"
                                        />
                                        <span>Acepto recibir información comercial sobre Apolo Energies</span>
                                    </label>
                                    {errors.agree && <p className="text-red-600 text-sm">{errors.agree}</p>}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`bg-[#0C1C7C] cursor-pointer text-white px-8 py-3 rounded-full w-full hover:bg-blue-800 transition flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                                    >
                                        {isSubmitting ? "Enviando..." : "LLAMÁDME AHORA"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
