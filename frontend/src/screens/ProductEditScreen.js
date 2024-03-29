import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";

function ProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);


  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;


  const productUpdate = useSelector((state) => state.productUpdate);
  const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate;

  useEffect(() => {

    if(successUpdate){
      dispatch({type:PRODUCT_UPDATE_RESET})
      navigate('/admin/productlist')
    } else {
        if (!product.name || product._id !== Number(productId)) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }, [dispatch, product, productId]);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id:productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }))
    
    navigate("/admin/productlist"); // Navigate to product list after update
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
  
    formData.append('image', file);
    formData.append('product_id', productId);
    setUploading(true);
  
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const { data } = await axios.post('/api/products/upload/', formData, config);
  
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  
  

  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>

      <FormContainer>
        <h1>Edit Product</h1>


        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
             <input
                type="file"
                id="image-file"
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="countinstock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;