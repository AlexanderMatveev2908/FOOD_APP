// import { FC, useState } from "react";
// import DropHandler from "../../UI/common/SearchBar/components/DropHandler";
// import { UseFormReturn } from "react-hook-form";
// import CheckBox from "../../UI/forms/inputFields/CheckBox";
// import { GiReceiveMoney } from "react-icons/gi";
// import { CheckBoxFieldType } from "../../core/config/fieldsArr/allFields/MyRestaurants/makeUpdate";

// type PropsType = {
//   formContext: UseFormReturn;
//   priceFields: CheckBoxFieldType[];
// };

// const RangePrice: FC<PropsType> = ({ formContext, priceFields }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const { register, watch } = formContext;

//   return (
//     <div className="w-full grid grid-cols-1">
//       <DropHandler
//         {...{
//           isOpen,
//           setIsOpen,
//           txt: "Avg price dish",
//           Icon: GiReceiveMoney,
//         }}
//       />

//       <div
//         className={`w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]  gap-5 transition-all duration-300 ${
//           isOpen
//             ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
//             : "opacity-0 max-h-0 pointer-events-none"
//         }`}
//       >
//         {priceFields.map((el) => (
//           <CheckBox
//             key={el.id}
//             {...{
//               field: el,
//               register,
//               currCategory: "priceRange",
//               valsChosen: watch("priceRange"),
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default RangePrice;
