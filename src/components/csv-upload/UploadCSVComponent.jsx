import React, { useState } from 'react';
import { Button, Container, Grid, Paper, Typography, Alert } from '@mui/material'; // Import Alert from MUI
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse';
import { uploadCSVApi } from "../../hooks/Hooks";

const CSVUploadComponent = ({ onCSVUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null); // New state for the status message

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus(null); // Reset the status message when a new file is selected
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            console.error('Please select a CSV file.');
            setUploadStatus('Please select a CSV file.');
            return;
        }

        // Parse the CSV file to identify columns
        Papa.parse(selectedFile, {
            complete: async (result) => {
                const columns = result.meta.fields;
                let tableName = "";

                // Identify the table based on columns
                if (columns.includes('click_id') && columns.includes('banner_id') && columns.includes('campaign_id') && columns.includes('quarter_hour')) {
                    tableName = 'clicks';
                } else if (columns.includes('conversation_id') && columns.includes('click_id') && columns.includes('revenue') && columns.includes('quarter_hour')) {
                    tableName = 'conversions';
                } else if (columns.includes('banner_id') && columns.includes('campaign_id')) {
                    tableName = 'impressions';
                }
                else if (columns.includes('url')) {
                    tableName = 'images';
                }
                else {
                    console.error('Unknown table structure.');
                    setUploadStatus('Unknown table structure.');
                    return;
                }

                // Sending the file to the API
                uploadCSVApi(
                    selectedFile,
                    tableName,
                    (data) => {
                        console.log('Upload successful:', data);
                        const fileId = data.id;
                        onCSVUpload(fileId); // Pass the file ID to the parent component
                        setUploadStatus('Upload successful!'); // Set the success message
                    },
                    (error) => {
                        console.error('Upload error:', error);
                        setUploadStatus('Upload error check csv data, and make sure there are no duplicate entries ');
                    }
                );
            },
            header: true,
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
                Please select csv file to load new data
            </Typography>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Typography variant="h5" align="center">
                            Upload CSV File
                        </Typography>
                    </Grid>
                    <Grid item>
                        <input
                            accept=".csv"
                            id="csv-upload"
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="csv-upload">
                            <Button
                                variant="contained"
                                component="span"
                                color="primary"
                                startIcon={<CloudUploadIcon />}
                            >
                                Select CSV File
                            </Button>
                        </label>
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!selectedFile}
                            onClick={handleSubmit}
                        >
                            Upload
                        </Button>
                    </Grid>
                    <Grid item>
                        {/* Conditionally render the success or error message */}
                        {uploadStatus && <Alert severity={uploadStatus.startsWith('Upload successful') ? "success" : "error"}>{uploadStatus}</Alert>}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CSVUploadComponent;
