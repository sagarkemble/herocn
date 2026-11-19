import type * as React from "react";
import Ex_calendar_demo from "@/components/docs/examples/calendar-demo";
import Ex_calendar_basic from "@/components/docs/examples/calendar-basic";
import Ex_calendar_range from "@/components/docs/examples/calendar-range";
import Ex_calendar_caption from "@/components/docs/examples/calendar-caption";
import Ex_calendar_with_presets from "@/components/docs/examples/calendar-with-presets";
import Ex_calendar_with_time from "@/components/docs/examples/calendar-with-time";
import Ex_calendar_booked_dates from "@/components/docs/examples/calendar-booked-dates";
import Ex_calendar_custom_days from "@/components/docs/examples/calendar-custom-days";
import Ex_calendar_week_numbers from "@/components/docs/examples/calendar-week-numbers";

export const previews: Record<string, React.ComponentType> = {
  "calendar-demo": Ex_calendar_demo,
  "calendar-basic": Ex_calendar_basic,
  "calendar-range": Ex_calendar_range,
  "calendar-caption": Ex_calendar_caption,
  "calendar-with-presets": Ex_calendar_with_presets,
  "calendar-with-time": Ex_calendar_with_time,
  "calendar-booked-dates": Ex_calendar_booked_dates,
  "calendar-custom-days": Ex_calendar_custom_days,
  "calendar-week-numbers": Ex_calendar_week_numbers,
};
