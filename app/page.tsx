import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-white">
      <Image
        src="/images/logo.png"
        width={200}
        height={200}
        alt="logo"
      />
      
    </div>
  );
}
