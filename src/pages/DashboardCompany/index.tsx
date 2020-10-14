import React, { useCallback, useRef, useEffect } from 'react';

import { Container } from './styles';
import logoImg from '../../assets/logo.png';

import Header from '../../components/HeaderCompany';

import { useAuth } from '../../hooks/auth';

interface DashboardCompanyFormData {
  email: string;
  password: string;
}

const DashboardCompany: React.FC = () => {
  const { signOut, user } = useAuth();

  useEffect(() => {
    if (user.category !== 'company') {
      signOut();
    }
  }, []);

  return (
    <>
      <Header end={<h3>Bem vindo: {user.name} </h3>}></Header>
      <Container>
        <h1>PORTAL DE OPORTUNIDADES FAESB</h1>
        <p></p>
        <h2>Seja bem vindo!!!</h2>

        <span>
          <p>
            Em harmonia com a missão da Faesb que abrange o educacional o
            cultural e o social, o projeto visa proporcional um canal entre
            alunos, egressos e oportunidades de mercado na região de atuação da
            Faesb.
          </p>
          <p>
            O projeto surge como uma ponte para ligar nossos alunos e egressos a
            oportunidades oferecidas pelas empresas parceiras da Faesb. O
            projeto também agrega valor para as empresas parceiras na medida em
            que oferece um banco de dados sólido com mão de obra especializada.
          </p>
        </span>

        <p></p>
      </Container>
    </>
  );
};

export default DashboardCompany;
