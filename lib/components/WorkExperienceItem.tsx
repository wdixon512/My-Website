import { LevelCard, LevelCardProps } from "./LevelCard";

export type WorkExperienceItemProps = Omit<
  LevelCardProps,
  "worldLabel" | "title"
> & {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  worldLabel?: string;
  children?: React.ReactNode;
};

/** @deprecated Prefer LevelCard directly; kept for compatibility. */
export const WorkExperienceItem = (props: WorkExperienceItemProps) => {
  const {
    company,
    role,
    startDate,
    endDate,
    link,
    imageSrc,
    worldLabel = "LEVEL",
    children,
    ...rest
  } = props;

  return (
    <LevelCard
      worldLabel={worldLabel}
      title={company}
      meta={`${role} · ${startDate} – ${endDate}`}
      link={link}
      imageSrc={imageSrc}
      imageAlt={company}
      {...rest}
    >
      {children}
    </LevelCard>
  );
};
