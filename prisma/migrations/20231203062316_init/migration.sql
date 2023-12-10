/*
  Warnings:

  - You are about to drop the column `birth_date` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "birth_date",
ADD COLUMN     "birthday" TIMESTAMP(3);
