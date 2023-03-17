import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomToastContainer() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      toastStyle={{
        background: "#fff",
        color: "black",
        fontSize: "16px",
        fontWeight: "500",
        borderRadius: "15px",
        paddingInline: "1rem",
        margin: "0.5rem",
        letterSpacing: "0rem",
        userSelect: "none",
      }}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
