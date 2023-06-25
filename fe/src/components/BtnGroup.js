import React from 'react';

function BtnGroup({ isDarkMode, handleCrawl, handleDarkModeToggle, handleInitializeApp }) {
    return (
        <div className="btn-group mb-5" role="group" aria-label="Button Group">
            <button type="button" className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`} onClick={handleCrawl}>
                Fetch
            </button>
            <button
                type="button"
                className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
                onClick={handleDarkModeToggle}
            >
                {isDarkMode ? <i className="bi bi-brightness-high fs-3"></i> : <i className="bi bi-moon fs-3"></i>}
            </button>
            <button
                type="button"
                className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
                onClick={handleInitializeApp}
            >
                Reset
            </button>
        </div>
    );
}

export default BtnGroup;
