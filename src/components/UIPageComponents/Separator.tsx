import Image from "next/image";

function Separator() {
  return (
    <div className='w-full'>
      <Image
        src={"/TTlogo.svg"}
        alt='logo'
        width={10}
        height={10}
      />
    </div>
  );
}

export default Separator;
