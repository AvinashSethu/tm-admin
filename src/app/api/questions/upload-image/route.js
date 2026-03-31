import uploadImage from "@/src/util/questions/uploadImage";
import { withAuth } from "@/src/lib/withAuth";

export const POST = withAuth(async (request, _context, auth) => {
  const { filename, fileType } = await request.json();
  if (!filename || !fileType) {
    return Response.json(
      { error: "Invalid filename or file type" },
      { status: 400 }
    );
  }
  try {
    const response = await uploadImage({ filename, fileType });
    return Response.json(response, { status: 201 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return Response.json({ error: "Error uploading image" }, { status: 500 });
  }
});
