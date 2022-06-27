import Button from '@suid/material/Button';
import Typography from '@suid/material/Typography';

export default function HomePage() {
    const handleInstallUserScript = () => {
        if (window.location.host.startsWith('localhost')) window.location.href = new URL('src/userScript/script.user.ts', window.location.href).href;
        else window.location.href = new URL('script.user.js', window.location.href).href;
    };
    const handleOpenKrunker = () => {
        window.open('https://krunker.io', '_self');
    };
    return (
        <>
            <Typography variant="h2" component="div" gutterBottom>
                Krunker Qoli
            </Typography>
            <Button onclick={handleInstallUserScript}>Install userscript</Button>
            <br />
            <Button onclick={handleOpenKrunker}>Open krunker</Button>
        </>
    );
}
