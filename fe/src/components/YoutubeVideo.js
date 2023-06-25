import { useEffect, useState } from "react";
import axios from "axios";

function YoutubeVideo({ artistName, trackName }) {
    const [videoId, setVideoId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
                        `${artistName} ${trackName}`
                    )}&key=[YOUR_API_KEY_HERE]`
                );
                if (response?.data?.items?.length) {
                    setVideoId(response.data.items[0].id.videoId);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [artistName, trackName]);

    return (
        <div className="mt-5 mb-5 text-center">
        {videoId && (
          <iframe
            className="mx-auto d-block"
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${artistName} - ${trackName}`}
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
}

export default YoutubeVideo;
