import Image from "next/image";

function NavigationBackground() {
  const title = "Product Details";
  return (
    <div className='w-full md:h-40 h-28 relative overflow-hidden flex items-center justify-center'>
      <Image
        className='opacity-5'
        src={"/Navigationbg.jpg"}
        alt='bg'
        fill
        objectFit='cover'
      />
      <p
        className='font-bold text-4xl md:text-7xl text-transparent'
        style={{
          WebkitTextStroke: "1px  rgba(0, 0, 0, 0.05)",
        }}>
        {title}
      </p>
      <h3 className='absolute text-xl md:text-3xl font-semibold top-1/2 left-1/2 -translate-1/2'>
        {title}
      </h3>
    </div>
  );
}

export default NavigationBackground;
