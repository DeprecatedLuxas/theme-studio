export default function Loading() {
  return (
    <div className="h-screen w-full bg-gray-700 flex justify-center items-center">
      <div className="bg-transparent w-16 h-16 rounded-full border-2 border-b-transparent border-blue-700 inline-block animate-loader" />
    </div>
  );
}
