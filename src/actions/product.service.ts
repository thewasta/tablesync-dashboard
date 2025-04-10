"use server";

export async function productRetriever() {
  console.log("AQUI");
  const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
  const data = await response.json();
  //const { data, error } = await fetchApi("get", "/products");

  //if (error) {
  //throw new Error("Error");
  //}
  return data;
}
