import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Table from '@/components/Table';
import Label from '@/components/label/Label';

function Result({ data, setQuery, handleDeleteClick }) {
  const navigate = useNavigate();

  const columns = [
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
      name: 'deliveryFee',
      label: 'Delivery Fee',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="primary">Tk. {value}/kg</Label>;
        },
      },
    },
    {
      name: 'costPercentage',
      label: 'Cost Percentage',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="error">{value}%</Label>;
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
                onClick={() => navigate(`/dashboard/branch/edit/${value}`)}
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

  const branches = data?.result?.map((item) => ({
    name: item.name,
    phone: item.phone,
    address: item.address,
    deliveryFee: item.deliveryFee,
    costPercentage: item.costPercentage,
    createdBy: item.createdBy.name,
    lastUpdatedBy: item.lastUpdatedBy ? item.lastUpdatedBy.name : 'N/A',
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Branch List"
          data={branches}
          columns={columns}
          searchPlaceholder="Search branch"
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
