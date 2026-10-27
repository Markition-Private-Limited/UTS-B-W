import type { Metadata } from "next";
import BookingApp from "@/components/booking/BookingApp";

export const metadata: Metadata = {
  title: "Book Your Chauffeur — United Travel Services",
  description: "Bespoke chauffeur reservations with United Travel Services.",
};

export default function BookPage() {
  return <BookingApp />;
}
