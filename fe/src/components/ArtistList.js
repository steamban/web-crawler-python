import React from "react";

function ArtistList({ artists, selectedArtist, handleArtistClick, isDarkMode }) {
    return (
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
    );
}

export default ArtistList;
