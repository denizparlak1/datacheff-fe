import React, { useState } from 'react';
import { Button, CircularProgress,TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { getCampaignsApi } from '../../hooks/Hooks';
import BannerImageComponent from "../banners/BannerImageComponent";
import { v4 as uuidv4 } from 'uuid';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const TextFieldWrapper = styled(TextField)({
    marginBottom: '16px',
    width: '300px',
});

const ProgressContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '16px',
});

const ButtonWrapper = styled(Button)({
    width: '200px',
});


const ScrollableContainer = styled('div')({
    maxHeight: '300px',
    overflow: 'auto',
    marginTop: '16px',
});

const WelcomePageComponent = () => {
    const [campaignId, setCampaignId] = useState('');
    const [imageUrls, setImageUrls] = useState([]);


    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setCampaignId(event.target.value);
    };

    const generateUniqueId = () => {
        // Generate a UUID (Universally Unique Identifier) using the `uuid` package or any other suitable method
        const uniqueId = uuidv4();

        return uniqueId;
    };


    const handleApplyButtonClick = async () => {
        try {
            setLoading(true);

            // Create a new cookie if it doesn't exist
            if (!document.cookie) {
                const uniqueId = generateUniqueId(); // Implement a function to generate a unique ID
                document.cookie = `unique_id=${uniqueId}; path=/; samesite=Lax`;
            }
            console.log(document.cookie)

            // Call the getCampaignsApi function
            const campaignData = await getCampaignsApi(campaignId);
            setImageUrls(Object.values(campaignData));

            // Process the campaign data or perform any other necessary actions
            // ...
        } catch (error) {
            console.error('Error:', error);
            // Handle the error gracefully
            // ...
        }
        finally {
            setLoading(false); // Set loading state back to false
        }
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                Please write the campaign id you want to reach
            </Typography>
            <TextFieldWrapper
                label="Campaign ID"
                variant="outlined"
                value={campaignId}
                onChange={handleInputChange}
            />
            <ButtonWrapper variant="contained" color="primary" onClick={handleApplyButtonClick}>
                Apply
            </ButtonWrapper>
            {loading ? (
                <ProgressContainer>
                    <CircularProgress />
                </ProgressContainer>
            ) : (
                <ScrollableContainer>
                    <BannerImageComponent imageUrls={imageUrls} />
                </ScrollableContainer>
            )}
        </Container>
    );
};

export default WelcomePageComponent;
