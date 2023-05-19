import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardHeader, Button, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Iconify from '@/components/iconify';
import { fDate } from '@/utils/formatTime';

AppLatestOrders.propTypes = {
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
};

export default function AppLatestOrders({ title, subheader, orders, ...other }) {
  const navigate = useNavigate();

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <PerfectScrollbar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Total products</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Place Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{order.products.length}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{fDate(order.orderPlacedDate)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 50,
                        px: 1,
                      }}
                      onClick={() => navigate(`/dashboard/order/${order._id}/view`)}
                    >
                      <Iconify icon="ic:baseline-remove-red-eye" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
    </Card>
  );
}
