import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { loadSmplrJs } from "@smplrspace/smplr-loader"; // Import smplr.js

const Viewer = memo(({ mode, onReady }) => {
  useEffect(() => {
    // Load smplr.js and initialize the space
    loadSmplrJs()
      .then((smplr) => {
        const space = new smplr.Space({
          spaceId: "4e19f662-df3f-47ef-b79f-298d8fde4a3f", // Your space ID
          clientToken: "pub_c6e114cddb3b440bbef46643007223d9", // Your client token
          containerId: "smplr-container", // ID of the container where the viewer will be loaded
        });

        space.startViewer({
          preview: true,
          mode,
          allowModeChange: true,
          onReady: () => onReady(space),
          onError: (error) => console.error("Could not start viewer", error),
        });
      })
      .catch((error) => console.error("Failed to load smplr.js", error));
  }, [mode, onReady]); // Re-run if `mode` or `onReady` changes

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "60%", // Aspect ratio
      }}
    >
      <div
        id="smplr-container"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "whitesmoke",
        }}
      />
    </div>
  );
});

Viewer.propTypes = {
  mode: PropTypes.string.isRequired,
  onReady: PropTypes.func.isRequired,
};

export default Viewer;
