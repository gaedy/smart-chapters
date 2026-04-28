interface logoProps {
  className?: string;
}

export default function Logo({ className }: logoProps) {
  return (
    <span
      className={`truncate text-lg font-medium font-merriweather ${className}`}
    >
      Smart Chapters
    </span>
  );
}
