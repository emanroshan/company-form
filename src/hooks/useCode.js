import React, { useCallback } from "react";
import { GET_UNIQUECODE } from "../components/constants";
import { useLazyQuery } from "@apollo/client";

export const useCode = () => {
  const [getCode, { data, loading }] = useLazyQuery(GET_UNIQUECODE, {
    variables: {
      concept: "Company",
    },
  });
  let code;
  const onClick = useCallback(async () => {
    const { data } = await getCode();
    code = data?.getUniqueCode?.code;
    return code;
  });
  return {
    code,
    onClick,
  };
};
