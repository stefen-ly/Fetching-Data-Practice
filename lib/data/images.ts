const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadImage(file: File): Promise<string> {
  if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/api/v1/files/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.location;
}