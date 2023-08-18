import { GridColDef } from '@material-ui/data-grid';
import React, { useState } from 'react';

interface ColumnReorderProps {
  columns: GridColDef[];
  onColumnsChange: (newColumns: GridColDef[]) => void;
}

const ColumnReorder: React.FC<ColumnReorderProps> = ({ columns, onColumnsChange }) => {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault();

    if (draggedIdx !== null) {
      const newColumns = [...columns];
      const [draggedColumn] = newColumns.splice(draggedIdx, 1);
      newColumns.splice(idx, 0, draggedColumn);
      onColumnsChange(newColumns);
    }

    setDraggedIdx(null);
  };

  return (
    <div>
      {columns.map((column, idx) => (
        <div
          key={column.field}
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDrop={(e) => handleDrop(e, idx)}
        >
          {column.headerName}
        </div>
      ))}
    </div>
  );
};

export default ColumnReorder;
