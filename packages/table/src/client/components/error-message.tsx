export const ErrorMessage = ({ title, description }: { title?: string; description?: string }) => (
  <div className="flex flex-col gap-2">
    <h2 className="text-lg font-semibold">{title ?? "Error"}</h2>
    <p className="text-sm text-gray-500">{description ?? "An error occurred while loading the data."}</p>
  </div>
);
