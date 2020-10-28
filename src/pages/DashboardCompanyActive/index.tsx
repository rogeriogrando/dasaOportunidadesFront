import React from 'react';

import { Container } from './styles';
import logoImg from '../../assets/logo.png';
import { Link  } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


const DashboardCompanyAtivacao: React.FC = () => {

  return (
    <>
      <Container>
        <img src={logoImg} alt="Faesb" style={{ width: '150px' }} />

        <h1>PORTAL DE OPORTUNIDADES FAESB</h1>
        <p></p>
        <span>
          <p>
            Um e-mail foi encaminhado para a coordenação do sistema de oportunidades da Faesb.
            Assim que for aprovado seu cadastro um e-mail será enviado com a ativação da sua conta.
          </p>
          <p>
            Agradecemos pela sua colaboração ao desenvolvimento de nossos alunos.
          </p>

        </span>

        <p></p>
        <Link to="/">  <p>Voltar para login</p> </Link>
      </Container>
    </>
  );
};

export default DashboardCompanyAtivacao;
