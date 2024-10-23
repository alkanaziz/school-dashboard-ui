"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 charactes long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),

  email: z.string().email({ message: "Email is invalid!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(3, { message: "First name is required!" }),
  lastName: z.string().min(3, { message: "Last name is required!" }),
  phone: z.string().min(3, { message: "Phone is required!" }),
  address: z.string().min(3, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required!" }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h2 className="text-xl font-medium">
        {type === "create"
          ? "Create a new student"
          : "Update the information of the student"}
      </h2>
      <span className="text-gray-500">Authentication Information:</span>
      <div className="authentication flex flex-wrap justify-between gap-4">
        <InputField
          label="Username"
          name="username"
          register={register}
          defaultValue={data?.username}
          error={errors?.username}
        />
        <InputField
          label="Email Address"
          name="email"
          type="email"
          register={register}
          defaultValue={data?.email}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          defaultValue={data?.password}
          error={errors?.password}
        />
      </div>
      <span className="text-gray-500">Personal Information:</span>
      <div className="personal flex flex-wrap justify-between gap-4">
        <InputField
          label="First Name"
          name="firstName"
          register={register}
          defaultValue={data?.firstName}
          error={errors?.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          register={register}
          defaultValue={data?.lastName}
          error={errors?.lastName}
        />
        <InputField
          label="Phone Number"
          name="phone"
          register={register}
          defaultValue={data?.phone}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          name="address"
          register={register}
          defaultValue={data?.address}
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          type="date"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
        />
        <div className="username flex w-full flex-col gap-2 md:w-1/4">
          <label htmlFor="sex" className="text-xs text-gray-500">
            Sex
          </label>
          <select
            className="w-full rounded-md bg-transparent p-2 text-sm ring-[1.5px] ring-gray-300"
            id="sex"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option className="text-gray-300" value="select">
              Select
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-500">{String(errors.sex.message)}</p>
          )}
        </div>
        <div className="username flex w-full flex-col justify-center gap-2 md:w-1/4">
          <label
            htmlFor="img"
            className="flex cursor-pointer items-center gap-2 text-xs text-gray-500"
          >
            <Image src="/upload.png" alt="upload icon" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-500">{String(errors.img.message)}</p>
          )}
        </div>
      </div>

      <button className="rounded-md bg-blue-500 px-4 py-2">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
