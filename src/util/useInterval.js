import React, { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  // useRef() => React saves prevState
  //   useRef hook takes in an initial value to be stored —
  // i.e: useRef("INITIAL_VALUE") —
  // and it RETURNS an object with a current property
  //   {current: "INITIAL_VALUE"}.

  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
// console.log("USEINTERVAL: ", useInterval);
export default useInterval;
