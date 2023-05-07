import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Table from '@/components/Table';
import Label from '@/components/label';
import { fDate } from '@/utils/formatTime';
import Iconify from '@/components/iconify';

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

'Pending', 'Completed', 'Cancelled';
const getTrxStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Completed':
      return 'success';
    case 'Cancelled':
      return 'error';
    default:
      return 'error';
  }
};

function Result({ data }) {
  const navigate = useNavigate();

  const columns = [
    {
      name: 'order',
      label: 'Order #',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Link to={`/dashboard/order/${value}/view`}>
              <Label
                color="info"
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                {value.slice(0, 5)}
                <span style={{ color: 'black' }}>...</span>
                {value.slice(-5)}
              </Label>
            </Link>
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
      name: 'customerPhone',
      label: 'Phone',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'farmerName',
      label: 'Farmer Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'receivedType',
      label: 'Received Type',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Label color={getPaymentMethodColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'receivedNumber',
      label: 'Received Number',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'totalAmount',
      label: 'Total Amount',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'chargeAmount',
      label: 'Charge',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="error">{value}</Label>;
        },
      },
    },
    {
      name: 'payableAmount',
      label: 'Payable Amount',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="primary">{value}</Label>;
        },
      },
    },
    {
      name: 'paymentMethod',
      label: 'Paid By',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color={getPaymentMethodColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'paymentStatus',
      label: 'Status',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color={value === 'Paid' ? 'success' : 'error'}>{value}</Label>;
        },
      },
    },
    {
      name: 'status',
      label: 'Transaction Status',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color={getTrxStatusColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Date',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label>{fDate(value)}</Label>;
        },
      },
    },
    {
      name: 'branch',
      label: 'Branch',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'lastUpdatedBy',
      label: 'Updated By',
      options: {
        filter: false,
        sort: false,
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
              onClick={() => navigate(`/dashboard/transaction/edit/${value}`)}
            >
              <Iconify icon="eva:edit-2-fill" />
            </Button>
          );
        },
      },
    },
  ];

  const revenues = data?.map((item) => ({
    order: item?.order,
    customerName: item?.customer?.name,
    customerPhone: item?.customer?.phone,
    farmerName: item?.farmer?.name,
    receivedType: item?.farmer?.receivePayment?.type,
    receivedNumber: item?.farmer?.receivePayment?.number,
    totalAmount: item?.totalAmount,
    chargeAmount: item?.chargeAmount,
    payableAmount: item?.payableAmount,
    paymentMethod: item?.paymentMethod,
    paymentStatus: item?.paymentStatus,
    status: item?.status,
    createdAt: item?.createdAt,
    branch: item?.branchOffice?.name,
    lastUpdatedBy: item?.lastUpdatedBy?.name || 'N/A',
    action: item?._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Transaction List"
          data={revenues}
          columns={columns}
          searchPlaceholder="Search transaction"
          rowsPerPage={10}
        />
      </PerfectScrollbar>
    </Card>
  );
}

Result.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Result;
