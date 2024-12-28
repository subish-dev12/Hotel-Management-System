import { useEffect, useRef } from "react";

//we renamed the close function to handler to make it more generic and can be used for other different scenarios
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // e.stopPropagation();
        if (ref.current && !ref.current.contains(e.target)) {
          console.log(ref.current);
          console.log("pressed outside the modal");
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing); //we're capturing  the event on the capturing phase of the event delegation  so added 'listenCaptuing'
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
