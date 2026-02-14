# PHORO – E-Mail-Templates

> HTML-Templates für Supabase Auth E-Mails im PHORO-Design.

## Farben
| Rolle | Hex |
|-------|-----|
| Hintergrund | `#F5F0E6` (Warm-Beige) |
| Header/Footer | `#1A3550` (Pharos-Blau) |
| Button | `#E07A5F` (Morgenrot-CTA) |
| Button hover | `#c86a51` |
| Text | `#3D405B` |
| Link | `#3A7CA5` (Accent) |
| Trennlinie | `#D4CFC3` |

## Setup-Anleitung

### 1. Custom SMTP (empfohlen)
Supabase Dashboard → Project Settings → Authentication → SMTP Settings:
- **Sender name:** PHORO
- **Sender email:** noreply@phoro.ch (oder eigene Domain)
- SMTP-Anbieter: z.B. Resend, Postmark, SendGrid

### 2. Templates einfügen
Supabase Dashboard → Authentication → Email Templates.
Für jeden Typ (Confirm signup, Reset Password, Magic Link) den entsprechenden HTML-Code unten einfügen.

### 3. Redirect URLs konfigurieren
Supabase Dashboard → Authentication → URL Configuration:
- **Site URL:** `https://phoro.ch` (oder `http://localhost:3000` für Dev)
- **Redirect URLs:** `https://phoro.ch/auth/callback`, `http://localhost:3000/auth/callback`

---

## Template 1: E-Mail-Bestätigung (Confirm signup)

**Subject:** Willkommen bei PHORO – E-Mail bestätigen

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>E-Mail bestätigen</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F0E6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#3D405B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E6;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#1A3550;border-radius:12px 12px 0 0;padding:32px 40px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">PHORO</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;border-left:1px solid #D4CFC3;border-right:1px solid #D4CFC3;">
              <h2 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#1A3550;">Willkommen bei PHORO!</h2>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3D405B;">
                Vielen Dank für deine Registrierung. Bitte bestätige deine E-Mail-Adresse, um dein Konto zu aktivieren.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="background-color:#E07A5F;border-radius:8px;">
                    <a href="{{ .ConfirmationURL }}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                      E-Mail bestätigen
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#3D405B;opacity:0.6;">
                Falls du dich nicht bei PHORO registriert hast, kannst du diese E-Mail ignorieren.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#1A3550;border-radius:0 0 12px 12px;padding:20px 40px;">
              <p style="margin:0;font-size:12px;color:#ffffff;opacity:0.6;">
                &copy; {{ .CurrentYear }} PHORO – KI-Assistenten für Schweizer Schulen
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Template 2: Passwort zurücksetzen (Reset Password)

**Subject:** PHORO – Passwort zurücksetzen

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Passwort zurücksetzen</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F0E6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#3D405B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E6;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#1A3550;border-radius:12px 12px 0 0;padding:32px 40px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">PHORO</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;border-left:1px solid #D4CFC3;border-right:1px solid #D4CFC3;">
              <h2 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#1A3550;">Passwort zurücksetzen</h2>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3D405B;">
                Du hast eine Anfrage zum Zurücksetzen deines Passworts gestellt. Klicke auf den Button, um ein neues Passwort zu wählen.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="background-color:#E07A5F;border-radius:8px;">
                    <a href="{{ .ConfirmationURL }}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Neues Passwort wählen
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#3D405B;opacity:0.6;">
                Falls du kein neues Passwort angefordert hast, kannst du diese E-Mail ignorieren. Dein Passwort bleibt unverändert.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#1A3550;border-radius:0 0 12px 12px;padding:20px 40px;">
              <p style="margin:0;font-size:12px;color:#ffffff;opacity:0.6;">
                &copy; {{ .CurrentYear }} PHORO – KI-Assistenten für Schweizer Schulen
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Template 3: Magic Link

**Subject:** PHORO – Dein Anmeldelink

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Magic Link</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F0E6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#3D405B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E6;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#1A3550;border-radius:12px 12px 0 0;padding:32px 40px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">PHORO</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px;border-left:1px solid #D4CFC3;border-right:1px solid #D4CFC3;">
              <h2 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#1A3550;">Dein Anmeldelink</h2>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3D405B;">
                Klicke auf den Button, um dich bei PHORO anzumelden. Der Link ist 24 Stunden gültig.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td align="center" style="background-color:#E07A5F;border-radius:8px;">
                    <a href="{{ .ConfirmationURL }}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Jetzt anmelden
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#3D405B;opacity:0.6;">
                Falls du diesen Link nicht angefordert hast, kannst du diese E-Mail ignorieren.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#1A3550;border-radius:0 0 12px 12px;padding:20px 40px;">
              <p style="margin:0;font-size:12px;color:#ffffff;opacity:0.6;">
                &copy; {{ .CurrentYear }} PHORO – KI-Assistenten für Schweizer Schulen
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Hinweise

- **Supabase Template-Variablen:** `{{ .ConfirmationURL }}` wird automatisch durch den korrekten Link ersetzt.
- **Font:** Lexend ist kein Web-Safe-Font und wird in E-Mails nicht zuverlässig geladen. Die Templates nutzen `Helvetica Neue, Helvetica, Arial, sans-serif` als E-Mail-sichere Alternative.
- **Responsive:** Die Templates nutzen `max-width:520px` mit `width:100%` und funktionieren auf Desktop und Mobile.
- **Dark Mode:** E-Mail-Clients mit Dark Mode können Farben invertieren. Die Templates nutzen explizite `background-color` und `color` Werte, um die Darstellung konsistent zu halten.
