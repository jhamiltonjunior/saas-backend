/* eslint-disable camelcase */

export interface ITasksData {
  task_id: string;
  title: string;
  indice: number;
  description: string | null;
  tag: string | null;
  url: string;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  task_is_active: boolean;
  user_id: string;
  list_id: string;
}

export interface ITasksUpdateData {
  title?: string;
  description?: string;
  tag?: string;
  url?: string;
  indice?: number;
  updated_at: Date;
  task_is_active?: boolean;
  list_id?: string;
}
