import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';

import logoImage from "../assets/logoImage.png";
const apiKey = '7e35d07b60226c2ac3182d7b2db4c30e';

const HeaderContainer = styled('header')(({ theme }) => ({
  backgroundColor: '#1f1f1f',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
  },
}));

const LogoImage = styled('img')({
  width: '80px',
});

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: '1',
  marginLeft: '20px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '10px',
  },
}));

const SearchInput = styled('input')(({ theme }) => ({
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '8px',
  outline: 'none',
  width: '100%',
  fontSize: '14px',
  [theme.breakpoints.down('sm')]: {
    width: '70%',
  },
}));

const SearchButton = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  backgroundColor: 'white',
  borderRadius: '20px',
  fontSize: '14px',
  border: 'none',
  padding: '8px',
  marginLeft: '10px',
  cursor: 'pointer',
}));

const NavLinkContainer = styled(NavLink)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  fontSize: '20px',
  marginRight: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginLeft: '20px',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
  },
}));

const Header = ({ setSearchResults }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );
      setSearchResults(response.data.results);
      navigate('/');
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <HeaderContainer>
      <div className="headerLeft">
        <Link to="/">
          <LogoImage src={logoImage} alt="WowLabs Logo" />
        </Link>
      </div>
      <SearchContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            padding: '5px',
            width: '100%',
          }}
        >
          <SearchInput
            type="text"
            placeholder="Search Here..."
            aria-label="search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>
            <SearchIcon />
          </SearchButton>
        </div>
      </SearchContainer>

      <NavLinkContainer exact to="/" activeClassName="active-link">
        <HomeIcon style={{ fontSize: '40px' }} />
      </NavLinkContainer>

      <NavLinkContainer exact to="/favorites" activeClassName="active-link">
        <FavoriteIcon style={{ fontSize: '40px' }} />
      </NavLinkContainer>
    </HeaderContainer>
  );
};

export default Header;
