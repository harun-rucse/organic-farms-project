import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Container,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '@/components/label';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Logo from '@/components/logo';
import { fDate } from '@/utils/formatTime';

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const getOrderStatusColor = (status) => {
  switch (status) {
    case 'Placed':
      return 'success';
    case 'Processing':
      return 'primary';
    case 'Shipped':
      return 'info';
    case 'Delivered':
      return 'success';
    case 'Cancelled':
      return 'error';
    default:
      return 'error';
  }
};

function DetailsForm({ order }) {
  return (
    <Container>
      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Logo />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Order Status:
                </Typography>

                <Label color={getOrderStatusColor(order.orderStatus)} sx={{ textTransform: 'uppercase', mb: 1 }}>
                  {order.orderStatus}
                </Label>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Order ID-
                </Typography>

                <Label sx={{ mb: 1 }}>{order._id}</Label>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice from
            </Typography>
            <Typography variant="body2">{order.branchOffice.name}</Typography>
            <Typography variant="body2">{order.branchOffice.address}</Typography>
            <Typography variant="body2">Phone: {order.branchOffice.phone}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice to
            </Typography>
            <Typography variant="body2">{order.customer.name}</Typography>
            <Typography variant="body2">{order.customer.address}</Typography>
            <Typography variant="body2">Phone: {order.customer.phone}</Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            overflow: 'auto',
          }}
        >
          <PerfectScrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' },
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Qty</TableCell>
                    <TableCell align="right">Unit price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order.products.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">{row.product.name}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {row.product.description}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{row.quantity} KG</TableCell>
                      <TableCell align="right">{row.product.price}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                    </TableRow>
                  ))}

                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">{order.totalAmount}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="body1">Delevery</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">{order.deliveryCharge}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="right" width={140}>
                      <Typography variant="h6">{order.grandTotalAmount}</Typography>
                    </TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </PerfectScrollbar>
        </Box>

        <Grid container sx={{ mt: 8 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Payment Method:
              </Typography>

              <Label color="info" sx={{ textTransform: 'uppercase', mb: 1 }}>
                {order.paymentMethod}
              </Label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Payment Status:
              </Typography>

              <Label
                color={order.paymentStatus === 'Paid' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {order.paymentStatus}
              </Label>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Order date:
              </Typography>

              <Label sx={{ textTransform: 'uppercase', mb: 1 }}>{fDate(order.orderPlacedDate)}</Label>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ mb: 5, mt: 5 }}>
            <TextField
              fullWidth
              label="Shipping Address"
              multiline
              rows={4}
              value={order.deliveryAddress}
              variant="outlined"
              disabled
            />
          </Grid>
          {order?.orderDeliveredBy && (
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Deleverd By
              </Typography>
              <Typography variant="body2">{order.orderDeliveredBy.user.name}</Typography>
              <Typography variant="body2">{order.orderDeliveredBy.user.address}</Typography>
              <Typography variant="body2">Phone: {order.orderDeliveredBy.user.phone}</Typography>
            </Grid>
          )}
        </Grid>
      </Card>
    </Container>
  );
}

DetailsForm.propTypes = {
  order: PropTypes.object.isRequired,
};

export default DetailsForm;
