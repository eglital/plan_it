const express = require("express");
const router = express.Router();
const moment = require("moment");
const mongoose = require("mongoose");
const models = require("./../models");
const Itinerary = mongoose.model("Itinerary");
const {
  googleMapsClient,
  selectingItinerary,
  finishingItinerary
} = require("../helpers/googleApiHelpers");

const {
  initialFourSquareRequest,
  spontaneousFourSquareRequest
} = require("../helpers/fourSquareRequestHelpers");

router.post("/itinerary/start", (req, res, next) => {
  initialFourSquareRequest(req.body.formSubmission, next)
    .then(responseObject => {
      res.send(responseObject);
    })
    .catch(next);
});

router.put("/itinerary/select", (req, res, next) => {
  // need to get this from FE
  console.log("checking distance");
  const { location, itineraryId, section } = req.body;
  selectingItinerary({
    location,
    itineraryId,
    section,
    res
  })
    .then(itinerary => res.send({ duration: itinerary.duration }))
    .catch(next);
});

router.get("/itinerary/final/:itineraryId", (req, res, next) => {
  console.log("setting final location");
  let itineraryId = req.params.itineraryId;
  finishingItinerary({ itineraryId, res })
    .then(itinerary => res.send({ itinerary: itinerary.data }))
    .catch(next);
});

router.get("/itinerary/saved/:itineraryId", (req, res, next) => {
  Itinerary.findById(req.params.itineraryId)
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(next);
});

router.get("/spontaneous", (req, res, next) => {
  spontaneousFourSquareRequest()
    .then(responseObject => {
      res.send(responseObject);
    })
    .catch(next);
});

module.exports = router;
