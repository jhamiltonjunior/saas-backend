/*
  Warnings:

  - Added the required column `indice` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "indice" SMALLINT NOT NULL;
