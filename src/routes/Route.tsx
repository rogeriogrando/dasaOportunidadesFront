import React from 'react';
import jwt_decode from "jwt-decode";

import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signOut, user } = useAuth();
  let pathRedirect: string;
  if (user) {
    if (user.category === 'aluno') {
      pathRedirect = '/dashboard-students';
    } else {
      pathRedirect = '/dashboard-company';
    }
  }


  let token = localStorage.getItem('@OportunityFaesb:token');

  if(token){
    var {exp} = jwt_decode(token);
    var dateNow = Date.now() / 1000;
    console.log(dateNow)
    console.log(exp)

    if(exp < dateNow) {
      signOut();
    }

  }

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : pathRedirect,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
