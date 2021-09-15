import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import ModalScreen from '../../components/UI/ModalScreen';
const ProductScreen = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const handleClose = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const renderProducts = () => {
    return (
      <Table responsive='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className='d-flex justify-content-around mt-2'>
              <h5>Product</h5>
              <Button variant='success' onClick={handleShow}>
                Add Product
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      <ModalScreen
        show={show}
        handleClose={handleClose}
        ModalTitle={`Add New Product`}
      >
        <Input
          label='Name'
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label='Quantity'
          value={quantity}
          placeholder={`Product Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label='Price'
          value={price}
          placeholder={`Product Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label='Description'
          value={description}
          placeholder={`Product Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className='form-control'
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select a Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type='file'
          name='productPicture'
          onChange={handleProductPictures}
        />
      </ModalScreen>
    </Layout>
  );
};

export default ProductScreen;
