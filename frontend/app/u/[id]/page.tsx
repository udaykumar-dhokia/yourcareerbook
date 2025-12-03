"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  return <h1>User ID: {params.id}</h1>;
}
