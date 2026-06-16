-- CreateTable
CREATE TABLE "WorldCupSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "games" JSONB NOT NULL,
    "groups" JSONB NOT NULL,
    "teams" JSONB NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
