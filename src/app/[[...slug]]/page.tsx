import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [
    { slug: [""] },
    { slug: ["form"] },
    { slug: ["about"] },
    { slug: ["user", "123"] },
  ];
}

export default function Page() {
  return <ClientOnly />;
}
