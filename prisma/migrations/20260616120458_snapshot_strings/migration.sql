-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorldCupSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "games" TEXT NOT NULL,
    "groups" TEXT NOT NULL,
    "teams" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WorldCupSnapshot" ("games", "groups", "id", "teams", "updatedAt") SELECT "games", "groups", "id", "teams", "updatedAt" FROM "WorldCupSnapshot";
DROP TABLE "WorldCupSnapshot";
ALTER TABLE "new_WorldCupSnapshot" RENAME TO "WorldCupSnapshot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
