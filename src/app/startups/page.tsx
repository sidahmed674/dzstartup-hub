import type { Metadata } from "next";
import StartupsClient from "./StartupsClient";

export const metadata: Metadata = {
  title: "Startups Directory — DzStartup Hub",
  description:
    "Discover Algeria's most innovative startups across all sectors. Filter by stage, category, location and more.",
};

export default function StartupsPage() {
  return <StartupsClient />;
}
