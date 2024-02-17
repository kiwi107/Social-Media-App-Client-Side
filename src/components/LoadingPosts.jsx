import React from 'react'

const LoadingPosts = () => {
    return (
        <>
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <div className="card-text placeholder-glow">
                        <span className="placeholder col-10" style={{ height: '200px' }}></span>
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </div>
                </div>
            </div>
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-10" style={{ height: '200px' }}></span>
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
            <div className="card" aria-hidden="true">
                <div className="card-body">
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-10" style={{ height: '200px' }}></span>
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div></>
    )
}

export default LoadingPosts