import React, { useState, useRef, useEffect } from 'react';
import {
  FiPhone,
  FiBookmark,
  FiCalendar,
  FiUsers,
  FiBookOpen,
} from 'react-icons/fi';
import { Form } from '@rocketseat/unform';
import { FormHandles } from '@unform/core';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Header from '../../components/HeaderStudent';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const StudentPersonalData: React.FC = () => {
  const { signOut, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fone, setFone] = useState('');
  const [currentCourse, setCurrentCourse] = useState('');
  const [cpf, setCPF] = useState('');
  const [sex, setSex] = useState('Masculino');
  const [birth, setBirth] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [children, setChildren] = useState(0);
  const [cnh, setCNH] = useState('');
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (user.category !== 'aluno') {
      signOut();
    }
    async function getPersonalData() {
      try {
        const { data } = await api.get('/students-personal-data');
        if (data) {
          const newDateFormat =
            data.birth.substr(8, 2) +
            '/' +
            data.birth.substr(5, 2) +
            '/' +
            data.birth.substr(0, 4);

          setName(data.name);
          setEmail(data.email);
          setFone(data.fone);
          setCurrentCourse(data.currentCourse);
          setCPF(data.cpf);
          setSex(data.sex);
          setBirth(newDateFormat);
          setMaritalStatus(data.maritalStatus);
          setChildren(data.children);
          setCNH(data.cnh);
        }
      } catch (error) {}
    }
    getPersonalData();
  }, []);

  async function handleSubmit() {
    try {
      formRef.current?.setErrors({});
      Yup.object({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório'),
        fone: Yup.string().required('Telefone obrigatório'),
        currentCourse: Yup.string().required('Curso obrigatório'),
        cpf: Yup.string().required('CPF obrigatório'),
        sex: Yup.string().required('Genero'),
        birth: Yup.string().required('Data de nacimento obrigatório'),
        maritalStatus: Yup.string().required('Estado civil obrigatório'),
        children: Yup.string().required('Nume de filhos obrigatório'),
        cnh: Yup.string().required('Preenchiemnto do tipo de CNH obrigatório'),
      }).defined();

      const newDateFormat =
        birth.substr(3, 2) +
        '/' +
        birth.substr(0, 2) +
        '/' +
        birth.substr(6, 4);
      const { data } = await api.get('/students-personal-data');
      if (data) {
        await api.put('/students-personal-data', {
          name,
          email,
          fone,
          currentCourse,
          cpf,
          sex,
          birth: newDateFormat,
          maritalStatus,
          children,
          cnh,
        });
      } else {
        await api.post('/students-personal-data', {
          name,
          email,
          fone,
          currentCourse,
          cpf,
          sex,
          birth: newDateFormat,
          maritalStatus,
          children,
          cnh,
        });
      }

      addToast({
        type: 'success',
        title: 'Dados pessoais',
        description: 'Dados gravados com sucesso.',
      });
      history.push('/students-address');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu ao gravar seus dados. Tente novamente',
      });
    }
  }
  const maritalStatusList = [
    { label: 'Solteiro(a)', value: 'Solteiro(a)' },
    { label: 'Casado(a)', value: 'Casado(a)' },
    { label: 'Separado(a)', value: 'Separado(a)' },
    { label: 'Divorciado(a)', value: 'Divorciado(a)' },
    { label: 'Viúvo(a)', value: 'Viúvo(a)' },
  ];

  const sexList = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Prefiro não declarar', value: 'Não declarar' },
  ];

  const cnhList = [
    { label: 'Tipo A', value: 'A' },
    { label: 'Tipo B', value: 'B' },
    { label: 'Tipo AB', value: 'AB' },
    { label: 'Não possuo CNH', value: 'Não possuo CNH' },
    { label: 'Outros...', value: 'AB + Outros' },
  ];

  const currentCourseList = [
    { label: 'Administração', value: 'Administração' },
    { label: 'Ciências Contábeis', value: 'Ciências Contábeis' },
    { label: 'Direito', value: 'Direito' },
    { label: 'Enfermagem', value: 'Enfermagem' },
    { label: 'Engenharia Agronômica', value: 'Engenharia Agronômica' },
    { label: 'Psicologia', value: 'Psicologia' },
  ];

  return (
    <>
      <Header end={<h3>Bem vindo: {user.name} </h3>}></Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div className="card">
            <h5>Dados Pessoais</h5>
            <div className="p-grid p-fluid">
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user-edit"></i>
                  </span>
                  <InputText
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    placeholder="Nome Completo"
                    className={!name ? 'p-invalid p-d-block' : ''}
                  />
                </div>
              </div>
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">@</span>
                  <InputText
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    placeholder="Email"
                    className={!email ? 'p-invalid p-d-block' : ''}
                  />
                </div>
              </div>
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <FiPhone />
                  </span>
                  <InputMask
                    mask="(99) 99999-9999"
                    placeholder="Telefone"
                    value={fone}
                    onChange={e => setFone(e.value)}
                    className={!fone ? 'p-invalid p-d-block' : ''}
                  />
                  <span className="p-inputgroup-addon">
                    <FiBookOpen />
                  </span>
                  <Dropdown
                    value={currentCourse}
                    options={currentCourseList}
                    onChange={e => {
                      setCurrentCourse(e.value);
                    }}
                    placeholder="Curso"
                    className={!currentCourse ? 'p-invalid p-d-block' : ''}
                  />
                </div>
              </div>
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <FiCalendar />
                  </span>
                  <InputMask
                    id="date"
                    mask="99/99/9999"
                    value={birth}
                    placeholder="Data de nascimento"
                    slotChar="dd/mm/aaaa"
                    onChange={e => setBirth(e.value)}
                    className={!birth ? 'p-invalid p-d-block' : ''}
                  ></InputMask>
                  <span className="p-inputgroup-addon">
                    <FiBookmark />
                  </span>
                  <Dropdown
                    value={sex}
                    options={sexList}
                    onChange={e => {
                      setSex(e.value);
                    }}
                    placeholder="Sexo"
                    className={!sex ? 'p-invalid p-d-block' : ''}
                  />
                </div>
              </div>
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-id-card"></i>
                  </span>
                  <InputMask
                    mask="999.999.999-99"
                    placeholder="CPF"
                    value={cpf}
                    onChange={e => setCPF(e.value)}
                    className={!cpf ? 'p-invalid p-d-block' : ''}
                  />
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-id-card"></i>
                  </span>
                  <Dropdown
                    value={cnh}
                    options={cnhList}
                    onChange={e => {
                      setCNH(e.value);
                    }}
                    placeholder="Tipo da Carteira de Habilitação"
                    className={!cnh ? 'p-invalid p-d-block' : ''}
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <FiUsers />
                  </span>
                  <Dropdown
                    value={maritalStatus}
                    options={maritalStatusList}
                    onChange={e => {
                      setMaritalStatus(e.value);
                    }}
                    placeholder="Estado Civil"
                    className={!maritalStatus ? 'p-invalid p-d-block' : ''}
                  />
                </div>
              </div>
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">Filhos</span>
                  <InputNumber
                    id="minmax-buttons"
                    value={children}
                    onValueChange={e => setChildren(e.value)}
                    mode="decimal"
                    showButtons
                    min={0}
                    max={100}
                  />
                </div>
              </div>

              <Button
                className="button"
                type="submit"
                label="Grava >> Sessão Endereço"
                icon="pi pi-save"
                iconPos="right"
              />
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default StudentPersonalData;
