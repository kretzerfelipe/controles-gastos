/*
  Warnings:

  - Added the required column `type` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_categories" ("color", "created_at", "icon", "id", "name", "user_id") SELECT "color", "created_at", "icon", "id", "name", "user_id" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
