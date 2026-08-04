import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    const body = await req.json();

    // Validasi request
    if (!body.sessionId || !body.path) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request",
        },
        {
          status: 400,
        }
      );
    }

    const headersList = await headers();

    const forwardedFor = headersList.get("x-forwarded-for");

    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : headersList.get("x-real-ip");

    const userAgent = headersList.get("user-agent") ?? "";

    // Cek apakah session ini sudah mengunjungi halaman yang sama
    const existing = await prisma.visitor.findFirst({
      where: {
        sessionId: body.sessionId,
        path: body.path,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Jika masih dalam 30 menit, jangan simpan lagi
    if (existing) {
      const diff =
        Date.now() - new Date(existing.createdAt).getTime();

      if (diff < 30 * 60 * 1000) {
        return NextResponse.json({
          success: true,
        });
      }
    }

    await prisma.visitor.create({
      data: {
        userId: session?.user?.id ?? null,

        sessionId: body.sessionId,

        path: body.path,

        ip,

        userAgent,

        referer: headersList.get("referer"),

        browser: null,
        os: null,
        device: null,

        country: null,
        city: null,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}