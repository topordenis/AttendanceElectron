import logo from './logo.svg';
import './App.css';
import NavigationBar from './Components/Navigation/Navbar.js'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBContainer } from 'mdb-react-ui-kit';
import { Routes, Route, useLocation } from 'react-router-dom'
import Members from './Components/Admin/Members'
import AddMember from './Components/Admin/AddMember'
import EditMember from './Components/Admin/Member/Edit'
import Breadcrumb from './Components/Navigation/Breadcrumb'
import ViewMember from './Components/Admin/Member/View';
import Events from './Components/Admin/Events/Events';
import EditEvent from './Components/Admin/Events/Edit'
import EventAttendanceView from './Components/Admin/Events/Attendance/View'
import AddEventPage from './Components/Admin/Events/AddEvent'
import Settings from './Components/Admin/Settings/Settings'

function App() {
  let location = useLocation();

  return (

    <section  className='vh-100'>
      <NavigationBar></NavigationBar>

 
      <MDBContainer className='py-5' >
      
        <Breadcrumb></Breadcrumb>    
        <Routes location={location} key={location.pathname}>
          <Route path="/Dashboard/Members" element={<Members />} />
          <Route path="/Dashboard/Members/Add" element={<AddMember />} />
          <Route path="/Dashboard/Members/Edit" element={<EditMember />} />
          <Route path="/Dashboard/Members/View" element={<ViewMember />} />
          <Route path="/Dashboard/Events" element={<Events />} />
          <Route path="/Dashboard/Events/Edit" element={<EditEvent />} />
          <Route path="/Dashboard/Events/Attendance" element={<EventAttendanceView />} />
          <Route path="/Dashboard/Events/Add" element={<AddEventPage />} />
          <Route path="/Dashboard/Settings" element={<Settings />} />
          
        </Routes>
        

      </MDBContainer>
    </section>

  );
}

export default App;
