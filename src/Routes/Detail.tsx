import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getDetails } from "../api";

function Detail() {
  const location = useLocation();
  const id = location.pathname.slice(1)?.slice(7);

  const { isLoading, data } = useQuery(
    ["details", id],
    () => getDetails(id) || null
  );

  console.log(data);

  return <div>{id}</div>;
}

export default Detail;
