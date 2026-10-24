export default function ContactPage() {
return (
<main
style={{
minHeight: "100vh",
padding: "50px 20px",
background: "#eff6ff",
fontFamily: "Arial, sans-serif",
}}
>
<div
style={{
maxWidth: "650px",
margin: "0 auto",
padding: "35px",
background: "#ffffff",
borderRadius: "16px",
boxShadow: "0 8px 25px rgba(30, 64, 175, 0.12)",
}}
>
<h1 style={{ color: "#1d4ed8", textAlign: "center" }}>
Contactez-nous </h1>

    <p style={{ color: "#64748b", textAlign: "center" }}>
      Une question ? Envoyez-nous un message.
    </p>

    <form>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="name"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Nom :
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Votre nom"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Adresse e-mail :
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Votre adresse e-mail"
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="message"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Message :
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Votre message"
          rows={5}
          required
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          background: "#2563eb",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Envoyer
      </button>
    </form>
  </div>
</main>

);
}

const inputStyle = {
width: "100%",
padding: "12px",
border: "1px solid #cbd5e1",
borderRadius: "8px",
boxSizing: "border-box" as const,
fontSize: "16px",
};
