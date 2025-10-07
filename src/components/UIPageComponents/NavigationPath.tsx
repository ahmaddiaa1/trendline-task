"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function NavigationPath() {
  return (
    <Breadcrumb className='bg-[#ECECEC66] p-5 rounded-2xl m-0'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <BreadcrumbPage className='tex-base font-medium text-black'>
              Home
            </BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='text-[#020202]' />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <BreadcrumbPage className='tex-base font-medium text-black'>
              Our Category
            </BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='text-[#020202]' />
        <BreadcrumbItem>
          <BreadcrumbPage className='font-medium text-[#8A8A8A]'>
            Product Details
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default NavigationPath;
