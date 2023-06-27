import { useQuery } from "@apollo/client";
import { GET_ALLSHIFT } from "../graphql/gql_getAllShift";
import  React,{ useEffect } from "react";

export function ShiftType (){
    const { data, refetch , previousData } = useQuery(GET_ALLSHIFT, {
        
        onError: (e) => {
          console.log(e.message, "onError");
        },
        fetchPolicy: "cache-and-network",
        pollInterval: 0,
      });

      useEffect(() => {
        refetch()
      }, [])
      
    return data?.allShift
}