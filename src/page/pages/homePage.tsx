import Button from "@suid/material/Button";
import Typography from "@suid/material/Typography";

export default function HomePage() {
  const handleInstallUserScript = () => {
    if (location.host.startsWith("localhost"))
      window.location.href = new URL(
        "src/userScript/script.user.ts",
        location.href
      ).href;
    else window.location.href = new URL("script.user.js", location.href).href;
  };
  return (
    <>
      <Typography variant="h2" component="div" gutterBottom>
        Krunker Qoli
      </Typography>
      <Button onclick={handleInstallUserScript}> install userscript</Button>
    </>
  );
}
