import React from "react";
import YoutubeVideo from "./YoutubeVideo";

const Lyrics = ({ lyrics, selectedTrackName, selectedArtistName, isDarkMode }) => {
    return (
        <div className="mt-5 mb-5">
            <h2 className={`text-center display-4 ${isDarkMode ? 'text-light' : 'text-dark'} mb-4`}>
                Lyrics for {selectedTrackName}
            </h2>
            {lyrics.map((lyric) => (
                <p className={`text-center ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ whiteSpace: 'pre-line' }}>{lyric.lyrics}</p>
            ))}
            <YoutubeVideo
                artistName={selectedArtistName}
                trackName={selectedTrackName}
            />
        </div>
    );
};

export default Lyrics;
