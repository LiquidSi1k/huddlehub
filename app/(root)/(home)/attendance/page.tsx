"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";

const Attendance = () => {
  const { endedCalls } = useGetCalls();

  const response =
    endedCalls && endedCalls.length > 0
      ? endedCalls.map((meeting: Call) => {
          console.log((meeting as Call).state.participants);
        })
      : undefined;

  return <section>AttendanceList</section>;
};

export default Attendance;
