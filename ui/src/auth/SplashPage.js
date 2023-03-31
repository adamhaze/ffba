import './SplashPage.css';
import { LoginButton } from './components/LoginButton';
import { SignupButton } from './components/SignupButton';

function SplashPage() {

    
	return (
		<div className="Splash">
			<header className="splash-header">
				what up 
				<div>
					🍗
				</div>
				<LoginButton/>
				<SignupButton/>
			</header>
		</div>
	);
}

export default SplashPage;
