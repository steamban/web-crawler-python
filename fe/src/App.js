import { useState, useEffect } from "react";
import "./App.css"

import YoutubeVideo from "./components/YoutubeVideo";
import ScrollButton from "./components/ScrollButton";

import axios from "axios";

export default function App() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [lyrics, setLyrics] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);


    const selectedArtistName = selectedArtist !== null ? artists.find((a) => a.id === selectedArtist).name : '';
    const selectedTrackName = selectedTrack !== null ? tracks.find((t) => t.id === selectedTrack).name : '';



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
                window.location.reload();
                alert(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleCrawl() {
        const nartists = window.prompt("Enter number of artists: ");

        if (nartists === "" || isNaN(nartists) || Number(nartists) <= 0) {
            alert("Please enter a valid, numerically positive value for the number of artists.");
            return;
        }

        const ntracks = window.prompt("Enter number of tracks per artist: ");

        if (ntracks !== "" && (isNaN(ntracks) || Number(ntracks) <= 0)) {
            alert("Please enter a valid, numerically positive value for the number of tracks per artist.");
            return;
        }

        alert("Please wait while we crawl the data. This may take some time.");

        axios.post('http://localhost:8000/api/v1/crawl', {
            param1: nartists,
            param2: ntracks
        })
            .then((response) => {
                window.location.reload();
                console.log(response);
                setArtists(response.data.artists);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <div className={`container-fluid p-5 ${isDarkMode ? "dark-mode" : ""}`}>
            <h1 className="text-center display-2 text-primary mb-5">Music Database</h1>
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
                            <YoutubeVideo
                                artistName={selectedArtistName}
                                trackName={selectedTrackName}
                            />
                        </div>
                    )}
                    <ScrollButton isDarkMode={isDarkMode} />


                </div>
            </div>
            <div className="bottom-0 d-flex justify-content-center">
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
            </div>


        </div>
    );
}