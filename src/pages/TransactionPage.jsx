import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      valor: valor,
      descricao: descricao,
    };

    try {
      const response = axios.post(`${import.meta.env.VITE_API_URL}/`, formData);

      if (!response.ok) {
        if (response.status === 401) {
          alert(response.statusText);
        }
        if (response.status === 422) {
          alert(response.statusText);
        }
      } else {
        localStorage.setItem("userData", JSON.stringify(formData));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={formSubmit}>
        <input
          data-test="registry-amount"
          placeholder="Valor"
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button data-test="registry-save">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
