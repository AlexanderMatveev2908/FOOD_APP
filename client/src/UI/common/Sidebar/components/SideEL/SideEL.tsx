/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { makeConditionalStyleLocation } from "../../../../../utils/allUtils/conditionalStyleLocation";
import { SideDropFieldType } from "../../../../../core/config/fieldsArr/typesFields";

type PropsType = {
  handleSideClick: (path: string, from?: string) => void;
  type: string | null;
  location: any;
  el: SideDropFieldType;
};

const SideEL: FC<PropsType> = ({ handleSideClick, type, location, el }) => {
  return (
    <button
      key={el.id}
      onClick={() => handleSideClick(el.path, el?.from)}
      className={`ml-3 w-full cursor-pointer flex gap-3 group max-w-fit items-center el__after_below sideLink ${makeConditionalStyleLocation(
        { location, el, type }
      )}`}
    >
      <el.svg className="svg__sidebar" />

      <span className="cursor-pointer txt__02 group-hover:text-orange-500 el__flow">
        {el.label}
      </span>
    </button>
  );
};
export default SideEL;
