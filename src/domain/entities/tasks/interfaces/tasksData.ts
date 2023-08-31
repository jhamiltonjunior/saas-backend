/* eslint-disable camelcase */

export interface ITasksData {
  task_id: string;
  title: string;
  description: string | null;
  tag: string | null;
  url: string;
  createdat: Date;
  updatedat: Date | null;
  deletedat: Date | null;
  task_is_active: boolean;
  user_id: string;
  list_id: string;
}
