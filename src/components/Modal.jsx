import React from 'react'

const Modal = ({ name, title, triggerButton, triggerButtonClassName, submitButton, scrollable, onClick, body }) => {
    return (
        <>
            {/* Button trigger modal  */}
            <a onClick={onClick} type="button" className={triggerButtonClassName} data-bs-toggle="modal" data-bs-target={`#${name}Modal`}>
                {triggerButton}
            </a>

            {/* Modal  */}
            <div className="modal fade" id={`${name}Modal`} tabIndex="-1" aria-labelledby={`${name}ModalLabel`} aria-hidden="true">
                <div className={"modal-dialog modal-lg modal-dialog-centered " + (scrollable ? "modal-dialog-scrollable" : "")}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${name}ModalLabel`}>{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {body}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {submitButton &&
                                <button type="button" className="btn btn-primary">{submitButton}</button>
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Modal