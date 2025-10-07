"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import { useEffect, useState } from "react";

function Slider() {
  const Images = [
    "/media/T-shirt03.jpeg",
    "/media/T-shirt01.png",
    "/media/T-shirt02.png",
    "/media/T-shirt04.jpeg",
    "/media/T-shirt05.jpeg",
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='lg:w-[524px] w-full relative overflow-hidden'>
      <div className='absolute top-4 left-4 right-4 z-10'>
        <div className='flex gap-1 relative'>
          {Images.map((_, i) => (
            <div
              key={`bg-${i}`}
              className='bg-[#D4D4D4] flex-1 h-1 rounded-full'
            />
          ))}

          <div
            className='absolute top-0 h-1 bg-white rounded-full transition-all duration-300 ease-in-out'
            style={{
              width: `${100 / Images.length}%`,
              left: `${((current - 1) * 100) / Images.length}%`,
              transform: "translateX(0)",
            }}
          />
        </div>
      </div>

      <Carousel
        setApi={setApi}
        className='w-full '>
        <CarouselContent className='h-[565px] '>
          {Images.map((image, index) => (
            <CarouselItem
              className='rounded-2xl'
              key={index}>
              <div className='relative rounded-2xl flex items-end justify-center w-full h-full bg-gradient-to-b from-0% from-gray-200 to-10% to-[#F5F5F5]'>
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  className='object-contain rounded-2xl'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-4 bg-black/50 hover:bg-black/70 text-white border-0 cursor-pointer' />
        <CarouselNext className='right-4 bg-black/50 hover:bg-black/70 text-white border-0 cursor-pointer' />
      </Carousel>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className='w-full pt-4'>
        <CarouselContent className='p-0'>
          {Images.map((image, index) => (
            <CarouselItem
              key={index}
              className=' basis-1/3 '>
              <Card
                className={`relative w-auto h-44 overflow-hidden cursor-pointer transition-all duration-200 ${
                  index + 1 === current
                    ? "ring-1 ring-primary ring-offset-1"
                    : "hover:opacity-80"
                }`}
                onClick={() => api?.scrollTo(index)}>
                <CardContent className='p-0 h-full'>
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className='object-cover'
                  />
                  {index + 1 === current && (
                    <div className='absolute inset-0 bg-primary/20' />
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Slider;
