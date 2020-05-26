import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import {
  addProduct,
  removeProduct,
  deleteProduct,
} from '../../actions/cartActions';

export default function Cart() {
  const courses = useSelector((state) => state.cart);
  const totals = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  function funcAddProduct(value) {
    dispatch(addProduct({ value }));
  }

  function funcRemoveProduct(value) {
    dispatch(removeProduct({ value }));
  }

  function funcDeleteProduct(value) {
    dispatch(deleteProduct({ value }));
  }

  return (
    <>
      <div className="cart">
        <h1>Meu carrinho</h1>
        {courses.data.map((course) => {
          return (
            <div className="box" key={course.id}>
              <div className="one">
                <img
                  className="imgProduct50"
                  alt=""
                  src={course.image.downloadUrl}
                />
              </div>
              <div className="two">
                <div className="splitTwo">
                  <img
                    className="arrowUp"
                    onClick={() => funcAddProduct(course.id)}
                    onKeyDown={() => funcDeleteProduct(course.id)}
                    alt=""
                    src="./arrow.svg"
                  />

                  <div className="qty">
                    <span>{course.qty}</span>
                  </div>
                  <img
                    className="arrowDown"
                    onClick={() => funcRemoveProduct(course.id)}
                    onKeyDown={() => funcDeleteProduct(course.id)}
                    alt=""
                    src="./arrow.svg"
                  />
                </div>
              </div>
              <div className="three">
                <div className="subThree">
                  <div className="threeOne">
                    <span className="titleOne">{course.title}</span>
                  </div>
                  <div className="threeTwo">
                    <span>x {course.value}</span>
                  </div>
                </div>
              </div>
              <div className="four">
                <button
                  type="button"
                  aria-label="Delete Product"
                  className="x"
                  onClick={() => funcDeleteProduct(course.id)}
                  onKeyDown={() => funcDeleteProduct(course.id)}
                />
              </div>
            </div>
          );
        })}
        <h1> Total : {totals}</h1>
      </div>
    </>
  );
}
