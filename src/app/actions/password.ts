
'use server';

export async function verifyPassword(password: string): Promise<{ success: boolean }> {
  const isCorrect = password === process.env.APP_PASSWORD;
  if (!isCorrect) {
    throw new Error('Incorrect password.');
  }
  return { success: true };
}
