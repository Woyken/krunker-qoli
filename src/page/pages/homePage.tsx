import Button from '@suid/material/Button';
import Typography from '@suid/material/Typography';

export default function HomePage() {
    const handleInstallUserScript = () => {
        if (window.location.host.startsWith('localhost')) window.location.href = new URL('src/userScript/script.user.ts', window.location.href).href;
        else window.location.href = new URL('script.user.js', window.location.href).href;
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
