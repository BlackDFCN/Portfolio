import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public/cv/CV.pdf");
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="CV-BastianDev.pdf"',
      }
    });
  } catch (error) {
    return Response.json({ error: "CV no encontrado" }, { status: 404 });
  }
}
