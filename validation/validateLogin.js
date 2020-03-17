export default function validateLogin(dataForm) {

    let errors = {};

    if (!dataForm.email) {
        errors.email = 'The Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(dataForm.email)) {
        errors.email = 'The Email is invalid';
    }

    if (!dataForm.password) {
        errors.password = "The password is required";
    } else if (dataForm.password.length < 6) {
        errors.password = "The password must be at least 6 characters"
    }

    return errors;

}