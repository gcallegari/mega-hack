import React from 'react'
import '../styles/pages/landing.css';
import Imagem3 from '../images/image3.png';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function Landing() {
    return (        
        <Container>
        <Row>
          <Col className="text-style">
            <div className="div-style">
              <h2 className="txt">Ideia de 1 
                  <img src={Imagem3}/>ão</h2>
              <a className="txt">Ideias que podem ajudar alguém a ter uma vida melhor.</a>
            </div>
            <div>
            <Link to="/app" className="enter-app">
            <Button variant="outline-warning" className="see-idea-button btn1">Ver ideias</Button>  
            </Link>

            <Link to="/Ideas/create" className="enter-app">
            <Button variant="warning" className="see-idea-button">Novas ideias</Button>
            </Link>

            
          
            </div>
         </Col>
        </Row>
  
  
      </Container>
    );
}

export default Landing;