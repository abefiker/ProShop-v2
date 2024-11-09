import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Image,
} from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Message';
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from '../slices/orderApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log(order);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { data: paypal, isLoading: loadingPayPal } =
    useGetPayPalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (paypal?.clientId && !loadingPayPal) {
      const loadPayPalScript = async () => {
        try {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id': paypal.clientId,
              currency: 'USD',
            },
          });
          paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        } catch (error) {
          console.error('Failed to load PayPal SDK:', error);
        }
      };

      if (order && !order.isPaid && !window.paypal) {
        loadPayPalScript();
      }
    }
  }, [paypal, loadingPayPal, order, paypalDispatch]);

  // sourcery skip: avoid-function-declarations-in-blocks
  async function onApprovedTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Order paid successfully');
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  async function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        const { id, status, update_time, payer } = details;
        await payOrder({
          orderId,
          details: {
            id,
            status,
            update_time,
            payer: { email_address: payer.email_address },
          },
        });
        await refetch();
        toast.success('Order paid successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  function onError(err) {
    toast.error(err?.data?.message || err.message);
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
                <br />
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              <p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod?.type || 'N/A'}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.PaidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* {PAY ORDER PLACEORDER} */}
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApprovedTest}
                        style={{ marginBottom: '10px' }}
                      >
                        Test pay order
                      </Button>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {/* {MARK AS DELIVERED PLACEORDER} */}
              {/* <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  disabled={order.cartItems.length === 0}
                  onClick={placeOrderHander}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item> */}
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default OrderScreen;
