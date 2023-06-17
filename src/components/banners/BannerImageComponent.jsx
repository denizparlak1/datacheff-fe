import React from 'react';
import { Card, CardMedia, styled } from '@mui/material';

const StyledCard = styled(Card)({
    maxWidth: 300,
    margin: '1rem',
});

const StyledCardMedia = styled(CardMedia)({
    height: 200,
});

const BannerImageComponent = ({ imageUrls }) => {
    return (
        <div>
            {Object.values(imageUrls).map((imageUrl, index) => (
                <StyledCard key={index}>
                    <StyledCardMedia component="img" src={imageUrl} alt={`Banner Image ${index}`} />
                </StyledCard>
            ))}
        </div>
    );
};

export default BannerImageComponent;
