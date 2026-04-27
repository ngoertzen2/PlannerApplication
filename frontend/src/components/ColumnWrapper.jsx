import { useDroppable } from "@dnd-kit/core";

const ColumnWrapper = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default ColumnWrapper;