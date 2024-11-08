import { useEffect } from "react";
import * as smplr from "@smplrspace/smplr-loader"; // <-- Import smplr here

const useSmplrJs = ({ onLoad }) => {
  useEffect(() => {
    if (onLoad) {
      onLoad(smplr);
    }
  }, [onLoad]);
};

export default useSmplrJs;
