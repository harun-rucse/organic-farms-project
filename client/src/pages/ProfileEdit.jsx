import React, { useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { BiUser, BiCamera } from "react-icons/bi";
import Layout from "@/components/layout";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileTopbar from "@/components/ProfileTopbar";
import { Form, FormInput, FormTextarea, FormSubmit } from "@/components/forms";
import {
  useGetProfileQuery,
  useUpdateProfileMutation
} from "@/store/apiSlices/authApiSlice";
import Loader from "@/components/Loader";
import useNotification from "@/hooks/useNotification";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Full Name"),
  address: Yup.string().required().label("Address"),
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, "Phone number is not valid")
    .label("Phone number")
});

function ProfileEdit() {
  const navigate = useNavigate();
  const notification = useNotification();

  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: loading, isSuccess, isError, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      notification("Profile updated successfully", "success");
      navigate("/profile");
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (value) => {
    const { name, phone, address } = value;

    updateProfile({
      name,
      phone,
      address
    });
  };

  if (isLoading || loading) {
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
            icon={BiUser}
            title="Edit Profile"
            link="/profile"
            linkText="Back To Profile"
          />

          <div className="flex flex-col gap-4 bg-white p-8 rounded-xl">
            <div className="relative w-20 h-20">
              <img
                src={profile?.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-1 -right-2 flex justify-center items-center bg-gray-200 p-2 rounded-full">
                <BiCamera className="inline-block text-base text-gray-800 font-bold" />
              </button>
            </div>
            <Form
              initialValues={{
                name: profile?.name,
                phone: profile?.phone,
                address: profile?.address
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

                <div className="mt-4">
                  <FormSubmit label="Update Now" className="md:py-3" />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfileEdit;
