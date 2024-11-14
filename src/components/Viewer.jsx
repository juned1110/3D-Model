import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { loadSmplrJs } from "@smplrspace/smplr-loader"; // Import smplr.js

const Viewer = memo(({ mode, onReady }) => {
  useEffect(() => {
    // Load smplr.js and initialize the space
    loadSmplrJs()
      .then((smplr) => {
        const space = new smplr.Space({
          spaceId: "76576eec-688c-49e9-b0af-23af5811d0cc", // Your space ID
          clientToken: "pub_eb760fee77634cdab2fe31146fc371c2", // Your client token
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
