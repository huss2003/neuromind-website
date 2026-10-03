export default function PlaceholderNote({
  label = 'Not yet published',
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="placeholder-note" role="note">
      <span className="ph-label">{label}</span>
      <div className="ph-body">{children}</div>
    </div>
  );
}
