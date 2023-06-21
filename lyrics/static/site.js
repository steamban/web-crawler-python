'use strict';

const e = React.createElement;

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

root.render(e(LikeButton));
