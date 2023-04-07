import React from 'react';
import { Card, Button, Avatar, Box } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '../../../components/iconify';
import Label from '../../../components/label';
import Table from '../../../components/Table';

const getColor = (value) => {
  return value === 'branch-manager' ? 'success' : value === 'office-employee' ? 'error' : 'warning';
};

function Result() {
  const columns = [
    {
      name: 'avatar',
      label: 'Avatar',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Avatar alt="Avatar" src={value} variant="square" />;
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
        filter: true,
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
        filter: false,
        sort: true,
      },
    },
    {
      name: 'salary',
      label: 'Salary',
      options: {
        filter: false,
        sort: true,
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
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: true,
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
              >
                <Iconify icon="eva:trash-2-fill" />
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  const data = [
    {
      avatar: '/assets/images/avatars/avatar_1.jpg',
      name: 'John',
      phone: '01730362665',
      address: 'Dhaka',
      role: 'branch-manager',
      branch: 'Dhaka',
      salary: 10000,
      createdBy: 'Admin',
      action: 1,
    },
    {
      avatar: '/assets/images/avatars/avatar_2.jpg',
      name: 'John',
      phone: '01730362665',
      address: 'Dhaka',
      role: 'office-employee',
      branch: 'Dhaka',
      salary: 10000,
      createdBy: 'Admin',
      action: 2,
    },
    {
      avatar: '/assets/images/avatars/avatar_3.jpg',
      name: 'John',
      phone: '01730362665',
      address: 'Dhaka',
      role: 'office-employee',
      branch: 'Dhaka',
      salary: 10000,
      createdBy: 'Admin',
      action: 3,
    },
  ];

  return (
    <Card>
      <PerfectScrollbar>
        <Table title="Employee List" data={data} columns={columns} searchPlaceholder="Search employee" />
      </PerfectScrollbar>
    </Card>
  );
}

export default Result;
