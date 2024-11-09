import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  return (
    <div>
      <h2>User List</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.msg || error.error}</Message>
      ) : (
        <Table hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS_ADMIN</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* {/* <td>
                    {user.isPaid ? (
                      user.PaidAt ? (
                        user.PaidAt.substring(0, 10)
                      ) : (
                        'N/A'
                      )
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td> */}
                <td>
                  {user.isAdmin ? (
                    <FaTimes style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/users/${user._id}`}>
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
  );
};

export default UserListScreen;
