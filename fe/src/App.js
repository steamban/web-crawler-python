import { useState, useEffect } from "react";
import "./App.css"

import axios from "axios";

export default function App() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [lyrics, setLyrics] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/artist").then((response) => {
            if (response.data.artists) {
                setArtists(response.data.artists);
            } else {
                console.log("No data was returned by the API");
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (selectedArtist !== null) {
            axios
                .get(`http://127.0.0.1:8000/api/v1/artist/${selectedArtist}`)
                .then((response) => {
                    if (response.data.tracks) {
                        setTracks(response.data.tracks);
                    } else {
                        console.log("No tracks were returned by the API");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedArtist]);

    useEffect(() => {
        if (selectedTrack !== null) {
            axios
                .get(`http://127.0.0.1:8000/api/v1/song/${selectedTrack}`)
                .then((response) => {
                    if (response.data) {
                        setLyrics([response.data]);
                    } else {
                        console.log("No lyrics were returned by the API");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [selectedTrack]);


    useEffect(() => {
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


    function handleArtistClick(id) {
        if (id !== selectedArtist) {
            setSelectedArtist(id);
            setSelectedTrack(null);
            setTracks([]);
            setLyrics([]);
        }
    }

    function handleTrackClick(id) {
        if (id !== selectedTrack) {
            setSelectedTrack(id);
            setLyrics([]);
        }
    }

    function handleDarkModeToggle() {
        setIsDarkMode(prevMode => !prevMode);
        document.body.classList.toggle("dark-mode");
    }

    function handleInitializeApp() {
        axios.post('http://localhost:8000/api/v1/initdb')
            .then((response) => {
                alert("DB has been initailised, Please click the 'Crawl' button to begin crawling for data!");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleCrawl() {
        alert("Please wait while we crawl the data. This may take some time.");
        setTimeout(() => {
            window.location.reload();
        }, 60000);
        axios.post('http://localhost:8000/api/v1/crawl')
            .then((response) => {
                console.log(response);
                setArtists(response.data.artists);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className={`container-fluid p-5 ${isDarkMode ? "dark-mode" : ""}`}>
            <h1 className="text-center display-2 text-primary mb-5">Hamon Music Database</h1>
            <div className="row justify-content-center align-items-start">
                {artists.length > 0 && (
                    <div className="col-md-4 mb-5">
                        <h2 className={`text-center display-4 ${isDarkMode ? 'text-light' : 'text-dark'} mb-4`}>Artists</h2>
                        <div className="list-group">
                            {artists.map((artist) => (
                                <button
                                    key={artist.id}
                                    type="button"
                                    className={`list-group-item list-group-item-action rounded-lg text-center ${selectedArtist === artist.id ? "active" : ""}`}
                                    onClick={() => handleArtistClick(artist.id)}
                                >
                                    {artist.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="col-md-8 mb-5">
                    {selectedArtist !== null && (
                        <div>
                            <h2 className={`text-center display-4 ${isDarkMode ? 'text-light' : 'text-dark'} mb-4`}>
                                Tracks by {artists.find((a) => a.id === selectedArtist).name}
                            </h2>
                            <ul className="list-group">
                                {tracks.length > 0 ? (
                                    tracks.map((track) => (
                                        <button
                                            key={track.id}
                                            type="button"
                                            className={`list-group-item list-group-item-action rounded-lg ${selectedTrack === track.id ? "active" : ""
                                                }`}
                                            onClick={() => handleTrackClick(track.id)}
                                        >
                                            <div className="d-flex justify-content-center align-items-center">
                                                <span className={'text-center'}>{track.name}</span>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <p className={`text-center ${isDarkMode ? 'text-muted' : 'text-secondary'} my-5`}>
                                        No tracks to display.
                                    </p>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="row">


                    {selectedTrack !== null && (
                        <div className="mt-5 mb-5" >
                            <h2 className={`text-center display-4 ${isDarkMode ? 'text-light' : 'text-dark'} mb-4`}>
                                Lyrics for{" "}
                                {tracks.find((t) => t.id === selectedTrack).name}
                            </h2>
                            {lyrics.map((lyric) => (
                                <p className={`text-center ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ whiteSpace: 'pre-line' }}>{lyric.lyrics}</p>
                            ))}
                        </div>
                    )}
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


                </div>
            </div>
            <div className="btn-group mb-5" role="group" aria-label="Button Group">
                <button
                    type="button"
                    className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
                    onClick={handleCrawl}
                >
                    Crawl
                </button>
                <button
                    type="button"
                    className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
                    onClick={handleDarkModeToggle}
                >
                    {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
                <button
                    type="button"
                    className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`}
                    onClick={handleInitializeApp}
                >
                    Initialize App
                </button>
            </div>

        </div>
    );
}