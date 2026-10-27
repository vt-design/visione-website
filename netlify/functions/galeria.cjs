const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event) => {
  try {
    const cursor = event.queryStringParameters?.cursor;
    const tag = event.queryStringParameters?.tag

    let query
    if (tag) {
      query = cloudinary.search
        .expression(`resource_type:image AND tags=${tag}`)
        .sort_by("created_at", "desc")
        .max_results(10);
    } else {
      query = cloudinary.search
        .expression("resource_type:image")
        .sort_by("created_at", "desc")
        .max_results(10);
    }

    if (cursor) {
      query = query.next_cursor(cursor);
    }

    const result = await query.execute();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
      body: JSON.stringify({
        images: result.resources.map((image) => ({
          id: image.public_id,
          url: image.secure_url,
          alt: image.context?.custom?.alt || image.public_id,
        })),
        nextCursor: result.next_cursor || null,
      }),
    };
  } catch (error) {
    console.error("Error consultando Cloudinary:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudieron cargar las imágenes.",
      }),
    };
  }
};
