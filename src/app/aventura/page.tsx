import type { Metadata } from "next";
import { AventuraContent } from "@/components/pages/AventuraContent";

export const metadata: Metadata = {
  title: "Aventura Villavicencio — 5 Días",
  description:
    "Plan de 5 días en el Meta — Oroch 4x4, cascadas, delfines rosados, trochas y naturaleza pura. Miércoles a Domingo.",
  robots: { index: false, follow: false },
};

export default function Aventura() {
  return <AventuraContent />;
}
