Deno.serve(async (req) => {
  const tag = "[sendCareerApplication]";

  try {
    console.log(`${tag} request received`, {
      method: req.method,
      url: req.url,
      contentType: req.headers.get("content-type"),
    });

    const data = await req.json().catch(() => null);
    if (!data) {
      console.error(`${tag} invalid JSON body`);
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const firstName = (data.firstName || "").trim();
    const lastName = (data.lastName || "").trim();
    const email = (data.email || "").trim();
    const phone = (data.phone || "").trim();
    const position = (data.position || "").trim();
    const intro = (data.intro || "").trim();
    const cvUrl = (data.cvUrl || "").trim();
    const name = `${firstName} ${lastName}`.trim();

    console.log(`${tag} parsed form fields`, {
      firstName,
      lastName,
      email,
      phone,
      position,
      introLength: intro.length,
    });
    console.log(`${tag} uploaded file information`, {
      hasCv: !!cvUrl,
      cvUrl: cvUrl || "none",
    });

    if (!firstName || !lastName || !email) {
      console.error(`${tag} missing required fields`, { firstName, lastName, email });
      return Response.json({ error: "Missing required fields (firstName, lastName, email)" }, { status: 400 });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log(`${tag} RESEND_API_KEY check`, { present: !!apiKey, keyPrefix: apiKey ? apiKey.slice(0, 6) + "…" : null });
    if (!apiKey) {
      console.error(`${tag} RESEND_API_KEY secret is not set`);
      return Response.json({ error: "Email service not configured (missing RESEND_API_KEY)" }, { status: 500 });
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
      `Intro: ${intro || "—"}`,
      `CV: ${cvUrl || "Not uploaded"}`,
      "",
      `Submitted: ${submittedAt}`,
    ].join("\n");

    const resendPayload = {
      from: "RecPan Website <no-reply@rec-pan.eu>",
      to: ["office@rec-pan.cz"],
      reply_to: email,
      subject: `Career application — ${position || "General"} — ${name}`,
      text: body,
    };

    console.log(`${tag} Resend request`, {
      endpoint: "https://api.resend.com/emails",
      from: resendPayload.from,
      to: resendPayload.to,
      reply_to: resendPayload.reply_to,
      subject: resendPayload.subject,
    });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    const resultText = await response.text();
    console.log(`${tag} Resend response`, {
      status: response.status,
      statusText: response.statusText,
      body: resultText,
    });

    if (!response.ok) {
      let resendMessage = resultText;
      try {
        const parsed = JSON.parse(resultText);
        resendMessage = parsed.message || parsed.error || resultText;
      } catch {
        // keep raw text
      }
      console.error(`${tag} Resend API error`, {
        status: response.status,
        statusText: response.statusText,
        body: resultText,
        message: resendMessage,
      });
      return Response.json(
        { success: false, error: resendMessage, details: resultText, status: response.status },
        { status: 502 }
      );
    }

    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      result = { raw: resultText };
    }
    console.log(`${tag} email sent successfully`, {
      messageId: result.id,
      to: "office@rec-pan.cz",
      from: resendPayload.from,
    });

    return Response.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error(`${tag} unhandled exception`, {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
    return Response.json(
      { success: false, error: error?.message || "Unexpected server error", stack: error?.stack },
      { status: 500 }
    );
  }
});