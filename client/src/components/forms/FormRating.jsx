import React from "react";
import ReactStars from "react-rating-stars-component";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";

function FormRating({ name, label, variant, disabled, ...rest }) {
  const { touched, errors, setFieldValue, values, setFieldTouched } =
    useFormikContext();

  return (
    <div className="w-full">
      <p className="block text-sm font-medium leading-6 text-gray-800">
        {label}
      </p>
      <div className="mt-0">
        <ReactStars
          id={name}
          name={name}
          count={5}
          size={24}
          activeColor="#ffd700"
          onBlur={() => setFieldTouched(name)}
          onChange={(value) => setFieldValue(name, value)}
          value={values[name]}
          required
          disabled={disabled}
          {...rest}
        />

        {Boolean(touched[name] && errors[name]) && (
          <div className="text-red-500 text-sm mt-1">
            {touched[name] && errors[name]}
          </div>
        )}
      </div>
    </div>
  );
}

FormRating.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default FormRating;
