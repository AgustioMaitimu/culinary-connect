import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || 1);

  const client = await clientPromise;
  const db = client.db('culinary-connect');

  const skip = (page - 1) * 3;
  const limit = 3;

  const cursor = await db.collection('recipes').find().skip(skip).limit(limit);
  const recipes = await cursor.toArray();

  return Response.json(recipes);
}
