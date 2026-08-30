"use client";

import { useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MOCK_TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00"];

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }
  return cells;
}

/**
 * Visual-only stand-in for the real Google Calendar Appointment Schedule
 * iframe, so the layout/sizing can be reviewed before a real booking URL
 * exists. Not wired to any calendar — remove once NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL is set.
 */
export function GoogleCalendarBookingMock() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const cells = buildMonthGrid(today.getFullYear(), today.getMonth());
  const monthLabel = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="relative flex min-h-[560px] flex-col bg-white p-4 text-neutral-800 sm:min-h-[700px] sm:p-6">
      <div className="mb-4">
        <p className="text-sm text-neutral-500">30 min appointment</p>
        <h3 className="text-lg font-medium">{monthLabel}</h3>
      </div>

      <div className="grid flex-1 gap-6 sm:grid-cols-[1fr_200px]">
        <div>
          <div className="grid grid-cols-7 text-center text-xs text-neutral-500">
            {WEEKDAYS.map((day) => (
              <div key={day} className="truncate px-0.5">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-y-1">
            {cells.map((day, i) =>
              day === null ? (
                <div key={i} className="mx-auto aspect-square w-full max-w-10" aria-hidden="true" />
              ) : (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  aria-label={`${monthLabel.split(" ")[0]} ${day}`}
                  aria-pressed={day === selectedDay}
                  className={`mx-auto flex aspect-square w-full max-w-10 items-center justify-center rounded-full text-sm ${
                    day === selectedDay
                      ? "bg-blue-600 font-semibold text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>

        <div className="border-neutral-200 pt-4 sm:overflow-y-auto sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <p className="mb-2 text-sm font-medium">
            {monthLabel.split(" ")[0]} {selectedDay}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-col">
            {MOCK_TIMES.map((time) => (
              <span
                key={time}
                className="rounded-md border border-blue-500 px-3 py-2 text-center text-sm text-blue-600"
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
