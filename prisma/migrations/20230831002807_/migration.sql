/*
  Warnings:

  - You are about to drop the column `body` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "body",
DROP COLUMN "category",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "tag" VARCHAR(60);

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);
