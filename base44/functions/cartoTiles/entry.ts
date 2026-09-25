import { secrets } from "base44:runtime";

// Server-side proxy for CARTO basemap tiles.
// The CARTO API key is read from Base44 Secrets and never exposed to the browser.
export default async function (req) {
  try {
    const url = new URL(req.url);
    const z = url.searchParams.get("z");
    const x = url.searchParams.get("x");
    const y = url.searchParams.get("y");
    const r = url.searchParams.get("r") || "";

    if (!z || !x || !y) {
      return Response.json({ error: "Missing tile parameters (z, x, y)" }, { status: 400 });
    }

    const key = secrets.get("CARTO_API_KEY");
    if (!key) {
      return Response.json({ error: "CARTO_API_KEY secret is not set" }, { status: 500 });
    }

    const tileUrl = `https://basemaps.cartocdn.com/rastertiles/light_all/${z}/${x}/${y}${r}.png?key=${key}`;
    const res = await fetch(tileUrl);

    if (!res.ok) {
      return Response.json({ error: `CARTO tile request failed (${res.status})` }, { status: res.status });
    }

    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") || "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}