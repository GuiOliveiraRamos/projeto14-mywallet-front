import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signInUp = async (e) => {
    e.preventDefault();
    const saveData = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userConfirmPassword: confirmPassword,
    };
    if (password !== confirmPassword) {
      return alert("as senhas devem ser iguais");
    }
    try {
      const response = fetch(`${import.meta.env.VITE_API_URL}/cadastro`, {
        name,
        email,
        password,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });
      if (!response.ok) {
        if (response.status === 422 || response.status === 409) {
          alert(response.statusText);
        }
      } else {
        const data = await request.json();
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SingUpContainer>
      <form onSubmit={signInUp}>
        <MyWalletLogo />
        <input
          data-test="name"
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          data-test="conf-password"
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button data-test="sign-up-submit" type="submit">
          Cadastrar
        </button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
