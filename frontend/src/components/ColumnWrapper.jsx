import { useDroppable } from "@dnd-kit/core";

const ColumnWrapper = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-[var(--surface-1)] border border-[var(--border)] rounded-lg shadow-md p-5">
      <h2 className="text-xl font-bold text-[var(--text)] mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ColumnWrapper;