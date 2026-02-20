export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase"; 
import { collection, getCountFromServer } from "firebase/firestore";

export async function GET() {
  try {
    const BATAS_MAKSIMUM = 50; // Batas pendaftaran
    
    // GANTI "pendaftar" menjadi "pendaftaran_final" sesuai nama koleksi di Firebase kamu
    const coll = collection(db, "pendaftaran_final"); 
    
    const snapshot = await getCountFromServer(coll);
    const jumlahData = snapshot.data().count;

    console.log("Jumlah data ditemukan di pendaftaran_final:", jumlahData);

    // Kirim status isFull berdasarkan jumlah data asli di pendaftaran_final
    return NextResponse.json({ 
      isFull: jumlahData >= BATAS_MAKSIMUM 
    });
  } catch (error) {
    console.error("Firebase Error:", error);
    return NextResponse.json({ isFull: false }, { status: 500 });
  }
}