import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionsPage from "./pages/TransactionPage";
import contextData from "./pages/DataContext";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState(undefined);
  const [name, setName] = useState("");

  return (
    <PagesContainer>
      <BrowserRouter>
        <contextData.Provider
          value={{
            name: name,
            setName: setName,
            token: token,
            setToken: setToken,
          }}
        >
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/nova-transacao/:tipo"
              element={<TransactionsPage />}
            />
          </Routes>
        </contextData.Provider>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
