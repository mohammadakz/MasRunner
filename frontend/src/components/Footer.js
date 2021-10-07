import React from "react";
import { Link } from "react-router-dom";
import { RiGithubFill } from "react-icons/ri";
import { AiFillLinkedin } from "react-icons/ai";
import styled from "styled-components";
const Footer = () => {
  return (
    <MainDiv>
      <p>Mohammad Akbarzadeh</p>
      <p>October 2021</p>
      <a href="https://github.com/mohammadakz" target="_blank">
        <RiGithubFill />
      </a>
      <a href="https://www.linkedin.com/in/mohammadakz/">
        <AiFillLinkedin />
      </a>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  position: fixed;
  width: 100vw;
  bottom: 0%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  height: 8vh;
  background: white;
  a {
    text-decoration: none;
    color: black;
    font-size: 3rem;
    &:hover {
      transform: scale(1.2);
      transition: ease-in 0.2s all;
    }
  }
`;
export default Footer;
