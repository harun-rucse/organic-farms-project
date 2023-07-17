import React from "react";
import { Formik } from "formik";
import PropTypes from "prop-types";

function Form({ initialValues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Form;
