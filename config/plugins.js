module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("MERMAID_MAIL_USER"),
          pass: env("MERMAID_MAIL_PASS"),
        },
      },
      settings: {
        defaultFrom: env("MERMAID_MAIL_FROM"),
      },
    },
  },
  // ...
});
