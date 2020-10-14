import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Menubar, MenubarProps } from 'primereact/menubar';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { Container } from './styles';

interface MenubarPrimeProps extends Readonly<MenubarProps> {
  start?: any | undefined;
  end?: any | undefined;
}

const HeaderStudent: React.FC<MenubarPrimeProps> = ({
  start = <img src={logoImg} alt="Faesb" style={{ width: '53px' }} />,
  end,
}) => {
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const items = [
    {
      label: 'Perfil',
      icon: 'pi pi-fw pi-user',
      command: () => history.push('/profile'),
    },
    {
      label: 'Currículo',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Cadastrar Currículo',
          icon: 'pi pi-fw pi-pencil',
          command: () => history.push('/students-personal-data'),
        },
        {
          label: 'Dados Pessoais',
          icon: 'pi pi-fw pi-user-edit',
          command: () => history.push('/students-personal-data'),
        },
        {
          label: 'Endereço',
          icon: 'pi pi-fw pi-home',
          command: () => history.push('/students-address'),
        },
        {
          label: 'Formação Acadêmica',
          icon: 'pi pi-fw pi-star',
          command: () => history.push('/students-academic-education'),
        },
        {
          label: 'Dados Adicionais',
          icon: 'pi pi-fw pi-list',
          command: () => history.push('/students-additional-training'),
        },
        {
          label: 'Experiências Profissionais',
          icon: 'pi pi-fw pi-sitemap',
          command: () => history.push('/students-profissional-experiences'),
        },

        {
          label: 'Imprimir',
          icon: 'pi pi-print',
          command: () => viewCurriculum(),
        },
      ],
    },
    {
      label: 'Oportunidades',
      icon: 'pi pi-heart',
      command: () => history.push('/student-opportunities'),
    },
    {
      label: 'Sair',
      icon: 'pi pi-fw pi-power-off',
      command: () => handleLogoff(),
    },
  ];

  const handleLogoff = useCallback(() => {
    signOut();
  }, []);

  async function viewCurriculum() {
    try {
      const blob = await api.get(`students-generate-curriculum`, {
        responseType: 'arraybuffer',
      });

      var newBlob = new Blob([blob.data], { type: 'application/pdf' });
      const data = window.URL.createObjectURL(newBlob);
      window.open(data, '_blank');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao gerar o currículo',
        description:
          'Verifique se todos os dados forma cadastrados.',
      });

    }

  }


  return (
    <Container>
      <div>
        <div className="card">
          <Menubar model={items} start={start} end={end} />
        </div>
      </div>
    </Container>
  );
};

export default HeaderStudent;
