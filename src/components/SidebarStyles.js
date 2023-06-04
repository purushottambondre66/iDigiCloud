import { makeStyles } from "tss-react/mui";

export default makeStyles()((theme) => ({
  nestedList: {
    marginLeft: 20,
  },
  userInfoCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: "#E8E8E8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonIcon: {
    marginRight: 10,
    width: 20,
  },
  logoutButton: {
    marginTop: 10,
  },
  linkText: {
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "1.5",
    whiteSpace: "nowrap",
  },
  linkTextActive: {
    color: "#fff",
  },
  linkActive: {
    backgroundColor: theme.palette.primary.main,
  },
  breadcrumbContainer: {
    padding: 20,
    marginBottom: 20,
  },
  breadcrubmLink: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  breadcrumbInactiveLink: {
    display: "flex",
    alignItems: "center",
  },
  languageContainer: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  languageSelect: {
    color: "#fff",
    height: 40,
    width: 100,
  },
  apploader: {
    position: "absolute",
    top: "50%",
    left: "46%",
  },
}));
