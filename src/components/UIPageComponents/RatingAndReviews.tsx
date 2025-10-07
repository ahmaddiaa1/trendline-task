import { MessageCircleMore, Star } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import Image from "next/image";

function RatingAndReviews() {
  const stars = [
    { start: 5, rate: 67 },
    { start: 4, rate: 15 },
    { start: 3, rate: 6 },
    { start: 2, rate: 3 },
    { start: 1, rate: 9 },
  ];

  return (
    <div>
      <div className='font-semibold text-2xl text-[#020202] font-Poppins'>
        Rating & Reviews
        <div className='bg-[#BE968E] h-1 w-9 rounded-2xl' />
      </div>
      <div className='flex items-center gap-10'>
        <div className='font-medium text-2xl text-[#B0B0B0]'>
          <span className=' text-9xl text-[#020202]'> 4,5</span> /5
        </div>
        <div className='flex-1'>
          {stars.map((s, i) => (
            <div
              key={i}
              className='flex items-center gap-3'>
              <Image
                src={"/icons/star.svg"}
                alt='star'
                width={20}
                height={20}
              />
              <span>{s.start}</span>
              <Progress
                value={s.rate}
                className='bg-[#E6E6E6]'
              />
              <span className='font-medium text-xl text-[#545454] '>
                %{s.rate}
              </span>
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center gap-4'>
          <div className='text-center'>
            <p className='font-normal text-base text-[#545454] font-Poppins'>
              Total Reviews
            </p>
            <p className='font-semibold text-6xl text-[#020202] font-Poppins'>
              3.0K
            </p>
          </div>
          <Button
            variant={"ghost"}
            className='bg-[#BE968E] text-white font-medium text-base py-6'>
            Add Comment
            <MessageCircleMore
              width={10}
              height={10}
            />
          </Button>
        </div>
      </div>
      <div className='comment-sections'></div>
    </div>
  );
}

export default RatingAndReviews;
