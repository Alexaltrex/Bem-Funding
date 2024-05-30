"use client"

import Snackbar from '@mui/material/Snackbar';
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {Alert} from "@mui/material";

export const MailAlert = observer(() => {
    const {appStore: {mailAlert, setMailAlert}} = useStore();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setMailAlert({open: false, message: "", severity: 'success'})
    };

    return (
        <Snackbar open={mailAlert.open}
                  autoHideDuration={6000}
                  onClose={() => setMailAlert({open: false, message: "", severity: 'success'})}
        >
            <Alert onClose={handleClose}
                    severity={mailAlert.severity}
                   sx={{width: '100%'}}>
                {mailAlert.message}
            </Alert>

        </Snackbar>
    )
})