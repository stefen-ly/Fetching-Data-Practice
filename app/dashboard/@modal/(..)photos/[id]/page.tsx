import { Modal } from "flowbite-react";

export default async function PhotoModalPage({params}: {params: {id: string}}) {
    const {id} = await params;
       return (
        <Modal> 
            Hello from Photo Modal - ID: {id}
        </Modal>
    )
}