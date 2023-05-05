import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Table from '@/components/Table';
import Label from '@/components/label';
import { fDate } from '@/utils/formatTime';
import { fShortenNumber } from '@/utils/formatNumber';

const getColor = (value) => {
  return value === 'branch-manager' ? 'success' : value === 'office-employee' ? 'error' : 'warning';
};

function Result({ data, handleDeleteClick }) {
  const navigate = useNavigate();

  const columns = [
    {
      name: 'month',
      label: 'Month',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="info">{value}</Label>;
        },
      },
    },
    {
      name: 'year',
      label: 'Year',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="error">{value}</Label>;
        },
      },
    },
    {
      name: 'name',
      label: 'Employee Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'image',
      label: 'Image',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Avatar alt="Image" src={value} variant="rounded" />;
        },
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <Label color={getColor(value)}>{value}</Label>;
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
          return <Label color={value === 'Cash' ? 'primary' : 'error'}>{value}</Label>;
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
          return <Label color="error">{fShortenNumber(value)}</Label>;
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <Label color={value === 'Paid' ? 'success' : 'error'}>{value}</Label>;
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
      name: 'paymentDate',
      label: 'Payment Date',
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
                color="secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 50,
                  px: 1,
                }}
                onClick={() => navigate(`/dashboard/salary/edit/${value}`)}
              >
                <Iconify icon="eva:edit-2-fill" />
              </Button>

              <Button
                variant="contained"
                size="small"
                color="error"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 50,
                  px: 1,
                }}
                onClick={() => {
                  handleDeleteClick(value);
                }}
              >
                <Iconify icon="eva:trash-2-fill" />
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  const salaries = data?.map((item) => ({
    month: item.month,
    year: item.year,
    name: item.employee?.user?.name,
    image: item.employee?.user?.image,
    phone: item.employee?.user?.phone,
    role: item.employee?.role,
    paymentMethod: item.paymentMethod,
    amount: item.amount,
    status: item.status,
    branch: item.branchOffice?.name,
    paymentDate: item.paymentDate,
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Salary List"
          data={salaries}
          columns={columns}
          searchPlaceholder="Search salary"
          rowsPerPage={10}
        />
      </PerfectScrollbar>
    </Card>
  );
}

Result.propTypes = {
  data: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default Result;
