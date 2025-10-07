"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NavigationBackground from "./NavigationBackground";
import { useClickOutside } from "@/lib/lib";

export default function UIHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useClickOutside([menuButtonRef, sidebarRef], () => setIsMenuOpen(false));
  const Navigation = [
    {
      icon: "/icons/home.svg",
      name: "Home",
      href: "/",
    },
    {
      icon: "/icons/category.svg",
      name: "Our Category",
      href: "/",
    },
    {
      icon: "/icons/interactive.svg",
      name: "About Us",
      href: "/",
    },

    {
      icon: "/icons/card.svg",
      name: "Contact Us",
      href: "/about",
    },
    {
      icon: "/icons/info.svg",
      name: "FAQs",
      href: "/",
    },
  ];

  return (
    <>
      <header className='py-5 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 '>
        <nav className='flex justify-between items-center'>
          <div className='flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
            <Image
              src='/icons/group.svg'
              alt='logo'
              width={48}
              height={38}
            />
            <ul className='hidden md:flex gap-4 lg:gap-6'>
              {Navigation.map((item) => (
                <Link
                  href={item.href}
                  className=' flex gap-1 items-center hover:pb-2 md:hover:pb-3 lg:hover:pb-4 transition-all duration-300 hover:scale-105 hover:text-black'
                  key={item.name}>
                  <div className='relative w-5 h-5'>
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                    />
                  </div>
                  <span className='text-sm md:text-base'>{item.name}</span>
                </Link>
              ))}
            </ul>
          </div>
          <div className='hidden md:flex gap-4 items-center'>
            <div className='hidden gap-4 items-center lg:flex'>
              <Button
                className='relative w-5 h-5'
                variant='ghost'
                size='icon-sm'>
                <Image
                  className='cursor-pointer'
                  src={"/icons/bag.svg"}
                  alt={"bag"}
                  fill
                />
              </Button>
              <Button
                className='relative w-5 h-5'
                variant='ghost'
                size='icon-sm'>
                <Image
                  className='cursor-pointer'
                  src={"/icons/bell.svg"}
                  alt={"bell"}
                  fill
                />
              </Button>
              <Button
                className='relative w-5 h-5'
                variant='ghost'
                size='icon-sm'>
                <Image
                  className='cursor-pointer'
                  src={"/icons/heart.svg"}
                  alt={"heart"}
                  fill
                />
              </Button>
            </div>
            <div className='flex gap-2'>
              <Button
                size='sm'
                variant='ghost'
                className='flex gap-1 cursor-pointer items-center lg:flex hidden'>
                <span className='font-medium text-sm '>EN</span>
                <Image
                  src={"/icons/arrow.svg"}
                  alt={"bag"}
                  width={24}
                  height={24}
                />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='flex cursor-pointer gap-1 items-center'>
                <Image
                  src={"/icons/profile.svg"}
                  alt={"profile"}
                  width={15}
                  height={15}
                />
                <Image
                  src={"/icons/arrow.svg"}
                  alt={"arrow"}
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='icon-sm'
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls='mobile-sidebar'
              ref={menuButtonRef}
              disabled={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </nav>

        {/* Mobile sidebar and overlay */}

        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/40 md:hidden w-full h-full",
            !isMenuOpen && "hidden"
          )}
          onClick={() => setIsMenuOpen(false)}
        />
        <aside
          id='mobile-sidebar'
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-64 sm:w-72 bg-white shadow-xl md:hidden transform transition-transform duration-300 ease-out",
            isMenuOpen ? "translate-x-0" : "translate-x-100"
          )}
          role='dialog'
          aria-modal='true'
          ref={sidebarRef}>
          <div className='flex items-center justify-between px-6 py-5 border-b'>
            <Image
              src='/icons/group.svg'
              alt='logo'
              width={40}
              height={32}
            />
          </div>
          <nav className='px-2 py-4'>
            <ul className='flex items-end flex-col gap-1'>
              {Navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-50 active:bg-gray-100'
                    onClick={() => setIsMenuOpen(false)}>
                    <span className='text-sm sm:text-base'>{item.name}</span>{" "}
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </header>
      <NavigationBackground />
    </>
  );
}
