import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  // console.log(products);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <>
      {console.log(error)}
      <Message variant="danger">Error loading top products</Message>
    </>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name}(${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
