/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `ingredientId`;

-- CreateTable
CREATE TABLE `_IngredientToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_IngredientToProduct_AB_unique`(`A`, `B`),
    INDEX `_IngredientToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
