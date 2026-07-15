Deno.serve(async (req) => {
  try {
    const data = await req.json().catch(() => null);
    if (!data) {
      console.error("sendCareerApplication: invalid JSON body");
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const phone = (data.phone || "").trim();
    const position = (data.position || "").trim();
    const message = (data.message || "").trim();
    const cvUrl = (data.cvUrl || "").trim();

    if (!name || !email) {
      console.error("sendCareerApplication: missing required fields", { name, email });
      return Response.json({ error: "Missing required fields (name, email)" }, { status: 400 });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("sendCareerApplication: RESEND_API_KEY secret is not set");
      return Response.json({ error: "Email service not configured" }, { status: 500 });
    }

    const submittedAt = new Date().toLocaleString("cs-CZ", {
      timeZone: "Europe/Prague",
      dateStyle: "full",
      timeStyle: "short",
    });

    const body = [
      "New career application from RecPan website",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Position: ${position || "—"}`,
      `Message: ${message || "—"}`,
      `CV: ${cvUrl || "Not uploaded"}`,
      "",
      `Submitted: ${submittedAt}`,
    ].join("\n");

    const resendPayload = {
      from: "RecPan Website <no-reply@rec-pan.cz>",
      to: ["office@rec-pan.cz"],
      reply_to: email,
      subject: `Career application — ${position || "General"} — ${name}`,
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
      console.error("sendCareerApplication: Resend API error", {
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
    console.log("sendCareerApplication: email sent successfully", {
      messageId: result.id,
      to: "office@rec-pan.cz",
      from: email,
    });

    return Response.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error("sendCareerApplication: unhandled error", {
      message: error.message,
      stack: error.stack,
    });
    return Response.json({ error: error.message }, { status: 500 });
  }
});