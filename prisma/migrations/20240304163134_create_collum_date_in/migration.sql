/*
  Warnings:

  - Added the required column `date_in` to the `notices` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "font_noticie" TEXT NOT NULL,
    "date_in" DATETIME NOT NULL,
    "view" INTEGER NOT NULL
);
INSERT INTO "new_notices" ("description", "font_noticie", "id", "subtitle", "title", "view") SELECT "description", "font_noticie", "id", "subtitle", "title", "view" FROM "notices";
DROP TABLE "notices";
ALTER TABLE "new_notices" RENAME TO "notices";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
