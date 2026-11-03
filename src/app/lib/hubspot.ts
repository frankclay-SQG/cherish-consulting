// Sends the site's own contact form to HubSpot (portal 247873574,
// form "Website contact form (cherishconsulting.com)"). No API key needed.
export const HUBSPOT_PORTAL_ID = "247873574";
export const HUBSPOT_FORM_ID = "9b4f1407-f137-4097-804e-0642548c61a3";

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  state: string;
  message: string;
};

function cookie(name: string) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export async function submitToHubSpot(f: ContactFields): Promise<void> {
  const [first, ...rest] = f.name.trim().split(/\s+/);
  const field = (name: string, value: string) => ({ objectTypeId: "0-1", name, value });
  const fields = [
    field("firstname", first || ""),
    field("lastname", rest.join(" ")),
    field("email", f.email),
    field("phone", f.phone),
    field("state", f.state),
    field("reaching_out_about", f.topic),
    field("message", f.message),
  ].filter((x) => x.value !== "");

  const hutk = cookie("hubspotutk");
  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: { ...(hutk ? { hutk } : {}), pageUri: window.location.href, pageName: document.title },
      }),
    },
  );
  if (!res.ok) throw new Error(`HubSpot ${res.status}: ${await res.text()}`);
}
