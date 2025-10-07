import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
function SimilarItems() {
  const Images = [
    "/media/T-shirt03.jpeg",
    "/media/T-shirt01.png",
    "/media/T-shirt02.png",
    "/media/T-shirt04.jpeg",
    "/media/T-shirt05.jpeg",
  ];

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className='container max-w-[590px] md:max-w-[704px] lg:max-w-full pb-10'>
        <CarouselContent>
          {Images.map((image, i) => (
            <CarouselItem
              key={i}
              className=' basis-1/2 md:basis-1/3 lg:basis-1/4 '>
              <Card
                className={`relative rounded-3xl aspect-square w-auto overflow-hidden cursor-pointer transition-all duration-200 `}>
                {i === 1 && (
                  <p className='absolute z-10 top-4 left-4 border border-[#4040401A] rounded-md px-3 py-2 bg-white font-semibold text-[10px] text-[#BE968E] font-Poppins'>
                    25% OFF
                  </p>
                )}

                <div className='absolute z-20 top-4 right-4'>
                  <div className='flex gap-2'>
                    <Image
                      src={`/icons/${i === 2 ? "bag-remove" : "bag-add"}.svg`}
                      className='border border-[#4040401A] rounded-md p-1 bg-white cursor-pointer hover:scale-105 transition-all duration-300'
                      alt=''
                      width={32}
                      height={32}
                    />
                    <Image
                      className='border border-[#4040401A] rounded-md p-1 bg-white cursor-pointer hover:scale-105 transition-all duration-300'
                      src={`/icons/${i === 2 ? "green-love" : "love"}.svg`}
                      alt=''
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
                <CardContent className='p-0 h-full'>
                  <Image
                    src={image}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className='object-cover hover:scale-110 transition-all duration-300'
                  />
                </CardContent>
              </Card>
              <div className='px-4 py-3 flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <p className='font-medium text-xs text-[#545454] '>Dresses</p>
                  <div className='flex gap-2 items-center'>
                    <p className='font-medium text-xs text-[#020202] flex gap-1'>
                      <Image
                        src={"/icons/star.svg"}
                        alt={"star"}
                        width={13}
                        height={13}
                      />
                      4.5
                    </p>
                    <p className='font-normal text-[10px] text-[#545454] font-Poppins '>
                      (2190)
                    </p>
                  </div>
                </div>
                <p className='font-medium text-sm text-[#020202] font-Poppins'>
                  J.VER Women&apos;s Dress Shirts Solid Long Sleeve Stretch
                  Wrinkle-Free With Yello ..
                </p>
                <div className='flex items-center justify-between'>
                  <div className='flex lg:items-center gap-0 flex-col xl:flex-row xl:gap-2 max-md:flex-row max-md:items-center max-md:gap-2'>
                    <p className='font-medium text-base text-[#020202]'>
                      AED 900
                    </p>
                    {(i === 1 || i === 3) && (
                      <s className='font-medium text-xs text-[#8A8A8A] font-Poppins'>
                        AED 1300
                      </s>
                    )}
                  </div>
                  <div className='flex gap-1 font-medium text-sm text-[#020202] font-Poppins'>
                    <div className='rounded-full bg-[#BE968E] w-4 h-4' />
                    <div className='rounded-full bg-[#333333] w-4 h-4' />
                    <div className='rounded-full bg-[#E8E8E8] w-4 h-4' />
                    +2
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='absolute bottom-0 left-1/2'>
          <CarouselPrevious className='cursor-pointer' />
          <CarouselNext className='cursor-pointer' />
        </div>
      </Carousel>
    </div>
  );
}

export default SimilarItems;
