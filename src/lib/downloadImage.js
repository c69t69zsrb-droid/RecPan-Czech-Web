// Stáhne obrázek z dané adresy jako soubor do počítače.
export async function downloadImage(url, filename) {
  const name = filename || url.split("/").pop().split("?")[0] || "photo.jpg";
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("fetch failed");
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    // Záložní varianta, pokud prohlížeč soubor nepovolí stáhnout přímo.
    window.open(url, "_blank", "noopener");
  }
}