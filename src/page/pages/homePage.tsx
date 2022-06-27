import Button from '@suid/material/Button';
import Typography from '@suid/material/Typography';
import { useNavigate } from 'solid-app-router';

export default function HomePage() {
    const navigate = useNavigate();

    function handleOpenWindowManager() {
        navigate('/windowManager');
    }

    function handleInstallUserScript() {
        let url: string;
        if (window.location.host.startsWith('localhost'))
            url = new URL('src/userScript/script.user.ts', window.location.href).href;
        else url = new URL('script.user.js', window.location.href).href;
        window.open(url);
        setTimeout(() => {
            handleOpenWindowManager();
        }, 200);
    }

    function handleOpenKrunker() {
        window.open('https://krunker.io', '_self');
    }

    return (
        <>
            <Typography variant="h2" component="div" gutterBottom>
                Krunker Qoli
            </Typography>
            <Button onclick={handleInstallUserScript}>Install userscript</Button>
            <br />
            <Button onclick={handleOpenWindowManager}>Open Krunker window manager</Button>
            <br />
            <Button onclick={handleOpenKrunker}>Open Krunker</Button>
        </>
    );
}
