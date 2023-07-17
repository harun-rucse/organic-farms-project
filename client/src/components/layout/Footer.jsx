import { Link } from "react-router-dom";
import { BsFacebook, BsYoutube, BsTwitter } from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-[#141850] text-gray-400 p-8 flex flex-col md:flex-row md:justify-around gap-8">
      <div className="flex flex-col gap-6">
        <h4 className="text-2xl md:text-3xl font-semibold">Organic Farms</h4>
        <p className="text-sm sm:text-lg md:w-96">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi tempore
          dignissimos velit, enim neque a nisi. Odit animi consequuntur
          voluptatem!
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <ul className="flex flex-col gap-3 text-sm sm:text-lg">
          <Link to="/help-center" className="hover:text-gray-200 ">
            <li>Help Center</li>
          </Link>
          <Link to="/track-order" className="hover:text-gray-200 ">
            <li>Track Your Order</li>
          </Link>
          <Link to="/about-us" className="hover:text-gray-200 ">
            <li>About Us</li>
          </Link>
          <Link to="/contact-us" className="hover:text-gray-200 ">
            <li>Contact Us</li>
          </Link>
          <Link to="/returns-refunds" className="hover:text-gray-200 ">
            <li>Returns & Refunds</li>
          </Link>
        </ul>

        <div className="flex items-center gap-4">
          <BsFacebook className="text-xl hover:text-gray-200 cursor-pointer" />
          <BsYoutube className="text-xl hover:text-gray-200 cursor-pointer" />
          <BsTwitter className="text-xl hover:text-gray-200 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
