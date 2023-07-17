import React from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

function FormTextarea({ name, label, ...rest }) {
  const { touched, errors, setFieldValue, values, setFieldTouched } =
    useFormikContext();

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          type="text"
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 
            ${
              touched[name] && errors[name]
                ? "ring-red-500 focus:ring-red-500"
                : "focus:ring-indigo-600"
            }
          `}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => setFieldValue(name, e.target.value)}
          required
          {...rest}
        ></textarea>

        {Boolean(touched[name] && errors[name]) && (
          <div className="text-red-500 text-sm mt-1">
            {touched[name] && errors[name]}
          </div>
        )}
      </div>
    </div>
  );
}

FormTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default FormTextarea;
