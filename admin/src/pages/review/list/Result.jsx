import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Table from '@/components/Table';
import Label from '@/components/label';

const getRatingColor = (rating) => {
  if (rating >= 4) {
    return 'success';
  }
  if (rating >= 3) {
    return 'warning';
  }
  if (rating >= 2) {
    return 'error';
  }
  return 'error';
};

function Result({ data, setQuery, handleDeleteClick }) {
  const navigate = useNavigate();

  const columns = [
    {
      name: 'customerName',
      label: 'Customer Name',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'customerImage',
      label: 'Customer Image',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Avatar alt="Image" src={value} variant="rounded" />;
        },
      },
    },
    {
      name: 'productName',
      label: 'Product Name',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'productImage',
      label: 'Product Image',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Avatar alt="Image" src={value} variant="rounded" />;
        },
      },
    },
    {
      name: 'category',
      label: 'Category',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return <Label color="primary">{value}</Label>;
        },
      },
    },
    {
      name: 'subCategory',
      label: 'Sub Category',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'rating',
      label: 'Rating',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <Label color={getRatingColor(value)}>{value}</Label>;
        },
      },
    },
    {
      name: 'review',
      label: 'Review',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'branchOffice',
      label: 'Branch',
      options: {
        filter: true,
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
                onClick={() => navigate(`/dashboard/review/edit/${value}`)}
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

  const reviews = data?.result?.map((item) => ({
    customerName: item?.user?.name,
    customerImage: item?.user?.image,
    productName: item?.product?.name,
    productImage: item?.product?.images[0],
    category: item?.product?.subcategory?.category?.name,
    subCategory: item?.product?.subcategory?.name,
    rating: item?.rating,
    review: item?.review,
    branchOffice: item?.branchOffice?.name,
    action: item?._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Review List"
          data={reviews}
          columns={columns}
          searchPlaceholder="Search reviews"
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
  handleDeleteClick: PropTypes.func.isRequired,
};

export default Result;
