/*
    home
    current
    compare
    rankings
    profile
*/

import { useLocation } from "react-router-dom";

function LimitToPages({ children, pages }) {
  const location = useLocation();
  let shouldShow = false;

  console.log({ pages, location });

  for (const page of pages) {
    switch (page) {
      case "home":
        if (location.pathname === "/") {
          shouldShow = true;
          break;
        }
        break;
      case "compare":
      case "profile":
        if (location.pathname.startsWith(`/${page}`)) {
          shouldShow = true;
          break;
        }
        break;
      default:
        if (`/${page}` === location.pathname) {
          shouldShow = true;
          break;
        }
    }
  }

  if (!shouldShow) return <></>;

  return <>{children}</>;
}

export default LimitToPages;
