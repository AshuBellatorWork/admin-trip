import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginAuth } from "./services/login";
import {  getCategory } from "./services/category";
import { getTourPackages } from "./services/tourPackages";
import { favTour } from "./services/fav";
import { packageDetail } from "./services/addTourDetail";
import { houseRule } from "./services/houseRule";
import { getFeedback } from "./services/feedback";
import { getDashboard } from "./services/dashBoard";
import { enquiryList } from "./services/enquiryList";
import { getItinerary } from "./services/itinerary";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [loginAuth.reducerPath]: loginAuth.reducer,
    [getCategory.reducerPath]: getCategory.reducer,
    [getTourPackages.reducerPath]: getTourPackages.reducer,
    [favTour.reducerPath]: favTour.reducer,
    [packageDetail.reducerPath]: packageDetail.reducer,
    [houseRule.reducerPath]: houseRule.reducer,
    [getFeedback.reducerPath]: getFeedback.reducer,
    [getDashboard.reducerPath]: getDashboard.reducer,
    [enquiryList.reducerPath]: enquiryList.reducer,
    [getItinerary.reducerPath]: getItinerary.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginAuth.middleware)
      .concat(getCategory.middleware)
      .concat(favTour.middleware)
      .concat(getTourPackages.middleware)
      .concat(packageDetail.middleware)
      .concat(houseRule.middleware)
      .concat(getFeedback.middleware)
      .concat(enquiryList.middleware)
      .concat(getDashboard.middleware)
      .concat(getItinerary.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
