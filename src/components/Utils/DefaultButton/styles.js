import { makeStyles } from "@material-ui/core";

export const DefaultButtonStyles = makeStyles((theme) => ({
  buttonContainer: {
    backgroundColor: "rgb(0, 101, 255)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(1, 78, 220)",
      color: "#fff",
    },
  },
}));
