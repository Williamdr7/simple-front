import { makeStyles } from "@material-ui/core";

export const HomePageStyles = makeStyles((theme) => ({
  tableContainer: {
    backgroundColor: "#fff",
    padding: "25px",
  },
  deleteIcon: {
    color: "rgb(255, 86, 48)",
  },
  editIcon: {
    color: "rgb(0, 101, 255)",
  },
  headerText: {
    "& th": {
      color: "rgb(163, 163, 163)",
    },
  },
  table: {
    border: "1px solid #999999",
    height: "auto",
    "& .MuiTableRow-root": {
      height: "60px",
      "&:hover": {
        backgroundColor: "#f9f9f9",
      },
    },
  },

  addButton: {
    width: "100%",
    textAlign: "end",
  },
}));
