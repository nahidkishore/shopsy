import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { getProductsBySlug } from '../../actions';
import './ProductListPage.css';
import { generatePublicUrl } from '../../urlConfig';
const ProductListPage = (props) => {
  const [priceRange, setPriceRange] = useState({
    under5K: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under25k: 25000,
    under30k: 30000,
    under35k: 35000,
    under40k: 40000,
    under50k: 50000,

  })
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, [dispatch]);
  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className='card'>
            <div className='cardHeader'>
              <div>{props.match.params.slug} mobile under { priceRange[key]}</div>
              <button>View All</button>
            </div>

            <div style={{display:'flex'}}>
              {
                product.productsByPrice[key].map(product =>
                  <div className='productContainer'>
                  <div className='productImgContainer'>
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=''
                    />
                  </div>
                  <div className='productInfo'>
                      <div style={{ margin: '5px 0' }}>{ product.name}</div>
                    <div>
                      <span>4.4</span> &nbsp;
                      <span>3333</span>
                    </div>
                      <div className='productPrice'>{ product.price}</div>
                  </div>
                </div>
                  )
              }
            
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default ProductListPage;
