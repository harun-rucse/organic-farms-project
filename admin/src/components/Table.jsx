import React from 'react';
import MUIDataTable, { TableFilterList } from 'mui-datatables';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

const CustomChip = ({ label, onDelete }) => {
  return <Chip variant="outlined" color="secondary" label={label} onDelete={onDelete} />;
};

const CustomFilterList = (props) => {
  return <TableFilterList {...props} ItemComponent={CustomChip} />;
};

function Table({ title, searchPlaceholder, columns, data, rowsPerPage }) {
  const options = {
    searchPlaceholder,
    selectableRows: 'none',
    responsive: 'simple',
    rowsPerPage,
    rowsPerPageOptions: [5, 10, 20, 50, 100],
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
  rowsPerPage: PropTypes.number,
};

Table.defaultProps = {
  rowsPerPage: 5,
};

CustomChip.propTypes = {
  label: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Table;
