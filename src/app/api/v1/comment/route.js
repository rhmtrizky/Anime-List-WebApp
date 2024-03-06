export const POST = async (request) => {
  try {
    const { anime_mal_id, anime_title, comment, userId } = await request.json();

    const data = { anime_mal_id, anime_title, comment, userId };

    if (comment === '' || comment === null) {
      return Response.json({ status: 500, isCreated: false });
    } else {
      const res = await prisma.comment.create({ data });
      if (!res) {
        return Response.json({ status: 500, isCreated: false });
      } else {
        return Response.json({ status: 200, isCreated: true });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ status: 500, isCreated: false, error: error.message });
  }
};
