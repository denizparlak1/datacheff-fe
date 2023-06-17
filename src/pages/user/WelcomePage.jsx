import React, { useState } from 'react';
import WelcomePageComponent from '../../components/user/WelcomePageComponent';
import CSVUploadComponent from '../../components/csv-upload/UploadCSVComponent';
import {Box, Button, Dialog, styled, Typography} from '@mui/material';
import welcomeImage from '../../assets/img/datachefimage.jpeg';
import rulesImage from '../../assets/img/rules.png';

const WelcomePage = () => {
    const Container = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
    });

    const Content = styled('div')({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%', // I adjusted the width to 80% to give more space for the content
        flexWrap: 'wrap',
    });

    const SideComponent = styled('div')({
        flex: 1,
        margin: '0 20px',
        textAlign: 'center',
    });

    const [uploadedFileId, setUploadedFileId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleCSVUpload = (fileId) => {
        setUploadedFileId(fileId);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Container>
            <Box marginBottom={1}> {/* Reduced marginBottom */}
                <Typography variant="h4" gutterBottom>
                    Welcome to the Campaign Page
                </Typography>
            </Box>
            <Box marginBottom={2}> {/* Reduced marginBottom */}
                <img src={welcomeImage} alt="Welcome" style={{ width: '40%', maxWidth: '100%' }} /> {/* Adjusted width */}
            </Box>
            <Content>
                <SideComponent>
                    <CSVUploadComponent onCSVUpload={handleCSVUpload} />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                            CSV Rules
                        </Button>
                    </Box>
                </SideComponent>
                <SideComponent>
                    <WelcomePageComponent/>
                </SideComponent>
            </Content>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="csv-rules-dialog-title"
            >
                <Box>
                    <img src={rulesImage} alt="Upload Rules" style={{ width: '100%', maxWidth: '600px' }} />
                </Box>
            </Dialog>
        </Container>
    );
};

export default WelcomePage;
