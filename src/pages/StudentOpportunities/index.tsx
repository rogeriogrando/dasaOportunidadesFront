import React, { useState, useRef, useEffect } from 'react';
import { FormHandles } from '@unform/core';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';

import { useToast } from '../../hooks/toast';
import { Container } from './styles';
import { useHistory } from 'react-router-dom';

import Header from '../../components/HeaderStudent';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface IJob {
  company: {
    name: string
    email: string
  };
  id: number;
  office: string;
  applicationDeadline: Date;
}

const StudentOpportunities: React.FC = () => {
  const { signOut, user } = useAuth();

  const { addToast } = useToast();
  const history = useHistory();
  const [dialog, setDialog] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobExist, setJobExist] = useState<number>();
  const [company, setCompany] = useState([]);
  const [emailCompany, setEmailCompany] = useState('');
  const [companyJobsId, setCompanyJobsId] = useState<number>();
  const [office, setOffice] = useState('');
  const [mainAtributions, setMainAtributions] = useState('');
  const [workload, setWorkload] = useState(undefined);
  const [workSchedule, setWorkSchedule] = useState('');
  const [benefits, setBenefits] = useState('');
  const [remuneration, setRemuneration] = useState<string | undefined>();
  const [remunerationSave, setRemunerationSave] = useState<number | undefined>();
  const [requirements, setRequirements] = useState('');
  const [desirable, setDesirable] = useState('');
  const [minimumAge, setMinimumAge] = useState<string | undefined>();
  const [minimumAgeSave, setMinimumAgeSave] = useState<number | undefined>();
  const [maximumAge, setMaximumAge] = useState<string | undefined>();
  const [maximumAgeSave, setMaximumAgeSave] = useState<number | undefined>();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (user.category !== 'aluno') {
      signOut();
    }
    async function getJobs() {
      try {
        const { data } = await api.get('/student-jobs');
        data.map( (items: any)  => {
          const newDateFormat =
          items.applicationDeadline.substr(8, 2) +
          '/' +
          items.applicationDeadline.substr(5, 2) +
          '/' +
          items.applicationDeadline.substr(0, 4);
          items.applicationDeadline = newDateFormat
        })
        setJobs(data);
      } catch (error) {}
    }
    getJobs();
  }, []);

  function hideDialog() {
  }

  function hideOffDialog() {
    setDialog(false);
  }

  function renderFooter(name: string) {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => {
            setDialog(false);
          }}
          className="p-button-text"
        />
        {jobExist === 1 ?
          <Button
            className="p-button-success"
            label="Já cadastrado"
            icon="pi pi-check-circle"
            autoFocus
            disabled
          /> :
          <Button
            label="Concorrer"
            icon="pi pi-check"
            onClick={handleSubmit}
            autoFocus
          />
        }

      </div>
    );
  }

  async function details(id: number) {
    try {

      setDialog(true);
      const { data } = await api.get('/student-jobs/' + id);

      console.log(data);
      setCompanyJobsId(id);
      setJobExist(data.push.jobExist);
      setCompany(data.company.name);
      setEmailCompany(data.company.email);
      setOffice(data.office);
      setMainAtributions(data.mainAtributions);
      setWorkload(data.workload);
      setWorkSchedule(data.workSchedule);
      setBenefits(data.benefits);
      setRemuneration(data.remuneration ? `R$ ${data.remuneration},00` : 'A combinar');
      setRemunerationSave(data.remuneration);
      setRequirements(data.requirements);
      setDesirable(data.desirable);
      setMinimumAge(data.minimumAge ? data.minimumAge : 'Não informada');
      setMaximumAge(data.maximumAge ? data.maximumAge : 'Não informada');
      setMinimumAgeSave(data.minimumAge);
      setMaximumAgeSave(data.maximumAge);

    } catch (error) {}



  }

  async function deleteApplication(rowData: any) {
    const { id } = rowData;
    // const response = await api.delete(
    //  '/students-profissional-experiences/' + id,
    // );
    //setExperiencesLoad(response.data);
  }

  function jobTemplate(jobs: IJob) {

    return (
        <div className="job-item">
            <div className="job-item-content">
                <div>
                    <h2 className="p-mb-1">{jobs.company.name}</h2>
                    <h4 className="p-mb-1">Cargo: {jobs.office}</h4>
                    <h4 className="p-mb-1">Valido até: {jobs.applicationDeadline}</h4>
                </div>
                <div className="car-buttons">
                  <Button
                    icon="pi pi-bookmark"
                    className="p-button-help"
                    onClick={() => details(jobs.id)}
                    >
                    Detalhes
                  </Button>
                </div>
            </div>
        </div>

    );
  }

  const responsiveOptions = [
    {
      breakpoint: '1604px',
      numVisible: 4,
      numScroll: 4
    },
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
    }
];


  async function handleSubmit() {
    try {
      formRef.current?.setErrors({});

      await api.post('/student-jobs', {
        companyJobsId,
        company,
        office,
        mainAtributions,
        workload,
        workSchedule,
        benefits,
        remuneration: remunerationSave,
        requirements,
        desirable,
        minimumAge: minimumAgeSave,
        maximumAge: maximumAgeSave,
      });
console.log(emailCompany)

      await api.post('/student-send-curriculum', {
        companyJobsId,
        nameCompany: company,
        emailCompany,
        office,
      });

      addToast({
        type: 'success',
        title: 'Boa sorte',
        description: 'Sua sua solicitação foi encaminhada.',
      });
      setDialog(false);
      history.push('/student-opportunities');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na solicitação',
        description: 'Ocorreu ao gravar sua solicitação. Tente novamente',
      });
    }
  }

  return (
    <>
      <Header end={<h3>Bem vindo: {user.name} </h3>}></Header>
      <Container>
        <div className="card">
            <Carousel
              value={jobs}
              numVisible={3}
              numScroll={1}
              responsiveOptions={responsiveOptions}
              className="custom-carousel"
              circular
              autoplayInterval={5000}
              itemTemplate={jobTemplate}
              header={<h5>Vagas em aberto!!!</h5>} />
        </div>

        <Dialog
          visible={dialog}
          style={{ width: '650px'}}
          header={company}
          modal
          className="p-fluid"
          onHide={hideOffDialog}
          footer={renderFooter('displayBasic')}
        >
          <div className="p-field">
            <table>
              <tr>
                <td>
                <h4>Cargo: </h4>
                </td>
                <td>
                <span>{office}</span>
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <td>
                  <h4>Principais Atribuições: </h4>
                  <span>{mainAtributions}</span>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <h4>Carga Horária Semanal: </h4>

                </td>
                <td>
                <span>{workload}</span>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <h4>Horário de Trabalho: </h4>

                </td>
                <td>
                <span>{workSchedule}</span>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <h4>Remuneração:</h4>
                </td>
                <td>
                <span>{remuneration}</span>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <h4>Benefícios:</h4>
                  <span>{benefits}</span>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <h4>Requisitos Mínimos:</h4>
                  <span>{requirements}</span>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <h4>Requisitos Desejáveis:</h4>
                  <span>{desirable}</span>
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <h4>Idade mínima:</h4>
                </td>
                <td>
                  <span>{minimumAge}</span>
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <td>
                  <h4>Idade máxima:</h4>
                </td>
                <td>
                  <span>{maximumAge}</span>
                </td>
              </tr>
            </table>
          </div>
        </Dialog>
      </Container>
    </>
  );
};

export default StudentOpportunities;

