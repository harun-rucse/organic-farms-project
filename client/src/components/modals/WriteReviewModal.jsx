import { MdClose } from "react-icons/md";
import * as Yup from "yup";
import Modal from "./index";
import { Form, FormTextarea, FormRating, FormSubmit } from "@/components/forms";

const validationSchema = Yup.object().shape({
  rating: Yup.number().min(1).required().label("Rating"),
  review: Yup.string().required().label("Review")
});

function WriteReviewModal({ isOpen, onClose, handleSubmit, loading }) {
  return (
    <Modal isOpen={isOpen} className="flex justify-center items-center">
      <div className="w-11/12 sm:w-3/4 md:w-2/5 bg-white p-8 rounded-md">
        <Form
          initialValues={{
            rating: null,
            review: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Write a Review</h3>
              <MdClose
                className="text-[2.4rem] text-gray-700 hover:bg-gray-200 p-2 rounded-full cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormRating name="rating" label="Rating" />

              <FormTextarea
                name="review"
                label="Your Review"
                type="text"
                className="w-full text-lg bg-gray-50 rounded-lg"
                rows={5}
              />
            </div>
            <FormSubmit label={loading ? "Submitting..." : "Submit"} />
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default WriteReviewModal;
