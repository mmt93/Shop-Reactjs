import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ProductList() {
    const courses = useSelector(state => state.data);
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
        dispatch({ type: 'DEL_ITEM', payload: { id: idx } });
    }

    return (
        <>
            <ul>

                {courses.map(course => {
                    return (
                        <grid>
                            <row key={course.id} className="cart_item">
                                <button key={course.id} type="button" onClick={() => removeProduct(course.id)}>-</button>
                                <span key={course.id} className="cart_item_name">{course.qty}</span>
                                <button key={course.id} type="button" onClick={() => addProduct(course.id)}>+</button>
                                <button key={course.id} type="button" onClick={() => deleteProduct(course.id)}>X</button>
                                <p>{course.id}</p>
                                <br></br>
                            </row>
                        </grid>
                    );

                }

                )}



            </ul>
        </>
    );
}

//  {/* {courses.map( course => <li><button key = {course.id}>{course.id}</button></li>)} */}