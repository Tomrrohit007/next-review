import { Metadata } from "next";

export const metadata:Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <h1 className={`heading_element font-orbitron`}>About</h1>
      <p>A website created to learn Next.js</p>
    </>
  );
}
