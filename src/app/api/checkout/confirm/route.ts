import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings, leads } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { id, clientTxId } = await req.json();

    if (!id || !clientTxId) {
      return NextResponse.json({ error: "Faltan parámetros obligatorios para la confirmación." }, { status: 400 });
    }

    // 1. Obtener credenciales de la base de datos
    const allSettings = await db.select().from(settings).limit(1);
    const storeSettings = allSettings[0];

    if (!storeSettings || !storeSettings.payphoneToken) {
      return NextResponse.json({ error: "Credenciales de PayPhone no configuradas." }, { status: 500 });
    }

    // 2. Preparar el payload de confirmación
    const confirmPayload = {
      id: Number(id),
      clientTxId: clientTxId
    };

    // 3. Llamar a la API de Confirmación de PayPhone
    const response = await fetch("https://paymentbox.payphonetodoesposible.com/api/confirm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${storeSettings.payphoneToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(confirmPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PayPhone Confirm Error:", errorText);
      return NextResponse.json({ error: "Error de comunicación al confirmar con PayPhone." }, { status: 500 });
    }

    const data = await response.json();

    // 4. Guardar como Lead en la base de datos si fue aprobado
    if (data.transactionStatus === "Approved") {
      try {
        const clientName = data.optionalParameter4 || data.email || "Cliente Tienda";
        const totalPaid = (data.amount / 100).toFixed(2);
        
        await db.insert(leads).values({
          fullName: clientName,
          phone: data.phoneNumber || "No provisto",
          email: data.email || "No provisto",
          projectType: "Venta Tienda",
          message: `Compra PayPhone Aprobada.\nRef: ${data.reference}\nTotal: $${totalPaid}\nTx ID: ${data.transactionId}`,
          status: "pagado",
        });
      } catch (dbError) {
        console.error("Error guardando lead de la compra:", dbError);
        // No fallamos el request si falla la base de datos, el cobro ya se hizo
      }
    }

    // 5. Retornar los datos de la transacción al cliente
    return NextResponse.json(data);
  } catch (error) {
    console.error("Checkout confirm route error:", error);
    return NextResponse.json({ error: "Error interno del servidor en la confirmación." }, { status: 500 });
  }
}
