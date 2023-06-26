import { useState, useEffect } from "react";
import "./App.css"

import ScrollButton from "./components/ScrollButton";
import BtnGroup from "./components/BtnGroup";
import Lyrics from "./components/Lyrics";
import TrackList from "./components/TrackList";
import ArtistList from "./components/ArtistList";

import axios from "axios";

export default function App() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [lyrics, setLyrics] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);


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
                alert("App reset, Please click the 'Fetch' button to begin gather data!");
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

        alert("Please wait while collect the data. This may take some time.");

        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
    
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
    
        document.body.appendChild(spinner);
        document.body.appendChild(overlay);

        axios.post('http://localhost:8000/api/v1/crawl', {
            param1: nartists,
            param2: ntracks
        })
            .then((response) => {
                window.location.reload();
                setArtists(response.data.artists);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
            spinner.remove();
            overlay.remove();
        });
    }


    return (
        <div className={`container-fluid p-5 ${isDarkMode ? "dark-mode" : ""}`}>
            <h1 className="text-center display-2 text-primary mb-5">Music Database</h1>
            <div className="row justify-content-center align-items-start">
                {artists.length > 0 && (
                    <ArtistList
                        artists={artists}
                        selectedArtist={selectedArtist}
                        handleArtistClick={handleArtistClick}
                        isDarkMode={isDarkMode}
                    />
                )}
                <TrackList
                    tracks={tracks}
                    selectedTrack={selectedTrack}
                    handleTrackClick={handleTrackClick}
                    isDarkMode={isDarkMode}
                    selectedArtist={selectedArtist}
                    artists={artists} />
                <div className="row">
                    {selectedTrack !== null && (
                        <Lyrics
                            lyrics={lyrics}
                            selectedTrackName={selectedTrackName}
                            isDarkMode={isDarkMode}
                            selectedArtistName={selectedArtistName} />
                    )}
                    <ScrollButton isDarkMode={isDarkMode} />
                </div>
            </div>
            <div className="bottom-0 d-flex justify-content-center">
                <BtnGroup
                    isDarkMode={isDarkMode}
                    handleCrawl={handleCrawl}
                    handleDarkModeToggle={handleDarkModeToggle}
                    handleInitializeApp={handleInitializeApp}
                />
            </div>


        </div>
    );
}