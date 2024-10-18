"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    // Set the locale based on the user's preference or a default
    const userLocale = navigator.language || "de";
    setLocale(userLocale);
  }, []);

  return (
    <div className="rounded-lg bg-white p-4">
      <Calendar onChange={onChange} value={value} locale={locale} />
      <div className="flex items-center justify-between">
        <h2 className="my-4 text-xl font-semibold">Events</h2>
        <Image src="/moreDark.png" alt="more icon" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-md border-2 border-t-4 border-gray-100 p-5 odd:border-t-privatSky even:border-t-privatPurple"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-600">{event.title}</h3>
              <span className="text-xs text-slate-400">{event.time}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
