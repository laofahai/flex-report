/*
  Warnings:

  - Added the required column `dataSourceId` to the `TableDesign` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TableDesign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataSourceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schema" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_TableDesign" ("createdAt", "id", "name", "schema", "updatedAt") SELECT "createdAt", "id", "name", "schema", "updatedAt" FROM "TableDesign";
DROP TABLE "TableDesign";
ALTER TABLE "new_TableDesign" RENAME TO "TableDesign";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
