import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Label from '@/components/label';
import Table from '@/components/Table';

function Result({ data, handleDeleteClick }) {
  const navigate = useNavigate();

  const stockColor = (value) => {
    if (value >= 1 && value <= 5) {
      return 'warning';
    }
    if (value > 5) {
      return 'success';
    }
    return 'error';
  };

  const columns = [
    {
      name: 'image',
      label: 'Image',
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
      name: 'category',
      label: 'Category',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="info">{value}</Label>;
        },
      },
    },
    {
      name: 'subCategory',
      label: 'SubCategory',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="error">{value}</Label>;
        },
      },
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="info">{`Taka. ${value}/Kg`}</Label>;
        },
      },
    },
    {
      name: 'minimumOrder',
      label: 'MinimumOrder',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="warning">{`${value} Kg`}</Label>;
        },
      },
    },
    {
      name: 'maximumOrder',
      label: 'MaximumOrder',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="error">{`${value} Kg`}</Label>;
        },
      },
    },
    {
      name: 'maxDeliveryDays',
      label: 'MaxDeliveryDays',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="success">{`${value} Days`}</Label>;
        },
      },
    },
    {
      name: 'farmer',
      label: 'Farmer',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'rating',
      label: 'Rating',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'inStock',
      label: 'InStock',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color={stockColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'active',
      label: 'Active',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <Label color={value ? 'success' : 'error'}>{value ? 'Active' : 'Inactive'}</Label>;
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
                onClick={() => navigate(`/dashboard/product/edit/${value}`)}
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

  const products = data?.map((item) => ({
    image: item.images[0],
    name: item.name,
    category: item.subcategory.category.name,
    subCategory: item.subcategory.name,
    price: item.price,
    description: item.description,
    minimumOrder: item.minimumOrder,
    maximumOrder: item.maximumOrder,
    maxDeliveryDays: item.maxDeliveryDays,
    farmer: item.farmer.name,
    rating: item.ratingAvg,
    inStock: item.inStock,
    active: item.active,
    branchOffice: item.branchOffice.name,
    createdBy: item.createdBy?.name,
    lastUpdatedBy: item.lastUpdatedBy ? item.lastUpdatedBy.name : 'N/A',
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Product List"
          data={products}
          columns={columns}
          searchPlaceholder="Search product"
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
