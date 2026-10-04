/*
  Warnings:

  - You are about to drop the column `group` on the `Skills` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `Skills` table. All the data in the column will be lost.
  - Added the required column `typeName` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Skills` DROP COLUMN `group`,
    DROP COLUMN `groupName`,
    ADD COLUMN `type` ENUM('professional', 'language', 'technical', 'software', 'life', 'academic', 'social') NOT NULL DEFAULT 'technical',
    ADD COLUMN `typeName` VARCHAR(100) NOT NULL;
