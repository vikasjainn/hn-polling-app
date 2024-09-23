import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 0,
      loading: false,
      searchTerm: '',
    };
    this.intervalId = null;
    this.scrollHandler = this.handleScroll.bind(this);
  }

  componentDidMount() {
    // Start polling every 10 seconds
    this.fetchPosts();
    this.intervalId = setInterval(this.fetchPosts, 10000);
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.intervalId);
    window.removeEventListener('scroll', this.scrollHandler);
  }

  fetchPosts = () => {
    const { page } = this.state;
    axios
      .get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
      .then((response) => {
        this.setState((prevState) => ({
          posts: [...prevState.posts, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => {
        console.error('Error fetching posts', error);
      });
  };

  handleScroll() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && !this.state.loading) {
      this.fetchPosts();
    }
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  filterPosts = () => {
    const { posts, searchTerm } = this.state;
    if (!searchTerm) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  handlePostClick = (post) => {
    // Go to detailed post page
    this.props.history.push({
      pathname: `/post/${post.objectID}`,
      state: { post },
    });
  };

  render() {
    const filteredPosts = this.filterPosts();
    
    return (
      <div className="App">
        <h1>Hacker News Stories</h1>
        <input
          type="text"
          placeholder="Search by title or author"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
        <div className="post-list">
          {filteredPosts.map((post) => (
            <div key={post.objectID} className="post-item" onClick={() => this.handlePostClick(post)}>
              <h3>{post.title}</h3>
              <p>Author: {post.author}</p>
              <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
              <p>Tags: {post._tags.join(', ')}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                Open URL
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
