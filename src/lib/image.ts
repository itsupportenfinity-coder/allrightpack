export function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src.includes("/placeholder.svg")) return;
  img.src = "/placeholder.svg";
}
