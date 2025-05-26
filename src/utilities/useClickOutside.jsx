import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  useEffect(() => {
    // console.log(ref);
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      // console.log({target: event.target, currentTarget: event.currentTarget})
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
