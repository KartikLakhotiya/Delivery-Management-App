import React, { useState } from "react";
import "./Map.styles.css";

import ReactMapGl, {
  Marker,
  GeolocateControl,
  FlyToInterpolator,
} from "react-map-gl";

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const Map = ({ orderLocation }) => {
  const accessToken =
    "pk.eyJ1IjoibWl0ZWoyMyIsImEiOiJja3N4MDkwZ2QyNXQxMm50ZnRwNmloZ3ltIn0.cyrDiGmpr5z544YWF5-bVQ";

  const [viewport, setViewport] = useState({
    latitude: 19.236988,
    longitude: 72.846595,
    width: "100%",
    height: "100%",
    zoom: 14,
  });

  const goToOrdersLocation = () => {
    setViewport({
      ...viewport,
      longitude: orderLocation.lng,
      latitude: orderLocation.lat,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      // transitionEasing: easeCubic,
    });
  };

  return (
    <div className="Map">
      <ReactMapGl
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
        <Marker
          latitude={orderLocation.lat}
          longitude={orderLocation.lng}
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
        <button onClick={goToOrdersLocation} style={{ top: 30, right: 10 }}>
          Order
        </button>
      </ReactMapGl>
    </div>
  );
};

export default Map;
