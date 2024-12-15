"use client";

import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { TrackingEventType } from "@/utils/types";

export default function SendTrackingEvent({ event, value }: TrackingEventType) {
  useEffect(() => {
    sendGTMEvent({ event, value });
  }, [event, value]);

  return null;
}
