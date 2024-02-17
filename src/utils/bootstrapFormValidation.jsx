export const bootstrapFormValidation = (e, form) => {

    if (!form.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
    }
    form.classList.add('was-validated')
}   