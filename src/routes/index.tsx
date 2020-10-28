import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import ActivateAccount from '../pages/ActivateAccount';
import SignUpStudents from '../pages/SignUpStudents';
import SignUpCompany from '../pages/SignUpCompany';
import ForgotPassod from '../pages/ForgotPassod';
import ResetPassword from '../pages/ResetPassword';
import DashboardStudents from '../pages/DashboardStudents';
import DashboardCompany from '../pages/DashboardCompany';
import StudentPersonalData from '../pages/StudentPersonalData';
import StudentAddress from '../pages/StudentAddress';
import StudentAcademicEducation from '../pages/StudentAcademicEducation';
import StudentAdditionalTraining from '../pages/StudentAdditionalTraining';
import StudentProfessionalExperiences from '../pages/StudentProfessionalExperiences';
import StudentOpportunities from '../pages/StudentOpportunities';
import DashboardStudentsActive from '../pages/DashboardStudentsActive';
import DashboardCompanyActive from '../pages/DashboardCompanyActive';
import DashboardAbout from '../pages/DashboardAbout';

import CompanyJobs from '../pages/CompanyJobs';
import CompanyJobsInactive from '../pages/CompanyJobsInactive';
import Profile from '../pages/Profile';
import ProfileCompany from '../pages/ProfileCompany';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard-about" exact component={DashboardAbout}/>
    <Route path="/dashboard-students-active" exact component={DashboardStudentsActive} />
    <Route path="/dashboard-company-active" exact component={DashboardCompanyActive} />
    <Route path="/activateaccount" component={ActivateAccount} />
    <Route path="/signupaluno" component={SignUpStudents} />
    <Route path="/signupempresa" component={SignUpCompany} />
    <Route path="/dashboard-students" component={DashboardStudents} isPrivate />
    <Route path="/dashboard-company" component={DashboardCompany} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/profile-company" component={ProfileCompany} isPrivate />
    <Route path="/forgot-password" component={ForgotPassod} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route
      path="/students-personal-data"
      component={StudentPersonalData}
      isPrivate
    />
    <Route path="/students-address" component={StudentAddress} isPrivate />
    <Route
      path="/students-academic-education"
      component={StudentAcademicEducation}
      isPrivate
    />
    <Route
      path="/students-additional-training"
      component={StudentAdditionalTraining}
      isPrivate
    />
    <Route
      path="/students-profissional-experiences"
      component={StudentProfessionalExperiences}
      isPrivate
    />

    <Route
      path="/student-opportunities"
      component={StudentOpportunities}
      isPrivate
    />

    <Route path="/company-jobs" component={CompanyJobs} isPrivate />
    <Route path="/company-jobs-inactive" component={CompanyJobsInactive} isPrivate />
  </Switch>
);

export default Routes;
