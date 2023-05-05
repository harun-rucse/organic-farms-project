import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Table from '@/components/Table';
import Label from '@/components/label';
import { fDate } from '@/utils/formatTime';

function Result({ data }) {
  const navigate = useNavigate();

  const columns = [
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <Label color="info">{value}</Label>;
        },
      },
    },
    {
      name: 'amount',
      label: 'Amount',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="error">{value}</Label>;
        },
      },
    },
    {
      name: 'description',
      label: 'Description',
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
    {
      name: 'createdBy',
      label: 'CreatedBy',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'lastUpdatedBy',
      label: 'LastUpdatedBy',
      options: {
        filter: false,
        sort: true,
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
              onClick={() => navigate(`/dashboard/expense/edit/${value}`)}
            >
              <Iconify icon="eva:edit-2-fill" />
            </Button>
          );
        },
      },
    },
  ];

  const expenses = data?.map((item) => ({
    category: item.category,
    amount: item.amount,
    description: item.description,
    date: item.date,
    branch: item.branchOffice.name,
    createdBy: item.createdBy?.name,
    lastUpdatedBy: item.lastUpdatedBy ? item.lastUpdatedBy.name : 'N/A',
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Expense List"
          data={expenses}
          columns={columns}
          searchPlaceholder="Search expense"
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
