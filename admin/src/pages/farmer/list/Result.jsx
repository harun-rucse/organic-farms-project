import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Label from '@/components/label';
import Table from '@/components/Table';

const getColor = (value) => {
  return value === 'Bkash'
    ? 'success'
    : value === 'Rocket'
    ? 'error'
    : value === 'Nagad'
    ? 'warning'
    : value === 'Bank'
    ? 'info'
    : 'primary';
};

function Result({ data, handleDeleteClick, handleCreateCard }) {
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
        sort: true,
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
      name: 'description',
      label: 'Description',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'identity',
      label: 'Identity',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="error">{value}</Label>;
        },
      },
    },
    {
      name: 'branchOffice',
      label: 'BranchOffice',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'paymentType',
      label: 'PaymentType',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <Label color={getColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'paymentNumber',
      label: 'PaymentNumber',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Label color="info">{value}</Label>;
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
                color="primary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 50,
                  px: 1,
                }}
                onClick={() => handleCreateCard(value)}
              >
                <Iconify icon="mdi:id-card-outline" />
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
                onClick={() => navigate(`/dashboard/farmer/edit/${value}`)}
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

  const farmers = data?.map((item) => ({
    avatar: item.image,
    name: item.name,
    phone: item.phone,
    address: item.address,
    description: item.description,
    identity: item.identity,
    branchOffice: item.branchOffice.name,
    paymentType: item.receivePayment.type,
    paymentNumber: item.receivePayment.number,
    createdBy: item.createdBy?.name,
    lastUpdatedBy: item.lastUpdatedBy ? item.lastUpdatedBy.name : 'N/A',
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Farmer List"
          data={farmers}
          columns={columns}
          searchPlaceholder="Search farmer"
          rowsPerPage={10}
        />
      </PerfectScrollbar>
    </Card>
  );
}

Result.propTypes = {
  data: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleCreateCard: PropTypes.func.isRequired,
};

export default Result;
