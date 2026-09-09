module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // Demo mode works even before an OpenAI key is added.
  if (!apiKey) {
    return res.status(200).json({
      site: null,
      demo: true
    });
  }

  try {
    const body = req.body || {};
    const prompt = String(body.prompt || "").trim();
    const currentSite = body.currentSite || null;

    if (!prompt) {
      return res.status(400).json({
        error: "A website prompt is required."
      });
    }

    const model = process.env.OPENAI_MODEL || "gpt-5-mini";

    const instructions = `
You are LaunchForge AI, a professional website-building assistant.

Your job is to create or modify a small-business website based on the user's request.

Return ONLY valid JSON matching this structure:

{
  "name": "Business name",
  "headline": "Main headline",
  "sub": "Short supporting description",
  "services": [
    "Service 1",
    "Service 2",
    "Service 3"
  ],
  "about": "Short business description",
  "testimonial": "Short customer testimonial",
  "cta": "Call to action",
  "accent": "#6d5dfc",
  "showPricing": false
}

Rules:
- Create professional marketing copy.
- Keep the content suitable for a real small business.
- Use exactly 3 services.
- Keep the headline concise and compelling.
- Use a valid 6-digit hexadecimal color for accent.
- showPricing must be true only when pricing was requested.
- If the user is modifying an existing site, preserve useful existing information unless the user asks to change it.
- Do not include HTML.
- Do not include Markdown.
- Do not include explanations outside the JSON.
`;

    const userInput = `
CURRENT WEBSITE:
${JSON.stringify(currentSite || {}, null, 2)}

USER REQUEST:
${prompt}
`;

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          instructions,
          input: userInput,
          text: {
            format: {
              type: "json_object"
            }
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("OpenAI API error:", errorText);

      return res.status(500).json({
        error: "AI generation failed."
      });
    }

    const data = await response.json();

    const outputText =
      data.output_text ||
      data.output?.flatMap(item =>
        item.content || []
      ).map(item =>
        item.text || ""
      ).join("") ||
      "";

    if (!outputText) {
      return res.status(500).json({
        error: "The AI returned no website data."
      });
    }

    let site;

    try {
      site = JSON.parse(outputText);
    } catch (e) {
      console.error("Invalid AI JSON:", outputText);

      return res.status(500).json({
        error: "The AI returned invalid website data."
      });
    }

    return res.status(200).json({
      site,
      demo: false
    });

  } catch (error) {

    console.error("Generate error:", error);

    return res.status(500).json({
      error: "Something went wrong while generating the website."
    });
  }
};
