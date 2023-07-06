import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInUp = async (e) => {
    e.preventDefault();
    const saveData = {
      userEmail: email,
      userPassword: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/`,
        saveData
      );

      if (!response.ok) {
        if (response.status === 422 || response.status === 409)
          alert(response.statusText);
        else {
          const data = await response.json();
          localStorage.setItem("userData", JSON.stringify(data));
          navigate("/home");
        }
      }
    } catch (error) {
      console.error(error);
    }
    console.log(saveData);
  };

  return (
    <SingInContainer>
      <form onSubmit={signInUp}>
        <MyWalletLogo />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-test="password"
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-test="sign-in-submit" type="submit">
          Entrar
        </button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
