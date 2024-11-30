"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField"
import SubmitButton from "@/components/SubmitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phone_input',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',

}

function PatientForm() {
  const router=useRouter();

  const [isLoading, setisLoading] = useState(false)

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit ({name, email, phone}: z.infer<typeof userFormValidation>) {
    setisLoading(true)

    try {
      const userData={name,email,phone}
      const user=await createUser(userData);

      if(user) 
        {
          console.log(user)
          router.push(`/patients/${user.$id}/register`)
        }
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <section className="mb-12 space-y-4 ">
            <h1 className="header" >Hi there !</h1>
            <p className="text-dark-700" >Schedule your first appointment</p>
          </section>

          {/* username */}
          <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="name" label="Full Name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" />

          {/* email */}
          <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="email" label="Email" placeholder="john@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" />

          {/* Phone Input */}
          <CustomFormField fieldType={FormFieldType.PHONE_INPUT} control={form.control} name="phone" label="Phone Number" placeholder="+91 112 124 1245" iconSrc="/assets/icons/email.svg" iconAlt="email" />

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>

    </div>
  );
}

export default PatientForm; 