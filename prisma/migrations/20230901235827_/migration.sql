/*
  Warnings:

  - You are about to drop the column `createdat` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `deletedat` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `Boards` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `Lists` table. All the data in the column will be lost.
  - You are about to drop the column `deletedat` on the `Lists` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `Lists` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `deletedat` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `Workspaces` table. All the data in the column will be lost.
  - You are about to drop the column `deletedat` on the `Workspaces` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `Workspaces` table. All the data in the column will be lost.
  - Added the required column `indice` to the `Lists` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Lists` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Boards" DROP COLUMN "createdat",
DROP COLUMN "deletedat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(6),
ADD COLUMN     "updated_at" TIMESTAMP(6);

-- AlterTable
ALTER TABLE "Lists" DROP COLUMN "createdat",
DROP COLUMN "deletedat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(6),
ADD COLUMN     "indice" SMALLINT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(6),
ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "createdat",
DROP COLUMN "deletedat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(6),
ADD COLUMN     "updated_at" TIMESTAMP(6);

-- AlterTable
ALTER TABLE "Workspaces" DROP COLUMN "createdat",
DROP COLUMN "deletedat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(6),
ADD COLUMN     "updated_at" TIMESTAMP(6);
