import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Table from '@/components/Table';

function Result({ data, setQuery, handleDeleteClick }) {
  const navigate = useNavigate();

  const columns = [
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
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
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
      name: 'phone',
      label: 'Phone',
      options: {
        filter: false,
        sort: false,
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
      name: 'cardNumber',
      label: 'CardNumber',
      options: {
        filter: false,
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
                onClick={() => navigate(`/dashboard/farmer-card/view/${value}`)}
              >
                <Iconify icon="ic:baseline-remove-red-eye" />
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

  const categories = data?.result?.map((item) => ({
    image: item.farmer?.image,
    name: item.farmer?.name,
    address: item.farmer?.address,
    phone: item.farmer?.phone,
    branch: item.branchOffice?.name,
    cardNumber: item.cardNumber,
    createdBy: item.createdBy?.name,
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Farmer-card List"
          data={categories}
          columns={columns}
          searchPlaceholder="Search card"
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
