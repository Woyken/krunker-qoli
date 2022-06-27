import Box from '@suid/material/Box';
import Checkbox from '@suid/material/Checkbox';
import FormControlLabel from '@suid/material/FormControlLabel';
import {
    enabledAdPopupRemoval,
    enabledAutoReload,
    enabledFastRespawn,
    enabledWindowManager,
    setEnabledAdPopupRemoval,
    setEnabledAutoReload,
    setEnabledFastRespawn,
    setEnabledWindowManager,
} from './state/userScriptSettings';

export default function SettingsList() {
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <FormControlLabel
                    value="Auto reload"
                    control={
                        <Checkbox
                            checked={enabledAutoReload()}
                            onChange={(event, checked) => {
                                setEnabledAutoReload(checked);
                            }}
                        />
                    }
                    label="Auto reload"
                />
                <FormControlLabel
                    value="Auto respawn"
                    control={
                        <Checkbox
                            checked={enabledFastRespawn()}
                            onChange={(event, checked) => {
                                setEnabledFastRespawn(checked);
                            }}
                        />
                    }
                    label="Auto respawn"
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
                <FormControlLabel
                    value="Open Krunker in new Window"
                    control={
                        <Checkbox
                            checked={enabledWindowManager()}
                            onChange={(event, checked) => {
                                setEnabledWindowManager(checked);
                            }}
                        />
                    }
                    label="Open Krunker in new Window"
                />
            </Box>
        </>
    );
}
