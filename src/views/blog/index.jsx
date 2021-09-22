import React, { Component } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import posts from "../../data/posts.json";
import "./styles.css";
class Blog extends Component {
  state = {
    blogID: this.props.match.params.id,
    blog: {},
    loading: null,
    postCover: null,
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      let response = await fetch(
        process.env.REACT_APP_BE_URL + "/blogPosts/" + this.state.blogID
      );
      if (response.ok) {
        let data = await response.json();
        console.log("this is data", data);
        this.setState({ blog: data });
        console.log(this.state.blog);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate = (prevProp, prevState) => {
    if (prevState.postCover !== this.state.postCover) {
      console.log("=======>", this.state.postCover);
    }
  };

  // using cloudinary

  sendUserImg = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postCover", this.state.postCover);
    console.log("this is formData", this.state.postCover);

    try {
      let response = await fetch(
        process.env.REACT_APP_BE_URL +
          "/blogPosts/" +
          this.state.blogID +
          "/uploadCover",
        {
          method: "post",
          body: formData,
        }
      );
      if (response.ok) {
        console.log(response);
      } else {
        console.log("not send");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image
              className="blog-details-cover"
              src={this.state.blog.cover}
              fluid
            />
            <h1 className="blog-details-title">{this.state.blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...this.state.blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{this.state.blog.createdAt}</div>
                {/* <div>{`${this.state.blog.readTime.value} ${this.state.blog.readTime.unit} read`}</div> */}
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: this.state.blog.content }}
            ></div>

            <div
              className="d-flex"
              style={{ flexDirection: "column", width: "20%" }}
            >
              <Form onSubmit={this.sendUserImg}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Cover Images</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      const file = e.target.files[0];
                      console.log(file);
                      this.setState({ postCover: file });
                      console.log(
                        "this will print the state",
                        this.state.postCover
                      );
                    }}
                    accept="image/*"
                    type="file"
                    placeholder="Image"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update cover picture
                </Button>
              </Form>
            </div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
