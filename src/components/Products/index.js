import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './index.css';
import { insertCart } from '../../actions/cartActions';

const myQuery = gql`
  query($content: String!) {
    productsList(first: 20, filter: { subcategory: { contains: $content } }) {
      items {
        id
        title
        value
        image {
          downloadUrl
        }
        typePrice
        maxProducts
        qty
        status
        category
        subcategory
      }
    }
  }
`;

function ProductList() {
  const dataCart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();

  function disabledCheck(value) {
    if (!dataCart.find((idx) => idx.productId === value)) {
      return false;
    } else {
      return true;
    }
  }

  function funcInsertCart(value, allItems) {
    const idAdd = allItems.find((idx) => idx.id === value);

    if (!dataCart.find((idx) => idx.productId === value)) {
      idAdd.id = value;
    } else {
      idAdd.id = Object.keys(dataCart).length;
    }
    idAdd.productId = idAdd.id;
    dispatch(insertCart({ idAdd }));
  }

  let capiche = useSelector((state) => state.cart.showCase);
  capiche = Object.values(capiche)[0];

  const { loading, error, data } = useQuery(myQuery, {
    variables: { content: capiche },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="wrapper">
        {data.productsList.items.map((item) => (
          <div className="root">
            <img
              className="imgProduct"
              src={item.image.downloadUrl}
              alt={item.title}
            />
            <p className="title">{item.title}</p>
            <div className="row">
              <div className="column">
                <p className="price">
                  {item.value}/{item.typePrice}
                </p>
              </div>
              <div className="column">
                <div className="par">
                  <button
                    type="button"
                    aria-label="Add Product"
                    disabled={disabledCheck(item.id)}
                    onClick={() =>
                      funcInsertCart(item.id, data.productsList.items)
                    }
                    className="circular"
                  />
                  <button
                    type="button"
                    aria-label="Add Product"
                    disabled={disabledCheck(item.id)}
                    onClick={() =>
                      funcInsertCart(item.id, data.productsList.items)
                    }
                    className="circular"
                  />
                  <button
                    className="comprar"
                    type="button"
                    aria-label="Add Product"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default ProductList;
