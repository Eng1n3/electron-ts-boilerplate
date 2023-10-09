import { Controllers } from "@/components/ui";

import { ContactFormValues } from "@/types/form-values/contact";

export const contactFormControllers: Controllers<ContactFormValues, any> = {
  name: {
    control: "text-input",
    label: "Name",
    name: "name",
    withAsterisk: true,
  },
  email: {
    control: "text-input",
    label: "Email",
    name: "email",
    withAsterisk: true,
  },
  phoneNumber: {
    control: "number-input",
    label: "Phone Number",
    name: "phoneNumber",
  },
  // address: {
  //   control: "text-area",
  //   label: "Address",
  //   name: "address",
  // },
  // birthDate: {
  //   control: "date-input",
  //   label: "Birth Date",
  //   name: "birthDate",
  //   col: {
  //     span: 6,
  //   },
  // },
  gender: {
    control: "select",
    label: "Gender",
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  photo: {
    control: "file-input",
    label: "Photo",
    name: "photo",
  },
};
