export default function Chip({ children }) {
  return (
    <span className="font-mono text-[12px] text-cyan border border-cyan/[0.16] rounded-full px-[11px] py-[3px]">
      {children}
    </span>
  );
}