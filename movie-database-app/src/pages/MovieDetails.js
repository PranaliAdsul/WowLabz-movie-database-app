import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Box,
  Grid,
  CardMedia,
  Typography,
  IconButton,
  Rating,
  Button,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { addToFavorites, removeFromFavorites } from '../redux/favoritesSlice';


const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: theme.shadows[5],
  outline: 'none',
  width: '100%',
  maxWidth: 600,
  padding: theme.spacing(2),
}));

const MovieDetails = ({ selectedMovie, onClose, onAddToFavorites }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');
  const modalMaxWidth = isMobile ? '100%' : isTablet ? 600 : 800;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);

  const handleFavoriteButtonClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(selectedMovie.id));
    } else {
      dispatch(addToFavorites(selectedMovie));
    }
  };
  const isFavorite = favorites.some((movie) => movie.id === selectedMovie?.id);
  return (
    <StyledModal open={selectedMovie !== null} onClose={onClose}>
      <ModalContent sx={{ maxWidth: modalMaxWidth }}>
        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12} sm={6} md={isMobile ? 12 : 6}>
            <CardMedia
              component="img"
              alt={selectedMovie?.title}
              image={`https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`}
              sx={{
                height: isMobile ? 300 : isTablet ? 400 : '100%',
                borderTopLeftRadius: isMobile || isTablet ? 8 : 0,
                borderBottomLeftRadius: isMobile || isTablet ? 8 : 0,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={isMobile ? 12 : 6}>
            <Typography variant="h5" gutterBottom>
              {selectedMovie?.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Rating: <Rating value={selectedMovie?.vote_average / 2} precision={0.5} readOnly />
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Vote Count: {selectedMovie?.vote_count}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Release Date: {selectedMovie?.release_date}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Overview:
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {selectedMovie?.overview}
            </Typography>
            <Box sx={{  display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', mt: 2 }}>
              <IconButton color="primary" aria-label="Add to Favorites" onClick={handleFavoriteButtonClick}>
                <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
              </IconButton>
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            </Box>
          </Grid>
        </Grid>
      </ModalContent>
    </StyledModal>
  );
};

export default MovieDetails;