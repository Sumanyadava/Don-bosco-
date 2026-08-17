import EventDetailClient from "./EventDetailClient";

export function generateStaticParams() {
  return [
    { id: "EVT-101" },
    { id: "EVT-102" },
    { id: "EVT-103" },
    { id: "EVT-104" },
  ];
}

export default function EventDetailPage() {
  return <EventDetailClient />;
}
