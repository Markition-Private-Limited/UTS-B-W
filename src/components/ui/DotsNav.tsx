// Small pagination/nav indicator: an elongated pill for the active dot,
// small plain circles for the rest.
export default function DotsNav({
  count,
  activeIndex = 0,
  className = "",
}: {
  count: number;
  activeIndex?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-[0.4167vw] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            height: "0.4167vw",
            minHeight: "6px",
            width: i === activeIndex ? "1.25vw" : "0.4167vw",
            minWidth: i === activeIndex ? "18px" : "6px",
            backgroundColor: i === activeIndex ? "#0d0d0d" : "#D9D9D9",
          }}
        />
      ))}
    </div>
  );
}
