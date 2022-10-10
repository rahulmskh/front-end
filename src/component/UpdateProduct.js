import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompnay] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getProductDetails();
    },[]);

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:4000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompnay(result.company)
    }
    const updateProduct = async () => {
        console.log(name, price, category, company)
        let result = await fetch(`http://localhost:4000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder="Enter product price" className="inputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type="text" placeholder="Enter product category" className="inputBox"
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type="text" placeholder="Enter product company" className="inputBox"
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            />

            <button onClick={updateProduct} className="app-Button">Update</button>
        </div>
    )
}

export default UpdateProduct;