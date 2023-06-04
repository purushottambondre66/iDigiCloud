import useStyles from "./NotFoundStyles";
import { Paper, Typography } from "@mui/material";
const NotFound = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.cardContainer}>
        <Typography className={classes.bold} color="text.secondary">
          404
        </Typography>
        <Typography>Page not found!</Typography>
      </Paper>
    </div>
  );
};

export default NotFound;
