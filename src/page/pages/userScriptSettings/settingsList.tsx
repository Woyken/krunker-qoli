import {
    enabledAdPopupDismisser,
    enabledAutoClickJunkPickup,
    enabledAutoReload,
    enabledFastRespawn,
    enabledWindowManager,
    setEnabledAdPopupDismisser,
    setEnabledAutoClickJunkPickup,
    setEnabledAutoReload,
    setEnabledFastRespawn,
    setEnabledWindowManager,
} from '@/shared/state';
import Box from '@suid/material/Box';
import Checkbox from '@suid/material/Checkbox';
import FormControlLabel from '@suid/material/FormControlLabel';
import useSavedSettings from './state/userScriptSettings';

export default function SettingsList() {
    useSavedSettings();

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
                <br />
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
                            checked={enabledAdPopupDismisser()}
                            onChange={(event, checked) => {
                                setEnabledAdPopupDismisser(checked);
                            }}
                        />
                    }
                    label="Remove popup ads"
                />
                <br />
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
                <br />
                <FormControlLabel
                    value="Auto collect junk (click when prompted)"
                    control={
                        <Checkbox
                            checked={enabledAutoClickJunkPickup()}
                            onChange={(event, checked) => {
                                setEnabledAutoClickJunkPickup(checked);
                            }}
                        />
                    }
                    label="Auto collect junk (click when prompted)"
                />
            </Box>
        </>
    );
}
