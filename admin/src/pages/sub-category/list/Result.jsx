import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Iconify from '@/components/iconify';
import Table from '@/components/Table';
import Label from '@/components/label/Label';

function Result({ data, handleDeleteClick }) {
  const navigate = useNavigate();

  const columns = [
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
          return <Label color="error">{value}</Label>;
        },
      },
    },
    {
      name: 'categoryImage',
      label: 'Category Image',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Avatar alt="Image" src={value} variant="rounded" />;
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
                onClick={() => navigate(`/dashboard/sub-category/edit/${value}`)}
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

  const subCategories = data?.map((item) => ({
    name: item.name,
    category: item.category.name,
    categoryImage: item.category.image,
    createdBy: item.createdBy.name,
    lastUpdatedBy: item.lastUpdatedBy ? item.lastUpdatedBy.name : 'N/A',
    action: item._id,
  }));

  return (
    <Card>
      <PerfectScrollbar>
        <Table
          title="Subcategory List"
          data={subCategories}
          columns={columns}
          searchPlaceholder="Search subcategory"
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
