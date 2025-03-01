import { KeyRound, LogIn, ShieldCheck, UserPen } from "lucide-react";
import { genID } from "../../../../utils/genID";

export const switchFormLeftArr = [
  {
    id: genID(),
    label: "Forgot password",
    svg: KeyRound,
    type: "login",
  },
  {
    id: genID(),
    label: "Verify account",
    svg: ShieldCheck,
    type: "register",
  },
];

export const switchFormRightArr = [
  {
    id: genID(),
    label: "Create account",
    svg: UserPen,
    type: "login",
  },
  {
    id: genID(),
    label: "Login in your account",
    svg: LogIn,
    type: "register",
  },
];
