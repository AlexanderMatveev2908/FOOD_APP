import { FC } from "react";
import ButtonAnimated from "../../ButtonAnimated/ButtonAnimated";
import { useUser } from "../../../hooks/useGlobal";

const Newsletter: FC = () => {
  const { isLogged } = useUser();

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[200px_1fr] items-center gap-3">
      <div className="w-full flex flex-col">
        <span className="txt__02">Newsletter</span>
      </div>
      <form className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-y-5 gap-x-10 items-end">
        <div className="w-full ">
          <input
            type="email"
            className="input__base txt__01"
            placeholder="Your email..."
          />
        </div>

        <div className="w-full max-w-[200px] md:max-w-[225px] flex justify-start">
          <ButtonAnimated
            {...{
              label: isLogged ? "Subscribe" : "Login Now",
              type: isLogged ? "submit" : "button",
            }}
          />
        </div>
      </form>
      <div className="w-full flex lg:col-span-2">
        <span className="txt__00">
          Subscribe to our newsletter to receive the latest updates and get a
          chance to win a discount coupon.
        </span>
      </div>
    </div>
  );
};
export default Newsletter;
