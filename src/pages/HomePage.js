import React,{useState,useEffect} from 'react'
import Layout from "../Components/Layout";
import { Prices } from '../Components/Prices';
import axios from 'axios';
import{Button, Checkbox,Radio} from "antd";
import { navigate, useNavigate } from 'react-router';
import { useCart } from '../context/cart';
import toast from "react-hot-toast";
import "../Styles/HomePage.css";

const HomePage = () => {
const navigate= useNavigate();
const[cart,setCart]=useCart();
  const[products,setProducts]=useState([]);
  const[categories,setCategories]=useState([]);
  const[checked,setChecked]=useState([]);
const[radio,setRadio]=useState([]);
const[total,setTotal]=useState(0);
const[page,setPage]=useState(1);
const[loading,setLoading]=useState(false);




const getAllCategory = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-category");
    if (data?.success) {
      setCategories(data?.category);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getAllCategory();
  getTotal();
}, []);
//get products
const getAllProducts = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts(data.products);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

//getTOtal COunt
const getTotal = async () => {
  try {
    const { data } = await axios.get("/api/v1/product/product-count");
    setTotal(data?.total);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (page === 1) return;
  loadMore();
}, [page]);
//load more
const loadMore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
    setLoading(false);
    setProducts([...products, ...data?.products]);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

// filter by cat
const handleFilter = (value, id) => {
  let all = [...checked];
  if (value) {
    all.push(id);
  } else {
    all = all.filter((c) => c !== id);
  }
  setChecked(all);
};
useEffect(() => {
  if (!checked.length || !radio.length) getAllProducts();
}, [checked.length, radio.length]);

useEffect(() => {
  if (checked.length || radio.length) filterProduct();
}, [checked, radio]);

//get filterd product
const filterProduct = async () => {
  try {
    const { data } = await axios.post("/api/v1/product/product-filters", {
      checked,
      radio,
    });
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <Layout title={" All Products-Best Offers"}>
      <div className='row'>
<div className='col-md-2'>
  <h4 className='text-center'>Filter by Category</h4>
  <div className='d-flex flex-column'>
  {categories?.map(c=>(
    <Checkbox key = {c._id} onChange={(e)=>handleFilter(e.target.checked, c._id)}>
      {c.name}
    </Checkbox>
 
  ))}
  </div>
  {/*price filter*/}
  <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          

          <div className='d-flex flex-column'>
            <Button className='btn btn-danger' onClick={()=>window.location.reload()}>RESET FILTERS</Button>
          </div>
  
</div>
<div className='col-md-9'>
 
  <h1 className='text-center'>All Products</h1>
  <div className='d-flex flex-wrap'>
  {products?.map((p) => (
             
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text"> ${ p.price}</p>
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button  class="btn btn-secondary ms-1" onClick={()=>{setCart([...cart,p])
                    localStorage.setItem('cart', JSON.stringify([...cart,p]))
                      toast.success('Item Added to Cart')
                    }}>ADD TO CART</button>
                  </div>
                </div>
              
            ))}
  </div>
  <div className='m-2 p-3'>
   {products && products.length< total&&(
    <button className='btn btn-warning' onClick={(e)=>{
e.preventDefault();
setPage(page+1);

    }}>{loading ? "Loading..." : "LoadMore"}</button>
   )}
  </div>
</div>
      </div>
    </Layout >
  );
};

export default HomePage;
