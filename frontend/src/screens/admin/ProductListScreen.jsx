import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
// import { FaTimes } from 'react-icons/fa'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useGetProductsQuery } from '../../slices/productsApiSlice'
const ProductListScreen = () => {
  const {data:products,isLoading,error}= useGetProductsQuery();
  console.log(products)
  return (
    <div>
      <h2>Product List</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.msg || error.error}</Message>
        ) : (
          <Table  hover responsive className="table-sm">
            <thead>
              <tr>
                <th>BRAND</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.brand}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  {/* <td>
                    {product.isPaid ? (
                      product.PaidAt ? (
                        product.PaidAt.substring(0, 10)
                      ) : (
                        'N/A'
                      )
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {product.isDelivered ? (
                      product.deliveredAt ? (
                        product.deliveredAt.substring(0, 10)
                      ) : (
                        'N/A'
                      )
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td> */}
                  <td>
                    <LinkContainer to={`/product/${product._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </div>
  )
}

export default ProductListScreen