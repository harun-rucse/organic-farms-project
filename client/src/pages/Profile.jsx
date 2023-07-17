import React from "react";
import { BiUser } from "react-icons/bi";
import Layout from "@/components/layout";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileTopbar from "@/components/ProfileTopbar";
import { useGetProfileQuery } from "@/store/apiSlices/authApiSlice";
import Loader from "@/components/Loader";

function Profile() {
  const { data: profile } = useGetProfileQuery();

  if (!profile) {
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
            title="My Profile"
            link="/profile/edit"
            linkText="Edit Profile"
          />
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:items-center bg-white px-8 py-4 rounded-xl">
            <div>
              <img
                src="https://res.cloudinary.com/harun-rucse/image/upload/v1679509330/users/default.png"
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="text-sm">
              <p className="text-gray-400">Name</p>
              <p className="text-gray-600 text-base">{profile?.name}</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-400">Phone</p>
              <p className="text-gray-600 text-base">{profile?.phone}</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-400">Address</p>
              <p className="text-gray-600 text-base">{profile?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
