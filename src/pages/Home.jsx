import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function fetchProductsData() {
    setLoading(true);
    try {
      const output = await fetch(API_URL);
      const data = await output.json();
      console.log(data);
      setProducts(data);
    } 
    catch (err) {
      console.log(err);
      setProducts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="mb-3">
      {
      loading ? 
      (
        <Spinner />
      ) : 
      products.length > 0 ? (
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
          {
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
          }
        </div>
      ) : (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="text-4xl font-bold" >No Internet Connection</div>
        </div>
      )}
    </div>
  );
};

export default Home;
