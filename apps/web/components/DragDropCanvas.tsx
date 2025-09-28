'use client';

import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import type { AiGenerationResponse } from '@websmith/types';
import { Button } from '@websmith/ui';

interface DragDropCanvasProps {
  initialSections: AiGenerationResponse['sections'];
}

export const DragDropCanvas = ({ initialSections }: DragDropCanvasProps) => {
  const [sections, setSections] = useState(initialSections);
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-dashed border-slate-300 p-4">
        <DndContext
          sensors={sensors}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;
            const oldIndex = sections.findIndex((item) => item.id === active.id);
            const newIndex = sections.findIndex((item) => item.id === over.id);
            setSections((current) => arrayMove(current, oldIndex, newIndex));
          }}
        >
          <SortableContext items={sections.map((section) => section.id)} strategy={verticalListSortingStrategy}>
            <ol className="space-y-3">
              {sections.map((section) => (
                <li
                  key={section.id}
                  className="flex cursor-grab items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-200">{section.type}</span>
                  <span className="text-xs uppercase text-slate-400">{section.id}</span>
                </li>
              ))}
            </ol>
          </SortableContext>
        </DndContext>
      </div>
      <Button variant="ghost" onClick={() => setSections(initialSections)}>
        Restablecer orden
      </Button>
    </div>
  );
};
