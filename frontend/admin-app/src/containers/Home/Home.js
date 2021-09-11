import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Row, Col, Container } from 'react-bootstrap';
import './Home.css'
const Home = () => {
  return (
    <div>
      <Layout>

        <Container fluid>
        <Row>
          <Col md={2} className='side-bar'>side bar</Col>
          <Col md={10} style={{marginLeft:'auto'}}>Container</Col>
        </Row>
        </Container>
        {/* <Jumbotron style={{margin:'5rem', background:'#fff'}} className="text-center">
          <h1>Welcome to Admin Dashboard</h1>
          <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat autem magnam, aspernatur voluptas unde sint iure quis non animi voluptatem ipsa dolor labore vitae amet! Animi expedita architecto impedit veniam?</h3>
        </Jumbotron> */}
      </Layout>
    </div>
  );
};

export default Home;
