'use strict';

const e = React.createElement;

class AlbumPanel extends React.Component {
    constructor(props) {
        super(props);
        axios.get("/songs/1").then((resp) => {this.state = resp.data});
        this.state = { tracks : [{id : 1,
                                  name : "Song1",
                                  lyrics  : "Lyrics1"}],
                       current : 0
                     }

    }

    handleClick(e) {
        e.preventDefault();
        console.log("Hello!");
    }

    render() {
        return (<div>
                <h2>Songs</h2>
                ({this.state.current})
                <ol>
                {this.state.tracks.map(((track, idx)=><li key={`track${track.id}`}>
                                        <a 
                                        href={`/song/${track.id}`}
                                        onClick={(e) => {e.preventDefault();
                                                         this.setState({tracks: this.state.tracks,
                                                                        current: idx});
                                                         }}
                                        >{track.name}
                                        </a>
                                        </li>))}
                </ol>
                <hr/>
                <div >
                {this.state.tracks[this.state.current].lyrics}
                </div>
                </div>
               );
        }
    
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
        <span>
            <button onClick={() => this.setState({ liked: true })}>
            +
        </button>
            <button onClick={() => this.setState({ liked: true })}>
            -
        </button>
            </span>
);
  }
}

const domContainer = document.querySelector('#react');

const root = ReactDOM.createRoot(domContainer);

root.render(e(AlbumPanel));
