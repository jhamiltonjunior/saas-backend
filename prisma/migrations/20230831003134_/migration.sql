/*
  Warnings:

  - Made the column `user_id` on table `Tasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `list_id` on table `Tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "list_id" SET NOT NULL;
