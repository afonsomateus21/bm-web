import { api } from "../../services";
import { UploadResponse } from "../../types";

function getEndpoint(type: string) {
  if (type === "users") {
    return "/auth/user/upload-photo";
  }

  if (type === "services") {
    return "/service/upload-photo";
  }

  throw new Error("Tipo de upload inválido.");
}

export async function handleUploadImageToStorage(type: string, file: File): Promise<string> {
  const uniqueFileName = `${Date.now()}_${file.name}`;

  if (!file.type.startsWith("image/")) {
    throw new Error("O arquivo deve ser uma imagem.");
  }

  const endpoint = getEndpoint(type);

  const response = await api.post<UploadResponse>(endpoint, {
    file_name: uniqueFileName,
    mime_type: file.type,
  });

  if (response.status !== 200) {
    throw new Error("Não foi possível gerar a URL de upload.");
  }

  const { url, file_path } = response.data;

  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Erro ao fazer upload da imagem.");
  }

  return `${import.meta.env.VITE_SUPABASE_PROJECT_URL}/storage/v1/object/public/${type}/${file_path}`;
}