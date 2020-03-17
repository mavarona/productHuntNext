export default function validateCreateProduct(dataForm) {

    let errors = {};

    if (!dataForm.name) {
        errors.name = 'The Name is required';
    }

    if (!dataForm.company) {
        errors.company = 'The Company is required';
    }

    if (!dataForm.url) {
        errors.url = 'The Url is required';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(dataForm.url)) {
        errors.url = 'The Url has bad formated';
    }

    if (!dataForm.description) {
        errors.description = 'The Description is required';
    }

    return errors;

}