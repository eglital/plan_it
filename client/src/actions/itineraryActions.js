import { SET_ITINERARY_DATA, SET_FINAL_ITINERARY } from "./types";
import itineraryHelper from "../helpers/itineraryHelper";
import { setDuration, changeLastFood } from "./builderActions";
import { deleteLocationsData } from "./locationsActions";
import axios from "axios";

export function setItineraryData(data) {
  return {
    type: SET_ITINERARY_DATA,
    data
  };
}

export function getFinalItinerary(itineraryId, history) {
  return dispatch => {
    axios
      .get(`/api/itinerary/final/${itineraryId}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Response not ok");
        }
        itineraryHelper.setItineraryObj(itineraryId);
        dispatch(
          setFinalItinerary({
            finalItinerary: response.data.itinerary,
            id: itineraryId
          })
        );
        history.push(`/itinerary-overview/${itineraryId}`);
        dispatch(setDuration({ duration: 0 }));
        dispatch(deleteLocationsData());
        dispatch(changeLastFood(false));
      })
      .catch(function(error) {
        console.log("Error:", error);
      });
  };
}

export function setFinalItinerary(data) {
  return {
    type: SET_FINAL_ITINERARY,
    data
  };
}

export function getSavedItinerary(itineraryId) {
  return dispatch => {
    axios
      .get(`/api/itinerary/saved/${itineraryId}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Response not ok");
        }
        dispatch(
          setFinalItinerary({
            finalItinerary: response.data.itinerary,
            id: itineraryId
          })
        );
      })
      .catch(function(error) {
        console.log("Error:", error);
      });
  };
}
