import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';

const Signup = (props) => {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row>
                <Col md={6}>
                  <Input
                    label='First Name'
                    placeholder='First Name'
                    value=''
                    type='text'
                    onChange={() => {}}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label='Last Name'
                    placeholder='Last Name'
                    value=''
                    type='text'
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Input
                label='Email'
                placeholder='Email Address'
                value=''
                type='text'
                onChange={() => {}}
              />

              <Input
                label='Password'
                placeholder='Password'
                value=''
                type='Password'
                onChange={() => {}}
              />

              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
