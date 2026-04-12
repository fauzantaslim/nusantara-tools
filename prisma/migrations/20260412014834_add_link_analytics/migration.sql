-- CreateTable
CREATE TABLE "LinkAnalytic" (
    "id" TEXT NOT NULL,
    "shortLinkId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT,
    "city" TEXT,
    "referrer" TEXT,
    "browser" TEXT,
    "device" TEXT,
    "os" TEXT,

    CONSTRAINT "LinkAnalytic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LinkAnalytic" ADD CONSTRAINT "LinkAnalytic_shortLinkId_fkey" FOREIGN KEY ("shortLinkId") REFERENCES "ShortLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;
