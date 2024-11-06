import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../redux/actions';  // Cập nhật sản phẩm
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();  // Lấy ID sản phẩm từ URL
  const products = useSelector((state) => state.products);
  const product = products.find((p) => p.id === parseInt(id));  // Tìm sản phẩm theo ID
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State để lưu thông tin nhập vào
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Khi sản phẩm có dữ liệu, load thông tin vào form
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    } else {
      navigate('/');  // Nếu không tìm thấy sản phẩm, quay lại trang danh sách
    }
  }, [product, navigate]);

  const handleSave = () => {
    if (name && price) {
      dispatch(updateProduct({ ...product, name, price }));
      navigate('/');  // Quay lại trang danh sách sản phẩm
    }
  };

  return (
    <div className="edit-container">
      <h1>Chỉnh Sửa Sản Phẩm</h1>
      <div className="form-group">
        <label htmlFor="name">Tên sản phẩm:</label>
        <input
          id="name"
          type="text"
          placeholder="Nhập tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Giá sản phẩm:</label>
        <input
          id="price"
          type="text"
          placeholder="Nhập giá sản phẩm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleSave} className="save-button">Lưu thay đổi</button>
        <button onClick={() => navigate('/')} className="cancel-button">Hủy</button>
      </div>
    </div>
  );
};

export default EditProduct;
