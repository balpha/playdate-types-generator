interface MetadataField {
  name: string;
  type: string;
  doc: string;
}

export function collectMetadataFromDom(): MetadataField[] {
  const section = document.getElementById("pdxinfo")?.closest(".section");
  if (!section) {
    return [];
  }
  const titles = [
    ...section.querySelectorAll<HTMLElement>(":scope > .paragraph > .title"),
  ].filter((e) => /^[a-z0-9]+$/i.test(e.innerText.trim()));

  return titles.map((e) => {
    const doc = (e.nextElementSibling as HTMLElement).innerText;
    return {
      name: e.innerText.trim(),
      type: doc.includes("integer")
        ? "integer"
        : doc.includes("Optional")
        ? "string?"
        : "string",
      doc,
    };
  });
}
