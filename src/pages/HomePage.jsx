import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard.jsx';
import styled from 'styled-components';
import Footer from '../components/Footer.jsx';
import { useContext } from 'react';
import SessionContext from '../context/sessionContext.js';
import HashLoaderScreen from '../components/HashLoader.jsx';
import COLORS from '../constants/colors.js';
import AuthContext from '../context/authContext.js';
import api from '../services/api.js';

export default function HomePage(){
	const [games, setGames] = useState(null);
	const {sessionData, setSessionData} = useContext(SessionContext);
	const {setAuthData} = useContext(AuthContext);

	useEffect(()=> {
		if(localStorage.getItem('session')){
			const {idUser, name, email, address, image, token} = JSON.parse(localStorage.getItem('session'));
			setAuthData({idUser, name, email, address, image, token});
		}
		getAllGames(); 
	},[]);

	async function getAllGames(){
		try{
			const response = await api.get('/games');
			const gamesList = response.data;
			setGames(gamesList);
		}catch(err){
			alert(err.response.data.message);
		}
	}

	if(!games) return <HashLoaderScreen color={COLORS.secondary}/>;
	
	return(
		<>
			<Container>
				{games.map(({_id, name, image, price, min, max})=>{
					return(
						<GameCard
							key={_id}
							id = {_id}
							name = {name}
							image = {image}
							price = {price}
							min = {min}
							max = {max}
							onCart = {sessionData.cart.some(game => game.id===_id)}
							sessionData = {sessionData}
							setSessionData = {setSessionData}
						/>
					);
				})}
			</Container>
			<Footer 
				total = {sessionData.total}
				cart = {sessionData.cart}
			/>
		</>
	);
}

const Container = styled.div`
  padding-top: 115px;
  padding-bottom: 70px;
  display: grid;
  justify-items: center;
  justify-content: center;
  grid-template-columns: 0.45fr 0.4fr;
  grid-row-gap: 20px;
`;