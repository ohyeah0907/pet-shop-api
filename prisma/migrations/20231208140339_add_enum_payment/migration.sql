/*
  Warnings:

  - The `payment` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('cash', 'momo', 'paypal');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "payment",
ADD COLUMN     "payment" "Payment" NOT NULL DEFAULT 'cash';
