import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col">
        <Button
          onClick={() => {
            alert("hello");
            console.log("Hello");
          }}
        >
          Hello
        </Button>
      </main>
    </>
  );
}
