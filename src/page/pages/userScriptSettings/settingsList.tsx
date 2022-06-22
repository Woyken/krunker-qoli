import Box from '@suid/material/Box';
import Checkbox from '@suid/material/Checkbox';
import FormControlLabel from '@suid/material/FormControlLabel';
import { enabledAdPopupRemoval, enabledFastRespawn, setEnabledAdPopupRemoval, setEnabledFastRespawn } from './state/userScriptSettings';

export default function SettingsList() {
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <FormControlLabel
                    value="Fast respawn"
                    control={
                        <Checkbox
                            checked={enabledFastRespawn()}
                            onChange={(event, checked) => {
                                setEnabledFastRespawn(checked);
                            }}
                        />
                    }
                    label="Fast respawn"
                />
                <br />
                <FormControlLabel
                    value="Remove popup ads"
                    control={
                        <Checkbox
                            checked={enabledAdPopupRemoval()}
                            onChange={(event, checked) => {
                                setEnabledAdPopupRemoval(checked);
                            }}
                        />
                    }
                    label="Remove popup ads"
                />
            </Box>
        </>
    );
}
