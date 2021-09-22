import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
export default class BlogList extends Component {
  state = {
    posts: [],
  };

  componentDidMount = async () => {
    try {
      let response = await fetch(process.env.REACT_APP_BE_URL + "/blogPosts");
      if (response.ok) {
        let data = await response.json();
        this.setState({ posts: data });
        console.log(this.state.posts);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Row>
        {this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
