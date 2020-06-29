import React from 'react';
import './App.css';
import { CreatePost } from './components/post';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],

    }
  }

  getAllBoast = (event) => {
    fetch('http://localhost:8000/api/post/boast/')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  getAllRoast = (event) => {
    fetch('http://localhost:8000/api/post/roast/')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  sortByVote = (event) => {
    fetch('http://localhost:8000/api/post/sorted_posts/')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  getAllPosts = (event) => {
    fetch('http://localhost:8000/api/post')
      .then(res => res.json())
      .then(res => this.setState({ post: res }))
  }

  handleUpVote = (id) => {
    const requestOptions = {
      method: 'POST'
    };
    fetch(`http://localhost:8000/api/post/${id}/up_vote/`, requestOptions)
      .then(res => res.json())
      .then(res => this.getAllPosts())
  }

  handleDownVote = (id) => {
    const requestOptions = {
      method: 'POST'
    };
    fetch(`http://localhost:8000/api/post/${id}/down_vote/`, requestOptions)
      .then(res => res.json())
      .then(res => this.getAllPosts())
  }

  handleDeletePost = (id) => {
    const requestOptions = {
      method: 'POST'
    };
    fetch(`http://localhost:8000/api/post/${id}/delete_post/`, requestOptions)
      .then(res => res.json())
      .then(res => this.getAllPosts())
  }

  componentDidMount() {
    this.getAllPosts();
  }

  render() {
    return (
      <div className="App">
        <h3>Ghost posts</h3>
        <div className="w-400">
          <button onClick={this.getAllPosts}>All Post</button>
          <button onClick={this.getAllBoast}>Boasts</button>
          <button onClick={this.getAllRoast}>Roasts</button>
          <button onClick={this.sortByVote}>By Votes</button>


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
                  <button onClick={() => this.handleUpVote(item.id)}>UpVote {item.up_votes}</button>
                  <button onClick={() => this.handleDownVote(item.id)}>DownVote {item.down_votes}</button>
                  <button onClick={() => this.handleDeletePost(item.secret_key)}>Delete Post</button>
                </li>
              </ul>
            )
          }
          )}
        </div>
        <div className="w-400 ml-50">
          <CreatePost />
        </div>
      </div>
    );
  }
}

export default App;