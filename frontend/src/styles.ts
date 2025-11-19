import type { CSSProperties } from "react";

export const PRIMARY_COLOR = "var(--primary-green)";
export const TEXT_COLOR = "var(--text-color)";
export const SECONDARY_COLOR = "var(--secondary-color)";
export const LIGHT_GREY = "var(--light-grey)";    
export const BORDER_GREY = "var(--border-grey)"; 

type GlobalStyles = {
  [key: string]: CSSProperties;
  buttonDisabled: CSSProperties;
  navItem: CSSProperties;
  navIcon: CSSProperties;
};

export const globalStyles: GlobalStyles = {
  card: {
    maxWidth: 360,
    margin: "40px auto",
    padding: "30px 24px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    backgroundColor: SECONDARY_COLOR,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    margin: "8px 0",
    border: `1px solid ${BORDER_GREY}`,
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "16px",
    backgroundColor: LIGHT_GREY,
    color: TEXT_COLOR,
  },
  button: {
    width: "100%",
    padding: "15px",
    margin: "20px 0 10px 0",
    border: "none",
    borderRadius: "8px",
    backgroundColor: PRIMARY_COLOR,
    color: SECONDARY_COLOR,
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  navBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: SECONDARY_COLOR,
    borderTop: `1px solid ${BORDER_GREY}`,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0 10px",
    zIndex: 100,
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "#a0a0a0",
    fontSize: "12px",
    fontWeight: "500",
    padding: "5px 0",
  },
  navIcon: {
    fontSize: "22px",
    marginBottom: "4px",
  },
};
