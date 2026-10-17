import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export default function PageHeader({ title, subtitle, icon }: Props) {
  return (
    <div className="text-center mb-10 pt-12">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink-800 inline-flex items-center gap-3">
        {icon}
        {title}
      </h1>
      {subtitle && (
        <p className="hand-text text-lg text-ink-400 mt-2">{subtitle}</p>
      )}
    </div>
  );
}
