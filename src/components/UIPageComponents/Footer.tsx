import Image from "next/image";

import { GridContainer, GridContainerProps } from "../GridContainer";

export default function UIFooter() {
  const layout = [
    {
      items: [
        { id: "One", span: 1 },
        {
          id: "Two",
          span: 1,
          media: [
            { breakpoint: "lg", widthCondition: "exactmin", hidden: true },
          ],
        },
        {
          id: "Three",
          span: 1,
          media: [
            { breakpoint: "lg", widthCondition: "exactmin", hidden: true },
          ],
        },
        {
          id: "Four",
          span: 1,
          media: [
            { breakpoint: "lg", widthCondition: "exactmin", hidden: true },
          ],
        },
      ],
      columns: "1fr 1fr 1fr 1fr",
    },
    {
      items: [
        { id: "Two", span: 1, media: [{ breakpoint: "lg", hidden: true }] },
        { id: "Three", span: 1, media: [{ breakpoint: "lg", hidden: true }] },
      ],
      columns: "1fr 1fr",
      media: [{ breakpoint: "md" }],
    },
    {
      items: [
        { id: "Four", span: 1, media: [{ breakpoint: "lg", hidden: true }] },
      ],
      columns: "1fr",

      // media: [{ breakpoint: "lg" }],
    },
  ] as GridContainerProps["layout"];
  const children = {
    One: <One />,
    Two: <Two />,
    Three: <Three />,
    Four: <Four />,
  };
  return (
    <div className='bg-[url(/footer.jpg)] bg-center bg-no-repeat bg-cover flex items-center justify-center'>
      <GridContainer
        className='bg-black/50 lg:px-32 lg:py-24 py-12 px-12 text-white/70 w-full '
        id='footer'
        layout={layout}>
        {children}
      </GridContainer>
    </div>
  );
}

const One = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Image
          src='/TTlogo.svg'
          alt=''
          height={51}
          width={65}
        />
      </div>
      <p className='w-[324px] font-medium text-sm'>
        Ipsam in eos qui consequatur ab cum maxime.Soluta dolor quae Ipsam in
        eos qui consequatur ab .Soluta dolor quae Ipsam in eos quconsequatur ab
        cum maxime.Soluta dolor quae
      </p>
    </div>
  );
};

const Two = () => {
  return (
    <div className='flex flex-col gap-6'>
      <p className='font-semibold text-2xl text-white'>Let Us Help</p>
      <ul className='text-base font-medium flex flex-col gap-2'>
        <li>My Account</li>
        <li>FAQs</li>
        <li>Category</li>
        <li>All Products</li>
      </ul>
    </div>
  );
};
const Three = () => {
  return (
    <div className='flex flex-col gap-6'>
      <p className='font-semibold text-2xl text-white'>Policies</p>
      <ul className='text-base font-medium flex flex-col gap-2'>
        <li>Refund Policy</li>
        <li>About Us</li>
        <li>Cancellation Policy</li>
        <li>Terms and Conditions</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
  );
};
const Four = () => {
  const socialMediaIcons = [
    "/icons/facebook.svg",
    "/icons/twitter.svg",
    "/icons/instagram.svg",
    "/icons/linkedin.svg",
    "/icons/whatsapp.svg",
    "/icons/telegram.svg",
  ];
  return (
    <div className='flex flex-col gap-6 w-[369px]'>
      <p className='font-semibold text-2xl text-white'>Send Email</p>
      <div className='relative'>
        <input
          className='w-full bg-white p-6  rounded-xl placeholder:text-gray-400'
          type='text'
          name='email'
          placeholder='Email address'
        />
        <button className='absolute top-1/2 -translate-y-1/2 right-4 rounded-md px-12 py-3 bg-[#BE968E]'>
          Send
        </button>
      </div>
      <div>
        <p className='text-sm font-semibold pb-3 text-white'>Follow Us</p>
        <ul className='text-base font-medium flex gap-4 text-white'>
          {socialMediaIcons.map((i) => (
            <Image
              key={i}
              width={24}
              height={24}
              src={i}
              alt={i}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
