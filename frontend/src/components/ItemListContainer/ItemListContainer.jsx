import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css'
import { getProductos, cargarBDD } from '../../assets/firebase';
const ItemListContainer = () => {
    //cargarBDD();
    const [productos, setProductos] = useState([]);
    const {categoria}=useParams();

    useEffect(() => {
        if (categoria){
            getProductos().then(products => {
            const productList  = products.filter(prod => prod.stock > 0).filter(prod=> prod.idCategoria===categoria);
            const cardProductos = ItemList({productList})
            setProductos(cardProductos);
            });
        }else{
            getProductos().then(products => {
            const productList  = products.filter(prod => prod.stock > 0);
            const cardProductos = ItemList({productList})
            setProductos(cardProductos); 
        });
    }
    }, [categoria]);
    return (
        <div className= 'row cardProductos' >
            {productos}
        </div>
    );
}

export default ItemListContainer;
