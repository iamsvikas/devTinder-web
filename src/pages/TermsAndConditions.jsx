import React from "react";

export default function TermsAndConditions() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Terms & Conditions</h1>
      <p>
        Welcome to <b>betterthantherest.living</b>. By accessing our website or
        using our services, you agree to be bound by the following terms:
      </p>
      <ol>
        <li>
          <b>Services</b> – We provide web apps and mobile apps development
          services.
        </li>
        <li>
          <b>Payments</b> – Payments must be made in full before service
          delivery.
        </li>
        <li>
          <b>Liability</b> – We are not liable for any indirect or consequential
          damages.
        </li>
        <li>
          <b>Changes</b> – We may update these terms at any time without prior
          notice.
        </li>
      </ol>
      <p>If you do not agree to these terms, please do not use our services.</p>
    </div>
  );
}
