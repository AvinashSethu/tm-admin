import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/src/util/homepage/homePageController";
import { withAuth } from "@/src/lib/withAuth";

export const GET = withAuth(async (request, _context, auth) => {
  try {
    const result = await getAllAnnouncements();
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (request, _context, auth) => {
  try {
    const { title, message, type, isActive } = await request.json();

    if (!title || !message) {
      return Response.json(
        { success: false, message: "Title and message are required" },
        { status: 400 }
      );
    }

    const result = await createAnnouncement({ title, message, type, isActive });
    return Response.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (request, _context, auth) => {
  try {
    const { announcementID, title, message, type, isActive } =
      await request.json();

    if (!announcementID || !title || !message) {
      return Response.json(
        {
          success: false,
          message: "announcementID, title, and message are required",
        },
        { status: 400 }
      );
    }

    const result = await updateAnnouncement(announcementID, {
      title,
      message,
      type,
      isActive,
    });
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (request, _context, auth) => {
  try {
    const { announcementID } = await request.json();

    if (!announcementID) {
      return Response.json(
        { success: false, message: "announcementID is required" },
        { status: 400 }
      );
    }

    const result = await deleteAnnouncement(announcementID);
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});
