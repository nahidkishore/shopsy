import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions';
import ModalScreen from '../../components/UI/ModalScreen';
import '../../components/Style/ProductScreen.css';
import { generatePublicUrl } from '../../urlConfig';
const ProductScreen = (props) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleClose = () => {

    setShow(false);
  };

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form)).then(() => setShow(false));
    
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
      <Table style={{ fontSize: 12 }} responsive='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>

            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  onClick={() => showProductDetailsModal(product)}
                  key={product._id}
                >
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };
  const renderAddProductModal = () => {
    return (
      <ModalScreen
        show={show}
        handleClose={handleClose}
        ModalTitle={`Add New Product`}
        onSubmit={submitProductForm}
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
    );
  };

  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  };
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };
  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <ModalScreen
        show={productDetailModal}
        handleClose={handleCloseProductDetailModal}
        modalTitle={`product Details`}
        size='lg'
      >
        <Row>
          <Col md={6}>
            <label className='key'>Name</label>
            <p className='value'>{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className='key'>Price</label>
            <p className='value'>{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className='key'>Quantity</label>
            <p className='value'>{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className='key'>Category</label>
            <p className='value'>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className='key'>Description</label>
            <p className='value'>{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className='key'>Product Pictures</label>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map((picture) => (
                <div className='productImgContainer'>
                  <img src={generatePublicUrl(picture.img)} alt='' />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </ModalScreen>
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
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default ProductScreen;
