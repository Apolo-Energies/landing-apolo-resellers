import { ApiManager } from "../ApiManager/ApiManager";

interface FormResponse {
    success: boolean;
    message: string;
    data: any;
}

interface SendFormParams {
    name?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    formType: string;
    info: boolean
    file?: File;
}

export const sendForm = async (params: SendFormParams): Promise<any> => {
    try {
        const { name, firstName, lastName, email, phone, formType, info, file } = params;

        const formData = new FormData();
        if (name) formData.append("name", name);
        if (firstName) formData.append("firstName", firstName);
        if (lastName) formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("formtype", formType);
        formData.append("info", String(info));
        if (file) formData.append("file", file);

        const response = await ApiManager.post("/webhook/form-submission", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response;
    } catch (error: any) {
        console.error("Error al enviar formulario:", error);
        return {
            success: false,
            message: "Error al enviar el formulario",
            data: {},
        };
    }
};
