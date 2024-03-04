/*
  Warnings:

  - You are about to drop the column `View` on the `notices` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `notices` table. All the data in the column will be lost.
  - Added the required column `view` to the `notices` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "font_noticie" TEXT NOT NULL,
    "view" INTEGER NOT NULL
);
INSERT INTO "new_notices" ("description", "font_noticie", "id", "subtitle", "title") SELECT "description", "font_noticie", "id", "subtitle", "title" FROM "notices";
DROP TABLE "notices";
ALTER TABLE "new_notices" RENAME TO "notices";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
