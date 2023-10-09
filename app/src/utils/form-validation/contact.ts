import { z } from "zod";

import {
  zDate,
  zEmail,
  zImage,
  zImageOptional,
  zNumberRequired,
  zRequiredString,
  zString,
} from "./custom-validator/global";

export const contactFormSchema = z.object({
  name: zRequiredString,
  email: zEmail,
  gender: zString,
  photo: zImageOptional,
  phoneNumber: zNumberRequired,
});
