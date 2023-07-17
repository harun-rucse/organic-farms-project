import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function HeroCarousel() {
  return (
    <Carousel
      autoPlay={true}
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
    >
      <div className="w-full flex flex-col gap-12 bg-green-600 rounded-lg md:p-12">
        <img
          className="h-36 md:h-44 object-contain rounded-md"
          src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fgarlic.png&w=640&q=75"
        />
        <h1 className="text-xl md:text-4xl text-gray-200 font-semibold leading-9">
          Get Your Order Within 2 Days
        </h1>
        <p className="text-gray-300 text-sm md:text-xl font-semibold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, nemo!
        </p>
      </div>

      <div className="w-full flex flex-col gap-12 bg-yellow-600 rounded-lg md:p-12">
        <img
          className="h-36 md:h-44 object-contain rounded-md"
          src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fgarlic.png&w=640&q=75"
        />
        <h1 className="text-xl md:text-4xl text-gray-200 font-semibold leading-9">
          Get Your Order Within 2 Days
        </h1>
        <p className="text-gray-300 text-sm md:text-xl font-semibold">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, nemo!
        </p>
      </div>
    </Carousel>
  );
}

export default HeroCarousel;
