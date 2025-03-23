import { FC } from "react";
import { RestaurantAllUsers } from "../../../types/allTypes/search";
import DetailsRestaurantUser from "../../../UI/components/cards/restaurants/DetailsRestaurantUser";
import DropElAbsolute from "../../../UI/components/DropElAbsolute";
import HeaderName from "../../../UI/components/cards/HeaderName";
import HeaderImgs from "../../../UI/components/cards/HeaderImgs";
import { Link } from "react-router-dom";

type PropsType = {
  rest: RestaurantAllUsers;
};

const SearchRestItem: FC<PropsType> = ({ rest }) => {
  return (
    <div className="card__el border-orange-500">
      <HeaderImgs {...{ images: rest.images }}>
        <HeaderName {...{ name: rest.name }} />
      </HeaderImgs>

      <div className="w-full grid grid-cols-1">
        <div
          className="pt-3 w-full el__flow grid grid-cols-1 gap-3
          "
        >
          <DetailsRestaurantUser {...{ rest, Container: DropElAbsolute }} />
        </div>
      </div>

      <div className="w-full max-w-fit justify-center justify-self-center flex mt-5">
        <Link
          to={`/search/${rest._id}`}
          className="txt__02 border-2 border-orange-500 rounded-xl px-12 py-1 el__flow hover:text-orange-500 hover:scale-110 cursor-pointer"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
};
export default SearchRestItem;
