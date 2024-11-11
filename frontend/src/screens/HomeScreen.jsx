import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import PaginationComponent from '../components/PaginationComponent';
const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, error, isLoading } = useGetProductsQuery({ pageNumber });

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products &&
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <PaginationComponent pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
