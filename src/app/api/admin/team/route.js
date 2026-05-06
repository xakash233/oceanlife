import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/team.json");

export async function GET() {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    return NextResponse.json(JSON.parse(jsonData));
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newMember = await request.json();
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    const team = JSON.parse(jsonData);
    
    const memberWithId = {
      ...newMember,
      id: Date.now(),
    };
    
    team.push(memberWithId);
    fs.writeFileSync(dataFilePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json(memberWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add member" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedMember = await request.json();
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    let team = JSON.parse(jsonData);
    
    team = team.map((m) => (m.id === updatedMember.id ? updatedMember : m));
    fs.writeFileSync(dataFilePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const jsonData = fs.readFileSync(dataFilePath, "utf-8");
    let team = JSON.parse(jsonData);
    
    team = team.filter((m) => m.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(team, null, 2));
    
    return NextResponse.json({ message: "Member deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
