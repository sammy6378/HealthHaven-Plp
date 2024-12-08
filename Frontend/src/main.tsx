import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' 

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './forms/login.tsx'
import Register from './forms/register.tsx'
import {  store} from './store/Store.tsx'
import { Provider } from 'react-redux'
import { HelmetProvider } from "react-helmet-async";
import Error from './Dashboard/DoctorDash/pages/Error.tsx'

import Form from './forms/component/form.tsx'
import Dashboard from './Dashboard/DoctorDash/Dashboard.tsx'
import DashLayout from './Dashboard/DoctorDash/Components/DashLayout.tsx'
import PatientList from './Dashboard/DoctorDash/pages/Patients.tsx'
import SettingsPage from './Dashboard/DoctorDash/pages/Settings.tsx'
import PatientDetails from './Dashboard/DoctorDash/pages/PatientDetails.tsx'


import Dash from './Dashboard/UsersDash/Dash.tsx'
import AppointmentPage from './Dashboard/UsersDash/pages/AppointmentPage.tsx'
import BillingPage from './Dashboard/UsersDash/pages/Billings.tsx'
import DoctorSearch from './Dashboard/UsersDash/pages/doctor/FindDoctor.tsx'
import MedicalRecordsPage from './Dashboard/UsersDash/pages/MedicalRecords.tsx'
import MedicalRecordDetails from './Dashboard/UsersDash/pages/RecordDetails.tsx'
import DashboardUi from './Dashboard/UsersDash/pages/Frontpage.tsx'
import NotificationPanel from './Dashboard/UsersDash/pages/Notifications.tsx'
import ProtectedRoute from './forms/Auth/ProtectedRoute.tsx'
import App from './app.tsx'
import PrivacyPolicy from './Healthcare/PrivacyPolicy.tsx'
import TermsAndConditions from './Healthcare/terms.tsx'
import Page from './Healthcare/component/page.tsx'
import NotificationsPage from './Dashboard/UsersDash/Components/notificationPage.tsx'
import ProfilePage from './Dashboard/UsersDash/pages/Profile.tsx'
import PDashboard from './Dashboard/pharmacy/Dashboard.tsx'
import PLayout from './Dashboard/pharmacy/PLayout.tsx'
import MedicineInventory from './Dashboard/pharmacy/Medicine.tsx'
import Users from './Dashboard/pharmacy/Users.tsx'
import Settings from './Dashboard/pharmacy/Settings.tsx'
import Notifications from './Dashboard/pharmacy/notificationPage.tsx'
import AppointmentTable from './Dashboard/DoctorDash/pages/AppointmentTable.tsx'
import Prescriptions from './Dashboard/DoctorDash/pages/Prescriptions.tsx'
import Medicines from './Dashboard/DoctorDash/pages/Medicines.tsx'
import MedicineForm from './Dashboard/pharmacy/component/MedicineForm.tsx'
import PrescriptionForm from './Dashboard/DoctorDash/Components/PrescriptionForm.tsx'
import ALayout from './Dashboard/Admin/components/ALayout.tsx'
import DashboardAdmin from './Dashboard/Admin/DashboardAdmin.tsx'
import Modal from './Dashboard/Admin/components/DoctorsForm.tsx'
import UserTable from './Dashboard/Admin/pages/UsersTable.tsx'
import DoctorsManagement from './Dashboard/Admin/pages/DoctorsTable.tsx'
import CreateUser from './Dashboard/Admin/components/usersForm.tsx'
import ChangePassword from './Dashboard/Admin/pages/changePassword.tsx'
import ResetPassword from './forms/component/ChangePassword.tsx'
import ResetPasswordEmail from './forms/component/resetpassword.tsx'




