import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';

export default function Cart() {
    const courses = useSelector(state => state.data);
    // const items = useSelector(state => state.items);
    const dispatch = useDispatch();

    function addProduct(value) {
        const idx = value;
        dispatch({ type: 'ADD_QTY', payload: { id: idx } });
    }

    function removeProduct(value) {
        const idx = value;
        dispatch({ type: 'RMV_QTY', payload: { id: idx } });
    }

    function deleteProduct(value) {
        const idx = value;
        // const objIndex = items.findIndex((obj => obj.id === idx));
        dispatch({ type: 'DEL_ITEM', payload: { id: idx } });
        // items[objIndex].status = true;
    }

    return (
        <>
        <div className="cart">
            <h1>Meu carrinho</h1>
            {courses.map(course => {
                return (
                    /* <ul key={course.id}>
                        <button type="button" onClick={() => removeProduct(course.id)}>-</button>
                        <span className="cart_item_name">{course.qty}</span>
                        <button type="button" onClick={() => addProduct(course.id)}>+</button>
                        <button type="button" onClick={() => deleteProduct(course.id)}>X</button>
                        <p>{course.id}</p>
                        <br></br>
                    </ul> */
                    <div class="box" key={course.id}>
                        <div className="one">
                            <img className="imgProduct50" alt = "" src={course.image.downloadUrl}></img>
                        </div>
                        <div className="two">
                            <div className="splitTwo">
                                <img className="arrowUp" onClick={() => addProduct(course.id)} alt ="" src="./arrow.svg"></img>
                                <div className="qty"><span>{course.qty}</span></div>
                                <img className="arrowDown" onClick={() => removeProduct(course.id)} alt="" src="./arrow.svg"></img>
                            </div>
                        </div>
                        <div className="three">
                            <div className = "subThree">
                                <div className = "threeOne">
                                    <span className="titleOne">{course.title}</span>
                                </div>
                                <div className = "threeTwo">
                                    <span>x {course.value}</span>
                                </div>
                            </div>
                        </div>
                        <div className="four">
                            <button className="x" onClick={() => deleteProduct(course.id)} ></button>
                        </div>
                    </div>
                );
            }
            )}



</div>
        </>
    );
}

//  {/* {courses.map( course => <li><button key = {course.id}>{course.id}</button></li>)} */}