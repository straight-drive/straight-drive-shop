// src/components/ui/GradientText.jsx
export default function GradientText({ children, as: Tag = "span" }) {
  return (
    <Tag className="bg-gradient-to-r from-cyan to-green bg-clip-text text-transparent">
      {children}
    </Tag>
  );
}