import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Menubar, MenubarProps } from 'primereact/menubar';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

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
  const history = useHistory();

  const items = [
    {
      label: 'Perfil',
      icon: 'pi pi-fw pi-user',
      command: () => history.push('/profile-company'),
    },
    {
      label: 'Vagas',
      icon: 'pi pi-fw pi-heart',
      items: [
        {
          label: 'Ativas',
          icon: 'pi pi-fw pi-eye',
          command: () => history.push('/company-jobs'),
        },
        {
          label: 'Inativas',
          icon: 'pi pi-fw pi-eye-slash',
          command: () => history.push('/company-jobs-inactive'),
        },
      ],
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
