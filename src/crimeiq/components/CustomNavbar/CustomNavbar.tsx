import { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { QrPage, TareasPage, UsuariosPage } from "../../pages";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAuthStore } from '../../../hooks/auth/useAuthStore';

import Logo1 from "../../../assets/2.png";
import './CustomNavbar.css'
import ReportesIncidenciaPage from '../../pages/ReportesIncidenciaPage/ReportesIncidenciaPage';
import { CatalogosPage } from '../../pages/CatalogosPage/CatalogosPage';

export const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const {startLogout} = useAuthStore();

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
           <Navbar.Brand className='ms-5' as={Link} to="/">
              <img src={Logo1} alt="Logo" style={{ width: '40px', height: 'auto' }} />
              <span className="crimeiq-text">CrimeIQ</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
            <Navbar.Collapse id="basic-navbar-nav" className={expanded ? 'show' : ''} style={{display: 'flex', justifyContent: 'space-between'}}>
              <Nav> 
                <Nav.Link as={NavLink} to={'qr'}>QR TRACK</Nav.Link>
                <Nav.Link as={NavLink} to={'reportes'}>REPORTES</Nav.Link>
                <Nav.Link as={NavLink} to={'tareas'}>TAREAS</Nav.Link>
                <Nav.Link as={NavLink} to={'catalogos'}>CATALOGOS</Nav.Link>
                <Nav.Link as={NavLink} to={'usuarios'}>USUARIOS</Nav.Link>
              </Nav>
              <button className='btn btn-danger me-5' onClick={startLogout}>Salir</button>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row className='espaciopagina'>
        <Col className='mt-5'>
          <Routes>
            <Route path={'/qr'} element={<QrPage/>}/>
            <Route path='/tareas' element={<TareasPage/>}/>
            <Route path={'/reportes'} element={<ReportesIncidenciaPage/>}/>
            <Route path={'/usuarios'} element={<UsuariosPage/>}/>
            <Route path={'/catalogos'} element={<CatalogosPage/>}/>
            <Route path="*" element={<QrPage />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomNavbar;

