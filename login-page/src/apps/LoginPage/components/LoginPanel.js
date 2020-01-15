import React from "react";
import styled from "styled-components";

import { login } from "../repository";

import { COLOURS } from "utils/constants";

const LoginContainer = styled.div`
  align-items: center;
  border: 45px solid white;
  border-left: 65px solid white;
  border-right: 65px solid white;
  background: white;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center
    justify-content: center
    background-color: white;
`;

const LoginInfo = styled.input`
  color: black;
  background-color: #bfc0c0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
  width: 250px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  margin-bottom: 1.2em;
`;

const LoginButton = styled.input`
    width: 200px;
    height: 50px;   
    font-weight: 500;
    text-align: center;
    font-size: 16px;
    color: ${COLOURS.darkSecondary};
    background-color: #f87080;
    border: none;
    border-radius: 8px;
    margin-top: 123px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    :hover {
        background-color: ${COLOURS.lightSecondary};
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
        transform: translateY(-5px);
        position: relative;
        z-index: 1;
    }
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 24px;
  color: ${COLOURS.darkgrey};
  text-align: center;
  line-height: 1.5em;
  margin-bottom: 0.1em;
  margin-top: 0.2em;
`;

const Subtitle = styled.h3`
  font-weight: 300;
  font-size: 18px;
  color: ${COLOURS.darkgrey};
  text-align: center;
  line-height: 1.5em;
  margin-bottom: 2.4em;
  margin-top: 0.2em;
`;

class LoginPanel extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;

    login({ email, password }).then(response => response);
  };

  handleChange = event => {
    event.preventDefault();
    const inputType = event.target.name;
    if (inputType === "email") {
      this.setState({ email: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  };

  render() {
    return (
      <LoginContainer>
        <FormContainer onSubmit={this.handleLogin}>
          <Title>Welcome.</Title>
          <Subtitle>Please sign in to continue</Subtitle>
          <LoginInfo
            type="text"
            name="email"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <LoginInfo
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <LoginButton type="submit" value="Sign In" />
        </FormContainer>
      </LoginContainer>
    );
  }
}

export default LoginPanel;
