import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import DetailProduct from '../components/layout/DetailProduct';
import { FirebaseContext } from '../firebase';


const Home = () => {

  const [ products, setProducts ] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect( () => {
    const getProducts = () => {
      firebase.db.collection('products').orderBy('createdAt','desc').onSnapshot(manageSnapshot)
    }
    getProducts();
  }, []);

  function manageSnapshot(snapshot){
    const products = snapshot.docs.map( doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setProducts(products);
  }

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {products.map(product => (
                <DetailProduct 
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  
  )

}

export default Home
