import dynamic from 'next/dynamic';

// Dynamically import Hero to prevent hydration errors (if needed)
const Hero = () => {
  return (
    <div className="bg-[#E3EdF6] mt-4">
      <div className="container grid md:grid-cols-2 py-8">
        {/* Left Section */}
        <div className="flex items-center">
          <div className="max-w-[450px] space-y-4">
            <p className="text-topHeadingSecondary">
              Starting at <span className="font-bold">$999.00</span>
            </p>
            <h1 className="text-topHeadingPrimary font-bold text-4xl md:text-5xl">
              The Best Collection 2024
            </h1>
            <h3 className="text-2xl font-oregano">
              Exclusive Offer <span className="text-red-600">-10%</span> off this week
            </h3>
            {/* Use a regular anchor tag for navigation */}
            <a
              href="/productpage"
              className="inline-block bg-white rounded-md px-6 py-3 hover:bg-accent hover:text-white"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <img className="ml-auto" src="/hero.png" alt="hero" />
        </div>
      </div>
    </div>
  );
};

// Exporting the component
export default dynamic(() => Promise.resolve(Hero), { ssr: false });
