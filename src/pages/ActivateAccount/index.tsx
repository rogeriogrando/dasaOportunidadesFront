import React, { useEffect } from 'react';

import { Container } from './styles';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ActivateAccount: React.FC = () => {
  useEffect(() => {
    async function getAcademicEducation() {
      try {
        const token = window.location.pathname.split('/')[2];
        console.log(token);
        await api.put(`/activateaccount/${token}`);
      } catch (error) {}
    }
    getAcademicEducation();
  }, []);

  return (
    <>
      <Container>
        <h1>PORTAL DE OPORTUNIDADES FAESB</h1>
        <p></p>
        <h2>Seja bem vindo!!!</h2>

        <span>
          <p>Sua conta foi ativada com sucesso :).</p>
          <p>Click no link a baixo para iniciar sua experiência!!!</p>
          <h2>
            <Link to="/">Link para iniciar Iniciar</Link>
          </h2>
        </span>

        <p></p>
      </Container>
    </>
  );
};

export default ActivateAccount;
