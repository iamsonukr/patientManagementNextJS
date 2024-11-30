import React from 'react';
import Image from 'next/image';
import logo from '../public/assets/icons/logo-full.svg';
import Link from 'next/link';
import PatientForm from './forms/page';

const Page = () => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP verification | Passkey Model */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src={logo}
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 fit"
          />
          
        </div>
        <PatientForm />
        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            @2024 CarePulse
          </p>
          <Link href="/?admin=true" className="text-green-500">
            Admin
          </Link>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Page;
