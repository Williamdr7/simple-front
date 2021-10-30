import { Button } from "@material-ui/core";
import React from "react";
import { DefaultButtonStyles } from "./styles";

export default function DefaultButton({ label, className, ...props }) {
  const classes = DefaultButtonStyles();
  return (
    <Button
      className={classes.buttonContainer}
      {...props}
      variant="outlined"
      size="large"
    >
      {label}
    </Button>
  );
}
