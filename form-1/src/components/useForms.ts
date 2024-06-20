/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export const useForm = (initialState: any, validate: any) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                console.log('Form submitted successfully', values);
                setIsSubmitting(false);
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors , isSubmitting , values]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setIsSubmitting(true);
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    };
};
