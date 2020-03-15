import React, { useState, useEffect } from 'react';

const useValidate = (stateInicial, validateForm, fn) => {

    const [dataForm, setDataForm ] = useState(stateInicial);
    const [errors, setErrors ] = useState({});
    const [submitForm, setSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0;

            if(noErrors) {
                fn(); 
            }
            setSubmitForm(false);
        }
    }, [errors]);

    const handleChange = e => {
        setDataForm({
            ...dataForm,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errorsValidation = validateForm(dataForm);
        setErrors(errorsValidation);
        setSubmitForm(true);
    }

    return {
        dataForm, 
        errors, 
        handleSubmit,
        handleChange
    }
}
 
export default useValidate;
