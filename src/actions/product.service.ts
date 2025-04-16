"use server";

export async function productRetriever() {
  const response = await fetch(
    `https://213d3591-94d0-44a0-8241-1d79a8e895b5.mock.pstmn.io/api/products`,
  );
  const data = await response.json();

  return data.response;
}
