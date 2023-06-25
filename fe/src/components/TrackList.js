import React from "react";

function TrackList({ tracks, artists, selectedArtist, selectedTrack, handleTrackClick, isDarkMode }) {

    return (
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
    );
}

export default TrackList;
