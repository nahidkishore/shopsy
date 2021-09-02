import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Jumbotron } from 'react-bootstrap';
const Home = () => {
  return (
    <div>
      <Layout>
        <Jumbotron style={{margin:'5rem', background:'#fff'}} className="text-center">
          <h1>Welcome to Admin Dashboard</h1>
          <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat autem magnam, aspernatur voluptas unde sint iure quis non animi voluptatem ipsa dolor labore vitae amet! Animi expedita architecto impedit veniam?</h3>
        </Jumbotron>
      </Layout>
    </div>
  );
};

export default Home;
