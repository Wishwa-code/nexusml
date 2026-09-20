import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: "Ada Lovelace", email: "admin@nexusml.dev", password: "password123" },
    { name: "Grace Hopper", email: "grace@nexusml.dev", password: "password123" },
  ];

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { name: user.name, email: user.email, passwordHash },
    });
  }

  const admin = await prisma.user.findUniqueOrThrow({
    where: { email: "admin@nexusml.dev" },
  });

  await prisma.announcement.upsert({
    where: { id: "seed-announcement-1" },
    update: {},
    create: {
      id: "seed-announcement-1",
      title: "Welcome to NexusML Portal",
      body: "This is the team home base. Post updates here for everyone to see.",
      authorId: admin.id,
    },
  });

  const teamMembers = [
    { callsign: "RAVEN", name: "Ada Lovelace", role: "TEAM LEAD", status: "ACTIVE" },
    { callsign: "CIPHER", name: "Grace Hopper", role: "SIGNALS ANALYST", status: "ACTIVE" },
    { callsign: "WRAITH", name: "Mercy Okafor", role: "FIELD OPERATIVE", status: "ACTIVE" },
    { callsign: "VIPER", name: "Kenji Watanabe", role: "FIELD OPERATIVE", status: "STANDBY" },
    { callsign: "GHOST", name: "Elena Voss", role: "FORENSICS", status: "STANDBY" },
    { callsign: "FALCON", name: "Marcus Webb", role: "SURVEILLANCE", status: "OFFLINE" },
  ];

  for (const member of teamMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: { callsign: member.callsign },
    });
    if (!existing) {
      await prisma.teamMember.create({ data: member });
    }
  }

  const documents = [
    {
      id: "seed-doc-1",
      title: "Operation Blackout — Briefing",
      content:
        "OBJECTIVE\nLocate and neutralize the financial network behind the Blackout smuggling ring.\n\nSTATUS\nSurveillance phase complete. Awaiting authorization for field insertion.\n\nNOTES\nCoordinate with CIPHER on intercepted comms before next briefing.",
    },
    {
      id: "seed-doc-2",
      title: "Suspect Profile: J. Doe",
      content:
        "ALIAS: Unknown\nLAST SEEN: Port district, warehouse 14\nRISK LEVEL: Elevated\n\nBehavioral notes and known associates to be appended by FORENSICS.",
    },
    {
      id: "seed-doc-3",
      title: "Standard Field Protocol",
      content:
        "1. Confirm comms check-in every 30 minutes during active operations.\n2. All extractions require TEAM LEAD sign-off.\n3. Report anomalies to command immediately, no exceptions.",
    },
  ];

  for (const doc of documents) {
    await prisma.document.upsert({
      where: { id: doc.id },
      update: {},
      create: { ...doc, authorId: admin.id },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
