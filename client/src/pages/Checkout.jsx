import React, { useEffect } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "@/components/layout";
import Button from "@/components/Button";
import { Form, FormInput, FormTextarea, FormSubmit } from "@/components/forms";
import { useGetProfileQuery } from "@/store/apiSlices/authApiSlice";
import { useCreateOrderMutation } from "@/store/apiSlices/paymentApiSlice";
import { clearCart } from "@/store/reducers/cartReducer";
import Loader from "@/components/Loader";
import useNotification from "@/hooks/useNotification";

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Full Name"),
  email: Yup.string().email().required().label("Email"),
  phone: Yup.string()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, "Phone number is not valid")
    .label("Phone number"),
  deliveryAddress: Yup.string().required().label("Delivery Address"),
  city: Yup.string().required().label("City"),
  postcode: Yup.string().required().label("Postcode")
});

function Checkout() {
  const dispatch = useDispatch();
  const notification = useNotification();

  const { data: profile, isLoading } = useGetProfileQuery();
  const { cartItems } = useSelector((state) => state.cart);
  const [createOrder, { isLoading: isCreatingOrder, isSuccess, data }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (isSuccess && data?.result) {
      notification("Processing for payment", "success");
      dispatch(clearCart());

      window.location.replace(data?.result);
    }
  }, [isSuccess]);

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalShipping = cartItems?.reduce(
    (acc, item) => acc + item?.branchOffice?.deliveryFee * item.quantity,
    0
  );

  const handleSubmit = (value) => {
    const { email, city, postcode, deliveryAddress } = value;

    const orderItems = cartItems?.map((item) => ({
      product: item._id,
      quantity: item.quantity
    }));

    createOrder({
      email,
      city,
      postcode,
      deliveryAddress,
      products: orderItems
    });
  };

  if (isLoading || isCreatingOrder) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-start flex-col md:flex-row gap-6 md:gap-0 py-12">
        {/* Shipping form */}
        <Form
          Form
          initialValues={{
            name: profile?.name,
            phone: profile?.phone,
            address: profile?.address,
            deliveryAddress: "",
            email: "",
            city: "",
            postcode: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="flex w-full md:w-3/5 flex-col gap-7">
            <div className="flex flex-col gap-4 bg-white md:ml-10 px-6 py-12 rounded-lg shadow-md">
              <h4 className="text-base md:text-xl font-medium leading-9 text-gray-700">
                Shipping Address
              </h4>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
                  <FormInput
                    name="name"
                    label="Full Name"
                    type="text"
                    variant="outlined"
                    placeholder="Full Name"
                    required
                    disabled
                  />
                  <FormInput
                    name="phone"
                    label="Phone number"
                    type="text"
                    variant="outlined"
                    placeholder="Phone Number"
                    required
                    disabled
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
                  <FormInput
                    name="email"
                    label="Email Address"
                    type="text"
                    variant="outlined"
                    placeholder="Email Address"
                    required
                  />
                  <FormInput
                    name="city"
                    label="City"
                    type="text"
                    variant="outlined"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <FormInput
                    name="address"
                    label="Customer Address"
                    type="text"
                    variant="outlined"
                    placeholder="Customer Address"
                    required
                    disabled
                  />
                  <FormInput
                    name="postcode"
                    label="Postcode"
                    type="text"
                    variant="outlined"
                    placeholder="Postcode"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <FormTextarea
                    name="deliveryAddress"
                    label="Delevery Address"
                    rows={5}
                    placeholder="Delevery Address"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex flex-col gap-4 bg-white md:ml-10 px-6 py-12 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-lg">Subtotal:</span>
              <b className="text-xl font-semibold leading-9 text-gray-700">
                Tk. {totalPrice}
              </b>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-lg">Shipping:</span>
              <b className="text-xl font-semibold leading-9 text-gray-700">
                Tk. {totalShipping}
              </b>
            </div>
            <div className="border-t border-gray-200 w-full pt-4 mt-4">
              <b className="text-2xl md:text-2xl font-semibold leading-9 text-gray-700 block text-right">
                Tk. {totalPrice + totalShipping}
              </b>
            </div>
            <div>
              <Link to="/cart">
                <Button
                  className="mt-6 px-2 py-2 md:px-2 md:py-2"
                  variant="outlined"
                >
                  Back to Cart
                </Button>
              </Link>

              <FormSubmit
                className="mt-6 bg-green-600 hover:bg-green-500 py-3"
                label="Proceed To Payment"
              />
            </div>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default Checkout;
