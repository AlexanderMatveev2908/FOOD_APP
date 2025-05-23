import {
  REG_CITY,
  REG_COUNTRY,
  REG_NAME,
  REG_PHONE,
  REG_STATE,
  REG_STREET,
  REG_ZIP,
} from "../../constants/regex.ts";
import { genID } from "../../../../utils/allUtils/genID.ts";
import { UserDetailsFieldType } from "../typesFields.ts";

export const userProfileFields_0: UserDetailsFieldType[] = [
  {
    id: genID(),
    field: "firstName",
    label: "First Name",
    reg: REG_NAME,
    msg: "First Name should start with a capital letter and can only contains letters and apostrophe ",
  },
  {
    id: genID(),
    field: "lastName",
    label: "Last Name",
    reg: REG_NAME,
    msg: "Last Name should start with a capital letter and can only contains letters and apostrophe",
  },
];

export const userProfileFields_1: UserDetailsFieldType[] = [
  {
    id: genID(),
    field: "country",
    label: "Country",
    reg: REG_COUNTRY,
    msg: "Country can only contains letters, and must be at least 2 chars",
  },
  {
    id: genID(),
    field: "state",
    label: "State",
    reg: REG_STATE,
    msg: "State can only contains can only contains letters and hyphens if needed, and must be at least 2 chars ",
  },
  {
    id: genID(),
    field: "city",
    label: "City",
    reg: REG_CITY,
    msg: "City can only contains letters and hyphens if needed, and must be at least 2 chars",
  },
];

export const userProfileFields_2: UserDetailsFieldType[] = [
  {
    id: genID(),
    field: "street",
    label: "Street",
    reg: REG_STREET,
    msg: "Street can only contains letters, numbers, and spaces, and must be at least 5 chars",
  },
  {
    id: genID(),
    field: "zipCode",
    label: "Zip Code",
    reg: REG_ZIP,
    msg: "Zip Code can only contains numbers, at least 5 up to 10 digits",
  },
  {
    id: genID(),
    field: "phone",
    label: "Phone",
    reg: REG_PHONE,
    msg: "Phone can only contains numbers,and including country prefix up to 15 digits ",
  },
];

export const allFields: UserDetailsFieldType[] = [
  ...userProfileFields_0,
  ...userProfileFields_1,
  ...userProfileFields_2,
];

export const fieldsDividedByArea: [
  UserDetailsFieldType[],
  UserDetailsFieldType[],
  UserDetailsFieldType[]
] = [
  [...userProfileFields_0],
  [...userProfileFields_1],
  [...userProfileFields_2],
];

export const totLenUserDetails = 3;
