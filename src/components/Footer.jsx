/*eslint-disable react/prop-types*/
import {FaShoppingCart} from 'react-icons/fa';
import {BsPersonCircle} from 'react-icons/bs';
import styled from 'styled-components';
import COLORS from '../constants/colors.js';
import AuthContext from '../context/authContext.js';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Footer({total, cart}){

	const {authData,setAuthData} = useContext(AuthContext);

	function handleLogout(){
		localStorage.removeItem('session');
		setAuthData();
	}

	return(
		<FooterContainer>
			{!authData ? <Link to={'/login'}><PersonIcon/></Link> : <Link to={'/logout'} onClick={handleLogout}><PersonIconImage src={authData.image} alt={`Imagem de perfil de ${authData.name}`}/></Link>}
			<Amount>{`Total: R$ ${total.toFixed(2).replace('.', ',')}`}</Amount>
			<CartContainer>
				<CartIcon onClick={()=>alert('Esta funcionalidade será implementada em breve!')}/>
				<Count >{cart.length}</Count>
			</CartContainer>
		</FooterContainer>
	);
}

const FooterContainer = styled.div`
  padding: 24px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: ${COLORS.main};
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Amount = styled.div`
  font-family: 'Grandstander';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color:${COLORS.neutral};
`;

const PersonIcon = styled(BsPersonCircle)`
  color: ${COLORS.neutral};
  width: 35px;
  height: 35px;
`;
const PersonIconImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;
const CartContainer = styled.div`
  position: relative;
`;
const CartIcon = styled(FaShoppingCart)`
  color: ${COLORS.neutral};
  width: 35px;
  height: 35px;
`;

const Count = styled.div`
  position: absolute;
  top: 0;
  right : 0;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  color: ${COLORS.neutral};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 15px;
  line-height: 15px;
  background-color: ${COLORS.selected};
`;