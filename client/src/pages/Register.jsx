import React, { useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "@/components/layout";
import { Form, FormInput, FormTextarea, FormSubmit } from "@/components/forms";
import {
  useRegisterMutation,
  useGetProfileQuery
} from "@/store/apiSlices/authApiSlice";
import { setToken } from "@/store/reducers/authReducer";
import Loader from "@/components/Loader";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Full Name"),
  address: Yup.string().required().label("Address"),
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, "Phone number is not valid")
    .label("Phone number"),
  password: Yup.string().min(6).required().label("Password"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required()
    .label("Confirm Password")
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, isSuccess, isError, error, data }] =
    useRegisterMutation();

  const { data: profile } = useGetProfileQuery();

  useEffect(() => {
    if (profile) {
      navigate("/profile", { replace: true });
    }
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data));
      navigate("/profile", { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (value) => {
    const { name, phone, address, password } = value;

    register({ name, phone, address, password });
  };

  if (isLoading) {
    <Layout>
      <Loader />
    </Layout>;
  }

  return (
    <Layout>
      <div className="flex min-h-full flex-col justify-center pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form
              initialValues={{
                name: "",
                phone: "+880",
                address: "",
                password: "",
                passwordConfirm: ""
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {isError && (
                <div className="mb-3">
                  <div
                    className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded"
                    role="alert"
                  >
                    <span className="block sm:inline">
                      {error?.data?.message || error?.data}
                    </span>
                  </div>
                </div>
              )}
              <div className="space-y-6">
                <FormInput name="name" label="Full Name" type="text" required />

                <FormInput
                  name="phone"
                  label="Phone number"
                  type="text"
                  required
                />

                <FormTextarea
                  name="address"
                  label="Address"
                  type="text"
                  required
                />

                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  required
                />

                <FormInput
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  required
                />

                <FormSubmit label="Create Account" />
              </div>
            </Form>
            {/* create a sign in link */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="flex cursor-pointer w-full justify-center rounded-md py-2 px-3 text-sm font-semibold hover:text-indigo-500 "
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
