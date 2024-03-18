// comment api
export const POST = async (request) => {
  try {
    const { anime_mal_id, anime_title, comment, userId } = await request.json();

    const data = { anime_mal_id, anime_title, comment, userId };

    if (!comment || comment.trim() === '') {
      return Response.json({ status: 400, message: 'Comment cannot be empty.' });
    }

    const res = await prisma.comment.create({ data });
    return Response.json({ status: 200, message: 'Comment posted successfully.', comment: res });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ status: 500, message: 'An error occurred while posting the comment.', error: error.message });
  }
};
