import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import AppBarAdmin from '../Components/Appbar/AppbarAdmin';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled('div')({
  backgroundColor: 'lightblue',
  minHeight: '100vh',
  padding: '16px',
});

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const CardsContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

const CardWrapper = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  border: '1px solid #0070F3',
  backgroundColor: '#f0f8ff',
  marginRight: '16px',
  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.9)',
  borderRadius: '5px',
  marginLeft: '5px',
}));

const NameTypography = styled(Typography)({
  color: '#000080',
  marginBottom: '1rem',
  fontWeight: 'bold',
});

const SubtitleTypography = styled(Typography)({
  color: '#0050C0',
  fontWeight: 'bold',
  marginBottom: '10px',
});

const DataTypography = styled(Typography)({
  color: '#000080',
  marginBottom: '0.5rem',
  marginLeft: '0.5rem',
});

function HealthPackages() {
  const [healthPackages, setHealthPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/health-packages')
      .then((response) => {
        setHealthPackages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching health packages:', error);
      });
  }, []);

  const handleAddPackageClick = () => {
    navigate('/new-package');
  };

  const handleDeletePackage = (id) => {
    axios
      .delete(`http://localhost:3000/health-packages/${id}`)
      .then((response) => {
        console.log('Deleted health package:', response.data);
        setHealthPackages((prevPackages) =>
          prevPackages.filter((healthPackage) => healthPackage._id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting health package:', error);
      });
  };

  const handleUpdatePackage = (id) => {
    navigate(`/update-package/${id}`);
  };

  return (
    <div>
      <AppBarAdmin />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            Health Packages
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddPackageClick}>
            Add New Package
          </Button>
        </HeaderContainer>
        <CardsContainer>
          {healthPackages.map((healthPackage) => (
            <CardWrapper key={healthPackage._id} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                  {healthPackage.name}
                </NameTypography>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Annual Price:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    ${healthPackage.annualPrice}
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Discount on Doctor Session Price:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {healthPackage.discountOnDoctorSessionPrice}%
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Discount on Medicine Orders:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {healthPackage.discountOnMedicineOrders}%
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Discount on Family Member Subscription:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {healthPackage.discountOnFamilyMemberSubscription}%
                  </DataTypography>
                </div>
                <div>
                  <Button
                    onClick={() => handleDeletePackage(healthPackage._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleUpdatePackage(healthPackage._id)}
                  >
                    Update
                  </Button>
                </div>
              </CardContent>
            </CardWrapper>
          ))}
        </CardsContainer>
      </PageContainer>
    </div>
  );
}

export default HealthPackages;
