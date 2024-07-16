import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MapTracking.styles.css";

import ReactMapGl, {
  Marker,
  GeolocateControl,
  FlyToInterpolator,
} from "react-map-gl";

import io from "socket.io-client";

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const MapTracking = () => {
  const location = useLocation();

  const accessToken =
    "pk.eyJ1IjoibWl0ZWoyMyIsImEiOiJjbG85dG91YjEwaWNwMmxwZXhyZ2IwZjJ5In0.1ohhcp3PoY6W8lor3RT8pg";

  // const [viewport, setViewport] = useState({
  //   latitude: location.state.lat,
  //   longitude: location.state.lng,
  //   width: "80vw",
  //   height: "80vh",
  //   zoom: 12,
  // });

  const [viewport, setViewport] = useState({
    latitude: 19.236988,
    longitude: 72.846595,
    width: "80vw",
    height: "80vh",
    zoom: 12,
  });

  const [myLat, setMyLat] = useState(19.236988);
  const [myLng, setMyLng] = useState(72.846595);
  const [driverLat, setDriverLat] = useState(null);
  const [driverLng, setDriverLng] = useState(null);

  const [persistName, setPersistName] = useState(location.state.name);

  console.log(persistName);

  // React.useEffect(() => {
  //   if (persistName) {
  //     privateSocket.emit("join", persistName);
  //     console.log(persistName);
  //   } else {
  //     const savedName = localStorage.getItem("name");
  //     setPersistName(savedName);
  //   }
  //   console.log("connect")
  //   socket.on("connect", () => {
  //     console.log("socket:connect")
  //     privateSocket.emit("join", persistName);
  //   });

  //   privateSocket.on("new-location", (message) => {
  //     console.log("Location received");
  //     console.log(message);
  //     setDriverLat(message.lat);
  //     setDriverLng(message.lng);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  //console.log(location.state);

  const goToMyLocation = () => {
    setViewport({
      ...viewport,
      longitude: 72.846595,
      latitude: 19.236988,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      // transitionEasing: easeCubic,
    });
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    ><ReactMapGl
      {...viewport}
      mapboxApiAccessToken={accessToken}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
        {/* <Marker
          latitude={myLat}
          longitude={myLng}
          offsetLeft={-1}
          offsetTop={-1}
        >
          <div>You are here</div>
        </Marker> */}
        {driverLat !== null && driverLng !== null ? (
          <Marker
            latitude={driverLat}
            longitude={driverLng}
            offsetLeft={-10}
            offsetTop={-34}
          >
            <div>
              <svg
                width="20"
                height="34"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="5" cy="5.00009" rx="5" ry="5.00009" fill="black" />
                <circle cx="4.99998" cy="5.00001" r="1.66667" fill="white" />
                <line
                  x1="5.125"
                  y1="9.99942"
                  x2="5.16779"
                  y2="16.9992"
                  stroke="black"
                  stroke-width="0.25"
                />
              </svg>
            </div>
          </Marker>
        ) : null}
      </ReactMapGl>
      {/* <button onClick={goToMyLocation}>New York City</button> */}
    </div>
  );
};

export default MapTracking;
