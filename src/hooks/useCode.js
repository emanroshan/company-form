import React, { useCallback } from "react";
import { GET_UNIQUECODE } from "../components/constants";
import { useLazyQuery } from "@apollo/client";


export const useCode = () => {
    const [getCode, { data, loading }] = useLazyQuery(GET_UNIQUECODE, {
        variables: {
          concept: "Company"
        }
    });
    // let code = "abcd";
    let code;
    const onClick = useCallback (async() => {
        const { data } = await getCode();
        code = data?.getUniqueCode?.code;
        console.log(code);
        return data?.getUniqueCode?.code;
    })
    return {
        code,
        onClick
    }
}