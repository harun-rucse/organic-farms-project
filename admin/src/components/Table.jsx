import React, { useState } from 'react';
import MUIDataTable, { TableFilterList } from 'mui-datatables';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

const CustomChip = ({ label, onDelete }) => {
  return <Chip variant="outlined" color="secondary" label={label} onDelete={onDelete} />;
};

const CustomFilterList = (props) => {
  return <TableFilterList {...props} ItemComponent={CustomChip} />;
};

function Table({ title, searchPlaceholder, columns, data, total, setQuery }) {
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const options = {
    serverSide: true,
    searchPlaceholder,
    selectableRows: 'none',
    responsive: 'simple',
    rowsPerPage,
    count: total,
    rowsPerPageOptions: [5, 10, 20, 50, 100, 200],
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
          setQuery(`page=${tableState.page + 1}&limit=${tableState.rowsPerPage}`);
          break;
        case 'changeRowsPerPage':
          setQuery(`page=${tableState.page + 1}&limit=${tableState.rowsPerPage}`);
          setRowsPerPage(tableState.rowsPerPage);
          break;
        case 'sort':
          setQuery(
            `page=${tableState.page + 1}&limit=${tableState.rowsPerPage}&sortBy=${tableState.sortOrder.name}&order=${
              tableState.sortOrder.direction
            }`
          );
          break;
        case 'search':
          if (tableState.searchText) {
            setQuery(`name=${tableState.searchText}`);
          } else {
            setQuery(`page=${tableState.page + 1}&limit=${tableState.rowsPerPage}`);
          }
          break;
        case 'filterChange':
          tableState.filterList.forEach((filter, index) => {
            if (filter.length) {
              console.log(filter);
              setQuery(`${filter[index]}=${filter[0]}`);
            } else {
              setQuery(`page=${tableState.page + 1}&limit=${tableState.rowsPerPage}`);
            }
          });
          break;

        default:
          break;
      }
    },
  };

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      components={{
        TableFilterList: CustomFilterList,
      }}
      options={options}
    />
  );
}

Table.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  total: PropTypes.number,
  setQuery: PropTypes.func,
};

CustomChip.propTypes = {
  label: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Table;
