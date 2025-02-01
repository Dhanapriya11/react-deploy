import React from "react";
import { useParams } from "react-router-dom";

const DressDetailsPage = () => {
  const { id } = useParams();
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">Dress Details</h1>
      <p>Details for dress ID: {id}</p>
    </div>
  );
};

export default DressDetailsPage;
