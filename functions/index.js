// Import Firebase Admin SDK
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase App
admin.initializeApp();
const db = admin.firestore();

// Define an API route to save a trip
exports.createTrip = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const {vehicleType, currentLocation, destination, price, userId} =
      req.body;

    // Validate request body
    if (!vehicleType || !currentLocation || !destination || !price || !userId) {
      return res.status(400).send({error: "Missing required fields"});
    }

    // Create a trip document in Firestore
    const tripRef = await db.collection("trips").add({
      vehicleType,
      currentLocation,
      destination,
      price,
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).send({message: "Trip created", tripId: tripRef.id});
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).send({error: "Internal Server Error"});
  }
});
