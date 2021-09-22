import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BlogAuthor from "../blog-author";
import { Link } from "react-router-dom";
import "./styles.css";
export default class BlogItem extends Component {
  //create a fetch here
  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch("http://localhost:3001/blogPost/");
  //   } catch (error) {}
  // };

  render() {
    const { title, coverImg, author, id } = this.props;
    return (
      <Link to={`/blogPosts/${id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={coverImg} className="blog-cover" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor {...author} />
          </Card.Footer>
        </Card>
      </Link>
    );
  }
}
