import React, { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { FcSettings } from "react-icons/fc";
import Layout from "@/components/layout";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileTopbar from "@/components/ProfileTopbar";
import { Form, FormInput, FormSubmit } from "@/components/forms";
import { useUpdatePasswordMutation } from "@/store/apiSlices/authApiSlice";
import { removeToken } from "@/store/reducers/authReducer";
import Loader from "@/components/Loader";
import useNotification from "@/hooks/useNotification";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().min(6).required().label("Current Password"),
  password: Yup.string().min(6).required().label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required()
    .label("Confirm Password")
});

function Settings() {
  const dispatch = useDispatch();
  const notification = useNotification();

  const [updatePassword, { isLoading: loading, isSuccess, isError, error }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      notification("Password change successfully", "success");

      dispatch(removeToken());
      window.location.reload();
    }
  }, [isSuccess, dispatch, notification]);

  const handleSubmit = (values) => {
    const { currentPassword, password } = values;

    updatePassword({
      currentPassword,
      password
    });
  };

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start gap-6 py-10">
        <ProfileSidebar />
        <div className="w-full flex flex-col gap-8">
          <ProfileTopbar
            icon={FcSettings}
            title="Settings"
            link="/profile"
            linkText="Back To Profile"
          />

          <div className="flex flex-col gap-4 bg-white p-8 rounded-xl">
            <Form
              initialValues={{
                currentPassword: "",
                password: "",
                confirmPassword: ""
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {isError && (
                <div className="mb-2">
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
              <div className="w-full flex flex-col gap-4">
                <FormInput
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  required
                />
                <FormInput
                  name="password"
                  label="New Password"
                  type="password"
                  required
                />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                />

                <div className="mt-4">
                  <FormSubmit label="Change password" className="md:py-3" />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
