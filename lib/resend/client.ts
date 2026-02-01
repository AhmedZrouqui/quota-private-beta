import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const sendWaitlistEmail = async (email: string) => {
  if (!resend) {
    console.error('Resend error: API key not found');
    return { success: false, error: 'Email service not configured' };
  }

    try {
      const { data, error } = await resend.emails.send({
        from: 'Quota <info@quota.live>',
        to: [email],
        subject: "You're on the Quota waitlist! 🎉",
        html: `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="color-scheme" content="dark light" />
            <meta name="supported-color-schemes" content="dark light" />
          </head>
          <body bgcolor="#050505" style="margin:0; padding:40px 20px; background-color:#050505; color:#A1A1AA; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; line-height:1.6;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;">
              <tr>
                <td align="center">
                  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#0F0F0F; border-radius:16px; padding:40px; border:1px solid #27272A;">
                    <tr>
                      <td style="padding:0 0 24px 0;">
                        <div style="font-size:20px; font-weight:700; color:#ffffff;">Quota</div>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:0 0 16px 0;">
                        <div style="display:inline-block; padding:4px 12px; border-radius:9999px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.12); color:#34d399; font-size:12px;">Waitlist Confirmed</div>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:12px 0 8px 0;">
                        <h1 style="margin:0; font-size:28px; color:#ffffff; line-height:1.1;">Stop donating runway to <span style="color:#818cf8;">API Sprawl.</span></h1>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:12px 0 12px 0; color:#A1A1AA; font-size:16px;">
                        <p style="margin:0 0 12px 0;">Hey developer,</p>
                        <p style="margin:0 0 12px 0;">You're in. We've added you to the exclusive waitlist for Quota—the forensic accounting dashboard for your tech stack.</p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:12px 0;">
                        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); border-radius:12px; padding:16px; color:#D4D4D8;">
                          <div style="margin:8px 0;">✓ Track Stripe, OpenAI, and AWS in one view</div>
                          <div style="margin:8px 0;">✓ Kill-switches for runaway loops</div>
                          <div style="margin:8px 0;">✓ Client-side encryption (Your keys stay yours)</div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:12px 0 0 0; color:#A1A1AA; font-size:14px;">We're releasing <strong style="color:#ffffff;">50 seats per week</strong> to maintain stability. We'll ping you the second your spot opens up.</td>
                    </tr>

                    <tr>
                      <td style="padding:20px 0 0 0; color:#9CA3AF; font-size:13px; border-top:1px solid #27272A;">
                        <p style="margin:12px 0 0 0;">&copy; ${new Date().getFullYear()} Quota. All rights reserved.</p>
                        <p style="margin:6px 0 0 0;">You received this because you signed up for the Quota waitlist. If you didn't mean to do this, just ignore this email.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      });

      if (error) {
        console.error('Email send error:', error);
        return { success: false, error: 'You have been added to our waitlist, but we couldn’t send a confirmation email due to an error in our email server.' };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Email service error:', error);
      return { success: false, error: 'You have been added to our waitlist, but we couldn’t send a confirmation email due to an error in our email server.' };
    }
};