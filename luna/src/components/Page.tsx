import Body from "./Body";
import Footer from "./Footer"
import Header from "./Header";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with narrower layout */}
      <div className="w-full">
        <div className="max-w-[1600px] mx-auto px-8">
          <Header />
        </div>
      </div>

      {/* Body with wider layout */}
      <main className="w-full flex-grow my-[150px] ">
        <div className="max-w-[1075px] mx-auto px-16">
          <Body />
        </div>
      </main>

      {/* Footer with same layout as Header */}
      <div className="w-full">
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;