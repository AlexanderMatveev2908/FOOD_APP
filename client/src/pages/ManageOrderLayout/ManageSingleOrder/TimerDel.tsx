import { FC, useEffect, useState } from "react";
import { BiSolidTimer } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import { isObjOk } from "../../../utils/allUtils/validateData";
import {
  getColorTimer,
  getPercDelTime,
} from "../../../utils/allUtils/formatTime";
import { OrderType } from "../../../types/types";

type PropsType = {
  order: OrderType;
  isOrderOk: boolean;
};

const TimerDel: FC<PropsType> = ({ order, isOrderOk }) => {
  const [percDel, setPercDel] = useState(25);

  useEffect(() => {
    if (!isObjOk(order) || ["pending", "cancelled"].includes(order?.status)) {
      return;
    } else if (isOrderOk) {
      setPercDel(100);
      return;
    }

    const interval = setInterval(() => {
      setPercDel(getPercDelTime(order as OrderType));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOrderOk, order]);

  {
    /* IMPORTANT => I DO NOT HAVE A GOOD TASTE IN FACT OF COLOR, SO I STRONGLY RECOMMEND TO CHANGE THEM */
  }
  return (
    !["pending", "cancelled"].includes(order.status) && (
      <div className="w-full relative">
        <div className="w-full absolute h-[30px] border-2 border-orange-500  rounded-full"></div>

        <div
          style={{
            left: `calc(${percDel}% - 45px)`,
          }}
          className="absolute border-2 -top-[10px] h-[50px] w-[50px] rounded-full bg-[#111] border-orange-500 text-orange-500 z-60 flex justify-center items-center"
        >
          {isOrderOk ? (
            <FaRegCheckCircle className="w-[50px] h-[50px]" />
          ) : (
            <BiSolidTimer className="w-[50px] h-[50px]" />
          )}
        </div>
        <div className="absolute rounded-full h-[30px] w-full flex justify-start items-center p-1">
          <span
            style={{ width: `${percDel}%` }}
            className={`h-full rounded-full ${getColorTimer(
              isOrderOk,
              percDel
            )}`}
          ></span>
        </div>
      </div>
    )
  );
};
export default TimerDel;
