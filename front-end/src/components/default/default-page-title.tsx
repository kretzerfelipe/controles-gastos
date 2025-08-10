export function DefaultPageTitle({ title }: { title: string }) {
  return (
    <div className="flex-container">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
  );
}
