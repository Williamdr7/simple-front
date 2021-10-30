import React from "react";
import { ContentBoxStyles } from "./styles";

export default function ContentBox({ children }) {
  const classes = ContentBoxStyles();
  return <div className={classes.container}>{children}</div>;
}
