// import { axios } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const lat = request.nextUrl.searchParams.get("lat");
  const lng = request.nextUrl.searchParams.get("lng");

  const type = request.nextUrl.searchParams.get("type");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const apiUrl = token
    ? `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${token}&key=${apiKey}`
    : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=${type}&keyword=${type}&key=${apiKey}`;
  //   const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
  // const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
  // curl "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJcUElzOzMQQwRLuV30nMUEUM&key=YOUR_API_KEY"
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return NextResponse.json({ result: result });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
