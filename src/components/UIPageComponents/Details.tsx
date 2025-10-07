"use client";

import Image from "next/image";
import { ServerSelect } from "../ui/server-select";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

function Details() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const SizeOptions = [
    { value: "small", label: "sm" },
    { value: "medium", label: "md" },
    { value: "large", label: "lg" },
  ];
  const ColorOptions = ["#D90202", "#B8CCDA", "#988755", "#7198C8", "#5D5D5B"];
  const TypeOption = [
    { value: "cotton", label: "Cotton" },
    { value: "cotton", label: "Cotton" },
    { value: "cotton", label: "Cotton" },
  ];

  return (
    <div className='flex flex-col gap-6'>
      <div className='space-y-3.5'>
        <div className='flex justify-between items-center p-2'>
          <p className='border-[0.5px] px-4 text-base font-semibold py-2 border-[#BE968E] text-[#BE968E] rounded-4xl'>
            T-Shirt
          </p>
          <div className='flex gap-2'>
            <Image
              src='/icons/bag-add.svg'
              className='border border-[#4040401A] rounded-md p-1'
              alt=''
              width={42}
              height={42}
            />
            <Image
              className='border border-[#4040401A] rounded-md p-1'
              src='/icons/love.svg'
              alt=''
              width={42}
              height={42}
            />
          </div>
        </div>

        <p className='font-medium text-2xl text-[#020202] max-w-[524px]'>
          J.VER Man Shirts Solid Long Sleeve Stretch Wrinkle-Free With Blue
        </p>
        <div>
          <div className='flex gap-2 items-center'>
            <p className='font-medium text-xl'>$300.00</p>
            <s className='font-normal text-base text-[#8A8A8A]'>$360.00</s>
          </div>
          <p className='text-[#333333] font-normal text-xs'>
            This price is exclusive of taxes.
          </p>
        </div>
        <p className='font-normal text-base max-w-[510px]'>
          Lorem ipsum dolor sit , consectetuer adipiscing elit, sed diam nonummy
          Lorem ipsum dolor sit amet, diam nonummy
        </p>
      </div>
      <div className='h-[1px] w-full bg-[#E6E6E6]' />
      <div className='flex flex-col gap-3 xl:gap-14'>
        <div className='flex flex-col gap-4'>
          <ServerSelect
            label='Type'
            options={TypeOption}
            value={selectedType}
            onValueChange={setSelectedType}
            placeholder='Choose Type...'
            name='type'
            id='type-select'
          />
          <ServerSelect
            label='Size'
            options={SizeOptions}
            value={selectedSize}
            onValueChange={setSelectedSize}
            placeholder='Choose size...'
            name='size'
            id='size-select'
          />
        </div>
        <div className='space-y-4'>
          <h2 className='text-xl font-medium'>Colors</h2>
          <div className='flex gap-2'>
            {ColorOptions.map((i) => (
              <div
                className='rounded-full flex items-center justify-center w-16 h-16 p-2 bg-[#F4F7F9]'
                key={i}>
                <div
                  className={`w-8 h-8 rounded-full`}
                  style={{ backgroundColor: i }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-6 '>
          <div className='flex gap-2 items-center'>
            <h2 className='font-medium text-xl'>Quantity</h2>
            <p className='font-normal text-base text-[#8A8A8A]'>
              ($300.00 for Piece)
            </p>
          </div>

          <div className='flex xl:items-center justify-between w-full gap-4 flex-col xl:flex-row'>
            <div className='flex gap-3 items-center max-md:w-full max-xl:justify-between'>
              <div className='relative items-center justify-center flex bg-[#F5F5F5] w-36 p-3 rounded-md'>
                <Minus className='absolute top-1/2 -translate-y-1/2 left-3 bg-white rounded p-[0.4rem] w-8 h-8 cursor-pointer' />
                <p className='text-2xl font-medium text-[#333333]'> 01</p>
                <Plus className='absolute top-1/2 -translate-y-1/2 right-3 bg-white rounded p-[0.4rem] w-8 h-8 cursor-pointer' />
              </div>
              <p className='font-medium text-2xl'>$300.00</p>
            </div>

            <Button className='bg-[#BE968E] w-full xl:w-60 py-6 text-base font-medium'>
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
