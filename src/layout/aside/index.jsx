import { HomePageAside } from "./home-page-aside";
import { RegularAside } from "./regular-aside";
import { NeedHelp } from "@shared";
import { Icon } from "../../shared/icon/container-icon";
import { useLocation } from "react-router-dom";



export const Aside = () => {

  const { pathname } = useLocation()
  const onClose = () => {
    const asidetag = document.querySelector(".aside-wrapper");
    asidetag.classList.remove("active");
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");

  }

  return (
    <aside className="aside-wrapper" >
      <div className="aside">
        <Icon
          name="close"
          size={16}
          color="#ff6700"
          ariaLabel="back icon"
          className="aside-close"
          onClick={onClose}
        />        {pathname === "/" ? <HomePageAside /> : <RegularAside page={pathname.slice(1)} />}
        <NeedHelp />
      </div>

    </aside>
  );
};

export default Aside;
