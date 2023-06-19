import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Table from '@/components/Table';
import Label from '@/components/label';
import { fDate } from '@/utils/formatTime';

const getPaymentMethodColor = (method) => {
  switch (method) {
    case 'COD':
      return 'error';
    case 'Bkash':
      return 'success';
    case 'Rocket':
      return 'warning';
    case 'Nagad':
      return 'info';
    case 'Bank':
      return 'primary';
    default:
      return 'error';
  }
};

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

function Result({ data, setQuery }) {
  const navigate = useNavigate();

  const columns = [
    {
      name: 'id',
      label: 'Order ID',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Label color="info">
              {value.slice(0, 5)}
              <span style={{ color: 'black' }}>...</span>
              {value.slice(-5)}
            </Label>
          );
        },
      },
    },
    {
      name: 'customerName',
      label: 'Customer Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'totalProduct',
      label: 'Total Product',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label>{value}</Label>;
        },
      },
    },
    {
      name: 'paymentMethod',
      label: 'Payment Method',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <Label color={getPaymentMethodColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'paymentStatus',
      label: 'Payment Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <Label color={value === 'Paid' ? 'success' : 'error'}>{value}</Label>;
        },
      },
    },
    {
      name: 'orderStatus',
      label: 'Order Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <Label color={getOrderStatusColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'branchOffice',
      label: 'Branch',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'amount',
      label: 'Amount',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'deliveryCharge',
      label: 'Delivery Charge',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="warning">{value}</Label>;
        },
      },
    },
    {
      name: 'totalAmount',
      label: 'Total Amount',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="success">{value}</Label>;
        },
      },
    },
    {
      name: 'orderPlacedDate',
      label: 'Place Date',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label>{fDate(value)}</Label>;
        },
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 1,
              }}
            >
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
                onClick={() => navigate(`/dashboard/order/${value}/view`)}
              >
                <Iconify icon="ic:baseline-remove-red-eye" />
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 50,
                  px: 1,
                }}
                onClick={() => navigate(`/dashboard/order/edit/${value}`)}
              >
                <Iconify icon="eva:edit-2-fill" />
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  const expenses = data?.result?.map((item) => ({
    id: item._id,
    customerName: item?.customer?.name,
    totalProduct: item.products.length,
    paymentMethod: item.paymentMethod,
    paymentStatus: item.paymentStatus,
    orderStatus: item.orderStatus,
    branchOffice: item?.branchOffice?.name,
    amount: item.totalAmount,
    deliveryCharge: item.deliveryCharge,
    totalAmount: item.grandTotalAmount,
    orderPlacedDate: item.orderPlacedDate,
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Order List"
          data={expenses}
          columns={columns}
          searchPlaceholder="Search order"
          total={data?.total}
          setQuery={setQuery}
        />
      </PerfectScrollbar>
    </Card>
  );
}

Result.propTypes = {
  data: PropTypes.object.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Result;
