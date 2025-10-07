import Image from "next/image";
import { Button } from "../ui/button";

function Comments() {
  return (
    <div className='flex flex-col items-center gap-8'>
      <Comment />
      <Separator />
      <Comment />
      <Separator />
      <Comment />
      <Separator />
      <Comment />
      <Button className='bg-[#F5F5F5] p-8 rounded-xl font-semibold text-sm text-[#BE968E] font-Poppins '>
        View More Comments
      </Button>
    </div>
  );
}

export default Comments;
const Separator = () => <div className='h-0.5 w-full bg-[#F4F7F9] ' />;
const Comment = () => (
  <div className='flex flex-col gap-6'>
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <p className='font-semibold text-xl text-black font-Poppins'>
          Alex Daewn
        </p>
        <div className='flex items-center gap-1'>
          {[...Array(5)].map((_, i) => (
            <Image
              className={`${i === 4 && "opacity-50"}`}
              key={i}
              src={"/icons/star.svg"}
              alt='star'
              width={20}
              height={20}
            />
          ))}
        </div>
      </div>
      <p className='font-medium text-sm text-[#545454] font-Poppins'>
        4 month Ago
      </p>
    </div>
    <p className='font-normal text-base text-[#020202] font-Poppins'>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,
      consequuntur dolor, molestiae animi quas dolore vitae adipisci numquam
      odio aut sequi explicabo nemo aspernatur repellat nam hic ea natus alias.
      Aperiam ipsam cupiditate blanditiis maxime ad aut repellat illo
      dignissimos?
    </p>
  </div>
);
