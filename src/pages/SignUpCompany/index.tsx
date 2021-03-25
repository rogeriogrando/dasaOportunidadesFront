import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import { AiOutlineShop } from 'react-icons/ai';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';

import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import logoImg from '../../assets/logo.png';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpCompanyFormData {
  name: string;
  email: string;
  pass: string;
}

const SignUpCompany: React.FC = () => {
  // const [category, setCategory] = useState('company');
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpCompanyFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          pass: Yup.string().min(6, 'No mínimo 6 dígitos'),
          confirmPass: Yup.string().oneOf(
            [Yup.ref('pass'), 'null'],
            'As senhas estão diferentes',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/companies', data);
        history.push('/dashboard-company-active');

        addToast({
          type: 'info',
          title: 'Cadatro realizado com sucesso!!!',
          description:
            'Conta criada com sucesso. Mandamos um e-mail para a coordenbação da Faesb para ativação!!!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um ao fazer seu cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Faesb" style={{ width: '150px' }} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Empresas</h1>
            <Input
              name="name"
              icon={AiOutlineShop}
              placeholder="Razão Social"
            />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="pass" icon={FiLock} type="password" placeholder="Senha" />
            <Input
              name="confirmPass"
              icon={FiLock}
              type="password"
              placeholder="Confirmação"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUpCompany;
