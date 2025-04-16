import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
interface CreateCategoryProps {
  isOpen: boolean;
  onOpenChange: () => void;
}
export default function CreateCategory(props: CreateCategoryProps) {
  const { isOpen, onOpenChange } = props;

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Nueva Categoría</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="image"
                  >
                    Imagen de Categoría
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L36 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          htmlFor="image"
                        >
                          <span>Subir un archivo</span>
                          <input
                            className="sr-only"
                            id="image"
                            name="image"
                            type="file"
                          />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG hasta 5MB
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Nombre de Categoría
                  </label>
                  <div className="mt-1">
                    <input
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      id="name"
                      name="name"
                      placeholder="Nombre de la categoría"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        id="active"
                        name="status"
                        type="radio"
                        value="active"
                      />
                      <label
                        className="ml-2 block text-sm text-gray-700"
                        htmlFor="active"
                      >
                        Activa
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        id="inactive"
                        name="status"
                        type="radio"
                        value="inactive"
                      />
                      <label
                        className="ml-2 block text-sm text-gray-700"
                        htmlFor="inactive"
                      >
                        Inactiva
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      id="featured"
                      name="featured"
                      type="checkbox"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      className="font-medium text-gray-700"
                      htmlFor="featured"
                    >
                      Marcar como categoría destacada
                    </label>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost">Cancelar</Button>
              <Button color="success">Guardar</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
