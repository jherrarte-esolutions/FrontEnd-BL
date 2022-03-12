import React, { Component } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";

class Login extends Component {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  loginWithMail = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        this.state.form.email,
        this.state.form.password
      );
      alert("User logged in: " + this.state.form.email);
      window.location.href = "./menu";
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  render() {
    return (
      <Container>
        <label>Mail: </label>
        <br />
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={this.handleChange}
        />
        <br />
        <label>Password: </label>
        <br />
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={this.handleChange}
        />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => this.loginWithMail()}
        >
          Log In
        </button>
      </Container>
    );
  }
}

export default Login;
