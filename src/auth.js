// generate unguessable random number
export function generateSessionToken() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

// storing the session in the db
export async function createSession(token, userId) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
}

// does this session exist? has it expired?
export async function validateSessionToken(token) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  // CRITERIA 1: does the session exist?
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  // if it doesn't return null
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;

  // CRITERIA 2: if it does exist, has it expired?
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  // if session is over 15 days old, create a new one
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    // if its older than 15 days, update the expiry to 30 days from now
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  // return session
  return { session, user };
}

// logout
export async function invalidateSession(sessionId) {
  await prisma.session.delete({ where: { id: sessionId } });
}

// logout of all devices
export async function invalidateAllSessions(userId) {
  await prisma.session.deleteMany({
    where: {
      userId: userId,
    },
  });
}

// API entry point
export async function handler(req, res) {
  const token = req.cookies.get("session");
  if (token !== null) {
    return validateSessionToken(token);
    // do whatever you want knowing that the user is valid...
  }
}
