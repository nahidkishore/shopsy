import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import Input from '../../components/UI/Input/Input';
import ModalScreen from '../../components/UI/ModalScreen';
import CheckboxTree from 'react-checkbox-tree';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
} from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const CategoryScreen = () => {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
  };
  const submitCategoryForm = () => {
    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);
    dispatch(addCategory(form));
    setCategoryName('');
    setParentCategoryId('');
    /* const cat = {
      categoryName,
      parentCategoryId,
      categoryImage,
    }; */
    //console.log(cat);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log(checked, expanded, categories, checkedArray, expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == 'expanded') {
      const updatedExpendedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpendedArray);
    }
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className='d-flex justify-content-around mt-2'>
              <h5>Category</h5>
              <Button variant='success' onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/*   <ul>
              {renderCategories(category.categories)}
             
            </ul> */}
            {/*  {JSON.stringify(createCategoryList(category.categories))} */}

            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant='danger'>Delete</Button>
            <Button variant='success' onClick={updateCategory}>
              Edit
            </Button>
          </Col>
        </Row>
      </Container>
      <ModalScreen
        show={show}
        handleClose={handleClose}
        modalTitle={`Add New Category`}
        onSubmit={submitCategoryForm}
      >
        <Input
          value={categoryName}
          placeholder={`Category Name`}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className='form-control'
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Select a Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input
          type='file'
          name='categoryImage'
          onChange={handleCategoryImage}
        />
      </ModalScreen>

      {/* /* edit categories*/}
      <ModalScreen
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        modalTitle={`Update Categories`}
        size='lg'
      >
        <Row>
          <Col>
            <h5>Expanded</h5>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Category Name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      'name',
                      e.target.value,
                      index,
                      'expanded'
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className='form-control'
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      'parentId',
                      e.target.value,
                      index,
                      'expanded'
                    )
                  }
                >
                  <option>Select a Category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <Col>
                  <select className='form-control'>
                    <option value=''>Select Type</option>
                    <option value='store'>Store</option>
                    <option value='product'>Product</option>
                    <option value='page'>Page</option>
                  </select>
                </Col>
              </Col>
            </Row>
          ))}
        <h5>Checked category</h5>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Category Name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      'name',
                      e.target.value,
                      index,
                      'checked'
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className='form-control'
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      'parentId',
                      e.target.value,
                      index,
                      'checked'
                    )
                  }
                >
                  <option>Select a Category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <Col>
                  <select className='form-control'>
                    <option value=''>Select Type</option>
                    <option value='store'>Store</option>
                    <option value='product'>Product</option>
                    <option value='page'>Page</option>
                  </select>
                </Col>
              </Col>
            </Row>
          ))}
      </ModalScreen>
    </Layout>
  );
};

export default CategoryScreen;
