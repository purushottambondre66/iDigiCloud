import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    height: "97vh",
    backgroundColor: "#E8E8E8",
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    marginTop: 150,
    height: 150,
    width: 270,
    position: "relative",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 28,
  },
  loginButton: {
    position: "absolute",
    bottom: 50,
    width: 200,
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
