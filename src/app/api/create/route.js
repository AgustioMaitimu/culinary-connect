import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db('culinary-connect');

  const body = await request.json();

  const result = await db.collection('recipes').insertOne(body);

  return Response.json(result);
}
