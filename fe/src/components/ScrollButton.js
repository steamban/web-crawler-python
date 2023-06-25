import React from "react";

export default function ScrollButton({ isDarkMode }) {
    const [showScrollButton, setShowScrollButton] = React.useState(false);

    React.useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 0) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {showScrollButton && (
                <button
                    type="button"
                    className={`btn btn-content position-fixed bottom-0 end-0 mb-3 me-3 ${isDarkMode ? "btn-light" : "btn-dark"
                        }`}
                    style={{ maxWidth: '70px' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <i className="bi bi-arrow-up-circle fs-2"></i>
                </button>
            )}
        </>
    );
}
