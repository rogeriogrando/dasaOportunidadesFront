import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';

import getValidationErros from '../../utils/getValidationErros';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  confirmPass: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          confirmPass: Yup.string().oneOf(
            [Yup.ref('password'), 'null'],
            'As senhas estão diferentes',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, confirmPass } = data;
        const token = location.pathname.replace('/reset-password/', '');

        console.log(token);

        if (!token) {
          throw new Error();
        }

        await api.put('/resetpassword', {
          pass: password,
          confirmPass,
          token,
        });
        addToast({
          type: 'success',
          title: 'Alteração de senha',
          description: 'Sua senha foi alterada com sucesso.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar a senha. Tente novamente',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Faesb" style={{ width: '150px' }} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="confirmPass"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
