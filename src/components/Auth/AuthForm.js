import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthFormBox = styled.div`
  z-index: 6000;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 10px;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  input {
    width: 300px;
    padding: 10px;
    text-align: left;
  }
  button {
    margin: 10px 0;
    cursor: pointer;
    font-size: 1.5em;
    padding: 10px;
  }
`;

const Footer = styled.div`
  text-align: right;
`;

function AuthFrom({ title, inputArr, other, form, onSubmit, onChange }) {
  return (
    <AuthFormBox
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1>{title}</h1>
      <FormBox onSubmit={onSubmit}>
        {inputArr.map((v, i) => (
          <input
            key={v + i}
            autoComplete={`new-${v.autoComplete}`}
            name={v.name}
            placeholder={v.nameKo}
            type={v.type}
            onChange={onChange}
            value={form[v.name]}
          />
        ))}
        <button>{title}</button>
      </FormBox>
      <Footer>
        <Link to={`/auth/${other.link}`}>
          <div style={{ width: 'fit-content', float: 'right' }}>
            {other.title}
          </div>
        </Link>
      </Footer>
    </AuthFormBox>
  );
}

export default AuthFrom;
