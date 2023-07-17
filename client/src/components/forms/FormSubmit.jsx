import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

function FormSubmit({ label, className, ...rest }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      type="submit"
      className={`flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
      onClick={handleSubmit}
      {...rest}
    >
      {label}
    </button>
  );
}

FormSubmit.propTypes = {
  label: PropTypes.string.isRequired
};

export default FormSubmit;
