import { FC, FormEvent, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFormType } from "../useCheckout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  lastCheckOrderAPI,
  pollingOrderAPI,
} from "../../../../core/api/APICalls/orders";
import { useGetFavHooks } from "../../../../core/hooks/useGetFavHooks";
import { ErrFoodApp, ErrFoodOrder } from "../../../../types/allTypes/API";
import OrderDetails from "./components/OrderDetails";
import { OrderType } from "../../../../types/types";
import {
  defaultValsFormAddress,
  fieldsDividedByAreaCheckout,
} from "../../../../core/config/fieldsArr/allFields/checkout/fieldsCheckout";
import SwapAddress from "./components/SwapAddress";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import ButtonAnimated from "../../../../UI/components/buttons/ButtonAnimated";
import { useNavigate } from "react-router-dom";
import { useFormsCustom, useInfoPop } from "../../../../core/hooks/useGlobal";

type PropsType = {
  formContext: UseFormReturn<AddressFormType>;
  order: OrderType;
  backPaymentInt: PaymentIntent;
};

const CheckoutForm: FC<PropsType> = ({
  formContext,
  order,
  backPaymentInt,
}) => {
  const [isMoneyLoading, setIsMoneyLoading] = useState(false);
  const navigate = useNavigate();
  const [currForm, setCurrForm] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();

  const { handleErrAPI, showToastMsg } = useGetFavHooks();
  const { formContextSearchMyOrders } = useFormsCustom();
  const { setInfoPop } = useInfoPop();

  const isDisabled = () => {
    let isDisabled = false;
    for (const key in defaultValsFormAddress) {
      if (formContext.formState.errors[key]) {
        isDisabled = true;
        break;
      }
    }
    return isDisabled;
  };

  const pollOrder = async (retryCount = 0) => {
    const MAX_RETRY = 10;

    if (retryCount >= MAX_RETRY) {
      showToastMsg("Error processing order payment", "ERROR");
      setIsMoneyLoading(false);
      return;
    }

    try {
      await pollingOrderAPI(order?._id ?? "");

      showToastMsg("Payment successful", "SUCCESS");
      setIsMoneyLoading(false);

      const { setValue } = formContextSearchMyOrders;
      setValue("createdAtSort", ["desc"]);
      setValue("search", order._id as string);
      setValue("searchVals", ["id"]);

      navigate("/my-orders", { replace: true });
    } catch {
      setTimeout(() => {
        pollOrder(retryCount + 1);
      }, 2000);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: AddressFormType) =>
      lastCheckOrderAPI(order?._id ?? "", formData),
    onSuccess: async () => {
      const { paymentClientSecret } = order ?? {};
      if (!stripe || !elements || !paymentClientSecret) return;

      const card = elements.getElement(CardElement);
      if (!card) return;

      setIsMoneyLoading(true);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentClientSecret,
        {
          payment_method: {
            card,
          },
        }
      );

      if (paymentIntent?.status === "succeeded" && !error) {
        pollOrder();
      } else {
        showToastMsg("Payment failed", "ERROR");
        setIsMoneyLoading(false);
      }
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err, push: true });

      if ((err as ErrFoodOrder)?.response?.data?.remakeCart) {
        queryClient.removeQueries({ queryKey: ["myCart"] });

        setTimeout(() => {
          setInfoPop({
            msg: `We thought you might want to review cart up to stock to make new order ${
              (err as ErrFoodOrder)?.response?.data?.resetCoupon
                ? "and do not worry about coupon, we made it active again"
                : ""
            }`,
            confirmActMsg: "Go to cart",
            cancelActMsg: "Close",
            confirmActCb: () => {
              navigate(
                `/search/${(err as ErrFoodOrder)?.response?.data?.restId ?? ""}`
              );
              setInfoPop(null);
            },

            cancelActCb: () => setInfoPop(null),
          });
        }, 100);
      } else if ((err as ErrFoodOrder)?.response?.data?.resetCoupon) {
        setTimeout(() => {
          setInfoPop({
            msg: `Do not worry about coupon, we made it active again so you will be able to use again`,
            confirmActMsg: "Get it",
            cancelActMsg: "_",
            confirmActCb: () => setInfoPop(null),
            cancelActCb: () => setInfoPop(null),
          });
        }, 100);
      }
    },
  });
  const handleOrder = (e: FormEvent) => {
    e.preventDefault();

    const data = formContext.getValues();

    let i = 0;
    let isValid = true;
    do {
      const curr = fieldsDividedByAreaCheckout[i];
      if (curr.some((el) => !el.reg.test(data[el.field]))) {
        isValid = false;
        setCurrForm(i);
        formContext.trigger();
        break;
      }

      i++;
    } while (i < fieldsDividedByAreaCheckout.length);

    if (!isValid) {
      const form = document.getElementById("swapFormOrders");
      const stats = form?.getBoundingClientRect();

      if (stats) {
        setTimeout(() => {
          window.scrollTo({
            top: stats.top,
            behavior: "smooth",
          });
        }, 0);
      }
    } else {
      mutate(data);
    }
  };

  const isLoading = isPending || isMoneyLoading;

  return !stripe || !elements ? null : (
    <form onSubmit={handleOrder} className="w-full grid gap-10 xl:grid-cols-2">
      <SwapAddress {...{ formContext, currForm, setCurrForm }} />

      <OrderDetails
        {...{
          order: order,
          totStripe: backPaymentInt.amount,
        }}
      >
        <div className="w-full max-w-[250px] mt-10">
          <ButtonAnimated
            {...{
              label: "Order now",
              type: "submit",
              isDisabled: isDisabled(),
              isPending: isLoading,
            }}
          />
        </div>
      </OrderDetails>
    </form>
  );
};
export default CheckoutForm;
