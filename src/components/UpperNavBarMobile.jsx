import React from 'react'
import { Link } from 'react-router-dom'


const UpperNavBarMobile = () => {
    return (
        <nav className="bg-body-tertiary d-md-none" style={{ position: 'fixed', width: '100%',zIndex:'1000',top:'0' }}>
            <div className="d-flex align-items-center">
                <div className="d-flex me-auto ms-2 ">
                    <img src="/kiwi.png" alt="logo" style={{ height: '50px' }} />
                </div>
                <div className="d-flex justify-content-center">
                    <Link className="navbar-brand" to="/">KIWIGRAM</Link>
                </div>
                <div className="d-flex ms-auto me-2">
                    <div className="navbar navbar-expand-lg bg-body-tertiary">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg" aria-label="Toggle navigation">
                            <i className="fs-1 bi bi-chat-dots"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default UpperNavBarMobile