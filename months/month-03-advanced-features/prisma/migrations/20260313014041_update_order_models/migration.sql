/*
  Warnings:

  - The values [READY_FOR_PICKUP] on the enum `orders_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `deliveryAddress` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `deliveryAddress` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'COOKING', 'DELIVERING', 'DELIVERED') NOT NULL DEFAULT 'PENDING';
