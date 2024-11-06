// AddProduct.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css'

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Sử dụng useNavigate thay cho useHistory

  const handleAddProduct = () => {
    if (name && price) {
      const newProduct = {
        id: Date.now(),  // Sử dụng ID duy nhất, có thể dùng UUID hoặc một cách khác
        name,
        price,
      };
      dispatch(addProduct(newProduct));
      navigate('/');  // Quay lại trang danh sách sau khi thêm
    }
  };

  return (
    <div className="container">
      <h1>Thêm Sản Phẩm</h1>
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Giá sản phẩm"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{marginLeft: '158px'}}
      />
      <button onClick={handleAddProduct} style={{backgroundColor:'#45a049',color:'#fff'}}>Thêm</button>
      <button onClick={() => navigate('/')} className="cancel-button" style={{width:'100%'}}>Quay lại</button>
    </div>
  );
};

export default AddProduct;
