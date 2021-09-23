import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        category: "",
        title: "",
        cover: "",
        readTime: {
          value: 2,
          unit: "minute",
        },
        author: {
          name: "AUTHOR AVATAR NAME",
          avatar: "AUTHOR AVATAR LINK",
        },
        content: "",
        comments: [],
        coverImages: "",
      },
      coverImages: null,
      profileImages: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  sendData = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(process.env.REACT_APP_BE_URL + "/blogPosts/", {
        method: "POST",
        body: JSON.stringify(this.state.post),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
        //here have user id
        alert("Comment was sent!");
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={(e) => this.sendData(e)}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              value={this.state.post.title}
              onChange={(e) =>
                this.setState({
                  post: {
                    ...this.state.post,
                    title: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control size="lg" as="select">
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              // value={this.state.text}
              // onChange={this.handleChange}
              className="new-blog-content"
              value={this.state.post.content}
              onChange={(e) =>
                this.setState({
                  post: {
                    ...this.state.post,
                    content: e,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
