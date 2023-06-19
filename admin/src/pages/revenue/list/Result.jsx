import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Table from '@/components/Table';
import Label from '@/components/label';
import { fDate } from '@/utils/formatTime';

function Result({ data, setQuery }) {
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
      name: 'transaction',
      label: 'Transaction #',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Label color="success">
              {value.slice(0, 5)}
              <span style={{ color: 'black' }}>...</span>
              {value.slice(-5)}
            </Label>
          );
        },
      },
    },
    {
      name: 'revenueAmount',
      label: 'Amount',
      options: {
        filter: false,
        sort: true,
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
      name: 'farmerPhone',
      label: 'Phone',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'date',
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
  ];

  const revenues = data?.result?.map((item) => ({
    order: item?.order,
    transaction: item?.transaction,
    revenueAmount: item?.revenueAmount,
    customerName: item?.customer?.name,
    customerPhone: item?.customer?.phone,
    farmerName: item?.farmer?.name,
    farmerPhone: item?.farmer?.phone,
    date: item?.date,
    branch: item?.branchOffice?.name,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Revenue List"
          data={revenues}
          columns={columns}
          searchPlaceholder="Search revenue"
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
