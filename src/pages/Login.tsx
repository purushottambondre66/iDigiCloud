import useStyles from "./LoginStyles";
import { Paper, Typography, Button, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { LayoutContext } from "../context/LayoutContext";

const Login = () => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(LayoutContext);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      setLoading(false);
      setIsLoggedIn(true);
    }, 2000);
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.loginContainer}>
        <Typography className={classes.logo}>iDigiCloud</Typography>
        <Button
          className={classes.loginButton}
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          Login
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
