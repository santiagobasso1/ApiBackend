import { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/userContext';
const ItemListContainer = () => {
  const { user } = useContext(UserContext)
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/product', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data.payload)
        setProducts(data.payload);
      } catch (error) {
        setMessage("No se pudo conectar con el servidor, intente mas tarde")
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mainContainer">
      {message ? message : ""}
      {user && <div className="alert alert-primary" style={{ maxWidth: '500px', margin: '0 auto' }}>Bienvenido {user.first_name}</div>}
      <div className="row">
        {products.map(product => (
          <div className="col-12 col-md-6" key={product._id}>
            <div className="card border-light mb-3 container artifactCard">
              <div className="row">
                <div className="col-4 d-flex align-items-center justify-content-center">
                  <img src={product.thumbnails[0]} className="img-fluid" alt="..." />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h4 className="card-title itemName">{product.title}</h4>
                    <p className="card-text itemType">{product.description}</p>
                    <p className="card-text">Codigo: {product.code}</p>
                    <p className="card-text">Stock: {product.stock}</p>
                    <p className="card-text">Precio: ${product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemListContainer;
