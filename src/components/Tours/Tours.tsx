import React, { useEffect, useState } from "react";
import { Box, Wrap, WrapItem, Flex, Spacer } from "@chakra-ui/react";
import TourCard, { Props } from "../TourCard/TourCard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTours,
  selectIsLoadingTours,
  selectHasErrorTours,
  loadTours,
} from "../../features/tours/toursSlice.js";
import { ITour } from "../../interfaces/ITour";
import SearchTours from "../SearchTours/SearchTours";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectUser,
  selectIsLoadingUser,
  selectHasErrorUser,
  loadUser,
} from "../../features/user/userSlice";
import { Link } from "react-router-dom";

function Tours() {
  const dispatch = useAppDispatch();
  const toursData = useAppSelector(selectTours);
  const userData = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(loadTours());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Box bg="" py={5}>
      <Box
        h={["60px", "60px", "120px"]}
        marginBottom="20px"
        display={"flex"}
        alignItems="center"
        justifyContent={["start"]}
      >
        <SearchTours />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent={"space-around"}>
        {toursData &&
          (toursData as [])?.map((tour: ITour, i: number) => {
            return (
              <TourCard
                key={i}
                id={tour.id}
                days={tour.days}
                city={tour.city}
                country={tour.country}
                title={tour.title}
                personPriceUsd={tour.personPriceUsd}
                mainImages={tour.mainImages}
              />
            );
          })}
      </Box>
    </Box>
  );
}

export default Tours;
