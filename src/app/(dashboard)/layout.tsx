import React from "react";

interface DashboardPageProps {
  children: React.ReactNode;
  overview: React.ReactNode;
  graph: React.ReactNode;
  products: React.ReactNode;
}
export default function DashboardPage({
  children,
  overview,
  graph,
  products,
}: DashboardPageProps) {
  return (
    <>
      {children}
      <div className="grid grid-cols-12 mt-1">{overview}</div>
      <div className="grid grid-cols-8 mt-2">
        <div className="col-span-4">{graph}</div>
        <div className="col-span-4">{products}</div>
      </div>
    </>
  );
}
