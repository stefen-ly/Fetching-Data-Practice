import { Modal } from "flowbite-react";
import { DialogDemo } from "./modal";

export default async function PhotoModalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <DialogDemo>Hello from Photo Modal - ID: {id}</DialogDemo>;
}
