import type { Metadata } from "next";
import { ServiceLanding } from "@/components/services/ServiceLanding";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { getService } from "@/content/services";
import type { ImageSlot, IconName } from "@/lib/types";

export const metadata: Metadata = {
  title: "Private Airport Transfers in Mauritius",
  description:
    "Reliable private airport pickup and drop-off anywhere in Mauritius. Meet & greet at SSR International Airport, fixed transparent starting prices, and clean air-conditioned vehicles.",
  alternates: { canonical: "/airport-transfers" },
};

const hero: ImageSlot = {
  id: "transfers-hero",
  alt: "Air-conditioned transfer vehicle on a scenic Mauritius coastal road at sunrise",
  tone: "ocean",
  orientation: "wide",
};

const vehicles: { icon: IconName; name: string; detail: string }[] = [
  { icon: "car", name: "Private car", detail: "Ideal for couples and solo travellers — comfortable and quick." },
  { icon: "users", name: "SUV / minivan", detail: "For families and small groups with more luggage." },
  { icon: "route", name: "Group vehicle", detail: "Larger parties and multi-family arrivals travelling together." },
];

const coverage = ["North (Grand Baie, Pereybère)", "East (Belle Mare, Trou d'Eau Douce)", "South (Bel Ombre, Blue Bay)", "West (Flic en Flac, Le Morne)"];

export default function AirportTransfersPage() {
  const service = getService("airport-transfers")!;
  return (
    <ServiceLanding
      service={service}
      hero={hero}
      quoteServiceKey="transfer"
      subtitle="A driver is waiting the moment you land — no queues, no haggling, no surprises. Door-to-door comfort anywhere on the island."
      lead="Arriving in a new country is the moment you most want things to just work. We meet you in the arrivals hall at Sir Seewoosagur Ramgoolam International Airport and take you straight to your hotel or villa — anywhere in Mauritius — in a clean, air-conditioned vehicle at a fixed, transparent price agreed in advance."
      keyFacts={[
        { icon: "map-pin", label: "Coverage", value: "Anywhere in Mauritius" },
        { icon: "shield", label: "Meet & greet", value: "Name board in arrivals" },
        { icon: "clock", label: "Flight tracking", value: "We adjust to delays" },
        { icon: "sparkles", label: "Starting price", value: "From $45 per vehicle (car, up to 2)" },
      ]}
      features={[
        { icon: "shield", title: "Meet & greet", body: "Your driver waits in the arrivals hall with a name board — no wandering, no confusion after a long flight." },
        { icon: "clock", title: "Flight monitoring", body: "We track your flight and adjust the pickup automatically if you're early or delayed." },
        { icon: "car", title: "Clean, comfortable vehicles", body: "Air-conditioned, well-maintained vehicles sized to your party and luggage." },
        { icon: "map-pin", title: "Anywhere on the island", body: "Pickup and drop-off at any hotel, villa or address across Mauritius." },
        { icon: "users", title: "Infant seats on request", body: "Travelling with little ones? Ask for an infant seat when you book." },
        { icon: "check", title: "Fixed, transparent pricing", body: "A fixed price per vehicle, agreed before you travel — no meters, no surprises on arrival." },
      ]}
      steps={[
        { title: "Send your flight & hotel", description: "Share your arrival flight number and where you're staying when you request a quote." },
        { title: "We confirm your transfer", description: "You get a fixed price and a clear confirmation with your driver details." },
        { title: "Meet & ride", description: "Your driver greets you in arrivals and takes you door to door." },
      ]}
      faqs={[
        { question: "Do you provide airport transfers anywhere in Mauritius?", answer: "Yes — we provide pickup and drop-off anywhere in Mauritius, at your hotel or any preferred location." },
        { question: "What happens if my flight is delayed?", answer: "We monitor your flight and adjust the pickup time automatically, so your driver is there when you land." },
        { question: "Can I book a return transfer too?", answer: "Yes. Most guests book both arrival and departure transfers together for peace of mind — just let us know your flight times." },
        { question: "Are child seats available?", answer: "Yes, child seats are available on request. Please mention the ages of children when you enquire." },
      ]}
    >
      <Section surface="canvas">
        <div className="flex flex-col gap-10">
          <SectionHeader align="left" eyebrow="Vehicles & coverage" title="The right vehicle, every corner of the island" />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <ul className="grid gap-5 sm:grid-cols-3">
              {vehicles.map((v) => (
                <li key={v.name} className="flex flex-col gap-3 rounded-card border border-hairline bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lagoon-mist text-ocean">
                    <Icon name={v.icon} size={22} />
                  </span>
                  <h3 className="text-lg">{v.name}</h3>
                  <p className="text-sm text-muted">{v.detail}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-card border border-hairline bg-lagoon-mist/50 p-6">
              <h3 className="text-lg font-semibold text-ink">We cover every coast</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {coverage.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-ink">
                    <Icon name="map-pin" size={16} className="text-ocean" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </ServiceLanding>
  );
}
