import Navigation from "./Navigation";

const Header = () => {
  return (
    <section className="flex flex-row items-center border-b-[2px]  h-[100px]">
      <article className="flex flex-1 justify-start items-center h-full ">
        <h1 className="text-[68px] m-0 leading-none">Luna</h1>
      </article>
      <article className="flex flex-1 justify-center items-center h-full  ">
        <Navigation />
      </article>
      <article className="flex flex-1 justify-end gap-6 items-center h-full ">
        <p className="m-0">Notification</p>
        <p className="m-0">Avatar</p>
      </article>
    </section>
  );
};

export default Header;
