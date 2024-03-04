/*
  Warnings:

  - You are about to drop the column `date_in` on the `notices` table. All the data in the column will be lost.

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
INSERT INTO "new_notices" ("description", "font_noticie", "id", "subtitle", "title", "view") SELECT "description", "font_noticie", "id", "subtitle", "title", "view" FROM "notices";
DROP TABLE "notices";
ALTER TABLE "new_notices" RENAME TO "notices";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
