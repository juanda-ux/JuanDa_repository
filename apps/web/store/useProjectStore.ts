'use client';

import create from 'zustand';
import type { Project } from '@websmith/types';

interface ProjectState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}));
