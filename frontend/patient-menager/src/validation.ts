import { Patient } from "./types";

export const validatePatientData = (patient: Patient): string[] => {
    const errors: string[] = [];

    if (!/^[A-Za-z]+$/.test(patient.first_name.trim())) {
        errors.push("First Name");
    }
    if (!/^[A-Za-z]+$/.test(patient.last_name.trim())) {
        errors.push("Last Name");
    }
    if (!/^[0-9]{11}$/.test(patient.pesel.trim())) {
        errors.push("PESEL");
    }
    if (!/^[0-9]{2}-[0-9]{3}$/.test(patient.post_code.trim())) {
        errors.push("Post Code");
    }
    if (!/.+/.test(patient.city.trim())) {
        errors.push("City");
    }
    if (!/.+/.test(patient.street.trim())) {
        errors.push("Street");
    }
    

    return errors;
};
