// Utilitário para gerar IDs únicos sem depender de uuid
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Função compatível para substituir uuid v4
export function uuidv4(): string {
  return 'xxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
