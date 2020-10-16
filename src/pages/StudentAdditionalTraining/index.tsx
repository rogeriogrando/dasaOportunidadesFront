import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { FormHandles } from '@unform/core';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Header from '../../components/HeaderStudent';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const StudentAdditionalTraining: React.FC = () => {
  const { signOut, user } = useAuth();
  const [inglesLevel, setInglesLevel] = useState('');
  const [espanholLevel, setEspanholLevel] = useState('');
  const [othersLevel, setOthersLevel] = useState('');
  const [others, setOthers] = useState('');
  const [excelLevel, setExcelLevel] = useState('');
  const [wordLevel, setWordLevel] = useState('');
  const [powerPointLevel, setPowerPointLevel] = useState('');
  const [computerLevel, setComputerLevel] = useState('');
  const [computer, setComputer] = useState('');
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (user.category !== 'aluno') {
      signOut();
    }
    async function getPersonalData() {
      try {
        const { data } = await api.get('/students-additional-training');
        if (data) {
          setInglesLevel(data.inglesLevel);
          setEspanholLevel(data.espanholLevel);
          setOthersLevel(data.othersLevel);
          setOthers(data.others);
          setExcelLevel(data.excelLevel);
          setWordLevel(data.wordLevel);
          setPowerPointLevel(data.powerPointLevel);
          setComputerLevel(data.computerLevel);
          setComputer(data.computer);
        }
      } catch (error) {}
    }
    getPersonalData();
  }, []);

  async function handleSubmit() {
    try {
      formRef.current?.setErrors({});
      Yup.object({
        inglesLevel: Yup.string().required('Campo obrigatório'),
        espanholLevel: Yup.string().required('Campo obrigatório'),
        othersLevel: Yup.string().required('Campo obrigatório'),
        computerLevel: Yup.string().required('Campo obrigatório'),
      }).defined();

      const { data } = await api.get('/students-additional-training');
      if (data) {
        await api.put('/students-additional-training', {
          inglesLevel,
          espanholLevel,
          othersLevel,
          others,
          excelLevel,
          wordLevel,
          powerPointLevel,
          computerLevel,
          computer,
        });
      } else {
        await api.post('/students-additional-training', {
          inglesLevel,
          espanholLevel,
          othersLevel,
          others,
          excelLevel,
          wordLevel,
          powerPointLevel,
          computerLevel,
          computer,
        });
      }
      addToast({
        type: 'success',
        title: 'Dados pessoais',
        description: 'Dados gravados com sucesso.',
      });
      history.push('/students-profissional-experiences');
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
  const levelList = [
    { label: 'Selecione um nível', value: '' },
    { label: 'Não', value: 'Não' },
    { label: 'Razoável', value: 'Razoável' },
    { label: 'Bom', value: 'Bom' },
    { label: 'Avançado', value: 'Avançado' },
  ];

  return (
    <>
      <Header end={<h3>Bem vindo: {user.name} </h3>}></Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div className="card">
            <h5>Conhecimentos Adicionais</h5>
            <div className="p-col-12 p-md-4">
              <span className="p-inputgroup-addon">
                Possui Conhecimento de diomas estrangeiros?
              </span>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">Ingles</span>
                <Dropdown
                  value={inglesLevel}
                  options={levelList}
                  onChange={e => {
                    setInglesLevel(e.value);
                  }}
                  placeholder="Selecione um nível"
                  className={!inglesLevel || inglesLevel === '' ? 'p-invalid p-d-block' : ''}
                />
              </div>
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">Espanhol</span>
              <Dropdown
                value={espanholLevel}
                options={levelList}
                onChange={e => {
                  setEspanholLevel(e.value);
                }}
                placeholder="Selecione um nível"
                className={!espanholLevel || espanholLevel === '' ? 'p-invalid p-d-block' : ''}
              />
            </div>
            <div className="p-inputgroup">

              <InputText
                    value={others}
                    onChange={e => setOthers(e.currentTarget.value)}
                    placeholder="Outros"
              />
              <Dropdown
                value={othersLevel}
                options={levelList}
                onChange={e => {
                  setOthersLevel(e.value);
                }}
                placeholder="Selecione um nível"
              />
            </div>

            <div className="p-col-12 p-md-4" style={{ marginTop: '10px' }}>
              <span className="p-inputgroup-addon">
                Possui conhecimento em informática?
              </span>

              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">Word</span>
                <Dropdown
                  value={wordLevel}
                  options={levelList}
                  onChange={e => {
                    setWordLevel(e.value);
                  }}
                  placeholder="Selecione um nível"
                  className={!wordLevel || wordLevel === '' ? 'p-invalid p-d-block' : ''}
                />
              </div>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">Excel</span>
                <Dropdown
                  value={excelLevel}
                  options={levelList}
                  onChange={e => {
                  setExcelLevel(e.value);
                }}
                  placeholder="Selecione um nível"
                  className={!excelLevel || excelLevel === '' ? 'p-invalid p-d-block' : ''}
                />
              </div>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">Power Point</span>
                <Dropdown
                  value={powerPointLevel}
                  options={levelList}
                  onChange={e => {
                  setPowerPointLevel(e.value);
                }}
                  placeholder="Selecione um nível"
                  className={!powerPointLevel || powerPointLevel === '' ? 'p-invalid p-d-block' : ''}
                />
              </div>
              <div className="p-inputgroup">
                <InputText
                  value={computer}
                  onChange={e => setComputer(e.currentTarget.value)}
                  placeholder="Outros"
                />
                <Dropdown
                  value={computerLevel}
                  options={levelList}
                  onChange={e => {
                  setComputerLevel(e.value);
                  }}
                  placeholder="Selecione um nível"
                />
              </div>
            </div>
          </div>
          <Button
            className="button-next"
            type="submit"
            label="Gravar >> Sessão Experiências Profissionais"
            icon="pi pi-save"
            iconPos="right"
          />
        </Form>
      </Container>
    </>
  );
};

export default StudentAdditionalTraining;
