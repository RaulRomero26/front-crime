import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { QrPage } from "../../pages";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useAuthStore } from '../../../hooks/auth/useAuthStore';

import Logo1 from "../../../assets/2.png";
import './CustomNavbar.css'

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
            <Navbar.Brand className='ms-5' href="#home">
              <img src={Logo1} alt="Logo" style={{ width: '40px', height: 'auto' }} />
              <span className="crimeiq-text">CrimeIQ</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
            <Navbar.Collapse id="basic-navbar-nav" className={expanded ? 'show' : ''}>
              <Nav className="mr-auto"> 
                <Nav.Link as={NavLink} to={'qr'}>QR TRACK</Nav.Link>
                <Nav.Link as={NavLink} to={'reportes'}>REPORTES</Nav.Link>
                <Nav.Link as={NavLink} to={'tareas'}>TAREAS</Nav.Link>
                <Nav.Link as={NavLink} to={'catalogos'}>CATALOGOS</Nav.Link>
                <Nav.Link as={NavLink} to={'usuarios'}>USUARIOS</Nav.Link>
                <button className='float-end btn btn-danger' onClick={startLogout}>Salir</button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row className='espaciopagina'>
        <Col className='mt-5'>
          <Routes>
            <Route path={'qr'} element={<QrPage/>}/>
            {/* <Route path={'reportes'} element={<ReportePage/>}/>
            <Route path={'tareas'} element={<TareasPage/>}/>
            <Route path={'catalogos'} element={<CatalogosPage/>}/>
            <Route path={'usuarios'} element={<UsuariosPage/>}/> */}
            <Route path={'*'} element={<QrPage/>}/>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomNavbar;

