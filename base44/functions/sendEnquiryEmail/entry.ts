Deno.serve(async (req) => {
  try {
    const data = await req.json().catch(() => null);
    if (!data) {
      console.error("sendEnquiryEmail: invalid JSON body");
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const orgType = data.orgType || "";
    const panelType = data.panelType || "";
    const name = (data.name || "").trim();
    const company = (data.company || "").trim();
    const email = (data.email || "").trim();
    const phone = (data.phone || "").trim();
    const volume = (data.volume || "").trim();
    const country = (data.country || "").trim();
    const notes = (data.notes || "").trim();

    // Validate required fields
    if (!name || !email) {
      console.error("sendEnquiryEmail: missing required fields", { name, email });
      return Response.json({ error: "Missing required fields (name, email)" }, { status: 400 });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("sendEnquiryEmail: RESEND_API_KEY secret is not set");
      return Response.json({ error: "Email service not configured" }, { status: 500 });
    }

    const submittedAt = new Date().toLocaleString("cs-CZ", {
      timeZone: "Europe/Prague",
      dateStyle: "full",
      timeStyle: "short",
    });

    const body = [
      "New website enquiry",
      "",
      `Contact type: ${orgType || "—"}`,
      `Solar panel type: ${panelType || "—"}`,
      `Contact name: ${name}`,
      `Company: ${company || "—"}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Estimated volume: ${volume || "—"}`,
      `Country: ${country || "—"}`,
      `Message: ${notes || "—"}`,
      "",
      `Submitted: ${submittedAt}`,
    ].join("\n");

    const resendPayload = {
      from: "RecPan Website <no-reply@rec-pan.eu>",
      to: ["office@rec-pan.cz"],
      reply_to: email,
      subject: "New enquiry from RecPan website",
      text: body,
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    const resultText = await response.text();
    if (!response.ok) {
      console.error("sendEnquiryEmail: Resend API error", {
        status: response.status,
        statusText: response.statusText,
        body: resultText,
      });
      return Response.json(
        { error: "Email delivery failed", details: resultText },
        { status: 502 }
      );
    }

    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      result = { raw: resultText };
    }
    console.log("sendEnquiryEmail: email sent successfully", {
      messageId: result.id,
      to: "office@rec-pan.cz",
      from: email,
    });

    return Response.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error("sendEnquiryEmail: unhandled error", {
      message: error.message,
      stack: error.stack,
    });
    return Response.json({ error: error.message }, { status: 500 });
  }
});