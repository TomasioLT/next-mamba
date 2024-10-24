import {NextRequest, NextResponse} from "next/server";

export async function GET() {
  const mock_url = "https://671a3ac2acf9aa94f6a9bd93.mockapi.io/users";
  const resp = await fetch(mock_url, {method: "GET"});
  const items = await resp.json();
  return Response.json({msg: "ok", items: items});
}
