import React, { Component } from 'react';

class PostDetails extends Component {
  render() {
    const { state } = this.props.location;
    const post = state?.post || {};

    return (
      <div>
        <h2>Post Details</h2>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>
    );
  }
}

export default PostDetails;
