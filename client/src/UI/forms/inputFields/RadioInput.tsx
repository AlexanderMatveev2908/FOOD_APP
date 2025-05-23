/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { RadioFieldType } from "../../../core/config/fieldsArr/typesFields";

type PropsType = {
  register: UseFormRegister<any>;
  el: RadioFieldType;
  currSorter: string;
  currVals: string[];
  handleChange: (val: string) => void;
  customStyle?: string;
};

const RadioInput: FC<PropsType> = ({
  el,
  currSorter,
  register,
  currVals,
  handleChange,
  customStyle,
}) => {
  return (
    <label
      key={el.id}
      className={`w-full max-w-[65px] py-3 px-8 pr-10 border-2 rounded-xl cursor-pointer group flex justify-center items-center el__flow relative justify-self-center ${
        (currVals || []).includes(el.field)
          ? "border-orange-500 scale-110"
          : "border-[#333] scale-100"
      } ${customStyle ?? ""}`}
    >
      <input
        value={el.field}
        type="checkbox"
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        {...register(`${currSorter}`)}
        onChange={() => handleChange(el.field)}
      />

      {
        <el.icon
          className={`icon__base el__flow pointer-events-none ${
            (currVals || []).includes(el.field) ? "text-orange-500" : ""
          }`}
        />
      }
    </label>
  );
};
export default RadioInput;
