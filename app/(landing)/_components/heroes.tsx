import Image from "next/image";

const Heroes = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-5xl">
        <div className="flex  items-center">
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:h-[400px] md:w-[400px]">
            <Image
              src="/images/documents-light.png"
              fill
              className="object-contain dark:hidden"
              alt="documents"
            />
            <Image
              src="/images/documents-dark.png"
              fill
              className="object-contain hidden dark:block"
              alt="documents"
            />
          </div>
          <div className="relative w-[400px] h-[400px] hidden md:block">
            <Image
              src="/images/reading-light.png"
              fill
              className="object-contain dark:hidden"
              alt="reading"
            />
            <Image
              src="/images/reading-dark.png"
              fill
              className="object-contain hidden dark:block"
              alt="reading"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { Heroes };
