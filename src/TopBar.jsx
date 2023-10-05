import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export default function TopBar({ date, dayFwd, dayBack, today }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            aria-label="Day Back"
            color="inherit"
            onClick={() => dayBack()}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Button
            color="inherit"
            variant="text"
            size="small"
            onClick={() => today()}
          >
            TODAY
          </Button>
          <IconButton
            size="large"
            aria-label="Day Forward"
            color="inherit"
            onClick={() => dayFwd()}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {date}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
