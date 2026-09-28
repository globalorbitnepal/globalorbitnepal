import { NextResponse } from "next/server";
import {
  countUnreadAppointments,
  listAppointments,
  markAllAppointmentsRead,
  markAppointmentsRead,
} from "@/lib/appointments/store";
import { isOrbitAuthed } from "@/lib/orbit-auth";

export async function GET() {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [appointments, unreadCount] = await Promise.all([
    listAppointments(),
    countUnreadAppointments(),
  ]);
  return NextResponse.json({ appointments, unreadCount });
}

export async function PATCH(request: Request) {
  if (!(await isOrbitAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as { ids?: string[]; all?: boolean };
  if (body.all) {
    const updated = await markAllAppointmentsRead();
    const unreadCount = await countUnreadAppointments();
    return NextResponse.json({ ok: true, updated, unreadCount });
  }
  const ids = Array.isArray(body.ids) ? body.ids.filter((id) => typeof id === "string") : [];
  const updated = await markAppointmentsRead(ids);
  const unreadCount = await countUnreadAppointments();
  return NextResponse.json({ ok: true, updated, unreadCount });
}
