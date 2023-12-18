import { Footer } from "./_components/footer";
import { Heading } from "./_components/header";
import { Heroes } from "./_components/heroes";

const Landing = () => {
  return (
    <>
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6">
          <Heading />
          <Heroes />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Landing;
