import React, { useState, useRef } from "react";
import { useFormikContext } from "formik";
import { BiCamera } from "react-icons/bi";
import PropTypes from "prop-types";

function FormImagePicker({ name, label, ...rest }) {
  const { setFieldValue, values } = useFormikContext();

  const [imageUrl, setImageUrl] = useState(values[name] ? values[name] : "");
  const fileInputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-20 h-20">
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover rounded-full"
      />

      <input
        className="hidden"
        type="file"
        name={name}
        ref={fileInputRef}
        onChange={(e) => {
          handleImageChange(e);
          setFieldValue(name, e.target.files);
        }}
        accept="image/*"
        {...rest}
      />

      <button
        className="absolute bottom-1 -right-2 flex justify-center items-center bg-gray-200 p-2 rounded-full"
        onClick={() => fileInputRef.current?.click()}
      >
        <BiCamera className="inline-block text-base text-gray-800 font-bold" />
      </button>
    </div>
  );
}

FormImagePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default FormImagePicker;
