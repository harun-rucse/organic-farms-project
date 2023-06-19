import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Label from '@/components/label';
import Table from '@/components/Table';
import { fShortenNumber } from '@/utils/formatNumber';

const getColor = (value) => {
  return value === 'branch-manager' ? 'success' : value === 'office-employee' ? 'error' : 'warning';
};

function Result({ data, setQuery, handleDeleteClick }) {
  const navigate = useNavigate();

  const columns = [
    {
      name: 'avatar',
      label: 'Avatar',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Avatar alt="Avatar" src={value} variant="rounded" />;
        },
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: false,
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
      name: 'address',
      label: 'Address',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color={getColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'branch',
      label: 'Branch',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'salary',
      label: 'Salary',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="info">{fShortenNumber(value)}</Label>;
        },
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
                onClick={() => navigate(`/dashboard/employee/edit/${value}`)}
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

  const customers = data?.result?.map((item) => ({
    avatar: item.user.image,
    name: item.user.name,
    phone: item.user.phone,
    address: item.user.address,
    role: item.user.role,
    branch: item.branchOffice.name,
    salary: item.salary,
    createdBy: item.createdBy.name,
    lastUpdatedBy: item.lastUpdatedBy ? item.lastUpdatedBy.name : 'N/A',
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Employee List"
          data={customers}
          columns={columns}
          searchPlaceholder="Search employee"
          total={data?.total}
          setQuery={setQuery}
        />
      </PerfectScrollbar>
    </Card>
  );
}

Result.propTypes = {
  data: PropTypes.array.isRequired,
  setQuery: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default Result;
