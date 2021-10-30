import { makeStyles } from "@material-ui/core";

export const ContentBoxStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    width: "calc(100% - 100px)",
    minHeight: "calc(100% - 100px)",
    padding: "25px",
    margin: "25px",
    "& h2": {
      marginBottom: "16px",
      color: "rgb(29, 44, 75)",
      fontSize: "24px",
      fontWeight: "600",
    },
  },
}));
