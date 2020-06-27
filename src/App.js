import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],

    }
  }

  handleClickBoast = (event) => {
    fetch('http://localhost:8000/api/post/boast/')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  handleClickRoast = (event) => {
    fetch('http://localhost:8000/api/post/roast/')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  handleHighestVote = (event) => {
    fetch('http://localhost:8000/api/post/sorted_posts/')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  getAllPosts = (event) => {
    fetch('http://localhost:8000/api/post')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  handleUpVote() {
    fetch('http://localhost:8000/api/post')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  componentDidMount() {
    this.getAllPosts();
  }

  render() {
    return (
      <div className="App">
        <h3>Ghost posts</h3>
        <button onClick={this.getAllPosts}>All Post</button>
        <button onClick={this.handleClickBoast}>Boasts</button>
        <button onClick={this.handleClickRoast}>Roasts</button>
        <button onClick={this.handleHighestVote}>By Votes</button>

        {this.state.post.map((item) => {
          return (
            <ul>
              <li>
                Type: {(item.is_boast ?
                  (<span>Boast</span>)
                  : (<span>Roast</span>)
                )}<br />
                Content: {item.content}<br />
                Total Vote: {item.total_votes} <br />
                Date: {item.submit_time}<br />
                <button>UpVote {item.up_votes}</button>
                <button>DownVote {item.down_votes}</button>
              </li>
            </ul>
          )
        }
        )}
      </div>
    );
  }
}

export default App;