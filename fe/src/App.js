import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [lyrics, setLyrics] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/artist").then((response) => {
            setArtists(response.data.artists);
        });
    }, []);

    useEffect(() => {
        if (selectedArtist !== null) {
            axios
                .get(`http://127.0.0.1:8000/api/v1/artist/${selectedArtist}`)
                .then((response) => {
                    setTracks(response.data.tracks);
                });
        }
    }, [selectedArtist]);

    useEffect(() => {
        if (selectedTrack !== null) {
            axios
                .get(`http://127.0.0.1:8000/api/v1/song/${selectedTrack}`)
                .then((response) => {
                    setLyrics([response.data]);
                });
        }
    }, [selectedTrack]);

    function handleArtistClick(id) {
        setSelectedArtist(id);
        setSelectedTrack(null);
        setTracks([]);
        setLyrics([]);
    }

    function handleTrackClick(id) {
        setSelectedTrack(id);
        setLyrics([]);
    }

    return (
        <div className="container-fluid bg-light p-5">
            <h1 className="text-center display-2 text-primary mb-5">Hamon Music Database</h1>
            <div className="row justify-content-center align-items-start">
                <div className="col-md-4 mb-5">
                    <h2 className="text-center display-4 text-dark mb-4">Artists</h2>
                    <div className="list-group">
                        {artists.map((artist) => (
                            <button
                                key={artist.id}
                                type="button"
                                className={`list-group-item list-group-item-action rounded-lg ${selectedArtist === artist.id ? "active" : ""
                                    }`}
                                onClick={() => handleArtistClick(artist.id)}
                            >
                                {artist.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-md-8">
                    {selectedArtist !== null && (
                        <div>
                            <h2 className="text-center display-4 text-dark mb-4">
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
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-center">{track.name}</span>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-center text-muted my-5">
                                        No tracks to display.
                                    </p>
                                )}
                            </ul>
                        </div>
                    )}
                    {selectedTrack !== null && (
                        <div className="mt-5">
                            <h2 className="text-center display-4 text-dark mb-4">
                                Lyrics for{" "}
                                {tracks.find((t) => t.id === selectedTrack).name}
                            </h2>
                            {lyrics.map((lyric) => (
                                <div key={lyric.id}>
                                    <p className="text-center text-dark h6" style={{ whiteSpace: 'pre-line' }}>{lyric.lyrics}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
