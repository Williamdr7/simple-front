import React from "react";
import { Box } from "@material-ui/core";
import Loader from "react-loader-spinner";

export default function DefaultLoader() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      textAlign="center"
    >
      <Loader
        style={{ margin: "auto" }}
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
      />
      ;
    </Box>
  );
}
