import { Reveal } from "./reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: SectionHeaderProps) {
  return (
    <Reveal
      className={`mb-10 flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400">
        <span aria-hidden className="h-px w-6 bg-emerald-500/60" />
        {eyebrow}
      </span>
      <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white">
        {title}
      </h2>
      {intro ? (
        <p
          className={`max-w-3xl text-sm leading-relaxed text-neutral-400 lg:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
