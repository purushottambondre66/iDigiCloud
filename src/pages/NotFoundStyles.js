import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    height: "97vh",
    backgroundColor: "#E8E8E8",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    marginTop: 150,
    height: 170,
    width: 270,
    position: "relative",
  },
  bold: {
    fontSize: 54,
    fontWeight: 600,
  },
}));
