import Button from '../atoms/Button';
import Form from '../atoms/Form';

const Playground = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10 space-y-6">
      <h1 className="text-2xl font-bold">🎨 Playground Atom Components</h1>

      <Button variant="bg-blue-500">Button Biru</Button>
      <Button variant="bg-red-500">Button Merah</Button>

      <Form labelName="umur">Masukkan Umur</Form>
    </div>
  );
};

export default Playground;