const router = createBrowserRouter([

  {
    path: '/',
    element:<App /> ,
    errorElement: <Error />,
  },

  {
    path: '/Harar_privacy_policy',
    element:<Page ><PrivacyPolicy /></Page> ,
    errorElement: <Error />,
  },

  {
    path: '/Harar_terms&conditions',
    element: <Page><TermsAndConditions /></Page> ,
    errorElement: <Error />,
  },

  {
    path: '/register',
    element: <Form><Register /></Form>,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Form><Login /></Form>,
    errorElement: <Error />,
  },
  {
    path: '/change-password',
    element: <ResetPassword />,
    errorElement: <Error />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordEmail />,
    errorElement: <Error />,
  },

  // doctors dashboard
  {
    path: '/doctor-dashboard',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><DashLayout/></Dashboard></ProtectedRoute>,
    errorElement: <Error />,
  },
  {
    path: '/doctor-dashboard/appointments',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><AppointmentTable /></Dashboard></ProtectedRoute>,
    errorElement: <Error />,
  },

  {
    path: '/doctor-dashboard/prescriptions',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><Prescriptions /></Dashboard></ProtectedRoute>,
    errorElement: <Error />,
  },
  
  {
    path: '/doctor-dashboard/patient-lists',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><PatientList /></Dashboard></ProtectedRoute>,
    errorElement: <Error />,
  },
  {
    path: '/doctor-dashboard/settings',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><SettingsPage /></Dashboard></ProtectedRoute>,
    errorElement: <Error />,
  },
  
  {
    path: '/doctor-dashboard/patient-list/more-details',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><PatientDetails /></Dashboard></ProtectedRoute>,
    errorElement: <Error />,
  },
  {
    path: '/doctor-dashboard/appointment-notifications',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><AppointmentTable /></Dashboard></ProtectedRoute>,
    errorElement: <Error />,
  },

  {
    path: '/doctor-dashboard/all-medicines',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><Medicines /></Dashboard></ProtectedRoute>,
    errorElement: <Error />,
  },
  {
    path:'/doctor-dashboard/prescriptions-fill-out-form',
    element: <ProtectedRoute requiredRole='doctor'><Dashboard><PrescriptionForm /></Dashboard></ProtectedRoute> ,
    errorElement: <Error />,
  },

  // user dashboard
  {
    path: '/user-dashboard',
    element: <Dash><DashboardUi /></Dash>,
    errorElement: <Error />,
  },
  {
    path: '/user-dashboard/appointments',
    element: <Dash><AppointmentPage /></Dash>,
    errorElement: <Error />,
  },
  {
    path: '/user-dashboard/settings',
    element: <Dash><SettingsPage /></Dash>,
    errorElement: <Error />,
  },
  {
    path: '/user-dashboard/billings',
    element: <Dash><BillingPage /></Dash>,
    errorElement: <Error />,
  },
  {
    path: '/user-dashboard/find-doctor',
    element: <Dash><DoctorSearch /></Dash>,
    errorElement: <Error />,
  },
  {
    path: '/user-dashboard/medical-records',
    element: <Dash><MedicalRecordsPage /></Dash>,
    errorElement: <Error />,
  },
  {
    path: '/dashboard/medical-records/more-details',
    element: <Dash><MedicalRecordDetails /></Dash>,
    errorElement: <Error />,
  },
  {
    path:'/user-dashboard/notifications',
    element: <Dash> <NotificationPanel setUnreadCount={() => {}} /> </Dash>,
    errorElement: <Error />,
  },

  {
    path:'/user-dashboard/notifications-page',
    element: <Dash> <NotificationsPage /> </Dash>,
    errorElement: <Error />,
  },
  {
    path:'/user-dashboard/profile-page',
    element: <Dash> <ProfilePage /> </Dash>,
    errorElement: <Error />,
  },

  {
    path:'/pharmacy-dashboard',
    element: <PLayout><PDashboard /></PLayout> ,
    errorElement: <Error />,
  },
  {
    path:'/pharmacy-dashboard/medicine',
    element: <PLayout><MedicineInventory /></PLayout> ,
    errorElement: <Error />,
  },
  {
    path:'/pharmacy-dashboard/Prescriptions',
    element: <PLayout><Users /></PLayout> ,
    errorElement: <Error />,
  },
  {
    path:'/pharmacy-dashboard/settings',
    element: <PLayout><Settings /></PLayout> ,
    errorElement: <Error />,
  },
  {
    path:'/pharmacy-dashboard/notifications',
    element: <PLayout><Notifications setUnreadCount={() => {}} /></PLayout> ,
    errorElement: <Error />,
  },
  {
    path:'/pharmacy-dashboard/medicine-fill-out-form',
    element: <PLayout><MedicineForm /></PLayout> ,
    errorElement: <Error />,
  },
  
//  admin dashboard


{
  path: '/admin-dashboard',
  element: <ProtectedRoute requiredRole='admin'><ALayout><DashboardAdmin /></ALayout></ProtectedRoute> ,
  errorElement: <Error />,
},
{
  path: '/admin-dashboard/create-doctors',
  element: <ProtectedRoute requiredRole='admin'><ALayout><Modal /></ALayout></ProtectedRoute> ,
  errorElement: <Error />,
},
{
  path: '/admin-dashboard/all-users',
  element: <ProtectedRoute requiredRole='admin'><ALayout><UserTable /></ALayout></ProtectedRoute> ,
  errorElement: <Error />,
},
{
  path: '/admin-dashboard/all-doctors',
  element: <ProtectedRoute requiredRole='admin'><ALayout><DoctorsManagement /></ALayout></ProtectedRoute> ,
  errorElement: <Error />,
},
{
  path: '/admin-dashboard/create-user',
  element: <ProtectedRoute requiredRole='admin'><ALayout><CreateUser /></ALayout></ProtectedRoute> ,
  errorElement: <Error />,
},
{
  path: '/admin-dashboard/settings',
  element: <ProtectedRoute requiredRole='admin'><ALayout><ChangePassword /></ALayout></ProtectedRoute> ,
  errorElement: <Error />,
}

])
 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)