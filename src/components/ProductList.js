import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom';
import './ProductList.css';
import { deleteProduct } from '../redux/actions';

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  
  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Mỗi trang có 4 sản phẩm

  // Trạng thái tìm kiếm
  const [searchTerm, setSearchTerm] = useState(''); // Lưu từ khóa tìm kiếm

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm không phân biệt chữ hoa/thường
  );

  // Xác định các sản phẩm cần hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm xóa sản phẩm
  const handleDelete = (id) => {
    dispatch(deleteProduct(id)); // Gọi action để xóa sản phẩm
  };

  return (
    <div className="container">
      <h1>Danh Sách Hàng Hóa</h1>
      <div className="search-box">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Tìm kiếm hàng hóa..." 
          value={searchTerm} // Liên kết giá trị input với state tìm kiếm
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm khi người dùng gõ
        />
        <button><Link to="/add" className="add-button">Thêm Hàng Hóa</Link></button>
      </div>

      {filteredProducts.length === 0 ? (
        <p>Không tìm thấy hàng hóa nào!</p>
      ) : (
        <ul className="product-list">
          {currentProducts.map((product) => (
            <li key={product.id} className="product-item">
              {product.name} - {product.price}
              <div className="edit-box">
                <Link to={`/edit/${product.id}`} className="edit-button">Sửa</Link>
                <button className="delete-button" onClick={() => handleDelete(product.id)}>
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Phân trang */}
      <div className="pagination">
        <button 
          className="prev-button" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}>
          Trang trước
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button 
          className="next-button" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default ProductList;
