/*
  Warnings:

  - Made the column `user_id` on table `Boards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workspace_id` on table `Boards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Lists` required. This step will fail if there are existing NULL values in that column.
  - Made the column `board_id` on table `Lists` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Members_boards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `board_id` on table `Members_boards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `member_board_id` on table `Members_boards_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `permission_id` on table `Members_boards_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Members_tasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `task_id` on table `Members_tasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `member_task_id` on table `Members_tasks_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `permission_id` on table `Members_tasks_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Members_workspaces` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workspace_id` on table `Members_workspaces` required. This step will fail if there are existing NULL values in that column.
  - Made the column `member_workspace_id` on table `Members_workspaces_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `permission_id` on table `Members_workspaces_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Users_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `permission_id` on table `Users_permissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Workspaces` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Boards" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "workspace_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lists" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "board_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Members_boards" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "board_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Members_boards_permissions" ALTER COLUMN "member_board_id" SET NOT NULL,
ALTER COLUMN "permission_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Members_tasks" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "task_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Members_tasks_permissions" ALTER COLUMN "member_task_id" SET NOT NULL,
ALTER COLUMN "permission_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Members_workspaces" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "workspace_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Members_workspaces_permissions" ALTER COLUMN "member_workspace_id" SET NOT NULL,
ALTER COLUMN "permission_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Permissions" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users_permissions" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "permission_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workspaces" ALTER COLUMN "user_id" SET NOT NULL;
