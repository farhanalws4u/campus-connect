import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import LoadingOverlay from "react-loading-overlay";

function LoadingOverlayComp({ children, active }) {
  return (
    <LoadingOverlay
      active={active}
      spinner={<ClimbingBoxLoader color={"#fff"} speedMultiplier={1.2} />}
      fadeSpeed={300}
    >
      {children}
    </LoadingOverlay>
  );
}

export default LoadingOverlayComp;
