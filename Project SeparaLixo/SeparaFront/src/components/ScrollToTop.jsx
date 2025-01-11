import { Fab, Zoom } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={showButton}>
      <Fab
        color="primary"
        size="large"
        onClick={ScrollToTop}
        style={{ position: "fixed", bottom: 70, right: 20 }}
      >
        <ArrowCircleUpIcon sx={{ fontSize: 45 }} />
      </Fab>
    </Zoom>
  );
}
export default ScrollToTop;
